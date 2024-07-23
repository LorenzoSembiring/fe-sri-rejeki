<template>
  <View3D :height="500" :width="1000" :mesh="meshData.path" :texture="meshData.texture" v-if="meshData" />
</template>

<script setup>
import View3D from "@/components/View3D.vue";
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();

const id = ref("");
const meshData = ref(null);

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
});
</script>
