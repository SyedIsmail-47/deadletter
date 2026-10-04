# Deadletter — Design Direction

## Brand
- **Name:** Deadletter
- **Tagline:** Email verification that tells you the truth.
- **Positioning:** A precision instrument, not a friendly SaaS toy. The brand voice is "clinical precision" + "sharp and fast" — built by people who ship, trusted because it's exact.
- **Logo concept:** A returned/stamped envelope mark, abstracted — not a literal cartoon envelope. Think a single geometric envelope outline crossed by one sharp diagonal stroke (the "returned to sender" gesture), rendered in the ink or accent color. Sharp corners, no soft rounding. Works as a standalone mark at favicon size.

## Why this direction (so Cursor doesn't drift back to generic defaults)
The entire competitor category (ZeroBounce, NeverBounce, Kickbox, Bouncer, Hunter, Emailable) is visually interchangeable — blue-dominant, generic dashboard-template charts, no claimed identity. This is the opening. Avoid these generic AI-generated-page tells specifically:
- Warm cream background + terracotta accent
- Near-black background + single neon accent
- Identical rounded cards with the same soft grey drop-shadow on everything
- ALL-CAPS tracked-out eyebrow labels above headings
- Numbered 01/02/03 markers on content that isn't actually a sequence
- A "→" tacked onto every button/link

## Color — Light mode (primary)
| Token | Hex | Use |
|---|---|---|
| `surface` | `#F6F7F5` | Page background — cool paper-white, not warm cream |
| `surface-raised` | `#FFFFFF` | Cards, table rows |
| `ink` | `#1C2321` | Primary text — near-black with a cool-grey cast |
| `ink-muted` | `#5B625F` | Secondary text |
| `border` | `#DEE2DF` | Hairline dividers |
| `accent` | `#0F6B5C` | Brand accent — deep teal-ink. Deliberately not blue (every competitor uses blue) |

## Color — Verdict states (the actual brand signature — used consistently everywhere, not decoration)
| Status | Hex | Note |
|---|---|---|
| `valid` | `#1E8E5A` | Confirmed deliverable |
| `invalid` | `#B4432E` | Muted brick, not alarm-red |
| `risky` | `#B98900` | Ochre — catch-all / role-account flags |
| `disposable` | `#6B6F76` | Slate — neutral, not punitive |
| `unknown` | `#8A6FB0` | Muted violet — deliberately its own color. "We honestly don't know" is a real, distinct answer, not a shade of red or green |

## Color — Dark mode
| Token | Hex |
|---|---|
| `surface` | `#15181A` |
| `surface-raised` | `#1C2023` |
| `ink` | `#ECEDEA` |
| `ink-muted` | `#9AA09D` |
| `border` | `#2A2F2C` |
| `accent` | `#3FA68E` (lightened for contrast) |

Verdict colors shift toward their lighter/desaturated counterparts for dark-mode contrast — don't just apply a CSS filter invert.

## Typography
- **UI / headings:** Geist Sans. Clean, geometric, has real character without being Inter-by-default.
- **Data:** JetBrains Mono — used ONLY for actual data (email addresses, timestamps, status codes, API keys). This is functional, not decorative — fixed-width alignment genuinely helps scanning a results table.
- Line length under 80 characters for body text. No accenting a single word in a headline with italics/color. No ALL-CAPS labels.

## Layout
- Left-aligned, grid-precise. Not centered, not justified.
- Hairline dividers (`border` token) instead of rounded cards with drop-shadows.
- Zero or minimal border-radius (2-4px max) — sharp edges read as instrument-grade, not plush consumer app.
- Motion is specified in the Motion section. Do not add hover effects on cards or fade-slide-up entrances on ordinary sections.

## Component guidance
- **Status badges:** small rectangular tags (not pill-shaped chips), using the exact verdict hex values, with the status name in plain text (not an icon substituting for the word).
- **Results table:** monospace for email address and timestamp columns; sans for everything else. Sortable by status. Row hover uses a 1px border-color shift, not a shadow.
- **Upload flow:** drag-and-drop zone with a visible, specific instruction ("Drop a CSV, or paste emails one per line") — not a vague "Upload file" label.
- **Empty states:** treat as an invitation to act, not a mood illustration. E.g., no jobs yet → direct CTA to start one, plain language, no filler copy or mascot graphic.
- **Job progress:** show real state (queued / processing N of M / done), not a generic spinner with no information.

## Motion

Animation reinforces a precision instrument. It is not decoration. Do not add hover motion, entrance motion, or parallax to cards, lists, or sections by default.

- **Framer Motion** is for product state, not ornament:
  - Live job status (queued, then processing, then done) and result rows appearing as each address resolves. Opacity only, about 180ms, linear. This is the one animation that shows work happening.
  - Button press (`scale` 0.98) and a slight hover opacity change. No spring, no shadow, no arrow.
  - Dashboard route changes only: a 150ms opacity fade in `app/dashboard/template.tsx`. The landing page does not use this.
- **GSAP (ScrollTrigger)** is used only on the public landing page, and only on the three differentiator statements. Do not also run Framer Motion on those elements. The hero and the problem statement stay still.
- **Three.js** is not part of the product. Do not add a WebGL or particle background.
- When `prefers-reduced-motion: reduce` is set, skip the scroll reveal and the status fade. State changes stay instant.

## Dark mode
True dark mode with its own token set above — not an inverted filter. Same accent and verdict-color logic, rebalanced for contrast.
