<template>
    <body>
        <Navbar />
        <div class="text-container px-5 py-3">
            <div class="text-tag">Koleksi Kami</div>
        </div>
        <div class="d-flex row mx-0">

                <product-item class="m-2 card-product"
                    v-for="product in products"
                    :id="product.id"
                    :category="product.category"
                    :categoryId="product.category_id"
                    :name="product.name"
                    :price="product.price"
                    :picture="product.picture"
                    />
        </div>
    </body>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import ProductItem from "@/components/ProductItem.vue";
import axios from "axios";

const products = ref([]);

const fetchProduct = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/api/product/index?page=1&limit=10");
        products.value = response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Fetch posts when the component is mounted
onMounted(
    fetchProduct
);
</script>

<style scoped>
.text-container {
    background-color: white;
}
.text-tag {
    color: #803a0d;
    font-size: 2.5rem;
    font-family: "Plus Jakarta Sans", sans-serif;
    font-weight: 600;
}
.card-product{
    height: 322px;
}
</style>
