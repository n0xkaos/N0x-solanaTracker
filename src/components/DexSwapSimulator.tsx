import React, { useState } from 'react';
import { RefreshCw, ArrowDown, Settings2, Zap, CheckCircle2 } from 'lucide-react';
import type { EcosystemToken } from '../types/solana';

interface Props {
    tokens: EcosystemToken[];
}

export const DexSwapSimulator: React.FC<Props> = ({ tokens }) => {
    const [paySymbol, setPaySymbol] = useState<string>('SOL');
    const [receiveSymbol, setReceiveSymbol] = useState<string>('JUP');
    const [payAmount, setPayAmount] = useState<string>('1.0');
    const [slippage, setSlippage] = useState<number>(0.5);
    const [isSwapping, setIsSwapping] = useState<boolean>(false);
    const [swapSuccess, setSwapSuccess] = useState<boolean>(false);

    const payToken = tokens.find(t => t.symbol === paySymbol) || tokens[0];
    const receiveToken = tokens.find(t => t.symbol === receiveSymbol) || tokens[1];

    const payValueUsd = (parseFloat(payAmount) || 0) * (payToken?.price || 1);
    const estimatedReceiveAmount = receiveToken?.price
        ? (payValueUsd / receiveToken.price).toFixed(receiveToken.price < 0.01 ? 2 : 4)
        : '0';

    const handleSwapTokens = () => {
        setPaySymbol(receiveSymbol);
        setReceiveSymbol(paySymbol);
    };

    const executeSimulatedSwap = () => {
        setIsSwapping(true);
        setTimeout(() => {
            setIsSwapping(false);
            setSwapSuccess(true);
            setTimeout(() => setSwapSuccess(false), 3500);
        }, 1200);
    };

    return (
        <div className="glass-card" style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={18} color="var(--solana-purple)" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                            Jupiter Swap Router (DEX Simulator)
                        </h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        <Settings2 size={13} /> Slippage:
                        {[0.1, 0.5, 1.0].map((sl) => (
                            <button
                                key={sl}
                                onClick={() => setSlippage(sl)}
                                style={{
                                    background: slippage === sl ? '#2563EB' : '#0F141F',
                                    color: slippage === sl ? '#FFF' : 'var(--text-dim)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '4px',
                                    padding: '2px 5px',
                                    fontSize: '0.7rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {sl}%
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ background: '#0F141F', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        <span>You Pay</span>
                        <span>Balance: <strong style={{ color: 'var(--text-main)' }}>14.85 {paySymbol}</strong></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                        <input
                            type="number"
                            value={payAmount}
                            onChange={(e) => setPayAmount(e.target.value)}
                            className="mono"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#FFF',
                                fontSize: '1.3rem',
                                fontWeight: 700,
                                outline: 'none',
                                width: '60%'
                            }}
                        />

                        <select
                            value={paySymbol}
                            onChange={(e) => setPaySymbol(e.target.value)}
                            style={{
                                background: '#1E2536',
                                border: '1px solid var(--border-color)',
                                color: '#FFF',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            {tokens.map(t => (
                                <option key={t.id} value={t.symbol} style={{ background: '#121621' }}>
                                    {t.symbol}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '3px' }}>
                        ~${payValueUsd.toFixed(2)} USD
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', margin: '-12px 0', position: 'relative', zIndex: 2 }}>
                    <button
                        onClick={handleSwapTokens}
                        style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#121621',
                            border: '1px solid #3B82F6',
                            color: '#3B82F6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <ArrowDown size={14} />
                    </button>
                </div>

                <div style={{ background: '#0F141F', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', marginTop: '4px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        <span>You Receive (Estimated)</span>
                        <span>Router Fee: <strong style={{ color: 'var(--success)' }}>0.00%</strong></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                        <div className="mono" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--success)' }}>
                            {estimatedReceiveAmount}
                        </div>

                        <select
                            value={receiveSymbol}
                            onChange={(e) => setReceiveSymbol(e.target.value)}
                            style={{
                                background: '#1E2536',
                                border: '1px solid var(--border-color)',
                                color: '#FFF',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            {tokens.map(t => (
                                <option key={t.id} value={t.symbol} style={{ background: '#121621' }}>
                                    {t.symbol}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '3px' }}>
                        ~${payValueUsd.toFixed(2)} USD
                    </div>
                </div>
            </div>

            <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Network Priority Fee:</span>
                        <span className="mono">0.000005 SOL (~$0.001)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Liquidity Path:</span>
                        <span style={{ color: '#60A5FA', fontWeight: 600 }}>Raydium CLMM ➔ Jupiter v6</span>
                    </div>
                </div>

                {swapSuccess && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10B981', color: '#10B981', borderRadius: '6px', padding: '8px', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                        <CheckCircle2 size={14} /> Swap order successfully simulated on Mainnet-Beta!
                    </div>
                )}

                <button
                    onClick={executeSimulatedSwap}
                    disabled={isSwapping}
                    className="btn-primary"
                    style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '0.9rem' }}
                >
                    {isSwapping ? (
                        <>
                            <RefreshCw size={16} className="spin" /> Routing Swap Order...
                        </>
                    ) : (
                        <>
                            Simulate Swap {paySymbol} ➔ {receiveSymbol}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
