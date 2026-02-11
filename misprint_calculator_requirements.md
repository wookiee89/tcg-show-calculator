# Misprint.com Offer Calculator — Web Application
## Product Requirements Document

### Overview

A lightweight web application for calculating optimal offer prices on Misprint.com, a bid/ask marketplace for Pokemon trading cards. The app replaces the current spreadsheet-based workflow with a fast, mobile-friendly tool that can be used while browsing Misprint listings on a phone or desktop.

---

### Core Use Case

Jay is browsing Misprint.com listings on his phone or computer. He sees a card he's interested in and needs to:

1. Enter the card's market value (from eBay sold comps or TCGPlayer Market)
2. Select the card type (PSA 10, PSA 9, Raw NM, etc.)
3. Instantly see the recommended offer amount to type into Misprint
4. See his total out-of-pocket cost and estimated profit per resale channel
5. Decide whether the deal is worth pursuing

Secondary use case: batch evaluation — entering multiple cards at once to plan a round of offers across many listings.

---

### User Roles

- **Primary User (Jay / any reseller)**: Inputs comps, views recommended offers, evaluates deals.
- **Other Vendors**: Can configure their own offer rates and selling costs via Settings.

---

### Screens / Views

#### 1. Single Card Calculator (Home Screen)

**Purpose**: Instant offer calculation from a market value and card type.

**Inputs**:

| Field | Type | Notes |
|-------|------|-------|
| Market Value | Currency input | eBay sold comps or TCGPlayer Market. Required. Auto-focuses on load. |
| Card Type | Segmented toggle | `PSA` · `CGC` · `BGS` · `Raw` |
| Grade / Condition | Dropdown (dynamic) | Updates based on Card Type. See below. |
| Era | Toggle | `Modern` · `Vintage` (WOTC-era, pre-2003) |

**Dynamic Grade/Condition options by Card Type:**
- PSA → `10` · `9` · `8` · `7-`
- CGC → `10` · `9.5` · `9` · `8.5` · `8` · `7-`
- BGS → `BL` (Black Label) · `10` · `9.5` · `9` · `8.5` · `8` · `7-`
- Raw → `NM` · `LP` · `MP` · `HP` · `DM`

**PASS logic**: Certain combinations should display "PASS — Do not buy" instead of an offer. Specifically: modern cards graded PSA 7 and below, CGC 8 and below modern, BGS 8.5 and below modern. These have no resale demand at premium over raw.

**Outputs** (update in real-time as inputs change):

**Primary Display (large, prominent)**:

| Output | Calculation |
|--------|-------------|
| **Card Description** | Auto-generated: e.g., "PSA 10 Modern" or "Raw LP" or "BGS 9.5 Vintage" |
| **Recommended Offer** | Market Value × Offer Rate, rounded to nearest dollar. This is the number to type into Misprint. Shows "PASS" for invalid combos. |
| **Total Out of Pocket** | Offer + Shipping. Highlighted as the "real cost." |
| **True % of Market** | Total OOP / Market Value |

**Resale Analysis (secondary display, collapsible)**:

| Output | Calculation |
|--------|-------------|
| eBay Resale Net | Market × (1 - eBay FVF%) - per-order fee - selling shipping cost |
| Shopify Resale Net | Market × (1 - Shopify%) - $0.30 - selling shipping cost |
| In-Person Resale Net | Market × In-Person Sale % (default 90%) |
| eBay Profit | eBay Resale Net - Total OOP |
| Shopify Profit | Shopify Resale Net - Total OOP |
| In-Person Profit | In-Person Resale Net - Total OOP |
| Best ROI | Highest profit / Total OOP, with channel label |

**Deal Quality Indicator**:
- Green badge: profit > 15% ROI on best channel → "Good Deal"
- Yellow badge: profit 5–15% ROI → "Marginal"
- Red badge: profit < 5% or negative → "Pass"
- Thresholds should be configurable in Settings

**Shipping Logic** (buyer-side only — Misprint platform/Stripe fees are paid by the seller):

| Card Type | Shipping Cost |
|-----------|---------------|
| Any graded slab (PSA, CGC, BGS) | $5.00 |
| Raw (any condition) | $2.50 |

---

#### 2. Batch Offer Worksheet

**Purpose**: Evaluate multiple cards at once for a Misprint offer session.

**Layout**: Spreadsheet-style table. Each row is a card.

**Columns**:

| Column | Type | Notes |
|--------|------|-------|
| Card Name | Text input | For reference only. Optional. |
| Market Value | Currency input | Required. |
| Card Type | Dropdown | `PSA` · `CGC` · `BGS` · `Raw` |
| Grade / Condition | Dropdown (dynamic) | Based on Card Type selection. |
| Era | Dropdown | `Modern` · `Vintage` |
| Offer % | Auto-calculated | Based on full matrix from Settings. Shows 0% for PASS combos. |
| Offer $ | Auto-calculated | Market × Offer %, rounded. Blank for PASS. |
| Shipping | Auto-calculated | $5 graded, $2.50 raw. |
| Total OOP | Auto-calculated | Offer + Shipping. |
| Est. Profit (best channel) | Auto-calculated | Best of eBay/Shopify/In-Person net minus OOP. |

**Features**:
- Start with 5 empty rows, "Add Row" button to add more
- "Clear All" button to reset
- Totals row at bottom: sum of Offer $, Total OOP, Est. Profit
- Ability to remove individual rows
- Copy offer amounts to clipboard (one-tap per row) for pasting into Misprint

---

#### 3. Offer History (Optional / Phase 2)

**Purpose**: Track offers made and their outcomes over time.

**Fields per entry**:

| Field | Type |
|-------|------|
| Card Name | Text |
| Market Value | Currency |
| Offer Amount | Currency (auto-filled from calculator) |
| Card Type | From calculator |
| Date | Auto-timestamp |
| Status | `Pending` · `Accepted` · `Declined` · `Countered` |
| Actual Purchase Price | Currency (if accepted at different price) |
| Sold? | Toggle |
| Sale Price | Currency |
| Sale Channel | eBay / Shopify / In-Person / Mana Pool |

**Features**:
- Filter by status, card type, date range
- Summary stats: acceptance rate, avg profit on accepted deals, total spent, total profit
- Export to CSV
- Persists in localStorage or backend

---

#### 4. Settings

**Purpose**: All calculation variables are fully configurable. Woobul's rates ship as defaults.

**Design Principle**: Every number in the calculator reads from a config object controlled by Settings. No hardcoded values in calculation logic.

##### 4a. Misprint Offer Rates

**PSA (Most Liquid)**:

| Card Type | Default Offer % |
|-----------|----------------|
| PSA 10 Modern | 71% |
| PSA 10 Vintage (WOTC) | 73% |
| PSA 9 Standard | 62% |
| PSA 8 Vintage | 62% |
| PSA 8 Modern | 55% |
| PSA 7 & below Vintage | 55% |
| PSA 7 & below Modern | PASS (0%) |

**CGC (Slightly Less Liquid)**:

| Card Type | Default Offer % |
|-----------|----------------|
| CGC 10 Perfect | 68% |
| CGC 9.5 Modern | 67% |
| CGC 9.5 Vintage | 70% |
| CGC 9 Standard | 58% |
| CGC 8.5 Vintage | 58% |
| CGC 8.5 Modern | 52% |
| CGC 8 & below Vintage | 52% |
| CGC 8 & below Modern | PASS (0%) |

**BGS (Subgrades Matter)**:

| Card Type | Default Offer % |
|-----------|----------------|
| BGS 10 Black Label | 75% |
| BGS 10 Pristine | 72% |
| BGS 9.5 Gem Mint Modern | 67% |
| BGS 9.5 Gem Mint Vintage | 70% |
| BGS 9 Standard | 58% |
| BGS 8.5 & below Vintage | 55% |
| BGS 8.5 & below Modern | PASS (0%) |

**Raw (Ungraded)**:

| Card Type | Default Offer % |
|-----------|----------------|
| Raw NM ($15–$50) | 70% |
| Raw NM ($50+) | 72% |
| Raw LP ($15–$50) | 60% |
| Raw LP ($50+) | 63% |
| Raw MP ($15–$50) | 50% |
| Raw MP ($50+) | 53% |
| Raw HP (any) | 40% |
| Raw DM (any) | 30% |

Users should be able to add/remove/rename card type categories and adjust all rates.

##### 4b. Misprint Buyer Fees

| Fee | Default Value | Notes |
|-----|---------------|-------|
| Shipping (Raw) | $2.50 | Per-card for raw/ungraded |
| Shipping (Graded) | $5.00 | Per-card for slabs |

Note: Platform fee (7%) and Stripe fee (2.9% + $0.30) are seller-side on Misprint. Buyers only pay item price + shipping.

##### 4c. Selling Cost Assumptions

These power the resale/profit calculations.

| Constant | Default Value | Notes |
|----------|---------------|-------|
| eBay FVF Rate | 13.25% | Final Value Fee on total sale |
| eBay Per-Order Fee (≤$10) | $0.30 | Per transaction |
| eBay Per-Order Fee (>$10) | $0.40 | Per transaction |
| Shopify Processing Rate | 2.9% | CC processing |
| Shopify Per-Order Fee | $0.30 | Per transaction |
| Selling Shipping (raw, PWE) | $0.93 | $0.74 postage + $0.19 supplies |
| Selling Shipping (graded, tracked) | $4.50 | Padded mailer + tracking |
| In-Person Sale % of Comp | 90% | Assumes selling at 90% of comp at shows (0% platform fees) |

##### 4d. Deal Quality Thresholds

| Threshold | Default |
|-----------|---------|
| Good Deal (green) | > 15% ROI |
| Marginal (yellow) | 5–15% ROI |
| Pass (red) | < 5% ROI |

##### 4e. Branding

| Setting | Default |
|---------|---------|
| App Name | Misprint Offer Calculator |
| Business Name | Woobul Collectibles |
| Primary Color | Navy / #2F5496 |
| Accent Color (profit/positive) | Green / #375623 |
| Warning Color | Red / #C00000 |

**Settings Behavior**:
- All settings persist in localStorage (or equivalent)
- "Reset to Defaults" button restores Woobul's default configuration
- "Export Config" / "Import Config" as JSON for backup and sharing
- Settings changes take effect immediately — no page reload
- Validate inputs (rates between 0–100%, fees non-negative, etc.)

---

### Platform & Technical Requirements

| Requirement | Specification |
|-------------|---------------|
| **Platform** | Web app. Can be standalone or part of the larger Woobul Show Calculator app. |
| **Primary Device** | Desktop/laptop (browsing Misprint on computer), secondary: mobile |
| **Responsive** | Must work well on both desktop and mobile. Desktop layout can use wider tables. |
| **Offline** | Core calculator should work without internet. History syncs when reconnected. |
| **Framework** | Developer's choice. Keep it simple — this is a calculator, not a SaaS platform. |
| **Architecture** | Config-driven. All rates, fees, and thresholds read from a single config object. |
| **Hosting** | Static hosting (Vercel, Netlify, GitHub Pages, or similar) |
| **Auth** | None for v1. Single-user. |
| **Config Portability** | Export/import settings as JSON. |

---

### Key Formulas

For reference, these are the exact calculations the app should implement:

```
# OFFER CALCULATION
# offer_rate is looked up from the full matrix based on:
#   card_type (PSA/CGC/BGS/Raw)
#   grade (10, 9.5, 9, 8.5, 8, 7-, BL for graded; NM, LP, MP, HP, DM for raw)
#   era (Modern/Vintage)
#   market_value (affects Raw NM/LP/MP thresholds at $50)
#
# If combination returns 0% (PASS), display "PASS — Do not buy" instead of an offer

offer_rate = lookup_rate(card_type, grade, era, market_value)
if offer_rate == 0:
    display "PASS — Do not buy this card type/grade/era combination"
    return

offer_amount = ROUND(market_value × offer_rate, 0)
shipping = 5.00 if card_type in [PSA, CGC, BGS] else 2.50
total_oop = offer_amount + shipping
true_pct_of_market = total_oop / market_value

# RESALE CALCULATIONS
ebay_per_order_fee = 0.30 if market_value <= 10 else 0.40
selling_ship = 4.50 if card_type in [PSA, CGC, BGS] else 0.93

ebay_net = market_value × (1 - ebay_fvf_rate) - ebay_per_order_fee - selling_ship
shopify_net = market_value × (1 - shopify_rate) - 0.30 - selling_ship
in_person_net = market_value × in_person_sale_pct

# PROFIT
ebay_profit = ebay_net - total_oop
shopify_profit = shopify_net - total_oop
in_person_profit = in_person_net - total_oop
best_profit = MAX(ebay_profit, shopify_profit, in_person_profit)
best_roi = best_profit / total_oop
```

---

### Design Notes

- **The offer amount is the hero number.** It should be the largest, most prominent thing on screen — that's what gets typed into Misprint.
- **Total OOP is the reality check.** Display it right below the offer so Jay always knows his real cost.
- **Deal quality badges reduce decision fatigue.** Green = go, yellow = think, red = skip. Fast pattern recognition.
- **Batch mode is for "spray and pray" sessions.** Jay browses dozens of listings and makes offers on many. The batch worksheet makes this systematic instead of ad-hoc.
- **Copy to clipboard** on offer amounts is a small feature with high daily impact — saves retyping numbers into Misprint's offer box.
- **Desktop-first for this app** (unlike the Show Calculator which is mobile-first). Misprint browsing typically happens on a computer.

---

### Relationship to Show Calculator App

This can be built as:
- **Standalone app** — simplest, fastest to ship
- **Tab/section within the Show Calculator** — shares the Settings infrastructure and selling cost constants

If built standalone, the Settings schema should be compatible with the Show Calculator's config format so they can share exported configs.

---

### Out of Scope (v1)

- Misprint API integration (no public API exists)
- Auto-pulling comps from eBay or TCGPlayer
- Seller-side fee calculations (this is a buyer tool)
- Inventory tracking or listing management
- Multi-user accounts or authentication

---

### File References

| Document | Contents |
|----------|----------|
| `misprint_calculator.xlsx` | Current spreadsheet version with single card calculator, batch worksheet, and offer rate tables |
| `woobul_pricing_v4.xlsx` | Selling cost constants (eBay FVF, Shopify fees, shipping costs) |
| `woobul_buying_v3.xlsx` | Show buy rates for comparison context |
| `woobul_show_calculator_requirements.md` | Companion app PRD — share config schema if building both |
