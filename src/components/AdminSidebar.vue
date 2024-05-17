<template>
  <div class="sidebar pt-5 sticky-top border-end">
    <div class="mx-4 mt-5">
      <div
        class="ms-1 pill-sidebar border rounded-pill row"
        style="height: 48px; width: 100%"
      >
        <div class="picture rounded-circle ms-1">
          <div
            class="text-brown fw-semibold ms-5 d-flex align-items-center"
            style="height: 100%"
          >
            Admin
          </div>
        </div>
      </div>
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
      <div class="py-2 my-2" :class="{ 'bg-brown rounded': route == 'setting' }">
        <a class="ms-3 text-brown fw-semibold sidebar-button" :class="{ 'text-white': route == 'setting' }" href="/admin/setting"
          ><Icon style="font-size: 20" icon="lets-icons:setting-line" />
          Pengaturan
        </a>
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
</style>
