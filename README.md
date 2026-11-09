# Lula Artisan Gelato - Modern Web Application

A pixel-conscious, high-performance, accessible React web application for **Lula Artisan Gelato**, built according to the design system in `design/` with Tailwind CSS, React 19, Vite, and json-server.

## 🍨 Design & Brand System
- **Colors**: Tactile-Playful Modern palette based on natural ingredients: Bronte Pistachio (`#41683b` / `#7fa976`), Wild Strawberry Cream (`#a13d3f` / `#fe8484`), Roasted Honey Waffle (`#855305`), and Cacao Ganache (`#2b160b`) over warm Clotted Cream (`#fff8f6`).
- **Typography**: Epilogue (Display & Headlines) & Plus Jakarta Sans (Body, Labels, Controls) with Material Symbols Outlined.
- **Elevation**: Multi-level pillowy ambient drop shadows tinted with warm organic cacao pigments.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Mock API Server (json-server)
```bash
npm run server
```
Runs `json-server --watch db.json --port 3001`. The frontend automatically connects to `http://localhost:3001` and falls back gracefully to local `db.json` data if the server is not active.

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Automated Tests
```bash
npm test
```
Executes the Vitest test suite covering CartContext, product cards, category filtering, and delivery zone calculations.

### 5. Production Build
```bash
npm run build
```
Creates an optimized, tree-shaken production bundle in `dist/`.

---

## 🛠️ Architecture & Features
- **Semantic Structure**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` with structured Schema.org (`IceCreamShop`) JSON-LD data.
- **Cart & Thermal Box System**:
  - Live slide-out drawer with backdrop blur.
  - Dynamic free delivery meter tracking remaining amount toward the 285 ₺ threshold.
  - Interactive stepper (+ / -), serving toggle (Çıtır Waffle Külah 🍦 vs Eko Bardak 🍨), and item deletion.
- **Product Catalog & Filters**:
  - Category filtering across all 12 artisanal gelatos and sorbets.
  - Serving option toggle on individual cards.
  - Quick-add from signature spotlight and weekend promotion banner.
- **Interactive Delivery Zone Checker**:
  - Select neighborhoods (Moda, Caferağa, Fenerbahçe, Caddebostan, Suadiye, Diğer Bölgeler).
  - Dynamic route status feedback and express courier dispatch verification.
- **Accessible & Tested**:
  - Full keyboard accessibility and visible focus states.
  - Automated tests via Vitest & React Testing Library.
  - Respects `prefers-reduced-motion`.
# Lula-ice-cream
