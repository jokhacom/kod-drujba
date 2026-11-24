/* «Код дружбы» — логика страницы. Данные маршрута лежат в data/routes.json. */
(() => {
  'use strict';

  const I18N = {
    ru: {
      skip: 'К маршруту', brand: 'Код дружбы',
      'nav.map': 'Карта', 'nav.route': 'Программа', 'nav.gallery': 'Галерея', 'nav.ar': 'AR', 'nav.tips': 'Полезно', 'nav.team': 'Команда',
      'hero.eyebrow': 'Международная школа Студтуризма', 'hero.title': 'Код дружбы', 'hero.sub': '5 стран, 9 дней, одна дружба',
      'hero.cta': 'Смотреть маршрут', 'hero.credit': 'Фото: озеро Кольсай',
      'map.kicker': 'Интерактивная карта', 'map.title': 'Алматы → Бишкек → Душанбе → Самарканд → Ереван',
      'map.lead': 'Нажмите на точку, чтобы увидеть фото, время и описание. Фильтр показывает одну страну.',
      'map.all': 'Весь маршрут', 'map.toProgram': 'Открыть в программе →', 'map.extra': 'Дополнительный тур',
      'map.loading': 'Загружаем карту…', 'map.error': 'Карта не загрузилась. Проверьте интернет и обновите страницу.',
      day: 'День', step: 'Точка', onMap: 'На карте', openAr: 'Открыть в AR', arLink: 'Смотреть в AR',
      noTiming: 'Порядок точек без почасового тайминга',
      'ph.soon': 'Фото скоро', 'ph.attr': 'Автор · лицензия',
      'gallery.kicker': 'Галерея', 'gallery.title': 'Маршрут в кадрах',
      'gallery.lead': 'Фото остальных стран появятся по мере подбора, у каждого будет указан автор и лицензия.',
      'ar.kicker': 'Дополненная реальность', 'ar.title': 'Поставьте Регистан у себя на столе',
      'ar.lead': 'Покрутите макет пальцем или мышью. На телефоне нажмите «Открыть в AR», на компьютере отсканируйте QR-код.',
      'ar.note': 'Это упрощённые стилизованные макеты. Детальные модели можно заменить в папке assets/models без правки кода.',
      'ar.qr': 'Наведите камеру телефона, чтобы открыть в AR', 'ar.loading': 'Загружаем 3D…', 'ar.unsupported': 'AR на этом устройстве недоступен, но макет можно покрутить',
      'tips.kicker': 'Перед поездкой', 'tips.title': 'Полезно знать',
      'tips.dress.t': 'Дресс-код', 'tips.dress.d': 'В мечетях и мавзолеях плечи и колени должны быть закрыты. Девушкам пригодится лёгкий платок.',
      'tips.shoes.t': 'Удобная обувь', 'tips.shoes.d': 'Много ходьбы по городу, каньонам и горным тропам. Возьмите кроссовки, головной убор и воду.',
      'tips.time.t': 'Тайминг ориентировочный', 'tips.time.d': 'Время зависит от погоды, дорог и работы канатных дорог. Перед выездом сверяйтесь с навигатором и гидом.',
      'tips.docs.t': 'Документы и связь', 'tips.docs.d': 'Маршрут пересекает пять границ. Проверьте требования к въезду для своего гражданства и подключите роуминг или местную SIM.',
      'team.kicker': 'Кто это сделал', 'team.title': 'Команда проекта',
      'contacts.title': 'Поехали вместе', 'contacts.lead': 'Вопросы о маршруте и бронирование', 'contacts.tg': 'Telegram',
      'footer.copy': '«Код дружбы» · Международная школа Студтуризма', 'footer.map': 'Карта', 'footer.photos': 'Фото Казахстана',
      photo: 'Фото', close: 'Закрыть'
    },
    en: {
      skip: 'Skip to route', brand: 'Friendship Code',
      'nav.map': 'Map', 'nav.route': 'Itinerary', 'nav.gallery': 'Gallery', 'nav.ar': 'AR', 'nav.tips': 'Tips', 'nav.team': 'Team',
      'hero.eyebrow': 'International Student Tourism School', 'hero.title': 'Friendship Code', 'hero.sub': '5 countries, 9 days, one friendship',
      'hero.cta': 'See the route', 'hero.credit': 'Photo: Lake Kolsai',
      'map.kicker': 'Interactive map', 'map.title': 'Almaty → Bishkek → Dushanbe → Samarkand → Yerevan',
      'map.lead': 'Tap a point to see a photo, time and description. Use the filter to focus on one country.',
      'map.all': 'Whole route', 'map.toProgram': 'Open in itinerary →', 'map.extra': 'Optional trip',
      'map.loading': 'Loading map…', 'map.error': 'The map failed to load. Check your connection and refresh.',
      day: 'Day', step: 'Stop', onMap: 'On the map', openAr: 'View in AR', arLink: 'View in AR',
      noTiming: 'Stops in order, no hourly timing',
      'ph.soon': 'Photo coming soon', 'ph.attr': 'Author · licence',
      'gallery.kicker': 'Gallery', 'gallery.title': 'The route in pictures',
      'gallery.lead': 'Photos of the other countries are on the way, each with its author and licence.',
      'ar.kicker': 'Augmented reality', 'ar.title': 'Put the Registan on your desk',
      'ar.lead': 'Spin the model with a finger or mouse. On a phone tap “View in AR”, on a computer scan the QR code.',
      'ar.note': 'These are simplified stylised models. Detailed ones can be dropped into assets/models without code changes.',
      'ar.qr': 'Point your phone camera here to open in AR', 'ar.loading': 'Loading 3D…', 'ar.unsupported': 'AR isn’t available on this device, but you can still spin the model',
      'tips.kicker': 'Before you go', 'tips.title': 'Good to know',
      'tips.dress.t': 'Dress code', 'tips.dress.d': 'Shoulders and knees must be covered in mosques and mausoleums. A light scarf is handy for women.',
      'tips.shoes.t': 'Comfortable shoes', 'tips.shoes.d': 'Lots of walking in cities, canyons and on mountain trails. Bring trainers, a hat and water.',
      'tips.time.t': 'Timing is approximate', 'tips.time.d': 'Times depend on weather, roads and cable cars. Check with your navigator and guide before setting off.',
      'tips.docs.t': 'Documents & connectivity', 'tips.docs.d': 'The route crosses five borders. Check entry rules for your citizenship and set up roaming or a local SIM.',
      'team.kicker': 'Who made it', 'team.title': 'Project team',
      'contacts.title': 'Travel with us', 'contacts.lead': 'Questions and bookings', 'contacts.tg': 'Telegram',
      'footer.copy': '“Friendship Code” · International Student Tourism School', 'footer.map': 'Map', 'footer.photos': 'Kazakhstan photos',
      photo: 'Photo', close: 'Close'
    }
  };

  const COLORS = { kz: '#1BA8A6', kg: '#D9534F', tj: '#3C8D4F', uz: '#2F6FD0', am: '#E08A1E' };
  const TEAM_COLORS = ['#D4A23C', '#1BA8A6', '#2F6FD0', '#3C8D4F', '#D9534F'];
  const MODEL_VIEWER_SRC = 'assets/vendor/model-viewer/model-viewer.min.js';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let DATA = null;
  let lang = 'ru';
  try { lang = localStorage.getItem('kd-lang') || 'ru'; } catch (e) { /* storage blocked */ }
  if (!I18N[lang]) lang = 'ru';
  const t = (k) => I18N[lang][k] ?? I18N.ru[k] ?? k;
  const L = (o) => (o && typeof o === 'object' ? (o[lang] ?? o.ru ?? '') : (o ?? ''));
  const activeDay = {};
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));

  /* ---------- Photos ---------- */
  function photo(p, point) {
    if (!p) return null;
    const meta = DATA.meta;
    if (typeof p === 'string') {
      return { src: `assets/img/${p}.webp`, sm: `assets/img/${p}-sm.webp`, author: meta.photoCredit, license: L(meta.photoLicense), caption: L(point?.photoCaption) || L(point?.name) };
    }
    return { src: p.src, sm: p.sm || p.src, author: p.author || '', license: L(p.license) || p.license || '', url: p.url, caption: L(p.caption) || L(point?.name) };
  }
  const credit = (ph) => [ph.author, ph.license].filter(Boolean).join(' · ');
  const placeholder = (name) => `<div class="ph" role="img" aria-label="${esc(name)}: ${esc(t('ph.soon'))}"><b>${esc(name)}</b><small>${esc(t('ph.soon'))} · ${esc(t('ph.attr'))}</small></div>`;

  /* ---------- Lightbox ---------- */
  const lb = { list: [], i: 0 };
  function openLightbox(list, i) {
    lb.list = list; lb.i = i;
    const box = $('#lightbox');
    box.hidden = false; document.body.style.overflow = 'hidden';
    showLb(); $('.lb-close', box).focus();
  }
  function showLb() {
    const ph = lb.list[lb.i];
    $('#lbImg').src = ph.src; $('#lbImg').alt = ph.caption;
    $('#lbCap').innerHTML = `${esc(ph.caption)}<small>${esc(t('photo'))}: ${esc(credit(ph))}</small>`;
    const many = lb.list.length > 1;
    $('.lb-prev').hidden = !many; $('.lb-next').hidden = !many;
  }
  function closeLightbox() { $('#lightbox').hidden = true; document.body.style.overflow = ''; }
  function initLightbox() {
    const box = $('#lightbox');
    $('.lb-close', box).addEventListener('click', closeLightbox);
    $('.lb-prev', box).addEventListener('click', () => { lb.i = (lb.i - 1 + lb.list.length) % lb.list.length; showLb(); });
    $('.lb-next', box).addEventListener('click', () => { lb.i = (lb.i + 1) % lb.list.length; showLb(); });
    box.addEventListener('click', (e) => { if (e.target === box) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (box.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') $('.lb-prev', box).click();
      if (e.key === 'ArrowRight') $('.lb-next', box).click();
    });
  }

  /* ---------- Static i18n ---------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $('#heroAuthor').textContent = DATA?.meta.photoCredit || '';
    $('#footerAuthor').textContent = DATA ? `${DATA.meta.photoCredit} (${L(DATA.meta.photoLicense)})` : '';
  }

  /* ---------- Hero, filters, nav ---------- */
  function renderHero() {
    $('#heroCountries').innerHTML = DATA.countries.map((c) => `<li>${esc(L(c.name))}</li>`).join('');
  }
  function renderCountryNav() {
    $('#countryNav').innerHTML = DATA.countries.map((c) =>
      `<a href="#c-${c.id}" style="--c:${COLORS[c.id]}"><span class="dot"></span>${esc(L(c.name))}</a>`).join('');
    $('#mapFilter').innerHTML = `<button class="chip" type="button" data-filter="all" aria-pressed="${mapState.filter === 'all'}">${esc(t('map.all'))}</button>` +
      DATA.countries.map((c) => `<button class="chip" type="button" data-filter="${c.id}" style="--c:${COLORS[c.id]}" aria-pressed="${mapState.filter === c.id}"><span class="dot"></span>${esc(L(c.name))}</button>`).join('');
  }

  /* ---------- Countries ---------- */
  function timeLabel(c, p) {
    if (c.noTiming) return `№${esc(p.time)}`;
    return p.time ? esc(p.time) : '•';
  }
  function renderDay(c, di) {
    const day = c.days[di];
    const items = day.points.map((p, pi) => {
      const ph = photo(p.photo, p);
      const isMain = p.tags.includes('main');
      const showMedia = ph || isMain;
      const media = ph
        ? `<button class="tl-media" type="button" data-lb="${c.id}|${di}|${pi}" aria-label="${esc(t('photo'))}: ${esc(L(p.name))}"><img src="${ph.sm}" alt="${esc(ph.caption)}" loading="lazy" decoding="async" width="640" height="400"></button>`
        : (isMain ? `<div class="tl-media is-ph">${placeholder(L(p.name))}</div>` : '');
      const badges = p.tags.map((tg) => `<span class="badge ${tg}">${esc(L(DATA.tags[tg]))}</span>`).join('');
      const actions = [
        p.coords ? `<button class="tl-map" type="button" data-goto="${c.id}-${di}-${pi}">📍 ${esc(t('onMap'))}</button>` : '',
        p.ar ? `<a class="tl-map tl-ar" href="#ar-${p.ar}">◈ ${esc(t('arLink'))}</a>` : ''
      ].join('');
      return `<li class="tl-item${isMain ? ' is-main' : ''}" id="p-${c.id}-${di}-${pi}">
        <div class="tl-time">${timeLabel(c, p)}</div>
        <div class="tl-card${showMedia ? ' has-media' : ''}">
          ${media}
          <div>
            <h3>${esc(L(p.name))}</h3>
            <p>${esc(L(p.desc))}</p>
            ${ph ? `<p class="tl-credit">${esc(t('photo'))}: ${esc(credit(ph))}</p>` : ''}
            ${badges ? `<div class="badges">${badges}</div>` : ''}
            ${actions}
          </div>
        </div>
      </li>`;
    }).join('');
    return `<p class="day-sub"><b>${esc(L(day.title))}.</b> ${esc(L(day.subtitle))}${c.noTiming ? ` · ${esc(t('noTiming'))}` : ''}</p><ol class="timeline">${items}</ol>`;
  }
  function renderCountries() {
    $('#countryBlocks').innerHTML = DATA.countries.map((c, ci) => {
      const di = activeDay[c.id] || 0;
      const tabs = c.days.length > 1
        ? `<div class="day-tabs" role="tablist" aria-label="${esc(L(c.name))}">${c.days.map((d, i) =>
            `<button class="day-tab" role="tab" type="button" id="tab-${c.id}-${i}" aria-controls="panel-${c.id}" aria-selected="${i === di}" data-country="${c.id}" data-day="${i}">${esc(t('day'))} ${i + 1} · ${esc(L(d.title))}</button>`).join('')}</div>`
        : `<div class="day-tabs"><span class="day-tab" aria-selected="true">${esc(t('day'))} 1 · ${esc(L(c.days[0].title))}</span></div>`;
      let extra = '';
      if (c.extra) {
        extra = `<aside class="extra reveal"><h3>${esc(L(c.extra.title))}</h3><p>${esc(L(c.extra.text))}</p>
          <div class="extra-photos">${c.extra.photos.map((p, i) => {
            const ph = photo(p, c.extra.points[0]);
            return `<button type="button" data-lb-extra="${c.id}|${i}" aria-label="${esc(t('photo'))} ${i + 1}"><img src="${ph.sm}" alt="${esc(L(c.extra.points[0].name))}" loading="lazy" decoding="async"></button>`;
          }).join('')}</div></aside>`;
      }
      return `<article class="country" id="c-${c.id}" style="--c:${COLORS[c.id]}">
        <div class="container">
          <header class="country-head reveal">
            <div class="country-num" aria-hidden="true">0${ci + 1}</div>
            <div>
              <h2>${esc(L(c.name))}</h2>
              <p class="country-city">${esc(L(c.city))}</p>
              <p class="lead">${esc(L(c.intro))}</p>
            </div>
          </header>
          ${tabs}
          <div class="day-panel" id="panel-${c.id}" role="tabpanel">${renderDay(c, di)}</div>
          <p class="country-note">${esc(L(c.note))}</p>
          ${extra}
        </div>
      </article>`;
    }).join('');
    observeReveal();
  }
  function selectDay(cid, di) {
    activeDay[cid] = di;
    const c = DATA.countries.find((x) => x.id === cid);
    $(`#panel-${cid}`).innerHTML = renderDay(c, di);
    $$(`.day-tab[data-country="${cid}"]`).forEach((b) => b.setAttribute('aria-selected', String(+b.dataset.day === di)));
  }

  /* ---------- Gallery ---------- */
  let galleryList = [];
  function renderGallery() {
    const items = [];
    galleryList = [];
    DATA.countries.forEach((c) => {
      let phCount = 0;
      c.days.forEach((d) => d.points.forEach((p) => {
        const ph = photo(p.photo, p);
        if (ph) items.push({ ph });
        else if (p.tags.includes('main') && phCount < 2) { phCount++; items.push({ name: L(p.name), country: L(c.name) }); }
      }));
      if (c.extra) c.extra.photos.forEach((p) => items.push({ ph: photo(p, c.extra.points[0]) }));
    });
    $('#galleryGrid').innerHTML = items.map((it, i) => {
      if (it.ph) {
        const idx = galleryList.push(it.ph) - 1;
        return `<button class="g-item" type="button" data-gal="${idx}"><img src="${it.ph.sm}" alt="${esc(it.ph.caption)}" loading="lazy" decoding="async"><figcaption>${esc(it.ph.caption)}</figcaption></button>`;
      }
      return `<div class="g-item is-ph${i % 3 === 0 ? ' tall' : ''}">${placeholder(`${it.name} · ${it.country}`)}</div>`;
    }).join('');
  }

  /* ---------- Team & contacts ---------- */
  function renderTeam() {
    $('#teamGrid').innerHTML = DATA.team.map((g, i) => `<article class="team-card reveal" style="--c:${TEAM_COLORS[i % TEAM_COLORS.length]}">
      <h3>${esc(L(g.group))}</h3><p class="role">${esc(L(g.role))}</p>
      <ul>${g.people.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></article>`).join('');
    const tg = $('#tgLink');
    tg.href = DATA.contacts.telegram;
    $('span', tg).textContent = `Telegram ${DATA.contacts.telegramLabel || ''}`.trim();
    $('#siteLink').href = DATA.contacts.site;
    observeReveal();
  }

  /* ---------- Map ---------- */
  const mapState = { map: null, layers: {}, markers: {}, filter: 'all', bounds: {} };
  function pinIcon(color, label, main, extra) {
    return L_.divIcon({
      className: '',
      html: `<div class="pin${main ? ' main' : ''}" style="--c:${color}${extra ? ';opacity:.75' : ''}"><span>${esc(label)}</span></div>`,
      iconSize: [26, 26], iconAnchor: [4, 26], popupAnchor: [9, -24]
    });
  }
  let L_ = null;
  function popupHtml(c, p, di, pi, extra) {
    const ph = photo(p.photo, p);
    const media = ph ? `<img src="${ph.sm}" alt="${esc(ph.caption)}" loading="lazy">` : placeholder(L(p.name));
    const meta = extra ? `${L(c.name)} · ${t('map.extra')}` : `${L(c.name)} · ${t('day')} ${di + 1}${p.time ? ` · ${c.noTiming ? t('step') + ' ' + p.time : p.time}` : ''}`;
    return `<div class="pop-media">${media}</div><div class="pop-body"><p class="pop-meta">${esc(meta)}</p><h4>${esc(L(p.name))}</h4>
      ${p.desc ? `<p>${esc(L(p.desc))}</p>` : ''}
      ${ph ? `<p style="font-size:11px;margin-top:6px">${esc(t('photo'))}: ${esc(credit(ph))}</p>` : ''}
      ${extra ? '' : `<a class="pop-link" href="#p-${c.id}-${di}-${pi}" data-open="${c.id}|${di}|${pi}">${esc(t('map.toProgram'))}</a>`}</div>`;
  }
  function buildMapLayers() {
    const map = mapState.map;
    Object.values(mapState.layers).forEach((l) => l.remove());
    mapState.layers = {}; mapState.markers = {}; mapState.bounds = {};
    const all = [];
    DATA.countries.forEach((c) => {
      const group = L_.layerGroup();
      const pts = [];
      c.days.forEach((d, di) => {
        const line = [];
        d.points.forEach((p, pi) => {
          if (!p.coords) return;
          line.push(p.coords); pts.push(p.coords);
          const m = L_.marker(p.coords, { icon: pinIcon(COLORS[c.id], String(pi + 1), p.tags.includes('main')), title: L(p.name), alt: L(p.name) })
            .bindPopup(popupHtml(c, p, di, pi), { maxWidth: 260, minWidth: 250 });
          m.addTo(group);
          mapState.markers[`${c.id}-${di}-${pi}`] = m;
        });
        if (line.length > 1) L_.polyline(line, { color: COLORS[c.id], weight: 3, opacity: .75, dashArray: di ? '2 8' : null, lineCap: 'round' }).addTo(group);
      });
      if (c.extra) c.extra.points.forEach((p) => {
        if (!p.coords) return;
        pts.push(p.coords);
        L_.marker(p.coords, { icon: pinIcon(COLORS[c.id], '+', false, true), title: L(p.name) }).bindPopup(popupHtml(c, p, 0, 0, true), { maxWidth: 260, minWidth: 250 }).addTo(group);
      });
      group.addTo(map);
      mapState.layers[c.id] = group;
      mapState.bounds[c.id] = L_.latLngBounds(pts);
      all.push(...pts);
    });
    const hubs = L_.polyline(DATA.countries.map((c) => c.hub), { color: '#D4A23C', weight: 3, opacity: .9, dashArray: '10 10' });
    hubs.addTo(map); mapState.layers.hubs = hubs;
    mapState.bounds.all = L_.latLngBounds(all);
  }
  function applyFilter(f, fly = true) {
    mapState.filter = f;
    $$('#mapFilter .chip').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
    if (!mapState.map) return;
    DATA.countries.forEach((c) => {
      const on = f === 'all' || f === c.id;
      if (on) mapState.layers[c.id].addTo(mapState.map); else mapState.layers[c.id].remove();
    });
    if (f === 'all') mapState.layers.hubs.addTo(mapState.map); else mapState.layers.hubs.remove();
    const b = mapState.bounds[f];
    if (b && b.isValid()) mapState.map[fly ? 'flyToBounds' : 'fitBounds'](b, { padding: [30, 30], maxZoom: 13, duration: .8 });
  }
  function initMap() {
    if (mapState.map) return;
    const box = $('#leaflet');
    if (!window.L) { box.innerHTML = `<p class="ar-loading">${esc(t('map.error'))}</p>`; return; }
    L_ = window.L;
    const map = L_.map(box, { scrollWheelZoom: false, tap: true, zoomSnap: .25 });
    mapState.map = map;
    map.setView([41, 66], 4);
    L_.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    map.on('focus', () => map.scrollWheelZoom.enable());
    map.on('blur', () => map.scrollWheelZoom.disable());
    buildMapLayers();
    applyFilter(mapState.filter, false);
  }
  function gotoMarker(key) {
    const [cid] = key.split('-');
    $('#map').scrollIntoView({ behavior: 'smooth' });
    const go = () => {
      if (mapState.filter !== 'all' && mapState.filter !== cid) applyFilter(cid, false);
      const m = mapState.markers[key];
      if (!m) return;
      mapState.map.setView(m.getLatLng(), 14, { animate: false });
      m.openPopup();
    };
    if (!mapState.map) { initMap(); setTimeout(go, 400); } else setTimeout(go, 500);
  }

  /* ---------- AR ---------- */
  let mvLoading = null;
  function loadModelViewer() {
    if (!mvLoading) {
      mvLoading = new Promise((res, rej) => {
        const s = document.createElement('script');
        s.type = 'module'; s.src = MODEL_VIEWER_SRC; s.onload = res; s.onerror = rej;
        document.head.appendChild(s);
      });
    }
    return mvLoading;
  }
  function pageUrl(hash) { return `${location.origin}${location.pathname}${hash}`; }
  function renderAR() {
    const grid = $('#arGrid');
    grid.classList.toggle('is-desktop', !isMobile);
    grid.innerHTML = DATA.ar.map((a) => `<article class="ar-card reveal" id="ar-${a.id}">
      <div class="ar-stage" data-model="${a.model}" data-name="${esc(L(a.name))}"><p class="ar-loading">${esc(t('ar.loading'))}</p></div>
      <div class="ar-body">
        <p class="ar-place">${esc(L(a.place))}</p>
        <h3>${esc(L(a.name))}</h3>
        <p>${esc(L(a.desc))}</p>
        <div class="ar-actions">
          <button class="btn btn-gold ar-btn" type="button" data-ar="${a.id}">◈ ${esc(t('openAr'))}</button>
          <div class="ar-qr"><div class="qr" data-qr="${a.id}"></div><small>${esc(t('ar.qr'))}</small></div>
        </div>
      </div>
    </article>`).join('');
    if (window.qrcode) {
      $$('[data-qr]', grid).forEach((el) => {
        const qr = window.qrcode(0, 'M'); qr.addData(pageUrl(`#ar-${el.dataset.qr}`)); qr.make();
        el.innerHTML = qr.createSvgTag({ cellSize: 3, margin: 0, scalable: true });
      });
    }
    observeReveal();
    if (arVisible) mountModels();
  }
  let arVisible = false;
  function mountModels() {
    loadModelViewer().then(() => {
      $$('.ar-stage', $('#arGrid')).forEach((stage) => {
        if ($('model-viewer', stage)) return;
        const mv = document.createElement('model-viewer');
        mv.setAttribute('src', stage.dataset.model);
        mv.setAttribute('alt', stage.dataset.name);
        mv.setAttribute('camera-controls', '');
        mv.setAttribute('auto-rotate', '');
        mv.setAttribute('ar', '');
        mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
        mv.setAttribute('ar-scale', 'auto');
        mv.setAttribute('shadow-intensity', '1');
        mv.setAttribute('exposure', '1.1');
        mv.setAttribute('camera-orbit', '30deg 65deg auto');
        mv.setAttribute('touch-action', 'pan-y');
        mv.setAttribute('loading', 'lazy');
        mv.addEventListener('load', () => { const l = $('.ar-loading', stage); if (l) l.remove(); });
        stage.appendChild(mv);
      });
    }).catch(() => { $$('.ar-loading').forEach((el) => { el.textContent = t('ar.unsupported'); }); });
  }
  function activateAR(id) {
    const mv = $(`#ar-${id} model-viewer`);
    if (!mv) { mountModels(); return; }
    const go = () => {
      if (mv.canActivateAR) mv.activateAR();
      else { const btn = $(`[data-ar="${id}"]`); btn.textContent = t('ar.unsupported'); btn.disabled = true; }
    };
    if (mv.loaded) go(); else mv.addEventListener('load', go, { once: true });
  }

  /* ---------- Reveal & lazy sections ---------- */
  let revealObs = null;
  function observeReveal() {
    const els = $$('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    if (!revealObs) revealObs = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((e) => revealObs.observe(e));
  }
  function lazySection(el, fn, margin = '300px') {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    const o = new IntersectionObserver((en) => { if (en.some((e) => e.isIntersecting)) { o.disconnect(); fn(); } }, { rootMargin: margin });
    o.observe(el);
  }
  function spyCountries() {
    if (!('IntersectionObserver' in window)) return;
    const o = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) $$('#countryNav a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('.country').forEach((c) => o.observe(c));
  }

  /* ---------- Events ---------- */
  function bindEvents() {
    document.addEventListener('click', (e) => {
      const tab = e.target.closest('.day-tab[data-country]');
      if (tab) { selectDay(tab.dataset.country, +tab.dataset.day); return; }
      const f = e.target.closest('[data-filter]');
      if (f) { initMap(); applyFilter(f.dataset.filter); return; }
      const g = e.target.closest('[data-goto]');
      if (g) { gotoMarker(g.dataset.goto); return; }
      const op = e.target.closest('[data-open]');
      if (op) {
        e.preventDefault();
        const [cid, di, pi] = op.dataset.open.split('|');
        if ((activeDay[cid] || 0) !== +di) selectDay(cid, +di);
        mapState.map?.closePopup();
        const item = $(`#p-${cid}-${di}-${pi}`);
        item?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      const lbBtn = e.target.closest('[data-lb]');
      if (lbBtn) {
        const [cid, di, pi] = lbBtn.dataset.lb.split('|');
        const c = DATA.countries.find((x) => x.id === cid);
        const list = []; let start = 0;
        c.days[+di].points.forEach((p, i) => { const ph = photo(p.photo, p); if (ph) { if (i === +pi) start = list.length; list.push(ph); } });
        openLightbox(list, start); return;
      }
      const ex = e.target.closest('[data-lb-extra]');
      if (ex) {
        const [cid, i] = ex.dataset.lbExtra.split('|');
        const c = DATA.countries.find((x) => x.id === cid);
        openLightbox(c.extra.photos.map((p) => photo(p, c.extra.points[0])), +i); return;
      }
      const gal = e.target.closest('[data-gal]');
      if (gal) { openLightbox(galleryList, +gal.dataset.gal); return; }
      const ar = e.target.closest('[data-ar]');
      if (ar) { activateAR(ar.dataset.ar); return; }
      const lb2 = e.target.closest('.lang button');
      if (lb2) { setLang(lb2.dataset.lang); return; }
      if (e.target.closest('.nav a')) closeMenu();
    });
    const burger = $('#burger');
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') !== 'true';
      burger.setAttribute('aria-expanded', String(open));
      $('#nav').classList.toggle('open', open);
    });
    const bar = $('#topbar');
    const onScroll = () => bar.classList.toggle('scrolled', window.scrollY > 40 || $('#nav').classList.contains('open'));
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  function closeMenu() { $('#burger').setAttribute('aria-expanded', 'false'); $('#nav').classList.remove('open'); }

  function setLang(l) {
    if (!I18N[l] || l === lang) return;
    lang = l;
    try { localStorage.setItem('kd-lang', l); } catch (e) { /* ignore */ }
    renderAll();
    if (mapState.map) { buildMapLayers(); applyFilter(mapState.filter, false); }
  }
  function renderAll() {
    applyStatic();
    renderHero(); renderCountryNav(); renderCountries(); renderGallery(); renderTeam(); renderAR();
    $('#mapNote').textContent = L(DATA.meta.coordsNote);
    $$('.reveal').forEach((el) => el.classList.add('in'));
    spyCountries();
  }

  /* ---------- Boot ---------- */
  async function boot() {
    $('#year').textContent = new Date().getFullYear();
    initLightbox(); bindEvents();
    try {
      const res = await fetch('data/routes.json', { cache: 'no-cache' });
      DATA = await res.json();
    } catch (err) {
      $('#countryBlocks').innerHTML = '<p class="container" style="padding:40px 16px">Не удалось загрузить данные маршрута (data/routes.json).</p>';
      return;
    }
    applyStatic();
    renderHero(); renderCountryNav(); renderCountries(); renderGallery(); renderTeam(); renderAR();
    $('#mapNote').textContent = L(DATA.meta.coordsNote);
    observeReveal(); spyCountries();
    lazySection($('#map'), initMap, '400px');
    lazySection($('#ar'), () => { arVisible = true; mountModels(); }, '500px');
    if (location.hash.startsWith('#ar-')) { arVisible = true; mountModels(); setTimeout(() => $(location.hash)?.scrollIntoView(), 300); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
