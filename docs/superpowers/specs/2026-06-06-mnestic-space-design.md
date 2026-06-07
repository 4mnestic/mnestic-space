# mnestic.space — Personal Portfolio Site Design Spec

**Date:** 2026-06-06  
**Status:** Approved  
**Domain:** mnestic.space

---

## 1. Purpose & Audience

A personal portfolio site for an aspiring actuary with a B.S. in Mathematics and Information Science (double major) and an accelerated M.S. in Information Science (emphasis: machine learning) from the University of Arizona.

**Primary audiences:**
- Actuarial employers — looking for exam progress, relevant tools, quantitative competence
- Data science / ML employers — looking for projects, code, models
- Peers — approachable tone, not stiff or overly corporate

**Positioning:** The site presents a coherent identity — math + information science + ML + actuarial science — not as scattered interests but as a single through-line: a quantitative person who builds things. The ML background is a differentiator from typical actuarial candidates and should be visible.

---

## 2. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Astro (static output) | Low config, Markdown-driven, multi-page, no JS overhead |
| Hosting | Netlify or Vercel | Free tier, auto-deploys from GitHub |
| Interactive demos | Hugging Face Spaces or Streamlit Community Cloud | Free hosting for Python/Streamlit apps |
| Demo embedding | `<iframe>` in project pages | No backend needed on portfolio side |
| Contact | Links only (email, LinkedIn, GitHub) | No form, no backend |

The owner is comfortable with Python but not experienced with HTML/CSS/JS. Astro allows content to be written in Markdown; the framework and CSS are set up once and rarely touched. New projects = new `.md` file.

---

## 3. Pages & Content

### 3.1 Home (`/`)
- Large monospace name display
- Short tagline (1–2 lines) — captures actuarial + technical identity
- Avatar artwork image in ASCII border (this is the owner's online identity image, not a photo)
- Brief intro paragraph (3–5 sentences)
- Navigation styled as ASCII buttons

### 3.2 About (`/about`)
- Bio section: connects math + IS + ML + actuarial as one coherent story
- Actual photo of the owner alongside the bio (comfortable sharing; placed here rather than home so the avatar is the primary digital identity on the landing page)
- Actuarial progress: exams passed, coursework completed — displayed with ASCII progress bar style (e.g., `[====......] 40%`)
- Skills section: organized cleanly by area

### 3.3 Projects (`/projects`)
- Card grid — each card in an ASCII border box
- Each card shows: project name, short description, tags, link to detail page
- Tags used for organization (not hard categories): `[actuarial]` `[ml]` `[python]` `[data]` etc.
- Actuarial projects and ML/data projects coexist — no "relevant vs. not relevant" split
- Future: INFO 621 (Advanced Machine Learning Applications) projects will be added here

### 3.4 Project Detail (`/projects/[slug]`)
- Title, description, tools/technologies used
- Interactive iframe embed if the project has a live demo (Streamlit/Hugging Face), OR link to GitHub
- Iframe receives same ASCII border treatment as other UI elements
- Back link: `<< back to projects`

### 3.5 Contact (`/contact`)
- Email, LinkedIn, GitHub displayed as styled ASCII links
- No contact form — intentionally minimal

---

## 4. Visual Design

### 4.1 Aesthetic
ASCII wireframe — monospace font throughout, character-based borders (`+`, `-`, `|`), flat and stark. The site design stays out of the way so the content can speak. Inspired by terminal/wireframe aesthetics.

Key rules:
- No rounded corners
- No drop shadows
- No gradients
- Whitespace is intentional and generous
- Borders are ASCII characters, not CSS borders (or styled to look like them)

### 4.2 Color System
Dark theme. All colors defined as CSS custom properties for easy swapping.

```css
:root {
  --color-bg:       #111111;
  --color-text:     #e8e8e0;
  --color-border:   #444444;
  --color-accent-1: #5b8db8;  /* muted blue — primary accent */
  --color-accent-2: TBD;      /* secondary accent, set once site is running */
}
```

Accent colors are used for links, hover states, and highlights. Everything else is bg/text/border.

### 4.3 Typography
- Font: monospace throughout — `IBM Plex Mono` (preferred) or fallback to `Courier New`, `monospace`
- Headings: larger size, possibly all-caps or decorated (e.g., `## HEADING ##`)
- Body: comfortable line height (~1.6)
- Labels/metadata: smaller, dimmed (use `--color-border` or similar)

### 4.4 Navigation
- Horizontal text nav: `[ home ]  [ about ]  [ projects ]  [ contact ]`
- Active page indicated: `[ *about* ]` or `> about <`
- Consistent across all pages (Astro layout component)

### 4.5 UI Patterns
- Buttons/links: `[ label ]` or `>> label`
- Cards: ASCII box borders around content blocks
- Progress bars: `[========..] 80%` style
- Back links: `<< back to projects`
- Images: displayed in `+---+` style ASCII frames, no circular crop

---

## 5. Images

| Image | Placement | Treatment |
|---|---|---|
| Avatar artwork | Home page | ASCII-bordered frame, prominent |
| Owner photo | About page | ASCII-bordered frame, next to bio |

The avatar represents the owner's online identity. The photo is shared openly but placed on About intentionally — visitors meet the digital identity first.

---

## 6. Interactive Projects

Python-based interactive tools (Streamlit, Gradio, etc.) are:
1. Built and hosted separately on Hugging Face Spaces or Streamlit Community Cloud
2. Embedded in the relevant project detail page via `<iframe>`
3. The iframe is styled with the same ASCII border treatment as other elements

Non-interactive projects get a description + GitHub link (and optionally a screenshot).

---

## 7. Tone

| Section | Tone |
|---|---|
| Home | Clean, confident, minimal — first impression |
| About | Warm, personal, intellectual — the person behind the work |
| Projects | Clear and precise — lets the work speak |
| Contact | Simple, no-frills |

Writing should connect the through-line: quantitative background + technical builder + actuarial direction. Avoid stiff corporate language; approachable to peers.

---

## 8. Out of Scope (for now)

- Blog / writing section
- Contact form (no backend)
- Dark/light mode toggle (dark only for now)
- CMS integration
- Analytics

These can be added later without restructuring the site.

---

## 9. Open Decisions

- `--color-accent-2`: leave as TBD, set once the site is visually running
- Exact tagline copy: written by owner
- Bio and About copy: written by owner
- Whether to use `IBM Plex Mono` (requires Google Fonts load) or a system monospace font

---

## 10. Continuation Notes

This spec is the source of truth for design decisions. The next step is an implementation plan (created by the `writing-plans` skill) that breaks this into discrete, executable tasks.

Any future Claude session should:
1. Read this spec for design decisions
2. Read the implementation plan (once created) for task status and next steps
3. Check `/home/mnesticated/portfolio` for current project state before making assumptions
