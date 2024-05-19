<template>
  <LayoutDefault route="order">
    <div class="header">
      <div class="col h2 text-header px-4">Pesanan</div>
    </div>
    <div class="p-4">
      <div class="row col-5 pb-4">
      <span class="col-2 me-1 fw-semibold align-items-center d-flex">Periode</span>
      <div class="col-4 pe-0">
        <select class="form-select me-1" aria-label="Default select example">
          <option value="Jan">Januari</option>
          <option value="Feb">Februari</option>
          <option value="Mar">Maret</option>
          <option value="Apr">April</option>
          <option value="May" selected>Mei</option>
          <option value="Jun">Juni</option>
          <option value="Jul">Juli</option>
          <option value="Aug">Agustus</option>
          <option value="Sep">September</option>
          <option value="Oct">Oktober</option>
          <option value="Nov">November</option>
          <option value="Dec">Desember</option>
        </select>
      </div>
      <div class="col-3">
        <select class="col form-select" aria-label="Default select example">
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024" selected>2024</option>
        </select>
      </div>
    </div>
      <div
        class="py-2 px-0 rounded-top border border-bottom-0 bg-body-secondary"
      >
        <div class="row fw-semibold">
          <div class="col-1 d-flex justify-content-center">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="checkAll"
            />
          </div>
          <div class="col-1">ID</div>
          <div class="col">Username</div>
          <div class="col-3">Status</div>
          <div class="col">Tanggal</div>
          <div class="col">Total</div>
          <div class="col">Aksi</div>
        </div>
      </div>
      <div class="py-2 px-0 border border-bottom-0">
        <div class="row my-3">
          <div class="col-1 d-flex justify-content-center">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="checkAll"
            />
          </div>
          <div class="col-1">1</div>
          <div class="col">Enzo</div>
          <div class="col-3">
            <span class="badge rounded-pill text-bg-secondary"
              >• Menunggu Konfirmasi</span
            >
          </div>
          <div class="col">10 Jan 2024</div>
          <div class="col">50.000</div>
          <div class="col">
            <Icon icon="ph:dots-three-bold" style="font-size: 26px" />
          </div>
        </div>
        <div class="row my-3">
          <div class="col-1 d-flex justify-content-center">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="checkAll"
            />
          </div>
          <div class="col-1">2</div>
          <div class="col">Malik</div>
          <div class="col-3">
            <span class="badge rounded-pill text-bg-success"
              >• Sedang Dikirm</span
            >
          </div>
          <div class="col">15 Jan 2024</div>
          <div class="col">50.000</div>
          <div class="col">
            <Icon icon="ph:dots-three-bold" style="font-size: 26px" />
          </div>
        </div>
      </div>
      <div class="pt-3 rounded-bottom border border-top-0 bg-body-secondary">
        <div class="row mx-3 text-secondary">
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
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import { Icon } from "@iconify/vue";
import router from "../../router/index.js";
import { ref } from "vue";
</script>

<style scoped>
.header {
  margin-top: 10vh;
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
</style>
