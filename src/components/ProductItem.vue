<template>
    <div class="rounded col-2 content border">
        <div class="d-inline">
            <div class="img-fluid my-2" style="text-align: center">
                <img
                    class="justify-center"
                    src="@/assets/default_profile_picture.jpg"
                    alt=""
                />
            </div>
        </div>
        <div class="mx-3 kategori">{{ category }}</div>
        <div class="mx-3 nama fs-5">{{ name }}</div>
        <div class="mx-3 mb-3 harga fw-bold">{{ formatToIDR(price) }}</div>
    </div>
</template>

<script setup>
defineProps({
    category: String,
    name: String,
    price: Number,
});

function formatToIDR(str) {
    const number = parseFloat(str.replace(/[^\d.-]/g, ""));

    if (isNaN(number)) {
        return "Invalid input";
    }

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
</style>
