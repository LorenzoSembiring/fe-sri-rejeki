<template>
    <body>
        <Navbar />
        <div class="text-container px-5 py-3">
            <div class="text-tag">Koleksi Kami</div>
        </div>
            <product-item class="m-2"
                v-for="product in products"
                :id="product.id"
                :category="product.description"
                :name="product.name"
                :price="product.price"
                />
        <div>
            {{products}}
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
        const response = await axios.get(import.meta.env.VITE_API_URL + "/api/product/get");
        products.value = response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    };

// Fetch posts when the component is mounted
onMounted(
    fetchProduct
);

const prod = ref([
{
          id: 1,
          category: "Blangkon Jawa",
          name: "Blangkon Batik Jogja",
          price: "50",
        },
        {
          id: 2,
          category: "Blangkon Jawa",
          name: "Blangkon Batik Solo",
          price: "55000",
        },
        {
          id: 3,
          category: "Blangkon Jawa",
          name: "Blangkon Batik Klaten",
          price: "60000",
        },
]);
</script>

<style scoped>
.text-container {
    background-color: white;
}
.text-tag {
    color: #c0967b;
    font-size: 2.5rem;
    font-family: "Plus Jakarta Sans", sans-serif;
    font-weight: 600;
}
</style>
