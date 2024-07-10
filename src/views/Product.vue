<template>
  <div>
    <Navbar class="fixed-top border-bottom" />
  </div>
  <div class="container-fluid">
    <div class="row pt-5 px-5">
      <!-- left col -->
      <div
        class="col-6 left-col"
        style="height: calc(100vh - 60px); margin-top: 10px; overflow-y: auto"
      >
      <div class="d-flex my-3" style="font-family: sans-serif;" >
        <a class="text-secondary" href="/">Beranda</a>
        <p class="mx-2 text-secondary"><Icon icon="ep:arrow-right" /></p>
        <a class="text-secondary" href="/shop">{{ products.category }}</a>
        <p class="mx-2 text-secondary"><Icon icon="ep:arrow-right" /></p>
        <p class="fw-semibold">{{ products.name }}</p>
      </div>
        <!-- 360 button -->
        <!-- carousel -->
        <div id="carouselExampleIndicators" class="carousel slide z-0">
          <div class="row text-end">
            <div class="z-2 position-absolute ps-4 pt-4">
              <button
                @click="routeToView3D"
                class="btn rounded-circle bg-white"
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
      <div class="col-4 pt-2" style="overflow-y: unset">
        <div class="pt-4 h6">
          <a href="/shop"
            ><Icon icon="material-symbols:arrow-back" /> Kembali ke koleksi</a
          >
        </div>
        <div class="fs-5 fw-normal mt-4">{{ products.category }}</div>
        <div class="fs-2 fw-semibold my-1">{{ products.name }}</div>
        <div class="fs-3 pb-2 border-bottom border-dark-subtle">
          {{ formatToIDR(products.price) }}
        </div>
        <div class="mt-2 mb-2 fw-semibold">Pilih Ukuran</div>
        <div>
          <div class="ms-1 col-5 row g-0">
            <div class="col-3 p-0 m-0" v-for="stock in stocks">
              <button
                @click="selectStock(stock)"
                type="button"
                :class="[
                  'btn',
                  stock === selectedStock
                    ? 'btn-selected'
                    : 'btn-outline-secondary',
                ]"
              >
                {{ stock.size }}
              </button>
            </div>
          </div>
        </div>
        <div v-if="selectedStock.stock === 0" class="py-2">
          <div class="text-danger fw-semibold my-1">HABIS</div>
          <div class="text-danger fw-semibold my-1">0 Produk tersisa</div>
        </div>
        <div v-else class="py-2">
          <div v-if="selectedStock" class="text-success fw-semibold my-1">
            TERSEDIA
          </div>
          <div v-if="selectedStock" class="text-success fw-semibold my-1">
            {{ selectedStock.stock }} Produk tersisa
          </div>
        </div>
        <div @click="openModal()" class="border my-4 border-top border-dark-subtle d-inline-block" style="cursor: pointer" >
          <Icon class="me-1" icon="la:ruler" style="font-size: 24px" />
          <span class="text-decoration-none text-black" >Panduan Ukuran</span>
        </div>
        <div class="d-flex">
          <p class="fw-semibold px-1 pt-2 mb-0">Jumlah</p>
          <div class="ms-3 mt-1 border rounded" style="width: fit-content">
            <button class="button-counter" @click="decrement()">-</button>
            <input type="number" class="input-counter" v-model="inputValue" />
            <button class="button-counter" @click="increment()">+</button>
          </div>
        </div>
        <div class="mt-4">
          <button
            class="btn button-coklat fw-semibold"
            @click="addToCart(selectedStock.id, inputValue)"
            :disabled="selectedStock.stock === 0 || !selectedStock"
            :title="
              selectedStock.stock === 0 ? 'Ukuran yang anda pilih kosong' : ''
            "
          >
            <Icon icon="ic:sharp-plus" style="font-size: 20px" /> Tambah Ke
            Keranjang
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- modal -->
  <div
    class="modal fade"
    :id="`Modal`"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Panduan Ukuran
          </h1>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <img src="@/assets/tabel-ukuran.png" alt="">
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger border"
            data-bs-dismiss="modal"
          >
            Tutup
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
const selectedStock = ref(0);
const products = ref([]);
let inputValue = ref(1);

const selectStock = (stock) => {
  selectedStock.value = stock;
  console.log(selectedStock.value);
};

const token = localStorage.getItem("token");
const id = ref("");
onMounted(() => {
  id.value = route.params.id;
  fetchStock();
  fetchProduct();
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

const increment = () => {
  inputValue.value = parseInt(inputValue.value) + 1;
  console.log(count);
};

const decrement = () => {
  if (inputValue.value !== 1) {
    inputValue.value = parseInt(inputValue.value) - 1;
  }
};

async function fetchProduct() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/product/get/" + id.value
    );
    products.value = response.data.data;
    console.log(products.value);
  } catch (error) {
    console.log("Error fetching product:", error);
  }
}

async function fetchStock() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/product/stock/" + id.value
    );
    stocks.value = response.data.data;
    console.log(stocks.value);
  } catch (error) {
    console.log("Error fetching stock:", error);
  }
}

async function addToCart(size, quantity) {
  if (token) {
    try {
      const formData = new FormData();
      formData.append("size_id", size);
      formData.append("quantity", quantity);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/store`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code === 200) {
        location.reload();
      }
    } catch (error) {
      console.log("Error fetching stock:", error);
    }
  } else {
    router.push("/login");
  }
}

const openModal = () => {
  const modal = new bootstrap.Modal(document.getElementById('Modal'));
  modal.show();
};
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
textarea:focus,
input:focus {
  outline: none;
}
.button-counter {
  border-style: none;
  color: #aa7d61;
  background-color: white;
  font-weight: 800;
  width: 30px;
}
.input-counter {
  border: none;
  width: 30px;
  text-align: center;
}
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #b44c1b;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
</style>
