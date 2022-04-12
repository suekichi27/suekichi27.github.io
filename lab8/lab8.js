// применяем текстуру к планете
const applyTexture = (image) => {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(image);
  texture.anisotropy = 16;
  return texture;
}

// создаем планету
const createPlanet = (radius, widthSeg, heightSeg, image) => {
  const texture = applyTexture(image);
  const geometry = new THREE.SphereGeometry(radius, widthSeg, heightSeg);
  let material;

  if (radius === 2300) {
    material = new THREE.MeshPhongMaterial( {map: texture, emissive: 0xff0000});
    return new THREE.Mesh(geometry, material);
  }

  material = new THREE.MeshPhongMaterial({map: texture});
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
}

const createOrbit = function (orbitRadius){

  this.draw = function (scene){
      const orbitGeometry = new THREE.Geometry();
      let material;

      if (orbitRadius === 7500) {
        material = new THREE.PointsMaterial({color: 0xbfbfbf, opacity: 0.3, opacity: true, size: 1, sizeAttenuation: false});
      } else {
        material = new THREE.PointsMaterial({color: 0xbfbfbf, size: 1, sizeAttenuation: false});
      }

      for (let i = 0; i < 500; i++) {
          let vertex = new THREE.Vector3();
          vertex.x = Math.sin(180 / Math.PI  * i) * orbitRadius;
          vertex.z = Math.cos(180 / Math.PI  * i) * orbitRadius;
          orbitGeometry.vertices.push(vertex);
      }
      
      const orbit = new THREE.Points(orbitGeometry, material);
      scene.add(orbit);
      return orbit;
  }
}

// задаем вращение планете
const setDefaultRotation = (mesh, t, speed, distance) => {
  mesh.position.x = Math.sin(t * speed) * distance;
  mesh.position.z = Math.cos(t * speed) * distance;
}

// переход к планете
const navigateToPlanet = (mesh, camera) => {
  camera.position.set(mesh.position.x, 500, mesh.position.z + 1500);
  camera.lookAt(mesh.position);
}

// создаем звездное небо
const addStars = (chosenColor, multiplyValue) => {
  const starsGeometry = new THREE.Geometry();
  const starsMaterial = new THREE.PointsMaterial({ color: chosenColor, opacity: 0.1, opacity: true, size: 1, sizeAttenuation: false});

  for (let i = 0; i < 20000; i++) {
    const vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.multiplyScalar(multiplyValue);
    starsGeometry.vertices.push(vertex);
  }

  const stars = new THREE.Points(starsGeometry, starsMaterial);
  stars.scale.set(200, 200, 200);
  return stars;
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
  camera.position.set(0, 0, 25000);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // создаем источники света
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  const pointLight = new THREE.PointLight(0x222222, 3, 200000);
  pointLight.position.set(0,0,0);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;
  scene.add(pointLight);

  // наполняем солнечную систему
  const sun = createPlanet(2300, 80, 80, '../img/sun_2k.jpg');
  const earth = createPlanet(100, 40, 40, '../img/earth_2k.jpg');
  const mercury = createPlanet(60, 20, 20, '../img/mercury_2k.jpg');
  const venus = createPlanet(90, 20, 20, '../img/venus_2k.jpg');
  const mars = createPlanet(80, 20, 20, '../img/mars_2k.jpg');
  const jupiter = createPlanet(350, 20, 20, '../img/jupiter_2k.jpg');
  const saturn = createPlanet(230, 40, 40, '../img/saturn_2k.jpg');
  const uranus = createPlanet(150, 40, 40, '../img/uranus_2k.jpg');
  const neptune = createPlanet(140, 40, 40, '../img/neptune_2k.jpg');
  const pluto = createPlanet(40, 20, 20, '../img/pluto_2k.jpg');

  scene.add(sun);
  scene.add(earth);
  scene.add(mercury);
  scene.add(venus);
  scene.add(mars);
  scene.add(jupiter);
  scene.add(saturn);
  scene.add(uranus);
  scene.add(neptune);
  scene.add(pluto);

  // создаем кольцо Сатурна
  const ringSaturnGeometry = new THREE.Geometry();
  const ringSaturnMat = new THREE.PointsMaterial({ color: 0x3A3A3A, size: 1, sizeAttenuation: false });

  for (let i = 0; i < 20000; i++) {
      const vertex = new THREE.Vector3();
      vertex.x = Math.sin(180 / Math.PI  * i) * (550 - i / 80);
      vertex.y = Math.random() * 20;
      vertex.z = Math.cos(180 / Math.PI  * i) * (550 - i / 80);
      ringSaturnGeometry.vertices.push(vertex);
  }

  // создаем систему частиц
  const ring = new THREE.Points(ringSaturnGeometry, ringSaturnMat);
  ring.castShadow = true;
  scene.add(ring);


  // добавляем орбиты планетам
  const earthOrbit = new createOrbit(7500);
  const mercuryOrbit = new createOrbit(4000);
  const venusOrbit = new createOrbit(5500);
  const marsOrbit = new createOrbit(8000);
  const jupiterOrbit = new createOrbit(10700);
  const saturnOrbit = new createOrbit(12000);
  const uranusOrbit = new createOrbit(15000);
  const neptuneOrbit = new createOrbit(17000);
  const plutoOrbit = new createOrbit(20000);

  earthOrbit.draw(scene);
  mercuryOrbit.draw(scene);
  venusOrbit.draw(scene);
  marsOrbit.draw(scene);
  jupiterOrbit.draw(scene);
  saturnOrbit.draw(scene);
  uranusOrbit.draw(scene);
  neptuneOrbit.draw(scene);
  plutoOrbit.draw(scene);

  // добавляем звезды
  const starsWhite = addStars(0xffffff, 2000);
  const starsBlue = addStars(0x6B6BA3, 3000);

  scene.add(starsWhite);
  scene.add(starsBlue);

  let t = 0;

  // вызываем метод рендерера и передаем в него сцену и камеру
  let rendering = () => {
    requestAnimationFrame(rendering);

    sun.rotation.y += 0.001;

    ring.position.x = saturn.position.x;
    ring.position.z = saturn.position.z;
    ring.rotation.y += 0.001;

    setDefaultRotation(earth, t, 0.5, 7500);
    setDefaultRotation(mercury, t, 0.2, 4000);
    setDefaultRotation(venus, t, 0.2, 5500);
    setDefaultRotation(mars, t, 0.08, 8000);
    setDefaultRotation(jupiter, t, 0.08, 10700);
    setDefaultRotation(saturn, t, 0.03, 12000);
    setDefaultRotation(uranus, t, 0.02, 15000);
    setDefaultRotation(neptune, t, 0.01, 17000);
    setDefaultRotation(pluto, t, 0.008, 20000);

    // navigateToPlanet(saturn, camera);

    t += 0.01;
    controls.update();
    renderer.render(scene, camera);
  };

  rendering();
}