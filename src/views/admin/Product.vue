<template>
  <AdminSidebar>
    <div class="col-lg-10">
      <div class="row header">
        <div class="col h2 text-header ms-3">Daftar Produk</div>
        <div class="col d-flex flex-row-reverse">
          <button class="btn button-coklat">
            <Icon style="font-size: 25" icon="iconamoon:category-duotone" />
          </button>
        </div>
        <div class="col-4">
          <div class="border-start ps-3">
            <button class="btn button-coklat py-2">+ Tambah Produk</button>
          </div>
        </div>
      </div>
      <div class="row bg-light mt-4" >
        <div class="py-1 my-5 ms-4 rounded border bg-white table">
          <AdminProductItem 
		  v-for="product in products"
                :id="product.id"
                :category="product.description"
                :name="product.name"
                :price="product.price"
				:status="product.status"
		  />
        </div>
      </div>
    </div>
  </AdminSidebar>
</template>

<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminProductItem from "@/components/AdminProductItem.vue";
import { Icon } from "@iconify/vue";
import { ref, onMounted } from 'vue';
import axios from "axios";

const products = ref([])

const fetchProduct = async () => {
	try{
		const response = await axios.get(import.meta.env.VITE_API_URL + "/api/product/index?page=1&limit=10");
        products.value = response.data.data;
	} catch {
		console.error('Error fetching products:', error);
	}
}

onMounted(
    fetchProduct
);

</script>

<style scoped>
.header {
  margin-top: 10vh;
}
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #d7b19d;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.text-header {
  color: #402218;
}
</style>
