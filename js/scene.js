// illoca clone — Three.js diorama (Phase 2 core).
// Phase 1 stub: a paper-toned scene with a desk plane, a stepped massing model and
// model trees, so the canvas is alive from day one. The scroll-driven camera path
// (6 beats, RESEARCH §5) is keyframed in js/scroll.js in Phase 2.
(function () {
  if (!window.THREE) return;
  var canvas = document.getElementById('scene');
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 3.2, 8.5);
  camera.lookAt(0, 0.6, 0);

  scene.add(new THREE.AmbientLight(0xfff4e0, 0.9));
  var sun = new THREE.DirectionalLight(0xffffff, 1.1);
  sun.position.set(4, 7, 5); sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024); scene.add(sun);

  var mat = function (c) { return new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 }); };
  var box = function (w, h, d, c, x, y, z, ry) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c));
    m.position.set(x, y, z); if (ry) m.rotation.y = ry;
    m.castShadow = true; m.receiveShadow = true; scene.add(m); return m;
  };
  // Room: floor + back wall (paper tones, duotone blue/grey scene like the original)
  var floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), mat(0xd9d0ba));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -0.95; scene.add(floor);
  box(16, 8, 0.2, 0xcfd6e4, 0, 3, -3.4);
  // Window with skyline silhouette (back wall, left of centre)
  box(4.6, 3.6, 0.1, 0xaebfe0, -2.6, 2.2, -3.25);
  [[-4.4, 1.1, 0.5, 1.6], [-3.7, 1.5, 0.6, 2.4], [-2.9, 1.2, 0.55, 1.9], [-2.1, 1.6, 0.6, 2.7], [-1.4, 1.1, 0.5, 1.5]].forEach(function (b) {
    box(b[2], b[3], 0.06, 0x5f7599, b[0], b[1], -3.18);
  });
  box(4.6, 0.09, 0.12, 0x41506b, -2.6, 4.02, -3.2); box(4.6, 0.09, 0.12, 0x41506b, -2.6, 0.38, -3.2);
  box(0.09, 3.6, 0.12, 0x41506b, -2.6, 2.2, -3.2);
  // Pinboard of sketches (right of window)
  box(2.2, 1.7, 0.08, 0xe9e2cf, 0.6, 2.5, -3.25);
  box(0.55, 0.7, 0.1, 0xffffff, 0.15, 2.65, -3.2, 0.15); box(0.5, 0.62, 0.1, 0xf5efe3, 0.95, 2.4, -3.2, -0.2);
  // Bookshelf (right side)
  box(1.7, 3.4, 0.5, 0x4a6db3, 3.6, 0.75, -3.0);
  [0.5, 1.15, 1.8].forEach(function (y) {
    [0xc7d2e8, 0xe76051, 0xf5efe3, 0x8fa3c8].forEach(function (c, i) {
      box(0.22, 0.5, 0.34, c, 3.05 + i * 0.36, y, -2.95);
    });
  });
  // Desk
  var desk = new THREE.Mesh(new THREE.BoxGeometry(7, 0.18, 3.6), mat(0x8fa3c8));
  desk.position.y = 0; desk.receiveShadow = true; desk.castShadow = true; scene.add(desk);
  [[-3.3, -1.6], [3.3, -1.6], [-3.3, 1.6], [3.3, 1.6]].forEach(function (p) {
    box(0.14, 0.9, 0.14, 0x41506b, p[0], -0.5, p[1]);
  });
  // Designer, seen from behind: torso + head + bun + chair back
  var figure = new THREE.Group();
  var torso = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.46, 0.95, 14), mat(0x33415e));
  torso.position.y = 0.55; figure.add(torso);
  var head = new THREE.Mesh(new THREE.SphereGeometry(0.27, 16, 16), mat(0xc9a486));
  head.position.y = 1.3; figure.add(head);
  var bun = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 10), mat(0x2b2118));
  bun.position.set(0, 1.52, 0.14); figure.add(bun);
  var hair = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), mat(0x2b2118));
  hair.scale.set(1, 0.82, 1); hair.position.set(0, 1.38, 0.05); figure.add(hair);
  var chair = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.0, 0.12), mat(0x222c44));
  chair.position.set(0, 0.35, 0.55); figure.add(chair);
  figure.position.set(1.7, -0.3, 3.1); figure.rotation.y = Math.PI; figure.scale.setScalar(0.82);
  scene.add(figure);
  // Desk lamp (left), plant (right), notebook + pencil on the desk
  box(0.3, 0.06, 0.3, 0x41506b, -3.0, 0.12, -1.2);
  var lampArm = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.1, 8), mat(0x41506b));
  lampArm.position.set(-2.85, 0.62, -1.2); lampArm.rotation.z = -0.5; scene.add(lampArm);
  var lampHead = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.3, 12), mat(0xe76051));
  lampHead.position.set(-2.55, 1.15, -1.2); lampHead.rotation.z = 0.7; scene.add(lampHead);
  var pot = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.26, 10), mat(0xb0562f));
  pot.position.set(3.1, 0.22, -1.3); scene.add(pot);
  [[3.1, 0.62, -1.3], [2.95, 0.52, -1.2], [3.25, 0.54, -1.4]].forEach(function (p) {
    var leaf = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 8), mat(0x7d9b6a));
    leaf.position.set(p[0], p[1], p[2]); scene.add(leaf);
  });
  box(0.8, 0.05, 1.05, 0xffffff, 0.6, 0.12, 0.9, 0.4);
  var pencil = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.55, 6), mat(0xe8a13a));
  pencil.rotation.z = Math.PI / 2; pencil.rotation.y = 0.5; pencil.position.set(-1.0, 0.14, 0.75); scene.add(pencil);
  // Books stack on the desk
  box(0.62, 0.09, 0.45, 0x4a6db3, -2.6, 0.14, 0.9); box(0.55, 0.08, 0.4, 0xf5efe3, -2.6, 0.23, 0.9, 0.2);
  // Tracing-paper plan on the desk
  var plan = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.2),
    new THREE.MeshStandardMaterial({ color: 0xf5efe3, transparent: true, opacity: 0.92, roughness: 1 }));
  plan.rotation.x = -Math.PI / 2; plan.position.set(-1.2, 0.11, 0.2); scene.add(plan);
  // Floor-plan line art drawn on the tracing paper (walls of a small apartment)
  (function () {
    var pts = [];
    function rect(x1, z1, x2, z2) { pts.push(x1, z1, x2, z1, x2, z1, x2, z2, x2, z2, x1, z2, x1, z2, x1, z1); }
    rect(-1.55, -1.0, 1.55, 1.0); rect(-1.55, -1.0, -0.2, 0.15); rect(-0.2, 0.15, 0.75, 1.0); rect(0.75, -1.0, 1.55, -0.25);
    var arr = new Float32Array(pts.length * 3);
    for (var i = 0; i < pts.length; i += 2) { arr[(i / 2) * 3] = pts[i]; arr[(i / 2) * 3 + 1] = 0; arr[(i / 2) * 3 + 2] = pts[i + 1]; }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    var lines = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x41506b }));
    lines.position.set(-1.2, 0.125, 0.2); scene.add(lines);
  })();
  // Facade texture: window grid drawn on a canvas (Feature 5 reads as a real tower)
  function facadeTexture(base, win) {
    var c = document.createElement('canvas'); c.width = 128; c.height = 128;
    var g = c.getContext('2d');
    g.fillStyle = base; g.fillRect(0, 0, 128, 128);
    g.fillStyle = win;
    for (var y = 10; y < 118; y += 22) for (var x = 10; x < 118; x += 22) g.fillRect(x, y, 12, 14);
    var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
  }
  var facadeMat = new THREE.MeshStandardMaterial({ map: facadeTexture('#b9c4d6', '#41506b'), roughness: 0.85 });
  var facadeMat2 = new THREE.MeshStandardMaterial({ map: facadeTexture('#a7b6cf', '#31435f'), roughness: 0.85 });
  // Stepped massing model (rises for Feature 2 — animated in Phase 2)
  var massing = new THREE.Group();
  [[2.2, 0.5, 1.8, 0], [1.7, 0.5, 1.4, 0.5], [1.1, 0.5, 1.0, 1.0], [0.7, 0.55, 0.7, 1.5]].forEach(function (b, i) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(b[0], b[1], b[2]), i % 2 ? facadeMat2 : facadeMat);
    m.castShadow = true; m.receiveShadow = true;
    m.position.y = b[3] + b[1] / 2; massing.add(m);
  });
  // Balcony slabs on the tower (Feature 5 detail)
  [0.35, 0.85, 1.35, 1.85].forEach(function (y) {
    var s = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.05, 0.3), mat(0x8fa3c8));
    s.position.set(0, y, 0.95); massing.add(s);
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
  // Pause rendering while the flight is off-screen (perf — Phase 4)
  var inView = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { inView = e[0].isIntersecting; }, { threshold: 0.02 })
      .observe(document.getElementById('flight'));
  }
  (function loop() {
    requestAnimationFrame(loop);
    if (inView && !document.hidden) renderer.render(scene, camera);
  })();
})();
