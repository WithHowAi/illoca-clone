// illoca clone — Three.js diorama (Phase 2 core).
// Phase 1 stub: a paper-toned scene with a desk plane, a stepped massing model and
// model trees, so the canvas is alive from day one. The scroll-driven camera path
// (6 beats, RESEARCH §5) is keyframed in js/scroll.js in Phase 2.
(function () {
  if (!window.THREE) return;
  var canvas = document.getElementById('scene');
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 3.2, 8.5);
  camera.lookAt(0, 0.6, 0);

  scene.add(new THREE.AmbientLight(0xfff4e0, 0.9));
  var sun = new THREE.DirectionalLight(0xffffff, 1.1);
  sun.position.set(4, 7, 5); scene.add(sun);

  var mat = function (c) { return new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 }); };
  // Desk
  var desk = new THREE.Mesh(new THREE.BoxGeometry(7, 0.18, 3.6), mat(0x8fa3c8));
  desk.position.y = 0; scene.add(desk);
  // Tracing-paper plan on the desk
  var plan = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.2),
    new THREE.MeshStandardMaterial({ color: 0xf5efe3, transparent: true, opacity: 0.92, roughness: 1 }));
  plan.rotation.x = -Math.PI / 2; plan.position.set(-1.2, 0.11, 0.2); scene.add(plan);
  // Stepped massing model (rises for Feature 2 — animated in Phase 2)
  var massing = new THREE.Group();
  [[2.2, 0.5, 1.8, 0], [1.7, 0.5, 1.4, 0.5], [1.1, 0.5, 1.0, 1.0]].forEach(function (b) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(b[0], b[1], b[2]), mat(0xb9c4d6));
    m.position.y = b[3] + b[1] / 2; massing.add(m);
  });
  massing.position.set(1.9, 0.1, -0.2); scene.add(massing);
  // In-scene prompt bar (Feature 3 mock — fades in during beat 3, js/scroll.js)
  var promptBar = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.42),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 }));
  promptBar.rotation.x = -Math.PI / 2; promptBar.position.set(0.2, 0.16, 1.15); scene.add(promptBar);
  // Red markup ring (Feature 4 — fades in during beat 4)
  var ring = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.5, 40),
    new THREE.MeshBasicMaterial({ color: 0xe76051, transparent: true, opacity: 0, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2; ring.position.set(-1.5, 0.14, 0.1); scene.add(ring);
  // Model trees
  [[0.9, 1.1], [3.1, 0.7], [2.6, -1.1]].forEach(function (p) {
    var t = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), mat(0x7d9b6a));
    t.position.set(p[0], 0.45, p[1]); scene.add(t);
  });

  function resize() {
    var w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize); resize();

  window.__illocaScene = { scene: scene, camera: camera, massing: massing, plan: plan, promptBar: promptBar, ring: ring };
  (function loop() { requestAnimationFrame(loop); renderer.render(scene, camera); })();
})();
