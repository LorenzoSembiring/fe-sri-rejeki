<template>
    <body>
        <Navbar />

        <div class="text-container px-5 py-3">
            <div class="text-tag">Koleksi Kami</div>
        </div>

        <product-item class="m-2"
            v-for="product in products"
            :category="product.category"
            :name="product.name"
            :price="product.price"
        />
    </body>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import ProductItem from "@/components/ProductItem.vue";

const products = ref([
    {
        category: "Blangkon Jawa",
        name: "Blangkon Batik Jogja",
        price: "50000",
    },
    {
        category: "Blangkon Jawa",
        name: "Blangkon Batik Solo",
        price: "55000",
    },
    {
        category: "Blangkon Jawa",
        name: "Blangkon Batik Klaten",
        price: "60000",
    },
]);
console.log(products);
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
