# TrafficIQ Solutions website starter

A responsive, self-contained marketing website for TrafficIQ Solutions and the AVSense platform.

## Files

- `index.html` — page structure and website copy
- `styles.css` — responsive visual system, animations, and components
- `app.js` — mobile navigation, scroll reveal, demo pipeline status, and demo form behavior
- `assets/favicon.svg` — TrafficIQ browser icon

## Preview locally

Open `index.html` directly in a browser, or run a small local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before publishing

1. Connect the contact form in `index.html` / `app.js` to the preferred email, CRM, or form endpoint.
2. Confirm public-facing company claims, team references, legal language, and privacy language.
3. Add production analytics, a privacy notice, and accessibility testing as required.
4. Deploy the folder to any static host such as GitHub Pages, Netlify, Vercel, AWS S3/CloudFront, or an existing web server.

No external fonts, JavaScript libraries, or image assets are required.
