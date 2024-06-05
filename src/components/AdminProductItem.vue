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
          src="@/assets/default_profile_picture.jpg"
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
        type="text"
        id="price"
        :value="prices.toLocaleString()"
        v-on:focus="setFocus(true)"
        v-on:blur="setFocus(false)"
        style="width: 7rem"
      />
    </div>
    <div class="col-1 ms-5">
      <label class="toggle" :for="toggleID">
        <input
          class="toggle__input"
          type="checkbox"
          :id="toggleID"
          :checked="status == 'ACTIVE'"
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
            <a class="dropdown-item" href="#"
              ><span class="fw-semibold">Detail</span></a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#"
              ><span class="fw-semibold">Edit</span></a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#"
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
    id="deleteModal"
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
          Anda yakin ingin menghapus kategori {{ dataName }}
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
            @click="deleteCategory(dataID)"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  id: Number,
  stock: Number,
  name: String,
  prices: Number,
  status: String,
});

const toggleID = "toggle" + props.id;
console.log(toggleID);
const boolStatus = ref(false);
const isInputFocused = ref(false);

const setFocus = (value) => {
  isInputFocused.value = value;
};
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
</style>
