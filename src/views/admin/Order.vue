<template>
  <LayoutDefault route="order">
    <div class="header">
      <div class="col h2 text-header px-4">Pesanan</div>
    </div>
    <div class="p-4">
      <div class="row col-5 pb-4">
        <span class="col-2 me-1 fw-semibold align-items-center d-flex"
          >Periode</span
        >
        <div class="col-4 pe-0">
          <select
            class="form-select me-1"
            aria-label="Default select example"
            v-model="selectedMonth"
          >
            <option value="1">Januari</option>
            <option value="2">Februari</option>
            <option value="3">Maret</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">Agustus</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </select>
        </div>
        <div class="col-3">
          <select
            class="col form-select"
            aria-label="Default select example"
            v-model="selectedYear"
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>
      <div class="py-2 px-0 rounded-top border border-bottom-0 bg-tabel">
        <div class="row fw-semibold ps-4">
          <div class="col-1">ID</div>
          <div class="col">Username</div>
          <div class="col-3">Status</div>
          <div class="col">Tanggal</div>
          <div class="col">Total</div>
          <div class="col">Aksi</div>
        </div>
      </div>
      <div class="py-2 px-0 border border-bottom-0">
        <div v-if="Array.isArray(order) && order.length > 0" v-for="item in order" class="row my-3 ps-4">
          <div class="col-1">{{ item.id }}</div>
          <div class="col">{{ item.username }}</div>
          <div class="col-3">
            <span class="badge rounded-pill text-bg-secondary"
              >• {{ item.status }}</span
            >
          </div>
          <div class="col">{{ item.formatted_date }}</div>
          <div class="col">{{ formatToIDR(parseInt(item.total)) }}</div>
          <div class="col">
            <div class="dropdown">
              <button
                class="btn button-putih border dropdown-toggle fw-semibold"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Aksi
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" :href="`/admin/order/detail/${item.id}`"
                    ><span class="fw-semibold">Detail</span></a
                  >
                </li>
                <li v-if="item.status == 'processed'">
                  <span
                    class="fw-semibold dropdown-item"
                    style="cursor: pointer"
                    @click="openModal(item)"
                  >
                    Tambahkan Resi
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="fw-semibold text-secondary justify-content-center d-flex p-3">
          Tidak ada data
        </div>
      </div>
      <div class="pt-3 py-4 rounded-bottom border border-top-0 bg-tabel"></div>
    </div>
    <!-- modal -->
    <div
      class="modal fade"
      id="resiModal"
      tabindex="-1"
      aria-labelledby="resiModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="resiModalLabel">Tambahkan Resi</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row mx-0">
            <div class="col-1 p-0 fw-semibold pt-2">Resi:</div>
            <div class=col>
              <input type="text" class="form-control" v-model="Resi" />
            </div>
          </div>
          <div class="modal-footer pe-4">
            <button
              type="button"
              class="btn btn-light border"
              data-bs-dismiss="modal"
            >
              Tutup
            </button>
            <button type="button" class="btn button-coklat" @click="saveChanges">
              Tambahkan
            </button>
          </div>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const order = ref([]);
const today = new Date();
const token = localStorage.getItem("token");

// Extract the current month and year
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear().toString();

const selectedMonth = ref(currentMonth);
const selectedYear = ref(currentYear);

const Resi = ref('');

const selectedId = ref(null);

const openModal = (id) => {
  selectedId.value = id;
  const modalElement = document.getElementById('resiModal');
  const modal = new bootstrap.Modal(modalElement); // Use Bootstrap's Modal class
  modal.show();
};

async function fetchOrder() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/order/admin-index?month=${
        selectedMonth.value
      }&year=${selectedYear.value}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    order.value = response.data.data;
  } catch (error) {
    console.log("Error fetching stock:", error);
  }
}
const formatToIDR = (value) => {
  if (value !== null && value !== undefined) {
    return value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  return "Loading...";
};
watch([selectedMonth, selectedYear], fetchOrder);

fetchOrder();
</script>

<style scoped>
.header {
  margin-top: 5vh;
}
.text-header {
  color: #402218;
}
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #a77155;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.form-select:focus {
  box-shadow: none;
}
.bg-tabel {
  background-color: #f0eae8;
}
</style>
