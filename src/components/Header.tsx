import React, { useState } from 'react';
import {
    Zap,
    Wallet,
    Search,
    Globe,
    CheckCircle2,
    Copy,
    ChevronDown
} from 'lucide-react';
import type { SolanaWalletState, SolanaNewsArticle } from '../types/solana';
import { RPC_ENDPOINTS } from '../services/solanaRpc';

// Solana processed 2,500 transactions in the time it took my traditional bank to charge a $5 wire transfer fee.

interface HeaderProps {
    wallet: SolanaWalletState;
    onConnectWallet: () => void;
    onDisconnectWallet: () => void;
    news: SolanaNewsArticle[];
    rpcPing: number;
    rpcHealth: string;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    selectedRpcIndex: number;
    onSelectRpcIndex: (idx: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
    wallet,
    onConnectWallet,
    onDisconnectWallet,
    news,
    rpcPing,
    searchQuery,
    setSearchQuery,
    selectedRpcIndex,
    onSelectRpcIndex
}) => {
    const [copied, setCopied] = useState(false);
    const [showRpcMenu, setShowRpcMenu] = useState(false);

    const copyAddress = () => {
        if (wallet.address) {
            navigator.clipboard.writeText(wallet.address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const truncatedAddress = wallet.address
        ? `${wallet.address.slice(0, 4)}...${wallet.address.slice(-4)}`
        : '';

    return (
        <header className="header-container" style={{ position: 'sticky', top: 0, zIndex: 100, background: '#0B0E14', borderBottom: '1px solid var(--border-color)' }}>
            {news.length > 0 && (
                <div className="ticker-wrap">
                    <div className="ticker-move">
                        {news.concat(news).map((item, idx) => (
                            <span key={`${item.id}-${idx}`} className="ticker-item">
                                <span className="badge badge-solana" style={{ fontSize: '0.68rem' }}>{item.category}</span>
                                <span style={{ fontWeight: 600, color: '#E2E8F0' }}>{item.title}</span>
                                <span style={{ color: 'var(--text-dim)' }}>• {item.publishedAt}</span>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Zap size={20} color="#0B0E14" fill="#0B0E14" />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
                                SOLANA<span style={{ color: 'var(--solana-green)' }}>PULSE</span>
                            </h1>
                            <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span className="live-dot" /> MAINNET-BETA
                            </span>
                        </div>
                        <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0 }}>
                            Institutional Ecosystem Telemetry & On-Chain Analytics
                        </p>
                    </div>
                </div>

                <div style={{ position: 'relative', flex: '1', maxWidth: '380px', minWidth: '220px' }}>
                    <Search size={15} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        className="input-dark"
                        placeholder="Search tokens, dApps, or SPL address (e.g. SOL, JUP)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', paddingLeft: '36px', fontSize: '0.82rem' }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowRpcMenu(!showRpcMenu)}
                            className="btn-secondary btn-sm"
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem' }}
                            title="Click to switch Solana RPC Node"
                        >
                            <Globe size={13} color="var(--accent-blue)" />
                            <span className="mono" style={{ color: rpcPing < 400 ? 'var(--success)' : 'var(--warning)' }}>
                                {rpcPing}ms
                            </span>
                            <ChevronDown size={12} color="var(--text-dim)" />
                        </button>

                        {showRpcMenu && (
                            <div className="glass-card" style={{
                                position: 'absolute',
                                top: '110%',
                                right: 0,
                                width: '240px',
                                padding: '6px',
                                zIndex: 120,
                                background: '#121621'
                            }}>
                                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', padding: '6px 8px' }}>
                                    SOLANA RPC CLUSTER
                                </div>
                                {RPC_ENDPOINTS.map((endpoint, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            onSelectRpcIndex(idx);
                                            setShowRpcMenu(false);
                                        }}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '8px 10px',
                                            borderRadius: '4px',
                                            border: 'none',
                                            background: selectedRpcIndex === idx ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                                            color: selectedRpcIndex === idx ? 'var(--accent-blue)' : 'var(--text-main)',
                                            fontSize: '0.78rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <span>{endpoint.name}</span>
                                        {selectedRpcIndex === idx && <CheckCircle2 size={13} color="var(--accent-blue)" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {wallet.isConnected ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className="glass-card" style={{ padding: '5px 10px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
                                <Wallet size={15} color="var(--success)" />
                                <div>
                                    <div style={{ fontSize: '0.78rem', fontWeight: 700 }} className="mono">
                                        {wallet.solBalance !== null ? `${wallet.solBalance.toFixed(2)} SOL` : 'Loading...'}
                                    </div>
                                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }} className="mono">
                                        {truncatedAddress}
                                    </div>
                                </div>
                                <button onClick={copyAddress} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                                    {copied ? <CheckCircle2 size={13} color="var(--success)" /> : <Copy size={13} />}
                                </button>
                            </div>

                            <button
                                onClick={onDisconnectWallet}
                                className="btn-secondary btn-sm"
                                style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.25)' }}
                            >
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onConnectWallet}
                            className="btn-primary"
                            disabled={wallet.isConnecting}
                        >
                            <Wallet size={15} />
                            {wallet.isConnecting ? 'Connecting...' : 'Connect Web3 Wallet'}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
