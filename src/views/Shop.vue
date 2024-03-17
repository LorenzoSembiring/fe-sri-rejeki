<template>
    <body>
        <Navbar />

        <div class="text-container px-5 py-4">
            <div class="text-tag">Koleksi Kami</div>
        </div>
        <ProductItem category="ooo" name="999" price="50000" />
    </body>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import ProductItem from "@/components/ProductItem.vue";
</script>

<style scoped>
.text-container {
    background-color: black;
}
.text-tag {
    color: #aa7d61;
    font-size: 2.5rem;
    font-family: "Plus Jakarta Sans", sans-serif;
}
</style>
