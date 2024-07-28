<template>
  <Navbar class="fixed-top" />
  <div class="row mt-5">
    <div class="col-lg-7 pt-5">
      <div class="h1 ms-5 mb-3">Pengiriman</div>
      <div class="ms-5 p-4 border rounded" v-if="address">
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
          <div class="col-lg-2">
            <img class="m-2 rounded" :src="parsedImage(item.picture)" alt="" />
          </div>
          <div class="col-lg-6 pt-2 ms-3">
            <div class="row h5">
              <span class="text-truncate">
                {{ item.name }}
              </span>
            </div>
            <div class="row">
              <span> Ukuran: {{ item.size }} </span>
            </div>
          </div>
          <div class="col text-end me-2 h5">
            {{ item.quantity }} x {{ toIDR(item.price) }}
          </div>
        </div>
        <div class="row" style="margin-left: 9vw">
          <div class="col-lg-9 col-md-8 col-sm-5">
            <button
              v-if="selectedCourier"
              class="btn btn-white border border-2 fw-semibold"
              data-bs-toggle="modal"
              data-bs-target="#modal_ongkir"
            >
              Ubah pengiriman
            </button>
            <button
              v-else
              class="btn btn-white border border-2 fw-semibold"
              data-bs-toggle="modal"
              data-bs-target="#modal_ongkir"
            >
              Pilih pengiriman
            </button>
          </div>
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
          <div class="summary-text">{{ toIDR(shippingCost) }}</div>
          <div class="summary-text mt-3 fw-bold">
            {{ toIDR(totalPrice + shippingCost) }}
          </div>
        </div>
        <div class="justify-content-center d-flex my-4">
          <button
            v-if="selectedCourier"
            @click="placeOrder"
            class="button-bayar py-2 px-5"
          >
            Bayar
          </button>
          <button
            v-else
            disabled
            class="btn btn-light border border-2 fw-semibold py-2 px-5"
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Tambah Alamat -->
  <div
    class="modal fade"
    id="modalAddress"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Tambah Alamat
          </h1>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <Icon
              class="text-danger"
              icon="carbon:warning"
              style="font-size: 100px"
            />
          </div>
          <div class="d-flex justify-content-center pt-3">
            <p>Harap menambahkan alamat terlebih dahulu!</p>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="toAddress()" type="button" class="btn button-bayar">
            Tambah Alamat
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Ongkir -->
  <div class="modal" id="modal_ongkir" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Pilih Pengiriman</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container mt-5">
            <div
              v-for="(courier, index) in shippingList"
              :key="index"
              class="card mb-4"
            >
              <div class="card-header">
                <h4>{{ courier.name }}</h4>
              </div>
              <div class="card-body">
                <div
                  v-for="(cost, costIndex) in courier.costs"
                  :key="costIndex"
                  class="mb-3"
                >
                  <h5 class="card-title">
                    {{ cost.service }} - {{ cost.description }}
                  </h5>
                  <ul class="list-group">
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center bg-white"
                      :class="{
                        'border-success': isSelectedCost(courier, cost),
                      }"
                      v-for="(c, cIndex) in cost.cost"
                      :key="cIndex"
                    >
                      <div>
                        <strong>Ongkos kirim:</strong> {{ c.value }} <br />
                        <strong>Estimasi sampai:</strong> {{ c.etd }} <br />
                        <strong>Note:</strong> {{ c.note || "N/A" }}
                      </div>
                      <div v-if="isSelectedCost(courier, cost)">
                        <Icon
                          class="text-success"
                          style="font-size: 30px"
                          icon="ic:outline-check"
                        />
                      </div>
                      <button
                        v-else
                        class="btn button-tutup fw-semibold border"
                        @click="selectCourier(courier, cost, c)"
                      >
                        Pilih
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn button-tutup"
            data-bs-dismiss="modal"
          >
            Close
          </button>
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
import router from "../router/index.js";
import axios from "axios";
import midtransClient from "midtrans-client";

let snap = new midtransClient.Snap();

const token = localStorage.getItem("token");
const cart = localStorage.getItem("cart");
const cartItem = computed(() => {
  return JSON.parse(cart) ?? [];
});
const cartID = ref([cartItem.value.map((cart) => cart.id)]);
const parsedImage = (pic) => {
  return import.meta.env.VITE_API_URL + pic;
};

const address = ref(null);
const kota = ref([""]);
const product = ref([""]);
const shippingCost = ref(0);
const totalWeight = ref(0);
const shippingList = ref([]);
const selectedCourier = ref(null);
const selectedCourierName = ref(null);
const selectedCourierType = ref(null);

if (Array.isArray(cartItem.value)) {
  cartItem.value.forEach((item) => {
    fetchCart(item.id);
  });
}

const isSelectedCost = (courier, cost) => {
  return (
    selectedCourier.value &&
    selectedCourier.value.id === `${courier.code}-${cost.service}`
  );
};

const selectCourier = (courier, cost, c) => {
  selectedCourier.value = {
    id: `${courier.code}-${cost.service}`,
    name: courier.name,
    service: cost.service,
    description: cost.description,
    cost: c.value,
    etd: c.etd,
    note: c.note,
  };
  shippingCost.value = c.value;
  selectedCourierName.value = courier.name;
  selectedCourierType.value = cost.service;
  console.log("shippingCost");
  console.log(selectedCourier.value.name);
};

const openAddressModal = () => {
  const modalElement = document.getElementById("modalAddress");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};

const toAddress = () => {
  const modalElement = document.getElementById("modalAddress");
  const modalInstance = bootstrap.Modal.getInstance(modalElement);

  if (modalInstance) {
    modalInstance.hide();
    modalElement.addEventListener(
      "hidden.bs.modal",
      () => {
        router.push("/profile/address");
      },
      { once: true }
    );
  } else {
    router.push("/profile/address");
  }
};

const fetchAddress = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/address/get-selected",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.data) {
      openAddressModal();
      return;
    }

    address.value = response.data.data;
    kota.value = response.data.data.kota;
  } catch (error) {
    console.log("Error fetching user:", error);
  }
};

async function fetchCart(id) {
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
async function fetchProductWeight(id) {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/product/get/" + id
    );
    return response.data.data.weight;
  } catch (error) {
    console.log("Error fetching product", error);
    return 0; // return 0 if there's an error
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

async function placeOrder() {
  // console.log(selectCourier.value.name + "890808")
  try {
    const formData = new FormData();
    formData.append(
      "cart_id",
      JSON.stringify(cartID.value).replace(/^.|.$/g, "")
    );
    formData.append("kurir", selectedCourierName.value);
    formData.append("type_kurir", selectedCourierType.value);
    formData.append("ongkir", shippingCost.value);
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/order/placing-order",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.code == 200) {
      window.open(response.data.data.redirect_url)
    }
    console.log(response.data);
  } catch (error) {
    console.log("Error Fetch Shipping" + error);
  }
}

async function fetchShippingCost(weight, destination) {
  try {
    const formData = new FormData();
    formData.append("weight", weight);
    formData.append("destination", destination);
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/rajaongkir/cost",
      formData
    );
    shippingList.value = response.data.data;
    console.log(shippingList.value);
  } catch (error) {
    console.log("Error Fetch Shipping");
  }
}

const totalPrice = computed(() => {
  if (cartItem.value) {
    return cartItem.value.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  } else {
    return 0;
  }
});

async function calculateTotalWeight() {
  let total = 0;
  for (const item of cartItem.value) {
    const weight = await fetchProductWeight(item.product);
    total += weight * item.quantity;
  }
  totalWeight.value = total;
}

onBeforeRouteLeave((to, from, next) => {
  localStorage.removeItem("cart");
  next();
});

onMounted(async () => {
  await fetchAddress();
  await calculateTotalWeight();
  fetchShippingCost(totalWeight.value, kota.value);
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
  background-image: linear-gradient(135deg, #b18568 40%, #aa7d61);
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.button-bayar-disabled {
  border-radius: 8px;
  border-style: none;
  background-image: linear-gradient(135deg, #6b6058 40%, #d8ae94);
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.button-tutup {
  border-radius: 8px;
  border-style: solid;
  border-color: #bbbbbb;
  background-image: linear-gradient(135deg, #ffffff 40%, #f8f8f8);
  color: rgb(61, 61, 61);
  font-weight: 600;
}
img {
  width: 7vw;
}
.container {
  max-width: 800px;
}
.card-header {
  background-color: #f8f9fa;
}
.list-group-item {
  background-color: #f8f9fa;
}
</style>
