import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    const objects = [];

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 10);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('gray');

    {
        const skyColor = 0xFFFFFF;  // light blue
        const groundColor = 0xFFFFFF;  // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
    }

    function addlight(...pos) {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(...pos);
        scene.add(light);
        scene.add(light.target);
    }
    addlight(10, 10, 10);
    addlight(10, -10, 10);

    const models = {
        membrane: { url: 'assets/animal_cell/membrane.gltf' },
        cytoplasm: { url: 'assets/animal_cell/cytoplasm.gltf' },
        mitochondria: { url: 'assets/animal_cell/mitochondria.gltf' },
        golgi: { url: 'assets/animal_cell/golgi.gltf' },
        nucleus: { url: 'assets/animal_cell/nucleus.gltf' },
        er: { url: 'assets/animal_cell/er.gltf' },
        vl: { url: 'assets/animal_cell/vl.gltf' }
    }

    {
        const gltfLoader = new GLTFLoader();
        for (const model of Object.values(models)) {
            gltfLoader.load(model.url, (gltf) => {
                model.gltf = gltf;
                scene.add(gltf.scene);
                objects.push(gltf.scene);
            });
        }
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
    }
    
    function render() {
        // console.log(camera.position);
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        // console.log(objects);

        var n = document.getElementById("n");
        var er = document.getElementById("er");
        var ga = document.getElementById("ga");
        var m = document.getElementById("m");
        var vl = document.getElementById("vl");
        var mc = document.getElementById("mc");

        if (mc.checked == false && n.checked == false && er.checked == false &&  ga.checked == false &&  m.checked == false &&  vl.checked == false) {
            for (var i=0; i<objects.length; i++) {
                objects[i].visible = true;
            }
        } else {
            for (var i=0; i<objects.length; i++) {
                objects[i].visible = false;
            }
            if (mc.checked == true) {
                // console.log("n");
                // 4
                objects[0].visible = true;
                objects[1].visible = true;
            }
            if (n.checked == true) {
                // console.log("n");
                // 4
                objects[4].visible = true;
            }
            if (er.checked == true) {
                // console.log("er");
                // 5
                objects[5].visible = true;
            }
            if (ga.checked == true) {
                // console.log("ga");
                // 3
                objects[3].visible = true;
            }
            if (m.checked == true) {
                // console.log("m");
                // 2
                objects[2].visible = true;
            }
            if (vl.checked == true) {
                // console.log("vl");
                // 6
                objects[6].visible = true;
            }
        }
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
}

main();