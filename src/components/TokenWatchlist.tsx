import React, { useState } from 'react';
import {
    ArrowUpRight,
    ArrowDownRight,
    ExternalLink,
    Copy,
    CheckCircle2,
    TrendingUp
} from 'lucide-react';
import type { EcosystemToken } from '../types/solana';

interface Props {
    tokens: EcosystemToken[];
    searchQuery: string;
    onSelectToken: (token: EcosystemToken) => void;
}

export const TokenWatchlist: React.FC<Props> = ({ tokens, searchQuery, onSelectToken }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

    const categories = ['All', 'Layer1', 'DeFi', 'Meme', 'Infrastructure', 'DePIN'];

    const handleCopy = (e: React.MouseEvent, address: string) => {
        e.stopPropagation();
        navigator.clipboard.writeText(address);
        setCopiedAddress(address);
        setTimeout(() => setCopiedAddress(null), 2000);
    };

    const filteredTokens = tokens.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.symbol.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => b.marketCap - a.marketCap);

    return (
        <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TrendingUp size={18} color="var(--solana-purple)" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                            Solana Ecosystem Asset Watchlist
                        </h3>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
                        Real-time market valuation, liquidity volume, and DEX trading metrics
                    </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                background: selectedCategory === cat ? 'rgba(59, 130, 246, 0.18)' : '#0F141F',
                                color: selectedCategory === cat ? '#60A5FA' : 'var(--text-muted)',
                                border: selectedCategory === cat ? '1px solid #3B82F6' : '1px solid var(--border-color)',
                                padding: '4px 12px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <th style={{ padding: '10px 12px' }}># Asset</th>
                            <th style={{ padding: '10px 12px' }}>Price (USD)</th>
                            <th style={{ padding: '10px 12px' }}>24h %</th>
                            <th style={{ padding: '10px 12px' }}>24h Volume</th>
                            <th style={{ padding: '10px 12px' }}>Market Cap</th>
                            <th style={{ padding: '10px 12px' }}>Category</th>
                            <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTokens.map((token, index) => {
                            const isPos = token.priceChange24h >= 0;
                            return (
                                <tr
                                    key={token.id}
                                    onClick={() => onSelectToken(token)}
                                    style={{
                                        borderBottom: '1px solid var(--border-subtle)',
                                        cursor: 'pointer',
                                        transition: 'background 0.15s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#1E2536'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', width: '16px' }}>{index + 1}</span>
                                            <img
                                                src={token.logo}
                                                alt={token.name}
                                                onError={(e) => {
                                                    (e.target as any).src = 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png';
                                                }}
                                                style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                                            />
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{token.symbol}</div>
                                                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{token.name}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td style={{ padding: '12px' }} className="mono">
                                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                                            ${token.price < 0.01 ? token.price.toFixed(7) : token.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                    </td>

                                    <td style={{ padding: '12px' }}>
                                        <span className={`badge ${isPos ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.75rem' }}>
                                            {isPos ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                                            {isPos ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                                        </span>
                                    </td>

                                    <td style={{ padding: '12px' }} className="mono">
                                        <span style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>
                                            ${(token.volume24h / 1e6).toFixed(1)}M
                                        </span>
                                    </td>

                                    <td style={{ padding: '12px' }} className="mono">
                                        <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                                            ${(token.marketCap / 1e6).toFixed(1)}M
                                        </span>
                                    </td>

                                    <td style={{ padding: '12px' }}>
                                        <span className="badge badge-solana" style={{ fontSize: '0.7rem' }}>
                                            {token.category}
                                        </span>
                                    </td>

                                    <td style={{ padding: '12px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                                            <button
                                                onClick={(e) => handleCopy(e, token.address)}
                                                className="btn-secondary btn-sm"
                                                title="Copy SPL Contract Address"
                                                style={{ padding: '4px 8px' }}
                                            >
                                                {copiedAddress === token.address ? <CheckCircle2 size={13} color="var(--success)" /> : <Copy size={13} />}
                                            </button>
                                            <a
                                                href={`https://dexscreener.com/solana/${token.address}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="btn-secondary btn-sm"
                                                title="View on DexScreener"
                                                style={{ padding: '4px 8px' }}
                                            >
                                                <ExternalLink size={13} />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
