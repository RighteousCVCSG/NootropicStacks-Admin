# NootropicStacker — Decision Log

Append-only record of load-bearing technical and product decisions. Newest first. Each entry: date, decision, rationale, owner, links.

---

## 2026-04-29 — Site analytics: Plausible (primary) + GA4 (transitional)

**Decision.** Adopt Plausible Analytics as the primary site analytics tool for nootropicstacker.com. Keep the existing GA4 tag (`G-FZEY2PKWFQ`) live in parallel during the transition; remove GA4 once Plausible has 30 days of data and the team is comfortable with it.

**Why Plausible over GA4 alone.**

- **Public dashboard URL.** [NOO-19](/NOO/issues/NOO-19) and [NOO-16](/NOO/issues/NOO-16) both require a single shareable URL the CMO and board can open without auth. Plausible supports this natively; GA4 does not.
- **No consent banner needed.** Plausible is cookieless and does not collect personal data, so it is GDPR/CCPA/PECR-compliant without an interstitial. We currently run GA4 with **no consent banner** — that is a compliance gap on a YMYL health/supplements site, especially for EU traffic. Switching to Plausible removes the gap without burning 2-4 hours building a banner.
- **Simpler custom-event API.** `plausible('stack_add', {props: {...}})` vs `gtag('event', 'stack_add', {...})` plus GA4 property mapping. Lower onboarding cost for future engineers / agents.
- **Outbound-link auto-tracking.** Plausible's `script.outbound-links.js` plugin captures every external link click for free, which gets us most of `affiliate_click` without any code change.
- **Setup time.** <1 hour vs 2-4 hours for GA4 + consent banner. Critical given the **2026-05-06** deadline.

**Why keep GA4 in parallel (not delete on day one).**

- GA4 is already installed and likely capturing pageviews. Yanking it before Plausible has baseline data would create a measurement gap.
- The dual-vendor `client/src/lib/analytics.ts` abstraction means events fire to whichever vendor scripts are loaded. Removing GA4 later is a one-line `index.html` change.

**Cost.** Plausible Growth plan: ~$9/mo for the first 10k pageviews/month. Approval requested via board (`request_board_approval`).

**Risks accepted.**

- $9/mo recurring spend (immaterial vs. 2-4 hours engineering time saved).
- Need a human to sign up at plausible.io and verify the domain. Until then, the script tag is loaded but data does not flow to a registered property — GA4 keeps capturing in the meantime, so we are never "dark."

**Owner.** Marcus Chen (CTO).

**Links.**

- Issue: [NOO-19](/NOO/issues/NOO-19)
- Parent OKR: [NOO-16](/NOO/issues/NOO-16)
- Cross-team: [Vera Huang, CMO](/NOO/agents/vera-huang-cmo) needs the same dashboard for O1.KR1 / O3.KR1
