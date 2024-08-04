<template>
  <LayoutDefault route="order">
    <div class="header">
      <div class="col h2 text-header px-4 pt-4">Detail Order</div>
    </div>
    <div class="bg-light mt-4 p-4">
      <!-- Product Information -->
      <div class="py-1 mb-2 rounded border bg-white px-4">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3">Informasi Produk</div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Nama Produk</div>
            <div>{{ productData[0].name }}</div>
          </div>
        </div>
      </div>

      <!-- Product Image -->
      <div class="py-1 my-2 rounded border bg-white">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3 px-3">Gambar Produk</div>
          <div class="ms-4 my-4">
            <div class="row">
              <div class="col-lg-2 col-md-3 col-sm-4">
                <div>
                  <img
                    class="texture"
                    :src="getFullImageUrl(productData[0].path)"
                    alt="Product Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Shipping Information -->
      <div class="py-1 my-2 rounded border bg-white px-3" v-for="item in productData" :key="item.id">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3">Informasi Pengiriman</div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Kurir</div>
            <div>{{ parseCourier(item.kurir) }}</div>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Ongkir</div>
            <div>{{ item.ongkir }}</div>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">No. Resi</div>
            <div>{{ item.resi }}</div>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Status</div>
            <div>{{ item.status }}</div>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="col">
        <div class="d-flex justify-content-end my-5">
          <button class="button-putih py-2 px-5 mx-4" @click="back">
            kembali
          </button>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import { ref } from 'vue';
import router from "../../router/index.js";
import { useRoute } from "vue-router";
import axios from "axios";


const route = useRoute();

const id = ref("")
id.value = route.params.id;
const token = localStorage.getItem("token");

// Sample JSON data
const productData = ref([""]);

const product = ref(productData.value[0]);

async function fetchProduct() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/order/admin-detail/" + id.value,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    productData.value = response.data.data;

  } catch (error) {
    console.log("Error fetching product:", error);
  }
}
const getFullImageUrl = (path) => {
  return `${import.meta.env.VITE_API_URL}${path}`;
};
const back = () => {
  router.push("/admin/order");
};

const parseCourier = (kurir) => {
  const couriers = {
    'POS': 'POS Indonesia',
    'JNE': 'Jalur Nugraha Ekakurir (JNE)',
    'TIKI': 'Citra Van Titipan Kilat (TIKI)',
  };
  return Object.keys(couriers).find(key => couriers[key] === kurir) || kurir;
};
fetchProduct();
</script>

<style>
.texture {
  width: 100%;
  height: auto;
}
.button-putih {
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  color: rgb(53, 53, 53);
  font-weight: 600;
}
</style>
