# AISG Dashboards — Phase 1 architecture

## Six destinations
1. My Learners (fictional prototype)
2. Growth & Reflection (two future modules: Observations and teacher Reflect)
3. Climate & Wellbeing (restricted data migration)
4. Learning Leaders (existing My Learners leadership module)
5. Student Support Services / SSS (existing My Learners support module)
6. Board (existing My Learners module; contains some real aggregate data)

## What has been built
A static, responsive unified portal with six destination cards, shared navigation and dashboard switcher, in-app hash routing, keyboard focus treatment, reduced-motion styling and explicit integration statuses. No external iframe, live student records, source observation data, survey data, production authentication or SharePoint deployment is included.

## Next migration
- Bring My Learners Faculty/Student/Leaders/SSS/Board modules into the shared application shell without duplicating the synthetic cohort.
- Preserve original calculation tests and deep links before turning off individual sites.
- Integrate Observations and Climate only with approved data endpoints and record-level permissions, after reviewing the existing public exposure.
- Establish an AISG Microsoft Entra sign-in and server-authorized data layer before any live individual-level content; determine whether AISG IT permits custom SPFx deployment via the SharePoint App Catalog.

## Critical privacy finding
The public `edtechevans/observations` repo contains `data/observations-full.csv` and `data/faculty-goals.json`. Its own README says these expose identifiable faculty goals, observer names, email addresses and complete narrative feedback. This is a pre-existing public exposure, not created by this portal. A school-approved containment and remediation review is needed now, including Git history and any accessible Pages copies. Simply copying files into a private repo or deleting latest versions does not undo exposure.

The private `edtechevans/climate` repo documents suppression rules for publicly published aggregates, including at least 20 valid answers for detailed cells, and explicitly says its client-side password screen is not access control. Preserve its analytic and suppression checks.

## Release safeguards
Never commit identifiable datasets, credentials, browser-embedded secrets, production API tokens, staff notes, individual survey or learner records to this public repository. A card switcher is navigation, not authorization. A standalone portal is not proof of SharePoint readiness.
