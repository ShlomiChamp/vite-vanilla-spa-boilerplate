# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `vite-vanilla-spa-boilerplate/`:

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Build for production → dist/
npm run preview  # Preview production build locally
```

## Architecture

This is a **vanilla JS SPA** with no framework. The entire app is rendered by a single JS file — there is no HTML template file for page content.

**`src/main.js`** is the sole entry point and does everything:
- Generates SVG EEG waveforms procedurally (`eegPath`, `heroWaveSVG`, `spotlightEEG`)
- Builds the full page HTML as a template literal string (`template()`) and injects it into `#app`
- Initializes behaviors after render (`initNav`, `initReveal`)

**Pattern:** Add new sections by extending the `template()` string, add new behaviors as `init*` functions called at the bottom of the file.

**Scroll reveal:** Elements with class `reveal` animate in via `IntersectionObserver` in `initReveal()`. Add `reveal` to any element that should fade in on scroll.

**Nav dark mode:** The `#nav` element gains class `dark` once the `.hero` section scrolls out of view (via `IntersectionObserver` in `initNav()`).

**`src/counter.js`** is boilerplate leftover from the Vite scaffold — it is not used by the current app.

## Git Workflow

After completing a full task, propose a commit and push — ask for confirmation before doing so. Do not commit after every individual code change; wait until the entire task is done.
