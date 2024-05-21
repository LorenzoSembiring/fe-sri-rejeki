<template>
  <LayoutDefault route="statistic">
		<div class="header">
      <div class="col h2 text-header px-4">Kategori</div>
    </div>
    <div class="row m-0 p-4">
      <div
        class="col border-coklat d-inline-flex rounded me-4 bg-card d-flex px-3"
      >
        <div class="align-self-center flex-grow-1">
          <Icon style="font-size: 7vh" icon="mdi:user-outline" />
        </div>
        <div class="">
          <div class="my-2 fw-semibold text-secondary d-flex flex-row-reverse">
            Total Pengguna
          </div>
          <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">118</div>
        </div>
      </div>
      <div class="col border-coklat d-inline-flex rounded me-4 bg-card d-flex">
        <div class="align-self-center flex-grow-1">
          <Icon style="font-size: 7vh" class="d-flex" icon="carbon:product" />
        </div>
        <div>
          <div class="my-2 fw-semibold text-secondary d-flex flex-row-reverse">
            Total Pesanan
          </div>
          <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">372</div>
        </div>
      </div>
      <div class="col border-coklat d-inline-flex rounded me-4 bg-card d-flex">
        <div class="align-self-center flex-grow-1">
          <Icon style="font-size: 7vh" icon="ph:money" />
        </div>
        <div>
          <div class="my-2 fw-semibold text-secondary d-flex flex-row-reverse">
            Total Penjualan
          </div>
          <div class="h4 mb-3 d-flex flex-row-reverse font-jakarta">
            Rp120.000.000
          </div>
        </div>
      </div>
      <div class="col border-coklat d-inline-flex rounded bg-card d-flex">
        <div class="align-self-center flex-grow-1">
          <Icon style="font-size: 7vh" icon="mynaui:package" />
        </div>
        <div>
          <div class="my-2 fw-semibold text-secondary d-flex flex-row-reverse">
            Total Produk
          </div>
          <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">
            3
          </div>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>
<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";

</script>
<style scoped>
.header {
  margin-top: 5vh;
}
.text-header {
  color: #402218;
}
.border-coklat {
  border: 1px solid #dbcdc5;
  /* box-shadow: 1px 1px 4px rgb(248, 217, 206);  */
}</style>
