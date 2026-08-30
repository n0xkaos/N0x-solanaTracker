import React, { useState } from 'react';
import { X, ExternalLink, Copy, CheckCircle2, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import type { EcosystemToken } from '../types/solana';

interface Props {
    token: EcosystemToken | null;
    onClose: () => void;
}

export const TokenDetailModal: React.FC<Props> = ({ token, onClose }) => {
    const [copied, setCopied] = useState(false);

    if (!token) return null;

    const isPos = token.priceChange24h >= 0;

    const copyContract = () => {
        navigator.clipboard.writeText(token.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const chartData = token.sparkline.map((val, idx) => ({
        time: `Day ${idx + 1}`,
        price: val
    }));

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '24px', background: '#121621', border: '1px solid var(--border-color)', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: '#1E2536',
                        border: 'none',
                        color: 'var(--text-muted)',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <X size={16} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <img
                        src={token.logo}
                        alt={token.name}
                        style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #232D3F' }}
                    />
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{token.name} ({token.symbol})</h2>
                            <span className="badge badge-solana">{token.category}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                            <span className="mono">{token.address.slice(0, 8)}...{token.address.slice(-6)}</span>
                            <button onClick={copyContract} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                                {copied ? <CheckCircle2 size={13} color="var(--success)" /> : <Copy size={13} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
                    <span className="mono" style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF' }}>
                        ${token.price < 0.01 ? token.price.toFixed(7) : token.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className={`badge ${isPos ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.82rem' }}>
                        {isPos ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {isPos ? '+' : ''}{token.priceChange24h.toFixed(2)}% (24h)
                    </span>
                </div>

                <div style={{ height: '160px', width: '100%', marginBottom: '16px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="tokenModalGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={isPos ? '#10B981' : '#EF4444'} stopOpacity={0.25} />
                                    <stop offset="95%" stopColor={isPos ? '#10B981' : '#EF4444'} stopOpacity={0.0} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0F1420', borderColor: '#232D3F', borderRadius: '6px' }}
                                formatter={(val: any) => [`$${Number(val).toFixed(token.price < 0.01 ? 6 : 2)}`, 'Price']}
                            />
                            <Area type="monotone" dataKey="price" stroke={isPos ? '#10B981' : '#EF4444'} strokeWidth={2} fill="url(#tokenModalGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px', background: '#0F141F', padding: '12px', borderRadius: '8px' }}>
                    <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Market Cap</div>
                        <div className="mono" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                            ${(token.marketCap / 1e6).toFixed(1)}M
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>24h Volume</div>
                        <div className="mono" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                            ${(token.volume24h / 1e6).toFixed(1)}M
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>24h Range</div>
                        <div className="mono" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                            ${token.low24h} - ${token.high24h}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <a
                        href={`https://jup.ag/swap/SOL-${token.symbol}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                        style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}
                    >
                        <Zap size={15} /> Trade / Swap on Jupiter
                    </a>
                    <a
                        href={`https://dexscreener.com/solana/${token.address}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary"
                        style={{ textDecoration: 'none' }}
                    >
                        DexScreener <ExternalLink size={13} />
                    </a>
                </div>
            </div>
        </div>
    );
};
