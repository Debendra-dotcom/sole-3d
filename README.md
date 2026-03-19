# THE SHOE COMPANY — Premium 3D Website

A scroll-driven 3D product website built with React + Three.js. The white leather sneaker rotates 360°, shifts position, and scales as the user scrolls — creating an Apple/Nike-style cinematic storytelling experience.

---

## 🗂 Project Structure

```
the-shoe-company/
├── index.html                  ← Vite HTML entry (React app)
├── standalone.html             ← Zero-dependency version (CDN only, open directly)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── favicon.svg
│   └── models/
│       └── shoe.glb            ← Your 3D model
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Scene3D.jsx         ← Three.js canvas + ScrollControls
        ├── ShoeModel.jsx       ← GLB loader + scroll animation logic
        ├── Nav.jsx
        ├── Hero.jsx
        ├── StorySection.jsx
        ├── Features.jsx
        ├── Testimonials.jsx
        ├── Contact.jsx
        └── Annotations.jsx
```

---

## ⚡ Quick Start — Standalone (No Install)

The fastest way to preview with your actual 3D model:

```bash
# 1. Serve with Python (built-in)
cd the-shoe-company
python3 -m http.server 8080

# 2. Open in browser
open http://localhost:8080/standalone.html
```

> `standalone.html` loads Three.js from CDN and fetches `/public/models/shoe.glb` — no build step needed.

---

## ⚛️ React + Vite Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run dev server

```bash
npm run dev
```

Opens at `http://localhost:3000`

### 3. Build for production

```bash
npm run build
```

Output goes to `dist/`

---

## 🎬 Scroll Animation

The shoe animation is driven by keyframes in `src/components/ShoeModel.jsx`:

```js
// [scrollOffset 0→1, rotX, rotY, rotZ, posX, posY, scale]
const KEYFRAMES = [
  [0.00,  0.00,  0.10,  0.00,  0.35, -0.05, 1.00],  // Hero
  [0.18,  0.08,  1.30,  0.04, -0.30,  0.00, 1.10],  // Heel
  [0.35, -0.05,  2.80, -0.03,  0.35,  0.05, 1.05],  // Front
  [0.50,  0.08,  4.50,  0.03, -0.20,  0.00, 1.15],  // Traction
  [0.62,  0.00,  6.28,  0.00,  0.00,  0.00, 1.00],  // Features (360°)
  [0.78,  0.12,  7.40,  0.04,  0.10,  0.08, 0.95],  // Reviews
  [1.00,  0.00,  8.70,  0.00,  0.00, -0.05, 1.00],  // Contact
]
```

Tweak these values to change how the shoe moves at each scroll point.

**Interpolation** uses frame-rate-independent cinematic lerp:
```js
const lf = 1 - Math.pow(0.035, delta)
value = lerp(current, target, lf)
```

---

## 🔧 GLB Loader Notes

`standalone.html` contains a hand-written GLB parser tuned to this specific model:

- **319,800 vertices** with positions, normals, and UVs
- **1,699,038 indices** as `Uint32Array`
- **1 embedded JPEG texture** (~1.7 MB)
- Byte offsets verified from actual binary analysis

The React version uses `@react-three/drei`'s `useGLTF` which handles all of this automatically.

---

## 🎨 Customise

**Colours** — edit `src/index.css` `:root` variables:
```css
--accent: #c8a96e;   /* gold */
--white:  #f5f3ee;   /* off-white */
--black:  #0a0a0a;   /* deep black */
```

**Scroll pages** — in `src/App.jsx`, change `<Scene3D pages={6} />` to control total scroll height.

**Lighting** — edit the `<Lights />` component inside `src/components/Scene3D.jsx`.

---

## 📦 Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 + Vite |
| 3D Engine | Three.js r160 |
| React 3D | @react-three/fiber + @react-three/drei |
| Animation | Framer Motion (UI) + custom lerp (3D) |
| Styling | Tailwind CSS + CSS custom properties |
| Fonts | Bebas Neue (display) + DM Sans (body) |
