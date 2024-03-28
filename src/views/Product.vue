<template>
  <Navbar />
  <div class="row">
    <div class="col">
      <!-- 360 button -->
      <div class="z-1 position-absolute ">
        <button class="btn rounded-circle bg-dark">
          <Icon icon="iconoir:view-360" style="font-size: 24px;color:white"/>
        </button>
      </div>
      <!-- carousel -->
      <div id="carouselExampleIndicators" class="carousel slide z-0">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="@/assets/default_profile_picture.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="@/assets/default_profile_picture.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="@/assets/default_profile_picture.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="col">
      <div class="fs-2 fw-semibold mt-5 mb-1">Blangkon Jawa Tengah</div>
      <div class="fs-3">Rp. 50.000</div>
      <div class="mt-4 mb-2">Pilih Ukuran</div>
      <div class="dropdown">
        <button
          class="btn dropdown-toggle border"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          UKURAN
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">9</a></li>
          <li><a class="dropdown-item" href="#">8</a></li>
          <li><a class="dropdown-item" href="#">7</a></li>
        </ul>
      </div>
      <div class="text-success fw-semibold my-1">TERSEDIA</div>
      <div>
        <Icon class="me-1" icon="la:ruler" style="font-size: 24px" />
        <a class="text-decoration-none text-black" href="/">Panduan Ukuran</a>
      </div>
      <div class="mt-4">
        <button class="btn btn-primary">
          <Icon icon="mdi:cart" style="font-size: 20px" /> Tambah Ke Keranjang
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import Navbar from "@/components/Navbar.vue";
import { Icon } from "@iconify/vue";
</script>
<style></style>
