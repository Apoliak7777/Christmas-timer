<div align="center">

[![Slovencina](https://img.shields.io/badge/SK-Sloven%C4%8Dina-30363d?style=for-the-badge)](README.md) [![English](https://img.shields.io/badge/EN-English-2ea043?style=for-the-badge)](README.en.md)

</div>

<div align="center">

# 🎄 Christmas Timer

**A live Christmas countdown to December 25 - a single static page with snow, confetti and a progress bar.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Canvas](https://img.shields.io/badge/Canvas_2D-FF6B6B?style=flat-square)
![No dependencies](https://img.shields.io/badge/dependencies-none-2ecc71?style=flat-square)
![License](https://img.shields.io/badge/license-GPL--3.0-blue?style=flat-square)

</div>

---

## 📋 Contents

- [🔍 Overview](#-overview)
- [✨ Features](#-features)
- [🚀 Quick start](#-quick-start)
- [📁 Project structure](#-project-structure)
- [🛠️ Tech stack](#️-tech-stack)
- [⚙️ Configuration](#️-configuration)
- [⚠️ Known limitations](#️-known-limitations)
- [📄 License](#-license)

---

## 🔍 Overview

Christmas Timer is a single-page, purely client-side web app in Slovak that counts down the days, hours, minutes and seconds until **December 25, 00:00** in the visitor's local time zone. The countdown is recalculated every second and is accompanied by a progress bar showing how much of the year has already passed.

The visuals consist of animated snowfall on a `<canvas>`, blinking Christmas lights, an aurora background and floating emoji decorations. Once the countdown reaches zero, it is replaced by the message **"Veselé Vianoce!"** (Merry Christmas!) and a confetti animation kicks in.

The whole project is built on plain HTML, CSS and vanilla JavaScript - **no framework, no build step and no installable dependency of any kind**.

> [!NOTE]
> A previous version of this README claimed the project was "Made in php". That is not true - the repository does not contain a single `.php` file nor any server-side code. This is a 100% static frontend.

---

## ✨ Features

- ⏱️ **Live countdown** - days, hours, minutes and seconds until December 25, refreshed every second via `setInterval`, zero-padded to two digits.
- 🔄 **Automatic roll-over to the next year** - if the current time is already past December 25, 00:00:00, the `getNextChristmas()` function sets the target to December 25 of the following year.
- 🃏 **Digit flip animation** - a CSS 3D flip (`@keyframes flipDigit`) fires only when the value of that particular unit actually changes.
- 📊 **Year progress bar** - progress from January 1 to December 25 of the target year, with a percentage to one decimal place.
- 🎉 **Christmas mode** - when `diff` drops to zero, the card gets the `.christmas-active` class, the countdown is hidden, the greeting appears and three confetti bursts fire (200, 100 and 80 pieces at 0 s, 2 s and 4.5 s).
- ❄️ **Canvas snowfall** - the flake density scales with the viewport area (max. 300), with parallax layers, sinusoidal drift, respect for `devicePixelRatio` and wrapping around the edges.
- 🎛️ **Snow toggle** - the button stops or restarts the `requestAnimationFrame` loop and switches the label between "Vypnúť sneh" (Turn snow off) and "Zapnúť sneh" (Turn snow on).
- 🔗 **Copy link** - the button copies `location.href` via the Clipboard API and shows the state "Skopírované ✓" (Copied) or "Chyba" (Error) for 2.5 s.
- ♿ **`prefers-reduced-motion` support** - CSS disables all animations and transitions, and JavaScript additionally stops the snowfall on load.
- 📱 **Responsive layout** - breakpoints at 768 px and 400 px; below 400 px the buttons stretch to full width and stack vertically.
- 🖼️ **SEO and Open Graph metadata** - Slovak title and description, OG tags, `theme-color` and an inline SVG data-URI favicon 🎄 (no image files).

---

## 🚀 Quick start

The project has no build step, no package manager and no server-side runtime. There is nothing to install.

### Option 1 - open the file directly

```powershell
start files\index.html
```

The page renders completely, because both `styles.css` and `script.js` are linked with a relative path within the same folder.

### Option 2 - local HTTP server (recommended)

The Clipboard API requires a secure context, so the "Kopírovať odkaz" (Copy link) button only works reliably over `https://` or `localhost`.

```bash
# from the repository root
python -m http.server 8000
# then open http://localhost:8000/files/
```

```bash
# alternative via Node.js
npx serve files
```

> [!IMPORTANT]
> The entry point is `files/index.html`, **not** the repository root - there is no root `index.html`. When deployed to GitHub Pages from the root, the page will be available at `<site>/files/`, not at `/`.

---

## 📁 Project structure

```text
Christmas-timer/
├── files/
│   ├── index.html    # the single entry point: canvases, decorations, countdown card, controls
│   ├── script.js     # ~330 lines, all logic in a strict-mode IIFE with no globals
│   └── styles.css    # ~785 lines, design tokens in :root + all animations
├── LICENSE           # full text of the GNU GPL v3
├── README.en.md      # this file
└── README.md         # the Slovak version
```

### Breakdown of `files/script.js`

| Section                | Key functions                                                           | What it does                                                   |
| ---------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| Countdown and progress | `getNextChristmas`, `getYearStart`, `updateCountdown`, `triggerFlip`    | target calculation, recalculation every second, flip animation |
| Copy link              | listener on `#copy-link`                                                | `navigator.clipboard.writeText(location.href)`                 |
| Snow                   | `resizeCanvas`, `createSnowflakes`, `drawSnow`, `startSnow`, `stopSnow` | generating and animating flakes on `#snow-canvas`              |
| Confetti               | `resizeConfetti`, `createConfetti`, `drawConfetti`, `startConfetti`     | the Christmas celebration on `#confetti-canvas`                |
| Reduced motion         | `window.matchMedia` check                                               | stops the snow on load                                         |

---

## 🛠️ Tech stack

| Layer              | Used                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Markup             | HTML5, `lang="sk"`, Open Graph metadata                                                                                                    |
| Styles             | CSS3 - custom properties, `backdrop-filter` glassmorphism, keyframe animations, media queries                                              |
| Logic              | Vanilla JavaScript (ES2019 - optional catch binding is the newest feature used), IIFE, no framework                                        |
| Graphics           | Canvas 2D API for both snow and confetti, `requestAnimationFrame`                                                                          |
| Browser APIs       | Clipboard API, `matchMedia`, `devicePixelRatio`                                                                                            |
| External resources | Google Fonts (Inter, Outfit) - the only external dependency; loads CSS from `fonts.googleapis.com` and font files from `fonts.gstatic.com` |

Both the confetti and the snow animation are hand-written, not taken from a library. The repository contains no `package.json`, no lockfile and no vendored code.

---

## ⚙️ Configuration

The project has no config file, no `.env` and no CLI flags. Everything is written directly in the source:

| What you want to change | Where                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| Target date             | `new Date(year, 11, 25, 0, 0, 0)` in the `getNextChristmas()` function in `files/script.js` |
| Colors, radii, easing   | the `:root` block in `files/styles.css`                                                     |
| Confetti palette        | the `CONFETTI_COLORS` array in `files/script.js`                                            |
| Snow density            | `Math.min(Math.round((W * H) / 12000), 300)` in the `createSnowflakes()` function           |
| Interface texts         | directly in `files/index.html` and in the strings in `files/script.js`                      |

---

## ⚠️ Known limitations

- 🏷️ **Metadata mismatch** - both `<title>` and `og:description` talk about "Štedrý deň" (Christmas Eve, December 24), yet `getNextChristmas()` targets December 25. The visible subtitle, `meta name="description"` and the footer all state December 25 correctly; the inconsistent ones are `<title>` and `og:description`.
- 🔁 **The celebration mode is nearly unreachable** - `getNextChristmas()` does `return now > xmas ? new Date(year + 1, 11, 25, ...) : xmas;`, so a page loaded on December 25 at any point after 00:00:00 already targets next year. Instead of the "Veselé Vianoce!" greeting and confetti, the visitor then sees a normal countdown of ~364 days. Only a card that was already open at the very moment of the midnight transition into December 25 will show the celebration mode.
- 📉 **Progress bar between December 25 and 31** - once the target rolls over to the next year, `yearStart` shifts to the following January 1, `elapsed` becomes negative and the bar shows 0.0%, even though several days have in fact already passed toward the new target (December 25 of the following year).
- 🌍 **Local time zone** - the countdown targets 00:00 in the visitor's zone, not a fixed zone; different users therefore legitimately see different remaining times.
- 📋 **Clipboard requires a secure context** - over plain `http://` on a host other than `localhost` the button fails and shows "Chyba" (Error).
- 🌐 **Fonts from the internet** - without a connection the page still works, but falls back to system fonts instead of Inter/Outfit.
- 🔋 **Demanding effects** - `backdrop-filter`, the 80px blur aurora and up to 300 animated particles can strain weaker devices and battery life. The only defenses are the snow toggle and `prefers-reduced-motion` support.
- 📜 **The page does not scroll** - `body { overflow: hidden }` means that on very short viewports the card can be cut off with no way to reach the rest of the content.
- 🧹 **Dead CSS** - the `.lights-wire` rules and its `svg`/`path` have no corresponding markup in `index.html`.
- ♻️ **Duplicate animation loops** - `startConfetti()` schedules two further bursts that call `drawConfetti()` without checking the running `confettiRAF`, so up to three loops can run over the same canvas at once. This is visually noticeable - the particles move, rotate and lose opacity up to three times as fast, since all the loops mutate the same `confettiPieces` array.
- 🗣️ **Slovak only** - `lang="sk"`, no i18n and no language switcher.
- 🧪 **No tests** - the repository contains no tests, no linter, no CI and no build tooling.

---

## 📄 License

The repository contains a `LICENSE` file with the full, unmodified text of the **GNU General Public License version 3** (June 29, 2007).

The template placeholders at the end of the license (`<year>`, `<name of author>`) have not been filled in, and there are no GPL headers or copyright notice in `index.html`, `script.js` or `styles.css`. Under GPLv3, any redistributed derivative work must remain under GPLv3 and ship the source code as well.

---

<div align="center">

Built by **Alex Poliak** - [GitHub](https://github.com/Apoliak7777) - [alexpoliak21@gmail.com](mailto:alexpoliak21@gmail.com)

</div>
