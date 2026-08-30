import React from 'react';
import { Activity, Layers, Clock, ShieldCheck } from 'lucide-react';
import type { SolanaNetworkMetrics } from '../types/solana';

interface Props {
    metrics: SolanaNetworkMetrics;
}

export const NetworkMetricsBanner: React.FC<Props> = ({ metrics }) => {
    return (
        <div className="dashboard-grid" style={{ marginBottom: '20px' }}>
            <div className="col-3">
                <div className="glass-card glass-card-interactive" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Transactions / Sec (TPS)
                        </span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Activity size={18} color="var(--success)" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span className="mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)' }}>
                            {metrics.tps.toLocaleString('en-US')}
                        </span>
                        <span style={{ fontSize: '0.74rem', color: 'var(--success)', fontWeight: 700 }} className="badge badge-green">
                            +4.2% live
                        </span>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '6px' }}>
                        Real-time throughput processed on Solana Mainnet
                    </p>
                </div>
            </div>

            <div className="col-3">
                <div className="glass-card glass-card-interactive" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Current Slot / Block
                        </span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(153, 69, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Layers size={18} color="var(--solana-purple)" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
                            #{metrics.slot.toLocaleString('en-US')}
                        </span>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '6px' }}>
                        Block Height: <span className="mono" style={{ color: 'var(--text-muted)' }}>#{metrics.blockHeight.toLocaleString('en-US')}</span>
                    </p>
                </div>
            </div>

            <div className="col-3">
                <div className="glass-card glass-card-interactive" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Epoch #{metrics.epoch} Progress
                        </span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Clock size={18} color="var(--accent-blue)" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
                            {metrics.epochProgress}%
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            ~18h remaining
                        </span>
                    </div>
                    <div style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div
                            style={{
                                height: '100%',
                                width: `${metrics.epochProgress}%`,
                                background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
                                borderRadius: '3px',
                                transition: 'width 0.4s ease'
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="col-3">
                <div className="glass-card glass-card-interactive" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Active Validators
                        </span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShieldCheck size={18} color="var(--success)" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
                            {metrics.validatorCount.toLocaleString('en-US')}
                        </span>
                        <span className="badge badge-info" style={{ fontSize: '0.68rem' }}>
                            Node 100% Healthy
                        </span>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '6px' }}>
                        RPC Latency: <span className="mono" style={{ color: 'var(--success)' }}>{metrics.pingMs}ms</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
