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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  width: Number,
  height: Number,
  mesh: String,
  texture: String
});


const parsedTexture = computed(() => {
  return import.meta.env.VITE_API_URL + props.texture
});
const parsedMesh = computed(() => {
  return import.meta.env.VITE_API_URL + props.mesh;
});

const container = ref(null);
let scene, camera, renderer, controls, animationId;

const init = () => {
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

  camera.position.set(2.75, 1.94, 4.76);

  // Renderer setup
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight);
  container.value.appendChild(renderer.domElement);

  // Orbit controls setup
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxDistance = 7;
  controls.minDistance = 2.5;

  // Initialize texture
  const texture = new THREE.TextureLoader().load(
    parsedTexture.value
  );

  // Load GLTF model
  const loader = new GLTFLoader();
  loader.load(
    parsedMesh.value,
    (gltf) => {
      const phongMaterial = new THREE.MeshBasicMaterial({ map: texture });
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = phongMaterial;
        }
      });
      scene.add(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
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
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

const cleanupThreeJs = () => {
  if (renderer) {
    renderer.dispose();
  }
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
};

onMounted(() => {
  const modalElement = document.getElementById("D3Modal");
  modalElement.addEventListener("shown.bs.modal", () => {
    if (!renderer) {
      init();
      animate();
    } else {
      renderer.setSize(
        container.value.offsetWidth,
        container.value.offsetHeight
      );
      camera.aspect =
        container.value.offsetWidth / container.value.offsetHeight;
      camera.updateProjectionMatrix();
    }
  });

  modalElement.addEventListener("hidden.bs.modal", cleanupThreeJs);
});

onBeforeUnmount(cleanupThreeJs);
</script>

<style scoped>
div {
  display: block;
}
</style>
