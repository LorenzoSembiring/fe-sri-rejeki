<template>
  <LayoutDefault>
    <div class="header">
      <div class="col h2 text-header px-4">Kategori</div>
    </div>
    <div class="col justify-content-end d-flex px-5">
      <button class="btn button-coklat py-2" @click="routeToAddCategoryView">
        + Tambah Kategori
      </button>
    </div>
    <div class="bg-light mt-4 p-4">
      <div class="p-4 mb-2 rounded border bg-white">
				<div>
					
				</div>
			</div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import router from "../../router/index.js";

function routeToAddCategoryView() {
  router.push("/admin/add-category");
}
</script>

<style scoped>
.header {
  margin-top: 10vh;
}
.text-header {
  color: #402218;
}
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #d7b19d;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
</style>
