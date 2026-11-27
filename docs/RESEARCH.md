# RESEARCH — illoca.unseen.co Teardown

Researched: 27 Nov 2026 · Sources: live site visit at 1920×1000 (full scroll-through),
page-source inspection, and text fetch of https://illoca.unseen.co/
Reference: "illoca" — an AI-native design engine for architects (product name used
inside the site: "Tracing Paper"), by Unseen Studio.

> Clean-room rebuild note: layout, behaviour and the design system are documented
> here as facts. Long marketing copy (Open Letter, FAQ answers) is paraphrased in
> this document, not reproduced, and will be rewritten in our own words in the build.
> No original images, videos or font files will be copied — visuals are recreated
> with CSS/SVG/Three.js and fonts loaded from Google Fonts.

## 1. What the site is

- Single-page marketing site. No sub-pages; nav anchors (Features / Pricing / FAQs) smooth-scroll.
- Original stack (observed from source): Nuxt SSR (`_nuxt` bundles, `_payload.json`),
  Lenis smooth scroll (`lenis-active` class on `<html>`). The hero/feature visuals are
  not `<img>`/`<video>` tags in the HTML — they are a client-rendered 3D scene.
- Our rebuild stack (owner's choice): **HTML + CSS + vanilla JS + Three.js (WebGL)
  + GSAP (ScrollTrigger) + Lenis**. No framework, no backend.

## 2. Global chrome (always visible)

- **Top-left:** live mouse coordinate readout, two lines `X 0.00` / `Y 0.00`, small mono,
  updates in real time (viewport CSS pixels, 2 decimals).
- **Top-right:** contact email `hello@illoca.com` in small handwritten/mono capitals.
- **Header:** fixed, floating, centred white pill (~730×60px), thin blue border.
  Left: 2×2 logo mark + "illoca®". Centre: Features / Pricing / FAQs.
  Right: dark-navy "Try for free" button with an orange-red square icon.
  Link hover: blue text + dotted underline. Logo click: instant jump to top.
  No hamburger at desktop width (mobile menu unobserved — we design a stacked mobile nav ourselves).
- **Cookie banner:** bottom-left white card with Reject (white) / Accept (blue) buttons
  and a "Cookie settings" link.

## 3. Loader / intro

- Full-screen beige grid-paper loader; only the 2×2 logo mark, large and centred
  (royal-blue tiles with white glyphs: horizontal bars / chevron-roof / circle /
  quarter-circle), tiles slightly offset as if assembling. No text, progress bar or spinner.
  Clears within a few seconds.
- The fixed chrome (coords readout, email) is already visible during the loader.
- Hero headline then animates in: outline first, filling solid, with the handwritten
  annotations appearing over it.

## 4. Hero

- Background: beige/kraft paper (~#E8E0CF) with a fine vertical grid and faint
  horizontal bands; a thin frame border around the viewport.
- Headline (top-left, ~70px inset, ~110–130px, bold grotesque, dark navy, 3 lines):
  "Design at the speed of thought" — with handwritten overlays that appear to correct
  it by hand: "architectural" (blue, slanted) and "not software" (dark script with a
  small red hand-drawn arrow).
- Subcopy (paraphrased): a sketch-first AI design engine — draw, prompt and shape
  architecture with intent. White pill CTA "Try for free" with a blue/orange square icon.
- Below the copy: a full-width 3D studio diorama (duotone blue/grey) — a designer seen
  from behind at a desk by a large window with a city skyline, pinboard of sketches,
  bookshelf, plant, desk lamp, spiral notebook. Blue paint strokes bleed in at the
  top-left and bottom-right corners. No hover parallax; **scrolling dollies the
  camera into the desk**.

## 5. Core mechanism — one pinned WebGL camera flight

This is the heart of the site and the hardest part to clone:

- Lenis smooth scroll, heavily eased. The 3D scene stays **pinned** for a long scroll distance.
- Camera path: hero wide shot → over the designer's shoulder → down onto the
  tracing-paper floor plan on the desk → across to the 3D massing model that rises
  from the plan → top-floor close-up → back out wide.
- All **5 feature sections are one continuous flight through the same diorama**, not five images.
- Text panels (~32% width, beige paper) slide/fade in, dwell, then slide out, with long
  camera-only pans between panels. Panel sides alternate: **1 left, 2 right, 3 left, 4 right, 5 left**.
- Panel template: handwritten numbered label in a hand-drawn box, huge bold title,
  one-line description, white "Watch the demo" button (red/orange play icon).
  Feature 1's panel also carries a hand-drawn "explore features" cue at the bottom.
- Exit: the last panel slides out left while a dark navy block wipes up from below.

### The five features

| # | Handwritten label | Title | What it does (one line) | Camera beat |
|---|---|---|---|---|
| 1 | Intents, Translated! | Augmented Sketch | Rough sketches / diagrams / existing plans become editable floor plans | Wide desk → close on the tracing-paper plan, hand with pencil, lamp, books |
| 2 | Ideas, Shaped! | Adaptive Massing | Sketches / reference images / loose descriptions become BIM-compatible 3D massing | Stepped grey-blue massing model rises from the plan; small green model trees |
| 3 | Iteration, Orchestrated! | Prompted Plans | Generate floor-plan options, or fill unfinished areas, from prompts | Aerial view of the model; a white prompt bar is rendered inside the scene (a mock, not a real input) |
| 4 | Options, Multiplied! | Agentic Refinement | The user marks up intent; agents execute the layout edits | Top-floor close-up (desks/chairs/shelving); a plan with one room circled in red and a handwritten change note |
| 5 | Imagination, Realized! | Instant Facades | Explore facade options without manual modelling or scripting | Wide desk again; spiral notebook with six facade-option thumbnails, a hand selecting one |

## 6. Demo drawer ("Watch the demo")

- Opens a **left-side drawer** (~40% width, full height, beige paper) over the scene — no dark scrim.
- Top: handwritten "Feature Overview" label and a "Close" control.
- Body: the feature title in huge type, **3 numbered steps** explaining how the feature
  works, an ~18-second product video (standard player controls), and a white pill
  "Open demo project" button (external — placeholder in our clone).

## 7. Open Letter

- Deep-navy section. Centred handwritten eyebrow ("to those who shape the world"),
  huge cream serif heading "An Open Letter".
- A cream paper sheet rises out of a tan envelope flap at bottom-centre, partly
  overlapping the heading; four large tilted 3D paper/logo tiles float in the corners.
- Letter body (paraphrased): design was never meant to happen through buttons,
  commands and rigid workflows — it begins with sketches, markups, references,
  conversation and iteration. The product was built for that way of working, so
  architects can explore more freely and refine more quickly. Ends with a bold sign-off.

## 8. Pricing

- Styled as **stacked, tilted paper folders** sliding over the navy letter section,
  with a folder tab on the left edge labelled "Pricing" (mono).
- Heading offers **1,000 starter credits** on sign-up (that phrase carries a red wavy
  hand-drawn underline). No monthly/yearly toggle exists.
- Three sharp-cornered, paper-textured cards in a row; the middle card is taller,
  raised, and overlaps both neighbours:

| Plan | Price | Key facts | CTA |
|---|---|---|---|
| Explore | $29.99 / person / month | Cream card. Everything in Free; 3,000 credits/month; more messages; more floor-plan/building generation; more export quota; early access to new features | Sign up |
| Team | $59.99+ / team / month | Orange-red card. Everything in Explore; pooled team usage; member, permission and billing management; multiplayer collaboration; enhanced support, SSO and license management | Join waitlist |
| Enterprise | Custom pricing | Royal-blue card. Everything in Team; custom agents and enterprise features; enterprise security and controls; expanded usage; 24/7 priority support, SLAs, custom legal terms | Contact us |

- Feature lists use small check icons with thin dashed separators; card text is small mono/sans.
- Footnote: the free plan includes 100 credits that refresh every month.
- Source CSS confirms paper textures: `pricing.jpg` (section), `pricing-1.jpg` (cream),
  `pricing-2.jpg` (red), `pricing-3.jpg` (blue), `tick.png` / `tick-light.png` (checks).

## 9. FAQs

- Another tilted kraft folder overlapping Pricing, tab labelled "FAQs".
- Left column: handwritten boxed eyebrow "Need help?", huge heading
  "Frequently Asked Questions", white pill button with the contact email.
- Right column: **5 questions**, accordion, single-open (opening one closes the other),
  chevron button flips, answer appears under a dashed rule. Topics:
  1. How it differs from generic AI and conventional design tools
  2. How it fits a BIM/CAD workflow (Revit/Rhino integration is mentioned)
  3. Output accuracy, and whether complex AI prompting must be learned
  4. Who owns the design IP, and whether data trains their models
  5. How credits work, and whether every click is charged
- Answers are paraphrased in our build, not copied.

## 10. Footer

- Royal-blue blueprint background: faint grid plus a large white line-drawn isometric
  floor plan (circular and triangular rooms) across the top. Source CSS: `footer.jpg` texture.
- A dark-navy card overlaps it, carrying a giant tone-on-tone "illoca®" wordmark
  spanning its width.
- Left: the tagline in white. Right: two columns with orange-red headings —
  "Quick links" (Home, Legal) and "Connect" (LinkedIn, X/Twitter, Instagram, email).
- Bottom-right, small light grey: Copyright ©2026 illoca · Terms · Privacy. No newsletter form.

## 11. Design system

- **Colours:** paper beige ~`#E8E0CF`, cream ~`#F5EFE3`, royal blue ~`#1E4FD8`,
  deep navy ~`#1A2F6B`, accent red `#E76051` (from source CSS; live rendering reads
  slightly more orange, ~`#E8491D`), sage green (model trees), body text dark
  navy/near-black, secondary greys around `#414141`–`#5B5B5B`.
- **Fonts (exact — from the page's own Google Fonts links):** Syne 800 (display),
  Space Grotesk 600, DM Sans 400/500 (body), Space Mono 400 and Geist Mono 500 (mono),
  Caveat 400 (handwritten).
- **Style rules:** sharp corners almost everywhere (pills/buttons excepted); thin blue
  borders; dashed rules; hand-drawn red wavy underlines and arrows; hard offset shadows
  (`4px 4px rgba(0,0,0,.1)` style); paper textures on cards/sections; very generous
  spacing; full-viewport sections.

## 12. Unobserved / open items

- Mobile layout and mobile menu — the research browser was fixed at 1920×1000.
  We will design responsive stacking ourselves (panels over scene, cards stacked).
- The five ~18s demo videos — placeholders in the clone.
- The diorama is a bespoke illustrated 3D scene; the clone rebuilds a stylised
  Three.js desk/studio diorama with the same camera beats (see PLAN.md).
