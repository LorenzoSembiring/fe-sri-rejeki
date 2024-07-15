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
          {{ address.jalan }}, {{ address.kelurahan }}, {{ address.kecamatan }},
          {{ address.kota }}, {{ address.provinsi }}, {{ address.phone }}
        </div>
        <a href="/profile/address" style="text-decoration: none">
          <div class="mt-1 d-inline-block">Ganti Alamat</div>
        </a>
      </div>
      <div class="ms-5 mt-3 p-2 border rounded">
        <div class="row" v-for="item in cartItem">
          <div class="col-2">
            <img
              class="m-2 rounded"
              src="@/assets/default_profile_picture.jpg"
              alt=""
            />
          </div>
          <div class="col-6 pt-2 ms-3">
            <div class="row h5">{{ item.name }}</div>
            <div class="row">Ukuran: {{ item.size }}</div>
          </div>
          <div class="col text-end me-2 h5">
            {{ item.quantity }} x {{ toIDR(item.price) }}
          </div>
        </div>
        <div class="row" style="margin-left: 9vw">
          <select class="form-select" aria-label="Default select example">
            <option selected hidden>Pilih Pengiriman</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
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
          <div class="summary-text">{{ toIDR(totalPrice) }}</div>
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
import { ref, onMounted, computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import axios from "axios";

const token = localStorage.getItem("token");
const cart = localStorage.getItem("cart");
const cartItem = ref([""]);
const arrayCart = JSON.parse(cart);
cartItem.value = arrayCart;

const address = ref([""]);
const product = ref([""]);

arrayCart.forEach((item) => {
  fetchProduct(item.id);
});

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

async function fetchProduct(id) {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/cart/get/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    product.value.push(response.data.data);
  } catch (error) {
    console.log("Error Fetch product");
  }
}
function toIDR(amount) {
  amount = parseInt(amount, 10);
  if (isNaN(amount)) {
    return "Invalid input.";
  }
  let idr = amount.toLocaleString("id-ID");
  // Add "Rp." prefix
  idr = "Rp. " + idr.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return idr;
}

const totalPrice = computed(() => {
  return arrayCart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
});

onBeforeRouteLeave((to, from, next) => {
  localStorage.removeItem("cart");
  next();
});

onMounted(() => {
  fetchAddress();
});
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
img {
  width: 7vw;
}
</style>
