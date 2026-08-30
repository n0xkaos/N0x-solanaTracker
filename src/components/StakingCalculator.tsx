import React, { useState } from 'react';
import { Coins, Award } from 'lucide-react';
import type { EcosystemToken } from '../types/solana';

interface Props {
    solToken: EcosystemToken;
}

export const StakingCalculator: React.FC<Props> = ({ solToken }) => {
    const [stakeAmount, setStakeAmount] = useState<number>(100);
    const [selectedProvider, setSelectedProvider] = useState<'jito' | 'marinade' | 'blaze' | 'native'>('jito');

    const providers = {
        jito: { name: 'JitoSOL (MEV Rewards)', apy: 7.42, badge: 'Highest Yield', color: '#10B981' },
        marinade: { name: 'Marinade mSOL', apy: 7.15, badge: 'Largest TVL', color: '#3B82F6' },
        blaze: { name: 'BlazeStake bSOL', apy: 7.02, badge: 'Community Pool', color: '#8B5CF6' },
        native: { name: 'Native Validator Stake', apy: 6.78, badge: 'No Smart Contract Risk', color: '#06B6D4' },
    };

    const currentApy = providers[selectedProvider].apy;
    const yearlySolReward = (stakeAmount * currentApy) / 100;
    const monthlySolReward = yearlySolReward / 12;
    const dailySolReward = yearlySolReward / 365;

    const yearlyUsdReward = yearlySolReward * solToken.price;

    return (
        <div className="glass-card" style={{ padding: '20px', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Coins size={18} color="var(--success)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                    Staking & Yield Rewards Calculator
                </h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Calculate projected APY passive income from delegating SOL to validators and liquid staking pools
            </p>

            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                    <span>SOL Delegation Amount:</span>
                    <span className="mono" style={{ color: 'var(--success)', fontWeight: 700 }}>
                        {stakeAmount} SOL (~${(stakeAmount * solToken.price).toLocaleString('en-US', { maximumFractionDigits: 0 })} USD)
                    </span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="5000"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer', marginBottom: '8px' }}
                />
                <div style={{ display: 'flex', gap: '6px' }}>
                    {[10, 50, 100, 500, 1000].map((val) => (
                        <button
                            key={val}
                            onClick={() => setStakeAmount(val)}
                            className="btn-secondary btn-sm"
                            style={{
                                background: stakeAmount === val ? 'rgba(16, 185, 129, 0.18)' : '#0F141F',
                                color: stakeAmount === val ? '#10B981' : 'var(--text-muted)',
                                borderColor: stakeAmount === val ? '#10B981' : 'var(--border-color)',
                                flex: 1
                            }}
                        >
                            {val} SOL
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Select Staking Protocol:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {(Object.keys(providers) as Array<keyof typeof providers>).map((key) => {
                        const p = providers[key];
                        const isSel = selectedProvider === key;
                        return (
                            <div
                                key={key}
                                onClick={() => setSelectedProvider(key)}
                                style={{
                                    padding: '10px',
                                    borderRadius: '6px',
                                    border: isSel ? `1px solid ${p.color}` : '1px solid var(--border-color)',
                                    background: isSel ? '#1E2536' : '#0F141F',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isSel ? '#FFF' : 'var(--text-main)' }}>{p.name}</span>
                                    <span className="mono" style={{ fontSize: '0.84rem', fontWeight: 800, color: p.color }}>{p.apy}% APY</span>
                                </div>
                                <span className="badge badge-solana" style={{ fontSize: '0.66rem' }}>{p.badge}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{ background: '#0F141F', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={15} /> ESTIMATED PASSIVE YIELD RETURN
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
                    <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Daily</div>
                        <div className="mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF' }}>
                            +{dailySolReward.toFixed(3)} SOL
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                            ${(dailySolReward * solToken.price).toFixed(2)}
                        </div>
                    </div>

                    <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Monthly</div>
                        <div className="mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF' }}>
                            +{monthlySolReward.toFixed(2)} SOL
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                            ${(monthlySolReward * solToken.price).toFixed(2)}
                        </div>
                    </div>

                    <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Annual</div>
                        <div className="mono" style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--success)' }}>
                            +{yearlySolReward.toFixed(2)} SOL
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 700 }}>
                            ${yearlyUsdReward.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
