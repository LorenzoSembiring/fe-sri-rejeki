<template>
  <LayoutDefault route="d3">
    <div class="header">
      <div class="col h2 text-header px-4">3D</div>
    </div>
    <div class="col justify-content-end d-flex px-5">
      <button class="btn button-coklat py-2" @click="routeToAdd3DView">
        + Tambah 3D Objek
      </button>
    </div>
    <div class="bg-light mt-4 p-4">
      <div class="p-4 mb-2 rounded border bg-white row row-gap-3">
        <div class="col-3">
          <div class="d-inline-block border rounded">
            <div class="m-2 justify-content-center d-flex">
              <View3D width="200" height="200"></View3D>
            </div>
            <div class="my-2 text-center fw-semibold">3D Model Blangkon</div>
          </div>
        </div>
        <div class="col-3">
          <div class="d-inline-block border rounded">
            <div class="m-2 justify-content-center d-flex">
              <View3D width="200" height="200"></View3D>
            </div>
            <div class="my-2 text-center fw-semibold">3D Model Blangkon</div>
          </div>
        </div>
        <div class="col-3">
          <div class="d-inline-block border rounded">
            <div class="m-2 justify-content-center d-flex">
              <View3D width="200" height="200"></View3D>
            </div>
            <div class="my-2 text-center fw-semibold">3D Model Blangkon</div>
          </div>
        </div>
        <div class="col-3">
          <div class="d-inline-block border rounded">
            <div class="m-2 justify-content-center d-flex">
              <View3D width="200" height="200"></View3D>
            </div>
            <div class="my-2 text-center fw-semibold">3D Model Blangkon</div>
          </div>
        </div>
        <div class="col-3">
          <div class="d-inline-block border rounded">
            <div class="m-2 justify-content-center d-flex">
              <View3D width="200" height="200"></View3D>
            </div>
            <div class="my-2 text-center fw-semibold">3D Model Blangkon</div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import View3D from "@/components/View3D.vue";
import router from "../../router/index.js";

function routeToAdd3DView() {
  router.push("/admin/add-3d");
}
</script>

<style scoped>
.header {
  margin-top: 5vh;
}
.text-header {
  color: #402218;
}
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #A77155;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
</style>
