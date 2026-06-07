# mnestic.space Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-themed ASCII wireframe personal portfolio at mnestic.space using Astro, deployed to Netlify.

**Architecture:** Multi-page Astro static site with a shared BaseLayout, reusable ASCII-aesthetic components, and Markdown-driven project content collections. Interactive demos are hosted externally (Hugging Face Spaces / Streamlit Cloud) and embedded via `<iframe>`. Node.js must be installed before any Astro work begins.

**Tech Stack:** Node.js (via nvm), Astro, @fontsource/ibm-plex-mono, CSS custom properties, Netlify

---

## File Map

```
/home/mnesticated/portfolio/
├── public/
│   └── images/
│       ├── avatar.png          ← owner provides (online identity artwork)
│       └── photo.jpg           ← owner provides (actual photo, used on About)
├── src/
│   ├── content/
│   │   ├── config.ts           ← Astro content collection schema for projects
│   │   └── projects/
│   │       └── example.md      ← placeholder project (owner replaces with real ones)
│   ├── layouts/
│   │   └── BaseLayout.astro    ← shared HTML shell: head, nav, footer, global CSS import
│   ├── components/
│   │   ├── Nav.astro           ← ASCII nav bar with active-page indicator
│   │   ├── AsciiBox.astro      ← reusable ASCII-bordered wrapper (+ corners over CSS border)
│   │   ├── AsciiImage.astro    ← image rendered inside an ASCII-bordered frame
│   │   ├── ProgressBar.astro   ← [====....] style ASCII progress bar
│   │   └── ProjectCard.astro   ← project card: title, description, tags, link
│   ├── pages/
│   │   ├── index.astro         ← Home: name, tagline, avatar, intro
│   │   ├── about.astro         ← About: bio, photo, actuarial progress, skills
│   │   ├── contact.astro       ← Contact: email, LinkedIn, GitHub links
│   │   └── projects/
│   │       ├── index.astro     ← Projects list: card grid, all projects
│   │       └── [slug].astro    ← Project detail: description, iframe or GitHub link
│   └── styles/
│       └── global.css          ← CSS custom properties, base typography, layout
├── astro.config.mjs            ← Astro config: static output
├── package.json
└── netlify.toml                ← Netlify build config
```

---

## Task 1: Install Node.js via nvm

**Files:** none (environment setup)

- [ ] **Step 1: Install nvm**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

- [ ] **Step 2: Load nvm into current shell**

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

- [ ] **Step 3: Install Node.js LTS**

```bash
nvm install --lts
nvm use --lts
```

- [ ] **Step 4: Verify**

```bash
node --version
npm --version
```

Expected: node v22.x.x (or similar LTS), npm 10.x.x

- [ ] **Step 5: Set default so future shells use it**

```bash
nvm alias default node
```

- [ ] **Step 6: Add nvm init to shell profile so it loads automatically**

Check if your shell is bash or zsh:
```bash
echo $SHELL
```

If bash, add to `~/.bashrc`. If zsh, add to `~/.zshrc`:
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

---

## Task 2: Initialize Astro Project

**Files:**
- Create: `astro.config.mjs`
- Create: `package.json`
- Create: `.gitignore`

- [ ] **Step 1: Scaffold Astro project into the existing portfolio directory**

The `/home/mnesticated/portfolio` directory already exists with git initialized. Run:

```bash
cd /home/mnesticated/portfolio
npm create astro@latest . -- --template minimal --install --no-git --typescript strict
```

Answer any interactive prompts: choose "Yes" to install dependencies, "No" to git init (already done), TypeScript strict mode.

- [ ] **Step 2: Verify astro.config.mjs was created and set output to static**

Open `astro.config.mjs` and ensure it reads:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://mnestic.space',
});
```

If the scaffold created a different version, replace the file entirely with the above.

- [ ] **Step 3: Install IBM Plex Mono font package**

```bash
npm install @fontsource/ibm-plex-mono
```

- [ ] **Step 4: Verify .gitignore includes node_modules and dist**

Check `.gitignore` exists and contains at minimum:
```
node_modules/
dist/
.astro/
```

If missing, create it with those lines.

- [ ] **Step 5: Run the dev server to verify the scaffold works**

```bash
npm run dev
```

Expected: server starts on http://localhost:4321 (or similar), no errors. Visit the URL in a browser and confirm a page renders. Ctrl+C to stop.

- [ ] **Step 6: Commit**

```bash
cd /home/mnesticated/portfolio
git add astro.config.mjs package.json package-lock.json tsconfig.json .gitignore src/ public/
git commit -m "feat: initialize Astro project scaffold"
```

---

## Task 3: Global CSS and Color System

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create the global stylesheet**

Create `src/styles/global.css` with this exact content:

```css
@import '@fontsource/ibm-plex-mono/400.css';
@import '@fontsource/ibm-plex-mono/700.css';

:root {
  --color-bg:       #111111;
  --color-text:     #e8e8e0;
  --color-border:   #444444;
  --color-accent-1: #5b8db8;
  --color-accent-2: #e8e8e0;
  --font-mono: 'IBM Plex Mono', 'Courier New', monospace;
  --line-height: 1.6;
  --max-width: 860px;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-mono);
  line-height: var(--line-height);
  font-size: 16px;
}

body {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

a {
  color: var(--color-accent-1);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

h1 {
  font-size: 2rem;
  line-height: 1.2;
}

h2 {
  font-size: 1.4rem;
  line-height: 1.2;
  letter-spacing: 0.05em;
}

h3 {
  font-size: 1.1rem;
  line-height: 1.2;
}

p {
  max-width: 65ch;
}

.dimmed {
  color: var(--color-border);
  font-size: 0.85rem;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-border);
}

.section {
  margin-bottom: 3rem;
}

main {
  min-height: 70vh;
}

footer {
  margin-top: 4rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-border);
  font-size: 0.85rem;
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: exits with code 0, `dist/` directory created. No errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global CSS with dark ASCII wireframe color system"
```

---

## Task 4: BaseLayout and Nav Component

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Nav.astro`

- [ ] **Step 1: Create Nav.astro**

Create `src/components/Nav.astro`:

```astro
---
interface Props {
  currentPath: string;
}

const { currentPath } = Astro.props;

const links = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/contact', label: 'contact' },
];

function isActive(href: string): boolean {
  if (href === '/') return currentPath === '/' || currentPath === '';
  return currentPath.startsWith(href);
}
---

<nav>
  {links.map(link => (
    <a href={link.href} class={isActive(link.href) ? 'active' : ''}>
      {isActive(link.href) ? `[ *${link.label}* ]` : `[ ${link.label} ]`}
    </a>
  ))}
</nav>

<style>
nav {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

nav a {
  color: var(--color-text);
  text-decoration: none;
  white-space: nowrap;
}

nav a:hover,
nav a.active {
  color: var(--color-accent-1);
  text-decoration: none;
}
</style>
```

- [ ] **Step 2: Create BaseLayout.astro**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import Nav from '../components/Nav.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const {
  title,
  description = 'Portfolio of Zach Keyes — actuary, data scientist, builder.',
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, 'https://mnestic.space');
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />
    <title>{title} | mnestic.space</title>
  </head>
  <body>
    <Nav currentPath={Astro.url.pathname} />
    <main>
      <slot />
    </main>
    <footer>
      <p>// zach keyes // mnestic.space</p>
    </footer>
  </body>
</html>
```

- [ ] **Step 3: Update src/pages/index.astro to use BaseLayout (smoke test)**

Replace the contents of `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home">
  <h1>mnestic.space</h1>
  <p>placeholder</p>
</BaseLayout>
```

- [ ] **Step 4: Run dev server and verify nav renders**

```bash
npm run dev
```

Visit http://localhost:4321. Verify:
- Page has dark background
- Nav shows `[ *home* ]  [ about ]  [ projects ]  [ contact ]`
- IBM Plex Mono font is loading (monospace, not serif/sans-serif)
- Footer shows `// zach keyes // mnestic.space`

Ctrl+C to stop.

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

Expected: exits 0, no errors.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/Nav.astro src/pages/index.astro
git commit -m "feat: add BaseLayout and Nav with ASCII active-page indicator"
```

---

## Task 5: AsciiBox Component

**Files:**
- Create: `src/components/AsciiBox.astro`

- [ ] **Step 1: Create AsciiBox.astro**

This component wraps any content in a bordered box with `+` characters at the corners, creating the ASCII wireframe aesthetic.

Create `src/components/AsciiBox.astro`:

```astro
---
interface Props {
  class?: string;
}
const { class: className = '' } = Astro.props;
---

<div class={`ascii-box ${className}`}>
  <span class="corner tl" aria-hidden="true">+</span>
  <span class="corner tr" aria-hidden="true">+</span>
  <span class="corner bl" aria-hidden="true">+</span>
  <span class="corner br" aria-hidden="true">+</span>
  <div class="ascii-box-content">
    <slot />
  </div>
</div>

<style>
.ascii-box {
  border: 1px solid var(--color-border);
  position: relative;
  padding: 1.5rem;
}

.corner {
  position: absolute;
  background: var(--color-bg);
  color: var(--color-border);
  font-family: var(--font-mono);
  font-size: 1em;
  line-height: 1;
  width: 1ch;
  text-align: center;
  user-select: none;
}

.tl { top: -0.55em; left: -0.55ch; }
.tr { top: -0.55em; right: -0.55ch; }
.bl { bottom: -0.55em; left: -0.55ch; }
.br { bottom: -0.55em; right: -0.55ch; }
</style>
```

- [ ] **Step 2: Add a smoke test to index.astro**

Update `src/pages/index.astro` to include AsciiBox:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import AsciiBox from '../components/AsciiBox.astro';
---

<BaseLayout title="Home">
  <h1>mnestic.space</h1>
  <AsciiBox>
    <p>This content is inside an ASCII box.</p>
  </AsciiBox>
</BaseLayout>
```

- [ ] **Step 3: Run dev server and verify the box renders**

```bash
npm run dev
```

Visit http://localhost:4321. Verify:
- A bordered box appears with `+` at each corner
- Border is dim (dark grey), not bright white
- Content inside is readable

Ctrl+C to stop.

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/components/AsciiBox.astro src/pages/index.astro
git commit -m "feat: add AsciiBox component with corner characters"
```

---

## Task 6: AsciiImage Component

**Files:**
- Create: `src/components/AsciiImage.astro`

- [ ] **Step 1: Create AsciiImage.astro**

This component renders an image inside an ASCII-bordered frame. No circular crop, no shadow.

Create `src/components/AsciiImage.astro`:

```astro
---
interface Props {
  src: string;
  alt: string;
  width?: number;
  caption?: string;
}

const { src, alt, width = 300, caption } = Astro.props;
---

<figure class="ascii-image" style={`width: ${width}px; max-width: 100%;`}>
  <span class="corner tl" aria-hidden="true">+</span>
  <span class="corner tr" aria-hidden="true">+</span>
  <span class="corner bl" aria-hidden="true">+</span>
  <span class="corner br" aria-hidden="true">+</span>
  <img src={src} alt={alt} />
  {caption && <figcaption>{caption}</figcaption>}
</figure>

<style>
.ascii-image {
  border: 1px solid var(--color-border);
  position: relative;
  display: inline-block;
  padding: 0;
}

.ascii-image img {
  display: block;
  width: 100%;
  height: auto;
}

.ascii-image figcaption {
  padding: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-border);
  text-align: center;
  border-top: 1px solid var(--color-border);
}

.corner {
  position: absolute;
  background: var(--color-bg);
  color: var(--color-border);
  font-family: var(--font-mono);
  font-size: 1em;
  line-height: 1;
  width: 1ch;
  text-align: center;
  user-select: none;
  z-index: 1;
}

.tl { top: -0.55em; left: -0.55ch; }
.tr { top: -0.55em; right: -0.55ch; }
.bl { bottom: -0.55em; left: -0.55ch; }
.br { bottom: -0.55em; right: -0.55ch; }
</style>
```

- [ ] **Step 2: Add placeholder images to public/images/**

Create the directory and add placeholder files so the build doesn't break:

```bash
mkdir -p /home/mnesticated/portfolio/public/images
```

Create a 1×1 pixel placeholder PNG to avoid broken image errors during development:

```bash
# Creates a minimal valid PNG (1x1 transparent pixel)
printf '\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82' > /home/mnesticated/portfolio/public/images/avatar.png
cp /home/mnesticated/portfolio/public/images/avatar.png /home/mnesticated/portfolio/public/images/photo.jpg
```

**Note to owner:** Replace `public/images/avatar.png` with your actual avatar artwork, and `public/images/photo.jpg` with your actual photo before deploying.

- [ ] **Step 3: Verify build passes**

```bash
cd /home/mnesticated/portfolio && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/AsciiImage.astro public/images/
git commit -m "feat: add AsciiImage component and placeholder images"
```

---

## Task 7: ProgressBar Component

**Files:**
- Create: `src/components/ProgressBar.astro`

- [ ] **Step 1: Create ProgressBar.astro**

Renders an ASCII-style progress bar: `[========..........] 40%`

Create `src/components/ProgressBar.astro`:

```astro
---
interface Props {
  label: string;
  percent: number;   // 0–100
  width?: number;    // number of characters wide (default 20)
}

const { label, percent, width = 20 } = Astro.props;

const filled = Math.round((percent / 100) * width);
const empty = width - filled;
const bar = '='.repeat(filled) + '.'.repeat(empty);
const display = `${Math.round(percent)}%`.padStart(4);
---

<div class="progress-row">
  <span class="progress-label">{label}</span>
  <span class="progress-bar">[{bar}] {display}</span>
</div>

<style>
.progress-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.progress-label {
  min-width: 12ch;
  color: var(--color-text);
  font-size: 0.9rem;
}

.progress-bar {
  color: var(--color-accent-1);
  white-space: pre;
  font-size: 0.9rem;
}
</style>
```

- [ ] **Step 2: Verify build passes**

```bash
cd /home/mnesticated/portfolio && npm run build
```

Expected: exits 0, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProgressBar.astro
git commit -m "feat: add ASCII ProgressBar component"
```

---

## Task 8: ProjectCard Component

**Files:**
- Create: `src/components/ProjectCard.astro`

- [ ] **Step 1: Create ProjectCard.astro**

Each card shows: title, description, tags, and a link to the project detail page. Wrapped in an AsciiBox.

Create `src/components/ProjectCard.astro`:

```astro
---
import AsciiBox from './AsciiBox.astro';

interface Props {
  title: string;
  description: string;
  tags: string[];
  slug: string;
}

const { title, description, tags, slug } = Astro.props;
---

<AsciiBox class="project-card">
  <h3><a href={`/projects/${slug}`}>{title}</a></h3>
  <p class="card-desc">{description}</p>
  <div class="tags">
    {tags.map(tag => <span class="tag">[{tag}]</span>)}
  </div>
  <a href={`/projects/${slug}`} class="card-link">&gt;&gt; view project</a>
</AsciiBox>

<style>
.project-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-desc {
  color: var(--color-text);
  font-size: 0.9rem;
  max-width: 55ch;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.75rem;
  color: var(--color-border);
}

.card-link {
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

h3 a {
  color: var(--color-text);
  text-decoration: none;
}

h3 a:hover {
  color: var(--color-accent-1);
}
</style>
```

- [ ] **Step 2: Verify build passes**

```bash
cd /home/mnesticated/portfolio && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "feat: add ProjectCard component"
```

---

## Task 9: Content Collection for Projects

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/projects/example.md`

- [ ] **Step 1: Create the content collection schema**

Create `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.string(),
    demo: z.string().optional(),
    github: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };
```

- [ ] **Step 2: Create a placeholder project**

Create `src/content/projects/example.md`:

```markdown
---
title: "Example Project"
description: "A placeholder project. Replace this with a real one."
tags: ["actuarial", "python"]
date: "2026-06-06"
github: "https://github.com/4mnestic"
featured: true
---

## Overview

This is a placeholder project entry. Replace it with a real project description.

## Methodology

Describe your approach here.

## Results

Describe your results here.
```

- [ ] **Step 3: Verify build passes**

```bash
cd /home/mnesticated/portfolio && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts src/content/projects/example.md
git commit -m "feat: add projects content collection with placeholder entry"
```

---

## Task 10: Home Page

**Files:**
- Modify: `src/pages/index.astro`

**Owner action required:** Before or after implementation, fill in:
- Your actual tagline (1–2 lines)
- Your actual intro paragraph (3–5 sentences)

The file uses `FILL IN:` comments to mark these spots.

- [ ] **Step 1: Write index.astro**

Replace `src/pages/index.astro` entirely:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import AsciiImage from '../components/AsciiImage.astro';
---

<BaseLayout title="Home" description="Portfolio of Zach Keyes — actuary, data scientist, builder.">
  <section class="hero section">
    <h1 class="site-name">ZACH KEYES</h1>
    <p class="tagline">
      <!-- FILL IN: your tagline here (1-2 lines) -->
      actuary-in-training. quantitative builder. information scientist.
    </p>
  </section>

  <section class="avatar-section section">
    <AsciiImage
      src="/images/avatar.png"
      alt="Zach Keyes — online identity"
      width={280}
    />
  </section>

  <section class="intro section">
    <p>
      <!-- FILL IN: your intro paragraph (3-5 sentences) -->
      I'm a mathematics and information science graduate at the University of Arizona,
      currently pursuing an accelerated M.S. in information science with a focus on
      machine learning. I'm working toward a career in actuarial science — building
      tools, crunching numbers, and making models that mean something.
    </p>
  </section>

  <section class="section">
    <p>
      <a href="/projects">&gt;&gt; view my projects</a>
      &nbsp;&nbsp;
      <a href="/about">&gt;&gt; about me</a>
    </p>
  </section>
</BaseLayout>

<style>
.site-name {
  font-size: 2.5rem;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
}

.tagline {
  color: var(--color-accent-1);
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 55ch;
}

.avatar-section {
  margin-bottom: 2rem;
}

.intro p {
  max-width: 60ch;
  line-height: 1.7;
}
</style>
```

- [ ] **Step 2: Run dev server and verify home page**

```bash
npm run dev
```

Visit http://localhost:4321. Verify:
- Name renders large, monospace, spaced
- Tagline is muted blue
- Avatar placeholder image is visible in ASCII border
- Two `>> links` to projects and about are visible and correct color

Ctrl+C to stop.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build home page with name, tagline, avatar, and intro"
```

---

## Task 11: About Page

**Files:**
- Create: `src/pages/about.astro`

**Owner action required:** Fill in:
- Bio text (connects math + IS + ML + actuarial)
- Actuarial exam/course progress (update percent values in ProgressBar calls)
- Skills list

- [ ] **Step 1: Create about.astro**

Create `src/pages/about.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import AsciiBox from '../components/AsciiBox.astro';
import AsciiImage from '../components/AsciiImage.astro';
import ProgressBar from '../components/ProgressBar.astro';
---

<BaseLayout title="About" description="About Zach Keyes — background, studies, and actuarial progress.">

  <h2 class="page-title">// ABOUT</h2>

  <section class="bio-section section">
    <div class="bio-layout">
      <div class="bio-text">
        <!-- FILL IN: replace with your actual bio -->
        <p>
          I'm Zach Keyes, a mathematician and information scientist working toward
          a career in actuarial science. I hold a B.S. in Mathematics and
          Information Science from the University of Arizona, and I'm currently
          completing an accelerated M.S. in Information Science with an emphasis
          in machine learning.
        </p>
        <br />
        <p>
          I'm drawn to problems where rigorous quantitative thinking meets real-world
          decisions — risk, uncertainty, and the models we build to reason about them.
          My machine learning background gives me a different lens than most actuarial
          candidates, and I try to bring that to bear in everything I build.
        </p>
        <br />
        <p>
          <!-- FILL IN: add a personal sentence or two — interests, approach, something warm -->
          Outside of coursework, I build tools and explore ideas that sit at the
          intersection of data, probability, and design.
        </p>
      </div>

      <div class="bio-image">
        <AsciiImage
          src="/images/photo.jpg"
          alt="Zach Keyes"
          width={220}
          caption="[ irl ]"
        />
      </div>
    </div>
  </section>

  <section class="section">
    <h3 class="section-heading">// ACTUARIAL PROGRESS</h3>
    <AsciiBox>
      <!-- FILL IN: update percent values to match your actual progress -->
      <ProgressBar label="Exam P" percent={100} />
      <ProgressBar label="Exam FM" percent={0} />
      <ProgressBar label="Exam FAM" percent={0} />
      <ProgressBar label="VEE Economics" percent={0} />
      <ProgressBar label="VEE Statistics" percent={100} />
      <ProgressBar label="VEE Accounting" percent={0} />
    </AsciiBox>
  </section>

  <section class="section">
    <h3 class="section-heading">// EDUCATION</h3>
    <AsciiBox>
      <div class="edu-entry">
        <p><strong>B.S. Mathematics &amp; Information Science</strong></p>
        <p class="dimmed">University of Arizona</p>
      </div>
      <br />
      <div class="edu-entry">
        <p><strong>M.S. Information Science</strong> <span class="dimmed">(in progress)</span></p>
        <p class="dimmed">University of Arizona — emphasis: machine learning</p>
        <p class="dimmed">Accelerated program</p>
      </div>
    </AsciiBox>
  </section>

  <section class="section">
    <h3 class="section-heading">// SKILLS</h3>
    <AsciiBox>
      <!-- FILL IN: adjust or add skills as appropriate -->
      <div class="skills-grid">
        <div>
          <p class="label">languages</p>
          <p>Python, R, SQL</p>
        </div>
        <div>
          <p class="label">tools &amp; libraries</p>
          <p>NumPy, Pandas, Scikit-learn, Matplotlib</p>
        </div>
        <div>
          <p class="label">domains</p>
          <p>actuarial science, machine learning, data analysis, probability &amp; statistics</p>
        </div>
      </div>
    </AsciiBox>
  </section>

</BaseLayout>

<style>
.page-title {
  margin-bottom: 2rem;
  color: var(--color-accent-1);
  font-size: 1.2rem;
  letter-spacing: 0.1em;
}

.section-heading {
  color: var(--color-accent-1);
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.bio-layout {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.bio-text {
  flex: 1;
  min-width: 240px;
}

.bio-image {
  flex-shrink: 0;
}

.edu-entry {
  margin-bottom: 0.25rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.skills-grid p:not(.label) {
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
</style>
```

- [ ] **Step 2: Run dev server and verify About page**

```bash
npm run dev
```

Visit http://localhost:4321/about. Verify:
- Nav shows `[ *about* ]` as active
- Bio text and photo appear side by side (or stacked on narrow screen)
- Progress bars render with `[===...]` style
- Education and skills sections render in ASCII boxes

Ctrl+C to stop.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: build about page with bio, photo, progress, education, skills"
```

---

## Task 12: Projects List Page

**Files:**
- Create: `src/pages/projects/index.astro`

- [ ] **Step 1: Create projects/index.astro**

Create `src/pages/projects/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProjectCard from '../../components/ProjectCard.astro';
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
projects.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
---

<BaseLayout title="Projects" description="Projects by Zach Keyes — actuarial tools, ML work, and more.">

  <h2 class="page-title">// PROJECTS</h2>

  <p class="intro">
    A mix of actuarial tools, machine learning work, and other things I've built.
  </p>

  <div class="projects-grid">
    {projects.map(project => (
      <ProjectCard
        title={project.data.title}
        description={project.data.description}
        tags={project.data.tags}
        slug={project.slug}
      />
    ))}
  </div>

</BaseLayout>

<style>
.page-title {
  margin-bottom: 1rem;
  color: var(--color-accent-1);
  font-size: 1.2rem;
  letter-spacing: 0.1em;
}

.intro {
  color: var(--color-border);
  font-size: 0.9rem;
  margin-bottom: 2.5rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>
```

- [ ] **Step 2: Run dev server and verify Projects page**

```bash
npm run dev
```

Visit http://localhost:4321/projects. Verify:
- Nav shows `[ *projects* ]` as active
- Placeholder project card renders with ASCII box border and `+` corners
- `>> view project` link is visible
- Tags appear in `[tag]` format

Ctrl+C to stop.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/projects/index.astro
git commit -m "feat: build projects list page with card grid"
```

---

## Task 13: Project Detail Page

**Files:**
- Create: `src/pages/projects/[slug].astro`

- [ ] **Step 1: Create projects/[slug].astro**

Create `src/pages/projects/[slug].astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AsciiBox from '../../components/AsciiBox.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(project => ({
    params: { slug: project.slug },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await project.render();
const { title, description, tags, demo, github } = project.data;
---

<BaseLayout title={title} description={description}>

  <p class="back-link"><a href="/projects">&lt;&lt; back to projects</a></p>

  <h2 class="project-title">{title}</h2>

  <div class="tags">
    {tags.map(tag => <span class="tag">[{tag}]</span>)}
  </div>

  <p class="project-desc">{description}</p>

  {demo && (
    <section class="section">
      <h3 class="section-heading">// LIVE DEMO</h3>
      <AsciiBox class="iframe-box">
        <iframe
          src={demo}
          title={`${title} — interactive demo`}
          width="100%"
          height="600"
          frameborder="0"
          loading="lazy"
        ></iframe>
      </AsciiBox>
    </section>
  )}

  {github && (
    <section class="section">
      <p><a href={github} target="_blank" rel="noopener noreferrer">&gt;&gt; view on github</a></p>
    </section>
  )}

  <section class="section content">
    <Content />
  </section>

</BaseLayout>

<style>
.back-link {
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.project-title {
  margin-bottom: 0.75rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  font-size: 0.75rem;
  color: var(--color-border);
}

.project-desc {
  color: var(--color-text);
  margin-bottom: 2rem;
  max-width: 60ch;
}

.section-heading {
  color: var(--color-accent-1);
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.iframe-box {
  padding: 0;
  overflow: hidden;
}

.content :global(h2),
.content :global(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-accent-1);
}

.content :global(p) {
  margin-bottom: 1rem;
}

.content :global(ul),
.content :global(ol) {
  padding-left: 2rem;
  margin-bottom: 1rem;
}
</style>
```

- [ ] **Step 2: Run dev server and verify project detail page**

```bash
npm run dev
```

Visit http://localhost:4321/projects/example. Verify:
- `<< back to projects` link appears and works
- Title, tags, and description render
- Markdown body content renders (Overview, Methodology, Results sections)
- GitHub link appears as `>> view on github`
- No iframe section (example project has no `demo:` field)

Ctrl+C to stop.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/projects/[slug].astro
git commit -m "feat: build project detail page with iframe embed and GitHub link"
```

---

## Task 14: Contact Page

**Files:**
- Create: `src/pages/contact.astro`

**Owner action required:** Fill in your actual email address and LinkedIn URL where marked.

- [ ] **Step 1: Create contact.astro**

Create `src/pages/contact.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import AsciiBox from '../components/AsciiBox.astro';
---

<BaseLayout title="Contact" description="Get in touch with Zach Keyes.">

  <h2 class="page-title">// CONTACT</h2>

  <p class="intro">The best way to reach me depends on what you need.</p>

  <AsciiBox>
    <div class="contact-list">
      <div class="contact-row">
        <span class="contact-label">email</span>
        <!-- FILL IN: replace with your actual email address -->
        <a href="mailto:zachabetes@gmail.com">zachabetes@gmail.com</a>
      </div>
      <div class="contact-row">
        <span class="contact-label">github</span>
        <a href="https://github.com/4mnestic" target="_blank" rel="noopener noreferrer">&gt;&gt; github.com/4mnestic</a>
      </div>
      <div class="contact-row">
        <span class="contact-label">linkedin</span>
        <!-- FILL IN: replace with your actual LinkedIn URL -->
        <a href="https://linkedin.com/in/YOURUSERNAME" target="_blank" rel="noopener noreferrer">&gt;&gt; linkedin.com/in/YOURUSERNAME</a>
      </div>
    </div>
  </AsciiBox>

</BaseLayout>

<style>
.page-title {
  margin-bottom: 1rem;
  color: var(--color-accent-1);
  font-size: 1.2rem;
  letter-spacing: 0.1em;
}

.intro {
  color: var(--color-border);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-row {
  display: flex;
  gap: 2rem;
  align-items: baseline;
  flex-wrap: wrap;
}

.contact-label {
  min-width: 8ch;
  color: var(--color-border);
  font-size: 0.85rem;
}
</style>
```

- [ ] **Step 2: Run dev server and verify Contact page**

```bash
npm run dev
```

Visit http://localhost:4321/contact. Verify:
- Nav shows `[ *contact* ]` as active
- Email, GitHub, and LinkedIn links are visible in an ASCII box
- Links are the correct muted blue color

Ctrl+C to stop.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: build contact page with email, GitHub, LinkedIn links"
```

---

## Task 15: Deployment Config (Netlify)

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Create netlify.toml**

Create `netlify.toml` in the project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

- [ ] **Step 2: Verify build one final time**

```bash
cd /home/mnesticated/portfolio && npm run build
```

Expected: exits 0. Check `dist/` directory contains `index.html`, `about/index.html`, `projects/index.html`, `contact/index.html`, `projects/example/index.html`.

```bash
ls dist/
ls dist/projects/
```

- [ ] **Step 3: Commit**

```bash
git add netlify.toml
git commit -m "feat: add Netlify deployment config"
```

---

## Task 16: Deploy to Netlify

This task requires creating a GitHub repository and connecting it to Netlify. These are manual steps — they require a browser.

- [ ] **Step 1: Push to GitHub**

```bash
cd /home/mnesticated/portfolio
git remote add origin https://github.com/4mnestic/mnestic-space.git
git push -u origin master
```

(Create the repository on GitHub first if it doesn't exist: https://github.com/new — name it `mnestic-space`, private or public your choice.)

- [ ] **Step 2: Connect to Netlify**

1. Go to https://app.netlify.com and log in
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub, select the `mnestic-space` repository
4. Build settings will auto-detect from `netlify.toml`
5. Click "Deploy site"

- [ ] **Step 3: Set custom domain**

In Netlify site settings → Domain management → Add custom domain → enter `mnestic.space`.

Follow Netlify's DNS instructions to point your domain to Netlify's servers.

- [ ] **Step 4: Verify live site**

Visit https://mnestic.space. Verify all pages load, nav works, font loads correctly.

---

## Owner Content Checklist

Before or after deployment, the following content needs to be filled in by the owner:

- [ ] Replace `public/images/avatar.png` with actual avatar artwork
- [ ] Replace `public/images/photo.jpg` with actual photo
- [ ] Fill in tagline in `src/pages/index.astro` (marked with `FILL IN:`)
- [ ] Fill in intro paragraph in `src/pages/index.astro`
- [ ] Fill in bio in `src/pages/about.astro`
- [ ] Update actuarial progress percentages in `src/pages/about.astro`
- [ ] Update skills list in `src/pages/about.astro`
- [ ] Fill in LinkedIn URL in `src/pages/contact.astro`
- [ ] Replace `src/content/projects/example.md` with real project entries
- [ ] Set `--color-accent-2` in `src/styles/global.css` once the site is running visually

---

## Adding a New Project (Ongoing)

To add a new project after the site is built:

1. Create `src/content/projects/your-project-name.md` with this frontmatter:

```markdown
---
title: "Your Project Title"
description: "One sentence describing the project."
tags: ["ml", "python"]       # use any combination
date: "2026-01-15"           # ISO date
github: "https://github.com/4mnestic/your-repo"   # optional
demo: "https://your-app.hf.space"                  # optional, for iframe embed
featured: false
---

## Overview

Describe the project.
```

2. Commit and push — Netlify auto-deploys.
