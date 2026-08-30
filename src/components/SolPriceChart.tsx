import React, { useState } from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { EcosystemToken } from '../types/solana';

interface Props {
    solToken: EcosystemToken;
}

export const SolPriceChart: React.FC<Props> = ({ solToken }) => {
    const [timeframe, setTimeframe] = useState<'24H' | '7D' | '1M'>('24H');

    const chartData = solToken.sparkline.map((price, index) => {
        return {
            step: `${index * 3}h`,
            price: price
        };
    });

    const isPositive = solToken.priceChange24h >= 0;

    return (
        <div className="glass-card" style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                        src={solToken.logo}
                        alt="Solana"
                        style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #232D3F' }}
                    />
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Solana (SOL)</h3>
                            <span className="badge badge-solana">Native</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-Time Valuation (USD)</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '2px', background: '#0D111A', padding: '3px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    {(['24H', '7D', '1M'] as const).map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            style={{
                                background: timeframe === tf ? '#2563EB' : 'transparent',
                                color: timeframe === tf ? '#FFF' : 'var(--text-muted)',
                                border: 'none',
                                padding: '3px 10px',
                                borderRadius: '4px',
                                fontSize: '0.74rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '14px' }}>
                <span className="mono" style={{ fontSize: '2.1rem', fontWeight: 800 }}>
                    ${solToken.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`badge ${isPositive ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.82rem', padding: '4px 10px' }}>
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {isPositive ? '+' : ''}{solToken.priceChange24h.toFixed(2)}%
                </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    <span>24h Low: <strong>${solToken.low24h}</strong></span>
                    <span>24h High: <strong>${solToken.high24h}</strong></span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', position: 'relative' }}>
                    <div
                        style={{
                            position: 'absolute',
                            left: `${Math.max(5, Math.min(95, ((solToken.price - solToken.low24h) / (solToken.high24h - solToken.low24h)) * 100))}%`,
                            top: '-3px',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: '#10B981',
                            transform: 'translateX(-50%)'
                        }}
                    />
                </div>
            </div>

            <div style={{ flex: 1, minHeight: '200px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                            <linearGradient id="solPriceGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0.25} />
                                <stop offset="95%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0.0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="step" stroke="var(--text-dim)" fontSize={10} tickLine={false} />
                        <YAxis stroke="var(--text-dim)" fontSize={10} tickLine={false} domain={['auto', 'auto']} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0F1420',
                                borderColor: '#232D3F',
                                borderRadius: '6px',
                                color: '#F8FAFC'
                            }}
                            formatter={(val: any) => [`$${Number(val).toFixed(2)}`, 'SOL Price']}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={isPositive ? '#10B981' : '#EF4444'}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#solPriceGrad)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Market Cap</div>
                    <div className="mono" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                        ${(solToken.marketCap / 1e9).toFixed(2)}B USD
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>24h Volume</div>
                    <div className="mono" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                        ${(solToken.volume24h / 1e9).toFixed(2)}B USD
                    </div>
                </div>
            </div>
        </div>
    );
};
