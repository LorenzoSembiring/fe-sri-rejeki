<template>
  <div class="sidebar pt-3 sticky-top border-end d-flex flex-column" style="height: 100vh">
    <div class="d-flex justify-content-center my-4">
      <img style="height: 5vh; width: auto" src="@/assets/logo-cropped.png" />
    </div>
    <div class="flex-grow-1 mx-4">
      <div class="border-top py-2 my-2" :class="{ 'bg-brown rounded': route == 'dashboard' }">
        <a class="ms-3 text-brown fw-semibold sidebar-button" :class="{ 'text-white': route == 'dashboard' }" href="/admin/dashboard"
          ><Icon class="" style="font-size: 20" icon="teenyicons:home-outline" />
          Dashboard
        </a>
      </div>
      <div class="py-2 my-2" :class="{ 'bg-brown rounded': route == 'statistic' }">
        <a class="ms-3 text-brown fw-semibold sidebar-button" :class="{ 'text-white': route == 'statistic' }" href="/admin/statistic"
          ><Icon style="font-size: 20" icon="uil:chart-line" />
          Statistik
        </a>
      </div>
      <div class="py-2 my-2" :class="{ 'bg-brown rounded': route == 'product' }">
        <a class="ms-3 text-brown fw-semibold sidebar-button" :class="{ 'text-white': route == 'product' }" href="/admin/product"
          ><Icon style="font-size: 20" icon="mynaui:package" />
          Produk
        </a>
      </div>
      <div class="py-2 my-2" :class="{ 'bg-brown rounded': route == 'order' }">
        <a class="ms-3 text-brown fw-semibold sidebar-button" :class="{ 'text-white': route == 'order' }" href="/admin/order">
          <Icon style="font-size: 20" icon="mdi:cart" />
          Pesanan
        </a>
      </div>
      <div class="py-2 my-2" :class="{ 'bg-brown rounded': route == 'category' }">
        <a class="ms-3 text-brown fw-semibold sidebar-button" :class="{ 'text-white': route == 'category' }" href="/admin/category">
          <Icon style="font-size: 20" icon="fluent:apps-list-24-filled" />
          Kategori
        </a>
      </div>
      <div class="py-2 my-2" :class="{ 'bg-brown rounded': route == 'd3' }">
        <a class="ms-3 text-brown fw-semibold sidebar-button" :class="{ 'text-white': route == 'd3' }" href="/admin/3d"
          ><Icon style="font-size: 20" icon="iconoir:3d-select-solid" />
          3D
        </a>
      </div>
    </div>
    <div class="px-2 pe-3 my-3">
      <div class="d-flex ms-1 border-profile rounded-pill row mt-auto mb-2" style="height: 9vh; width: 100%;">
        <div class="col-3 align-items-center p-1">
          <img class="rounded-circle" style="height: 7vh; width: 7vh;" src="@/assets/default_profile_picture.jpg">
        </div>
        <div class="text-brown fw-semibold d-flex align-items-center col" style="height: 100%">
          Admin Sri Rejeki
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  route: String
});
</script>

<style scoped>
.sidebar {
  height: 100vh;
  overflow-y: auto;
  background-color: #f0eae8;
}
.bg-brown {
  background-color: #865439
}
.text-brown {
  color: #865439
}
.picture {
  width: 20px;
  height: 20px;
  background-image: url("@/assets/default_profile_picture.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
.border-profile {
  border-style: solid;
  border-width: 1px;
  border-color: #865439
}
</style>
