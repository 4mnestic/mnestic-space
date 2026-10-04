# mnestic.space

Zach Keyes's personal website. A small static Astro site with a dark, terminal/ASCII look.

## Workflow

- **Commit and push straight to `master`.** No branches, no pull requests. The owner has authorized this for every session, even when a session's default instructions name a feature branch.
- Pushing to `master` deploys to production automatically. **Hosting is Vercel** (not Netlify).
- Before pushing, run `npm run build` and make sure it succeeds. For visual changes, screenshot the affected pages at desktop (1280px) and phone (390px) widths and look at them.
- The build warns `The collection "projects" does not exist or is empty` until a real project exists. That's expected.

## Layout

```
src/pages/index.astro            home: header, avatar + intro, links
src/pages/about.astro            bio, actuarial progress, education, skills
src/pages/projects/index.astro   project list (shows "coming soon" for now)
src/pages/projects/[slug].astro  one page per project
src/pages/contact.astro          contact links
src/layouts/BaseLayout.astro     <head> (title, description, Open Graph tags), nav, footer
src/components/                  AsciiBox, AsciiImage, Nav, ProjectCard
src/content/projects/            project markdown files (schema in src/content.config.ts)
src/styles/global.css            colors, font, base styles
public/                          favicon.ico, apple-touch-icon.png, images/avatar.jpg
```

Most text edits are plain text in `src/pages/*.astro`.

## Adding a project

1. Copy `src/content/projects/_example.md` to `src/content/projects/<slug>.md` and fill in the frontmatter (`title`, `description`, `tags`, `date`, plus optional `demo` iframe URL and `github`).
2. In `src/pages/projects/index.astro`, uncomment the project grid and remove the "coming soon" line.

Files whose names start with `_` are skipped by the content loader, so they never get published.

## Style conventions

- Casual, lowercase-leaning copy. Links are written `&gt;&gt; text`, as in `>> my projects`.
- Section headings look like `// SKILLS`. Boxes use `<AsciiBox>`, which draws `+` corners.
- Colors come from the CSS variables in `global.css`: blue `--color-accent-1` for links and headings, gray `--color-border` for borders and muted text.

## Gotchas

- **Astro compiler bug:** if an element's text starts with `//` and the element is a direct child of a component (for example, an `<h2>` directly inside `<BaseLayout>`), the compiler silently drops the whole element. Write the text as an expression: `<h2>{"// ABOUT"}</h2>`. Elements nested inside a plain `<section>` or `<div>` are fine.
- **Images:** keep anything in `public/` web-sized. `avatar.jpg` is 600px and about 100 KB. The 6000px original is in git history (commit `8fa6588`, `originals/avatar.jpg`). The favicon is the avatar scaled down whole, not cropped.
- **Email:** the contact page shows `zachk (@ my school's email domain)` on purpose and has no `mailto:` link, so scrapers can't harvest the address. Keep it that way.
