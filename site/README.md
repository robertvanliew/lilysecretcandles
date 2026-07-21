# Lily's Secret — Website

A self-contained static website for **Lily's Secret**, bespoke handcrafted candles (Dubai).
No build step, no dependencies — pure HTML/CSS/JS. Hosts anywhere.

## View it locally
Just **double-click `index.html`** (opens in your browser). That's it.
> An internet connection is used only to load the two brand fonts. Everything else is local.

## File structure
```
site/
├── index.html          ← the whole page
├── css/styles.css      ← all styling (brand colours live at the top as variables)
├── js/main.js          ← interactions + the "Create Your Candle" configurator
└── assets/
    ├── images/         ← product & lifestyle photos used on the site
    └── video/          ← the two reveal videos (not yet embedded — see below)
```

## How the "Create Your Candle" orders work
When a visitor finishes the builder and clicks **Send my order**, the site opens a
**pre-filled email** to `Bsraulaas6@gmail.com` with all their choices. They just press send.
There is also an **Instagram** button as an alternative. No payment is taken online —
by design, since every candle is bespoke and confirmed personally.

### Optional upgrade — orders straight to your inbox (no email app needed)
If you'd like submissions to arrive automatically without opening the visitor's email app,
sign up free at **formspree.io**, get your form ID, and I can switch the send button to it
in about two lines. (Left as email-based for now so it works with zero setup.)

## Things you may want to change
All in easy-to-find spots:
- **Contact email** — search `Bsraulaas6@gmail.com` in `index.html` and `js/main.js`.
- **Instagram** — search `lillysecretcandlesdxb` in `index.html`.
- **Launch offer text** — top of `index.html`, the `.ribbon` block.
- **Brand colours** — top of `css/styles.css`, the `:root { … }` variables.
- **Fragrances / messages / occasions** — the data arrays at the top of `js/main.js`.

## Publishing (any of these, all free)
- **Netlify** or **Vercel**: drag-and-drop the `site` folder onto their dashboard.
- **GitHub Pages**: push the `site` folder to a repo and enable Pages.
- **Any web host**: upload the contents of `site/` via FTP.

## Notes on media
I used only the polished photography (hero candle, product, café lifestyle, the 4-panel
journey). The casual kitchen / pouring phone shots and the two videos are included in
`assets/` but kept off the page to protect the premium feel — say the word and I'll weave
a video into the hero or the "handmade" story.
