window.onload = function(){
  
  //высота и ширина
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // по id получаем тег canv
  const canvas = document.getElementById('canvas');
  
  // растягиваем на весь экран
  canvas.setAttribute('width',width);
  canvas.setAttribute('height',height);
  
  // создаем объект рендера для сцены
  const renderer = new THREE.WebGLRenderer({canvas:canvas});
  renderer.setClearColor(0x000000);
  
  // создаем сцену
  const scene = new THREE.Scene();
  
  // создаем камеру
  const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 8000);
  camera.position.set(0, 0, 2000);

  const controls = new THREE.OrbitControls(camera,renderer.domElement);
  
  // вызываем метод рендерера и передаем в него сцену и камеру
  const rendering = function(){
    requestAnimationFrame(rendering);
    controls.update();
    renderer.render(scene,camera);
  }
  rendering();
  
  // создаем источник рассеянного света
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);
  
  // далее заполняем сцену примитивами
  const geometry = new THREE.PlaneGeometry(300,300,12,12);
  const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  mesh.position.x = -1000;

  const geoCube = new THREE.CubeGeometry(300,300,300);
  const matCube = new THREE.MeshNormalMaterial();
  const meshCube = new THREE.Mesh(geoCube, matCube);
  scene.add(meshCube);

  meshCube.position.x = -800;
  meshCube.position.y = 200;

  const geoSphere = new THREE.SphereGeometry(150,32,16);
  const matSphere = new THREE.MeshNormalMaterial({wireframe: true});
  const meshSphere = new THREE.Mesh(geoSphere, matSphere);
  scene.add(meshSphere);

  meshSphere.position.x = -1200;
  meshSphere.position.y = 200;

  const geoCone = new THREE.ConeGeometry(150,200,64);
  const matCone = new THREE.MeshNormalMaterial({wireframe: true});
  const meshCone = new THREE.Mesh(geoCone, matCone);
  scene.add(meshCone);

  meshCone.position.x = -800;
  meshCone.position.y = -200;
  meshCone.rotateX(Math.PI/2);
  
  const geoCylinder = new THREE.CylinderGeometry(150,150,200,64);
  const matCylinder = new THREE.MeshNormalMaterial();
  const meshCylinder = new THREE.Mesh(geoCylinder, matCylinder);
  scene.add(meshCylinder);

  meshCylinder.position.x = -1200;
  meshCylinder.position.y = -200;
  meshCylinder.rotateX(Math.PI/2);

  const geoTorus = new THREE.TorusGeometry(150,50,64,200);
  const matTorus = new THREE.MeshNormalMaterial();
  const meshTorus1 = new THREE.Mesh(geoTorus, matTorus);
  const meshTorus2 = new THREE.Mesh(geoTorus, matTorus);
  const meshTorus3 = new THREE.Mesh(geoTorus, matTorus);
  scene.add(meshTorus1);
  scene.add(meshTorus2);
  scene.add(meshTorus3);

  meshTorus1.position.x = -400;
  meshTorus2.position.x = 0;
  meshTorus3.position.x = 400;

  const geoRingOpen = new THREE.RingGeometry(130,150,32);
  const geoRingClosed = new THREE.RingGeometry(10,50,32);
  const matRing = new THREE.MeshNormalMaterial({wireframe: true});
  const meshRing1 = new THREE.Mesh(geoRingOpen, matRing);
  const meshRing2 = new THREE.Mesh(geoRingOpen, matRing);
  const meshRing3 = new THREE.Mesh(geoRingOpen, matRing);
  const meshRing4 = new THREE.Mesh(geoRingOpen, matRing);
  const meshRing5 = new THREE.Mesh(geoRingClosed, matRing);
  const meshRingAdd = new THREE.Mesh(geoRingOpen, material);
  scene.add (meshRing1);
  scene.add (meshRing2);
  scene.add (meshRing3);
  scene.add (meshRing4);
  scene.add (meshRing5);
  scene.add (meshRingAdd);

  meshRing1.position.x = 800;
  meshRing2.position.x = 1100;
  meshRing3.position.x = 950;
  meshRing3.position.y = -150;
  meshRing4.position.x = 1250;
  meshRing4.position.y = -150;
  meshRing5.position.x = 1400;
  meshRingAdd.position.z = 55;

  const geoCube1 = new THREE.CubeGeometry(300,300,300);
  const matCube1 = new THREE.MeshNormalMaterial({wireframe: true});
  const meshCube1 = new THREE.Mesh(geoCube1, matCube1);
  scene.add(meshCube1);

  meshCube1.position.x = -400;
  meshCube1.position.y = 400;

  const geoCube2 = new THREE.CubeGeometry(200,200,200,2,2,2);
  const matCube2 = new THREE.MeshNormalMaterial({wireframe: true});
  const meshCube2 = new THREE.Mesh(geoCube2, matCube2);
  scene.add(meshCube2);

  meshCube2.position.y = 400;

  const geoCube3 = new THREE.CubeGeometry(100,100,100,3,3,3);
  const matCube3 = new THREE.MeshNormalMaterial({wireframe: true});
  const meshCube3 = new THREE.Mesh(geoCube3, matCube3);
  scene.add(meshCube3);

  meshCube3.position.x = 400;
  meshCube3.position.y = 400;
  
}
