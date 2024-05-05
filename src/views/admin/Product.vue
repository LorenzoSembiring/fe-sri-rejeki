<template>
	<div class="row">
		<AdminSidebar />
		<div class="col">
			<div class="row header">
				<div class="col h2 text-header ms-3">Daftar Produk</div>
				<div class="col d-flex flex-row-reverse">
					<button class="btn button-coklat"><Icon style="font-size: 25" icon="iconamoon:category-duotone" /></button>
				</div>
				<div class="col-4">
					<div class="border-start ps-3">
						<button class="btn button-coklat py-2">+ Tambah Produk</button>
					</div>
				</div>
			</div>
			<div class="row bg-light mt-4">
				<div class="py-1 my-5 ms-4 rounded border bg-white table">
					<AdminProductItem/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminProductItem from "@/components/AdminProductItem.vue";
import { Icon } from "@iconify/vue";

</script>

<style scoped>
.header {
	margin-top: 10vh;
	
}
.button-coklat {
	border-radius: 8px;
	border-style:none;
	background-color: #D7B19D;
	color: rgb(255, 255, 255);
	font-weight: 600;
}
.text-header {
	color: #402218;
}
</style>
