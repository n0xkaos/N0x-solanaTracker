# ⚡ N0x Solana Tracker | Complete Web3 Ecosystem Telemetry & Analytics Terminal

[![Solana Mainnet](https://img.shields.io/badge/Solana-Mainnet--Beta-14F195?style=flat-square&logo=solana&logoColor=black)](https://solana.com)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.style=flat-square)](LICENSE)
[![Author](https://img.shields.io/badge/Author-n0xkaos-9945FF?style=flat-square)](https://github.com/n0xkaos)

**N0x Solana Tracker** is an institutional-grade real-time telemetry dashboard and Web3 analytics terminal for the Solana blockchain. Built with React 19, TypeScript, and `@solana/web3.js`, the platform provides live RPC network health metrics, interactive market valuation charts, Jupiter DEX router swap simulation, liquid staking yield calculators, real-time news radar, and on-chain account/transaction inspection.

---

## 🚀 Key Features & System Architecture

### 1. 📊 Real-Time Network Telemetry Banner
- **TPS Monitor:** Real-time throughput calculation distinguishing between **Total Cluster TPS** and **Non-Vote dApp TPS**.
- **Block & Slot Height:** Live tracking of current Solana slot height and block height via `@solana/web3.js` RPC calls.
- **Epoch Progress:** Displays current Epoch status, percentage progress bar, and estimated time remaining (~2 to 3 days per epoch).
- **Validator & RPC Health:** Latency tracker (ping in ms) and node status indicator with instant RPC failover options.

### 2. 📈 Live TPS & Asset Price Charts
- **Recharts Dynamic Area Charts:** High-frequency performance charts powered by gradient smooth SVG renders.
- **SOL Price Valuation:** Real-time SOL/USD spot price with 24-hour range slider (Low vs. High), 24h volume, and market capitalization metrics.

### 3. 🪙 Asset Watchlist & Ecosystem Radar
- Categorized Solana ecosystem tokens (Layer 1, DeFi, Meme, Infrastructure, DePIN).
- Live pricing, 24h percentage changes, market caps, 24h trading volume, and instant contract address copy functionality.
- Direct links to **DexScreener** and **Jupiter DEX** trading pairs.

### 4. ⚡ Jupiter DEX Swap Router Simulator
- Real-time decentralized exchange swap router simulator.
- Configurable slippage tolerance (0.1%, 0.5%, 1.0%).
- Priority fee estimation (`0.000005 SOL`), liquidity path calculation (`Raydium CLMM ➔ Jupiter v6`), and simulated trade execution state.

### 5. 💰 Staking & Yield Calculator
- Yield projector for liquid staking protocols (**JitoSOL**, **Marinade mSOL**, **BlazeStake bSOL**) and native validator delegation.
- Dynamic reward breakdown showing **Daily**, **Monthly**, and **Annual** returns in both SOL and USD value.

### 6. 🔍 On-Chain Inspector
- Inspect any Solana public key address, SPL token mint, or transaction signature.
- Displays lamport balance translated to SOL, account owner program, and direct deep links to **Solscan** and **Solana Explorer**.

### 7. 📰 Solana Intelligence & News Feed
- Automated ticker and filtered news feed covering Solana Core, DeFi, Infrastructure, and Memes & NFTs.
- Relative timestamp formatting and expandable article detail modal.

---

## 🛠️ Data Services & RPC Failover Architecture

The system utilizes a 3-tier resilient data pipeline:

1. **Solana Web3 RPC Service (`solanaRpc.ts`):**
   - Connects to Solana Mainnet RPC endpoints with automatic failover between Official Mainnet, Ankr Public RPC, and PublicNode.
   - Calculates cluster latency and fallback metrics if rate limits occur.

2. **CoinGecko Market API (`coingecko.ts`):**
   - Fetches live 24h market metrics, sparklines, volume, and prices for top Solana ecosystem tokens.
   - Built-in fallback algorithm guarantees UI stability during API downtime.

3. **CryptoCompare News API (`solanaNews.ts`):**
   - Real-time news classifier categorizing articles based on Solana Web3 topics.

---

## ⚙️ Installation & Running Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/n0xkaos/N0x-solanaTracker.git
cd N0x-solanaTracker/solana-report

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build production bundle
npm run build
```

---

## 📂 Project Structure

```text
solana-report/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── DexSwapSimulator.tsx    # Jupiter DEX Router Simulator
│   │   ├── ExplorerInspector.tsx   # On-Chain Account & Tx Inspector
│   │   ├── Footer.tsx              # Footer & Signature
│   │   ├── Header.tsx              # Header & RPC Cluster Switcher
│   │   ├── LiveTpsChart.tsx        # TPS Performance Chart
│   │   ├── NetworkMetricsBanner.tsx# Top Metrics Banner
│   │   ├── NewsFeed.tsx            # News Feed & Radar Modal
│   │   ├── SolPriceChart.tsx       # SOL Price & Valuation Chart
│   │   ├── StakingCalculator.tsx   # Staking APY Yield Projector
│   │   ├── TokenDetailModal.tsx    # Token Information Modal
│   │   └── TokenWatchlist.tsx      # Asset Watchlist Table
│   ├── services/
│   │   ├── coingecko.ts            # Token Market Data Service
│   │   ├── solanaNews.ts           # News API & Categorizer
│   │   └── solanaRpc.ts            # Solana Web3.js RPC Service
│   ├── types/
│   │   └── solana.ts               # TypeScript Interfaces
│   ├── App.css
│   ├── App.tsx                     # Main Dashboard Application
│   ├── index.css                   # Custom CSS Design System
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🤖 Developer Easter Eggs & Code Comments

The codebase includes 5 witty pro-Solana & Web3 developer code comments:
1. `solanaRpc.ts`: `// 400ms block times mean Solana updates faster than my browser can crash a Chrome tab.`
2. `coingecko.ts`: `// My computer science degree taught me algorithms. Solana taught me that a dog with a hat can fund my retirement.`
3. `solanaNews.ts`: `// Firedancer client running so fast the CPU fans are legally classified as jet engines.`
4. `DexSwapSimulator.tsx`: `// Swapping on Jupiter is so fast and cheap I accidentally rebalanced my portfolio 14 times while testing this button.`
5. `Header.tsx`: `// Solana processed 2,500 transactions in the time it took my traditional bank to charge a $5 wire transfer fee.`

---

## ✍️ Author & Credits

Designed, developed, and maintained by **n0xkaos**.

- **GitHub Signature:** `n0xkaos`
- **UI Signature:** Included in the system footer (`Crafted with ⚡ by n0xkaos`)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
