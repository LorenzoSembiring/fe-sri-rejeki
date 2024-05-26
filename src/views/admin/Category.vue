<template>
  <LayoutDefault route="category">
    <div class="header">
      <div class="col h2 text-header px-4">Kategori</div>
    </div>
    <div class="col justify-content-end d-flex px-5">
      <button class="btn button-coklat py-2" @click="routeToAddCategoryView">
        + Tambah Kategori
      </button>
    </div>
    <div class="mt-4 p-4">
      <div class="py-2 px-0 rounded-top border border-bottom-0 bg-tabel">
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
          <div class="col-7">Kategori</div>
          <div class="col">Aksi</div>
        </div>
      </div>
      <div class="py-2 px-0 border border-bottom-0">
        <div class="row my-3" v-for="item in items">
          <div class="col-1 d-flex justify-content-center">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="checkAll"
            />
          </div>
          <div class="col-1">{{ item.id }}</div>
          <div class="col-7">{{ item.name }}</div>
          <div class="col">
            <button
              type="button"
              class="btn button-putih border px-3 py-1 me-2"
              @click="edit(item.id)"
            >
              Edit
            </button>
            <button type="button" class="btn button-merah border px-3 py-1" data-bs-toggle="modal" data-bs-target="#deleteModal">
              Hapus
            </button>
          </div>
        </div>
      </div>
      <div class="pt-3 rounded-bottom border border-top-0 bg-tabel">
        <div class="row mx-3 text-secondary">
          <div class="col mt-1">Menampilkan 1-10 dari 20 Kategori</div>
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
    <!-- Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Konfirmasi penghapusan</h1>
          </div>
          <div class="modal-body">Anda yakin ingin menghapus kategori ...?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn button-putih border"
              data-bs-dismiss="modal"
            >
              Tidak
            </button>
            <button type="button" class="btn button-merah">Ya, Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import router from "../../router/index.js";
import { ref, onMounted } from "vue";
import axios from "axios";

const items = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + "/api/category/get");
    items.value = response.data.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});

function routeToAddCategoryView() {
  router.push("/admin/add-category");
}

function edit(id) {
  router.push("/admin/edit-category/" + id);
}
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
.button-putih {
  border-radius: 8px;
  border-style: none;
  background-color: #ffffff;
  color: rgb(53, 53, 53);
  font-weight: 600;
}
.button-putih:hover {
  background-color: #ececec;
}
.button-merah {
  border-radius: 8px;
  border-style: none;
  background-color: #d14747;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.button-merah:hover {
  background-color: #be2020;
}
.bg-tabel {
  background-color: #f0eae8;
}
</style>
