<template>
  <div ref="container"></div>
</template>

<script setup>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ref, onMounted } from "vue";

const container = ref(null);
let scene, camera, renderer, controls;

onMounted(() => {
  init();
  animate();
});

function init() {
  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xebebeb);

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer setup
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value.appendChild(renderer.domElement);

  // Orbit controls setup
  controls = new OrbitControls(camera, renderer.domElement);

  // Load GLTF model
  const loader = new GLTFLoader();
  loader.load(
    "http://localhost:7890/uploads/mesh/cone.glb", // Update with correct path
    function (gltf) {
      const phongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = phongMaterial;
        }
      });
      scene.add(gltf.scene);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.log(error);
    }
  );

  // Add lights to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(1, 0, 0);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(0, 1, 0);
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight3.position.set(0, 0, 1);
  scene.add(directionalLight3);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
</script>
