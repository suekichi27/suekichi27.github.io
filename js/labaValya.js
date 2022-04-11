window.onload = function() {

    var width = window.innerWidth;
    var height = window.innerHeight;

    var canvas = document.querySelector('canvas');

// -----------------------------Создание сцены-------------------------------------------------
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    var renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);

    var scene = new THREE.Scene();
//--------------окружающий свет---------
    var light = new THREE.AmbientLight(0x888888);
    light.position.set( 0, 1, 1 ).normalize();
    scene.add(light);
//--------------точечный свет----------
    var pointLight = new THREE.PointLight(0xffffff, 3, 200000);
    pointLight.position.set(0,0,0);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.hight = 2048;
    scene.add(pointLight);

    var camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 30000);
    camera.position.set(0, 0, 15000);

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    var t = 0;
// -------------Создание анимации объектов-----------------------------------
    var rendering = function() {
        requestAnimationFrame(rendering);

 sun.rotation.y += 0.001;

        mercury.position.x = Math.sin(t * 0.3) * 4000;
        mercury.position.z = Math.cos(t * 0.3) * 4000;

        venus.position.x = Math.sin(t * 0.2) * 5500;
        venus.position.z = Math.cos(t * 0.2) * 5500;
        
        earth.position.x = Math.sin(t * 0.1) * 7500;
        earth.position.z = Math.cos(t * 0.1) * 7500;
        earth.rotation.y += 0.004;


        mars.position.x = Math.sin(t * 0.08) * 8000;
        mars.position.z = Math.cos(t * 0.08) * 8000;

        jupiter.position.x = Math.sin(t * 0.08) * 10700;
        jupiter.position.z = Math.cos(t * 0.08) * 10700;

        saturn.position.x = Math.sin(t * 0.08) * 12000;
        saturn.position.z = Math.cos(t * 0.08) * 12000;
        ring.position.x = saturn.position.x;
        ring.position.z = saturn.position.z;
        
// --------------------------фиксирование камеры на планетах--------------------------------------------------


     // camera.lookAt(sun.position);

        camera.position.set(earth.position.x, 0, earth.position.z+500);
        camera.lookAt(earth.position);


   //      camera.position.set(mercury.position.x, 0, mercury.position.z + 500);
    //   camera.lookAt(mercury.position);

    //  camera.position.set(venus.position.x, 0, venus.position.z+500);
     // camera.lookAt(venus.position);

      //  camera.position.set(jupiter.position.x, 0, jupiter.position.z+500);
      //  camera.lookAt(jupiter.position);

      //  camera.position.set(saturn.position.x, 0, saturn.position.z+500);
      //  camera.lookAt(saturn.position);

    //  camera.position.set(mars.position.x, 0, mars.position.z+500);
   //   camera.lookAt(mars.position);

        t+=Math.PI/180*2;

        controls.update();
        renderer.render(scene, camera);
    };

    // ------------------------Создание объектов----------------------------------
    
    var loader = new THREE.TextureLoader();

    var sunTexture = loader.load('../img/sun.jpg');
    sunTexture.anisotropy = 6;
    var matSun = new THREE.MeshPhongMaterial({map: sunTexture, emissive: 0xD17F00});
    var geoSun = new THREE.SphereGeometry(2300, 80, 80);
    var sun = new THREE.Mesh(geoSun, matSun);
    scene.add(sun);
    
    var mercuryTexture = loader.load('../img/mercury.jpg');
    mercuryTexture.anisotropy = 16;
    var geoMercury = new THREE.SphereGeometry(60, 20, 20);
    var matMercury = new THREE.MeshPhongMaterial({map: mercuryTexture});
    var mercury = new THREE.Mesh(geoMercury, matMercury);
    mercury.castShadow = true;
    scene.add(mercury);

    var venusTexture = loader.load('../img/venus.jpg');
    venusTexture.anisotropy = 16;
    var geoVenus = new THREE.SphereGeometry(90, 20, 20);
    var matVenus = new THREE.MeshPhongMaterial({map: venusTexture});
    var venus = new THREE.Mesh(geoVenus, matVenus);
    venus.castShadow = true;
    scene.add(venus);

    var earthTexture = loader.load('../img/earth.jpg');
    earthTexture.anisotropy = 16;
    var geoEarth = new THREE.SphereGeometry(100, 40, 40);
    var matEarth = new THREE.MeshPhongMaterial({map: earthTexture});
    var earth = new THREE.Mesh(geoEarth, matEarth);
    earth.castShadow = true;
    scene.add(earth);

    var marsTexture = loader.load('../img/mars.jpg');
    marsTexture.anisotropy = 16;
    var geoMars = new THREE.SphereGeometry(80, 20, 20);
    var matMars = new THREE.MeshPhongMaterial({map: marsTexture});
    var mars = new THREE.Mesh(geoMars, matMars);
    mars.castShadow = true;
    scene.add(mars);

    var jupiterTexture = loader.load('../img/jupiter.jpg');
    jupiterTexture.anisotropy = 16;
    var geoJupiter = new THREE.SphereGeometry(350, 20, 20);
    var matJupiter = new THREE.MeshPhongMaterial({map: jupiterTexture});
    var jupiter = new THREE.Mesh(geoJupiter, matJupiter);
    jupiter.castShadow = true;
    scene.add(jupiter);

    var saturnTexture = loader.load('./img/saturn.jpg');
    saturnTexture.anisotropy = 16;
    var geoSaturn = new THREE.SphereGeometry(230, 20, 20);
    var matSaturn = new THREE.MeshPhongMaterial({map: saturnTexture});
    var saturn = new THREE.Mesh(geoSaturn, matSaturn);
    saturn.castShadow = true;
    scene.add(saturn);
//---------------------добавление кольца Сатурну----------------
    var ringSaturnGeometry = new THREE.Geometry();
    var ringSaturnMat = new THREE.PointsMaterial({ color: 0x3A3A3A, size: 1, sizeAttenuation: false });

    for (var i = 0; i < 20000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.sin(Math.PI / 180 * i) * (550 - i / 80);
        vertex.y = Math.random()*20;
        vertex.z = Math.cos(Math.PI / 180 * i) * (550 - i / 80);
        ringSaturnGeometry.vertices.push(vertex);
    }
    //---------------------создание системы частиц----------------
    
    var ring = new THREE.Points(ringSaturnGeometry, ringSaturnMat);
    ring.castShadow = true;

    scene.add(ring);

    rendering();
}