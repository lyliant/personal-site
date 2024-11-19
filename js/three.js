//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

const bambooContainer = document.querySelector("#bamboo-forest-container");

let bambooScene, bambooCamera, bambooRenderer;

export function initBambooForest(THREE, GLTFLoader) {
    bambooScene = new THREE.Scene();
    bambooCamera = new THREE.PerspectiveCamera(75, bambooContainer.clientWidth / bambooContainer.clientHeight, 0.1, 1000);

    bambooRenderer = new THREE.WebGLRenderer({ antialias: true });
    bambooRenderer.setSize(bambooContainer.clientWidth, bambooContainer.clientHeight);
    bambooRenderer.setAnimationLoop(animateBambooForest);
    bambooContainer.appendChild(bambooRenderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(3, 4, 5);
    bambooScene.add(light);

    const loader = new GLTFLoader();
    loader.load('assets/Bamboo_Forest.gltf', function (gltf) {
        const bambooForest = gltf.scene;
        bambooScene.add(bambooForest);
        bambooForest.scale.set(2, 2, 2);
        bambooForest.position.set(0, -1, 0);
    }, undefined, (error) => {
        console.error("Error loading Bamboo_Forest model:", error);
    });

    bambooCamera.position.z = 5;
}

function animateBambooForest() {
    requestAnimationFrame(animateBambooForest);
    bambooScene.traverse((object) => {
        if (object.isMesh) object.rotation.y += 0.01;
    });
    bambooRenderer.render(bambooScene, bambooCamera);
}

initBambooForest();

window.addEventListener('resize', () => {
    bambooCamera.aspect = bambooContainer.clientWidth / bambooContainer.clientHeight;
    bambooCamera.updateProjectionMatrix();
    bambooRenderer.setSize(bambooContainer.clientWidth, bambooContainer.clientHeight);
});
