<template>
  <LayoutDefault route="category">
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
				<div class="d-flex align-items-center row fw-semibold p-2" style="font-size: 1rem;" v-for="(item, index) in items">
					<div class="col-1">
            {{ index+1 }}
          </div>
					<div class="col-8">
            {{ item.name }}
          </div>
					<div class="col-3">
            <button type="button" class="btn button-putih border px-3 py-1 mx-2" @click="edit">Edit</button>
            <button type="button" class="btn button-merah border px-3 py-1">Hapus</button>
          </div>
				</div>
        
			</div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import router from "../../router/index.js";
import { ref } from "vue";

function routeToAddCategoryView() {
  router.push("/admin/add-category");
}

function edit() {
  router.push("/admin/edit-category");
}
const items = ref([{ id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }])
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
.button-putih {
  border-radius: 8px;
  border-style: none;
  background-color: #ffffff;
  color: rgb(53, 53, 53);
  font-weight: 600;
}
.button-putih:hover {
  background-color: #ececec;
}
.button-merah {
  border-radius: 8px;
  border-style: none;
  background-color: #d14747;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.button-merah:hover {
  background-color: #be2020;
}
</style>
