// From design/open-design-v3-playful.html (Open Design), adapted for this site.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const cases = JSON.parse($('#cases').textContent);
  const L = document.documentElement.lang === 'id' ? {
    open: 'Buka menu', close: 'Tutup menu',
    count: (n, all) => `${n} proyek${all ? ', terbaru di atas' : ''}`,
    copied: 'Email tersalin. Sampai jumpa di inbox!', copyFail: e => `Gagal menyalin otomatis. Email saya: ${e}`,
    sticker: t => `Stiker ${t}. Geser dengan mouse, jari, atau tombol panah.`,
  } : {
    open: 'Open menu', close: 'Close menu',
    count: (n, all) => `${n} project${n === 1 ? '' : 's'}${all ? ', newest first' : ''}`,
    copied: 'Email copied. Talk soon!', copyFail: e => `Couldn't copy automatically. My email: ${e}`,
    sticker: t => `Sticker: ${t}. Move it with the mouse, touch, or arrow keys.`,
  };

  /* --- bouncing name letters --- */
  $$('[data-split]').forEach(el => {
    el.setAttribute('aria-label', $$('.line', el).map(l => l.textContent.trim()).join(' '));
    let i = 0;
    $$('.line', el).forEach(line => {
      const text = line.textContent.trim();
      line.textContent = '';
      line.setAttribute('aria-hidden', 'true');
      for (const c of text) {
        if (c === ' ') { line.append(' '); continue; } // keep the word gap (and a wrap point)
        const s = document.createElement('span');
        s.className = 'ch';
        s.textContent = c;
        s.style.setProperty('--i', i++);
        line.append(s);
      }
    });
  });

  /* --- rotating roles --- */
  const roles = $$('.role-word');
  if (roles.length > 1 && !reduce) {
    let r = 0;
    setInterval(() => {
      const prev = roles[r];
      prev.classList.remove('is-on'); prev.classList.add('is-out');
      setTimeout(() => prev.classList.remove('is-out'), 400);
      r = (r + 1) % roles.length;
      roles[r].classList.add('is-on');
    }, 2400);
  }

  /* --- marquee loop + Satelit grid art --- */
  const track = $('.marquee-track');
  if (track) track.append(track.firstElementChild.cloneNode(true));
  const grid = $('.work .art-4 .grid');
  if (grid) {
    for (const k of 'onxhxonpxonhxxonxpohnxoxhonx') {
      const i = document.createElement('i');
      if (k === 'o') i.className = 'on'; else if (k === 'h') i.className = 'hot'; else if (k === 'p') i.className = 'pink';
      grid.append(i);
    }
  }

  /* --- reveal on scroll --- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  /* --- nav: mobile menu + active section --- */
  const header = $('.site-header');
  const menuBtn = $('.menu-btn');
  const setMenu = open => {
    header.toggleAttribute('data-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? L.close : L.open);
  };
  menuBtn.addEventListener('click', () => setMenu(!header.hasAttribute('data-open')));
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && header.hasAttribute('data-open')) { setMenu(false); menuBtn.focus(); }
  });

  const navLinks = $$('.nav-links a');
  if ('IntersectionObserver' in window) {
    const navIO = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id)));
    }), { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(a => { const s = $(a.getAttribute('href')); if (s) navIO.observe(s); });
  }

  /* --- progress bar --- */
  const bar = $('.progress');
  let ticking = false;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* --- follower cursor (mouse only) --- */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce) {
    const c = $('.cursor');
    let x = -100, y = -100, cx = -100, cy = -100;
    addEventListener('pointermove', e => {
      x = e.clientX; y = e.clientY;
      c.classList.add('is-on');
      c.classList.toggle('is-big', !!e.target.closest('a, button, .ch'));
    });
    document.addEventListener('pointerleave', () => c.classList.remove('is-on'));
    (function loop() {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      c.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    })();
  }

  /* --- project filters (a project can sit in several categories) --- */
  const worksEl = $('#works');
  const filters = $$('.filter');
  const cards = $$('.work', worksEl);
  const countEl = $('#works-count');
  filters.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    let n = 0;
    cards.forEach(card => {
      const show = f === 'all' || card.dataset.cat.split(' ').includes(f);
      card.hidden = !show;
      if (show) {
        card.classList.add('is-in');
        card.style.setProperty('--i', n++);
        card.classList.remove('pop'); void card.offsetWidth; card.classList.add('pop');
      }
    });
    worksEl.classList.toggle('is-filtered', f !== 'all');
    countEl.textContent = L.count(n, f === 'all');
  }));

  /* --- project detail dialog --- */
  const dlg = $('#case');
  let lastTrigger = null;
  document.addEventListener('click', e => {
    const btn = e.target.closest('.work-open');
    if (!btn) return;
    const p = cases[btn.dataset.id];
    if (!p) return;
    lastTrigger = btn;
    $('#case-title').textContent = p.title;
    $('#case-cat').textContent = p.cat;
    $('#case-desc').textContent = p.desc;
    $('#case-part').textContent = p.part || '—';
    $('#case-tools').textContent = p.tools;
    $('#case-date').textContent = p.date;
    const note = $('#case-note');
    note.textContent = p.note;
    note.hidden = !p.note;
    const repo = $('#case-repo');
    repo.hidden = !p.repo;
    if (p.repo) repo.href = p.repo;
    $('#case-private').hidden = !!p.repo;
    const art = $('#case-art');
    const source = btn.closest('.work').querySelector('.art');
    art.className = `${source.className} case-art`;
    art.innerHTML = source.innerHTML;
    dlg.showModal();
    requestAnimationFrame(() => $('#case-close').focus());
  });
  $('#case-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => {
    const target = lastTrigger && lastTrigger.isConnected && !lastTrigger.closest('[hidden]') ? lastTrigger : $('.filter[aria-pressed="true"]');
    if (target) target.focus();
  });

  /* --- gallery lightbox --- */
  const lb = $('#lightbox');
  document.addEventListener('click', e => {
    const b = e.target.closest('.shot-btn[data-full]');
    if (!b) return;
    $('#lb-img').src = b.dataset.full;
    $('#lb-img').alt = b.dataset.caption;
    $('#lb-cap').textContent = b.dataset.caption;
    lb.showModal();
  });
  $('#lb-close').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });

  /* --- toast --- */
  const toastEl = $('#toast');
  let toastTimer;
  const toast = msg => {
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add('show'));
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
      toastTimer = setTimeout(() => { toastEl.hidden = true; }, 220);
    }, 2600);
  };

  /* --- copy email --- */
  const copyBtn = $('#copy-email');
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      toast(L.copied);
    } catch {
      toast(L.copyFail(email));
    }
  });

  /* --- back to top --- */
  $('#to-top').addEventListener('click', () => {
    scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    $('.logo').focus({ preventScroll: true });
  });

  /* --- sticker board --- */
  const field = $('#playfield');
  const stickers = $$('.sticker', field);
  const pos = new Map();
  let z = 10;
  const place = (s, x, y) => {
    const maxX = Math.max(0, field.clientWidth - s.offsetWidth);
    const maxY = Math.max(0, field.clientHeight - s.offsetHeight);
    x = Math.min(maxX, Math.max(0, x));
    y = Math.min(maxY, Math.max(0, y));
    pos.set(s, { x, y });
    s.style.setProperty('--x', x + 'px');
    s.style.setProperty('--y', y + 'px');
  };
  const scatter = animate => {
    const cols = field.clientWidth >= 900 ? 4 : field.clientWidth >= 560 ? 3 : 2;
    const rows = Math.ceil(stickers.length / cols);
    const cw = field.clientWidth / cols, ch = field.clientHeight / rows;
    const order = stickers.map((s, i) => i).sort(() => Math.random() - 0.5);
    if (animate && !reduce) {
      field.classList.add('is-shuffling');
      setTimeout(() => field.classList.remove('is-shuffling'), 420);
    }
    stickers.forEach((s, i) => {
      const slot = order[i];
      const cx = (slot % cols) * cw + cw / 2, cy = Math.floor(slot / cols) * ch + ch / 2;
      const jx = (Math.random() - 0.5) * cw * 0.3, jy = (Math.random() - 0.5) * ch * 0.3;
      place(s, cx - s.offsetWidth / 2 + jx, cy - s.offsetHeight / 2 + jy);
      s.style.setProperty('--r', `${Math.round((Math.random() - 0.5) * 20)}deg`);
    });
  };
  const lift = s => s.style.setProperty('--z', ++z);

  stickers.forEach(s => {
    let dx = 0, dy = 0, dragging = false;
    s.addEventListener('pointerdown', e => {
      dragging = true;
      s.setPointerCapture(e.pointerId);
      const p = pos.get(s) || { x: 0, y: 0 };
      const rect = field.getBoundingClientRect();
      dx = e.clientX - rect.left - p.x;
      dy = e.clientY - rect.top - p.y;
      s.classList.add('is-drag');
      lift(s);
    });
    s.addEventListener('pointermove', e => {
      if (!dragging) return;
      const rect = field.getBoundingClientRect();
      place(s, e.clientX - rect.left - dx, e.clientY - rect.top - dy);
    });
    const end = () => { dragging = false; s.classList.remove('is-drag'); };
    s.addEventListener('pointerup', end);
    s.addEventListener('pointercancel', end);
    s.addEventListener('keydown', e => {
      const step = e.shiftKey ? 48 : 16;
      const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (!d) return;
      e.preventDefault();
      const p = pos.get(s) || { x: 0, y: 0 };
      lift(s);
      place(s, p.x + d[0], p.y + d[1]);
    });
    s.setAttribute('aria-label', L.sticker(s.textContent.trim()));
  });

  $('#shuffle').addEventListener('click', () => scatter(true));
  scatter(false);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => scatter(false));
  let rt;
  addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => stickers.forEach(s => { const p = pos.get(s); if (p) place(s, p.x, p.y); }), 120);
  });
})();
