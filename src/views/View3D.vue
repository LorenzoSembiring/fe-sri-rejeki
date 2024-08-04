<template>
  <div>
    <div class="p-2">
      <a :href="href"> <Icon icon="material-symbols:arrow-back" /> Kembali </a>
    </div>
    <div class="d-flex justify-content-center">
      <View3D
        :height="500"
        :width="1000"
        :mesh="meshData.path"
        :texture="meshData.texture"
        v-if="meshData"
        :style="{ cursor: isGrabbing ? 'grabbing' : 'grab' }"
        @mousedown="startGrabbing"
        @mouseup="stopGrabbing"
        @mouseleave="stopGrabbing"
      />
    </div>
  </div>
</template>

<script setup>
import View3D from "@/components/View3D.vue";
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";

const route = useRoute();

const id = ref("");
const meshData = ref(null);

const isGrabbing = ref(false);
const href = ref('');

const updateHref = (id) => {
  href.value = `/product/${id}`;
};
const startGrabbing = () => {
  isGrabbing.value = true;
};

const stopGrabbing = () => {
  isGrabbing.value = false;
};

async function fetchMesh() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/mesh/get-product/" + id.value
    );
    meshData.value = response.data.data;
  } catch (error) {
    console.log("Error fetching mesh:", error);
  }
}

onMounted(async () => {
  id.value = route.params.id;
  await fetchMesh();
  updateHref(id.value)
});
</script>
