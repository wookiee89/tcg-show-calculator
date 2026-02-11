# TCG Show Calculator

A mobile-first web app for trading card game vendors to quickly calculate buy offers, bulk pricing, and misprint/graded card valuations on the fly at shows and conventions.

**Live app:** [https://wookiee89.github.io/tcg-show-calculator/](https://wookiee89.github.io/tcg-show-calculator/)

## Who is this for?

TCG Show Calculator is built for **card shop owners, booth vendors, and independent buyers** who purchase trading cards at shows, conventions, and local meetups. Instead of doing mental math or pulling up spreadsheets mid-transaction, you can punch in a market value and get instant, consistent offers.

## Features

### Quick Calculator
Enter a card's market value and condition to get cash and trade offers based on configurable rate tiers. Supports raw singles, graded cards, and sealed product. Includes a customer-facing view you can flip your phone around to show, plus vendor-only profit metrics with resale estimates across eBay, Shopify, Mana Pool (MTG only), and in-person channels.

### Bulk Calculator
Price out bulk lots by category (commons/uncommons, reverse holos, holo rares, non-holo rares, energy) with per-card cash and trade rates. Running totals update as you enter quantities.

### Misprint Calculator
A comprehensive 30-type rate matrix for misprint/error card buying across four grading companies (PSA, CGC, BGS, and Raw). Each company tab shows the relevant grade tiers with offer percentages. PASS types flag grades that don't sell reliably enough to buy. Calculates total out-of-pocket cost including shipping, true percentage of market value, and estimated profit from resale.

## Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Vite** for dev/build
- **Vitest** for unit tests
- **PWA** (installable, works offline via service worker)

## Local Development

```bash
npm install
npm run dev        # Start dev server at localhost:5173
npm test           # Run unit tests
npm run build      # Production build
```

## Deployment

The app auto-deploys to GitHub Pages on every push to `main` via GitHub Actions.

## Feedback

Found a bug or have a feature request? [Open an issue](https://github.com/wookiee89/tcg-show-calculator/issues) on this repo.
