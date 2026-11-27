// illoca clone — Lenis + GSAP ScrollTrigger choreography (Phase 2).
// The core mechanism (RESEARCH §5): #flight is pinned for a long scroll and ONE
// scrubbed timeline drives the Three.js camera through 6 beats while the hero and
// the 5 feature panels slide in/out in sync. Falls back to stacked reveals when
// GSAP/WebGL/reduced-motion make pinning inappropriate.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (window.Lenis && !reduce) {
    var lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
  }
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Reveals for the post-flight sections (letter / pricing / faqs)
  gsap.utils.toArray('.card, .letter-sheet, .faq-intro, .faq').forEach(function (el) {
    gsap.from(el, {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  var S = window.__illocaScene;
  if (reduce || !S) { // stacked fallback: panels simply reveal in flow
    gsap.utils.toArray('.panel').forEach(function (el) {
      gsap.from(el, {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
    return;
  }

  document.body.classList.add('js-flight');
  var cam = S.camera;
  var target = new THREE.Vector3(0, 0.6, 0);
  cam.lookAt(target);

  // Camera beats: [position, lookAt] — hero wide, shoulder, plan close-up,
  // massing aerial, top-floor close-up, wide again (RESEARCH §5)
  var BEATS = [
    [[0, 3.2, 8.5], [0, 0.6, 0]],
    [[-0.6, 2.2, 5.6], [-0.6, 0.4, 0]],
    [[-1.2, 3.0, 3.1], [-1.2, 0.1, 0.2]],
    [[0.4, 4.8, 4.8], [1.6, 0.3, -0.2]],
    [[1.9, 3.0, 4.6], [1.9, 0.8, -0.2]],
    [[0, 3.4, 9.0], [0, 0.6, 0]]
  ];
  function flyTo(tl, beat, pos) {
    tl.to(cam.position, { x: beat[0][0], y: beat[0][1], z: beat[0][2], duration: 1, ease: 'power1.inOut' }, pos);
    tl.to(target, {
      x: beat[1][0], y: beat[1][1], z: beat[1][2], duration: 1, ease: 'power1.inOut',
      onUpdate: function () { cam.lookAt(target); }
    }, pos);
  }

  var panels = gsap.utils.toArray('.panel');
  var tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: '#flight', start: 'top top', end: '+=7200', scrub: 1, pin: true, anticipatePin: 1
    }
  });

  // Hero copy leaves FIRST (autoAlpha also hides it from clicks once gone)
  tl.to('.hero', { y: -90, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 0);
  flyTo(tl, BEATS[1], 0);

  panels.forEach(function (panel, i) {
    var fromX = panel.classList.contains('panel--right') ? 90 : -90;
    var at = 0.62 + i * 1.08;
    // Scene state for this beat
    if (i === 1) tl.fromTo(S.massing.scale, { y: 0.08 }, { y: 1, duration: 0.8 }, at);           // massing rises (F2)
    if (i === 2) tl.to(S.promptBar.material, { opacity: 1, duration: 0.4 }, at + 0.3);            // prompt bar in (F3)
    if (i === 2) tl.to(S.promptBar.material, { opacity: 0, duration: 0.3 }, at + 0.95);
    if (i === 3) tl.to(S.ring.material, { opacity: 1, duration: 0.4 }, at + 0.3);                 // markup ring (F4)
    if (i === 3) tl.to(S.ring.material, { opacity: 0, duration: 0.3 }, at + 0.95);
    if (i === 4) tl.to(S.massing.children[0].material.color, { r: 0.85, g: 0.72, b: 0.55, duration: 0.6 }, at); // facade tint (F5)
    // Panel in, dwell, out — synced with the camera move to the next beat.
    // autoAlpha handles visibility; pointer-events via set (reliable under scrub).
    tl.fromTo(panel, { x: fromX, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.35, ease: 'power3.out' }, at);
    tl.set(panel, { pointerEvents: 'auto' }, at + 0.36);
    tl.set(panel, { pointerEvents: 'none' }, at + 0.66);
    tl.to(panel, { x: -fromX, autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, at + 0.68);
    flyTo(tl, BEATS[i + 2] || BEATS[5], at + 0.35);
  });

  // Navy wipe up into the Open Letter (matches the original's exit)
  tl.to('.flight-wipe', { scaleY: 1, duration: 0.45, ease: 'power2.inOut' }, 6.35);
})();
