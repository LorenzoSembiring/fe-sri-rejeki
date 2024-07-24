<template>
  <Navbar class="fixed-top" />
  <div class="row mt-5 pt-5">
    <div class="col-3">
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
          <div
            @click="router.push('/profile/address')"
            class="py-2 sidebar-list"
          >
            Daftar Alamat
          </div>
        </div>
        <div class="px-3 pt-2 pb-4">
          <div @click="router.push('/profile/waiting-payment')" class="py-2 sidebar-list">Menunggu Pembayaran</div>
          <div @click="router.push('/profile/transaction-history')" class="py-2 sidebar-list">Riwayat Transaksi</div>
        </div>
      </div>
    </div>
    <div class="col pt-4 summary-col">
      <div class="row">
        <div class="col-4 border-end">
          <div class="d-flex ps-5">
            <Icon
              class="text-secondary"
              icon="mdi:account-outline"
              style="font-size: 24px"
            />
            <p class="text-secondary fw-bold">{{ username }}</p>
          </div>
          <div class="d-flex justify-content-center">
            <img
              :src="profilePicture"
              alt="@/assets/default_profile_picture.jpg"
              style="max-width: 100%"
            />
          </div>
          <div class="px-5 mx-3" style="font-size: smaller; color: #555">
            Besar file maksimum 2Mb. Ekstensi file yang diperbolehkan: .JPG
            .JPEG .PNG
          </div>
          <div class="mt-3 d-flex justify-content-center">
            <button class="btn button-foto border">
              <Icon icon="mdi:image" class="" style="font-size: 24px" />Ubah
              foto
            </button>
          </div>
        </div>
        <div class="col ps-4">
          <div class="row">
            <div class="fw-semibold">Biodata Diri</div>
            <div class="col-4">
              <div class="my-2">Nama</div>
              <div class="my-2">Username</div>
              <div class="my-2">Email</div>
              <div class="my-2">Nomor Telpon</div>
            </div>
            <div class="col">
              <div class="my-2">{{ users.first_name }}</div>
              <div class="my-2">{{ users.username }}</div>
              <div class="my-2">{{ users.email }}</div>
              <div class="my-2">{{ users.phone }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";
import router from "../router/index.js";
import axios from "axios";
import defaultProfilePicture from "@/assets/default_profile_picture.jpg";

const token = localStorage.getItem("token");
const users = ref([""]);
const username = localStorage.name ?? null;

// Ensure users.value.picture is a string URL or get the correct property from the object
const profilePicture = computed(() => {
  return users.value.picture || defaultProfilePicture; // Adjust according to the structure of your object
});

async function fetchUser() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/auth/get/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    users.value = response.data.data;
    console.log(users.value);
  } catch (error) {
    console.log("Error fetching user:", error);
  }
}
fetchUser();
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
.button-foto {
  align-items: center;
  background-color: white;
  color: rgb(105, 75, 58);
  cursor: pointer;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  max-width: 100%;
}
.button-foto:hover {
  background-color: #fffaf8;
  color: #694b3a;
  transform: scale(0.98);
}
</style>
