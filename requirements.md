# Woobul Collectibles — Show Calculator Web App
## Product Requirements Document

### Overview

A mobile-friendly web application used at trading card shows to quickly calculate buy/sell offers, show customers transparent pricing, and track transactions during events. The primary user is Jay (Woobul Collectibles owner) operating from a phone or tablet at a vendor table.

---

### Core Use Case

A customer walks up to the table with cards to sell. Jay needs to:

1. Look up or enter the card's market value (comp)
2. Instantly see what to offer in cash and trade credit
3. Show the customer the numbers transparently
4. Optionally log the transaction

The app must be **fast** — a transaction calculation should take under 5 seconds from comp entry to offer display.

---

### User Roles

- **Vendor (Jay)**: Primary user. Inputs comps, views offers, logs transactions.
- **Customer (at the table)**: Views the offer screen when Jay turns the phone/tablet toward them. No login or interaction required — display only.

---

### Screens / Views

#### 1. Quick Calculator (Home Screen)

**Purpose**: Instant offer calculation from a market value input.

**Inputs** (all in a single form, minimal taps):

| Field | Type | Options / Notes |
|-------|------|-----------------|
| Market Value | Currency input | The comp price (eBay sold, TCGPlayer Market). Required. |
| Card Type | Segmented toggle | `Raw NM` · `Raw LP` · `Raw MP` · `Raw HP` · `Graded` · `Sealed` |
| Condition (if Raw) | Auto-selected | NM=100%, LP=85%, MP=65%, HP=40% — applied as multiplier to market value |
| Grading Company (if Graded) | Optional toggle | `PSA` · `CGC` · `BGS` — informational only for now |
| Grade (if Graded) | Number input | 1–10. Informational for now (comps already reflect grade). |

**Outputs** (displayed immediately on input):

| Output | Calculation | Display |
|--------|-------------|---------|
| Adjusted Market Value | Market Value × Condition Multiplier | Shown for LP/MP/HP only |
| **Cash Offer** | Adjusted Market × Cash Rate (tiered) | Large, prominent display |
| **Trade Offer** | Adjusted Market × Trade Rate (tiered) | Large, prominent display, highlighted as "better deal" |
| Your Resale Net (eBay) | Market × (1 - 13.25%) - per-order fee - shipping/supplies | Smaller, for Jay's reference |
| Your Resale Net (Shopify) | Market × (1 - 2.9%) - $0.30 - shipping/supplies | Smaller, for Jay's reference |
| Your Profit (Cash Buy) | Best Resale Net - Cash Offer | Smaller, for Jay's reference |
| Your Profit (Trade Buy) | Best Resale Net - (Trade Offer × 0.40) | Smaller, for Jay's reference. 0.40 = inventory cost basis. |
| ROI (Cash) | Profit / Cash Offer | Percentage |
| ROI (Trade) | Profit / (Trade Offer × 0.40) | Percentage |

**Tiered Cash Buy Rates (NM baseline)**:

| Market Value Range | Cash Rate | Trade Rate |
|--------------------|-----------|------------|
| Under $3 | DO NOT BUY | DO NOT BUY |
| $3.00 – $4.99 | 65% | 75% |
| $5.00 – $9.99 | 70% | 80% |
| $10.00 – $19.99 | 75% | 86% |
| $20.00 – $49.99 | 78% | 90% |
| $50.00 – $99.99 | 80% | 92% |
| $100.00 – $199.99 | 80% | 92% |
| $200.00+ | 82% | 94% |

**Condition Multipliers** (applied to market value before rate lookup):

| Condition | Multiplier |
|-----------|------------|
| NM | 100% |
| LP | 85% |
| MP | 65% |
| HP | 40% |
| DM | 20% |

**Graded Card Rates** (use eBay sold comps as market value):

| eBay Comp Range | Cash Rate | Trade Rate |
|-----------------|-----------|------------|
| Under $20 | 70% | 80% |
| $20 – $49.99 | 75% | 86% |
| $50 – $99.99 | 78% | 90% |
| $100 – $249.99 | 80% | 92% |
| $250+ | 82% | 94% |

**Sealed Product Rates** (use TCGPlayer Market):

| Product Type / Value | Cash Rate | Trade Rate |
|----------------------|-----------|------------|
| Packs / small boxes ($3–$30) | 70–75% | 85–86% |
| ETBs / booster boxes ($35–$150) | 78–80% | 90–92% |
| Vintage sealed ($200+) | 75–80% | 88–92% |

**Bulk Rates** (flat per-card, not percentage-based):

| Card Type | Cash (per card) | Trade (per card) |
|-----------|-----------------|------------------|
| Commons/Uncommons | $0.03 | $0.05 |
| Reverse Holos | $0.05 | $0.08 |
| Non-Holo Rares | $0.10 | $0.15 |
| Holo Rares (under $3 market) | $0.25 | $0.35 |
| Energy Cards | $0.01 | $0.02 |

**UI Behavior**:
- Cash and Trade offers update in real-time as market value is typed
- Cards under $3 market show a note that the card will be listed at floor price online ($1.99 eBay / $1.49 Shopify) if not sold at the show
- Trade offer should be visually emphasized (larger font, green highlight, or badge saying "Better Deal")
- Jay's profit/ROI numbers should be in a collapsible section or smaller text — customer shouldn't see these when the screen is turned toward them

**Customer-Facing Mode** (toggle or swipe):
- Shows ONLY: Card description area, Cash Offer, Trade Offer
- Hides: profit, ROI, resale net, all vendor-side numbers
- Clean, professional look with Woobul branding
- Consider a simple toggle/button: "Show Customer" that switches to this view

---

#### 2. Bulk Calculator

**Purpose**: Calculate offers on a stack of bulk cards by count and rarity.

**Inputs**:

| Field | Type |
|-------|------|
| Commons/Uncommons Count | Number |
| Reverse Holos Count | Number |
| Non-Holo Rares Count | Number |
| Holo Rares Count | Number |
| Energy Cards Count | Number |

**Outputs**:
- Cash total and Trade total for each row
- Grand total (cash and trade)
- Per-card averages

---

#### 3. Misprint.com Offer Calculator

**Purpose**: Calculate fee-adjusted offers for Misprint.com purchases.

**Inputs**:

| Field | Type | Notes |
|-------|------|-------|
| Market Value | Currency | eBay comps or TCGPlayer Market |
| Card Type | Toggle | `PSA 10` · `PSA 9` · `PSA 8` · `Vintage` · `Raw NM` · `Raw LP` |

**Outputs**:

| Output | Calculation |
|--------|-------------|
| Recommended Offer % | Based on card type (PSA 10: 71%, PSA 9: 67%, etc.) |
| Offer Amount | Market × Offer % (rounded to nearest dollar) |
| Shipping | $5.00 (graded) or $2.50 (raw) — buyer's only fee |
| Total Out of Pocket | Offer + Shipping |
| True % of Market | Total OOP / Market Value |
| Resale Net (eBay) | Market × (1 - 13.25%) - $0.40 - shipping cost |
| Resale Net (Shopify) | Market × (1 - 2.9%) - $0.30 - shipping cost |
| Resale Net (In-Person) | Market × 90% |
| Estimated Profit | Best Resale Net - Total OOP |

**Misprint Offer Rates**:

| Card Type | Offer % |
|-----------|---------|
| PSA 10 (modern) | 71% |
| PSA 10 (vintage/WOTC) | 73% |
| PSA 9 (other) | 62% |
| PSA 8+ (vintage only) | 62% |
| Raw NM ($15–$50) | 70% |
| Raw NM ($50+) | 72% |
| Raw LP | 60% |

---

#### 4. Transaction Log (Optional / Phase 2)

**Purpose**: Track buys made during a show for end-of-day reconciliation.

**Fields per transaction**:

| Field | Type |
|-------|------|
| Card Name / Description | Text |
| Market Value | Currency |
| Payment Type | Cash / Trade |
| Amount Paid | Currency (auto-filled from calculator) |
| Timestamp | Auto |

**Features**:
- Running totals: total cash spent, total trade credit issued
- Export to CSV at end of day
- Persists across page refreshes (localStorage or similar)

---

#### 5. Settings

**Purpose**: All calculation variables are fully configurable so any vendor can adapt the app to their business. Woobul's rates ship as defaults for out-of-the-box use.

**Design Principle**: Every hardcoded number in the calculator should come from Settings. Nothing is baked into the calculation logic — all rates, fees, multipliers, and costs are read from a config object that Settings controls.

**Settings Sections**:

##### 5a. Buy Rates (Raw Singles)

Each tier is a row the user can edit. Include an "Add Tier" and "Remove Tier" button so vendors can define their own breakpoints.

| Default Tier | Cash Rate | Trade Rate |
|-------------|-----------|------------|
| Under $3 | 0% (Do Not Buy) | 0% (Do Not Buy) |
| $3.00 – $4.99 | 65% | 75% |
| $5.00 – $9.99 | 70% | 80% |
| $10.00 – $19.99 | 75% | 86% |
| $20.00 – $49.99 | 78% | 90% |
| $50.00 – $99.99 | 80% | 92% |
| $100.00 – $199.99 | 80% | 92% |
| $200.00+ | 82% | 94% |

##### 5b. Condition Multipliers

| Condition | Default Multiplier |
|-----------|-------------------|
| NM | 100% |
| LP | 85% |
| MP | 65% |
| HP | 40% |
| DM | 20% |

##### 5c. Graded Card Rates

Same editable tier structure as raw singles, but separate rate table.

| Default Tier | Cash Rate | Trade Rate |
|-------------|-----------|------------|
| Under $20 | 70% | 80% |
| $20 – $49.99 | 75% | 86% |
| $50 – $99.99 | 78% | 90% |
| $100 – $249.99 | 80% | 92% |
| $250+ | 82% | 94% |

##### 5d. Sealed Product Rates

| Default Tier | Cash Rate | Trade Rate |
|-------------|-----------|------------|
| Packs / small boxes ($3–$30) | 72% | 85% |
| ETBs / booster boxes ($35–$150) | 79% | 91% |
| Vintage sealed ($200+) | 77% | 90% |

##### 5e. Bulk Per-Card Rates

| Card Type | Default Cash | Default Trade |
|-----------|-------------|---------------|
| Commons/Uncommons | $0.03 | $0.05 |
| Reverse Holos | $0.05 | $0.08 |
| Non-Holo Rares | $0.10 | $0.15 |
| Holo Rares (under $3 mkt) | $0.25 | $0.35 |
| Energy Cards | $0.01 | $0.02 |

Users should be able to add/remove bulk categories.

##### 5f. Misprint.com Offer Rates

| Card Type | Default Offer % |
|-----------|----------------|
| PSA 10 (modern) | 71% |
| PSA 10 (vintage/WOTC) | 73% |
| PSA 9 (other) | 62% |
| PSA 8+ (vintage only) | 62% |
| Raw NM ($15–$50) | 70% |
| Raw NM ($50+) | 72% |
| Raw LP | 60% |

##### 5g. Misprint Buyer Fees

| Fee | Default Value |
|-----|---------------|
| Shipping (Raw) | $2.50 |
| Shipping (Graded) | $5.00 |

Note: Platform fee and Stripe fee are seller-side on Misprint. Buyers only pay shipping.

##### 5h. Selling Cost Assumptions

These feed the resale/profit calculations across all calculators.

| Constant | Default Value | Notes |
|----------|---------------|-------|
| eBay FVF Rate | 13.25% | Final Value Fee |
| eBay Per-Order Fee (≤$10) | $0.30 | Per transaction |
| eBay Per-Order Fee (>$10) | $0.40 | Per transaction |
| Shopify Processing Rate | 2.9% | CC processing |
| Shopify Per-Order Fee | $0.30 | Per transaction |
| Postage (PWE, ≤7 cards) | $0.74 | Stamp cost |
| Supplies (PWE, ≤7 cards) | $0.19 | Toploader + sleeve + envelope |
| Shipping (tracked, $50+) | $4.50 | Padded mailer + tracking |
| In-Person Sale % of Comp | 90% | What you sell at in-person (0% fees) |
| Trade Inventory Cost Basis | 40% | Real cost on inventory given as trade |

##### 5i. Branding

| Setting | Default |
|---------|---------|
| Business Name | Woobul Collectibles |
| Primary Color | Navy / #2F5496 |
| Accent Color (trade/positive) | Green / #375623 |
| Warning Color | Red / #C00000 |
| Quick Pitch Line | "I buy at 70% cash, 85% trade." |

**Settings Behavior**:
- All settings persist in localStorage (or equivalent)
- "Reset to Defaults" button restores Woobul's default configuration
- "Export Config" / "Import Config" buttons (JSON) so vendors can save/share/backup their settings
- Settings changes take effect immediately in all calculators — no page reload required
- Consider a "Profiles" feature (stretch goal) so a vendor running multiple brands or events can switch configs

---

### Platform & Technical Requirements

| Requirement | Specification |
|-------------|---------------|
| **Platform** | Web app (PWA preferred for offline use at shows) |
| **Primary Device** | Mobile phone (iPhone), secondary: tablet |
| **Responsive** | Mobile-first design. Must be usable one-handed. |
| **Offline** | Core calculator must work without internet. Transaction log should sync when reconnected. |
| **Framework** | Developer's choice — React, Vue, vanilla JS all fine. Keep it simple. |
| **Architecture** | Config-driven. All rates, fees, multipliers, and costs read from a single config object. No hardcoded calculation values in component/view logic. |
| **Hosting** | Static hosting (Vercel, Netlify, GitHub Pages, or similar) |
| **Auth** | None required for v1. Single-user app. |
| **Branding** | Configurable in Settings. Defaults to Woobul Collectibles (navy primary, green for trade/positive, red for warnings). |
| **Config Portability** | Export/import settings as JSON. Enables sharing configs between vendors or backing up before events. |

---

### Selling Cost Constants (for resale calculations)

These are the fixed costs used to calculate resale net and profit. They should be editable in Settings.

| Constant | Value | Notes |
|----------|-------|-------|
| eBay FVF Rate | 13.25% | Final Value Fee on total sale |
| eBay Per-Order Fee (≤$10) | $0.30 | Per transaction |
| eBay Per-Order Fee (>$10) | $0.40 | Per transaction |
| Shopify Processing Rate | 2.9% | Credit card processing |
| Shopify Per-Order Fee | $0.30 | Per transaction |
| Postage (PWE, ≤7 cards) | $0.74 | Stamp cost |
| Supplies (PWE, ≤7 cards) | $0.19 | Toploader + sleeve + envelope |
| Shipping (tracked, $50+) | $4.50 | Padded mailer + tracking |
| Mana Pool Fee | ~7.9% total | 5% marketplace + 2.9% CC + $0.30 (MTG singles only) |
| Trade Inventory Cost Basis | 40% | Your real cost on inventory given as trade credit |

---

### Design Notes

- **Speed is everything.** The customer is standing at your table. Every second matters.
- **Large touch targets.** Fat fingers, outdoor lighting, fast taps.
- **High contrast.** Show floors have variable lighting. Use dark text on light backgrounds.
- **The Cash vs Trade display is the hero moment.** Make it obvious that trade is the better deal for the customer. This is the pitch.
- **Customer-facing mode should feel professional.** When Jay flips the screen, the customer should see clean branding and clear numbers — not a developer tool.
- **Quick pitch banner**: Display "I buy at 70% cash, 85% trade" prominently on the home screen or as a persistent header.

---

### Out of Scope (v1)

- Comp lookup / price API integration (Jay enters comps manually from TCGPlayer/eBay)
- Inventory management
- Multi-user / employee access
- Payment processing
- Barcode/label scanning
- Customer accounts or CRM

---

### File References

These spreadsheets contain the complete data models and calculations that this app should replicate:

| Document | Contents |
|----------|----------|
| `woobul_pricing_v4.xlsx` | Platform fee comparison, floor price strategy ($1.99 eBay / $1.49 Shopify), SortSwift config, channel strategy |
| `woobul_buying_v3.xlsx` | Tiered buy rates, trade credit strategy, graded/sealed/bulk rates, show quick reference |
| `misprint_calculator.xlsx` | Misprint.com offer calculator with fee-adjusted rates and batch worksheet |
| `woobul_business_plan_2026.docx` | Full business plan with channel strategy, financial targets, acquisition channels |
