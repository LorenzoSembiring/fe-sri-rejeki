<template>
  <div
    :class="['col-2', 'd-inline-block', 'content', { border: isHovered }]"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <RouterLink :to="'/product/' + id">
      <div class="d-inline">
        <div class="img-fluid my-2" style="text-align: center">
          <img
            class="justify-center"
            :src="parsedImage"
            alt=""
          />
        </div>
      </div>
    </RouterLink>
    <RouterLink :to="'/shop/category/' + categoryId">
      <div class="mx-4 text-dark kategori">{{ category }}</div>
    </RouterLink>
    <RouterLink :to="'/product/' + id">
      <div class="mx-4 text-dark fs-5">{{ name }}</div>
    </RouterLink>
    <div class="mx-4 mb-3 harga fw-bold">{{ formatToIDR(price) }}</div>
  </div>
</template>

<script setup>
import router from "../router/index.js";
import { ref } from 'vue';

const props = defineProps({
  id: Number,
  category: String,
  categoryId: Number,
  name: String,
  price: Number,
  picture: String
});

const parsedImage = import.meta.env.VITE_API_URL + "/uploads/" + props.picture;
console.log(parsedImage)
const isHovered = ref(false);

function toCategory(id) {
  router.push("/shop/category/" + id);
}
function formatToIDR(number) {
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}
</script>

<style scoped>
.content {
  width: 250px;
}

a {
  text-decoration: none;
}
img {
  object-fit: cover;
  width: 30vh;
  height: 30vh;
}
</style>
