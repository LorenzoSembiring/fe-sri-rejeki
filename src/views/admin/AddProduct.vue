<template>
  <LayoutDefault route="product">
    <div class="header">
      <div class="col h2 text-header px-4">Tambah Produk</div>
    </div>
    <div class="bg-light mt-4 p-4">
      <div class="py-1 mb-2 rounded border bg-white px-4">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3">Informasi Produk</div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Nama Produk</div>
            <input type="text" class="form-control" id="name" />
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Kategori</div>
            <select class="form-select" aria-label="Default select example">
              <option selected disabled hidden>Pilih Kategori</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Deskripsi</div>
            <textarea class="form-control" id="description" rows="4"></textarea>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Harga</div>
            <div class="d-flex">
              <div
                :class="[
                  { focused: isPriceInputFocused },
                  'd-inline fw-semibold rounded-start border-end-0 bg-light section-price px-2',
                ]"
              >
                Rp
              </div>
              <input
                class="rounded-end input-item input-price"
                type="text"
                id="price"
                v-on:focus="setPriceFocus(true)"
                v-on:blur="setPriceFocus(false)"
                style="width: 7rem"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="py-1 my-2 rounded border bg-white">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3 px-3">Gambar Produk</div>
          <div class="ms-4 my-4">
            <div class="row">
              <div class="col-lg-2 col-md-3 col-sm-4">
                <div class="rounded product-picture p-3 pt-4">
                  <div class="d-flex justify-content-center">
                    <Icon
                      class="text-secondary d-flex justify-contents-center"
                      icon="icon-park-outline:picture"
                      style="font-size: 10vh"
                    />
                  </div>
                  <div
                    class="d-flex justify-content-center text-secondary fw-semibold mt-1"
                  >
                    Foto 1
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-md-3 col-sm-4">
                <div class="rounded product-picture p-3 pt-4">
                  <div class="d-flex justify-content-center">
                    <Icon
                      class="text-secondary d-flex justify-content-center"
                      icon="icon-park-outline:picture"
                      style="font-size: 10vh"
                    />
                  </div>
                  <div
                    class="d-flex justify-content-center text-secondary fw-semibold mt-1"
                  >
                    Foto 2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="py-1 my-2 rounded border bg-white px-3">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3">3D</div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Objek 3D</div>
            <select class="form-select" aria-label="Default select example">
              <option selected disabled hidden>Pilih Objek 3D</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="my-4 d-flex fw-semibold text-grey">
            <div class="col-4 p-0">Tekstur</div>
            <div
              class="rounded p-3"
              style="border: 3px dashed #6e6c6b; cursor: pointer"
            >
              <div class="d-flex justify-content-center">
                <Icon
                  class="text-secondary d-flex justify-content-center"
                  icon="icon-park-outline:picture"
                  style="font-size: 7vh"
                />
              </div>
              <div class="d-flex justify-content-center mt-1">
                Pilih Tekstur
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="py-1 my-2 rounded border bg-white px-3">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3">Ukuran</div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Ukuran dan Stok</div>
            <div>
              <span class="badge rounded-pill m-2 p-2 text-bg-secondary">
                1
                <span
                  class="badge rounded-pill text-bg-light ms-2 p-1 border-light"
                  >X</span
                ></span
              >
            </div>
            <div>
              <div class="d-flex">
                  <div
                    :class="[
                      { focused: isSizeInputFocused },
                      'd-inline fw-semibold rounded-start border-end-0 bg-light section-price px-2',
                    ]"
                  >
                    Ukuran
                  </div>
                  <input
                    class="rounded-end input-item input-price me-2"
                    type="text"
                    id="size"
                    maxlength="3"
                    v-on:focus="setSizeFocus(true)"
                    v-on:blur="setSizeFocus(false)"
                    style="width: 3rem"
                  />
                  <div
                    :class="[
                      { focused: isStockInputFocused },
                      'd-inline fw-semibold rounded-start border-end-0 bg-light section-price px-2',
                    ]"
                  >
                    Stok
                  </div>
                  <input
                    class="rounded-end input-item input-price"
                    type="text"
                    id="price"
                    maxlength="4"
                    v-on:focus="setStockFocus(true)"
                    v-on:blur="setStockFocus(false)"
                    style="width: 4rem"
                  />
                  <button class="button-coklat py-2 px-4 mx-2">Tambah</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="d-flex justify-content-end my-5">
          <button class="button-putih py-2 px-5 mx-4">Batal</button>
          <button class="button-coklat py-2 px-5">Simpan</button>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const isPriceInputFocused = ref(false);

const setPriceFocus = (value) => {
  isPriceInputFocused.value = value;
};
const isSizeInputFocused = ref(false);

const setSizeFocus = (value) => {
  isSizeInputFocused.value = value;
};
const isStockInputFocused = ref(false);

const setStockFocus = (value) => {
  isStockInputFocused.value = value;
};
</script>

<style scoped>
.header {
  margin-top: 5vh;
}
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #A77155;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.text-header {
  color: #402218;
}
.text-grey {
  color: #525252;
}
.button-putih {
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  color: rgb(53, 53, 53);
  font-weight: 600;
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
  padding-top: 1px;
  padding-bottom: 2px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.focused {
  border: 1px solid #b88e76;
}
.form-control:focus {
  box-shadow: none;
}
textarea {
  resize: none;
}
.form-select:focus {
  box-shadow: none;
}
select:focus {
  border: 1px solid #b88e76;
}
textarea:focus {
  border: 1px solid #b88e76;
}
.product-picture {
  border: 3px dashed #6e6c6b;
  cursor: pointer;
  /* width: 15vw; */
  /* max-width: 15vw; */
  aspect-ratio: 1/1;
}
.section-price {
  padding-top: 9px;
  padding-bottom: 10px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
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
</style>
