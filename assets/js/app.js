/* «Код дружбы» — логика страницы. Данные маршрута лежат в data/routes.json. */
(() => {
  'use strict';

  const I18N = {
    ru: {
      skip: 'К маршруту', brand: 'Код дружбы',
      'nav.map': 'Карта', 'nav.route': 'Программа', 'nav.gallery': 'Галерея', 'nav.ar': 'AR', 'nav.tips': 'Полезно', 'nav.team': 'Команда',
      'hero.eyebrow': 'Международная школа Студтуризма', 'hero.title': 'Код дружбы', 'hero.sub': '5 стран, 9 дней, одна дружба',
      'hero.cta': 'Смотреть маршрут', 'hero.credit': 'Фото: озеро Кольсай',
      'map.kicker': 'Интерактивная карта', 'map.title': 'Ереван → Алматы → Бишкек → Душанбе → Самарканд',
      'map.lead': 'Нажмите на точку, чтобы увидеть фото, время и описание. Фильтр показывает одну страну.',
      'map.all': 'Весь маршрут', 'map.toProgram': 'Открыть в программе →', 'map.extra': 'Дополнительный тур',
      'map.loading': 'Загружаем карту…', 'map.error': 'Карта не загрузилась. Проверьте интернет и обновите страницу.',
      day: 'День', step: 'Точка', onMap: 'На карте', openAr: 'Открыть в AR', arLink: 'Смотреть в AR',
      noTiming: 'Порядок точек без почасового тайминга',
      'ph.soon': 'Фото скоро', 'ph.attr': 'Автор · лицензия',
      'gallery.kicker': 'Галерея', 'gallery.title': 'Маршрут в кадрах',
      'gallery.lead': 'Казахстан и Узбекистан уже в кадре. Фото Армении, Кыргызстана и Таджикистана появятся по мере подбора, с автором и лицензией.',
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
      'footer.copy': '«Код дружбы» · Международная школа Студтуризма', 'footer.map': 'Карта', 'footer.photos': 'Фото',
      photo: 'Фото', close: 'Закрыть',
      'hero.intro': 'Смотреть интро', 'intro.play': 'Начать путешествие', 'intro.hint': 'Со звуком. Можно пропустить.', 'intro.skip': 'Пропустить', 'intro.sound': 'Включить звук', 'intro.mute': 'Выключить звук', 'intro.together': 'Пять стран вместе',
      more: 'Подробнее о туре', dayN: 'День', days2: 'дня', days1: 'день',
      'stats.countries': 'стран', 'stats.days': 'дней', 'stats.stops': 'точек на карте', 'stats.one': 'дружба',
      'pkg.kicker': 'Тур-пакет', 'pkg.program': 'Программа по дням', 'pkg.how': 'Как добираемся', 'pkg.meals': 'Питание по программе', 'pkg.in': 'В пакет входит', 'pkg.out': 'Оплачивается отдельно', 'pkg.bring': 'Что взять с собой', 'pkg.book': 'Забронировать', 'pkg.site': 'Сайт t2t.asia', 'pkg.terms': 'Состав и стоимость пакета уточняет команда проекта.', 'pkg.close': 'Закрыть', 'pkg.symbol': 'Национальный символ',
      start: 'Старт', finish: 'Финиш', transfer: 'Переезд', 'art.soon': 'Фото скоро',
      'sound.on': 'Звук включён', 'sound.off': 'Звук выключен'
    },
    en: {
      skip: 'Skip to route', brand: 'Friendship Code',
      'nav.map': 'Map', 'nav.route': 'Itinerary', 'nav.gallery': 'Gallery', 'nav.ar': 'AR', 'nav.tips': 'Tips', 'nav.team': 'Team',
      'hero.eyebrow': 'International Student Tourism School', 'hero.title': 'Friendship Code', 'hero.sub': '5 countries, 9 days, one friendship',
      'hero.cta': 'See the route', 'hero.credit': 'Photo: Lake Kolsai',
      'map.kicker': 'Interactive map', 'map.title': 'Yerevan → Almaty → Bishkek → Dushanbe → Samarkand',
      'map.lead': 'Tap a point to see a photo, time and description. Use the filter to focus on one country.',
      'map.all': 'Whole route', 'map.toProgram': 'Open in itinerary →', 'map.extra': 'Optional trip',
      'map.loading': 'Loading map…', 'map.error': 'The map failed to load. Check your connection and refresh.',
      day: 'Day', step: 'Stop', onMap: 'On the map', openAr: 'View in AR', arLink: 'View in AR',
      noTiming: 'Stops in order, no hourly timing',
      'ph.soon': 'Photo coming soon', 'ph.attr': 'Author · licence',
      'gallery.kicker': 'Gallery', 'gallery.title': 'The route in pictures',
      'gallery.lead': 'Kazakhstan and Uzbekistan are already here. Photos of Armenia, Kyrgyzstan and Tajikistan are on the way, each with its author and licence.',
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
      'footer.copy': '“Friendship Code” · International Student Tourism School', 'footer.map': 'Map', 'footer.photos': 'Photos',
      photo: 'Photo', close: 'Close',
      'hero.intro': 'Watch the intro', 'intro.play': 'Start the journey', 'intro.hint': 'With sound. You can skip it.', 'intro.skip': 'Skip', 'intro.sound': 'Turn sound on', 'intro.mute': 'Mute', 'intro.together': 'Five countries together',
      more: 'Tour details', dayN: 'Day', days2: 'days', days1: 'day',
      'stats.countries': 'countries', 'stats.days': 'days', 'stats.stops': 'stops on the map', 'stats.one': 'friendship',
      'pkg.kicker': 'Tour package', 'pkg.program': 'Day-by-day programme', 'pkg.how': 'Getting there', 'pkg.meals': 'Meals on the programme', 'pkg.in': 'Included', 'pkg.out': 'Paid separately', 'pkg.bring': 'What to bring', 'pkg.book': 'Book', 'pkg.site': 't2t.asia', 'pkg.terms': 'Package contents and price are confirmed by the project team.', 'pkg.close': 'Close', 'pkg.symbol': 'National symbol',
      start: 'Start', finish: 'Finish', transfer: 'Transfer', 'art.soon': 'Photo coming soon',
      'sound.on': 'Sound on', 'sound.off': 'Sound off'
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
    if (typeof p === 'string' && p[0] === '@') p = DATA.uzPhotos[p.slice(1)];
    if (!p) return null;
    if (typeof p === 'string') {
      return { src: `assets/img/${p}.webp`, sm: `assets/img/${p}-sm.webp`, author: meta.photoCredit, license: L(meta.photoLicense), caption: L(point?.photoCaption) || L(point?.name) };
    }
    return { src: p.src, sm: p.sm || p.src, author: p.author || '', license: L(p.license) || p.license || '', url: p.url, caption: L(p.caption) || L(point?.name) };
  }
  const credit = (ph) => [ph.author, ph.license].filter(Boolean).join(' · ');
  const country = (id) => DATA.countries.find((x) => x.id === id);
  /* Цветная «открытка» страны с её орнаментом: вместо фото, пока фото нет */
  function art(c, label, sub = '') {
    const [a, b, d] = c.palette;
    return `<div class="art" role="img" aria-label="${esc(label)}" style="--a:${a};--b:${b};--d:${d};background-image:${window.KD_ORN.pattern(c.id, '#ffffff', 0.18, 90)},linear-gradient(135deg,${a} 0%,${d} 100%)">
      ${window.KD_ORN.svg(c.id, 'art-orn', '#fff')}<b>${esc(label)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</div>`;
  }
  const placeholder = (name, c) => art(c || DATA.countries[0], name, t('art.soon'));

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
        $('#footerAuthor').textContent = DATA ? (lang === 'ru' ? `Казахстан: ${DATA.meta.photoCredit}; Узбекистан: Unsplash, авторы указаны в подписях` : `Kazakhstan: ${DATA.meta.photoCredit}; Uzbekistan: Unsplash, authors in captions`) : '';
  }

  /* ---------- Hero, filters, nav ---------- */
  function renderHero() {
    $('#heroCountries').innerHTML = DATA.countries.map((c) => `<li style="--c:${c.palette[0]}">${window.KD_ORN.svg(c.id, 'chip-orn', c.palette[0])}${esc(L(c.name))}</li>`).join('');
    // Заголовок по буквам для волны появления
    const title = t('hero.title');
    let li = 0;
    $('#heroTitle').innerHTML = title.split(' ').map((w) => `<span class="w">${[...w].map((ch) => `<span style="--i:${li++}">${esc(ch)}</span>`).join('')}</span>`).join(' ');
    $('#heroTitle').setAttribute('aria-label', title);
    // Арки: фото, где есть, и цветные открытки остальных стран
    const arches = DATA.countries.map((c) => {
      const ph = photo(c.cover, { name: c.city });
      return `<div class="arch" style="--c:${c.palette[0]}" data-tilt>${ph ? `<img src="${ph.sm}" alt="" loading="lazy" decoding="async">` : art(c, L(c.name))}<span>${esc(L(c.name))}</span></div>`;
    }).join('');
    $('#heroArches').innerHTML = arches;
    $('#heroOrns').innerHTML = DATA.countries.map((c, i) => window.KD_ORN.svg(c.id, `float f${i}`, c.palette[0])).join('');
  }
  function renderStats() {
    const stops = DATA.countries.reduce((n, c) => n + c.days.reduce((m, d) => m + d.points.filter((p) => p.coords).length, 0), 0);
    const items = [[5, t('stats.countries')], [9, t('stats.days')], [stops, t('stats.stops')], [1, t('stats.one')]];
    $('#stats').innerHTML = items.map(([v, l], i) => `<div class="stat reveal" style="--c:${DATA.countries[i % 5].palette[0]}"><b data-count="${v}">${v}</b><span>${esc(l)}</span></div>`).join('');
  }
  function renderBands() {
    const row = DATA.countries.map((c) => window.KD_ORN.svg(c.id, '', c.palette[0]) + window.KD_ORN.svg(c.id, 'sm', c.palette[1])).join('');
    ['#ornBand1', '#ornBand2'].forEach((sel) => { const el = $(sel); if (el) el.innerHTML = row.repeat(4); });
  }
  function renderWhy() {
    const w = DATA.routeWhy;
    $('#routeWhy').innerHTML = `<h3>${esc(L(w.title))}</h3><ol>${w.items.map((x, i) => `<li style="--c:${DATA.countries[i % 5].palette[0]}">${esc(L(x))}</li>`).join('')}</ol>`;
  }
  function renderCountryNav() {
    $('#countryNav').innerHTML = DATA.countries.map((c) =>
      `<a href="#c-${c.id}" style="--c:${COLORS[c.id]}">${window.KD_ORN.svg(c.id, 'nav-orn', COLORS[c.id])}${esc(L(c.name))}</a>`).join('');
    $('#mapFilter').innerHTML = `<button class="chip" type="button" data-filter="all" aria-pressed="${mapState.filter === 'all'}">${esc(t('map.all'))}</button>` +
      DATA.countries.map((c) => `<button class="chip" type="button" data-filter="${c.id}" style="--c:${COLORS[c.id]}" aria-pressed="${mapState.filter === c.id}"><span class="dot"></span>${esc(L(c.name))}</button>`).join('');
  }

  /* ---------- Countries ---------- */
  const dayOffset = {};
  function computeOffsets() { let n = 0; DATA.countries.forEach((c) => { dayOffset[c.id] = n; n += c.days.length; }); }
  function timeLabel(c, p) {
    if (c.noTiming) return `№${esc(p.time)}`;
    return p.time ? esc(p.time) : '•';
  }
  function renderDay(c, di, opts = {}) {
    const day = c.days[di];
    const items = day.points.map((p, pi) => {
      const ph = photo(p.photo, p);
      const isMain = p.tags.includes('main');
      const showMedia = !opts.compact && (ph || isMain);
      const media = !showMedia ? '' : ph
        ? `<button class="tl-media" type="button" data-lb="${c.id}|${di}|${pi}" aria-label="${esc(t('photo'))}: ${esc(L(p.name))}"><img src="${ph.sm}" alt="${esc(ph.caption)}" loading="lazy" decoding="async" width="640" height="400"></button>`
        : `<div class="tl-media is-ph">${placeholder(L(p.name), c)}</div>`;
      const badges = p.tags.map((tg) => `<span class="badge ${tg}">${esc(L(DATA.tags[tg]))}</span>`).join('');
      const actions = opts.compact ? '' : [
        p.coords ? `<button class="tl-map" type="button" data-goto="${c.id}-${di}-${pi}">📍 ${esc(t('onMap'))}</button>` : '',
        p.ar ? `<a class="tl-map tl-ar" href="#ar-${p.ar}">◈ ${esc(t('arLink'))}</a>` : ''
      ].join('');
      return `<li class="tl-item${isMain ? ' is-main' : ''}" ${opts.compact ? '' : `id="p-${c.id}-${di}-${pi}"`} style="--d:${pi}">
        <div class="tl-time">${timeLabel(c, p)}</div>
        <div class="tl-card${showMedia ? ' has-media' : ''}" ${opts.compact ? '' : 'data-tilt'}>
          ${media}
          <div>
            <h3>${esc(L(p.name))}</h3>
            <p>${esc(L(p.desc))}</p>
            ${ph && !opts.compact ? `<p class="tl-credit">${esc(t('photo'))}: ${esc(credit(ph))}</p>` : ''}
            ${badges ? `<div class="badges">${badges}</div>` : ''}
            ${actions}
          </div>
        </div>
      </li>`;
    }).join('');
    return `<p class="day-sub"><b>${esc(L(day.title))}.</b> ${esc(L(day.subtitle))}${c.noTiming ? ` · ${esc(t('noTiming'))}` : ''}</p><ol class="timeline">${items}</ol>`;
  }
  const modeIcon = (m) => m === 'plane' ? '✈' : m === 'bus' ? '🚐' : '🚆';
  function renderCountries() {
    computeOffsets();
    const blocks = DATA.countries.map((c, ci) => {
      const di = activeDay[c.id] || 0, off = dayOffset[c.id];
      const tabs = c.days.length > 1
        ? `<div class="day-tabs" role="tablist" aria-label="${esc(L(c.name))}">${c.days.map((d, i) =>
            `<button class="day-tab" role="tab" type="button" id="tab-${c.id}-${i}" aria-controls="panel-${c.id}" aria-selected="${i === di}" data-country="${c.id}" data-day="${i}">${esc(t('day'))} ${off + i + 1} · ${esc(L(d.title))}</button>`).join('')}</div>`
        : `<div class="day-tabs"><span class="day-tab" aria-selected="true">${esc(t('day'))} ${off + 1} · ${esc(L(c.days[0].title))}</span></div>`;
      let extra = '';
      if (c.extra) {
        extra = `<aside class="extra reveal"><h3>${esc(L(c.extra.title))}</h3><p>${esc(L(c.extra.text))}</p>
          <div class="extra-photos">${c.extra.photos.map((p, i) => {
            const ph = photo(p, c.extra.points[0]);
            return `<button type="button" data-lb-extra="${c.id}|${i}" aria-label="${esc(t('photo'))} ${i + 1}"><img src="${ph.sm}" alt="${esc(L(c.extra.points[0].name))}" loading="lazy" decoding="async"></button>`;
          }).join('')}</div></aside>`;
      }
      const [p1, p2, p3] = c.palette;
      const arrive = c.arrive ? `<div class="transfer reveal" style="--c:${p1}"><div class="container"><span class="tr-ico" aria-hidden="true">${modeIcon(c.arrive.mode)}</span><span class="tr-lbl">${esc(ci === 0 ? t('start') : t('transfer'))}</span><span class="tr-txt">${esc(L(c.arrive))}</span></div></div>` : '';
      const ph = photo(c.cover, { name: c.city });
      return `${arrive}<article class="country" id="c-${c.id}" style="--c:${p1};--c2:${p2};--c3:${p3};--pat:${window.KD_ORN.pattern(c.id, p1, 0.09, 130)}">
        ${window.KD_ORN.svg(c.id, 'country-orn', p1)}
        <div class="container">
          <header class="country-head reveal">
            <div class="country-num" aria-hidden="true">0${ci + 1}</div>
            <div class="country-title">
              <p class="country-symbol">${window.KD_ORN.svg(c.id, 'sym', p1)}<span>${esc(L(c.symbol))}</span></p>
              <h2>${esc(L(c.name))}</h2>
              <p class="country-city">${esc(L(c.city))} · ${c.days.length} ${esc(c.days.length > 1 ? t('days2') : t('days1'))}</p>
              <p class="lead">${esc(L(c.intro))}</p>
              <button class="btn btn-country magnetic" type="button" data-pkg="${c.id}">${esc(t('more'))} <span aria-hidden="true">→</span></button>
            </div>
            <div class="country-cover" data-tilt>${ph ? `<img src="${ph.sm}" alt="${esc(ph.caption)}" loading="lazy" decoding="async">` : art(c, L(c.city))}</div>
          </header>
          ${tabs}
          <div class="day-panel" id="panel-${c.id}" role="tabpanel">${renderDay(c, di)}</div>
          <p class="country-note">${esc(L(c.note))}</p>
          ${extra}
        </div>
      </article>`;
    }).join('');
    const last = DATA.countries[DATA.countries.length - 1];
    const finish = `<div class="transfer finish reveal" style="--c:${last.palette[0]}"><div class="container"><span class="tr-ico" aria-hidden="true">🏁</span><span class="tr-lbl">${esc(t('finish'))}</span><span class="tr-txt">${esc(L(DATA.finish))}</span></div></div>`;
    $('#countryBlocks').innerHTML = blocks + finish;
    observeReveal();
  }
  function selectDay(cid, di) {
    activeDay[cid] = di;
    const c = country(cid);
    const panel = $(`#panel-${cid}`);
    panel.classList.remove('swap'); void panel.offsetWidth;
    panel.innerHTML = renderDay(c, di);
    panel.classList.add('swap');
    $$(`.day-tab[data-country="${cid}"]`).forEach((b) => b.setAttribute('aria-selected', String(+b.dataset.day === di)));
  }

  /* ---------- Tour package sheet («Подробнее») ---------- */
  let sheetReturn = null;
  function openPackage(cid, push = true) {
    const c = country(cid); if (!c) return;
    const pk = c.package || {}, off = dayOffset[c.id];
    const [p1, p2, p3] = c.palette;
    const ph = photo(c.cover, { name: c.city });
    const list = (arr) => `<ul>${arr.map((x) => `<li>${esc(L(x))}</li>`).join('')}</ul>`;
    const days = c.days.map((d, i) => `<section class="pk-day"><h4><span>${esc(t('day'))} ${off + i + 1}</span> ${esc(L(d.title))}</h4>${renderDay(c, i, { compact: true })}</section>`).join('');
    $('#sheetPanel').innerHTML = `
      <button class="sheet-close" type="button" data-close aria-label="${esc(t('pkg.close'))}">×</button>
      <header class="pk-hero" style="--c:${p1};--c2:${p2};--c3:${p3}">
        <div class="pk-media">${ph ? `<img src="${ph.src}" alt="${esc(ph.caption)}">` : art(c, L(c.city))}</div>
        <div class="pk-stripe" aria-hidden="true">${DATA.countries.map((x) => `<i style="background:${x.palette[0]}"></i><i style="background:${x.palette[1]}"></i>`).join('')}</div>
        <div class="pk-head">
          <p class="pk-kicker">${esc(L(pk.source) || `${t('pkg.kicker')} · ${t('brand')}`)}</p>
          <span class="pk-pill">${c.days.length} ${esc(c.days.length > 1 ? t('days2') : t('days1'))}</span>
          <h2 id="sheetTitle">${esc(L(c.name))}<br><small>${esc(L(c.city))}</small></h2>
          <p class="pk-tag">${esc(L(pk.tagline))}</p>
        </div>
      </header>
      <div class="pk-body" style="--c:${p1};--c2:${p2};--c3:${p3}">
        ${pk.stats ? `<div class="pk-stats">${pk.stats.map((s) => `<div><b>${esc(s.v)}</b><span>${esc(L(s.l))}</span></div>`).join('')}</div>` : ''}
        <p class="pk-intro">${esc(L(c.intro))}</p>
        <h3>${esc(t('pkg.program'))}</h3>
        ${days}
        <div class="pk-grid">
          ${pk.transport || c.arrive ? `<section><h3>${esc(t('pkg.how'))}</h3>${c.arrive ? `<p><b>${modeIcon(c.arrive.mode)} ${esc(L(c.arrive))}</b></p>` : ''}${pk.transport ? `<p>${esc(L(pk.transport))}</p>` : ''}</section>` : ''}
          ${pk.meals ? `<section><h3>${esc(t('pkg.meals'))}</h3><p>${esc(L(pk.meals))}</p></section>` : ''}
          ${pk.included ? `<section class="pk-in"><h3>${esc(t('pkg.in'))}</h3>${list(pk.included)}</section>` : ''}
          ${pk.excluded ? `<section class="pk-out"><h3>${esc(t('pkg.out'))}</h3>${list(pk.excluded)}</section>` : ''}
          ${pk.bring ? `<section class="pk-bring"><h3>${esc(t('pkg.bring'))}</h3>${list(pk.bring)}</section>` : ''}
          <section class="pk-sym"><h3>${esc(t('pkg.symbol'))}</h3>${window.KD_ORN.svg(c.id, 'pk-orn', p1)}<p>${esc(L(c.symbol))}</p></section>
        </div>
        ${pk.extend ? `<aside class="pk-extend"><h3>${esc(L(pk.extend.title))}</h3><p>${esc(L(pk.extend.text))}</p><a class="btn btn-country" href="${esc(pk.extend.url)}" target="_blank" rel="noopener">t2t.asia →</a></aside>` : ''}
        <p class="pk-note">${esc(L(c.note))}${pk.included ? '' : ` ${esc(t('pkg.terms'))}`}</p>
        <div class="pk-cta">
          <a class="btn btn-country" href="${esc(DATA.contacts.telegram)}" target="_blank" rel="noopener">${esc(t('pkg.book'))} · Telegram</a>
          <a class="btn btn-line" href="${esc(DATA.contacts.site)}" target="_blank" rel="noopener">${esc(t('pkg.site'))}</a>
        </div>
      </div>`;
    const sh = $('#sheet');
    sheetReturn = document.activeElement;
    sh.hidden = false; document.documentElement.classList.add('sheet-lock');
    requestAnimationFrame(() => sh.classList.add('open'));
    $('#sheetPanel').scrollTop = 0; $('#sheetPanel').focus({ preventScroll: true });
    if (push && location.hash !== `#tour-${cid}`) history.pushState(null, '', `#tour-${cid}`);
    if (window.KD_SOUND.enabled) window.KD_SOUND.ting(DATA.countries.indexOf(c), 0, 0.15);
  }
  function closePackage(fromPop = false) {
    const sh = $('#sheet');
    if (sh.hidden) return;
    sh.classList.remove('open');
    setTimeout(() => { sh.hidden = true; document.documentElement.classList.remove('sheet-lock'); }, 350);
    if (!fromPop && location.hash.startsWith('#tour-')) history.back();
    sheetReturn?.focus?.({ preventScroll: true });
  }

  /* ---------- Gallery ---------- */
  let galleryList = [];
  function renderGallery() {
    const items = [];
    galleryList = [];
    DATA.countries.forEach((c) => {
      let artCount = 0;
      c.days.forEach((d) => d.points.forEach((p) => {
        const ph = photo(p.photo, p);
        if (ph) items.push({ ph });
        else if (p.tags.includes('main') && artCount < 2 && !['kz', 'uz'].includes(c.id)) { artCount++; items.push({ name: L(p.name), c }); }
      }));
      if (c.extra) c.extra.photos.forEach((p) => items.push({ ph: photo(p, c.extra.points[0]) }));
      if (c.id === 'uz') ['reg_light', 'samarqand_8', 'samarqand_4', 'shah_wide', 'det_star', 'mato_0'].forEach((k) => items.push({ ph: photo('@' + k, {}) }));
    });
    // Перемешиваем страны, чтобы галерея не начиналась сплошным Казахстаном
    const byC = {}; items.forEach((it) => { const k = it.c ? it.c.id : (it.ph.src.includes('/uz/') ? 'uz' : 'kz'); (byC[k] = byC[k] || []).push(it); });
    const order = DATA.countries.map((c) => c.id), mixed = [];
    while (order.some((k) => byC[k]?.length)) order.forEach((k) => { if (byC[k]?.length) mixed.push(byC[k].shift()); });
    $('#galleryGrid').innerHTML = mixed.map((it, i) => {
      if (it.ph) {
        const idx = galleryList.push(it.ph) - 1;
        return `<button class="g-item reveal" type="button" data-gal="${idx}" style="--d:${i % 6}"><img src="${it.ph.sm}" alt="${esc(it.ph.caption)}" loading="lazy" decoding="async"><figcaption>${esc(it.ph.caption)}</figcaption></button>`;
      }
      return `<div class="g-item is-ph reveal${i % 3 === 0 ? ' tall' : ''}" style="--d:${i % 6}">${art(it.c, it.name, `${L(it.c.name)} · ${t('art.soon')}`)}</div>`;
    }).join('');
    observeReveal();
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

  /* ---------- Effects: progress, counters, tilt, magnetic, glow ---------- */
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function initEffects() {
    const bar = $('#progressBar');
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`;
      const hero = $('#hero');
      if (hero && !reduceMotion) hero.style.setProperty('--sy', Math.min(1, scrollY / innerHeight).toFixed(3));
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    if (fine && !reduceMotion) {
      document.addEventListener('pointermove', (e) => {
        const tl = e.target.closest?.('[data-tilt]');
        $$('[data-tilt].tilting').forEach((x) => { if (x !== tl) { x.classList.remove('tilting'); x.style.transform = ''; } });
        if (tl) {
          const r = tl.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
          tl.classList.add('tilting');
          tl.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-3px)`;
          tl.style.setProperty('--mx', `${(x + 0.5) * 100}%`); tl.style.setProperty('--my', `${(y + 0.5) * 100}%`);
        }
        const mg = e.target.closest?.('.magnetic');
        $$('.magnetic.pull').forEach((x) => { if (x !== mg) { x.classList.remove('pull'); x.style.transform = ''; } });
        if (mg) {
          const r = mg.getBoundingClientRect();
          mg.classList.add('pull');
          mg.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
        }
        const hero = $('#hero');
        if (hero) { hero.style.setProperty('--px', (e.clientX / innerWidth - 0.5).toFixed(3)); hero.style.setProperty('--py', (e.clientY / innerHeight - 0.5).toFixed(3)); }
      }, { passive: true });
    }
  }
  function countUp(el) {
    const to = +el.dataset.count; if (!to || reduceMotion) return;
    const t0 = performance.now(), dur = 1400;
    const step = (now) => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * e); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  function startHero() { document.body.classList.add('hero-go'); }
  function syncSoundBtn() {
    const on = window.KD_SOUND.enabled && !window.KD_SOUND.blocked, b = $('#soundBtn');
    b.textContent = on ? '🔊' : '🔈'; b.setAttribute('aria-pressed', String(on)); b.title = on ? t('sound.on') : t('sound.off');
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
    const hubs = L_.polyline(DATA.countries.map((c) => c.hub), { color: '#E3A21A', weight: 3, opacity: .95, dashArray: '10 10' });
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
      if (e.isIntersecting) { e.target.classList.add('in'); const cnt = e.target.querySelector?.('[data-count]'); if (cnt) countUp(cnt); revealObs.unobserve(e.target); }
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
      const pk = e.target.closest('[data-pkg]');
      if (pk) { openPackage(pk.dataset.pkg); return; }
      if (e.target.closest('#sheet [data-close]')) { closePackage(); return; }
      if (e.target.closest('#replayIntro')) { window.KD_INTRO.open(); return; }
      if (e.target.closest('#soundBtn')) { const S = window.KD_SOUND; const on = S.enabled && !S.blocked; S.setEnabled(!on); if (!on) { S.unlock(); S.ting(2); } return; }
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
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#sheet').hidden) closePackage(); });
    addEventListener('popstate', () => {
      const m = location.hash.match(/^#tour-(\w+)/);
      if (m) openPackage(m[1], false); else closePackage(true);
    });
    document.addEventListener('kd-sound', syncSoundBtn);
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
    renderHero(); renderStats(); renderBands(); renderWhy(); renderCountryNav(); renderCountries(); renderGallery(); renderTeam(); renderAR();
    $('#mapNote').textContent = L(DATA.meta.coordsNote);
    $$('.reveal').forEach((el) => el.classList.add('in'));
    syncSoundBtn(); window.KD_INTRO.relabel();
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
    DATA.countries.forEach((c) => { COLORS[c.id] = c.palette[0]; });
    applyStatic();
    renderHero(); renderStats(); renderBands(); renderWhy(); renderCountryNav(); renderCountries(); renderGallery(); renderTeam(); renderAR();
    $('#mapNote').textContent = L(DATA.meta.coordsNote);
    observeReveal(); spyCountries(); initEffects(); syncSoundBtn();
    window.KD_INTRO.init(DATA, L, t, startHero);
    const tm = location.hash.match(/^#tour-(\w+)/);
    if (tm) setTimeout(() => openPackage(tm[1], false), 200);
    lazySection($('#map'), initMap, '400px');
    lazySection($('#ar'), () => { arVisible = true; mountModels(); }, '500px');
    if (location.hash.startsWith('#ar-')) { arVisible = true; mountModels(); setTimeout(() => $(location.hash)?.scrollIntoView(), 300); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
