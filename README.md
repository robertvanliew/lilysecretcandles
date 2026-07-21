# Lily's Secret — Website

A self-contained static website for **Lily's Secret**, bespoke handcrafted candles (Dubai).
No build step, no dependencies — pure HTML/CSS/JS. Hosts anywhere, serves from the repo root.

## View it locally
Just **double-click `index.html`** (opens in your browser).
> An internet connection is used only to load the brand fonts. Everything else is local.

## File structure (site lives at the repo root)
```
index.html            ← the whole page
css/styles.css        ← all styling (brand colours are variables at the top)
js/i18n.js            ← translations + language engine (6 languages)
js/main.js            ← interactions + the "Create Your Candle" configurator
assets/
├── images/           ← product & lifestyle photos, plus logo-seal.png
└── video/            ← the two reveal videos (not embedded yet — see below)
brand-source/         ← original PDFs, photos/videos, and the master logo (not part of the live site)
```

## Languages
The globe menu in the header switches the whole site between **English, Arabic (العربية, right-to-left),
Turkish, French, Russian and Hindi**. The choice is remembered in the visitor's browser.
All translations live in `js/i18n.js` — edit the text there, keyed by language.
> Orders always arrive to you **in English** (see below), no matter which language the visitor used.

## How the "Create Your Candle" orders work
When a visitor finishes the builder and clicks **Send my order**, the site opens a **pre-filled email**
to `Bsraulaas6@gmail.com` with all their choices. They just press send. An **Instagram** button is offered
as an alternative. No payment is taken online — by design, since every candle is bespoke.

### Optional upgrade — orders straight to your inbox (no email app needed)
Sign up free at **formspree.io**, get a form ID, and the send button can post to it in ~2 lines
(left as email-based for now so it works with zero setup).

## Things you may want to change
- **Contact email** — search `Bsraulaas6@gmail.com` in `index.html` and `js/main.js`.
- **Instagram** — search `lillysecretcandlesdxb` in `index.html`.
- **Launch offer text** — top of `index.html` (`.ribbon`) and `ribbon.text` in `js/i18n.js`.
- **Brand colours** — top of `css/styles.css`, the `:root { … }` variables.
- **Fragrances / messages / occasions** — `js/main.js` (ids) + `js/i18n.js` (text).
- **Logo** — `assets/images/logo-seal.png` (transparent wax seal).

## Publishing (all free)
- **Vercel / Netlify**: connect this repo — it deploys from the root automatically (no config needed).
- **GitHub Pages**: enable Pages on the `main` branch, root folder.
- **Any web host**: upload the repo contents (except `brand-source/`) via FTP.

## Media notes
Only the polished photography is used on the page (hero candle, clean product shot, café lifestyle,
the 4-panel journey). Casual kitchen/pouring shots and the two videos live in `assets/`/`brand-source/`
but are kept off the page to protect the premium feel — say the word and a video can go into the hero
or the "handmade" story.
