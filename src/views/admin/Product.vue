<template>
  <LayoutDefault route="product">
    <div class="header">
      <div class="col h2 text-header px-4">Produk</div>
    </div>
    <div class="col justify-content-end d-flex px-5">
      <button class="btn button-coklat py-2" @click="routeToAddProductView">
        + Tambah Produk
      </button>
    </div>
    <!-------------------------------------------->
    <div class="mt-4 p-4">
      <div class="py-2 px-0 rounded-top border border-bottom-0 bg-tabel">
        <div class="row fw-semibold m-0">
          <div class="form-check col-1 d-flex align-items-center ms-5">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="checkAll"
            />
          </div>
          <div class="col-5">Produk</div>
          <div class="p-0 col-2">Harga</div>
          <div class="col-1 ms-5 p-0">Aktif</div>
          <div class="col">Aksi</div>
        </div>
      </div>
      <div v-if="status === 200" class="py-2 px-0 border border-bottom-0">
    <div class="row my-3">
      <AdminProductItem 
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :category="product.description"
        :name="product.name"
        :prices="product.price"
        :status="product.status"
      />
    </div>
  </div>
  <div v-else class="justify-content-center d-flex py-2 px-0 border border-bottom-0">
    Tidak ada data
  </div>
      <div class="pt-3 rounded-bottom border border-top-0 bg-tabel">
        <div class="row mx-3 text-secondary">
          <div class="col mt-1">Menampilkan 1-10 dari 20 Produk</div>
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
import AdminProductItem from "@/components/AdminProductItem.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "../../router/index.js";

const products = ref([]);
const status = ref(null);  // Make status reactive

const fetchProduct = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/product/admin-index?page=1&limit=10"
    );
    products.value = response.data.data;
    status.value = response.status;  // Update the reactive status
  } catch (error) {
    console.error("Error fetching products:", error);
    status.value = error.response ? error.response.status : 500;  // Handle the error and set status
  }
};

function routeToAddProductView() {
  router.push("/admin/add-product");
}

onMounted(fetchProduct);
</script>

<style scoped>
.header {
  margin-top: 5vh;
}
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #a77155;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.text-header {
  color: #402218;
}
.bg-tabel {
  background-color: #f0eae8;
}
.form-check-input {
  border: 2px solid rgb(224, 194, 184);
}
.form-check-input:hover {
  border: 2px solid rgb(179, 152, 143);
}
</style>
