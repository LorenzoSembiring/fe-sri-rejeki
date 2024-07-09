<template>
  <div>
    <Navbar class="fixed-top" />
  </div>
  <div class="container-fluid">
    <div class="row pt-5">
      <!-- left col -->
      <div
        class="col left-col"
        style="height: calc(100vh - 60px); margin-top: 10px; overflow-y: auto"
      >
        <!-- 360 button -->
        <!-- carousel -->
        <div id="carouselExampleIndicators" class="carousel slide z-0">
          <div class="row text-end">
            <div class="z-2 position-absolute ps-4 pt-4">
              <button
                @click="routeToView3D"
                class="btn rounded-circle bg-white border border-dark"
              >
                <Icon
                  icon="iconoir:view-360"
                  class="text-black text-opacity-75"
                  style="font-size: 24px"
                />
              </button>
            </div>
          </div>
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
        <!-- description -->
        <div class="">
          <div
            class="fs-2 fw-semibold mt-5 mb-3"
            style="font-family: 'Plus Jakarta Sans'"
          >
            {{ products.name }}
          </div>
          <div>
            {{ products.description }}
          </div>
        </div>
      </div>
      <!-- right col -->
      <div class="col" style="overflow-y: unset">
        <div class="fs-2 fw-semibold mt-5 mb-1">{{ products.name }}</div>
        <div class="fs-3">{{ formatToIDR(products.price) }}</div>
        <div class="mt-4 mb-2">Pilih Ukuran</div>
        <div>
          <div class="ms-1 col-5 row g-0">
            <div class="col-2 p-0 m-0" v-for="stock in stocks">
              <button
                @click="selectStock(stock)"
                type="button"
                :class="['btn', stock === selectedStock ? 'btn-selected' : 'btn-outline-secondary']"
              >
                {{ stock.size }}
              </button>
            </div>
          </div>
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
  </div>
</template>
<script setup>
import Navbar from "@/components/Navbar.vue";
import { Icon } from "@iconify/vue";
import router from "../router/index.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const stocks = ref([]);
const selectedStock = ref(null);

const selectStock = (stock) => {
  selectedStock.value = stock;
};
const id = ref("");
onMounted(() => {
  id.value = route.params.id;
  fetchStock();
});

function routeToView3D() {
  router.push("/product/" + id.value + "/3d");
}

function formatToIDR(number) {
  const numbers = parseInt(number);
  return numbers.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}

const products = ref([]);

const fetchProduct = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/product/get/" + id.value
    );
    products.value = response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

async function fetchStock() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/product/stock/" + id.value
    );
    stocks.value = response.data.data;
    console.log(stocks.value);
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
}
onMounted(fetchProduct, fetchStock);
</script>
<style scoped>
.left-col {
  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
}
.left-col::-webkit-scrollbar {
  display: none;
}
.btn-selected {
  background-color: #28c028; /* Replace this with your custom green color */
  border-color: #493201; /* Match the border color to the background */
  color: white; /* Ensure the text is readable */
}
</style>
