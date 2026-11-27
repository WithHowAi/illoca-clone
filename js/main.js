// illoca clone — UI wiring (Phase 1/3): coords, loader, FAQ, drawer, cookies, anchors
(function () {
  // Live X/Y coordinate readout (RESEARCH §2)
  var cx = document.getElementById('coord-x'), cy = document.getElementById('coord-y');
  addEventListener('pointermove', function (e) {
    cx.textContent = e.clientX.toFixed(2);
    cy.textContent = e.clientY.toFixed(2);
  }, { passive: true });

  // Loader: original holds ~4-7s while the logo tiles assemble; hold 4s,
  // then lift it and trigger the hero outline-to-fill intro
  addEventListener('load', function () {
    setTimeout(function () {
      var l = document.getElementById('loader');
      document.documentElement.classList.remove('pre-intro');
      if (!l) return;
      l.style.transition = 'opacity .5s'; l.style.opacity = '0';
      setTimeout(function () { l.remove(); }, 550);
    }, 4000);
  });

  // FAQ accordion — single-open (RESEARCH §9)
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq'), wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq.open').forEach(function (f) {
        f.classList.remove('open');
        f.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  // Demo drawer — steps paraphrased per feature (RESEARCH §6)
  var DEMOS = {
    1: ['Augmented Sketch', ['Sketch your idea or provide a reference image.', 'The agent traces the input into an editable floor plan.', 'Keep editing the result by sketching with Live Draft.']],
    2: ['Adaptive Massing', ['Provide a sketch, reference image or short description.', 'The agent builds a BIM-compatible 3D massing model.', 'Adjust volumes and re-generate options in place.']],
    3: ['Prompted Plans', ['Describe the layout you need in a prompt.', 'The agent generates plan options or fills unfinished areas.', 'Pick an option and keep iterating with new prompts.']],
    4: ['Agentic Refinement', ['Mark up the plan with your intent.', 'Agents execute the layout edits for you.', 'Review the changes and refine with more markups.']],
    5: ['Instant Facades', ['Select the building mass you want to dress.', 'The agent generates facade options — no manual modelling.', 'Compare options side by side and apply your pick.']]
  };
  var drawer = document.getElementById('demo-drawer');
  document.querySelectorAll('[data-demo]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var d = DEMOS[btn.dataset.demo];
      document.getElementById('demo-title').textContent = d[0];
      document.getElementById('demo-steps').innerHTML =
        d[1].map(function (s, i) { return '<li><strong>' + (i + 1) + '.</strong> ' + s + '</li>'; }).join('');
      drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false');
      var dv = drawer.querySelector('.demo-video');
      dv.classList.remove('play'); void dv.offsetWidth; dv.classList.add('play');
    });
  });
  function closeDrawer() { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); }
  document.getElementById('demo-close').addEventListener('click', closeDrawer);
  addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });

  // Cookie banner (RESEARCH §2)
  var cookies = document.getElementById('cookies');
  try {
    if (!localStorage.getItem('illoca-cookies')) cookies.hidden = false;
    var done = function (v) { localStorage.setItem('illoca-cookies', v); cookies.hidden = true; };
    document.getElementById('cookie-accept').addEventListener('click', function () { done('accepted'); });
    document.getElementById('cookie-reject').addEventListener('click', function () { done('rejected'); });
  } catch (e) { cookies.hidden = false; }

  // Anchor links: Lenis scrollTo when scroll.js is active, native fallback otherwise
  document.querySelectorAll('[data-scroll]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (window.__lenis) window.__lenis.scrollTo(target, { duration: 2.2 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
