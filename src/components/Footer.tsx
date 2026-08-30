import React from 'react';
import { Zap, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer style={{ marginTop: '50px', borderTop: '1px solid var(--border-color)', background: '#0B0E14', padding: '36px 24px 28px 24px' }}>
            <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={16} color="#0B0E14" fill="#0B0E14" />
                    </div>
                    <div>
                        <div style={{ fontSize: '1rem', fontWeight: 800 }}>
                            SOLANA<span style={{ color: 'var(--solana-green)' }}>PULSE</span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                            Institutional Solana Web3 Telemetry & Ecosystem Analytics
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '18px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <a href="https://solana.com" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Solana.com <ExternalLink size={11} />
                    </a>
                    <a href="https://solscan.io" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Solscan Explorer <ExternalLink size={11} />
                    </a>
                    <a href="https://jup.ag" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Jupiter DEX <ExternalLink size={11} />
                    </a>
                    <a href="https://docs.solana.com" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Solana Docs <ExternalLink size={11} />
                    </a>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                        <span className="live-dot" /> Connected to Solana Mainnet-Beta Cluster
                    </div>
                    <div>Data synchronized via Web3 RPC & CoinGecko Real-time API</div>
                </div>
            </div>
        </footer>
    );
};
