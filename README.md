# Md. Mehedi Hasan — Portfolio Website

A 6-page personal site: **Home, Publications, Projects, Achievements, Blog, Contact** — with a light/dark theme switcher, rich hover/scroll interactions, and image placeholders everywhere a photo should go.

## What's interactive
- **Custom cursor** — a small dot + trailing ring that follows the mouse and grows over clickable elements (desktop only; disabled automatically on touch devices and when the OS "reduce motion" setting is on).
- **Animated background glow** — soft drifting color blobs behind the homepage hero, with a subtle parallax shift as you move the mouse.
- **3D tilt cards** — every card (projects, publications, achievements, blog posts) tilts toward the cursor and shows a soft light sheen on hover.
- **Magnetic buttons** — primary call-to-action buttons pull gently toward the cursor when it's nearby.
- **Animated counters** — the stat numbers (CGPA, paper count, IELTS score, etc.) count up from 0 the first time they scroll into view.
- **Cycling role text** — the hero headline cycles through "Lecturer. / Researcher. / AI Engineer."
- **Filterable publications** — the "All papers / Q1 / Q2 / Preprint" pills on the Publications page instantly filter the list.
- **Scroll progress bar** — a thin amber line at the very top of the page fills as you scroll.
- **Page transition wipe** — a quick color flash when moving between pages.

All of this gracefully turns off for visitors using touch devices or who have "reduce motion" enabled in their OS — nothing breaks, it just becomes a calmer static site for them.

## File structure
```
portfolio/
├── index.html          Home
├── publications.html   Journal papers, conference papers, under review, ongoing
├── projects.html       Work + independent projects, skills
├── achievements.html   Stats, education timeline, work timeline, co-curricular, references
├── blog.html           Blog listing (placeholder posts)
├── contact.html        Contact details + message form
├── css/style.css       All styling + the two themes
└── js/main.js          Theme switcher, mobile nav, scroll animations
```

## Assets folder layout
All images and documents live under `assets/`, split into two folders:

```
assets/
  images/   → photos & thumbnails (jpg / png / webp), e.g. assets/images/profile.jpg
  static/   → documents you link to (pdf), e.g. assets/static/Md_Mehedi_Hasan_CV.pdf
```

The shared placeholder is `assets/images/placeholder.png`.

## How to add your photos
Images are set in `js/data.js` (not in the HTML). Every empty `image: ""` field
falls back to the shared placeholder.

1. Drop your image into `assets/images/` (e.g. `profile.jpg`).
2. In `js/data.js`, set the matching path, e.g. `photo: "assets/images/profile.jpg"`
   or `image: "assets/images/iv-trip.png"`.

Placeholders you'll want to fill first:
- **Home** — profile photo (circle, top right of hero)
- **Projects** — 5 screenshots (IV Trip, IV Avatar, Hotel System, Employee System, Brain Stroke)
- **Achievements** — 3 reference headshots
- **Blog** — cover image per post
- **Certifications** — certificate thumbnails

## How to swap the CV download
The **Download CV** button links to `assets/static/Md_Mehedi_Hasan_CV.pdf`. Export
your CV as a PDF and save it at that path (create the `assets/static` folder if needed).

## Theme switcher
Two themes are built in:
- **Console** (dark navy + amber) — default
- **Paper** (warm cream + amber) — toggle with the ○ button in the nav

The visitor's choice is remembered (saved in their browser) between visits. To change the colors, edit the CSS variables at the top of `css/style.css` under `:root` (console) and `html[data-theme="paper"]` (paper).

## Adding a real blog post
Duplicate one of the post cards in `blog.html`, swap the title/tag/excerpt, and link `href="#"` to a new file (e.g. `blog-post-1.html`) once you've written one — the nav/footer/theme code at the top and bottom of any page can be copy-pasted into a new post page to keep it consistent.

## Contact form
The form on `contact.html` is front-end only — it doesn't send email yet. To make it work, connect it to a form backend such as Formspree, Getform, or your own server endpoint, and point the `<form>` tag's submit handler (in the `<script>` at the bottom of `contact.html`) at that service.

## Tweaking the interactive effects
All of it lives in `css/style.css` (look for the "INTERACTIVE LAYER" section) and `js/main.js`:
- **Tilt strength** — in `main.js`, `initTiltCards()`, change the `-8`/`8` degree values to tilt more or less.
- **Cursor size** — in `style.css`, `.cursor-dot` and `.cursor-ring` width/height.
- **Add more publication filters** — give a `.spine-item` a `data-tags="q1"` (or `q2`, `preprint`, or a new tag of your choice), then add a matching `<button class="filter-pill" data-filter="...">` to the `.filter-bar`.
- **Turn an effect off everywhere** — remove the class from the HTML (e.g. delete `tilt` from a `class="card tilt"` to stop that one card from tilting) rather than editing the CSS, so other cards keep working.

## Deploying
This is a static site — no build step needed. You can host it for free on:
- **GitHub Pages** — push this folder to a repo and enable Pages in repo settings
- **Netlify** or **Vercel** — drag-and-drop the folder onto their dashboard
- Any standard web host — just upload the files via FTP

## Browser support
Built with plain HTML/CSS/JS — works in all modern browsers, no build tools or frameworks required.
