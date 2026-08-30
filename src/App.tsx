import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Newspaper,
  Coins,
  Zap,
  Database,
  LayoutDashboard
} from 'lucide-react';
import { Header } from './components/Header';
import { NetworkMetricsBanner } from './components/NetworkMetricsBanner';
import { LiveTpsChart } from './components/LiveTpsChart';
import { SolPriceChart } from './components/SolPriceChart';
import { TokenWatchlist } from './components/TokenWatchlist';
import { NewsFeed } from './components/NewsFeed';
import { StakingCalculator } from './components/StakingCalculator';
import { DexSwapSimulator } from './components/DexSwapSimulator';
import { ExplorerInspector } from './components/ExplorerInspector';
import { TokenDetailModal } from './components/TokenDetailModal';
import { Footer } from './components/Footer';

import type { SolanaNetworkMetrics, EcosystemToken, SolanaNewsArticle, SolanaWalletState } from './types/solana';
import { fetchLiveSolanaNetworkMetrics, setRpcEndpointIndex, fetchAccountBalance } from './services/solanaRpc';
import { fetchLiveTokensData, INITIAL_SOLANA_TOKENS } from './services/coingecko';
import { fetchLiveSolanaNews } from './services/solanaNews';

export function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tokens' | 'news' | 'staking' | 'swap' | 'inspector'>('overview');

  const [metrics, setMetrics] = useState<SolanaNetworkMetrics>({
    tps: 2840,
    tpsHistory: [],
    slot: 284910000,
    blockHeight: 261890000,
    epoch: 648,
    epochProgress: 75.4,
    slotsRemaining: 105000,
    pingMs: 120,
    rpcHealth: 'ok',
    validatorCount: 1478,
    activeNodes: 1942
  });
  const [isRefreshingRpc, setIsRefreshingRpc] = useState(false);
  const [selectedRpcIndex, setSelectedRpcIndex] = useState(0);

  const [tokens, setTokens] = useState<EcosystemToken[]>(INITIAL_SOLANA_TOKENS);
  const [news, setNews] = useState<SolanaNewsArticle[]>([]);
  const [selectedTokenModal, setSelectedTokenModal] = useState<EcosystemToken | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [wallet, setWallet] = useState<SolanaWalletState>({
    isConnected: false,
    address: null,
    solBalance: null,
    isConnecting: false,
    walletName: null
  });

  useEffect(() => {
    let isMounted = true;

    const loadAllData = async () => {
      setIsRefreshingRpc(true);
      const [netMetrics, liveTokens, liveNews] = await Promise.all([
        fetchLiveSolanaNetworkMetrics(),
        fetchLiveTokensData(),
        fetchLiveSolanaNews()
      ]);

      if (isMounted) {
        setMetrics(netMetrics);
        setTokens(liveTokens);
        setNews(liveNews);
        setIsRefreshingRpc(false);
      }
    };

    loadAllData();

    const rpcInterval = setInterval(async () => {
      const updatedMetrics = await fetchLiveSolanaNetworkMetrics();
      const updatedTokens = await fetchLiveTokensData();
      if (isMounted) {
        setMetrics(updatedMetrics);
        setTokens(updatedTokens);
      }
    }, 4000);

    return () => {
      isMounted = false;
      clearInterval(rpcInterval);
    };
  }, [selectedRpcIndex]);

  const handleConnectWallet = async () => {
    setWallet(prev => ({ ...prev, isConnecting: true }));
    try {
      const solanaWindow = (window as any).solana;
      if (solanaWindow && solanaWindow.isPhantom) {
        const resp = await solanaWindow.connect();
        const pubKeyStr = resp.publicKey.toString();
        const bal = await fetchAccountBalance(pubKeyStr);
        setWallet({
          isConnected: true,
          address: pubKeyStr,
          solBalance: bal !== null ? bal : 12.45,
          isConnecting: false,
          walletName: 'Phantom'
        });
      } else {
        setTimeout(async () => {
          const simAddress = '7Xw9P2k9pZfA5yL3mE4nR6tQ8uV1bN0cM3vB4xY5zW6q';
          const bal = await fetchAccountBalance(simAddress);
          setWallet({
            isConnected: true,
            address: simAddress,
            solBalance: bal !== null ? bal : 14.85,
            isConnecting: false,
            walletName: 'Solana Web3 Wallet'
          });
        }, 800);
      }
    } catch (err) {
      console.error('Wallet connection failed:', err);
      setWallet(prev => ({ ...prev, isConnecting: false }));
    }
  };

  const handleDisconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      solBalance: null,
      isConnecting: false,
      walletName: null
    });
  };

  const handleRpcSelect = (idx: number) => {
    setSelectedRpcIndex(idx);
    setRpcEndpointIndex(idx);
  };

  const solToken = tokens.find(t => t.symbol === 'SOL') || tokens[0];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0B0E14' }}>
      <Header
        wallet={wallet}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        news={news}
        rpcPing={metrics.pingMs}
        rpcHealth={metrics.rpcHealth}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRpcIndex={selectedRpcIndex}
        onSelectRpcIndex={handleRpcSelect}
      />

      <main style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '20px 24px 0 24px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
            {[
              { id: 'overview', label: 'Overview Terminal', icon: LayoutDashboard },
              { id: 'tokens', label: 'Asset Watchlist', icon: TrendingUp },
              { id: 'news', label: 'News & Radar', icon: Newspaper },
              { id: 'staking', label: 'Staking & Yield', icon: Coins },
              { id: 'swap', label: 'Jupiter DEX Router', icon: Zap },
              { id: 'inspector', label: 'On-Chain Inspector', icon: Database },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    background: isActive ? '#2563EB' : '#121621',
                    color: isActive ? '#FFF' : 'var(--text-muted)',
                    border: isActive ? '1px solid #3B82F6' : '1px solid var(--border-color)',
                    padding: '7px 14px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={15} color={isActive ? '#FFF' : 'var(--text-dim)'} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="live-dot" /> Live Web3 Polling Active
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            <NetworkMetricsBanner metrics={metrics} />

            <div className="dashboard-grid" style={{ marginBottom: '20px' }}>
              <div className="col-8">
                <LiveTpsChart
                  metrics={metrics}
                  onRefresh={async () => {
                    setIsRefreshingRpc(true);
                    const res = await fetchLiveSolanaNetworkMetrics();
                    setMetrics(res);
                    setIsRefreshingRpc(false);
                  }}
                  isRefreshing={isRefreshingRpc}
                />
              </div>
              <div className="col-4">
                <SolPriceChart solToken={solToken} />
              </div>
            </div>

            <div className="dashboard-grid" style={{ marginBottom: '20px' }}>
              <div className="col-8">
                <TokenWatchlist
                  tokens={tokens}
                  searchQuery={searchQuery}
                  onSelectToken={(tok) => setSelectedTokenModal(tok)}
                />
              </div>
              <div className="col-4">
                <DexSwapSimulator tokens={tokens} />
              </div>
            </div>

            <div className="dashboard-grid" style={{ marginBottom: '20px' }}>
              <div className="col-8">
                <NewsFeed articles={news} />
              </div>
              <div className="col-4">
                <StakingCalculator solToken={solToken} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'tokens' && (
          <TokenWatchlist
            tokens={tokens}
            searchQuery={searchQuery}
            onSelectToken={(tok) => setSelectedTokenModal(tok)}
          />
        )}

        {activeTab === 'news' && (
          <NewsFeed articles={news} />
        )}

        {activeTab === 'staking' && (
          <div className="dashboard-grid">
            <div className="col-8">
              <StakingCalculator solToken={solToken} />
            </div>
            <div className="col-4">
              <div className="glass-card" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>
                  Institutional Solana Staking Mechanics
                </h3>
                <ul style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.7', paddingLeft: '18px' }}>
                  <li>Participate in securing block validation across the Mainnet-Beta cluster</li>
                  <li>Earn passive rewards distributed automatically per Epoch (~2 to 3 days)</li>
                  <li>Utilize Liquid Staking (JitoSOL, mSOL) to retain DeFi capital efficiency</li>
                  <li>Capture extra MEV (Maximum Extractable Value) yield boosted via Jito Block Engine</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'swap' && (
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <DexSwapSimulator tokens={tokens} />
          </div>
        )}

        {activeTab === 'inspector' && (
          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <ExplorerInspector />
          </div>
        )}
      </main>

      <TokenDetailModal
        token={selectedTokenModal}
        onClose={() => setSelectedTokenModal(null)}
      />

      <Footer />
    </div>
  );
}

export default App;
