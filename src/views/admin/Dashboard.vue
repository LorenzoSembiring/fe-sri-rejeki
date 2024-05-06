<template>
  <AdminSidebar>
  <div class="row">
    <div class="col pt-5">
      <div class="h2">Halo, Admin</div>
    </div>
  </div>
  </AdminSidebar>
</template>

<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue";
</script>

<style scoped>
.sidebar {
  height: 100vh;
  overflow-y: auto;
  background: linear-gradient(180deg, rgb(180, 114, 72) 0%, rgba(170,125,97,1) 100%);

}
.col-1 {
  flex: 0 0 auto;
  width: 13%;
}
.sidebar-button {
  text-decoration: none;
  font-weight: 700;
}
.picture {
  margin-top: 3px;
  height: 40px;
  width: 40px;
  background-image: url("@/assets/default_profile_picture.jpg");
}
</style>