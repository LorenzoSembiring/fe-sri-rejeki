<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="mx-3 my-2">
        <a href="/">
          <img
            style="height: 5vh; width: auto"
            src="@/assets/logo-cropped.png"
          />
        </a>
      </div>
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
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex ms-auto me-5" role="search">
          <input
            class="form-control me-2"
            type="text"
            placeholder="Cari"
            aria-label="Search"
          />
          <button class="btn button-search text-white" type="submit">
            Cari
          </button>
        </form>
        <CartPopover class="cart-margin" />
        <div class="border-start ps-4" v-if="token">
          <div class="border rounded-pill" style="height: 40px; width: 150px">
            <div
              :class="{
                'default-pic': !isPorfilePicExist,
                'profile-pic': isPorfilePicExist,
              }"
            ></div>
          </div>
        </div>

        <div class="border-start ps-3 py-1" v-else>
          <a class="login-register mx-3" href="/login">Masuk</a>
          <a class="login-register mx-3" href="/register">Daftar</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import CartPopover from "@/components/CartPopover.vue";

const token = localStorage.token ?? null;
const isPorfilePicExist = false;
</script>

<style>
.logo {
  width: 25vh;
  background-image: url("@/assets/logo-cropped.png");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
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

.cart-background:hover {
  background-color: rgb(235, 235, 235);
  cursor: pointer;
}
.cart-margin {
  margin-right: 15vw;
}
.profil-pic {
}
</style>
