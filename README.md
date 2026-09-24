## StockDecks

Welcome to StockDecks, A sandbox stock trading pack opening game. Buy and open packs to
build a deck of real companies. Each card is an actual stock with company info and current prices.
Track your portfolio's equity and cash balance, and sell stock cards for money to buy more packs.

>Personal in-progress project on a modern web stack.

<img width="1876" height="848" alt="image" src="https://github.com/user-attachments/assets/9ef449f1-c629-4a5b-b294-42be7a9f5914" />


## Tech stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node + Express (TypeScript) for stock data endpoints
- **Data:** Public datasets, web-scraped Python built CSVs, and stock price APIs
- **Tooling:** GitHub Actions CI (lint + build)

## Project structure

```
stockdecks/
├─ stock_decks_client/   # Next.js app (UI, game logic, API routes)
│  ├─ src/app/           # routes: home, buy, pack/[id], deck
│  ├─ src/components/    # card, cardBack, deck, packs, sellPanel
│  └─ src/lib/           # storage, wallet, card data helpers
└─ stock_decks_server/   # Express API (TypeScript)
```

## Getting started

**Prerequisites:** Node 20+ and npm.

```bash
cd stock_decks_client
npm install
npm run dev
```

Open http://localhost:3000.

To enable live price lookups, add a `.env.local` in `stock_decks_client`:

```bash
TWELVEDATA_API_KEY=your_api_key_here
```

(Get a free key at twelvedata.com. The app runs fine without it but cards will show a value of $0)

## Next Steps

1. Move client-side local storage to server with an account system
2. Expand test suite
3. Convert into mobile app layout


## Author

Matthew Keast
