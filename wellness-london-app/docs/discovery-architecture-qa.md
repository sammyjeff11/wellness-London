# Discovery architecture QA — 2026-08-09

This follow-up records the discovery and taxonomy decisions implemented in PR #106.

- Retire public reliance on the weak `Beginner Friendly` field while preserving the Airtable data for internal/history use.
- Keep the editorial Best Saunas guide as the canonical owner of best-sauna intent; do not surface the redirected collection URL.
- Keep communal experience distinct from genuinely community-led programming.
- Surface Social Wellness as a focused collection rather than a global directory filter.
- Let permanently closed venue routes render their dedicated noindex pages rather than redirecting them into unrelated area pages.
- Use `Services` rather than `Treatments` in public discovery copy.

Build note: the social collection uses only service slugs supported by the current taxonomy. `yoga` is intentionally not included in `serviceKeys` because it is not a `ServiceSlug` in the current codebase.
