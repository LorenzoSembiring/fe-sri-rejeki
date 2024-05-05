<template>
  <div class="col-2 sidebar pt-5">
    <div class="ms-2 mt-5">
      <div
        class="ms-1 pill-sidebar border rounded-pill row"
        style="height: 48px; width: 100%"
      >
        <div class="picture rounded-circle ms-1">
          <div
            class="text-white fw-bold ms-5 d-flex align-items-center"
            style="height: 100%"
          >
            Admin
          </div>
        </div>
      </div>
      <div class="border-top py-2 my-2">
        <a class="ms-3 text-white sidebar-button" href="/admin/dashboard"
          ><Icon style="font-size: 20" icon="teenyicons:home-outline" />
          Dashboard
        </a>
      </div>
      <div class="py-2 my-2">
        <a class="ms-3 text-white sidebar-button" href="/admin/statistic"
          ><Icon style="font-size: 20" icon="uil:chart-line" />
          Statistik
        </a>
      </div>
      <div class="py-2 my-2">
        <a class="ms-3 text-white sidebar-button" href="/admin/product"
          ><Icon style="font-size: 20" icon="mynaui:package" />
          Produk
        </a>
      </div>
      <div class="py-2 my-2">
        <a class="ms-3 text-white sidebar-button" href="/admin/order">
          <Icon style="font-size: 20" icon="mdi:cart" />
          Pesanan
        </a>
      </div>
      <div class="py-2 my-2">
        <a class="ms-3 text-white sidebar-button" href="/admin/category">
          <Icon style="font-size: 20" icon="fluent:apps-list-24-filled" />
          Kategori
        </a>
      </div>
      <div class="py-2 my-2">
        <a class="ms-3 text-white sidebar-button" href="/admin/3d"
          ><Icon style="font-size: 20" icon="iconoir:3d-select-solid" />
          3D
        </a>
      </div>
      <div class="py-2 my-2">
        <a class="ms-3 text-white sidebar-button" href="/admin/setting"
          ><Icon style="font-size: 20" icon="lets-icons:setting-line" />
          Pengaturan
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
</script>

<style scoped>
.sidebar {
	height: 100vh;
	overflow-y: auto;
	background-color: #865439;
}
</style>