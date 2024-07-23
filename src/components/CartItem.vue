<template>
  <div class="border d-flex rounded">
    <div class="form-check col-1 d-flex align-items-center ms-3">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        :id="'check' + id"
        v-model="isChecked"
        @change="emitChange"
      />
    </div>
    <div class="col-2">
      <img
        class="m-2 rounded"
        :src=parsedImage
        alt=""
      />
    </div>
    <div class="col">
      <div class="row">
        <div class="col ms-3 mt-2 h5 fw-semibold">{{ name }}</div>
        <div class="d-flex justify-content-end col mt-3 me-4 fw-bold">
          {{ toIDR(price) }}
        </div>
        <div class="ms-3">Ukuran: {{ size }}</div>
        <div class="d-flex my-2">
          <div class="ms-3 mt-1 border rounded" style="width: fit-content">
            <button class="button-counter" v-if="quantityRef > 1" @click="decrement()">-</button>
            <button class="button-counter" style="cursor: not-allowed;" v-else disabled>-</button>
            <input type="number" class="input-counter" v-model="quantityRef" />
            <button class="button-counter" @click="increment()">+</button>
          </div>
          <div class="ms-5">
            <Icon icon="ph:trash" class="text-danger fs-4 mt-1" style="cursor: pointer;" @click="deleteCart(props.id)"/>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
import { nextTick, toRef, ref } from "vue";
import axios from "axios";
import { Icon } from "@iconify/vue";

const props = defineProps({
  id: Number,
  name: String,
  size: Number,
  quantity: Number,
  price: Number,
  checked: Boolean,
  picture: String
});
const parsedImage = import.meta.env.VITE_API_URL + props.picture;

const token = localStorage.getItem("token");

const { quantity } = props;
const quantityRef = toRef(quantity);
const isChecked = ref(false);
const picture = ref("")
const emit = defineEmits(['update-price']);

const increment = () => {
  quantityRef.value = parseInt(quantityRef.value) + 1;
  nextTick(() => {
    updateQuantity();
  });
};

const decrement = () => {
  quantityRef.value = parseInt(quantityRef.value) - 1;
  nextTick(() => {
    updateQuantity();
  });
};

async function deleteCart(id) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/cart/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    if (response.status == 200) {
      location.reload()
    } else {
      
    }
  } catch (error) {
    
  }
}

const emitChange = () => {
  emit('update-price', props.id, isChecked.value, quantityRef);
};

async function updateQuantity() {
  try {
    const formData = new FormData();
    formData.append("quantity", quantityRef.value);

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/cart/update/${props.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error updating category:", error);
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
</script>
<style scoped>
img {
  width: 90px;
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
</style>
