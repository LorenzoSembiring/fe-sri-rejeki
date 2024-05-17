<template>
  <LayoutDefault route="dashboard">
    <div class="header">
      <div class="col h2 text-header px-4">Halo, Admin</div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
</script>

<style scoped>
.header {
  margin-top: 10vh;
}
.text-header {
  color: #402218;
}
</style>