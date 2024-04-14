<template>
  <Navbar class="fixed-top" />
  <div class="row mt-5">
    <div class="col-7 pt-5">
      <div class="h1 ms-5 mb-3">Keranjang</div>
      <!-- container item -->
      <div class="ms-5">
        <!-- item -->
        <CartItem class="me-4 mb-3"/>
        <CartItem class="me-4"/>
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
import CartItem from "@/components/CartItem.vue"
</script>

<style scoped>
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
  border-style:none;
  background-image: linear-gradient(135deg, #c6a28a 40%, #aa7d61);
  color: aliceblue;
  font-weight: 600;
}

</style>
