# 💕 Birthday Website — Deployment Guide

A beautiful, romantic, cinematic birthday website built with React + Vite + Tailwind + Framer Motion.

---

## 🚀 Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

---

## 🌐 Deploy to Netlify

### Option A: Drag & Drop (Fastest — 2 minutes)

1. Run `npm run build` locally
2. Go to [netlify.com](https://netlify.com) → Log in
3. Click **"Add new site"** → **"Deploy manually"**
4. Drag the `dist/` folder into the browser
5. ✅ Done! Your site is live.

### Option B: GitHub + Netlify (Auto-deploy)

1. Push this project to a GitHub repo
2. Go to [netlify.com](https://netlify.com) → **"Add new site"** → **"Import from Git"**
3. Connect your GitHub account
4. Select your repo
5. Build settings (auto-detected from `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18
6. Click **"Deploy site"**
7. ✅ Every push to `main` auto-deploys!

---

## 🎨 Personalization Guide

### ✏️ Change the Text

Edit these files to personalize the content:

| File | What to Edit |
|------|-------------|
| `src/components/HeroSection.jsx` | Name, date, headline |
| `src/components/LoveLetter.jsx` | The letter paragraphs |
| `src/components/Timeline.jsx` | Your milestones |
| `src/components/FlipCards.jsx` | Reasons you love her |
| `src/components/Playlist.jsx` | Song names & artists |
| `src/components/EasterEgg.jsx` | Secret message |

### 📸 Add Real Photos

1. Add your photos to `/public/images/` (e.g., `photo1.jpg`, `photo2.jpg`)
2. In `src/components/PhotoGallery.jsx`, update each photo object:
```js
// Before (placeholder):
{ id: 1, emoji: '🌅', label: 'Golden Hour', ... }

// After (real photo):
{ id: 1, src: 'photo1.jpg', label: 'Our First Date', ... }
```
3. Uncomment the `<img>` tag inside `PhotoCard` and remove the emoji div

### 🎵 Add Background Music

1. Download a royalty-free romantic instrumental from:
   - [pixabay.com/music](https://pixabay.com/music/search/romantic/)
   - [freemusicarchive.org](https://freemusicarchive.org)
   - [bensound.com](https://www.bensound.com/royalty-free-music)
2. Save as `/public/audio/romantic.mp3`
3. The music player will automatically work!

### 📅 Change the Birthday Date

In `src/components/Countdown.jsx`, find:
```js
let target = new Date(currentYear, 4, 11, 0, 0, 0) // May = month 4 (0-indexed)
```
Change to your date. Month is 0-indexed (January = 0, May = 4, December = 11).

---

## 📁 Project Structure

```
birthday-site/
├── public/
│   ├── audio/
│   │   └── romantic.mp3       ← Add your music here
│   ├── images/                ← Add your photos here
│   │   └── .gitkeep
│   └── heart.svg              ← Favicon
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx   ← Intro animation
│   │   ├── StarBackground.jsx  ← Animated night sky
│   │   ├── HeroSection.jsx     ← Fullscreen hero
│   │   ├── MusicPlayer.jsx     ← Floating music toggle
│   │   ├── FloatingHearts.jsx  ← Ambient floating hearts
│   │   ├── FloatingMessages.jsx← Romantic pop messages
│   │   ├── EasterEgg.jsx       ← Hidden secret heart
│   │   ├── LoveLetter.jsx      ← Letter section
│   │   ├── Timeline.jsx        ← Relationship timeline
│   │   ├── FlipCards.jsx       ← Reasons I love you
│   │   ├── Countdown.jsx       ← Birthday countdown
│   │   ├── PhotoGallery.jsx    ← Photo gallery
│   │   ├── Playlist.jsx        ← Music playlist UI
│   │   └── FinalSurprise.jsx   ← Cinematic finale
│   ├── App.jsx                 ← Main app
│   ├── main.jsx                ← Entry point
│   └── index.css               ← Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml                ← Netlify config
└── .gitignore
```

---

## 🐞 Troubleshooting

**`npm install` fails:** Make sure you're using Node.js 18+. Check with `node -v`.

**Music doesn't play:** Browsers block autoplay. The user must interact first (click the music button). Also ensure the file is at `/public/audio/romantic.mp3`.

**Photos not showing:** Ensure images are in `/public/images/` and the filenames match exactly.

**Build fails:** Delete `node_modules` and `dist`, then run `npm install && npm run build` again.

---

## 💝 Made with Love

Built with React, Vite, Tailwind CSS, and Framer Motion.
Every animation, every word, every pixel — crafted for someone special. 🌸
