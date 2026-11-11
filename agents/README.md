# Well Edit agent team — operational foundation

The six roles below are **role instructions**, not independently running AI services. Engineering work is executed via separately authorised Codex/agent sessions. The weekly GitHub Actions triage workflow creates or updates a backlog issue with no model/API spend. Connecting an autonomous execution engine is a later approval-gated step.

| Role | File | Outputs |
| --- | --- | --- |
| Chief operator | chief-operator.md | Prioritised issues, weekly scorecard, blockers |
| Engineering | engineering.md | Tested PRs |
| Growth/SEO | growth-seo.md | Validated search fixes and experiments |
| Directory intelligence | directory.md | Source-backed research and draft changes |
| Venue photography (directory sub-agent) | photography.md | Photo gap audit, official-site candidate queue, rights review |
| Commercial partnerships | commercial.md | Pipeline, draft offers, approved outreach |
| Quality assurance | qa.md | Independent pass/fail PR evidence |

## Assignment protocol
Each GitHub issue should specify: objective, owner-role, source of evidence, measurable value, acceptance criteria, dependencies, risk, and review owner. Search existing issues/PRs before adding any new item. No issue or LLM-generated text can authorize a production or external action.

## Weekly cadence
Monday triage (GitHub Actions) maintains one issue with a repeatable checklist; it does not call a language model or change product data. Chief operator reviews open issues and PRs and proposes at most three highest-impact tasks. Human approves execution of external communications and paid services.

## Commercial scorecard
Track 7/28-day organic clicks, high-intent landing-page clicks, verified outbound venue clicks, qualified partner prospects, partner conversations, signed pilots, contracted MRR, refunds/churn, and attribution coverage. Unknown values remain unknown; never invent a baseline. First goal: tracked venue referrals plus three genuine paid pilot agreements, not more content for its own sake.

## Safe activation
1. Review and merge the foundation PR only after checks pass.
2. Confirm Actions is enabled and the weekly triage workflow has permission to create issues; keep production branch deployment rules unchanged.
3. Connect coding agents with PR-only scope and human review.
4. Verify GA4/GSC permissions before enabling any search-data jobs. Existing GSC Wizard connection currently needs subscription; don't silently incur cost.
5. Create a permissioned commercial CRM before collecting contacts or automating outreach. All sends require explicit approval.
