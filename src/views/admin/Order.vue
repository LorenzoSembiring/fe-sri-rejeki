<template>
  <LayoutDefault route="order">
    <div class="header">
      <div class="col h2 text-header px-4">Pesanan</div>
    </div>
    <div class="col justify-content-end d-flex px-5">
      <button class="btn button-coklat py-2" @click="routeToAddCategoryView">
        + Tambah Kategori
      </button>
    </div>
    <div class="mt-4 p-4">
      <div
        class="py-2 px-0 rounded-top border border-bottom-0 bg-body-secondary"
      >
        <div class="row fw-semibold">
          <div class="col-1 d-flex justify-content-center">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="checkAll"
            />
          </div>
          <div class="col-1">ID</div>
          <div class="col">Username</div>
          <div class="col-3">Status</div>
          <div class="col">Tanggal</div>
          <div class="col">Total</div>
          <div class="col">Aksi</div>
        </div>
      </div>
      <div class="py-2 px-0 rounded-bottom border border-bottom-0">
        <div class="row my-3">
          <div class="col-1 d-flex justify-content-center">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="checkAll"
            />
          </div>
          <div class="col-1">1</div>
          <div class="col">Enzo</div>
          <div class="col-3">
            <span class="badge rounded-pill text-bg-secondary"
              >• Menunggu Konfirmasi</span
            >
          </div>
          <div class="col">10 Jan 2024</div>
          <div class="col">50.000</div>
          <div class="col">
						<Icon icon="ph:dots-three-bold" style="font-size: 26px;"/>
					</div>
        </div>
        <div class="row my-3">
          <div class="col-1 d-flex justify-content-center">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="checkAll"
            />
          </div>
          <div class="col-1">2</div>
          <div class="col">Malik</div>
          <div class="col-3">
            <span class="badge rounded-pill text-bg-success"
              >• Sedang Dikirm</span
            >
          </div>
          <div class="col">15 Jan 2024</div>
          <div class="col">50.000</div>
          <div class="col">
						<Icon icon="ph:dots-three-bold" style="font-size: 26px;"/>
					</div>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import { Icon } from "@iconify/vue";
import router from "../../router/index.js";
import { ref } from "vue";
</script>

<style scoped>
.header {
  margin-top: 10vh;
}
.text-header {
  color: #402218;
}
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #a77155;
  color: rgb(255, 255, 255);
  font-weight: 600;
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
