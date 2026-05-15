# 🎓 Farha Tarek — Graduation Website 2026

A cinematic, romantic, and deeply personal graduation experience built for **Farha Tarek**, Faculty of Mass Communication, Class of 2026.

> *"You didn't just graduate... you became a story worth telling."*

---

## ✨ What's Inside

| Feature | Details |
|---|---|
| 🎬 Cinematic loading screen | Animated year reveal with progress bar |
| 🖱️ Custom cursor | Soft glow dot + lagged ring, hover states |
| 📜 Scroll progress bar | Thin gradient line at the top |
| 🏠 Hero section | Word-by-word animated headline, floating particles, parallax |
| 🗓️ Journey timeline | Glassmorphism cards, tilt, scroll-triggered reveals |
| 💌 Romantic message | Live typewriter animation, line by line |
| 🖼️ Polaroid gallery | Film-grain aesthetic, hover depth, rotation |
| 🎓 Graduation moment | Deep coffee cinematic section, name reveal |
| 🎙️ Voice message | Modal with waveform animation, simulated player |
| 🌾 Grain texture | Fixed cinematic film grain overlay |
| 📱 Fully responsive | Mobile-first, fluid typography |

---

## 🚀 Quick Start

### Option A — Open instantly (no install needed)

Just open `preview.html` in any modern browser:

```bash
open preview.html
# or drag the file into Chrome/Firefox/Safari
```

This is the **fully working standalone version** — no dependencies, no build step.

---

### Option B — Next.js development server

#### 1. Install dependencies

```bash
cd farha-graduation
npm install
```

#### 2. Start the dev server

```bash
npm run dev
```

#### 3. Open in browser

```
http://localhost:3000
```

---

## 📁 Project Structure

```
farha-graduation/
├── preview.html                  ← Standalone HTML (open immediately!)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            ← Root layout, fonts, metadata
│   │   └── page.tsx              ← Main page, all sections composed
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx       ← Full-screen cinematic hero
│   │   ├── JourneySection.tsx    ← Animated vertical timeline
│   │   ├── MessageSection.tsx    ← Typewriter romantic message
│   │   ├── GallerySection.tsx    ← Polaroid film gallery
│   │   ├── GraduationMoment.tsx  ← Emotional climax section
│   │   └── VoiceSection.tsx      ← Voice note modal + waveform
│   │
│   ├── components/
│   │   ├── CustomCursor.tsx      ← Dot + ring cursor with lag
│   │   ├── LoadingScreen.tsx     ← Cinematic intro loader
│   │   └── ScrollProgress.tsx    ← Top progress bar
│   │
│   ├── hooks/
│   │   ├── useLenis.ts           ← Smooth inertia scrolling
│   │   └── useInView.ts          ← Intersection observer hook
│   │
│   └── styles/
│       └── globals.css           ← All base styles, cursor, grain, fonts
│
├── public/
│   ├── audio/
│   │   └── message.mp3           ← ⬅ Add your voice note here
│   └── images/                   ← ⬅ Add real photos here
│
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🎨 Customization Guide

### 1. Change the name

In `src/sections/GraduationMoment.tsx` and `src/components/LoadingScreen.tsx`:

```tsx
// Replace every instance of:
"Farha Tarek"
// With the graduate's name
```

Also update in `preview.html` — search for `Farha Tarek`.

---

### 2. Add the voice note

Place the MP3 file at:
```
public/audio/message.mp3
```

Then in `src/sections/VoiceSection.tsx`, replace the simulated player with:

```tsx
const audioRef = useRef<HTMLAudioElement>(null)

// In JSX:
<audio ref={audioRef} src="/audio/message.mp3" />

// In togglePlay():
if (isPlaying) {
  audioRef.current?.pause()
} else {
  audioRef.current?.play()
}
```

---

### 3. Add real photos

Replace the Unsplash URLs in `src/sections/GallerySection.tsx`:

```tsx
const galleryItems = [
  {
    src: '/images/photo1.jpg',   // ← your photo in /public/images/
    caption: 'the beginning',
    date: 'Sept 2022',
    // ...
  },
  // ...
]
```

---

### 4. Update the message text

Edit the `messageLines` array in `src/sections/MessageSection.tsx`:

```tsx
const messageLines = [
  { text: 'Your custom message here...', pause: 1000 },
  { text: 'Another line...', pause: 900 },
  // ...
]
```

---

### 5. Update timeline events

Edit `timelineItems` in `src/sections/JourneySection.tsx` to reflect real memories.

---

### 6. Change colors

All colors are defined as CSS variables in `src/styles/globals.css` and `tailwind.config.js`:

```css
:root {
  --coffee: #6F4E37;
  --coffee-light: #8B6347;
  --beige: #F5E6D3;
  --cream: #FFF8F0;
}
```

---

## 🌐 Deploy to Vercel (free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow the prompts — it auto-detects Next.js
```

Your site will be live at a `.vercel.app` URL in under 60 seconds.

---

## 📦 Tech Stack

| Package | Version | Purpose |
|---|---|---|
| Next.js | 14.2 | React framework |
| React | 18.3 | UI library |
| Framer Motion | 11.2 | Animations |
| Lenis | 1.0.45 | Smooth scrolling |
| Tailwind CSS | 3.4 | Styling |
| TypeScript | 5.4 | Type safety |

---

## 🎭 Design Philosophy

This site is intentionally **not** a graduation template.

It was designed to feel like:
- A **romantic short film** — cinematic pacing, emotional arc
- A **luxury digital letter** — intimate, personal, warm
- An **editorial magazine** — clean layout, premium typography

**Avoided on purpose:**
- ❌ Confetti / balloons
- ❌ Neon colors
- ❌ Generic graduation clip art
- ❌ Corporate layout
- ❌ Flash or jarring transitions

---

## 💛 Made with love

*For every late night, every scrapped draft, every quiet breakdown — and the beautiful person who made it through all of them.*

**Class of 2026 · Mass Communication · ✦**
