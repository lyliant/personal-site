// Import necessary components from Three.js
import * as THREE from "three";

let scene, camera, renderer, stars;

function init() {
  // Scene and Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75, // FOV
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
  );
  camera.position.z = 5;

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("three-js-background").appendChild(renderer.domElement);

  // Star Geometry
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 5000;

  const positions = new Float32Array(starCount * 3); // 3 values per vertex (x, y, z)
  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 200; // Spread stars across space
  }

  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  // Star Material
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
  });

  // Combine Geometry and Material into Points
  stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Responsive Design
  window.addEventListener("resize", onWindowResize);

  // Animation
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // Star Rotation
  stars.rotation.x += 0.001;
  stars.rotation.y += 0.001;

  renderer.render(scene, camera);
}

// Initialize Three.js
init();
