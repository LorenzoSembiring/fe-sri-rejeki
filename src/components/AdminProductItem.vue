<template>
  <div class="d-flex align-items-center">
    <div class="form-check col-1 d-flex align-items-center ms-5">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="defaultCheck1"
      />
    </div>
    <div class="d-flex d-inline col-5">
      <div class="d-flex align-items-center">
        <img
          class="m-2 rounded"
          :src="parsedImage"
          alt=""
        />
      </div>
      <div class="ms-3 my-2">
        <div class="p-0 h5 mt-4">{{ name }}</div>
        <div class="p-0">ID: {{ id }}</div>
      </div>
    </div>
    <div class="d-flex col-2">
      <div
        :class="{
          focused: isInputFocused,
          'd-inline': true,
          'fw-semibold': true,
          'rounded-start': true,
          'border-end-0': true,
          'bg-light': true,
          'section-price': true,
          'px-2': true,
        }"
      >
        Rp
      </div>
      <input
      class="rounded-end input-item input-price"
      disabled
      type="text"
      id="price"
      v-model="price"
      @input="debouncedUpdatePrice"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      style="width: 7rem"
      />
    </div>
    <div class="col-1 ms-5">
      <label class="toggle" :for="toggleID">
        <input
          class="toggle__input"
          type="checkbox"
          :id="toggleID"
          :checked="boolStatus"
          @change="onToggleChange"
        />
        <div class="toggle__fill"></div>
      </label>
    </div>
    <div class="">
      <div class="dropdown">
        <button
          class="btn button-putih border dropdown-toggle fw-semibold"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Atur
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" :href="`/admin/product/${id}`" 
              ><span class="fw-semibold">Detail</span></a
            >
          </li>
          <li>
            <a class="dropdown-item" :href="`/admin/edit-product/${id}`" 
              ><span class="fw-semibold">Edit</span></a
            >
          </li>
          <li>
            <a class="dropdown-item" @click="openDeleteModal(id, name)"
              ><span class="fw-semibold text-danger">Hapus</span></a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="`deleteModal${id}`"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Konfirmasi penghapusan
          </h1>
        </div>
        <div class="modal-body">
          Anda yakin ingin menghapus produk id {{ id }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn button-putih border"
            data-bs-dismiss="modal"
          >
            Tidak
          </button>
          <button
            type="button"
            class="btn button-merah"
            @click="deleteProduct(id)"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import debounce from 'lodash.debounce';
import axios from 'axios';

// Define props
const props = defineProps({
  id: Number,
  stock: Number,
  name: String,
  prices: Number,
  status: String,
  picture: String
});
const parsedImage = import.meta.env.VITE_API_URL + props.picture;
console.log(parsedImage)
const price = ref(props.prices.toLocaleString());

const modalId = ref(null);
const modalName = ref('');

// Initialize refs and computed properties
const toggleID = "toggle" + props.id;
console.log(toggleID);

const boolStatus = ref(props.status === 'ACTIVE');
const isInputFocused = ref(false);
const previousStatus = ref(props.status === 'ACTIVE');

const setFocus = (value) => {
  isInputFocused.value = value;
};

const token = localStorage.getItem("token");

// API call functions using axios
const activateProduct = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/product/activate/${props.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      console.log('Product activated');
      boolStatus.value = true;
    } else {
      console.error('Failed to activate product:', response);
      // Revert the checkbox state to previousStatus.value
      boolStatus.value = previousStatus.value;
    }
  } catch (error) {
    console.error('Error activating product:', error);
    // Revert the checkbox state to previousStatus.value
    boolStatus.value = previousStatus.value;
  }
};

const deactivateProduct = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/product/deactivate/${props.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      console.log('Product deactivated');
      boolStatus.value = false;
    } else {
      console.error('Failed to deactivate product:', response);
      // Revert the checkbox state to previousStatus.value
      boolStatus.value = previousStatus.value;
    }
  } catch (error) {
    console.error('Error deactivating product:', error);
    // Revert the checkbox state to previousStatus.value
    boolStatus.value = previousStatus.value;
  }
};

// Handle toggle change
const onToggleChange = async () => {
  if (boolStatus.value) {
    await deactivateProduct();
  } else {
    await activateProduct();
  }
};
async function deleteProduct(id) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/product/delete/${props.id}`,
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
const openDeleteModal = (id) => {
  modalId.value = id;
  modalName.value = name;
  const modal = new bootstrap.Modal(document.getElementById('deleteModal'+id));
  modal.show();
};
const updatePrice = async () => {
  try {
    const formData = new FormData();
    formData.append("price", price.value);

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/product/update-price/${props.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const data = await response.json();
    // Handle the response data as needed
    console.log(data);
  } catch (error) {
    console.error('Error updating price:', error);
  }
};

// Create a debounced version of the updatePrice method
const debouncedUpdatePrice = debounce(updatePrice, 2000);

// Watch for changes in the prices prop to update the price ref
watch(
  () => props.prices,
  (newPrice) => {
    price.value = newPrice.toLocaleString();
  },
  { immediate: true } // Ensure the watch triggers initially
);

// Initialize previous status on mount
onMounted(() => {
  previousStatus.value = boolStatus.value;
});
</script>

<style scoped>
.bputihutton- {
  border-radius: 8px;
  border-style: none;
  background-color: #ffffff;
  color: rgb(53, 53, 53);
  font-weight: 600;
}
.table {
  max-width: 80vw;
}
.row {
  max-width: 100vw;
}
img {
  width: 90px;
}
.toggle {
  --width: 40px;
  --height: calc(var(--width) / 2);
  --border-radius: calc(var(--height) / 2);

  display: inline-block;
  cursor: pointer;
}
.toggle__input {
  display: none;
}
.toggle__fill {
  position: relative;
  width: var(--width);
  height: var(--height);
  border-radius: var(--border-radius);
  background: #dddddd;
  transition: background 0.2s;
}
.toggle__fill::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: var(--height);
  width: var(--height);
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: var(--border-radius);
  transition: transform 0.2s;
}
.toggle__input:checked ~ .toggle__fill {
  background: #b88e76;
}
.toggle__input:checked ~ .toggle__fill::after {
  transform: translateX(var(--height));
}
.input-item {
  padding-left: 1rem;
  border: 1px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}
input:focus {
  border: 1px solid #b88e76;
}
.input-price {
  border-left: none;
}
.input-price:focus {
  border-left: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.section-price {
  border: 1px solid #ccc;
  padding-top: 9px;
  padding-bottom: 10px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.focused {
  border: 1px solid #b88e76;
}
.form-check-input {
  border: 2px solid rgb(224, 194, 184);
}
.form-check-input:hover {
  border: 2px solid rgb(179, 152, 143);
}
.button-putih {
  border-radius: 8px;
  border-style: none;
  background-color: #ffffff;
  color: rgb(53, 53, 53);
  font-weight: 600;
}
.button-putih:hover {
  background-color: #ececec;
}
.button-merah {
  border-radius: 8px;
  border-style: none;
  background-color: #d14747;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.button-merah:hover {
  background-color: #be2020;
}
</style>
