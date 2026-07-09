// ============================================================
//  RENDER — builds every page from SITE_DATA (js/data.js)
// ============================================================
//  You should not need to edit this file. To change the site,
//  edit js/data.js instead.
//
//  How it works: each page has a <body data-page="..."> and a
//  few mount points (e.g. <div data-mount="hero">). This script
//  fills the shared header/footer on every page, then fills the
//  page-specific mounts.
// ============================================================

(function () {
  const D = window.SITE_DATA;
  if (!D) {
    console.error('[portfolio] SITE_DATA not found — did js/data.js load first?');
    return;
  }

  const PLACEHOLDER = 'assets/images/placeholder.png';

  // ---------- tiny helpers ----------
  const esc = (s) =>
    String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  // Set innerHTML of a mount point by name.
  function mount(name, html) {
    const el = document.querySelector(`[data-mount="${name}"]`);
    if (el) el.innerHTML = html;
  }

  // An <img> that fills a .ph frame. Falls back to the shared
  // placeholder when `src` is empty. `alt` is escaped.
  function phImage(src, alt, extraClass) {
    const url = src && src.trim() ? src : PLACEHOLDER;
    return `<img class="ph-img${extraClass ? ' ' + extraClass : ''}" src="${esc(url)}" alt="${esc(alt || '')}" loading="lazy">`;
  }

  const extAttr = (external) =>
    external ? ' target="_blank" rel="noopener"' : '';

  // ============================================================
  //  SHARED: HEADER
  // ============================================================
  function renderHeader() {
    const p = D.profile;
    const links = D.nav
      .map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`)
      .join('');

    return `
<header class="site-header">
  <nav class="nav">
    <a href="index.html" class="brand">
      <span class="dot"></span>
      <span>${esc(p.shortName)}<small>${esc(p.tagline)}</small></span>
    </a>
    <ul class="nav-links">${links}</ul>
    <div class="nav-right">
      <div class="theme-toggle" aria-label="Theme switch">
        <span class="slider" aria-hidden="true"></span>
        <button data-theme="console" title="Console (dark) theme" aria-label="Dark theme">●</button>
        <button data-theme="paper" title="Paper (light) theme" aria-label="Light theme">○</button>
      </div>
      <button class="nav-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
    </div>
  </nav>
</header>`;
  }

  // ============================================================
  //  SHARED: FOOTER
  // ============================================================
  function renderFooter() {
    const p = D.profile;
    // Navigate column: every nav link except the current-ish Contact/Home mix,
    // we simply show the nav minus Home moved to the end to match original feel.
    const navLinks = D.nav
      .filter((n) => n.href !== 'contact.html')
      .map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`)
      .join('');

    const social = D.socials
      .map(
        (s) =>
          `<li><a href="${esc(s.href)}"${extAttr(s.external)}>${esc(s.label)}</a></li>`
      )
      .join('');

    return `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <h4>${esc(p.fullName)}</h4>
        <p>${esc(p.footerBlurb)}</p>
      </div>
      <div>
        <h4>Navigate</h4>
        <ul class="footer-links">${navLinks}</ul>
      </div>
      <div>
        <h4>Elsewhere</h4>
        <ul class="footer-links">
          <li><a href="mailto:${esc(p.email)}">Email</a></li>
          ${social}
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>${esc(p.copyright)}</span>
      <span>Built with care · edit js/data.js to update</span>
    </div>
  </div>
</footer>`;
  }

  // ------------------------------------------------------------
  //  HERO GRAPHICS — floating line-art that matches each page.
  //  Every icon keeps the shared `.float-shape sN [alt]` classes so
  //  the existing positioning + float animations (in css/style.css)
  //  apply unchanged; only the drawing inside changes per page.
  // ------------------------------------------------------------
  // Wrap one shape's inner SVG in a positioned <svg>.
  const fs = (cls, inner) =>
    `<svg class="float-shape ${cls}" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

  // Six themed icons per page, in slot order s1..s6 (s2/s4/s5 use the
  // teal `alt` colour to match the original balance).
  const HERO_SHAPE_SETS = {
    // Generic geometric mix — the engineer/researcher identity.
    home: [
      fs('s1', '<path d="M32 4 L56 18 V46 L32 60 L8 46 V18 Z"/><circle cx="32" cy="32" r="4" fill="currentColor" stroke="none"/>'),
      fs('s2 alt', '<circle cx="12" cy="16" r="3.5"/><circle cx="12" cy="34" r="3.5"/><circle cx="12" cy="50" r="3.5"/><circle cx="34" cy="24" r="3.5"/><circle cx="34" cy="44" r="3.5"/><circle cx="54" cy="34" r="3.5"/><path d="M15 16 L31 24 M15 34 L31 24 M15 34 L31 44 M15 50 L31 44 M37 24 L51 34 M37 44 L51 34"/>'),
      fs('s3', '<circle cx="32" cy="32" r="3.5" fill="currentColor" stroke="none"/><ellipse cx="32" cy="32" rx="28" ry="11"/><ellipse cx="32" cy="32" rx="28" ry="11" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="28" ry="11" transform="rotate(120 32 32)"/>'),
      fs('s4 alt', '<path d="M24 12 L8 32 L24 52"/><path d="M40 12 L56 32 L40 52"/>'),
      fs('s5 alt', '<path d="M24 6 H40 V22 L52 48 C54 52 51 56 46 56 H18 C13 56 10 52 12 48 L24 22 Z"/><path d="M18 40 H46"/>'),
      fs('s6', '<path d="M6 46 L24 28 L36 34 L58 10"/><circle cx="24" cy="28" r="2.5" fill="currentColor" stroke="none"/><circle cx="36" cy="34" r="2.5" fill="currentColor" stroke="none"/><circle cx="58" cy="10" r="2.5" fill="currentColor" stroke="none"/><path d="M6 52 H58" stroke-width="1" opacity="0.5"/>'),
    ],
    // Publications — books, papers, quotes, academia, citations.
    publications: [
      fs('s1', '<path d="M32 18 C26 14 15 14 9 16 V48 C15 46 26 46 32 50 C38 46 49 46 55 48 V16 C49 14 38 14 32 18 Z"/><path d="M32 18 V50"/>'),
      fs('s2 alt', '<path d="M18 8 H40 L50 18 V56 H18 Z"/><path d="M40 8 V18 H50"/><path d="M25 28 H43 M25 36 H43 M25 44 H37"/>'),
      fs('s3', '<path d="M14 22 H26 V34 C26 41 22 45 15 47"/><path d="M34 22 H46 V34 C46 41 42 45 35 47"/>'),
      fs('s4 alt', '<path d="M32 14 L58 24 L32 34 L6 24 Z"/><path d="M16 28 V40 C16 44 24 47 32 47 C40 47 48 44 48 40 V28"/><path d="M58 24 V40"/>'),
      fs('s5 alt', '<circle cx="27" cy="27" r="15"/><path d="M38 38 L52 52"/>'),
      fs('s6', '<circle cx="12" cy="20" r="4"/><circle cx="12" cy="44" r="4"/><circle cx="34" cy="14" r="4"/><circle cx="34" cy="50" r="4"/><circle cx="54" cy="32" r="4"/><path d="M16 21 L30 15 M16 43 L30 49 M37 17 L51 30 M37 47 L51 34 M34 18 V46"/>'),
    ],
    // Projects — code, terminal, gears, git, packages, windows.
    projects: [
      fs('s1', '<path d="M24 12 L8 32 L24 52"/><path d="M40 12 L56 32 L40 52"/><path d="M36 10 L28 54" opacity="0.6"/>'),
      fs('s2 alt', '<path d="M8 12 H56 V52 H8 Z"/><path d="M8 22 H56"/><path d="M16 33 L23 39 L16 45"/><path d="M28 45 H40"/>'),
      fs('s3', '<circle cx="32" cy="32" r="9"/><circle cx="32" cy="32" r="3" fill="currentColor" stroke="none"/><path d="M32 10 V18 M32 46 V54 M10 32 H18 M46 32 H54 M16 16 L22 22 M42 42 L48 48 M48 16 L42 22 M16 48 L22 42"/>'),
      fs('s4 alt', '<circle cx="20" cy="14" r="5"/><circle cx="20" cy="50" r="5"/><circle cx="46" cy="26" r="5"/><path d="M20 19 V45"/><path d="M20 30 C22 24 34 24 41 26"/>'),
      fs('s5 alt', '<path d="M32 8 L54 20 V44 L32 56 L10 44 V20 Z"/><path d="M10 20 L32 32 L54 20"/><path d="M32 32 V56"/>'),
      fs('s6', '<path d="M10 14 H54 V50 H10 Z"/><path d="M10 24 H54"/><circle cx="17" cy="19" r="1.6" fill="currentColor" stroke="none"/><circle cx="23" cy="19" r="1.6" fill="currentColor" stroke="none"/><circle cx="29" cy="19" r="1.6" fill="currentColor" stroke="none"/>'),
    ],
    // Achievements — trophy, medal, star, award, chart, summit flag.
    achievements: [
      fs('s1', '<path d="M22 12 H42 V24 C42 32 38 37 32 37 C26 37 22 32 22 24 Z"/><path d="M22 16 H14 V20 C14 26 18 29 23 29"/><path d="M42 16 H50 V20 C50 26 46 29 41 29"/><path d="M32 37 V45"/><path d="M24 52 H40 L38 45 H26 Z"/>'),
      fs('s2 alt', '<path d="M24 10 L32 28 M40 10 L32 28"/><circle cx="32" cy="42" r="12"/><path d="M32 36 L34 40 L38 40 L35 43 L36 47 L32 45 L28 47 L29 43 L26 40 L30 40 Z" fill="currentColor" stroke="none"/>'),
      fs('s3', '<path d="M32 8 L39 24 L56 25 L43 37 L47 54 L32 44 L17 54 L21 37 L8 25 L25 24 Z"/>'),
      fs('s4 alt', '<circle cx="32" cy="24" r="14"/><path d="M24 36 L19 56 L32 48 L45 56 L40 36"/><path d="M32 18 L34 22 L38 23 L35 26 L36 30 L32 28 L28 30 L29 26 L26 23 L30 22 Z" fill="currentColor" stroke="none"/>'),
      fs('s5 alt', '<path d="M12 52 H54"/><path d="M18 52 V38 M30 52 V30 M42 52 V22"/><path d="M16 34 L28 26 L38 30 L54 14"/><path d="M46 14 H54 V22"/>'),
      fs('s6', '<path d="M12 54 L32 12 L52 54"/><path d="M32 14 V30"/><path d="M32 16 H46 L42 21 L46 26 H32"/>'),
    ],
    // Certifications — certificate, rosette, shield, badge, check, scroll.
    certifications: [
      fs('s1', '<path d="M12 10 H52 V40 H12 Z"/><path d="M20 20 H44 M20 28 H36"/><circle cx="42" cy="44" r="6"/><path d="M38 48 L36 58 L42 53 L48 58 L46 48"/>'),
      fs('s2 alt', '<circle cx="32" cy="24" r="12"/><path d="M26 34 L22 52 L32 46 L42 52 L38 34"/><circle cx="32" cy="24" r="5"/>'),
      fs('s3', '<path d="M32 8 L52 16 V32 C52 44 43 52 32 56 C21 52 12 44 12 32 V16 Z"/><path d="M23 31 L30 38 L42 24"/>'),
      fs('s4 alt', '<path d="M32 8 L50 18 V40 L32 50 L14 40 V18 Z"/><path d="M24 30 L30 36 L41 23"/>'),
      fs('s5 alt', '<circle cx="32" cy="32" r="20"/><path d="M22 32 L29 39 L43 24"/>'),
      fs('s6', '<path d="M40 14 H16 C12 14 12 20 16 20 H40 V48 C40 52 44 54 46 54 C50 54 52 50 52 46 V20 C52 16 48 14 44 14"/><path d="M40 14 C44 14 44 20 40 20"/><path d="M22 28 H36 M22 36 H36"/>'),
    ],
    // Blog — quill, article lines, quote, RSS, chat, pencil.
    blog: [
      fs('s1', '<path d="M50 14 C34 16 20 30 14 50 C30 44 44 30 50 14 Z"/><path d="M14 50 L24 40"/>'),
      fs('s2 alt', '<path d="M14 14 H50 M14 24 H50 M14 34 H50 M14 44 H40"/>'),
      fs('s3', '<path d="M12 14 H52 V38 H30 L20 48 V38 H12 Z"/><path d="M22 22 H28 V28 C28 31 26 32 24 33 M34 22 H40 V28 C40 31 38 32 36 33"/>'),
      fs('s4 alt', '<circle cx="16" cy="48" r="3" fill="currentColor" stroke="none"/><path d="M14 34 C24 34 30 40 30 50"/><path d="M14 22 C34 22 42 32 42 50"/>'),
      fs('s5 alt', '<path d="M10 14 H40 V32 H24 L16 40 V32 H10 Z"/><path d="M28 26 H54 V44 H46 V52 L38 44 H28 Z"/>'),
      fs('s6', '<path d="M14 50 L18 40 L44 14 L50 20 L24 46 Z"/><path d="M40 18 L46 24"/><path d="M14 50 L20 48"/>'),
    ],
    // Contact — envelope, chat, pin, phone, paper plane, at-sign.
    contact: [
      fs('s1', '<path d="M10 16 H54 V48 H10 Z"/><path d="M10 18 L32 34 L54 18"/>'),
      fs('s2 alt', '<path d="M12 14 H52 V40 H28 L18 50 V40 H12 Z"/><path d="M22 24 H42 M22 32 H36"/>'),
      fs('s3', '<path d="M32 10 C22 10 15 17 15 27 C15 40 32 54 32 54 C32 54 49 40 49 27 C49 17 42 10 32 10 Z"/><circle cx="32" cy="26" r="6"/>'),
      fs('s4 alt', '<path d="M20 10 C16 10 12 14 12 18 C12 36 28 52 46 52 C50 52 54 48 54 44 L45 39 L39 44 C33 41 23 31 20 25 L25 19 Z"/>'),
      fs('s5 alt', '<path d="M8 30 L56 10 L46 54 L32 40 Z"/><path d="M56 10 L32 40 L30 52 L24 42"/>'),
      fs('s6', '<circle cx="32" cy="30" r="9"/><path d="M41 30 C41 24 41 40 47 40 C53 40 54 30 51 22 C46 8 24 8 16 22 C8 36 20 54 36 54"/>'),
    ],
  };

  // Build the `.shapes-bg` wrapper of themed floating icons for a page.
  function heroShapes(page) {
    const set = HERO_SHAPE_SETS[page] || HERO_SHAPE_SETS.home;
    return `<div class="shapes-bg" aria-hidden="true">${set.join('')}</div>`;
  }

  // Large themed "medallion" icons shown inside the hero frame when a
  // page has no photo of its own — gives every page a distinct hero.
  const HERO_MEDALLIONS = {
    publications: '<path d="M32 20 C25 15 14 15 8 17 V48 C14 46 25 46 32 51 C39 46 50 46 56 48 V17 C50 15 39 15 32 20 Z"/><path d="M32 20 V51"/>',
    projects: '<path d="M23 16 L9 32 L23 48"/><path d="M41 16 L55 32 L41 48"/><path d="M37 12 L27 52"/>',
    achievements: '<path d="M22 12 H42 V25 C42 33 38 38 32 38 C26 38 22 33 22 25 Z"/><path d="M22 16 H13 V21 C13 27 17 30 23 30"/><path d="M42 16 H51 V21 C51 27 47 30 41 30"/><path d="M32 38 V46"/><path d="M23 53 H41 L39 46 H25 Z"/>',
    certifications: '<path d="M32 8 L53 16 V32 C53 45 44 53 32 57 C20 53 11 45 11 32 V16 Z"/><path d="M22 31 L29 39 L43 23"/>',
    blog: '<path d="M14 50 L18 39 L43 14 L50 21 L25 46 Z"/><path d="M39 18 L46 25"/><path d="M14 50 L21 47"/>',
    contact: '<path d="M9 15 H55 V49 H9 Z"/><path d="M9 17 L32 35 L55 17"/>',
  };

  // The image block (circular avatar) shown in every hero, wrapped in a
  // decorative frame: rotating dashed rings, orbiting dots and a soft glow.
  // Priority for what's shown inside the circle:
  //   1. `photo` if provided (e.g. the profile photo on the home page, or a
  //      page's own `heroPhoto` set in js/data.js)
  //   2. a page-specific themed medallion, so each page looks different
  //   3. the generic "add photo" placeholder
  function profileAvatar(note, photo, page) {
    let inner;
    let medallionClass = '';
    if (photo && photo.trim()) {
      inner = phImage(photo, D.profile.fullName);
    } else if (page && HERO_MEDALLIONS[page]) {
      medallionClass = ' hero-medallion';
      inner = `<svg class="medallion-art" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${HERO_MEDALLIONS[page]}</svg>`;
    } else {
      inner = `<div class="ph-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/></svg>
              ${note || 'Add profile photo'}
            </div>`;
    }
    return `
      <div class="hero-avatar">
        <span class="hero-glow" aria-hidden="true"></span>
        <span class="hero-ring hero-ring-1" aria-hidden="true"></span>
        <span class="hero-ring hero-ring-2" aria-hidden="true"></span>
        <span class="hero-orbit o1" aria-hidden="true"><i class="orbit-dot"></i></span>
        <span class="hero-orbit o2" aria-hidden="true"><i class="orbit-dot alt"></i></span>
        <span class="hero-orbit o3" aria-hidden="true"><i class="orbit-dot"></i></span>
        <div class="ph ph-avatar ph-float tilt${medallionClass}">${inner}</div>
      </div>`;
  }

  // An inner-page hero styled like the homepage: two columns, text on the
  // left (eyebrow, title, lede, optional status bar) and the profile image
  // on the right.
  function pageHero(h, page) {
    const status = (h.status || [])
      .map((s, i) => `<span${i === 0 ? ' class="live"' : ''}>${esc(s)}</span>`)
      .join('');
    return `
  <section class="hero-section" style="padding-top:72px;">
    ${heroShapes(page)}
    <div class="wrap g-hero" style="position:relative; z-index:1;">
      <div data-reveal>
        <p class="eyebrow">${esc(h.eyebrow)}</p>
        <h1 style="font-size:clamp(2.2rem, 5vw, 3.2rem); margin-top:14px;">${esc(h.title)}</h1>
        <p class="lede" style="margin-top:18px;">${esc(h.lede)}</p>
        ${status ? `<div class="statusbar" style="margin-top:28px;">${status}</div>` : ''}
      </div>
      <div data-reveal="scale" style="display:flex; justify-content:center;">
        ${profileAvatar(h.photoNote, h.heroPhoto, page)}
      </div>
    </div>
  </section>
  <hr class="divider wrap">`;
  }

  // A rotating set of small decorative glyphs that float beside each
  // section heading. They cycle so consecutive headings differ.
  const HEAD_DECOS = [
    // orbiting dots
    '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="20" cy="20" r="14"/><circle cx="20" cy="6" r="2.5" fill="currentColor" stroke="none"/><circle cx="34" cy="20" r="2" fill="currentColor" stroke="none"/><circle cx="20" cy="20" r="2.5" fill="currentColor" stroke="none"/></svg>',
    // plus / spark grid
    '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20 6 V16 M15 11 H25"/><path d="M8 26 V32 M5 29 H11"/><path d="M30 24 V30 M27 27 H33"/></svg>',
    // triangle nodes
    '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M20 6 L34 30 H6 Z"/><circle cx="20" cy="6" r="2.5" fill="currentColor" stroke="none"/><circle cx="34" cy="30" r="2.5" fill="currentColor" stroke="none"/><circle cx="6" cy="30" r="2.5" fill="currentColor" stroke="none"/></svg>',
    // concentric arcs
    '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M8 28 A16 16 0 0 1 32 28"/><path d="M13 28 A9 9 0 0 1 27 28"/><circle cx="20" cy="28" r="2.5" fill="currentColor" stroke="none"/></svg>',
    // waveform
    '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 20 Q13 6 20 20 T34 20"/><circle cx="6" cy="20" r="2" fill="currentColor" stroke="none"/><circle cx="34" cy="20" r="2" fill="currentColor" stroke="none"/></svg>',
    // diamond ring
    '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M20 5 L35 20 L20 35 L5 20 Z"/><circle cx="20" cy="20" r="3" fill="currentColor" stroke="none"/></svg>',
  ];
  let _decoIdx = 0;
  const headDeco = () => {
    const glyph = HEAD_DECOS[_decoIdx % HEAD_DECOS.length];
    const alt = _decoIdx % 2 === 1 ? ' alt' : '';
    _decoIdx++;
    return `<span class="head-deco${alt}" aria-hidden="true">${glyph}</span>`;
  };

  const sectionHead = (eyebrow, title, linkHtml) => `
      <div class="section-head" data-reveal>
        <div class="section-head-main">
          ${headDeco()}
          <div class="section-head-text">
            <p class="eyebrow">${esc(eyebrow)}</p><h2>${esc(title)}</h2>
          </div>
        </div>
        ${linkHtml || ''}
      </div>`;

  const tag = (label, style) =>
    label ? `<span class="tag${style ? ' ' + style : ''}">${esc(label)}</span>` : '';

  // ============================================================
  //  SHARED: WHAT'S NEW (home)
  // ============================================================
  //  Renders a "latest updates" feed that automatically:
  //    • sorts items newest-first by their `date` field, and
  //    • flags anything published within `newWithinDays` days with
  //      a pulsing "NEW" badge.
  //  The author only edits the list in js/data.js — no manual
  //  ordering or badge management needed.
  function renderWhatsNew(w) {
    if (!w || !Array.isArray(w.items) || !w.items.length) return;

    // Per-type presentation (label + accent style + small icon).
    const TYPES = {
      publication: {
        label: 'Publication',
        style: 'tag-accent',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h11a2 2 0 0 1 2 2v13M4 5v13a2 2 0 0 0 2 2h11M4 5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2"/></svg>',
      },
      project: {
        label: 'Project',
        style: 'tag-teal',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 6 3 12 8 18"/><polyline points="16 6 21 12 16 18"/></svg>',
      },
      blog: {
        label: 'Blog',
        style: '',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 12h16M4 19h10"/></svg>',
      },
    };

    // Parse a "YYYY-MM-DD" string into a timestamp (NaN if missing/bad).
    const ts = (d) => {
      const t = Date.parse(d);
      return Number.isNaN(t) ? -Infinity : t;
    };

    // Format a date for display, e.g. "Jan 2026".
    const fmt = (d) => {
      const t = Date.parse(d);
      if (Number.isNaN(t)) return esc(d || '');
      return new Date(t).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const now = Date.now();
    const windowMs = (w.newWithinDays || 0) * 24 * 60 * 60 * 1000;

    // Auto-sort newest-first, then cap to maxItems.
    const items = w.items
      .slice()
      .sort((a, b) => ts(b.date) - ts(a.date))
      .slice(0, w.maxItems || w.items.length);

    const rows = items
      .map((it) => {
        const meta = TYPES[it.type] || { label: it.type || '', style: '', icon: '' };
        const t = ts(it.date);
        const isNew = windowMs > 0 && t !== -Infinity && now - t <= windowMs;
        const newBadge = isNew ? '<span class="wn-new">NEW</span>' : '';
        const link = it.href
          ? `<a class="wn-link" href="${esc(it.href)}">View →</a>`
          : '';
        return `
        <li class="wn-item card tilt${isNew ? ' is-new' : ''}" data-reveal>
          <span class="wn-icon ${esc(meta.style)}" aria-hidden="true">${meta.icon}</span>
          <div class="wn-main">
            <div class="wn-top">
              <span class="tag ${esc(meta.style)}">${esc(meta.label)}</span>
              <span class="mono wn-date">${fmt(it.date)}</span>
              ${newBadge}
            </div>
            <h3 class="wn-title">${esc(it.title)}</h3>
            ${it.note ? `<p class="wn-note">${esc(it.note)}</p>` : ''}
          </div>
          ${link}
        </li>`;
      })
      .join('');

    const headLink =
      w.linkLabel && w.linkHref
        ? `<a href="${esc(w.linkHref)}" class="btn">${esc(w.linkLabel)}</a>`
        : '';

    mount('home-whatsnew', `
  <section class="section-alt">
    <div class="wrap">
      ${sectionHead(w.eyebrow, w.title, headLink)}
      <ul class="wn-list" data-reveal>${rows}</ul>
    </div>
  </section>`);
  }

  // ============================================================
  //  PAGE: HOME
  // ============================================================
  function renderHome() {
    const h = D.home;

    // ----- HERO -----
    const hero = h.hero;
    const wordsAttr = hero.roleWords.join('|');
    const heroBtns = `
        <div style="display:flex; gap:14px; margin-top:32px; flex-wrap:wrap;">
          <a href="${esc(hero.primaryCta.href)}" class="btn btn-solid magnetic">${esc(hero.primaryCta.label)}</a>
          <a href="${esc(hero.secondaryCta.href)}" class="btn magnetic" id="resume-btn" download>${esc(hero.secondaryCta.label)}</a>
        </div>`;
    const heroStatus = hero.status
      .map((s, i) => `<span${i === 0 ? ' class="live"' : ''}>${esc(s)}</span>`)
      .join('');

    const photo = D.profile.photo;
    const heroPhoto = profileAvatar(hero.photoNote, D.profile.photo, 'home');

    mount('hero', `
  <section class="hero-section" style="padding-top:72px;">
    ${heroShapes('home')}
    <div class="wrap g-hero" style="position:relative; z-index:1;">
      <div data-reveal>
        <p class="eyebrow">${esc(hero.eyebrow)}</p>
        <h1 style="font-size:clamp(2.4rem, 5vw, 3.6rem); margin-top:18px;">
          ${esc(hero.headlineLead)}<br>
          I'm a <span class="role-cycler" data-words="${esc(wordsAttr)}">${esc(hero.roleWords[0])}</span>
        </h1>
        <p class="lede" style="margin-top:22px;">${hero.lede}</p>
        ${heroBtns}
        <div class="statusbar" style="margin-top:40px;">${heroStatus}</div>
      </div>
      <div data-reveal="scale" style="display:flex; justify-content:center;">
        ${heroPhoto}
      </div>
    </div>
  </section>
  <hr class="divider wrap">`);

    // ----- WHAT'S NEW (auto-sorted, auto NEW badge) -----
    renderWhatsNew(h.whatsNew);

    // ----- ABOUT -----
    const about = h.about;
    const aboutCards = about.cards
      .map(
        (c) => `
        <div class="card tilt about-card">
          <span class="tag ${esc(c.tagStyle)}">${esc(c.tag)}</span>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.text)}</p>
        </div>`
      )
      .join('');
    mount('about', `
  <section>
    <div class="wrap g-about">
      <div data-reveal>
        <p class="eyebrow">${esc(about.eyebrow)}</p>
        <h2>${esc(about.title)}</h2>
        <p class="lede" style="margin-top:18px; color:var(--ink-soft);">${esc(about.lede)}</p>
      </div>
      <div data-reveal class="g-3">${aboutCards}</div>
    </div>
  </section>`);

    // ----- PUBLICATIONS TOUCH -----
    const pub = h.publications;
    const pubCards = pub.items
      .map(
        (it) => `
        <div class="card tilt pub-touch">
          <div class="ph ph-thumb">${phImage(it.image, it.title)}</div>
          ${tag(it.tag, it.tagStyle)}
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.meta)}</p>
        </div>`
      )
      .join('');
    mount('home-publications', `
  <section class="section-alt">
    <div class="wrap">
      ${sectionHead(pub.eyebrow, pub.title, `<a href="publications.html" class="btn">${esc(pub.linkLabel)}</a>`)}
      <div data-reveal class="g-3">${pubCards}</div>
    </div>
  </section>`);

    // ----- PROJECTS TOUCH -----
    const proj = h.projects;
    const projCards = proj.items
      .map(
        (it) => `
        <a class="card tilt proj-touch" href="projects.html">
          <div class="ph ph-thumb">${phImage(it.image, it.title)}</div>
          ${tag(it.tag, 'tag-teal')}
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.text)}</p>
        </a>`
      )
      .join('');
    mount('home-projects', `
  <section>
    <div class="wrap">
      ${sectionHead(proj.eyebrow, proj.title, `<a href="projects.html" class="btn">${esc(proj.linkLabel)}</a>`)}
      <div data-reveal class="g-3">${projCards}</div>
    </div>
  </section>`);

    // ----- ACHIEVEMENTS TOUCH -----
    const ach = h.achievements;
    const achCards = ach.items
      .map((it) => {
        const value = it.counter
          ? `<span class="counter" data-target="${esc(it.target)}" data-decimals="${it.decimals}"${it.suffix ? ` data-suffix="${esc(it.suffix)}"` : ''}>${(0).toFixed(it.decimals)}</span>`
          : esc(it.value);
        return `
        <div class="card tilt metric-card">
          <div class="mono metric-value">${value}</div>
          <p>${esc(it.label)}</p>
        </div>`;
      })
      .join('');
    mount('home-achievements', `
  <section class="section-alt">
    <div class="wrap">
      ${sectionHead(ach.eyebrow, ach.title, `<a href="achievements.html" class="btn">${esc(ach.linkLabel)}</a>`)}
      <div data-reveal class="g-4">${achCards}</div>
    </div>
  </section>`);

    // ----- BLOG TOUCH -----
    const blog = h.blog;
    const blogCards = blog.items
      .map(
        (it) => `
        <a class="card tilt blog-touch" href="blog.html">
          <div class="ph ph-wide">${phImage(it.image, it.title)}</div>
          <p class="mono post-meta">${esc(it.meta)}</p>
          <h3>${esc(it.title)}</h3>
        </a>`
      )
      .join('');
    mount('home-blog', `
  <section>
    <div class="wrap">
      ${sectionHead(blog.eyebrow, blog.title, `<a href="blog.html" class="btn">${esc(blog.linkLabel)}</a>`)}
      <div data-reveal class="g-3">${blogCards}</div>
    </div>
  </section>`);

    // ----- CONTACT CTA -----
    const cta = h.contactCta;
    mount('home-cta', `
  <section>
    <div class="wrap card cta-card tilt" data-reveal>
      <div>
        <p class="eyebrow">${esc(cta.eyebrow)}</p>
        <h2>${esc(cta.title)}</h2>
      </div>
      <a href="${esc(cta.button.href)}" class="btn btn-solid">${esc(cta.button.label)}</a>
    </div>
  </section>`);
  }

  // ============================================================
  //  PAGE: PUBLICATIONS
  // ============================================================
  function renderPublications() {
    const P = D.publications;
    mount('hero', pageHero(P.hero, 'publications'));

    // Journals with filter pills + spine.
    const j = P.journals;
    const pills = j.filters
      .map(
        (f, i) =>
          `<button class="filter-pill${i === 0 ? ' is-active' : ''}" data-filter="${esc(f.value)}">${esc(f.label)}</button>`
      )
      .join('');
    const spine = j.items
      .map((it, idx) => {
        const doi = it.doi
          ? `<a href="${esc(it.doi)}" target="_blank" rel="noopener" class="btn magnetic">View DOI →</a>`
          : '';
        const venue = it.venue
          ? `<span class="pub-venue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h11a2 2 0 0 1 2 2v13M4 5v13a2 2 0 0 0 2 2h11M4 5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2"/></svg>${esc(it.venue)}</span>`
          : '<span class="pub-venue"></span>';

        // Split a tag string like "Q1 · Cite Score 13.7 · IF 8.0" into
        // individual metric chips. The first chip is the quartile / type.
        const parts = (it.tag || '')
          .split('·')
          .map((p) => p.trim())
          .filter(Boolean);
        const kind = (it.tags || '').trim(); // q1 | q2 | preprint
        const chips = parts
          .map((p, i) => {
            if (i === 0) {
              return `<span class="metric metric-q ${esc(kind)}">${esc(p)}</span>`;
            }
            return `<span class="metric">${esc(p)}</span>`;
          })
          .join('');
        const metrics = chips ? `<div class="pub-metrics">${chips}</div>` : '';
        const num = String(idx + 1).padStart(2, '0');

        return `
        <article class="pub-card tilt is-${esc(kind)}" data-filterable data-group="journals" data-tags="${esc(it.tags)}">
          <span class="pub-rail" aria-hidden="true"></span>
          <div class="pub-index">${num}</div>
          <div class="ph ph-thumb pub-thumb">${phImage(it.image, it.title)}</div>
          <div class="pub-body">
            ${metrics}
            <h3 class="pub-title">${esc(it.title)}</h3>
            <p class="pub-authors">${it.authors}</p>
            <div class="pub-foot">
              ${venue}
              ${doi}
            </div>
          </div>
        </article>`;
      })
      .join('');
    mount('journals', `
  <section>
    <div class="wrap">
      ${sectionHead(j.eyebrow, j.title, '')}
      <div class="filter-bar" data-filter-group="journals" data-reveal>${pills}</div>
      <div class="pub-list" data-reveal>${spine}</div>
    </div>
  </section>`);

    // Conference
    const c = P.conference;
    const confCards = c.items
      .map(
        (it, idx) => `
      <div class="card tilt conf-card" data-reveal>
        <div class="pub-index conf-index">${String(idx + 1).padStart(2, '0')}</div>
        <div class="ph ph-thumb conf-thumb">${phImage(it.image, it.title)}</div>
        <div class="conf-body">
          ${tag(it.tag, '')}
          <h3>${esc(it.title)}</h3>
          <p class="authors">${it.authors}</p>
          ${it.doi ? `<a href="${esc(it.doi)}" target="_blank" rel="noopener" class="btn">View DOI →</a>` : ''}
        </div>
      </div>`
      )
      .join('');
    mount('conference', `
  <section class="section-alt">
    <div class="wrap">
      ${sectionHead(c.eyebrow, c.title, '')}
      ${confCards}
    </div>
  </section>`);

    // Under review
    const u = P.underReview;
    const uCards = u.items
      .map(
        (it) => `
        <div class="card tilt review-card">
          ${tag(it.tag, it.tagStyle)}
          <h3>${esc(it.title)}</h3>
          <p>${it.authors}</p>
        </div>`
      )
      .join('');
    mount('under-review', `
  <section>
    <div class="wrap">
      ${sectionHead(u.eyebrow, u.title, '')}
      <div data-reveal class="g-3">${uCards}</div>
    </div>
  </section>`);

    // Ongoing
    const o = P.ongoing;
    const oCards = o.items
      .map(
        (it) => `
        <div class="card tilt ongoing-card">
          <h3>${esc(it.title)}</h3>
          <p>${it.authors}</p>
        </div>`
      )
      .join('');
    mount('ongoing', `
  <section class="section-alt">
    <div class="wrap">
      ${sectionHead(o.eyebrow, o.title, '')}
      <div data-reveal class="g-2">${oCards}</div>
    </div>
  </section>`);
  }

  // ============================================================
  //  PAGE: PROJECTS
  // ============================================================
  function renderProjects() {
    const P = D.projects;
    mount('hero', pageHero(P.hero, 'projects'));

    // Work (Implevista) — 2-up wide cards.
    const w = P.work;
    const workCards = w.items
      .map((it) => {
        const tags = (it.tags || []).map((t) => `<span class="tag tag-teal">${esc(t)}</span>`).join('');
        const bullets = (it.bullets || []).map((b) => `<li>${esc(b)}</li>`).join('');
        const action = it.link
          ? `<a href="${esc(it.link.href)}" target="_blank" rel="noopener" class="btn ${esc(it.link.style || '')}">${esc(it.link.label)}</a>`
          : it.badge
          ? `<span class="tag">${esc(it.badge)}</span>`
          : '';
        return `
        <div class="card tilt work-card">
          <div class="ph ph-wide">${phImage(it.image, it.title)}</div>
          <div class="tag-row">${tags}</div>
          <h3>${esc(it.title)}</h3>
          <p class="summary">${esc(it.summary)}</p>
          <ul class="bullets">${bullets}</ul>
          ${action}
        </div>`;
      })
      .join('');
    mount('work', `
  <section>
    <div class="wrap">
      ${sectionHead(w.eyebrow, w.title, `<span class="tag">${esc(w.badge)}</span>`)}
      <div data-reveal class="g-2">${workCards}</div>
    </div>
  </section>`);

    // Independent — 3-up thumb cards.
    const ind = P.independent;
    const indCards = ind.items
      .map((it) => {
        const tags = (it.tags || []).map((t) => `<span class="tag tag-teal">${esc(t)}</span>`).join('');
        const bullets = (it.bullets || []).map((b) => `<li>${esc(b)}</li>`).join('');
        const action = it.link
          ? `<a href="${esc(it.link.href)}" target="_blank" rel="noopener" class="btn">${esc(it.link.label)}</a>`
          : '';
        return `
        <div class="card tilt indep-card">
          <div class="ph ph-thumb">${phImage(it.image, it.title)}</div>
          <span class="mono date">${esc(it.date)}</span>
          <h3>${esc(it.title)}</h3>
          <div class="tag-row">${tags}</div>
          <ul class="bullets">${bullets}</ul>
          ${action}
        </div>`;
      })
      .join('');
    mount('independent', `
  <section class="section-alt">
    <div class="wrap">
      ${sectionHead(ind.eyebrow, ind.title, '')}
      <div data-reveal class="g-3">${indCards}</div>
    </div>
  </section>`);

    // Skills — redesigned as logo chips. Icon slugs map to Devicon
    // (served from jsDelivr); names without a logo fall back to a
    // clean monogram tile so nothing looks broken.
    const s = P.skills;
    const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';
    const SKILL_ICONS = {
      'PyTorch': 'pytorch/pytorch-original',
      'TensorFlow': 'tensorflow/tensorflow-original',
      'Keras': 'keras/keras-original',
      'Scikit-learn': 'scikitlearn/scikitlearn-original',
      'OpenCV': 'opencv/opencv-original',
      'NumPy': 'numpy/numpy-original',
      'Pandas': 'pandas/pandas-original',
      'Matplotlib': 'matplotlib/matplotlib-original',
      'Python': 'python/python-original',
      'JavaScript': 'javascript/javascript-original',
      'Java': 'java/java-original',
      'C#': 'csharp/csharp-original',
      'C++': 'cplusplus/cplusplus-original',
      'C': 'c/c-original',
      'Django': 'django/django-plain',
      'Flask': 'flask/flask-original',
      'FastAPI': 'fastapi/fastapi-original',
      'Express': 'express/express-original',
      'Node.js': 'nodejs/nodejs-original',
      'Next.js': 'nextjs/nextjs-original',
      'React': 'react/react-original',
      'Tailwind': 'tailwindcss/tailwindcss-original',
      'MongoDB': 'mongodb/mongodb-original',
      'MySQL': 'mysql/mysql-original',
    };
    // Build a two-letter monogram for tools without an official logo.
    const monogram = (name) => {
      const clean = name.replace(/[^A-Za-z0-9+#]/g, '');
      return clean.slice(0, 2).toUpperCase();
    };
    const skillChip = (name) => {
      const slug = SKILL_ICONS[name];
      const logo = slug
        ? `<span class="skill-logo"><img src="${DEVICON}${slug}.svg" alt="" loading="lazy" width="22" height="22"></span>`
        : `<span class="skill-logo is-mono">${esc(monogram(name))}</span>`;
      return `<span class="skill-chip">${logo}<span class="skill-name">${esc(name)}</span></span>`;
    };
    const skillCards = s.groups
      .map((g) => {
        const items = g.items.map(skillChip).join('');
        return `
        <div class="card tilt skill-card">
          <div class="skill-head">
            <span class="skill-dot" aria-hidden="true"></span>
            <h4 class="mono card-label">${esc(g.name)}</h4>
            <span class="mono skill-count">${g.items.length}</span>
          </div>
          <div class="skill-chips">${items}</div>
        </div>`;
      })
      .join('');
    mount('skills', `
  <section>
    <div class="wrap">
      ${sectionHead(s.eyebrow, s.title, '')}
      <div data-reveal class="g-2 skill-grid">${skillCards}</div>
    </div>
  </section>`);
  }

  // ============================================================
  //  PAGE: ACHIEVEMENTS
  // ============================================================
  function renderAchievements() {
    const A = D.achievements;
    mount('hero', pageHero(A.hero, 'achievements'));

    // Stats
    const stats = A.stats.items
      .map((it) => {
        const suffix = it.suffix
          ? `<span class="astat-suffix">${esc(it.suffix)}</span>`
          : '';
        return `
        <div class="card tilt astat-card">
          <div class="astat-value"><span class="counter" data-target="${esc(it.target)}" data-decimals="${it.decimals}">${(0).toFixed(it.decimals)}</span>${suffix}</div>
          <p>${esc(it.label)}</p>
        </div>`;
      })
      .join('');
    mount('stats', `
  <section>
    <div class="wrap">
      <div data-reveal class="g-4">${stats}</div>
    </div>
  </section>`);

    // Education timeline
    const edu = A.education;
    const eduItems = edu.items
      .map(
        (it) => `
        <div class="spine-item">
          <span class="mono" style="font-size:12.5px; color:var(--ink-faint);">${esc(it.date)}</span>
          <h3 style="font-size:1.15rem; margin:10px 0 4px;">${esc(it.title)}</h3>
          <p style="color:var(--ink-soft); font-size:14px;">${esc(it.org)}</p>
          ${it.note ? `<p style="color:var(--ink-faint); font-size:13px; margin-top:6px;">${esc(it.note)}</p>` : ''}
        </div>`
      )
      .join('');
    mount('education', `
  <section class="section-alt">
    <div class="wrap">
      ${sectionHead(edu.eyebrow, edu.title, '')}
      <div class="spine" data-reveal>${eduItems}</div>
    </div>
  </section>`);

    // Experience timeline
    const exp = A.experience;
    const expItems = exp.items
      .map((it) => {
        const tags = (it.tags || []).length
          ? `<div style="display:flex; gap:8px; flex-wrap:wrap;">${it.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>`
          : '';
        return `
        <div class="spine-item">
          <span class="mono" style="font-size:12.5px; color:var(--ink-faint);">${esc(it.date)}</span>
          <h3 style="font-size:1.15rem; margin:10px 0 4px;">${esc(it.title)}</h3>
          <p style="color:var(--ink-soft); font-size:14px;${tags ? ' margin-bottom:10px;' : ''}">${esc(it.org)}</p>
          ${tags}
        </div>`;
      })
      .join('');
    mount('experience', `
  <section>
    <div class="wrap">
      ${sectionHead(exp.eyebrow, exp.title, '')}
      <div class="spine" data-reveal>${expItems}</div>
    </div>
  </section>`);

    // Co-curricular
    const co = A.coCurricular;
    const coCards = co.items
      .map(
        (it) => `
        <div class="card tilt co-card">
          ${tag(it.tag, it.tagStyle)}
          <p>${esc(it.text)}</p>
        </div>`
      )
      .join('');
    mount('co-curricular', `
  <section class="section-alt">
    <div class="wrap">
      ${sectionHead(co.eyebrow, co.title, '')}
      <div data-reveal class="g-3">${coCards}</div>
    </div>
  </section>`);

    // References
    const ref = A.references;
    const refCards = ref.items
      .map((it) => {
        const avatar = it.photo && it.photo.trim()
          ? `<div class="ph ph-avatar">${phImage(it.photo, it.name)}</div>`
          : `<div class="ph ph-avatar"><div class="ph-label">Photo</div></div>`;
        return `
        <div class="card tilt ref-card">
          ${avatar}
          <h3>${esc(it.name)}</h3>
          <p class="role">${esc(it.role)}</p>
          <p class="org">${esc(it.org)}</p>
          <a href="mailto:${esc(it.email)}" class="mono email">${esc(it.email)}</a>
        </div>`;
      })
      .join('');
    mount('references', `
  <section>
    <div class="wrap">
      ${sectionHead(ref.eyebrow, ref.title, '')}
      <div data-reveal class="g-3">${refCards}</div>
    </div>
  </section>`);
  }

  // ============================================================
  //  PAGE: BLOG
  // ============================================================
  function renderBlog() {
    const B = D.blog;
    mount('hero', pageHero(B.hero, 'blog'));

    // Resolve where a post/featured item links, and whether it's a PDF.
    // If `file` is set it opens the PDF in a new tab; otherwise use `href`.
    const postTarget = (it) => {
      const isPdf = !!(it.file && it.file.trim());
      const href = isPdf ? it.file : (it.href || '#');
      const attr = isPdf ? ' target="_blank" rel="noopener"' : '';
      return { isPdf, href, attr };
    };
    const pdfBadge = '<span class="pdf-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>PDF</span>';

    const f = B.featured;
    const ft = postTarget(f);
    mount('featured', `
  <section>
    <div class="wrap">
      <a href="${esc(ft.href)}"${ft.attr} class="card g-2 tilt feature-card" data-reveal>
        <div class="ph ph-wide">${phImage(f.image, f.title)}</div>
        <div>
          ${tag(f.tag, 'tag-accent')}
          <h2>${esc(f.title)}</h2>
          <p class="excerpt">${esc(f.excerpt)}</p>
          <span class="mono meta">${esc(f.meta)}${ft.isPdf ? ' · PDF' : ''}</span>
        </div>
      </a>
    </div>
  </section>`);

    // Filter pills (by writing kind) — reuse the shared filter system.
    const filters = B.filters || [];
    const pills = filters
      .map(
        (f, i) =>
          `<button class="filter-pill${i === 0 ? ' is-active' : ''}" data-filter="${esc(f.value)}">${esc(f.label)}</button>`
      )
      .join('');
    const filterBar = pills
      ? `<div class="filter-bar" data-filter-group="posts" data-reveal>${pills}</div>`
      : '';

    const posts = B.posts
      .map((it) => {
        const t = postTarget(it);
        const kindVal = (it.kind || '').toLowerCase();
        const meta = [it.kind, it.date].filter(Boolean).map(esc).join(' · ');
        return `
        <a class="card tilt post-card" href="${esc(t.href)}"${t.attr} data-filterable data-group="posts" data-tags="${esc(kindVal)}">
          <div class="ph ph-wide">${phImage(it.image, it.title)}${t.isPdf ? pdfBadge : ''}</div>
          <div class="tag-row">${tag(it.tag, 'tag-teal')}${it.kind ? tag(it.kind, 'tag-accent') : ''}</div>
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.excerpt)}</p>
          ${meta ? `<span class="mono post-meta">${meta}</span>` : ''}
        </a>`;
      })
      .join('');
    mount('posts', `
  <section class="section-alt">
    <div class="wrap">
      ${sectionHead(B.postsHead.eyebrow, B.postsHead.title, '')}
      ${filterBar}
      <div data-reveal class="g-3">${posts}</div>
    </div>
  </section>`);

    const cta = B.cta;
    mount('cta', `
  <section>
    <div class="wrap card cta-card cta-sm tilt" data-reveal>
      <div>
        <p class="eyebrow">${esc(cta.eyebrow)}</p>
        <h2>${esc(cta.title)}</h2>
      </div>
      <a href="${esc(cta.button.href)}" class="btn btn-solid">${esc(cta.button.label)}</a>
    </div>
  </section>`);
  }

  // ============================================================
  //  PAGE: CERTIFICATIONS
  // ============================================================
  function renderCertifications() {
    const C = D.certifications;
    if (!C) return;
    mount('hero', pageHero(C.hero, 'certifications'));

    // Filter pills (by category) — reuse the shared filter system.
    const pills = (C.filters || [])
      .map(
        (f, i) =>
          `<button class="filter-pill${i === 0 ? ' is-active' : ''}" data-filter="${esc(f.value)}">${esc(f.label)}</button>`
      )
      .join('');
    const filterBar = pills
      ? `<div class="filter-bar" data-filter-group="certs" data-reveal>${pills}</div>`
      : '';

    const cards = (C.items || [])
      .map((it) => {
        const catVal = (it.category || '').toLowerCase();
        // Bento sizing: important certs can be bigger.
        const size = (it.size || '').toLowerCase();
        const sizeClass =
          size === 'large' ? ' cert-large'
          : size === 'wide' ? ' cert-wide'
          : '';
        const hasFile = !!(it.file && it.file.trim());
        const hasCred = !!(it.credential && it.credential.trim());
        const actions = [
          hasFile
            ? `<a href="${esc(it.file)}" target="_blank" rel="noopener" class="btn btn-solid cert-btn">View certificate →</a>`
            : '',
          hasCred
            ? `<a href="${esc(it.credential)}" target="_blank" rel="noopener" class="btn cert-btn">Verify →</a>`
            : '',
        ].join('');
        const meta = [it.issuer, it.date].filter(Boolean).map(esc).join(' · ');
        return `
        <div class="card tilt cert-card${sizeClass}" data-filterable data-group="certs" data-tags="${esc(catVal)}">
          <div class="ph cert-ph">${phImage(it.image, it.title)}</div>
          <div class="cert-content">
            ${tag(it.category, 'tag-teal')}
            <h3>${esc(it.title)}</h3>
            ${meta ? `<p class="cert-meta">${meta}</p>` : ''}
            ${actions ? `<div class="cert-actions">${actions}</div>` : ''}
          </div>
        </div>`;
      })
      .join('');

    mount('certifications', `
  <section>
    <div class="wrap">
      ${filterBar}
      <div data-reveal class="cert-grid">${cards}</div>
    </div>
  </section>`);
  }

  // ============================================================
  //  PAGE: CONTACT
  // ============================================================
  function renderContact() {
    const C = D.contact;
    const p = D.profile;
    mount('hero', pageHero(C.hero, 'contact'));

    const social = D.socials
      .map(
        (s) =>
          `<li><a href="${esc(s.href)}"${extAttr(s.external)}>${esc(s.label)} <span>→</span></a></li>`
      )
      .join('');

    mount('contact', `
  <section>
    <div class="wrap g-contact">

      <div data-reveal>
        <div class="card tilt contact-card">
          <h3 class="mono card-label">Direct</h3>
          <ul class="contact-list">
            <li class="contact-row">
              <span class="contact-row-label">Email</span>
              <a href="mailto:${esc(p.email)}" class="mono contact-value is-link">${esc(p.email)}</a>
            </li>
            <li class="contact-row">
              <span class="contact-row-label">Mobile</span>
              <a href="${esc(p.phoneHref)}" class="mono contact-value is-link">${esc(p.phone)}</a>
            </li>
            <li class="contact-row">
              <span class="contact-row-label">Location</span>
              <span class="mono contact-value">${esc(p.location)}</span>
            </li>
          </ul>
        </div>

        <div class="card tilt contact-card">
          <h3 class="mono card-label">Elsewhere</h3>
          <ul class="contact-list gap-14 contact-social">${social}</ul>
        </div>
      </div>

      <div class="card tilt contact-card contact-form-card" data-reveal>
        <h3 class="mono card-label">Send a message</h3>
        <form id="contact-form" class="contact-fields">
          <div>
            <label for="name" class="field-label">Name</label>
            <input id="name" name="name" type="text" required placeholder="Your full name" class="field-input">
          </div>
          <div>
            <label for="email" class="field-label">Email</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" class="field-input">
          </div>
          <div>
            <label for="subject" class="field-label">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="Research collaboration, teaching, project…" class="field-input">
          </div>
          <div>
            <label for="message" class="field-label">Message</label>
            <textarea id="message" name="message" rows="5" required placeholder="Tell me a bit about what you have in mind…" class="field-input"></textarea>
          </div>
          <button type="submit" class="btn btn-solid btn-center">Send message</button>
          <p id="form-note" class="mono contact-form-note">${esc(C.formNote)}</p>
        </form>
      </div>

    </div>
  </section>`);

    // Wire up the placeholder form.
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const note = document.getElementById('form-note');
        if (note) note.style.display = 'block';
      });
    }
  }

  // ============================================================
  //  BOOT
  // ============================================================
  function renderPage() {
    // Shared chrome on every page.
    const headerMount = document.querySelector('[data-mount="header"]');
    if (headerMount) headerMount.outerHTML = renderHeader();
    const footerMount = document.querySelector('[data-mount="footer"]');
    if (footerMount) footerMount.outerHTML = renderFooter();

    // Set <title> / description from data if requested.
    document.title = document.title.replace(/\{\{name\}\}/g, D.profile.fullName);

    const page = document.body.getAttribute('data-page');
    switch (page) {
      case 'home':         renderHome();         break;
      case 'publications': renderPublications(); break;
      case 'projects':     renderProjects();     break;
      case 'achievements': renderAchievements(); break;
      case 'certifications': renderCertifications(); break;
      case 'blog':         renderBlog();         break;
      case 'contact':      renderContact();      break;
      default: break;
    }
  }

  // Render before main.js runs its enhancements. main.js listens for
  // DOMContentLoaded; this file also does, and is included first, so the
  // DOM is populated before those handlers fire.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPage);
  } else {
    renderPage();
  }
})();
