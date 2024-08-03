<template>
    <div id="modal_shipment_status" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Lacak Pengiriman
                    </h1>
                </div>
                <div class="modal-body">
                    <div class="card p-3 mb-3" style="">
                        <div class="d-flex">
                            <p class="mb-0 fw-bold" style="width:80px;">Kurir</p>
                            <span style="width: 20px;">:</span>
                            <p>Shopee Express</p>
                        </div>
                        <div class="d-flex">
                            <p class="mb-0 fw-bold" style="width:80px;">No Resi</p>
                            <span style="width: 20px;">:</span>
                            <p>SPXID03286657296C</p>
                        </div>
                        <div class="d-flex">
                            <p class="mb-0 fw-bold" style="width:80px;">Status</p>
                            <span style="width: 20px;">:</span>
                            <p class="text-success">DELIVERED</p>
                        </div>
                    </div>
                    <h6>Status Pengiriman</h6>
                    <div class="card p-3">
                        <ul style="margin-left: -15px;">
                            <li v-for="history in histories" class="shiping-history mb-2" style="padding-left: 10px;">
                                <p class="mb-0 fw-bold">{{ history.date }}</p>
                                <div class="mb-0">
                                    <p class="m-0">{{ history.desc }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn button-putih border" @click="hide()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue"

defineEmits(['showBsModal', 'hideBsModal'])

let modal_shipment_status = null

let histories = [
    {
        "date": "2023-12-28 04:25:23",
        "desc": "[Kemayoran Hub] Paket anda telah diterima [resepsionis ] [ Others]",
        "location": ""
    },
    {
        "date": "2023-12-27 23:58:07",
        "desc": "[Kemayoran Hub] Paket sedang dikirim oleh kurir",
        "location": ""
    },
    {
        "date": "2023-12-27 20:48:38",
        "desc": "[Kemayoran Hub] Paket telah diterima Hub Pengiriman",
        "location": ""
    },
    {
        "date": "2023-12-27 17:55:12",
        "desc": "[Cakung DC] Paket dalam perjalanan ke [Kemayoran Hub]",
        "location": ""
    },
    {
        "date": "2023-12-27 15:21:43",
        "desc": "[Cakung DC] Paket telah diterima Pusat Sortir",
        "location": ""
    },
    {
        "date": "2023-12-27 13:03:30",
        "desc": "[Sawah Besar First Mile Hub] Paket dalam perjalanan ke [Cakung DC]",
        "location": ""
    },
    {
        "date": "2023-12-27 12:46:57",
        "desc": "[Sawah Besar First Mile Hub] Paket telah diterima Pick-up Hub",
        "location": ""
    },
    {
        "date": "2023-12-27 12:09:35",
        "desc": "[Sawah Besar First Mile Hub] Paket anda telah diambil dari penjual",
        "location": ""
    },
    {
        "date": "2023-12-27 03:26:41",
        "desc": "Nomor Resi Pengiriman telah dibuat",
        "location": ""
    }

]

onMounted(() => {
    modal_shipment_status = new bootstrap.Modal('#modal_shipment_status', {
        backdrop: true,
    })
})

function show() {
    if (modal_shipment_status) {
        modal_shipment_status.show()
        emit("showBsModal")
    }
}

function hide() {
    if (modal_shipment_status) {
        modal_shipment_status.hide()
        emit("hideBsModal")
    }
}

defineExpose({ show, hide })
</script>

<style>
.shiping-history {
    position: relative;
}

.shiping-history:first-child::before {
    content: "";
    position: absolute;
    left: -19px;
    top: 8.5px;
    width: 10px;
    height: 10px;
    border-radius: 50%; 
    opacity: .5;
    background-color: #00AA5B;
    z-index: 1;
}

.shiping-history:not(:last-child):after {
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