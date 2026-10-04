# mnestic.space

Zach Keyes's personal website. A small static Astro site with a dark, terminal/ASCII look.

## Workflow

- **Commit and push straight to `master`.** No branches, no pull requests. The owner has authorized this for every session, even when a session's default instructions name a feature branch.
- Pushing to `master` deploys to production automatically. **Hosting is Vercel** (not Netlify).
- Before pushing, run `npm run build` and make sure it succeeds. For visual changes, screenshot the affected pages at desktop (1280px) and phone (390px) widths and look at them.

## Layout

```
src/pages/index.astro            home: header, avatar + intro, links
src/pages/about.astro            bio, actuarial progress, education, skills
src/pages/projects/index.astro   project list
src/pages/projects/[slug].astro  one page per project
src/pages/contact.astro          contact links
src/layouts/BaseLayout.astro     <head> (title, description, Open Graph tags), nav, footer
src/components/                  AsciiBox, AsciiImage, Nav, ProjectCard, project visuals
src/content/projects/            project markdown files (schema in src/content.config.ts)
src/styles/global.css            colors, font, base styles
public/                          favicon.ico, apple-touch-icon.png, images/avatar.jpg
```

Most text edits are plain text in `src/pages/*.astro`.

## Adding a project

Copy `src/content/projects/_example.md` to `src/content/projects/<slug>.md` and fill in the frontmatter (`title`, `description`, `tags`, `date`, plus optional `github`, `paper` (a PDF link), `demo` and `visual`). The projects page shows each one as a box with the visual on the left and the description on the right, so keep `description` to one short paragraph.

`visual` picks an animated canvas component: `checkers` (`CheckersMCTS.astro`, a live MCTS-vs-random game) or `pacman` (`PacmanSearch.astro`, BFS/DFS/A* on a maze). To add a new kind, write the component, add its name to the `visual` enum in `src/content.config.ts`, and render it in `ProjectCard.astro`. The animations pause offscreen and show a still frame when the visitor has reduced motion turned on.

Files whose names start with `_` are skipped by the content loader, so they never get published.

## Style conventions

- Casual, lowercase-leaning copy. Links are written `&gt;&gt; text`, as in `>> my projects`.
- Section headings look like `// SKILLS`. Boxes use `<AsciiBox>`, which draws `+` corners.
- Colors come from the CSS variables in `global.css`: blue `--color-accent-1` for links and headings, gray `--color-border` for borders and muted text.

## Gotchas

- **Astro compiler bug:** if an element's text starts with `//` and the element is a direct child of a component (for example, an `<h2>` directly inside `<BaseLayout>`), the compiler silently drops the whole element. Write the text as an expression: `<h2>{"// ABOUT"}</h2>`. Elements nested inside a plain `<section>` or `<div>` are fine.
- **Images:** keep anything in `public/` web-sized. `avatar.jpg` is 600px and about 100 KB. The 6000px original is in git history (commit `8fa6588`, `originals/avatar.jpg`). The favicon is the avatar scaled down whole, not cropped.
- **Email:** the contact page shows `zachk (@ my school's email domain)` on purpose and has no `mailto:` link, so scrapers can't harvest the address. Keep it that way.
