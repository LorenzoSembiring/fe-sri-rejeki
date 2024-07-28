<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid d-flex">
      <div class="my-2 justify-content-start col-1">
        <a class="ms-5" href="/">
          <img
            style="height: 5vh; width: auto"
            src="@/assets/logo-textonly.png"
          />
        </a>
      </div>
      <div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse row" id="navbarSupportedContent">
        <div class="justify-content-center col-10 d-inline-flex">
          <ul class="navbar-nav mb-2 mb-lg-0 row">
            <li class="nav-item col">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item col">
              <a class="nav-link" href="/shop">Shop</a>
            </li>
            <li class="nav-item col">
              <a class="nav-link" href="/#about">About</a>
            </li>
          </ul>
        </div>
        <div class="d-flex justify-content-end col row m-0">

          <div
            @mouseenter="isOnHoverProfile = true"
            @mouseleave="leaveProfile"
            class="d-inline-flex col position-relative ms-5 ps-5"
          >
            <Icon
              class="pointer"
              icon="mdi:account-outline"
              style="font-size: 24px"
            />
            <div
              @mouseenter="isOnHoverProfilePopover = true"
              @mouseleave="leaveProfilePopover"
              v-if="
                (isOnHoverProfile || isOnHoverProfilePopover) && token === null
              "
              class="bg-white position-fixed rounded p-1 mt-5 border"
            >
              <div class="px-3 my-2">
                <a class="nav-link pointer" href="/login">Masuk</a>
              </div>
              <div class="px-3 mb-2">
                <a class="nav-link pointer" href="/register">Daftar</a>
              </div>
            </div>
            <div
              @mouseenter="isOnHoverProfilePopover = true"
              @mouseleave="leaveProfilePopover"
              v-if="(isOnHoverProfile || isOnHoverProfilePopover) && token"
              class="bg-white position-fixed rounded p-1 mt-5 border"
            >
              <div class="px-3 my-2">
                <a class="nav-link pointer" href="/profile">Akun</a>
              </div>
              <div class="px-3 mb-2">
                <p class="nav-link pointer text-danger" @click="logout">
                  Logout
                </p>
              </div>
            </div>
          </div>
          <div @click="goCart" class="d-inline-flex col pointer">
            <Icon
              class="pointer"
              icon="mdi:cart-outline"
              style="font-size: 24px"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import router from "../router/index.js";
import axios from "axios";

const token = localStorage.getItem("token");

const isOnHoverProfile = ref(false);
const isOnHoverProfilePopover = ref(false);

function leaveProfile() {
  setTimeout(() => {
    isOnHoverProfile.value = false;
  }, 100);
}
function leaveProfilePopover() {
  setTimeout(() => {
    isOnHoverProfilePopover.value = false;
  }, 100);
}

function goCart() {
  router.push("/cart");
}

async function logout() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        if (response.status === 200) {
          localStorage.removeItem('token'); 
          window.location.reload();
        }
      } catch (error) {
        console.error('Logout failed', error);
      }
    }
</script>

<style scoped>
.logo {
  width: 25vh;
  background-image: url("@/assets/logo-cropped.png");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}

.nav-link {
  font-family: "Plus Jakarta Sans", sans-serif;
  color: #402218;
}
.login-register {
  text-decoration: none;
  font-weight: 600;
  color: rgb(53, 53, 53);
}

.login-register:hover {
  color: rgb(0, 150, 209);
}

.button-search {
  border-radius: 8px;
  background-image: linear-gradient(135deg, #c6a28a 40%, #aa7d61);
  color: aliceblue;
  font-weight: 600;
}
.pointer {
  cursor: pointer;
}
.profil-pic {
  background-image: url("@/assets/default_profile_picture.jpg");
}
.default-pic {
  background-image: url("@/assets/default_profile_picture.jpg");
  background-size: cover;
  background-position: center;
  height: 30px;
  width: 30px;
}
.pill-name {
  font-size: 1rem;
  font-family: "Plus Jakarta Sans", sans-serif;
  user-select: none;
  color: grey;
}
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #a77155;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
</style>
