# Directory publishing

The production website reads committed, validated snapshots. It does not query Airtable during page requests, crawls, builds or ISR revalidation.

## Publishing an Airtable update

1. Complete and verify the venue changes in Airtable.
2. In GitHub, open **Actions → Publish Airtable directory → Run workflow**.
3. Review the generated **Update published Airtable directory snapshot** pull request.
4. Merge the pull request. Vercel will deploy the new static snapshot.

The workflow also checks Airtable once daily at 03:17 UTC. If nothing changed, it creates no commit or pull request.

## Required GitHub secrets

- `AIRTABLE_API_KEY`: personal access token with read access to the production base.
- `AIRTABLE_BASE_ID`: the production base ID.

The repository setting **Allow GitHub Actions to create and approve pull requests** must be enabled so the workflow can open its content-update PR.

## Safety controls

The publisher:

- includes only records where `Publish Status` is `Published` and `Indexable` is checked;
- writes only explicitly approved public fields;
- excludes drafts, research notes and internal editorial confidence fields;
- rejects missing or duplicate venue slugs;
- rejects missing venue names and empty editorial profiles;
- blocks an unexpected reduction of more than 20% in published venues;
- downloads Airtable attachments into `public/venues` and stores stable local URLs;
- leaves the existing production website unchanged if Airtable or validation fails.

For an intentional reduction greater than 20%, run the publisher locally with `ALLOW_LARGE_DIRECTORY_REDUCTION=true` after reviewing the planned removals.
