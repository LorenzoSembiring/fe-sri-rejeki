<template>
  <div class="grid-container">
    <AdminSidebar :route="route" class="sidebar"></AdminSidebar>
    <div class="main">
        <slot></slot>
    </div>
  </div>
</template>
<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue";

defineProps({
  route: String
});
</script>
<style scoped>
.grid-container {
  display: grid;
  grid-template-areas:
    "sidebar main"
    "sidebar main";
    grid-template-columns: 250px auto;
}
.main {
    grid-area: main;
}
.sidebar {
    grid-area: sidebar;
}
</style>
