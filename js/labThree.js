window.onload = () => {

  //высота и ширина
  const width = window.innerWidth;
  const height = window.innerHeight;

  // по id получаем тег canv
  const canvas = document.getElementById('canvas');

  // растягиваем на весь экран
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  // создаем объект рендера для сцены
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setClearColor(0x000000);

  // создаем сцену
  const scene = new THREE.Scene();

  // создаем камеру
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300000);
  camera.position.set(0, 0, 15000);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // создаем источник рассеянного света
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  const sunTexture = new THREE.TextureLoader().load('sun.jpg');
  sunTexture.anisotropy = 16;

  const geoSun = new THREE.SphereGeometry(2300, 80, 80);
  const matSun = new THREE.MeshPhongMaterial({ map: sunTexture, emissive: 0xff0000 });
  const sun = new THREE.Mesh(geoSun, matSun);
  scene.add(sun);

  const geoEarth = new THREE.SphereGeometry(100, 40, 40);
  const matEarth = new THREE.MeshNormalMaterial();
  const earth = new THREE.Mesh(geoEarth, matEarth);
  scene.add(earth);

  const geoMercury = new THREE.SphereGeometry(60, 20, 20);
  const matMercury = new THREE.MeshNormalMaterial();
  const mercury = new THREE.Mesh(geoMercury, matMercury);
  scene.add(mercury);

  const geoVenus = new THREE.SphereGeometry(90, 20, 20);
  const matVenus = new THREE.MeshNormalMaterial();
  const venus = new THREE.Mesh(geoVenus, matVenus);
  scene.add(venus);

  const geoMars = new THREE.SphereGeometry(80, 20, 20);
  const matMars = new THREE.MeshNormalMaterial();
  const mars = new THREE.Mesh(geoMars, matMars);
  scene.add(mars);

  const clock = new THREE.Clock();

  let frameTime = 0;

  let t = 0;

  // вызываем метод рендерера и передаем в него сцену и камеру
  let rendering = () => {
    requestAnimationFrame(rendering);

    frameTime = clock.getDelta();

    t += 0.5 * frameTime;

    sun.rotation.y += 0.001;

    earth.position.x = Math.sin(t * 0.5) * 7500;
    earth.position.z = Math.cos(t * 0.5) * 7500;

    mercury.position.x = Math.sin(t * 0.3) * 4000;
    mercury.position.z = Math.cos(t * 0.3) * 4000;

    venus.position.x = Math.sin(t * 0.2) * 5500;
    venus.position.z = Math.cos(t * 0.2) * 5500;

    mars.position.x = Math.sin(t * 0.1) * 8000;
    mars.position.z = Math.cos(t * 0.1) * 8000;

    controls.update();
    renderer.render(scene, camera);
  };
  rendering();

}