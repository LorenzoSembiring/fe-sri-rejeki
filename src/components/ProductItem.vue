<template>
    <div class="rounded col-2 d-inline-block content border">
        <RouterLink :to="'/product/' + id">    
            <div class="d-inline">
                <div class="img-fluid my-2" style="text-align: center">
                    <img
                        class="justify-center"
                        src="@/assets/default_profile_picture.jpg"
                        alt=""
                    />
                </div>
            </div>
        </RouterLink>
        <RouterLink :to="'/shop/'">
            <div class="mx-4 text-dark kategori">{{ category }}</div>
        </RouterLink>
        <RouterLink :to="'/product/' + id">
            <div class="mx-4 text-dark fs-5">{{ name }}</div>
        </RouterLink >
        <div class="mx-4 mb-3 harga fw-bold">{{ formatToIDR(price) }}</div>
    </div>
</template>

<script setup>
defineProps({
    id: Number,
    category: String,
    name: String,
    price: Number,
});

function formatToIDR(number) {
    return number.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
    });
}
</script>

<style>
.content {
    width: 250px;
}

a {
    text-decoration: none;
}

</style>
