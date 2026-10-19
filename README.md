# AltLabs Engineering Handbook

The decisions, standards, tools and practices behind our work.

**Live site:** https://handbook.alt-labs.agency

## Contributing

Anyone at AltLabs can propose a change. Read [How to contribute](content/docs/(home)/contributing.mdx) for the full guide. In short:

- **Small fixes:** open the page on GitHub (**Open → Open in GitHub** at the top of any page) and edit it there.
- **Bigger changes:** run the site locally, then open a pull request against `main`.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command               | What it does                                          |
| --------------------- | ----------------------------------------------------- |
| `npm run dev`         | Local dev server with live reload                     |
| `npm run build`       | Static build into `out/` (what gets deployed)         |
| `npm start`           | Serve the built `out/` folder locally                 |
| `npm run types:check` | TypeScript check                                      |

Requires Node.js 24 (see `.nvmrc`).

## How it's built

The site uses [Fumadocs](https://fumadocs.dev) on Next.js, exported as a fully static site (`output: 'export'`). Search is Fumadocs' built-in Orama search: the index is generated at build time and runs in the browser, so there's no server and no paid service.

> **Why Next.js?** It's Fumadocs' primary, best-supported framework. We use it only to build this static docs site. It isn't part of our client stack, which is Laravel + React (Inertia/Vite).

| Path                       | What's there                                                   |
| -------------------------- | -------------------------------------------------------------- |
| `content/docs/`            | All handbook pages (MDX), with `meta.json` for sidebar order   |
| `app/(home)/page.tsx`      | Landing page                                                   |
| `app/docs/`                | Docs layout and page template                                  |
| `app/global.css`           | Brand theme (colours and fonts)                                |
| `lib/shared.ts`            | Site name, domain and GitHub repo settings                     |
| `lib/layout.shared.tsx`    | Navigation (logo and links)                                    |
| `lib/source.ts`            | Content collection and loader                                  |
| `public/brand/`            | Official Alt Labs logo files. Don't edit or recolour them.     |

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages ([deploy.yml](.github/workflows/deploy.yml)). Pull requests get a type check and build ([pr-check.yml](.github/workflows/pr-check.yml)), so a broken page can't be merged.

### One-off setup

1. Create the `altlabsagency/handbook` repository and push this code to `main`.
2. Under **Settings → Pages**, set **Source** to **GitHub Actions**.
3. In the same page, set **Custom domain** to `handbook.alt-labs.agency`, and tick **Enforce HTTPS** once the certificate is issued.
4. In DNS for `alt-labs.agency`, add a `CNAME` record from `handbook` to `altlabsagency.github.io`.

If the repository or organisation name changes, update `gitConfig` in `lib/shared.ts`.
