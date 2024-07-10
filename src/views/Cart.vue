<template>
  <Navbar class="fixed-top" />
  <div class="row mt-5">
    <div class="col-7 pt-5">
      <div class="h1 ms-5 mb-3">Keranjang</div>
      <!-- container item -->
      <div class="ms-5">
        <!-- item -->
        <div v-for="cart in carts">
          <CartItem class="me-4 mb-3" 
            @update-price="updatePrice(cart.id)"
            :id="cart.id"
            :name="cart.name"
            :quantity="cart.quantity"
            :price="cart.price"
            :size="cart.size"
          />
        </div>
        <!-- <CartItem class="me-4" /> -->
      </div>
    </div>
    <div class="col pt-5 summary-col">
      <div class="h2 ms-4">Ringkasan Pesanan</div>
      <div class="d-flex row bg-white rounded mx-3 mt-4">
        <div class="col-8 my-3">
          <div class="summary-text fw-bold">Total Belanja</div>
        </div>
        <div class="col my-3">
          <div class="summary-text fw-bold">{{ sumTotalPrice }}</div>
        </div>
        <div class="justify-content-center d-flex my-4">
          <button class="button-bayar py-2 px-5">Pilih Pengiriman</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import CartItem from "@/components/CartItem.vue";
import { ref, computed } from "vue";
import axios from "axios";

const carts = ref([]);
const checkedCart = ref([]);
const total = ref();

const token = localStorage.getItem("token");

function updatePrice(id) {
  const item = carts.value.find(item => item.id === id);
  checkedCart.value.push({"id": id, "price": item.price})
  console.log(checkedCart.value)
}

const sumTotalPrice = computed(() => {
  return checkedCart.value.reduce((sum, item) => sum + item.price, 0);
});

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
    console.log(carts.value)
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Fetch posts when the component is mounted
fetchCart()
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
