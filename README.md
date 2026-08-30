# ⚡ N0x Solana Tracker | Web3 Ecosystem & Telemetry Dashboard

[![Solana Mainnet](https://img.shields.io/badge/Solana-Mainnet--Beta-14F195?style=flat-square&logo=solana&logoColor=black)](https://solana.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.style=flat-square)](LICENSE)

**N0x Solana Tracker** is a real-time monitoring dashboard and Web3 terminal for the Solana ecosystem. Built with React 19, TypeScript, and `@solana/web3.js`, it provides live RPC network metrics, interactive market charts, a DEX swap router simulator, a staking yield calculator, news radar, and on-chain account inspection.

---

## Features

- **Live Solana Mainnet RPC Telemetry:**
  - Real-time TPS (Total Transactions Per Second vs. Non-Vote dApp TPS).
  - Slot Height, Block Height, and Epoch progress tracking.
  - Active validator metrics and RPC latency monitoring.
  - Multi-node failover support (Official Solana Mainnet, Ankr, PublicNode).

- **Market & Asset Monitoring:**
  - SOL price tracking with 24h high/low, market cap, and volume metrics.
  - Real-time TPS cluster graphs powered by Recharts.
  - Asset Watchlist with category filters (Layer 1, DeFi, Meme, Infrastructure, DePIN).

- **Jupiter DEX Swap Router Simulator:**
  - Simulated decentralized exchange routing with customizable slippage.
  - Route estimation and priority fee calculation.

- **Staking & Yield Calculator:**
  - Yield projector for liquid staking protocols (JitoSOL, mSOL, bSOL) and native delegation.

- **On-Chain Inspector:**
  - Lookup public keys, SPL tokens, and transaction signatures directly via Solana RPC nodes.

- **News & Ecosystem Intelligence:**
  - Live news ticker and categorized Web3 news feed.

- **Web3 Wallet Integration:**
  - Phantom and browser wallet detection via `window.solana`.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Blockchain:** `@solana/web3.js`
- **Charts:** Recharts
- **Icons & UI:** Lucide React, Framer Motion
- **Styling:** Custom CSS Design System

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/n0xkaos/N0x-solanaTracker.git
   cd N0x-solanaTracker
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## Project Structure

```text
.
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── solana.ts
    ├── services/
    │   ├── solanaRpc.ts
    │   ├── coingecko.ts
    │   └── solanaNews.ts
    └── components/
        ├── Header.tsx
        ├── NetworkMetricsBanner.tsx
        ├── LiveTpsChart.tsx
        ├── SolPriceChart.tsx
        ├── TokenWatchlist.tsx
        ├── DexSwapSimulator.tsx
        ├── StakingCalculator.tsx
        ├── NewsFeed.tsx
        ├── ExplorerInspector.tsx
        ├── TokenDetailModal.tsx
        └── Footer.tsx
```

---

## License

This project is licensed under the MIT License.
