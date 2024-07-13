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
            <div class="ms-auto" @click="addAddress">
              <button class="btn button border">+ Tambah Alamat</button>
            </div>
          </div>
          <div class="col">
            <div
              v-for="n in address"
              class="ms-5 p-4 mb-3 border rounded d-flex"
              :class="n.selected ? 'card-selected' : 'card-unselected'"
            >
              <div class="row">
                <div class="fw-semibold text-secondary">ALAMAT PENGIRIMAN</div>
                <div class="col-11">
                  <div class="fw-bold my-1">
                    <Icon icon="gg:pin" />
                    {{ n.label }} • {{ n.name }}
                  </div>
                  <div>
                    {{ n.jalan }}, {{ n.kelurahan }}, {{ n.kecamatan }}, {{ n.kota }}, {{n.provinsi}}, {{n.phone}}
                  </div>
                </div>
              </div>
              <div class="col d-flex align-items-center">
                <Icon
                  v-if="n.selected"
                  class="text-success"
                  style="font-size: 30px"
                  icon="ic:outline-check"
                />
                <button
                  v-else
                  @click="changeSelected(n.id)"
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
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- modal -->
  <div class="modal" :id="`Modal`" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Tambah Alamat</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal()"
          ></button>
        </div>
        <div class="modal-body">
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Provinsi</div>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedProvinsi"
            >
              <option v-for="n in provinsi" :value="n.id" :key="n.id">
                {{ n.name }}
              </option>
            </select>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Kabupaten / Kota</div>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedKota"
              :disabled="!selectedProvinsi"
            >
              <option v-for="n in kota" :value="n.id" :key="n.id">
                {{ n.name }}
              </option>
            </select>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Kecamatan</div>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedKecamatan"
              :disabled="!selectedKota"
            >
              <option v-for="n in kecamatan" :value="n.id" :key="n.id">
                {{ n.name }}
              </option>
            </select>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Kelurahan</div>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedKelurahan"
              :disabled="!selectedKecamatan"
            >
              <option v-for="n in kelurahan" :value="n.id" :key="n.id">
                {{ n.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn button-putih"
            data-bs-dismiss="modal"
            @click="closeModal()"
          >
            Tutup
          </button>
          <button type="button" class="btn button-coklat">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { Icon } from "@iconify/vue";
import { ref, watch, onMounted } from "vue";
import router from "../router/index.js";
import axios from "axios";

const token = localStorage.getItem("token");
const users = ref([""]);
const username = localStorage.name ?? null;
var address = ref([""]);

const name = ref("");
const phone = ref("");
const jalan = ref("");
const kelurahan = ref("");
const kecamatan = ref("");
const kota = ref("");
const provinsi = ref("");
const kodePos = ref("");
const selectedName = ref("");
const selectedPhone = ref("");
const selectedJalan = ref("");
const selectedKelurahan = ref("");
const selectedKecamatan = ref("");
const selectedKota = ref("");
const selectedProvinsi = ref("");
const selectedKodePos = ref("");

onMounted( () => {
  fetchAddress();
  }
)

async function changeSelected(id) {
  try {
    const response = await axios.put(
      import.meta.env.VITE_API_URL + "/api/address/update-selected/" + id,
      {}
      ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 200) {
      location.reload();
    }
  } catch (error) {
    console.log("Error fetching user:", error);
  }
}

async function fetchAddress() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/address/get",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    address.value = response.data.data;
    console.log(address);
  } catch (error) {
    console.log("Error fetching user:", error);
  }
}
async function fetchProvince() {
  try {
    const response = await axios.get(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    provinsi.value = response.data;
  } catch (error) {
    console.error("Error fetching province:", error);
  }
}

async function fetchCity() {
  try {
    const response = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinsi.value}.json`
    );
    kota.value = response.data;
  } catch (error) {
    console.error("Error fetching city:", error);
  }
}

async function fetchKecamatan() {
  try {
    const response = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedKota.value}.json`
    );
    kecamatan.value = response.data;
  } catch (error) {
    console.error("Error fetching kecamatan:", error);
  }
}

async function fetchKelurahan() {
  try {
    const response = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedKecamatan.value}.json`
    );
    kelurahan.value = response.data;
  } catch (error) {
    console.error("Error fetching kelurahan:", error);
  }
}

watch(selectedProvinsi, (newValue) => {
  if (newValue) {
    fetchCity();
  } else {
    selectedKota.value = "";
    selectedKecamatan.value = "";
    selectedKelurahan.value = "";
    kota.value = [];
    kecamatan.value = [];
    kelurahan.value = [];
  }
});

watch(selectedKota, (newValue) => {
  if (newValue) {
    fetchKecamatan();
  } else {
    selectedKecamatan.value = "";
    selectedKelurahan.value = "";
    kecamatan.value = [];
    kelurahan.value = [];
  }
});

watch(selectedKecamatan, (newValue) => {
  if (newValue) {
    fetchKelurahan();
  } else {
    selectedKelurahan.value = "";
    kelurahan.value = [];
  }
});
function closeModal() {
  // isModalOpen.value = false;
  selectedProvinsi.value = "";
  selectedKota.value = "";
  selectedKecamatan.value = "";
  selectedKelurahan.value = "";
  kota.value = [];
  kecamatan.value = [];
  kelurahan.value = [];
}
const addAddress = () => {
  const modal = new bootstrap.Modal(document.getElementById("Modal"));
  modal.show();
};


fetchProvince();
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
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #a77155;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.button-putih {
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  color: rgb(53, 53, 53);
  font-weight: 600;
}
</style>
