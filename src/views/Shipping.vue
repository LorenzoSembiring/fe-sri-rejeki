<template>
  <Navbar class="fixed-top" />
  <div class="row mt-5">
    <div class="col-7 pt-5">
      <div class="h1 ms-5 mb-3">Pengiriman</div>
      <div class="ms-5 p-4 border rounded">
        <div class="fw-semibold text-secondary">ALAMAT PENGIRIMAN</div>
        <div class="fw-bold my-1">
          <Icon icon="gg:pin" />
          {{ address.label }} • {{ address.name }}
        </div>
        <div>
          {{ address.jalan }}, {{ address.kelurahan }}, {{ address.kecamatan }}, {{ address.kota }}, {{address.provinsi}}, {{address.phone}}
        </div>
        <a href="" style="text-decoration: none">
          <div class="mt-1">Ganti Alamat</div>
        </a>
      </div>
    <ShippingItem/>
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
import ShippingItem from "@/components/ShippingItem.vue";
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";
import { onBeforeRouteLeave } from 'vue-router';
import axios from "axios";

const token = localStorage.getItem("token");

const address = ref([''])

async function fetchAddress() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/address/get-selected",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    address.value = response.data.data;
    console.log(address.value);
  } catch (error) {
    console.log("Error fetching user:", error);
  }
}

onBeforeRouteLeave((to, from, next) => {
  localStorage.removeItem('cart');
  next();
});

onMounted( () => {
  fetchAddress();
  }
)
</script>

<style scoped>
.wrapper {
  margin-top: 4rem;
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
