# HerDigitalArt — storefront files

## Design version 3 — premium refinement

Keeps the approved cobalt/yellow direction while refining typography, the three-product collage, card framing, mobile spacing and category labels. Adds a sticky navigation bar, a large brand footer and reduced-motion-aware entrance/hover treatments. Upload premium.css alongside the other CSS files. All three style layers and product images are embedded into the standalone preview.

Visual inspection in the local browser remains blocked by the environment policy. Code-level checks pass; review the preview on your own desktop and phone before publishing. Whop setup remains unchanged.

## Design version 2

Rebuilt after the Grüns reference: heavy rounded typography, cobalt and butter-yellow brand colors, layered real catalog imagery, colorful product tiles, stronger purchase-navigation controls and expressive category rows. HerDigitalArt stays a multi-product digital store. No Grüns logos, photography, reviews, guarantees or claims are used.

`design-v2.css` is the new brand styling layer and must be uploaded alongside styles.css. The self-contained preview includes both stylesheets and all three images.

A portable, no-build storefront: editorial homepage, searchable catalog, category filters, sorting, pagination and individual product pages. No paid libraries or subscriptions are required by this code.

## Important hosting correction

Keep the code in GitHub, but **do not host this commercial storefront on GitHub Pages**. GitHub explicitly disallows Pages sites primarily facilitating commercial transactions: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

The previous advice to use GitHub Pages for this store was incorrect. No website has been published and no account settings have been changed. Choose a commercial-compatible host separately; the HTML/CSS/JS files are portable. Hosting limits, domain fees and Whop transaction fees are separate from this code.

## See the design on your computer

1. Unzip this folder.
2. Double-click `preview.html`. This self-contained design preview opens directly in your browser, including catalog navigation and product details. No installation is needed.
3. To test live mode, open Terminal in the folder and run `python3 -m http.server 8080` (Python 3 required).
4. Visit http://localhost:8080/index.html for live catalog mode.

Do not double-click index.html: browsers commonly block JSON loading over file://. Only preview.html is bundled for direct opening. After editing source files, regenerate it using `node scripts/build-preview.mjs`.

## Preview versus live

The preview uses three real product names and marketing images from your WomenstuffArt Etsy shop. It is NOT a live Whop catalog. Prices and checkout are disabled. Product listings are abbreviated for layout preview, not a replacement for full product descriptions.

The live catalog (`products.json`) starts empty intentionally. Nothing is represented as available for sale until you connect or enter your real Whop data. The hero uses your labels, learning guide and wedding template imagery; the catalog is not tied to those products. Replace the hero links/images in script.js if those resources leave your collection.

The site remains a prelaunch deliverable until you connect products, verify their purchase destinations and access settings, and supply any required business/contact/legal information. No privacy policy or refund promise has been invented.

## Store code on GitHub

Create a separate repository named `herdigitalart-store`. Upload the contents of this folder, including `.github/workflows/sync-whop.yml` (hidden folders may require Git or GitHub Desktop). Do not enable GitHub Pages. Never upload paid PDFs, customer data or secrets. Keep deliverables customers buy in Whop.

## Connect the catalog

Simplest manual route: edit products.json using the fields shown in preview-products.json, but use real Whop product IDs, images and checkout URLs. Prices are optional; omit them or set null to show “See price on Whop.” Price values, if entered manually, are major currency units, not cents.

Optional sync route included:

1. Obtain a Whop credential scoped to your business with product-read permission (`access_pass:basic:read`). Do not share it in chat.
2. In GitHub repository Settings → Secrets and variables → Actions, add `WHOP_API_KEY` and `WHOP_ACCOUNT_ID` as repository secrets. WHOP_ACCOUNT_ID is the business/account ID, not a product ID.
3. Open Actions → Sync Whop catalog → Run workflow.
4. The script requests visible products, follows pagination and only publishes a small allowlist of public fields. Hidden/archived products are excluded. A failed request preserves the previous catalog.
5. The schedule runs hourly when GitHub Actions permits. Scheduled runs can be delayed or disabled for inactive repositories. Updates are NOT instantaneous; hosting must also deploy the resulting commit.

The sync is implemented against Whop's documented REST product endpoint, but has NOT been tested with your account because credentials were not supplied. Documentation: https://docs.whop.com/api-reference/products/list-products . API schemas and permissions can change; verify the first run before enabling ongoing use.

## Purchase links and categories (required per product)

The product-list API does not provide a verified checkout URL or price in its documented example. The script deliberately does not guess them. Copy each actual purchase link from Whop and add a matching entry in `product-overrides.json`:

```json
{
  "YOUR_REAL_WHOP_PRODUCT_ID": {
    "category": "Business & Templates",
    "format": "Canva templates",
    "checkoutUrl": "PASTE_THE_ACTUAL_HTTPS_WHOP_LINK_HERE"
  }
}
```

Run the sync again. New products appear automatically in “Digital Resources” even without an override, but their purchase button stays unavailable until a verified URL is provided. Categories are generated from actual catalog entries. Prices are confirmed on Whop; this release does not synchronize pricing plans. This is deliberately safer than claiming a complete zero-setup integration.

## Files

- index.html: brand homepage
- shop.html: full catalog
- product.html: product detail, using ?id=PRODUCT_ID
- preview.html: labeled design preview entry point
- styles.css / script.js: styling and storefront behavior
- products.json: live public catalog
- preview-products.json: example catalog, never used in live mode
- product-overrides.json: category/format/verified Whop purchase links
- scripts/sync-whop.mjs: optional server-side catalog sync
- .github/workflows/sync-whop.yml: optional hourly/manual sync
- images/: real listing images and brand favicon

## Validation

Run `node scripts/check.mjs` for file, syntax, catalog, search, filter, empty-state and URL-safety checks. These checks use a lightweight DOM stub and are not a substitute for real browser testing. The Grüns reference was inspected visually, but this environment's browser policy blocked access to the local storefront preview. Visual browser QA of the redesigned storefront remains unverified. Open preview.html and check desktop/mobile before publishing. The authenticated Whop sync also still needs its first account-connected test.

Google Fonts is optional; system serif/sans-serif fallbacks work offline. Remove the first CSS line to avoid Google Fonts requests. No analytics, tracking scripts, email collection, customer database or fake cart is included.

## Launch checklist

- Open live mode and confirm every product name, image, category and URL.
- Verify each purchase link against the correct Whop product and plan; do not make test charges unintentionally.
- Confirm Whop delivers the correct files and license after purchase.
- Set your business contact details and required legal policies before launch.
- Check phone and desktop layouts on your chosen host.
- Confirm automated commits trigger that host's deployment.
- Remove preview.html and preview-products.json from public deployment if you do not want the design preview accessible (the preview is marked noindex).

## Image provenance

Used only to represent the user's own catalog, retrieved September 12, 2026:
- labels.jpg: https://www.etsy.com/listing/4567584990/43-editable-product-label-templates-for
- learning.jpg: https://www.etsy.com/listing/4570855344/speed-learning-guide-pdf-memory
- wedding.jpg: https://www.etsy.com/listing/4548029072/olive-green-wedding-invitation-website

These are existing listing marketing images, not newly invented product content. Rights remain with their respective owner; no broader reuse license is granted.
# Homepage edition 04

The approved hero markup and its existing styles are unchanged. The homepage adds a two-product studio edit, date-sorted new arrivals, format guidance, expanded brand principles, a purchase walkthrough and a closing collection link. Shop and product layouts retain their previous design.

Open `preview.html` to explore the self-contained design preview. Its sample products are not purchasable. `homepage.css` is the new homepage-only stylesheet.

The studio edit uses products marked `featured: true` first, then catalog order. To show an actual bestseller shelf, supply positive numeric `bestsellerRank` values only for products whose sales ranking you have verified. Without those values, the heading remains an editorial studio selection. New arrivals use valid `createdAt` dates. Empty shelves hide automatically.

For Whop sync, optional `featured` and `bestsellerRank` fields can be set per product ID in `product-overrides.json`. Automatic sync still requires your Whop credentials and verified checkout links as described below. The homepage itself does not establish that connection.

Validation: script and embedded-preview syntax, product rendering, empty shelves, conditional bestseller labels, newest-first order, search links and existing checkout protection pass the included checks. Browser visual QA remains unverified because local-preview browser access was blocked.
