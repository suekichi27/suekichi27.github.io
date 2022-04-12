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

  // создаем звездное небо
  const starsGeometry = new THREE.Geometry();
  const starsMaterial = new THREE.PointsMaterial({ color: 0xA8A8FF, opacity: 0.1, opacity: true, size: 1, sizeAttenuation: false});

  for (let i = 0; i < 20000; i++) {
    const vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.multiplyScalar(2000);
    starsGeometry.vertices.push(vertex);
  }

  const stars = new THREE.Points(starsGeometry, starsMaterial);
  stars.scale.set(200, 200, 200);
  scene.add(stars);

  let t = 0;

  // вызываем метод рендерера и передаем в него сцену и камеру
  let rendering = () => {
    requestAnimationFrame(rendering);

    controls.update();
    renderer.render(scene, camera);
  };

  rendering();
}