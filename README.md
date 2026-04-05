# Vite Vanilla SPA Boilerplate

A minimal, zero-framework single-page application (SPA) boilerplate built with [Vite](https://vitejs.dev/) and plain JavaScript.

## Stack

- **Vite** — lightning-fast dev server and build tool
- **Vanilla JavaScript** — no framework overhead
- **HTML5 + CSS3** — standard web platform

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Install dependencies

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output is placed in the `dist/` folder.

### Preview production build

```bash
npm run preview
```

## Project Structure

```
vite-vanilla-spa-boilerplate/
├── public/           # Static assets served as-is
├── src/              # Source files (add your own modules here)
├── index.html        # App entry point
├── main.js           # JavaScript entry point
├── style.css         # Global styles
├── vite.config.js    # Vite configuration (optional)
└── package.json
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

## License

MIT
