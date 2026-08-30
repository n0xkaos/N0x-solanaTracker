import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';
import { Activity, RefreshCw } from 'lucide-react';
import type { SolanaNetworkMetrics } from '../types/solana';

interface Props {
    metrics: SolanaNetworkMetrics;
    onRefresh: () => void;
    isRefreshing: boolean;
}

export const LiveTpsChart: React.FC<Props> = ({ metrics, onRefresh, isRefreshing }) => {
    return (
        <div className="glass-card" style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={18} color="var(--accent-blue)" />
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
                            Real-Time Network Throughput (TPS)
                        </h3>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
                        Live transaction processing comparing total cluster TPS against user (non-vote) dApp activity
                    </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8B5CF6' }} />
                            <span style={{ color: 'var(--text-muted)' }}>Total TPS</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                            <span style={{ color: 'var(--text-muted)' }}>dApps (Non-Vote)</span>
                        </div>
                    </div>

                    <button
                        onClick={onRefresh}
                        className="btn-secondary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                        disabled={isRefreshing}
                    >
                        <RefreshCw size={13} className={isRefreshing ? 'spin' : ''} />
                        Refresh
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, minHeight: '250px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metrics.tpsHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="tpsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                            </linearGradient>
                            <linearGradient id="nonVoteGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#232D3F" />
                        <XAxis dataKey="time" stroke="var(--text-dim)" fontSize={11} tickLine={false} />
                        <YAxis stroke="var(--text-dim)" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0F1420',
                                borderColor: '#232D3F',
                                borderRadius: '6px',
                                color: '#F8FAFC'
                            }}
                            formatter={(value: any) => [`${Number(value).toLocaleString('en-US')} TPS`, '']}
                        />
                        <Area
                            type="monotone"
                            dataKey="tps"
                            name="Total TPS"
                            stroke="#8B5CF6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#tpsGradient)"
                        />
                        <Area
                            type="monotone"
                            dataKey="nonVoteTps"
                            name="dApps TPS"
                            stroke="#10B981"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#nonVoteGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
