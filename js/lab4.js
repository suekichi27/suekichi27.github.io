// применяем текстуру к планете
const applyTexture = (image) => {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(image);
  texture.anisotropy = 16;
  return texture;
}

// создаем планету
const createPlanet = (rad, widthSeg, heightSeg, image) => {
  const texture = applyTexture(image);
  const geometry = new THREE.SphereGeometry(rad, widthSeg, heightSeg);
  let material;
  if (rad === 2300) {
    material = new THREE.MeshPhongMaterial( {map: texture, emissive: 0xff0000});
  }
  material = new THREE.MeshPhongMaterial({map: texture});
  return new THREE.Mesh(geometry, material);
}

// задаем вращение планете
const setDefaultRotation = (mesh, t, speed, distance) => {
  mesh.position.x = Math.sin(t * speed) * distance;
  mesh.position.z = Math.cos(t * speed) * distance;
}

window.onload = () => {

  // высота и ширина
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

  // наполняем солнечную систему
  const sun = createPlanet(2300, 80, 80, 'js/img/sun_2k.jpg');
  const earth = createPlanet(100, 40, 40, 'js/img/earth.jpg');
  const mercury = createPlanet(60, 20, 20, 'js/img/mercury.jpg');
  const venus = createPlanet(900, 20, 20, 'js/img/venus.jpg');
  const mars = createPlanet(80, 20, 20, 'js/img/mars.jpg');
  const jupiter = createPlanet(1500, 20, 20, 'js/img/jupiter.jpg');
  const saturn = createPlanet(1000, 80, 80, 'js/img/saturn.jpg');
  const uranus = createPlanet(600, 80, 80, 'js/img/uranus.jpg');
  const neptune = createPlanet(800, 80, 80, 'js/img/neptune.jpg');

  scene.add(sun);
  scene.add(earth);
  scene.add(mercury);
  scene.add(venus);
  scene.add(mars);
  scene.add(jupiter);
  scene.add(saturn);
  scene.add(uranus);
  scene.add(neptune);

  let t = 0;

  // вызываем метод рендерера и передаем в него сцену и камеру
  let rendering = () => {
    requestAnimationFrame(rendering);

    sun.rotation.y += 0.001;

    setDefaultRotation(earth, t, 0.5, 7500);
    setDefaultRotation(mercury, t, 0.2, 4000);
    setDefaultRotation(venus, t, 0.2, 5500);
    setDefaultRotation(mars, t, 0.08, 8000);
    setDefaultRotation(jupiter, t, 0.08, 13000);
    setDefaultRotation(saturn, t, 0.03, 17000);
    setDefaultRotation(uranus, t, 0.02, 25000);
    setDefaultRotation(neptune, t, 0.01, 30000);

    t += 0.01;
    controls.update();
    renderer.render(scene, camera);
  };

  rendering();
}