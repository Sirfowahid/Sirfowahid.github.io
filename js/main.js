// ============================================================
// Shared site behavior: theme switching + mobile nav + reveal
// ============================================================

(function () {
  const root = document.documentElement;
  const STORAGE_KEY = 'mmh-portfolio-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-toggle button').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.theme === theme);
    });
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    applyTheme(saved || 'console');
  }

  document.addEventListener('DOMContentLoaded', () => {
    safeRun(initTheme);
    safeRun(initHeaderHeightSync);
    safeRun(initThemeToggleButtons);
    safeRun(initMobileNav);
    safeRun(initActiveNavLink);
    safeRun(initRevealOnScroll);

    safeRun(initCustomCursor);
    safeRun(initScrollProgress);
    safeRun(initMeshParallax);
    safeRun(initTiltCards);
    safeRun(initMagnetic);
    safeRun(initCounters);
    safeRun(initRoleCycler);
    safeRun(initFilterPills);
    safeRun(initPageTransitions);
  });

  // run each enhancement in its own try/catch so a failure in one
  // (e.g. a browser blocking a particular API) can never prevent the
  // others from working
  function safeRun(fn) {
    try { fn(); } catch (err) {
      if (window.console && console.warn) console.warn('[portfolio] feature failed to init:', fn.name, err);
    }
  }

  // ---------------- HEADER HEIGHT SYNC ----------------
  function initHeaderHeightSync() {
    // keep the mobile nav dropdown anchored exactly below the header,
    // regardless of how tall the header actually renders (font loading,
    // wrapping, zoom level, etc.)
    const header = document.querySelector('.site-header');
    function syncHeaderHeight() {
      if (header) {
        document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
      }
    }
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncHeaderHeight).catch(() => {});
    }
  }

  // ---------------- THEME TOGGLE BUTTONS ----------------
  function initThemeToggleButtons() {
    document.querySelectorAll('.theme-toggle button').forEach((btn) => {
      btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
    });
  }

  // ---------------- MOBILE NAV ----------------
  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
      });
      navLinks.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => navLinks.classList.remove('open'))
      );
    }
  }

  // ---------------- ACTIVE NAV LINK ----------------
  function initActiveNavLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  // ---------------- REVEAL ON SCROLL ----------------
  function initRevealOnScroll() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && revealEls.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach((el) => io.observe(el));

      // safety net: in case observer misses an element (e.g. printing,
      // very short pages, or a browser quirk), reveal everything shortly after load
      window.setTimeout(() => {
        revealEls.forEach((el) => el.classList.add('is-visible'));
      }, 2500);
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  }

  function detectPrefersReduced() {
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) { return false; }
  }
  function detectFinePointer() {
    try {
      return !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    } catch (e) { return false; }
  }
  const PREFERS_REDUCED = detectPrefersReduced();
  const IS_FINE_POINTER = detectFinePointer();

  // ---------------- CUSTOM CURSOR ----------------
  function initCustomCursor() {
    if (PREFERS_REDUCED || !IS_FINE_POINTER) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });

    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    const hoverSelector = 'a, button, .btn, .card, .tilt, input, textarea, .filter-pill, .theme-toggle button, .ph';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSelector)) {
        dot.classList.add('is-hovering');
        ring.classList.add('is-hovering');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSelector)) {
        dot.classList.remove('is-hovering');
        ring.classList.remove('is-hovering');
      }
    });
  }

  // ---------------- SCROLL PROGRESS BAR ----------------
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    function update() {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = h.scrollHeight - h.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  // ---------------- FLOATING SHAPES PARALLAX ----------------
  function initMeshParallax() {
    if (PREFERS_REDUCED || !IS_FINE_POINTER) return;
    document.querySelectorAll('.shapes-bg').forEach((mesh) => {
      const container = mesh.closest('.hero-section') || mesh.closest('.page-hero');
      if (!container) return;
      const shapes = mesh.querySelectorAll('.float-shape');

      container.addEventListener('mousemove', (e) => {
        const rect = mesh.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        shapes.forEach((s, i) => {
          const strength = 10 + (i % 3) * 8;
          s.style.translate = `${px * strength}px ${py * strength}px`;
        });
      });
    });
  }

  // ---------------- TILT CARDS ----------------
  function initTiltCards() {
    if (PREFERS_REDUCED || !IS_FINE_POINTER) return;
    document.querySelectorAll('.tilt').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = x / rect.width;
        const py = y / rect.height;
        const rotX = (py - 0.5) * -8;
        const rotY = (px - 0.5) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
        card.style.setProperty('--mx', px * 100 + '%');
        card.style.setProperty('--my', py * 100 + '%');
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ---------------- MAGNETIC BUTTONS ----------------
  function initMagnetic() {
    if (PREFERS_REDUCED || !IS_FINE_POINTER) return;
    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0,0)';
      });
    });
  }

  // ---------------- ANIMATED COUNTERS ----------------
  function initCounters() {
    const counters = document.querySelectorAll('.counter[data-target]');
    if (!counters.length) return;

    function animate(el) {
      if (el.dataset.counted) return;
      el.dataset.counted = 'true';
      const target = parseFloat(el.dataset.target);
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      if (PREFERS_REDUCED) {
        el.textContent = target.toFixed(decimals) + suffix;
      } else {
        requestAnimationFrame(tick);
      }
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate(entry.target);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((c) => io.observe(c));

      // safety net: guarantee every counter eventually shows its real value
      window.setTimeout(() => {
        counters.forEach((c) => {
          if (!c.dataset.counted) animate(c);
        });
      }, 3000);
    } else {
      counters.forEach(animate);
    }
  }

  // ---------------- ROLE CYCLER ----------------
  function initRoleCycler() {
    const el = document.querySelector('.role-cycler');
    if (!el) return;
    const words = (el.dataset.words || '').split('|').filter(Boolean);
    if (!words.length) return;

    el.innerHTML = words
      .map((w, i) => `<span class="rc-word${i === 0 ? ' rc-active' : ''}">${w}</span>`)
      .join('');

    if (PREFERS_REDUCED) return;

    let i = 0;
    setInterval(() => {
      const spans = el.querySelectorAll('.rc-word');
      spans[i].classList.remove('rc-active');
      i = (i + 1) % spans.length;
      spans[i].classList.add('rc-active');
    }, 2200);
  }

  // ---------------- FILTER PILLS ----------------
  function initFilterPills() {
    document.querySelectorAll('.filter-bar').forEach((bar) => {
      const targetGroup = bar.dataset.filterGroup;
      const items = document.querySelectorAll(`[data-filterable][data-group="${targetGroup}"]`);
      const pills = bar.querySelectorAll('.filter-pill');

      pills.forEach((pill) => {
        pill.addEventListener('click', () => {
          pills.forEach((p) => p.classList.remove('is-active'));
          pill.classList.add('is-active');
          const filter = pill.dataset.filter;

          items.forEach((item) => {
            const tags = (item.dataset.tags || '').split(',');
            const show = filter === 'all' || tags.includes(filter);
            item.classList.toggle('filter-hide', !show);
          });
        });
      });
    });
  }

  // ---------------- PAGE TRANSITIONS ----------------
  function initPageTransitions() {
    if (PREFERS_REDUCED) return;
    const wipe = document.createElement('div');
    wipe.className = 'page-wipe';
    document.body.appendChild(wipe);

    document.querySelectorAll('a').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank') {
        return;
      }
      a.addEventListener('click', (e) => {
        e.preventDefault();
        wipe.classList.add('is-active');
        setTimeout(() => { window.location.href = href; }, 230);
      });
    });
  }
})();
