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
          <div @click="router.push('/profile')" class="py-2 sidebar-list">
            Biodata
          </div>
          <div class="py-2 sidebar-list">Daftar Alamat</div>
        </div>
        <div class="px-3 pt-2 pb-4">
          <div class="py-2 sidebar-list">Menunggu Pembayaran</div>
          <div class="py-2 sidebar-list">Riwayat Transaksi</div>
        </div>
      </div>
    </div>
    <div class="col pt-4 summary-col">
      <div class="row">
        <div class="col-10">
          <div class="d-flex ps-5 pb-3">
            <Icon
              class="text-secondary"
              icon="mdi:account-outline"
              style="font-size: 24px"
            />
            <p class="text-secondary fw-bold">{{ username }}</p>
            <div class="ms-auto">
              <button class="btn button border">+ Tambah Alamat</button>
            </div>
          </div>
          <div class="col">
            <div class="ms-5 p-4 mb-3 border rounded card-unselected d-flex">
              <div class="row">
                <div class="fw-semibold text-secondary">ALAMAT PENGIRIMAN</div>
                <div class="col-11">
                  <div class="fw-bold my-1">
                    <Icon icon="gg:pin" />
                    Rumah • Malik
                  </div>
                  <div>
                    Jl. Ahmad Yani No. 123, Kelurahan Cempaka Putih, Kota
                    Jakarta Pusat, DKI Jakarta, 081123456789
                  </div>
                </div>
              </div>
              <div class="col d-flex align-items-center">
                <button
                  class="btn button border"
                  style="
                    border-width: 2px !important;
                    border-color: #e2e2e2 !important;
                  "
                >
                  Pilih
                </button>
              </div>
            </div>
            <div class="ms-5 p-4 border mb-3 rounded card-selected d-flex">
              <div class="row">
                <div class="fw-semibold text-secondary">ALAMAT PENGIRIMAN</div>
                <div class="col-11">
                  <div class="fw-bold my-1">
                    <Icon icon="gg:pin" />
                    Rumah • Malik
                  </div>
                  <div>
                    Jl. Ahmad Yani No. 123, Kelurahan Cempaka Putih, Kota
                    Jakarta Pusat, DKI Jakarta, 081123456789
                  </div>
                </div>
              </div>
              <div class="col d-flex align-items-center">
                <Icon
                  class="text-success"
                  style="font-size: 30px"
                  icon="ic:outline-check"
                />
              </div>
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
import { ref } from "vue";
import router from "../router/index.js";
import axios from "axios";

const token = localStorage.getItem("token");
const users = ref([""]);
const username = localStorage.name ?? null;

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
.button {
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
.button:hover {
  background-color: #fffaf8;
  color: #694b3a;
  transform: scale(0.98);
}
.card-unselected {
  background-image: url("@/assets/kratos.png");
  background-repeat: no-repeat;
  background-position: bottom right;
  border-width: 2px !important;
}
.card-selected {
  background-image: url("@/assets/kratos-success.png");
  background-color: #f9fffa;
  border-color: #c0ffc8 !important;
  border-width: 2px !important;
  background-repeat: no-repeat;
  background-position: bottom right;
}
</style>
