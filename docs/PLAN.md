# PLAN — illoca Clone Build

**Target:** a proper single-page clone of https://illoca.unseen.co/ — same structure,
same scroll experience, same design system — rebuilt clean-room in the owner's stack.
**Stack:** HTML + CSS + vanilla JS + **Three.js / WebGL** + **GSAP (ScrollTrigger)** + **Lenis**.
No framework, no build step, no backend.
**Repo:** `WithHowAi/illoca-clone` (GitHub, via the connected GitHub account).
**Research base:** `docs/RESEARCH.md` (live teardown, 27 Nov 2026).

## Architecture

```
illoca-clone/
├── index.html            # single page, sections in original order
├── css/
│   └── style.css         # design tokens, paper/grid textures (CSS/SVG, not copied images), layout
├── js/
│   ├── main.js           # loader, header, coords readout, cookie banner, FAQ accordion, demo drawer
│   ├── scroll.js         # Lenis + GSAP ScrollTrigger: pin, panel choreography, section wipes
│   └── scene.js          # Three.js diorama + scroll-driven camera path (the core piece)
├── assets/
│   └── svg/              # recreated logo mark, icons, floor-plan line art (original drawings)
├── docs/
│   ├── RESEARCH.md
│   └── PLAN.md
└── README.md
```

CDNs (pinned): three, gsap + ScrollTrigger, lenis, Google Fonts
(Syne 800 · Space Grotesk 600 · DM Sans 400/500 · Space Mono · Geist Mono · Caveat).

## The core build: the pinned camera flight

One fixed WebGL canvas sits behind the hero + all 5 feature sections inside a tall
scroll container (~1200–1500vh). A single GSAP ScrollTrigger timeline, scrubbed by
Lenis scroll, drives:

1. **Camera** along a keyframed path (position + lookAt) through a stylised Three.js
   desk diorama: desk, tracing-paper plan (textured plane), pencil, lamp, books,
   a stepped massing model that rises for Feature 2, model trees, a notebook.
2. **Scene state** per beat: massing model scales up (F2), in-scene prompt bar fades
   in (F3), red markup ring + note appears (F4), facade panels swap on the tower (F5).
3. **DOM panels** for the 5 features sliding in/out on alternating sides, timed to
   the same timeline so text and camera stay in sync.

Fallbacks: `prefers-reduced-motion` → static scene + normal stacked sections;
no-WebGL → poster-style CSS/SVG scene with the same panel flow.

## Phases

### Phase 0 — Research ✅ (27 Nov 2026)
Live teardown + source inspection → `RESEARCH.md`. Loader, hero, pinned flight,
drawer, letter, pricing, FAQs, footer, colours and exact fonts all documented.

### Phase 1 — Scaffold + static shell
- Repo created; README, RESEARCH, PLAN pushed.
- `index.html` with every section in order: loader, header pill, coords/email chrome,
  hero, features container, Open Letter, Pricing, FAQs, footer, cookie banner, demo drawer.
- CSS tokens + paper/grid backgrounds; all copy in place (letter/FAQ answers paraphrased).
- Acceptance: full page renders statically, no console errors, responsive skeleton.

### Phase 2 — The WebGL scene + scroll choreography
- Three.js diorama (stylised, low-poly, duotone blue/grey on paper) with the 6 camera beats.
- Lenis + ScrollTrigger pin; panel choreography synced to the camera timeline.
- Loader sequence (logo tiles assemble → headline outline-to-fill → annotations in).
- Live X/Y coordinate readout.
- Acceptance: smooth 60fps-intent flight on desktop; panels land on their camera beats.

### Phase 3 — Interactions
- Demo drawer (per-feature steps + placeholder video + "Open demo project" placeholder link).
- FAQ accordion (single-open), pricing hover states, nav anchor flights (Lenis scrollTo),
  cookie banner (Accept/Reject stored in localStorage), mobile menu + stacked layout.
- Acceptance: every clickable element on the original has a working equivalent or a
  clearly-marked placeholder (sign-up / demo links are `#` placeholders — no backend).

### Phase 4 — Polish + QA
- Side-by-side visual pass vs the live site (desktop + mobile), spacing/type drift fixes.
- Accessibility: keyboard support for accordion/drawer/menu, aria labels, focus states.
- Performance: canvas pauses off-screen, lazy font loading, page weight check.
- GitHub Pages enabled from `main` so the clone is viewable live; URL added to README.

## Decisions

- Name/branding stays "illoca" — the owner asked for a proper clone of this site.
- Sign-up, waitlist and demo-project links are placeholders; the in-scene prompt bar
  is a visual mock, exactly as on the original.
- Original media is never hotlinked or copied; all visuals are recreated.

## Risks

- The diorama is the long pole: a stylised rebuild will match camera beats and mood,
  not the original's bespoke illustration 1:1. Mitigation: build the scene early (Phase 2
  starts right after the shell) and iterate against screenshots.
- Long pinned timeline needs careful mobile behaviour — stacking fallback is planned, not improvised.
