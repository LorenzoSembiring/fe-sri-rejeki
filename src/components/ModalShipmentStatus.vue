<template>
  <div id="modal_shipment_status" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Lacak Pengiriman</h1>
        </div>
        <div class="modal-body">
          <div class="card p-3 mb-3">
            <div class="d-flex">
              <p class="mb-0 fw-bold" style="width: 80px">Kurir</p>
              <span style="width: 20px">:</span>
              <p>{{ kurir }}</p>
            </div>
            <div class="d-flex">
              <p class="mb-0 fw-bold" style="width: 80px">No Resi</p>
              <span style="width: 20px">:</span>
              <p>{{ awb }}</p>
            </div>
            <div class="d-flex">
              <p class="mb-0 fw-bold" style="width: 80px">Status</p>
              <span style="width: 20px">:</span>
              <p class="text-success">{{ shippingStatus.summary.status }}</p>
            </div>
          </div>
          <h6>Status Pengiriman</h6>
          <div class="card p-3" >
            <ul style="margin-left: -15px" v-if="httpStatusCode == 200">
              <li v-for="history in shippingStatus.history" class="shipping-history mb-2" style="padding-left: 10px">
                <p class="mb-0 fw-bold">{{ history.date }}</p>
                <div class="mb-0">
                  <p class="m-0">{{ history.desc }}</p>
                </div>
              </li>
            </ul>
            <div v-else>
              Tidak Ada Data
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn button-putih border" @click="hide()">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  id: Number,
  awb: String,
  kurir: String,
});
const token = localStorage.getItem("token");
const httpStatusCode = ref()
const shippingStatus = ref({ summary: {}, history: [] });
let modal_shipment_status = null;

const courierMappings = {
  "POS Indonesia (POS)": "POS",
  "Jalur Nugraha Ekakurir (JNE)": "JNE",
  "Citra Van Titipan Kilat (TIKI)": "TIKI",
};

const mappedCourier = ref(courierMappings[props.kurir] || "");

watch(
  () => [props.awb, props.kurir],
  () => {
    mappedCourier.value = courierMappings[props.kurir] || "";
    fetchShipping();
  },
  { immediate: true }
);

onMounted(() => {
  modal_shipment_status = new bootstrap.Modal("#modal_shipment_status", {
    backdrop: true,
  });
fetchShipping();
});

async function fetchShipping() {
  if (!props.awb || !mappedCourier.value) return;

  try {
    const formData = new FormData();
    formData.append("courier", mappedCourier.value);
    formData.append("awb", props.awb);
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/order/cek-resi",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    shippingStatus.value = response.data.data;
    httpStatusCode.value = response.status
    if(response.data.data.summary.status == "DELIVERED") {
      orderComplete();
    }
    console.log(shippingStatus.value);
  } catch (error) {
    console.error("Error fetching shipping status:", error);
  }
}
    }
function show() {
  if (modal_shipment_status) {
    modal_shipment_status.show();
    fetchShipping();
  }
}

function hide() {
  if (modal_shipment_status) {
    modal_shipment_status.hide();
    emit("hideBsModal");
  }
}

defineExpose({ show, hide });
</script>

<style>
.shipping-history {
  position: relative;
}

.shipping-history:first-child::before {
  content: "";
  position: absolute;
  left: -19px;
  top: 8.5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  opacity: 0.5;
  background-color: #00aa5b;
  z-index: 1;
}

.shipping-history:not(:last-child)::after {
  content: "";
  position: absolute;
  left: -14.4px;
  top: 18px;
  width: 1px;
  height: calc(100% - 1px);
  border-left: thin dashed var(--NN50, gray);
  z-index: 1;
}
</style>
