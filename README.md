# AISG Dashboards — public-safe test portal

**One school. Connected insight.** This repository provides the shared AISG dashboard landing page and navigation system.

## View the test site
Once Pages is enabled in GitHub Settings → Pages → Source: GitHub Actions, the site is deployed automatically from the `main` branch:
https://edtechevans.github.io/AISGdashboards/

If the page is not accessible, inspect the [Publish workflow](https://github.com/edtechevans/AISGdashboards/actions/workflows/pages.yml). Do not interpret a failed workflow as a live site.

## What works today
- Responsive six-card AISG portal
- Original AISG logo displayed prominently in a spacious white welcome panel; six consistent tiles, navy/red palette, responsive header and mobile layout
- Shared dashboard switcher and bookmarkable in-app routes
- Readable status for fictional demos vs awaiting secure migration
- Optional links to existing **fictional** prototype sites, shown transparently as separate sites
- Browser-readable public build without live student, survey or staff data

**Not yet integrated:** The real My Learners, Observations, Climate & Wellbeing, Growth & Reflection, SSS and Board application modules. The portal's workspace pages are placeholders and cannot display real analytics. This is intentional until those modules are migrated and secured.

## Testing and updating
Open a pull request to `main` to run syntax, routing and public release checks. Once merged, the Pages workflow publishes exactly four reviewed assets: `index.html`, `app.js`, `styles.css`, and the original logo.

Run checks locally (Node 22):
```bash
node --check app.js
node --test tests/portal.test.mjs
python3 -m http.server 8080
```
Then visit http://localhost:8080/ .

## Privacy and SharePoint migration
This **public** site does not implement authorization and must contain only fictional/public-safe content. Its dashboard switcher is not role-based access control. Do not add confidential student information, teacher reflection/observation narratives, identities, unsuppressed survey cells, passwords, access tokens or raw datasets.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for staged module migration and SharePoint + Microsoft Entra authorization design. Address the existing public identifiable Observations source data before any real migration.
