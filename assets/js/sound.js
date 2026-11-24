/* Звук «тинг — тинг — пух!», синтезируется в браузере через Web Audio (без файлов).
 * ting(i)  — колокольчик, высота растёт с каждой страной (пентатоника)
 * roll()   — короткая дробь перед вспышкой
 * boom()   — мягкий «пух»: низкий удар, шум и искры
 * chord()  — тёплый мажорный аккорд под надпись «Код дружбы»
 * Браузеры разрешают звук только после нажатия, поэтому unlock() вызывается из клика.
 */
(() => {
  'use strict';
  let ctx = null, master = null, verb = null;
  // Звук включён по умолчанию; выключенным он остаётся, только если посетитель сам его выключил
  let enabled = true;
  try { enabled = localStorage.getItem('kd-sound') !== '0'; } catch (e) { /* storage blocked */ }

  function init() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    ctx.onstatechange = () => document.dispatchEvent(new CustomEvent('kd-sound', { detail: enabled }));
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 4;
    master = ctx.createGain(); master.gain.value = 0.7;
    master.connect(comp); comp.connect(ctx.destination);
    // Короткая «комната»: импульс из затухающего шума
    verb = ctx.createConvolver();
    const len = ctx.sampleRate * 1.8, buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    verb.buffer = buf;
    const wet = ctx.createGain(); wet.gain.value = 0.32;
    verb.connect(wet); wet.connect(master);
    return ctx;
  }
  function out(node, dry = 1) {
    const g = ctx.createGain(); g.gain.value = dry;
    node.connect(g); g.connect(master); node.connect(verb);
  }
  const NOTES = [1046.5, 1174.7, 1318.5, 1568.0, 1760.0, 2093.0];

  function ting(i = 0, when = 0, vol = 0.32) {
    if (!enabled || !init()) return;
    const t = ctx.currentTime + when, f = NOTES[i % NOTES.length];
    [[1, 1], [2.76, 0.35], [5.4, 0.12]].forEach(([mul, amp]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = mul === 1 ? 'triangle' : 'sine';
      o.frequency.value = f * mul;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol * amp, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + (mul === 1 ? 1.6 : 0.6));
      o.connect(g); out(g);
      o.start(t); o.stop(t + 1.7);
    });
  }
  function roll() {
    if (!enabled || !init()) return;
    for (let k = 0; k < 10; k++) ting(k % 5, k * 0.07, 0.08 + k * 0.012);
  }
  function boom() {
    if (!enabled || !init()) return;
    const t = ctx.currentTime;
    // низкий «пух»
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.55);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.9, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    o.connect(g); out(g); o.start(t); o.stop(t + 1.2);
    // воздух: шум через закрывающийся фильтр
    const n = ctx.createBufferSource(), nb = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate), d = nb.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    n.buffer = nb;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3200, t); lp.frequency.exponentialRampToValueAtTime(180, t + 0.8);
    const ng = ctx.createGain(); ng.gain.setValueAtTime(0.45, t); ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
    n.connect(lp); lp.connect(ng); out(ng); n.start(t); n.stop(t + 1);
    // искры после удара
    [5, 3, 4, 2, 5].forEach((note, k) => ting(note, 0.18 + k * 0.06, 0.12));
  }
  function chord(when = 0.25) {
    if (!enabled || !init()) return;
    const t = ctx.currentTime + when;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, k) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
      o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = (k - 1.5) * 6;
      lp.type = 'lowpass'; lp.frequency.value = 1800;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06, t + 0.35); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);
      o.connect(lp); lp.connect(g); out(g, 0.8); o.start(t); o.stop(t + 2.7);
    });
  }
  function unlock() {
    if (!init()) return false;
    if (ctx.state === 'suspended') ctx.resume();
    return true;
  }
  function setEnabled(v) {
    enabled = !!v;
    try { localStorage.setItem('kd-sound', enabled ? '1' : '0'); } catch (e) { /* ignore */ }
    if (enabled) unlock();
    document.dispatchEvent(new CustomEvent('kd-sound', { detail: enabled }));
  }
  /* Браузер может держать звук на паузе до первого касания: снимаем паузу при любом нажатии */
  function armAutoplay() {
    init();
    if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
    const go = () => { if (ctx && ctx.state !== 'running' && enabled) ctx.resume(); };
    ['pointerdown', 'touchstart', 'keydown'].forEach((ev) => addEventListener(ev, go, { capture: true, passive: true }));
  }
  const blocked = () => !ctx || ctx.state !== 'running';
  window.KD_SOUND = { armAutoplay, get blocked() { return blocked(); }, ting, roll, boom, chord, unlock, setEnabled, get enabled() { return enabled; } };
})();
