/* Национальные орнаменты пяти стран маршрута.
 * Каждый символ нарисован в квадрате 100×100 и красится через currentColor.
 *   am — аревахач, армянский знак вечности
 *   kz — қошқар мүйіз, «бараньи рога»
 *   kg — түндүк, купол юрты с флага Кыргызстана
 *   tj — корона и семь звёзд с флага, розетка сюзане
 *   uz — гирих, восьмиконечная звезда самаркандских изразцов
 */
(() => {
  'use strict';
  const star5 = (cx, cy, r) => {
    let d = '';
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r;
      d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1);
    }
    return d + 'Z';
  };
  const rot = (inner, n) => Array.from({ length: n }, (_, k) => `<g transform="rotate(${(360 / n) * k} 50 50)">${inner}</g>`).join('');

  const tjStars = Array.from({ length: 7 }, (_, i) => {
    const a = (205 + i * 21.7) * Math.PI / 180;
    return `<path d="${star5(50 + 34 * Math.cos(a), 66 + 34 * Math.sin(a), 5.2)}" fill="currentColor" stroke="none"/>`;
  }).join('');

  const kgRays = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15) * Math.PI / 180;
    return `M${(50 + 31 * Math.cos(a)).toFixed(1)} ${(50 + 31 * Math.sin(a)).toFixed(1)}L${(50 + 41 * Math.cos(a)).toFixed(1)} ${(50 + 41 * Math.sin(a)).toFixed(1)}`;
  }).join('');

  const ORN = {
    am: `<g fill="currentColor" stroke="none">${rot('<path d="M50 50C49 37 57 26 72 24C64 30 60 38 58 50Z"/>', 8)}</g>
         <circle cx="50" cy="50" r="6" fill="currentColor" stroke="none"/>
         <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" stroke-width="3"/>`,
    kz: `<g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round">
           <path d="M50 50C50 30 36 16 22 22C10 27 12 44 24 44C32 44 33 34 27 33"/>
           <path d="M50 50C50 30 64 16 78 22C90 27 88 44 76 44C68 44 67 34 73 33"/>
           <path d="M50 50C50 70 36 84 22 78C10 73 12 56 24 56C32 56 33 66 27 67"/>
           <path d="M50 50C50 70 64 84 78 78C90 73 88 56 76 56C68 56 67 66 73 67"/>
         </g>
         <path d="M50 41L57 50L50 59L43 50Z" fill="currentColor"/>`,
    kg: `<g fill="none" stroke="currentColor" stroke-linecap="round">
           <circle cx="50" cy="50" r="26" stroke-width="5"/>
           <path stroke-width="3.5" d="M27 43Q50 31 73 43M25 51Q50 39 75 51M27 59Q50 47 73 59M27 41Q50 53 73 41M25 49Q50 61 75 49M27 57Q50 69 73 57"/>
           <path stroke-width="3" d="${kgRays}"/>
         </g>`,
    tj: `${tjStars}
         <path d="M30 66L28 47L39 55L50 40L61 55L72 47L70 66Z" fill="currentColor"/>
         <path d="M28 72H72" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
         <circle cx="50" cy="56" r="3.5" fill="#fff" opacity=".8"/>`,
    uz: `<g fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round">
           <path d="M50 12L88 50L50 88L12 50Z"/>
           <path d="M23 23H77V77H23Z"/>
           <path d="M50 30L64 36L70 50L64 64L50 70L36 64L30 50L36 36Z"/>
           <path stroke-width="2.5" d="M50 12V30M88 50H70M50 88V70M12 50H30M23 23L36 36M77 23L64 36M77 77L64 64M23 77L36 64"/>
         </g>
         <circle cx="50" cy="50" r="7" fill="currentColor"/>`
  };

  /** Inline SVG markup for one ornament. */
  function svg(id, cls = '', color) {
    const style = color ? ` style="color:${color}"` : '';
    return `<svg class="orn ${cls}" viewBox="0 0 100 100" aria-hidden="true"${style}>${ORN[id]}</svg>`;
  }
  /** A CSS background-image with the ornament as a soft repeating tile. */
  function pattern(id, color, opacity = 0.14, size = 120) {
    const inner = ORN[id].replace(/currentColor/g, color).replace(/"/g, "'");
    const half = size / 2;
    const tile = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>` +
      `<g opacity='${opacity}'><g transform='translate(${half / 2} ${half / 2}) scale(${half / 100})'>${inner}</g>` +
      `<g transform='translate(${size - 10} ${size - 10}) scale(${half / 400})'>${inner}</g><g transform='translate(-10 -10) scale(${half / 400})'>${inner}</g></g></svg>`;
    return `url('data:image/svg+xml,${encodeURIComponent(tile).replace(/'/g, '%27')}')`;
  }
  window.KD_ORN = { ORN, svg, pattern, ids: ['am', 'kz', 'kg', 'tj', 'uz'] };
})();
