<template>
  <div class="border d-flex rounded">
    <div class="form-check col-1 d-flex align-items-center ms-3">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        :id="'check' + id"
        @change="$emit('updatePrice', id);"
        
      />
    </div>
    <div class="col-2">
      <img
        class="m-2 rounded"
        src="@/assets/default_profile_picture.jpg"
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
        <div class="ms-3 mt-1 border rounded" style="width: fit-content">
          <button class="button-counter" @click="decrement()">-</button>
          <input type="number" class="input-counter" v-model="quantityRef" />
          <button class="button-counter" @click="increment()">+</button>
        </div>
      </div>

      <div></div>
    </div>
  </div>
</template>
<script setup>
import { ref, toRef } from "vue";

const props = defineProps({
  id: Number,
  name: String,
  size: Number,
  quantity: Number,
  price: Number,
  checked: Boolean
});
const { quantity } = props
const quantityRef =  toRef(quantity)

const increment = () => {
  inputValue.value = parseInt(inputValue.value) + 1;
  console.log(count);
};

const decrement = () => {
  inputValue.value = parseInt(inputValue.value) - 1;
};

function toIDR(amount) {
    // Convert the amount to an integer
    amount = parseInt(amount, 10);
    
    if (isNaN(amount)) {
        return "Invalid input.";
    }
    
    // Format the integer to IDR format without decimal places
    let idr = amount.toLocaleString('id-ID');
    
    // Add "Rp." prefix
    idr = 'Rp. ' + idr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    
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
