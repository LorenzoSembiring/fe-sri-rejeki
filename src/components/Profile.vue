<template>
<div class="border-start ps-4" v-if="token">
          <div class="border rounded-pill" style="height: 40px; width: 150px">
            <div
              :class="{
                'default-pic': !isPorfilePicExist,
                'profile-pic': isPorfilePicExist,
                'rounded-circle': true,
                'mt-1': true,
                'ms-1': true,
              }"
            >
              <div class="pill-name text-nowrap ms-4 pt-1 ps-3 d-flex align-items-center">
                Malika Malik
              </div>
            </div>
          </div>
        </div>

        <div class="border-start ps-3 py-1" v-else>
          <a class="login-register mx-3" href="/login">Masuk</a>
          <a class="login-register mx-3" href="/register">Daftar</a>
        </div>
</template>

<script setup>

const token = localStorage.token ?? null;
const isPorfilePicExist = false;

const popover = ref(false);
const popoverTrigger = ref

</script>