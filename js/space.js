// ============================================================
//  GLASSMORPHISM BACKGROUND — blurred translucent shapes
// ============================================================
//  Builds a fixed layer of large, soft, heavily-blurred color
//  shapes that drift slowly behind all content. Combined with the
//  frosted (backdrop-filter) panels and cards, this creates a true
//  glassmorphism look. Shapes also shift subtly with scroll and
//  mouse for gentle depth/parallax.
//  Self-contained, respects reduced-motion.
// ============================================================

(function () {
  const REDUCED =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- container (replaces any previous canvas of the same id) ----
  let layer = document.getElementById('space-bg');
  if (layer && layer.tagName === 'CANVAS') layer.remove(), (layer = null);
  if (!layer) {
    layer = document.createElement('div');
    layer.id = 'space-bg';
    layer.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(layer, document.body.firstChild);
  }
  layer.innerHTML = '';

  // Shape definitions: color + start position (%) + size (vmax) + depth.
  // A warm gold-leaning palette for a royal / premium ambience.
  // Depth (0 far .. 1 near) drives parallax strength and float distance.
  const SHAPES = [
    { color: 'var(--accent)',   x: 10, y: 8,  size: 46, depth: 0.3,  dur: 30 }, // gold
    { color: '#C9962E',         x: 84, y: 14, size: 40, depth: 0.55, dur: 34 }, // deep gold
    { color: 'var(--accent-2)', x: 76, y: 80, size: 48, depth: 0.85, dur: 32 }, // teal
    { color: 'var(--accent)',   x: 18, y: 86, size: 38, depth: 0.45, dur: 38 }, // gold
    { color: '#7a5cff',         x: 46, y: 46, size: 34, depth: 0.7,  dur: 29 }, // soft violet
    { color: 'var(--accent-2)', x: 60, y: 22, size: 30, depth: 0.2,  dur: 42 }, // teal
  ];

  const blobs = SHAPES.map((s, i) => {
    const el = document.createElement('span');
    el.className = 'glass-blob';
    el.style.setProperty('--c', s.color);
    el.style.setProperty('--size', s.size + 'vmax');
    el.style.left = s.x + '%';
    el.style.top = s.y + '%';
    el.style.animationDuration = s.dur + 's';
    el.style.animationDelay = (-i * 3.5) + 's';
    layer.appendChild(el);
    return { el, depth: s.depth, sx: 0, sy: 0, tx: 0, ty: 0 };
  });

  if (REDUCED) return; // static shapes, no parallax motion

  // ---- gentle scroll + mouse parallax ----
  let pointerX = 0, pointerY = 0;
  let scrollY = 0;
  let ticking = false;

  function apply() {
    ticking = false;
    for (const b of blobs) {
      // target offsets: scroll pushes shapes up a little, mouse nudges them
      const targetX = pointerX * 40 * b.depth;
      const targetY = pointerY * 40 * b.depth - scrollY * (0.04 + b.depth * 0.12);
      // ease toward target for smoothness
      b.tx += (targetX - b.tx) * 0.12;
      b.ty += (targetY - b.ty) * 0.12;
      b.el.style.transform = `translate3d(${b.tx.toFixed(1)}px, ${b.ty.toFixed(1)}px, 0)`;
    }
    // keep easing until settled
    if (blobs.some((b) => Math.abs(b.tx) > 0.2 || Math.abs(b.ty) > 0.2 || moving)) {
      requestAnimationFrame(apply);
    }
  }

  let moving = false;
  let settleTimer = 0;
  function request() {
    moving = true;
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => { moving = false; }, 400);
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  }

  window.addEventListener(
    'scroll',
    () => {
      scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      request();
    },
    { passive: true }
  );
  window.addEventListener(
    'mousemove',
    (e) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
      request();
    },
    { passive: true }
  );

  request();
})();
