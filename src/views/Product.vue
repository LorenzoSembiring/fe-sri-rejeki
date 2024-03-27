<template>
  <Navbar />
  <div class="row">
    <div class="col"></div>
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
      <div></div>
    </div>
  </div>
</template>
<script setup>
import Navbar from "@/components/Navbar.vue";
</script>
<style></style>
