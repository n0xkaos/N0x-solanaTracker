export interface SolanaNetworkMetrics {
    tps: number;
    tpsHistory: Array<{ time: string; tps: number; nonVoteTps: number }>;
    slot: number;
    blockHeight: number;
    epoch: number;
    epochProgress: number;
    slotsRemaining: number;
    pingMs: number;
    rpcHealth: 'ok' | 'degraded' | 'error';
    validatorCount: number;
    activeNodes: number;
}

export interface EcosystemToken {
    id: string;
    symbol: string;
    name: string;
    price: number;
    priceChange24h: number;
    volume24h: number;
    marketCap: number;
    high24h: number;
    low24h: number;
    sparkline: number[];
    category: 'Layer1' | 'DeFi' | 'Infrastructure' | 'Meme' | 'DePIN';
    address: string;
    logo: string;
}

export interface SolanaNewsArticle {
    id: string;
    title: string;
    summary: string;
    url: string;
    source: string;
    publishedAt: string;
    category: 'Solana Core' | 'DeFi' | 'Memes & NFTs' | 'Infrastructure' | 'DePIN' | 'Ecosystem' | string;
    sentiment?: 'bullish' | 'neutral' | 'bearish';
    readTime?: string;
}

export interface SolanaWalletState {
    isConnected: boolean;
    address: string | null;
    solBalance: number | null;
    isConnecting: boolean;
    walletName: string | null;
}

export interface AccountInspectResult {
    address: string;
    type: 'account' | 'transaction';
    balanceSol?: number;
    executable?: boolean;
    owner?: string;
    slot?: number;
    blockTime?: string;
    status?: 'confirmed' | 'finalized' | 'failed';
    error?: string;
}
