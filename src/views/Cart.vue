<template>
  <Navbar class="fixed-top" />
  <div class="row mt-5">
    <div class="col-7 pt-5">
      <div class="h1 ms-5 mb-3">Keranjang</div>
      <!-- container item -->
      <div class="ms-5">
        <!-- item -->
        <div class="border d-flex rounded">
          <div class="form-check col-1 d-flex align-items-center ms-3">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck1"
            />
          </div>
          <div class="col-2">
            <img class="m-2 rounded" src="@/assets/default_profile_picture.jpg" alt="" />
          </div>
          <div class="col">
            <div class="row">
              <div class="col ms-3 mt-2 h5 fw-semibold">
                Blangkon Jawa Tengah
              </div>
              <div class="d-flex justify-content-end col mt-3 me-4 fw-bold">Rp 50.000</div>
              <div class="ms-3">Ukuran: 9</div>
              <div class="ms-3 mt-1 border rounded" style=" width: fit-content;">
                <button class="button-counter">-</button>
                <input type="number" class="input-counter">
                <button class="button-counter">+</button>
              </div>
            </div>
              
              <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col pt-5 summary-col">
      <div class="h2 ms-4">Ringkasan Pesanan</div>
      <div class="d-flex row bg-white rounded mx-3 mt-4">
        <div class="col-8 my-3">
          <div class="summary-text">Total Belanja</div>
          <div class="summary-text">Biaya pengriman</div>
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
</script>

<style scoped>
.summary-col {
  background-color: rgb(245, 245, 245);
  min-height: 100vh;
}
img {
  width: 90px;
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
  border-style:none;
  background-image: linear-gradient(135deg, #c6a28a 40%, #aa7d61);
  color: aliceblue;
  font-weight: 600;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
textarea:focus, input:focus{
    outline: none;
}
.button-counter{
  border-style:none;
  color:#aa7d61;
  background-color: white;
  font-weight:800;
  width: 30px;
}
.input-counter{
  border:none;
  width:30px;
  text-align: center;
}
</style>
