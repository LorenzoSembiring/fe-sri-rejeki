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
          <div
            @click="router.push('/profile/address')"
            class="py-2 sidebar-list"
          >
            Daftar Alamat
          </div>
        </div>
        <div class="px-3 pt-2 pb-4">
          <div
            @click="router.push('/profile/waiting-payment')"
            class="py-2 sidebar-list"
          >
            Menunggu Pembayaran
          </div>
          <div class="py-2 sidebar-list">Riwayat Transaksi</div>
        </div>
      </div>
    </div>
    <div class="col pt-4 summary-col">
      <div class="row">
        <div class="col border-end ps-5">
          <div class="d-flex">
            <Icon
              class="text-secondary"
              icon="mdi:account-outline"
              style="font-size: 24px"
            />
            <p class="text-secondary fw-bold">{{ username }}</p>
          </div>
          <div class="d-flex ps-1">
            <p class="text-secondary fw-bold">Riwayat Transaksi</p>
          </div>
          <div v-for="item in orderData" class="border col-9 rounded p-3 mb-2">
            <div class="d-flex">
              <Icon icon="bi:bag" class="fs-5 secondary" />
              <p class="ps-2 fw-semibold">Belanja</p>
              <p class="ps-5">{{ item.formatted_date }}</p>
              <p :class="getBadgeClass(item.status)" style="font-size: 12px">
                {{ item.status }}
              </p>
              <p class="text-secondary ps-4" style="font-size: 12px">
                {{ item.midtrans_id }}
              </p>
            </div>
            <div class="d-flex ps-3">
              <img :src="parsedImage(item.path)" style="height: 60px" alt="" />
              <div>
                <div class="fw-semibold ps-4">{{ item.name }}</div>
                <div class="ps-4 d-flex">
                  <p class="fw-semibold me-3">Total:</p>
                  <p>{{ formatToIDR(parseInt(item.total)) }}</p>
                </div>
              </div>
              <div class="d-flex" v-if="item.status == 'waiting for payment'">
                <div class="ps-3">
                  <button
                    class="btn btn-outline-success border"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCekBayar"
                    @click="
                      getMidtransStatus(item.midtrans_id),
                        setMidtransToken(item.midtrans_token)
                    "
                  >
                    Cek Status Bayar
                  </button>
                </div>
                <div class="ps-3">
                  <button class="btn btn-outline-danger border">
                    Batalkan
                  </button>
                </div>
              </div>
              <div v-else-if="item.status == 'shipped'">
                <div class="ps-3">
                  <button class="btn btn-outline-success border" @click="openShipmentModal">Lacak</button>
                  <button class="ms-2 btn btn-outline-secondary border">
                    Detail
                  </button>
                </div>
              </div>
              <div v-else>
                <div class="ps-3">
                  <button class="btn btn-outline-secondary border">
                    Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalShipmentStatus ref="shipmentModal"></ModalShipmentStatus>
  <div
    class="modal fade"
    id="modalCekBayar"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div>
            <div class="d-flex flex-column align-items-center">
              <div>
                <Icon
                  icon="mdi:information-outline"
                  class="text-danger"
                  style="font-size: 80px"
                />
              </div>
              <div class="fw-semibold fs-5">
                Anda belum melakukan pembayaran
              </div>
              {{ clickedPayment }}
            </div>
            <div class="d-flex justify-content-center py-3">
              <button
                @click="makePayment(midtransToken)"
                class="btn btn-outline-success border"
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            @click="(isPaid = null), (midtransToken = null)"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ModalShipmentStatus from "@/components/ModalShipmentStatus.vue";
import Navbar from "@/components/Navbar.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import router from "../router/index.js";
import axios from "axios";

const orderData = ref([]);
const token = localStorage.getItem("token");
const username = localStorage.name ?? null;
const midtransToken = ref("");
const shipmentModal = ref(null);

function openShipmentModal() {
  shipmentModal.value.show();
}

function formatToIDR(number) {
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
async function makePayment(token) {
  window.open(`https://app.sandbox.midtrans.com/snap/v4/redirection/${token}`);
}

function setMidtransToken(token) {
  midtransToken.value = token;
  console.log(midtransToken.value);
}

async function getMidtransStatus(id) {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + `/api/order/midtrans-status/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.transaction_status == "settlement") {
      isPaid.value = true;
      location.reload();
    } else {
      isPaid.value = false;
    }
  } catch (error) {
    console.log("Error fetching payment status:", error);
  }
}

const getBadgeClass = (status) => {
  switch (status) {
    case "waiting for payment":
    case "pending":
      return "badge text-bg-secondary rounded ms-3";
    case "processed":
    case "shipped":
      return "badge text-bg-primary primary ms-3";
    case "delivred":
    case "completed":
      return "badge text-bg-success rounded ms-3";
    case "canceled":
      return "badge text-bg-danger rounded ms-3";
    default:
      return "";
  }
};
const parsedImage = (path) => {
  return import.meta.env.VITE_API_URL + path;
};
async function fetchOrder() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/order/transaction-history/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    orderData.value = response.data.data;
    console.log(orderData.value);
  } catch (error) {
    console.log("Error fetching user:", error);
  }
}

fetchOrder();
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
</style>
