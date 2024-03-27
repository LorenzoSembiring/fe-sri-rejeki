<template>
  <div class="border-start ps-4" v-if="token">
    <div @mouseenter="popover = true" @mouseleave="popover = false">
      <div class="border rounded-pill" style="height: 40px; width: 150px">
        <div
          :class="{
            'default-pic': !isPorfilePicExist,
            'profile-pic': isPorfilePicExist,
            'rounded-circle': true,
            'mt-1': true,
            'ms-1': true,
          }"
        >
          <div
            class="pill-name text-nowrap ms-4 pt-1 ps-3 d-flex align-items-center"
          >
            Malika Malik
          </div>
        </div>
        <div class="bg-white rounded p-2 border mt-2" v-if="popover">
          <div>
            <a class="text-decoration-none text-black d-block m-2" href="/profile"> <span>Profilku</span><br> </a>
            <a class="text-decoration-none text-black d-block m-2 pb-2" href="/transaksi"> <span>Daftar Transaksi</span> <br> </a>
            <a class="text-decoration-none text-black d-block border-top m-2 pt-2" href="/logout"> <span>Keluar</span> </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="border-start ps-3 py-1" v-else>
    <a class="login-register mx-3" href="/login">Masuk</a>
    <a class="login-register mx-3" href="/register">Daftar</a>
  </div>
</template>

<script setup>
import { ref } from "vue";

const token = localStorage.token ?? null;
const isPorfilePicExist = false;

const popover = ref(false);
</script>

<style></style>
