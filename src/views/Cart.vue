<template>
  <Navbar class="fixed-top" />
  <div class="row mt-5 position-relative" style="height: 100vh;">
    <div class="col-7 pt-5">
      <div class="h1 ms-5 mb-3">Keranjang</div>
      <!-- container item -->
      <div class="ms-5">
        <!-- item -->
        <div v-for="cart in carts">
          <CartItem class="me-4 mb-3" @update-price="updatePrice" :id="cart.id" :name="cart.name"
            :quantity="cart.quantity" :price="cart.price" :size="cart.size" />
        </div>
        <!-- <CartItem class="me-4" /> -->
      </div>
    </div>
    <div class="col pt-5 summary-col">
      <div class="sticky-top" style="top: 104px;">
        <div class="h2 ms-4">Ringkasan Pesanan</div>
        <div class="d-flex row bg-white rounded mx-3 mt-4">
          <div class="col-8 my-3">
            <div class="summary-text fw-bold">Total Belanja</div>
          </div>
          <div class="col my-3">
            <div class="summary-text fw-bold">{{ toIDR(sumTotalPrice) }}</div>
          </div>
          <div class="justify-content-center d-flex my-4">
            <button @click="toCheckout()" :disabled="checkedCart.length === 0" class="button-bayar py-2 px-5">
              Pilih Pengiriman
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import CartItem from "@/components/CartItem.vue";
import { ref, computed } from "vue";
import router from "../router/index.js";
import axios from "axios";

const carts = ref([]);
const checkedCart = ref([]);
const total = ref();

const token = localStorage.getItem("token");

const updatePrice = (id, isChecked, quantity) => {
  const item = carts.value.find((item) => item.id === id);

  if (isChecked) {
    // Add to checkedCart if isChecked is true and not already present
    if (!checkedCart.value.some((cartItem) => cartItem.id === id)) {
      checkedCart.value.push({ id, price: item.price, quantity, name: item.name });
    } else {
      // Update quantity if item is already present
      const cartItem = checkedCart.value.find((cartItem) => cartItem.id === id);
      cartItem.quantity = quantity;
    }
  } else {
    // Remove from checkedCart if isChecked is false
    checkedCart.value = checkedCart.value.filter(
      (cartItem) => cartItem.id !== id
    );
  }
  console.log("Updated checkedCart:", checkedCart.value);
};

const sumTotalPrice = computed(() => {
  return checkedCart.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});

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
function toCheckout() {
  localStorage.setItem("cart", JSON.stringify(checkedCart.value));
  router.push("/shipping");
}
const fetchCart = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/cart/get",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    carts.value = response.data.data.data;
    console.log(carts.value);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Fetch posts when the component is mounted
fetchCart();
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
  border-style: none;
  background-image: linear-gradient(135deg, #c6a28a 40%, #aa7d61);
  color: rgb(255, 255, 255);
  font-weight: 600;
}
</style>
