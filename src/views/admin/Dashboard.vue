<template>
  <div class="bg-main">
    <LayoutDefault route="dashboard">
      <div class="header">
        <div class="col h2 text-header px-4">Halo, {{ username }}</div>
      </div>
      <div class="row m-0 p-4">
        <div
          class="col border-coklat d-inline-flex rounded me-4 bg-card d-flex px-3"
        >
          <div class="align-self-center flex-grow-1">
            <Icon style="font-size: 7vh" icon="clarity:new-line" />
          </div>
          <div class="">
            <div
              class="my-2 fw-semibold text-secondary d-flex flex-row-reverse"
            >
              Pesanan baru
            </div>
            <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">
              <!-- Check if newOrderCount is not null or undefined before rendering -->
              {{ newOrderCount !== null ? newOrderCount : 'Loading...' }}
            </div>
          </div>
        </div>
        <div
          class="col border-coklat d-inline-flex rounded me-4 bg-card d-flex"
        >
          <div class="align-self-center flex-grow-1">
            <Icon style="font-size: 7vh" class="d-flex" icon="carbon:product" />
          </div>
          <div>
            <div
              class="my-2 fw-semibold text-secondary d-flex flex-row-reverse"
            >
              Total Pesanan
            </div>
            <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">
              <!-- Check if orderCount is not null or undefined before rendering -->
              {{ orderCount !== null ? orderCount : 'Loading...' }}
            </div>
          </div>
        </div>
        <div class="col border-coklat d-inline-flex rounded bg-card d-flex">
          <div class="align-self-center flex-grow-1">
            <Icon style="font-size: 7vh" icon="ph:money" />
          </div>
          <div>
            <div
              class="my-2 fw-semibold text-secondary d-flex flex-row-reverse"
            >
              Total Penjualan
            </div>
            <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">
              <!-- Check if totalSales is not null or undefined before rendering -->
              {{ totalSales !== null ? formatToIDR(parseInt(totalSales)) : 'Loading...' }}
            </div>
          </div>
        </div>
      </div>
      <div class="p-4">
        <div class="my-3 h4">Pesanan Baru</div>
        <div class="py-2 px-0 rounded-top border border-bottom-0 bg-tabel">
          <div class="row fw-semibold ms-3">
            <div class="col-1">ID</div>
            <div class="col">Username</div>
            <div class="col-3">Status</div>
            <div class="col">Tanggal</div>
            <div class="col">Total</div>
            <div class="col">Aksi</div>
          </div>
        </div>
        <div v-for="item in newOrder" class="py-2 px-0 border border-bottom-0">
          <div class="row my-3 ms-3">
            <div class="col-1">{{ item.id }}</div>
            <div class="col">{{ item.username }}</div>
            <div class="col-3">
              <span class="badge rounded-pill text-bg-secondary"
                >• {{item.status}}</span
              >
            </div>
            <div class="col">{{item.formatted_date}}</div>
            <div class="col">{{item.total !== null ? formatToIDR(parseInt(item.total)) : 'Loading...'}}</div>
            <div class="col">
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
                  <a
                    class="dropdown-item"
                    :href="`/admin/order/detail/${item.id}`"
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
        <div class="pt-3 rounded-bottom border border-top-0 bg-tabel py-4">
          <!-- <div class="row mx-3 text-secondary">
            <div class="col mt-1">Menampilkan 1-10 dari 20 Pesanan</div>
            <div class="col d-flex justify-content-end align-items-center">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#">←</a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#">→</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div> -->
        </div>
      </div>
    </LayoutDefault>
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
            <div class="row p-0 mb-3">
              <div class="text-secondary">
                Kurir pilihan: <b>{{ selectedItem.kurir }}</b> -
                <b>{{ selectedItem.type_kurir }}</b>
              </div>
              <div class="text-secondary">
                Ongkir: <b>{{ formatToIDR(selectedItem.ongkir) }}</b>
              </div>
            </div>
            <div class="row">
              <div class="col-1 p-0 fw-semibold pt-2">Resi:</div>
              <div class="col">
                <input type="text" class="form-control" v-model="resi" />
              </div>
            </div>
          </div>
          <div class="modal-footer pe-4">
            <button
              type="button"
              class="btn btn-light border"
              data-bs-dismiss="modal"
              @click="selectedItem = []"
            >
              Tutup
            </button>
            <button
              type="button"
              class="btn button-coklat"
              @click="submitReceipt()"
            >
              Tambahkan
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const token = localStorage.getItem("token");
const username = localStorage.name ?? null;

const newOrder = ref([]);
const newOrderCount = ref(null);
const orderCount = ref(null);
const totalSales = ref(null);

const resi = ref("");
const selectedItem = ref([]);

const openModal = (item) => {
  selectedItem.value = item;
  const modalElement = document.getElementById("resiModal");
  const modal = new bootstrap.Modal(modalElement); // Use Bootstrap's Modal class
  modal.show();
};
async function submitReceipt() {
  try {
    const formData = new FormData();
    formData.append("order_id", selectedItem.value.id);
    formData.append("resi", resi.value);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/order/add-resi`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response.status == 200) {
      location.reload();
    }
  } catch (error) {
    console.log("Error submitting receipt:", error);
  }
}
const fetchNewOrderCount = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/dashboard/count-new-order",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    newOrderCount.value = response.data.data;
  } catch (error) {
    console.error("Error fetching new order count:", error);
  }
};

const fetchNewOrder = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/dashboard/new-order",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    newOrder.value = response.data.data;
  } catch (error) {
    console.error("Error fetching new orders:", error);
  }
};

const fetchCountOrder = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/dashboard/count-order",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    orderCount.value = response.data.data;
  } catch (error) {
    console.error("Error fetching order count:", error);
  }
};

const fetchTotalSales = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/dashboard/total-sales",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    totalSales.value = response.data.data;
  } catch (error) {
    console.error("Error fetching total sales:", error);
  }
};

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

onMounted(async () => {
  await fetchNewOrderCount();
  await fetchCountOrder();
  await fetchNewOrder();
  await fetchTotalSales();
});
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
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #a77155;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.font-jakarta {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 800;
}
.bg-card {
  background: rgb(255, 255, 255);
}
.bg-tabel {
  background-color: #f0eae8;
}
</style>
