/* Интро: ночная карта, страны загораются по маршруту (Армения → Казахстан → Кыргызстан →
 * Таджикистан → Узбекистан) под «тинг», затем общая вспышка «пух!» и надпись «Код дружбы».
 * Показывается один раз за сессию; кнопка «Смотреть интро» в hero запускает его снова.
 */
(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const LAYOUT = {
    am: { cityKey: 'yerevan',   label: [92, 350],  anchor: [70, 435], start: true },
    kz: { cityKey: 'almaty',    label: [590, 250], anchor: null },
    kg: { cityKey: 'bishkek',   label: [870, 585], anchor: [770, 455] },
    tj: { cityKey: 'dushanbe',  label: [640, 640], anchor: [655, 570] },
    uz: { cityKey: 'samarkand', label: [440, 470], anchor: null }
  };
  const $ = (id) => document.getElementById(id);
  const el = (tag, attrs = {}, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let GEO = null, DATA = null, L = null, T = null, parts = {}, runId = 0, built = false, onDone = null, autoTimer = 0;
  let P = [], raf = 0, cv, ctx;

  async function load() {
    if (GEO) return GEO;
    const r = await fetch('data/geo.json');
    GEO = await r.json();
    return GEO;
  }
  function build() {
    const root = $('intro');
    ['iBg', 'iGlows', 'iCountries', 'iRoutes', 'iDots', 'iLabels'].forEach((id) => { $(id).innerHTML = ''; });
    if (!built) GEO.bg.forEach((d) => el('path', { d }, $('iBg')));
    else GEO.bg.forEach((d) => el('path', { d }, $('iBg')));
    parts = {};
    DATA.countries.forEach((c, i) => {
      const lay = LAYOUT[c.id], g = GEO.countries[c.id], color = c.palette[0];
      const glow = el('path', { d: g.d, class: 'i-glow', style: `--c:${color}` }, $('iGlows'));
      const shape = el('path', { d: g.d, class: 'i-cty', style: `--c:${color}` }, $('iCountries'));
      const [cx, cy] = GEO.cities[lay.cityKey];
      const dot = el('circle', { cx, cy, r: 6, class: 'i-dot', style: `--c:${color}` }, $('iDots'));
      const lab = el('g', { class: 'i-label', style: `--c:${color}` }, $('iLabels'));
      if (lay.anchor) el('line', { x1: lay.anchor[0], y1: lay.anchor[1], x2: lay.label[0], y2: lay.label[1] + (lay.label[1] < lay.anchor[1] ? 8 : -26) }, lab);
      const anchor = lay.start ? 'start' : 'middle';
      el('text', { x: lay.label[0], y: lay.label[1], 'text-anchor': anchor }, lab).textContent = L(c.name);
      el('text', { x: lay.label[0], y: lay.label[1] + 22, 'text-anchor': anchor, class: 'city' }, lab).textContent = L(c.city);
      let route = null;
      if (i > 0) {
        const prev = DATA.countries[i - 1];
        const [px, py] = GEO.cities[LAYOUT[prev.id].cityKey];
        const mx = (px + cx) / 2, my = (py + cy) / 2;
        const lift = Math.abs(px - cx) > 300 ? -190 : -40;
        const d = `M${px},${py} Q${mx},${my + lift} ${cx},${cy}`;
        const m = el('mask', { id: `im${i}`, maskUnits: 'userSpaceOnUse' }, $('iRoutes'));
        route = el('path', { d, fill: 'none', stroke: '#fff', 'stroke-width': 10, pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 }, m);
        el('path', { d, class: 'i-route', mask: `url(#im${i})` }, $('iRoutes'));
      }
      parts[c.id] = { glow, shape, dot, lab, route, c };
    });
    built = true;
    root.querySelector('.i-title').innerHTML = `<svg class="i-star" viewBox="0 0 100 100" aria-hidden="true">${window.KD_ORN.ORN.uz}</svg>
      <p class="i-name">${T('hero.title')}</p><p class="i-sub">${T('hero.sub')}</p>
      <div class="i-flags">${DATA.countries.map((c) => window.KD_ORN.svg(c.id, '', c.palette[0])).join('')}</div>`;
  }

  /* Частицы */
  function sizeCanvas() { if (!cv) return; const r = devicePixelRatio || 1; cv.width = innerWidth * r; cv.height = innerHeight * r; ctx.setTransform(r, 0, 0, r, 0, 0); }
  function burst() {
    const cx = innerWidth / 2, cy = innerHeight / 2, small = innerWidth < 600, n = small ? 150 : 260;
    const colors = DATA.countries.flatMap((c) => c.palette).concat(['#FFE3A3', '#FFFFFF']);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, v = 3 + Math.random() * (small ? 9 : 15);
      P.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: 1.5 + Math.random() * 3.5, c: colors[i % colors.length], life: 1, sq: Math.random() < 0.3 });
    }
    cancelAnimationFrame(raf); tick();
  }
  function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    P = P.filter((p) => p.life > 0);
    for (const p of P) {
      p.x += p.vx; p.y += p.vy; p.vx *= 0.965; p.vy = p.vy * 0.965 + 0.06; p.life -= 0.009;
      ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.c;
      if (p.sq) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.life * 6); ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2); ctx.restore(); }
      else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.globalAlpha = 1;
    if (P.length) raf = requestAnimationFrame(tick);
  }

  function reset() {
    const root = $('intro');
    root.classList.remove('all-on', 'boom', 'shake', 'playing', 'leaving');
    Object.values(parts).forEach((p) => {
      ['glow', 'shape', 'dot', 'lab'].forEach((k) => p[k].classList.remove('on'));
      if (p.route) { p.route.getAnimations().forEach((a) => a.cancel()); p.route.setAttribute('stroke-dashoffset', 1); }
    });
    P = []; if (ctx) ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
  async function play() {
    clearTimeout(autoTimer);
    const root = $('intro'), S = window.KD_SOUND;
    $('introStart').hidden = true;
    $('introSound').hidden = false; syncSound();
    const id = ++runId; reset();
    root.classList.add('playing');
    const step = reduce ? 350 : 1350;
    await wait(reduce ? 100 : 500);
    for (let i = 0; i < DATA.countries.length; i++) {
      if (id !== runId) return;
      const c = DATA.countries[i], p = parts[c.id];
      $('introCaption').textContent = `${L(c.name)} · ${L(c.city)}`;
      if (p.route) p.route.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: reduce ? 1 : 650, easing: 'ease-in-out', fill: 'forwards' });
      await wait(p.route && !reduce ? 420 : 0);
      ['shape', 'glow', 'dot', 'lab'].forEach((k) => p[k].classList.add('on'));
      S.ting(i);
      await wait(step);
    }
    if (id !== runId) return;
    $('introCaption').textContent = T('intro.together');
    root.classList.add('all-on');
    S.roll();
    await wait(reduce ? 200 : 1300);
    if (id !== runId) return;
    root.classList.add('boom');
    S.boom(); S.chord(0.35);
    if (!reduce) { root.classList.add('shake'); burst(); }
    await wait(2600);
    if (id === runId) close();
  }
  function close() {
    runId++; clearTimeout(autoTimer);
    const root = $('intro');
    if (root.hidden) return;
    root.classList.add('leaving');
    try { sessionStorage.setItem('kd-intro', '1'); } catch (e) { /* ignore */ }
    setTimeout(() => {
      root.hidden = true; root.classList.remove('leaving');
      document.documentElement.classList.remove('intro-lock');
      cancelAnimationFrame(raf);
      if (onDone) onDone();
    }, reduce ? 0 : 700);
  }
  async function open({ auto = false } = {}) {
    await load();
    build();
    const root = $('intro');
    cv = $('introFx'); ctx = cv.getContext('2d'); sizeCanvas();
    reset();
    root.hidden = false;
    document.documentElement.classList.add('intro-lock');
    $('introStart').hidden = true;
    window.KD_SOUND.armAutoplay();
    play();
    $('introSkip').focus({ preventScroll: true });
  }
  function init(data, langFn, tFn, done) {
    DATA = data; L = langFn; T = tFn; onDone = done;
    addEventListener('resize', sizeCanvas);
    $('introPlay').addEventListener('click', () => { window.KD_SOUND.setEnabled(true); play(); });
    document.addEventListener('kd-sound', syncSound);
    $('introSkip').addEventListener('click', close);
    $('introSound').addEventListener('click', (e) => {
      e.stopPropagation();
      const S = window.KD_SOUND;
      if (S.enabled) S.setEnabled(false);
      else { S.setEnabled(true); S.unlock(); }
      syncSound();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('intro').hidden) close(); });
    let seen = false;
    try { seen = sessionStorage.getItem('kd-intro') === '1'; } catch (e) { /* ignore */ }
    if (location.hash && location.hash !== '#top') seen = true;
    if (!seen) open({ auto: true }); else if (onDone) onDone();
  }
  /* Кнопка внизу: «Выключить звук», пока звук включён (даже если браузер ждёт первого касания, оно сразу его запустит); «Включить звук», если посетитель выключил */
  function syncSound() {
    const b = $('introSound'), S = window.KD_SOUND; if (!b || !T) return;
    const on = S.enabled;
    b.innerHTML = on ? `🔇 ${T('intro.mute')}` : `🔊 ${T('intro.sound')}`;
    b.setAttribute('aria-pressed', String(on));
  }
  function relabel() { if (built && !$('intro').hidden) build(); }
  window.KD_INTRO = { init, open, close, relabel };
})();
