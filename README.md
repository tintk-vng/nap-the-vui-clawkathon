# Napthevui Banner Slot Prototype

Local napthevui-style purchase page with a reusable top banner slot.

The current goal is intentionally simple:

- Keep the game top-up purchase flow visible.
- Show one large banner slot above the card selection area.
- Store the current banner in one data file so it is easy to replace later.
- Leave room for a future automation/agent layer to update the banner daily or weekly.

## Run Locally

```bash
npm.cmd run build
npm.cmd run start
```

Open:

`http://localhost:8090/mua-the-game`

## Main Files

- `src/data/campaigns.ts` - active campaign and campaign-linked discounts
- `src/data/catalog.ts` - publishers, games, SKUs, and popular search recommendations
- `src/data/discounts.ts` - derived campaign discount helpers
- `src/data/newsArticles.ts` - Tin Tức content
- `app/game/_components/BannerSlot.tsx` - reusable banner slot UI
- `app/game/_components/Main.tsx` - page composition
- `app/game/_components/SupplierGrid.tsx` - publisher/card selection
- `app/game/_components/PackageGrid.tsx` - denomination selection
- `app/game/_components/CheckoutPanel.tsx` - payment summary

## Agent Contract

See `AGENT_CONTRACT.md` for the editable data contract, validation rules, fallback behavior, and files that future agents must not modify.
