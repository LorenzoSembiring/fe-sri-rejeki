<template>
  <div class="bg-main">
    <LayoutDefault route="dashboard">
      <div class="header">
        <div class="col h2 text-header px-4">Halo, Admin Sri Rejeki</div>
      </div>
      <div class="row m-0 p-4">
        <div
          class="col border-coklat d-inline-flex rounded me-4 bg-card d-flex px-3"
        >
          <div class="align-self-center flex-grow-1">
            <Icon style="font-size: 7vh;" icon="clarity:new-line" />
          </div>
          <div class="">
            <div class="my-2 fw-semibold text-secondary d-flex flex-row-reverse">Pesanan baru</div>
            <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">12</div>
          </div>
        </div>
        <div
          class="col border-coklat d-inline-flex rounded me-4 bg-card d-flex"
        >
          <div class="align-self-center flex-grow-1">
            <Icon style="font-size: 7vh" class="d-flex" icon="carbon:product" />
          </div>
          <div>
            <div class="my-2 fw-semibold text-secondary d-flex flex-row-reverse">Total Pesanan</div>
            <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">372</div>
          </div>
        </div>
        <div
          class="col border-coklat d-inline-flex rounded me-4 bg-card d-flex"
        >
          <div class="align-self-center flex-grow-1">
            <Icon style="font-size: 7vh" icon="ph:money" />
          </div>
          <div>
            <div class="my-2 fw-semibold text-secondary d-flex flex-row-reverse">Total Penjualan</div>
            <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">Rp120.000.000</div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  </div>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import { Icon } from "@iconify/vue";
</script>

<style scoped>
.header {
  margin-top: 5vh;
}
.text-header {
  color: #402218;
}
.bg-main {
  background: rgb(240, 234, 232);
  background: linear-gradient(
    180deg,
    rgb(248, 248, 248) 0%,
    rgba(255, 255, 255, 1) 53%,
    rgba(255, 255, 255, 1) 100%
  );
}
.border-coklat {
  border: 1px solid #dbcdc5;
  /* box-shadow: 1px 1px 4px rgb(248, 217, 206);  */
}
.font-jakarta {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 800;
}
.bg-card {
  background: rgb(255, 255, 255);
}
</style>
