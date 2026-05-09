# DX-Ball (offline-playable mirror)

A self-contained, offline mirror of [dx-ball.ru](https://dx-ball.ru/) — BorodinART's 2012 JavaScript port of Michael P. Welch's 1996 arcade classic *DX-Ball*. Trackers stripped, leaderboard XHR neutered, frame-rate-independent physics fixed, plus keyboard controls and a difficulty ramp on top.

**Play here:** <https://jeyantx.github.io/dx-ball/>

## Run locally

It's a folder of static files — no build step, no dependencies.

```sh
git clone https://github.com/jeyantx/dx-ball.git
cd dx-ball
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Controls

| Input | Action |
|---|---|
| Mouse | Move paddle |
| Left / Right arrow, A / D | Move paddle (keyboard) |
| Click, Space | Launch ball / advance menus |
| F or top-right button | Toggle fullscreen |
| Esc | Exit fullscreen / return from high-score |
| P | Pause |
| S | Toggle sound |

## Changes from the upstream BorodinART build

- **Removed third-party scripts** — VK widgets, Yandex Metrika, Facebook SDK, Twitter share, Google +1. Page loads with zero failed network requests offline.
- **Neutralized the leaderboard XHR** to `dx-ball.ru/record.php`. The high-score screen still works, just shows "NO RECORDS - OFFLINE BUILD" instead of the global table.
- **Page chrome stripped down to just the canvas**, scaled to fill the viewport while preserving the original 4:3 aspect ratio (`aspect-ratio: 4/3`, `image-rendering: pixelated`).
- **Frame-rate-independent physics.** The original sampled the refresh rate over ~4 seconds with `setTimeout`s, during which the ball ran at 2× speed on 120 Hz displays. Now `delta` is computed per-frame from the rAF timestamp, correct from frame 2.
- **Same fix applied to the intro/menu animations** — credits scroller, M-BALL letters, rotating sphere — which were also running at 2× on high-refresh-rate displays.
- **Mouse listener bound to `document`** so the paddle keeps tracking when the cursor leaves the canvas.
- **Keyboard paddle control** with smooth keyboard/mouse hand-off (release key → mouse takes over without snap-back).
- **Pause-on-blur display** now draws the paddle and balls (the original showed only "PAUSED" + bricks, leaving the paddle invisible until you clicked).
- **Slow/fast-ball power-ups persist across paddle bounces.** Originally the paddle bounce reset `xSpeed` ignoring any prior multiplier, so slow-ball wore off in one round-trip. Now tracked via a per-ball `speedMul`.
- **Difficulty ramp on ball speed by elapsed game time:** 0.7× for 0–20 s, 1.0× for 20–40 s, 1.3× for 40–60 s, 1.5× for 60–90 s, 1.7× past 90 s. Stacks with `speedMul`, so power-ups still apply on top.
- **Fullscreen toggle** via F key or a small top-right corner button — fixes the "cursor leaves the browser window and paddle freezes" case.
- **High-score offline placeholder** so the screen doesn't crash on `records[]` being empty after game over.

All changes are surgical edits to the original `game/game_src.js` and `index.html`. No build step, no dependencies, no framework — same as it shipped in 2012.

## File layout

```
.
├── index.html              # Stripped-down host page (canvas + fullscreen button)
├── main.js                 # Original window.onload bootstrap
├── game/
│   ├── game_src.js         # Engine (~1100 lines, monolithic)
│   ├── default.bds         # All 50 levels, packed (50 × 400 bytes)
│   ├── *.sbk               # Bitmap fonts / sprite atlases
│   ├── audio/sound/*.mp3   # 6 background music tracks
│   ├── audio/sfx/{wav,mp3,aac}/*  # 26 sound effects × 3 formats
│   └── images/*.png        # Backgrounds and intro/menu sprites
├── css/                    # (unused after the index.html rewrite, kept for completeness)
├── img/                    # Original page chrome (logo, shadow), unused
└── icon.png, favicon.ico, manifest.json
```

## Credits

- **Original game (1996):** Michael P. Welch
- **3D GFX (1996):** Seumas McNally
- **JS port (2012):** [BorodinART](https://borodinart.ru/) / Максим Бородин

This mirror is for personal offline play. The original *DX-Ball* is Mike Welch's IP; the JavaScript port is BorodinART's. Don't redistribute or rehost commercially.
