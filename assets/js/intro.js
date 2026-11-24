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

  /* Флаги стран (упрощённо) в прямоугольнике w×h: ими заливаются страны на карте и мини-флажки в финале */
  function flagSVG(id, w, h) {
    const r = (x, y, ww, hh, f) => `<rect x="${x}" y="${y}" width="${ww}" height="${hh}" fill="${f}"/>`;
    const m = Math.min(w, h);
    switch (id) {
      case 'am': return r(0, 0, w, h / 3 + 0.5, '#D90012') + r(0, h / 3, w, h / 3 + 0.5, '#0033A0') + r(0, 2 * h / 3, w, h / 3, '#F2A800');
      case 'kz': {
        const cx = w * 0.52, cy = h * 0.46, R = m * 0.16;
        let rays = '';
        for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; rays += `<line x1="${cx + Math.cos(a) * R * 1.25}" y1="${cy + Math.sin(a) * R * 1.25}" x2="${cx + Math.cos(a) * R * 1.75}" y2="${cy + Math.sin(a) * R * 1.75}" stroke="#FEC50C" stroke-width="${R * 0.18}" stroke-linecap="round"/>`; }
        return r(0, 0, w, h, '#00AFCA') + rays + `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#FEC50C"/>` + r(w * 0.07, h * 0.08, w * 0.035, h * 0.84, '#FEC50C');
      }
      case 'kg': {
        const cx = w * 0.5, cy = h * 0.5, R = m * 0.24;
        let rays = '';
        for (let k = 0; k < 40; k++) { const a = k * Math.PI / 20; rays += `<line x1="${cx + Math.cos(a) * R * 0.9}" y1="${cy + Math.sin(a) * R * 0.9}" x2="${cx + Math.cos(a) * R * 1.45}" y2="${cy + Math.sin(a) * R * 1.45}" stroke="#FFC61A" stroke-width="${R * 0.07}"/>`; }
        return r(0, 0, w, h, '#E8112D') + rays + `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#FFC61A"/><circle cx="${cx}" cy="${cy}" r="${R * 0.62}" fill="#E8112D"/>` +
          `<path d="M${cx - R * 0.62} ${cy} Q${cx} ${cy - R * 0.5} ${cx + R * 0.62} ${cy} M${cx - R * 0.55} ${cy + R * 0.25} Q${cx} ${cy - R * 0.2} ${cx + R * 0.55} ${cy + R * 0.25}" stroke="#FFC61A" stroke-width="${R * 0.09}" fill="none"/>`;
      }
      case 'tj': {
        const cx = w * 0.5, cy = h * 0.5, R = h * 0.13;
        let stars = '';
        for (let k = 0; k < 7; k++) { const a = Math.PI + (k / 6) * Math.PI; stars += `<circle cx="${cx + Math.cos(a) * R * 1.5}" cy="${cy + R * 0.25 + Math.sin(a) * R * 1.2}" r="${R * 0.16}" fill="#F8C300"/>`; }
        return r(0, 0, w, h * 2 / 7 + 0.5, '#CC0000') + r(0, h * 2 / 7, w, h * 3 / 7 + 0.5, '#FFFFFF') + r(0, h * 5 / 7, w, h * 2 / 7, '#006600') +
          `<path d="M${cx - R * 0.7} ${cy + R * 0.7} L${cx - R * 0.7} ${cy + R * 0.1} L${cx - R * 0.35} ${cy + R * 0.4} L${cx} ${cy - R * 0.1} L${cx + R * 0.35} ${cy + R * 0.4} L${cx + R * 0.7} ${cy + R * 0.1} L${cx + R * 0.7} ${cy + R * 0.7} Z" fill="#F8C300"/>` + stars;
      }
      case 'uz': {
        const b = h * 0.32, t = h * 0.025;
        const cx = w * 0.13, cy = b * 0.5, R = b * 0.34;
        let stars = '';
        for (let row = 0; row < 3; row++) for (let k = 0; k < 3 + row; k++) stars += `<circle cx="${cx + R * 1.2 + (k + (2 - row) * 0.5) * R * 0.55}" cy="${cy - R * 0.6 + row * R * 0.6}" r="${R * 0.11}" fill="#fff"/>`;
        return r(0, 0, w, b, '#0099B5') + r(0, b, w, t, '#CE1126') + r(0, b + t, w, h - 2 * b - 2 * t, '#FFFFFF') + r(0, h - b - t, w, t, '#CE1126') + r(0, h - b, w, b, '#1EB53A') +
          `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff"/><circle cx="${cx + R * 0.35}" cy="${cy}" r="${R * 0.85}" fill="#0099B5"/>` + stars;
      }
    }
    return '';
  }
  function miniFlag(id) { return `<svg class="i-mflag" viewBox="0 0 60 40" aria-hidden="true">${flagSVG(id, 60, 40)}</svg>`; }
  function build() {
    const root = $('intro');
    ['iBg', 'iGlows', 'iCountries', 'iRoutes', 'iDots', 'iLabels'].forEach((id) => { $(id).innerHTML = ''; });
    if (!built) GEO.bg.forEach((d) => el('path', { d }, $('iBg')));
    else GEO.bg.forEach((d) => el('path', { d }, $('iBg')));
    parts = {};
    const defs = el('defs', {}, $('iCountries'));
    DATA.countries.forEach((c, i) => {
      const lay = LAYOUT[c.id], g = GEO.countries[c.id], color = c.palette[0];
      const glow = el('path', { d: g.d, class: 'i-glow', style: `--c:${color}` }, $('iGlows'));
      const shape = el('path', { d: g.d, class: 'i-cty', style: `--c:${color}` }, $('iCountries'));
      // Заливка флагом страны поверх тёмного контура
      const [[x0, y0], [x1, y1]] = g.b, fw = x1 - x0, fh = y1 - y0;
      const pat = el('pattern', { id: `iflag-${c.id}`, patternUnits: 'userSpaceOnUse', x: x0, y: y0, width: fw, height: fh }, defs);
      pat.innerHTML = flagSVG(c.id, fw, fh);
      const flag = el('path', { d: g.d, class: 'i-flag', fill: `url(#iflag-${c.id})` }, $('iCountries'));
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
      parts[c.id] = { glow, shape, flag, dot, lab, route, c };
    });
    built = true;
    root.querySelector('.i-title').innerHTML = `<svg class="i-star" viewBox="0 0 100 100" aria-hidden="true">${window.KD_ORN.ORN.uz}</svg>
      <p class="i-name">${T('hero.title')}</p><p class="i-sub">${T('hero.sub')}</p>
      <div class="i-flags">${DATA.countries.map((c) => `<span class="i-fl">${miniFlag(c.id)}${window.KD_ORN.svg(c.id, '', c.palette[0])}</span>`).join('')}</div>`;
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
      ['glow', 'shape', 'flag', 'dot', 'lab'].forEach((k) => p[k].classList.remove('on'));
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
      ['shape', 'flag', 'glow', 'dot', 'lab'].forEach((k) => p[k].classList.add('on'));
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
