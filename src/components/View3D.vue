<template>
  <div
    ref="container"
    :style="{ width: `${width}px`, height: `${height}px` }"
  ></div>
</template>

<script setup>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ref, onMounted } from "vue";

const props = defineProps({
  width: Number,
  height: Number,
  texture: String,
  mesh: String,
});

const parsedTexture = import.meta.env.VITE_API_URL + props.texture;
const parsedMesh = import.meta.env.VITE_API_URL + props.mesh;

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
    container.value.offsetWidth / container.value.offsetHeight,
    0.1,
    1000
  );

  console.log(container.value.style.width);
  camera.position.x = 2.7488196461488967;
  camera.position.y = 1.9438984306648681;
  camera.position.z = 4.76080344523951;

  // Renderer setup
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight);
  container.value.appendChild(renderer.domElement);

  // Orbit controls setup
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxDistance = 7;
  controls.minDistance = 2.5;

  // Initialize texture
  const texture = new THREE.TextureLoader().load(parsedTexture);

  // Load GLTF model
  const loader = new GLTFLoader();
  loader.load(
    parsedMesh, // Update with correct path
    function (gltf) {
      const phongMaterial = new THREE.MeshBasicMaterial({ map: texture });
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
