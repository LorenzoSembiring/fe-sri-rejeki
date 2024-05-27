<template>
  <div class="border-start ps-4" v-if="isLoggedIn">
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
            {{ username }}
          </div>
        </div>
        <div class="bg-white rounded p-2 border mt-2" v-if="popover">
          <div>
            <a
              class="text-decoration-none text-black d-block m-2"
              href="/profile"
            >
              <span>Profilku</span><br />
            </a>
            <a
              class="text-decoration-none text-black d-block m-2 pb-2"
              href="/transaksi"
            >
              <span>Daftar Transaksi</span> <br />
            </a>
            <span
              class="text-decoration-none text-black d-block border-top m-2 pt-2"
              @click="logout"
              style="cursor: pointer"
              >Keluar</span
            >
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
import router from "../router/index.js";
// import router from "@/router";
import axios from "axios";
import { ref } from "vue";

const token = localStorage.token ?? null;
const isLoggedIn = ref(!!token);
const isPorfilePicExist = false;
const popover = ref(false);
const username = localStorage.name ?? null;

async function logout() {
  const response = await axios.get(
    import.meta.env.VITE_API_URL + "/api/user/logout",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (response.status == 200) {
    localStorage.removeItem(token);
    isLoggedIn.value = false;
    setTimeout(function () {
      router.push("/login")
    }, 1000);
  } else {
  }
}
</script>

<style></style>
