<template>
  <LayoutDefault route="category">
    <div class="header">
      <div class="col h2 text-header px-4">Tambah Kategori</div>
    </div>
    <div class="bg-light mt-4 p-4">
      <div class="p-4 mb-2 rounded border bg-white">
				<div class="d-flex align-items-center row fw-semibold p-2" style="font-size: 1rem;" >
					<div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Nama Kategori</div>
            <input type="text" class="form-control" id="name" v-model="category"/>
          </div>
				</div>
        <div class="d-flex justify-content-end">
          <button class="button-putih py-2 px-5 mx-4" @click="back">Batal</button>
          <button class="button-coklat py-2 px-5" @click="submit" >Simpan</button>
        </div>
			</div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import router from "../../router/index.js";
import { ref } from "vue";
import axios from "axios";

const category = ref("")
const token = localStorage.getItem("token");

function back() {
  router.push("/admin/category");
}

async function submit() {
  try {
    const formData = new FormData();
    formData.append("name", category.value);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/category/store/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 201) {
      router.push("/admin/category");
    } else {
      // show modal
    }
  } catch (error) {
    console.error("Error updating category:", error);
  }
}
</script>

<style scoped>
.header {
  margin-top: 5vh;
}
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #A77155;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.text-header {
  color: #402218;
}
.text-grey {
  color: #525252;
}
.button-putih {
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  color: rgb(53, 53, 53);
  font-weight: 600;
}

.form-control:focus {
  box-shadow: none;
}
input:focus {
  border: 1px solid #b88e76;
}
</style>
