# illoca-clone

A clean-room, single-page clone of [illoca.unseen.co](https://illoca.unseen.co/) —
the marketing site for **illoca** ("Tracing Paper"), an AI-native design engine for
architects, by Unseen Studio.

Built with the classic web stack plus an animation layer:

- **HTML + CSS + vanilla JS**
- **Three.js / WebGL** — the pinned desk-diorama scene and its scroll-driven camera flight
- **GSAP + ScrollTrigger** — scroll choreography, pinned panels, reveals
- **Lenis** — smooth scrolling (the original uses it too)

## Why it's interesting

The original is not five separate feature pages — it is **one continuous WebGL
camera flight** through a single desk diorama, with text panels sliding in and out
as the camera moves. Reproducing that mechanism faithfully is the core of this project.
Full teardown: [`docs/RESEARCH.md`](docs/RESEARCH.md) · Build plan: [`docs/PLAN.md`](docs/PLAN.md)

## Live

**https://illoca-clone.pages.dev/** — Cloudflare Pages, GitHub-connected: every push to `main` auto-deploys.

## Run it

No build step:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Status

- ✅ Phase 0 — Research (live teardown documented)
- ✅ Phase 1 — Scaffold + static shell
- ✅ Phase 2 — WebGL scene + scroll choreography (pinned camera flight, richer diorama with shadows)
- ✅ Phase 3 — Interactions (demo drawer with animated Live Draft preview, FAQ accordion, cookie banner, mobile stacking)
- 🔨 Phase 4 — Polish + QA (first audit vs the original done 27 Nov 2026; fixes deployed — pricing CTA contrast, loader sequence, hero annotations, panel bleed-through, navy exit wipe, footer blueprint)

## Notes

- Sign-up / waitlist / demo-project links are placeholders (`#`) — there is no backend.
- The in-scene prompt bar is a visual mock, exactly as on the original.
- All visuals are recreated (CSS/SVG/Three.js); no original media is copied or hotlinked.
  Long copy such as the Open Letter and FAQ answers is paraphrased, not reproduced.
