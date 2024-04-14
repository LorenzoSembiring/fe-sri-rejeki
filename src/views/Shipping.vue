<template>
  <Navbar class="fixed-top" />
  <div class="row mt-5">
    <div class="col-7 pt-5">
      <div class="h1 ms-5 mb-3">Pengiriman</div>
      <div class="ms-5 p-4 border rounded">
        <div class="fw-semibold text-secondary">ALAMAT PENGIRIMAN</div>
        <div class="fw-bold my-1">
          <Icon icon="gg:pin" />
          Rumah • Malik
        </div>
        <div>
          Jl. Ahmad Yani No. 123, Kelurahan Cempaka Putih, Kota Jakarta Pusat, DKI Jakarta, 081123456789</div>
        <a href="" style="text-decoration: none">
          <div class="mt-1">Ganti Alamat</div>
        </a>
      </div>
      <div class="ms-5 mt-3 p-2 border rounded">
        <div class="row">
          <div class="col-2">
            <img
              class="m-2 rounded"
              src="@/assets/default_profile_picture.jpg"
              alt=""
            />
          </div>
          <div class="col-7 ms-3">
            <div class="row h5">Blangkon Jawa Tengah</div>
            <div class="row">Ukuran: 9</div>
            <div class="row">
              <div class="dropdown " style="padding-left: 0;">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >Pilih Pengiriman
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col text-end me-2 h5">1 x Rp50.000</div>
        </div>
      </div>
    </div>
    <div class="col pt-5 summary-col">
      <div class="h2 ms-4">Ringkasan Pesanan</div>
      <div class="d-flex row bg-white rounded mx-3 mt-4">
        <div class="col-8 my-3">
          <div class="summary-text">Total Belanja</div>
          <div class="summary-text">Biaya pengiriman</div>
          <div class="border-top mt-3 summary-text fw-bold">Total</div>
        </div>
        <div class="col my-3">
          <div class="summary-text">Rp. 50.000</div>
          <div class="summary-text">Rp. 50.000</div>
          <div class="summary-text mt-3 fw-bold">Rp. 100.000</div>
        </div>
        <div class="justify-content-center d-flex my-4">
          <button class="button-bayar py-2 px-5">Bayar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { Icon } from "@iconify/vue";
</script>

<style scoped>
.wrapper {
  margin-top: 4rem;
}
img {
  width: 90px;
}
.dropdown-menu {
  overflow: hidden;
  overflow-y: auto;
  max-height: calc(100vh - 150px);
}
.summary-col {
  background-color: rgb(245, 245, 245);
  min-height: 100vh;
}
.summary-text {
  font-size: 1rem;
  color: rgb(83, 83, 83);
  font-weight: 400;
  font-family: "Plus Jakarta Sans", sans-serif;
  margin-top: 1vh;
}
.button-bayar {
  border-radius: 8px;
  border-style: none;
  background-image: linear-gradient(135deg, #c6a28a 40%, #aa7d61);
  color: rgb(255, 255, 255);
  font-weight: 600;
}
</style>
