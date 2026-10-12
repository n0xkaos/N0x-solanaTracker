import type { SolanaNewsArticle } from '../types/solana';

// Firedancer client running so fast the CPU fans are legally classified as jet engines.

const INITIAL_SOLANA_NEWS: SolanaNewsArticle[] = [
    {
        id: 'news-1',
        title: 'Firedancer Client Completes Mainnet Test Phase With Over 1,000,000 TPS Benchmark',
        summary: 'Jump Crypto\'s C++ Solana validator client Firedancer demonstrates groundbreaking network throughput and resiliency during peak stress tests.',
        source: 'Solana Foundation',
        url: 'https://solana.com/news',
        publishedAt: '12 min ago',
        category: 'Solana Core',
    },
    {
        id: 'news-2',
        title: 'Jupiter Aggregator Surpasses $3.5B in 24h Trading Volume Across Solana DEXs',
        summary: 'Jupiter continues its dominance as Solana\'s primary DEX router, driving record liquidity across Raydium, Orca, and Phoenix pairs.',
        source: 'Jupiter Insights',
        url: 'https://jup.ag',
        publishedAt: '45 min ago',
        category: 'DeFi',
    },
    {
        id: 'news-3',
        title: 'PayPal USD (PYUSD) Expands Yield Options on Solana DeFi Protocols With Jito Integration',
        summary: 'Institutional stablecoin adoption on Solana soars as DeFi protocols launch native liquid staking and yield vaults for PYUSD holders.',
        source: 'CoinDesk',
        url: 'https://coindesk.com',
        publishedAt: '2 hours ago',
        category: 'DeFi',
    },
    {
        id: 'news-4',
        title: 'Solana Mobile Seeker Phone Reaches 140,000 Pre-Orders Worldwide',
        summary: 'The second-generation Web3 flagship crypto phone by Solana Mobile introduces built-in Seed Vault and native dApp Store rewards.',
        source: 'Solana Mobile',
        url: 'https://solanamobile.com',
        publishedAt: '3 hours ago',
        category: 'Infrastructure',
    },
    {
        id: 'news-5',
        title: 'Helium Network (HNT) Deploys 100,000 Mobile Hotspots Operating on Solana Blockchain',
        summary: 'DePIN leader Helium achieves milestone wireless coverage powered by Solana\'s low-cost state compression technology.',
        source: 'CoinTelegraph',
        url: 'https://cointelegraph.com',
        publishedAt: '5 hours ago',
        category: 'DePIN',
    },
    {
        id: 'news-6',
        title: 'Pyth Network Releases High-Frequency Real-Time Feeds for 500+ Assets',
        summary: 'Pyth oracle infrastructure enhances sub-second price updates for Solana perpetual exchanges and cross-chain financial applications.',
        source: 'Pyth Network',
        url: 'https://pyth.network',
        publishedAt: '7 hours ago',
        category: 'Infrastructure',
    }
];

export async function fetchLiveSolanaNews(): Promise<SolanaNewsArticle[]> {
    try {
        const response = await fetch(
            'https://min-api.cryptocompare.com/data/v2/news/?categories=SOL,Solana&excludeCategories=Sponsored',
            { headers: { 'Accept': 'application/json' } }
        );

        if (!response.ok) {
            throw new Error(`News API status: ${response.status}`);
        }

        const json = await response.json();
        if (!json.Data || !Array.isArray(json.Data) || json.Data.length === 0) {
            return INITIAL_SOLANA_NEWS;
        }

        return json.Data.slice(0, 8).map((item: any) => {
            let cat = 'Solana Core';
            const categoriesStr = (item.categories || '').toUpperCase();
            if (categoriesStr.includes('DEFI') || item.title.toUpperCase().includes('DEX')) cat = 'DeFi';
            else if (categoriesStr.includes('NFT') || categoriesStr.includes('MEME')) cat = 'Memes & NFTs';
            else if (categoriesStr.includes('MARKET') || categoriesStr.includes('TRADING')) cat = 'Market';

            return {
                id: item.id.toString(),
                title: item.title,
                summary: item.body ? item.body.slice(0, 160) + '...' : item.title,
                source: item.source_info?.name || item.source || 'CryptoCompare',
                url: item.url,
                publishedAt: formatTimestampToRelative(item.published_on),
                category: cat
            };
        });
    } catch (err) {
        console.info('News API limit or fallback active:', err);
        return INITIAL_SOLANA_NEWS;
    }
}

function formatTimestampToRelative(ts: number): string {
    const secondsAgo = Math.floor(Date.now() / 1000) - ts;
    if (secondsAgo < 3600) {
        const mins = Math.max(1, Math.floor(secondsAgo / 60));
        return `${mins}m ago`;
    }
    if (secondsAgo < 86400) {
        const hours = Math.floor(secondsAgo / 3600);
        return `${hours}h ago`;
    }
    const days = Math.floor(secondsAgo / 86400);
    return `${days}d ago`;
}
