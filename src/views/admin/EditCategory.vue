<template>
    <LayoutDefault route="category">
      <div class="header">
        <div class="col h2 text-header px-4">Edit Kategori</div>
      </div>
      <div class="bg-light mt-4 p-4">
        <div class="p-4 mb-2 rounded border bg-white">
                  <div class="d-flex align-items-center row fw-semibold p-2" style="font-size: 1rem;" >
                      <div class="my-4 fw-semibold text-grey d-flex">
              <div class="col-4 p-0">Nama Kategori</div>
              <input type="text" class="form-control" id="name" />
            </div>
                  </div>
          <div class="d-flex justify-content-end">
            <button class="button-putih py-2 px-5 mx-4" @click="back">Batal</button>
            <button class="button-coklat py-2 px-5">Simpan</button>
          </div>
              </div>
      </div>
    </LayoutDefault>
  </template>
  
  <script setup>
  import LayoutDefault from "@/components/LayoutDefault.vue";
  import router from "../../router/index.js";
  
  function back() {
    router.push("/admin/category");
  }
  </script>
  
  <style scoped>
  .header {
    margin-top: 10vh;
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
  