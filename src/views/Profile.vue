<template>
  <Navbar class="fixed-top" />
  <div class="row mt-5">
    <div class="col-3 pt-5 bg-primar">
      <div class="ms-5 border rounded px-3">
        <div class="px-2 pe-3 my-3 border-bottom">
          <div
            class="d-flex ms-1 border-profile rounded-pill row mt-auto mb-2"
            style="height: 9vh; width: 100%"
          >
            <div class="col-3 align-items-center p-1">
              <img
                class="rounded-circle"
                style="height: 7vh; width: 7vh"
                src="@/assets/default_profile_picture.jpg"
              />
            </div>
            <div
              class="text-brown fw-semibold d-flex align-items-center col"
              style="height: 100%"
            >
              {{ username }}
            </div>
          </div>
        </div>
        <div class="px-3 py-2 border-bottom">
          <div class="py-2 sidebar-list">Biodata</div>
          <div class="py-2 sidebar-list">Daftar Alamat</div>
        </div>
        <div class="px-3 pt-2 pb-4">
          <div class="py-2 sidebar-list">Menunggu Pembayaran</div>
          <div class="py-2 sidebar-list">Riwayat Transaksi</div>
        </div>
      </div>
    </div>
    <div class="col pt-5 summary-col d-flex">
      <Icon
        class="text-secondary"
        icon="mdi:account-outline"
        style="font-size: 24px"
      />
      <p class="text-secondary fw-bold">{{ username }}</p>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { Icon } from "@iconify/vue";

const username = localStorage.name ?? null;
</script>

<style scoped>
.sidebar-list {
  cursor: pointer;
  padding-left: 5px;
  padding-right: 5px;
}
.sidebar-list:hover {
  background-color: #f7f5f0;
  border-radius: 1px;
  font-weight: 500;
}
</style>
