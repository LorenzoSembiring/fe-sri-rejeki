<template>
  <LayoutDefault route="product">
    <div class="header">
      <div class="col h2 text-header px-4">Detail Produk</div>
    </div>
    <div class="bg-light mt-4 p-4">
      <div class="py-1 mb-2 rounded border bg-white px-4">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3">Informasi Produk</div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Nama Produk</div>
            <div>{{ name }}</div>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Kategori</div>
            <div>{{ category }}</div>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Deskripsi</div>
            <div v-html="description" ></div>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Harga</div>
            <div class="d-flex">
              <div
                :class="[
                  { focused: isPriceInputFocused },
                  'd-inline fw-semibold rounded-start border-end-0 bg-light section-price px-2',
                ]"
              >
                Rp
              </div>
              <input
                :placeholder="toIDR(price)"
                disabled
                class="rounded-end input-item input-price"
                type="text"
                id="price"
                style="width: 7rem"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="py-1 my-2 rounded border bg-white">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3 px-3">Gambar Produk</div>
          <div class="ms-4 my-4">
            <div class="row">
              <div
                class="col-lg-2 col-md-3 col-sm-4"
                v-for="(item, index) in picture"
                :key="index"
              >
                <div>
                  <img
                    class="texture"
                    :src="getFullImageUrl(item.path)"
                    alt="Selected Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="py-1 my-2 rounded border bg-white px-3">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3">3D</div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Objek 3D</div>
            <View3D :height="250" :width="250" :mesh="meshData.path" :texture="meshData.texture" v-if="meshData" />
          </div>
          <div class="my-4 d-flex fw-semibold text-grey">
            <div class="col-4 p-0">Tekstur</div>
            <div>
              <img class="texture" :src="getFullImageUrl(texture)" alt="Selected Image" />
            </div>
          </div>
        </div>
      </div>
      <div class="py-1 my-2 rounded border bg-white px-3">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3">Ukuran</div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 py-3">Ukuran dan Stok</div>
            <div class="col row">
              <div class="row">
                <div v-for="(size, key) in sizes" class="fs-5 col-3">
                  <div
                    class="d-inline-flex badge rounded border text-bg-light mt-2"
                  >
                    <div class="d-block fw-semibold">
                      <div class="d-flex justify-content-start my-1">
                        Ukuran: {{ size.size }}
                      </div>
                      <div class="d-flex justify-content-start my-1">
                        Stok: {{ size.stock }}
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="d-flex justify-content-end my-5">
          <button class="button-putih py-2 px-5 mx-4" @click="back">
            kembali
          </button>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import View3D from "@/components/View3D.vue";
import router from "../../router/index.js";
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const route = useRoute();

const id = ref("")
onMounted(() => {
  id.value = route.params.id;
  fetchProduct();
  fetchMesh()
});

const token = localStorage.getItem("token");

const sizes = ref([]);
const category = ref();
const picture = ref([]);
// submited data
const fetchProductData = ref({})
const name = ref("")
const texture = ref("");
const description = ref("")
const price = ref("")
const mesh = ref("")

const meshData = ref(null);

async function fetchMesh() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/mesh/get-product/" + id.value
    );
    meshData.value = response.data.data;
  } catch (error) {
    console.log("Error fetching mesh:", error);
  }
}

async function fetchProduct() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/product/admin-get/" + id.value,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchProductData.value = response.data.data;

    sizes.value = JSON.parse(fetchProductData.value.sizes)
    picture.value = JSON.parse(fetchProductData.value.pictures)
    name.value = fetchProductData.value.name
    texture.value = fetchProductData.value.texture
    price.value = fetchProductData.value.price
    category.value = fetchProductData.value.category
    mesh.value = fetchProductData.value.mesh
    description.value = fetchProductData.value.description
    console.log(picture.value);
    console.log(fetchProductData.value);
  } catch (error) {
    console.log("Error fetching product:", error);
  }
}

const getFullImageUrl = (path) => {
  return `${import.meta.env.VITE_API_URL}${path}`;
};

function toIDR(amount) {
  amount = parseInt(amount, 10);
  if (isNaN(amount)) {
    return "Invalid input.";
  }
  let idr = amount.toLocaleString("id-ID");
  // Add "Rp." prefix
  idr = idr.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return idr;
}

function back() {
  router.push("/admin/product");
}

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
.text-grey {
  color: #525252;
}
.button-putih {
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  color: rgb(53, 53, 53);
  font-weight: 600;
}
.input-item {
  padding-left: 1rem;
  border: 1px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}
input:focus {
  border: 1px solid #b88e76;
}
.input-price {
  border-left: none;
}
.input-price:focus {
  border-left: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.section-price {
  border: 1px solid #ccc;
  padding-top: 1px;
  padding-bottom: 2px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.focused {
  border: 1px solid #b88e76;
}
.form-control:focus {
  box-shadow: none;
}
textarea {
  resize: none;
}
.form-select:focus {
  box-shadow: none;
}
select:focus {
  border: 1px solid #b88e76;
}
textarea:focus {
  border: 1px solid #b88e76;
}
.product-picture {
  border: 3px dashed #6e6c6b;
  cursor: pointer;
  /* width: 15vw; */
  /* max-width: 15vw; */
  aspect-ratio: 1/1;
}
.section-price {
  padding-top: 9px;
  padding-bottom: 10px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
input:focus {
  border: 1px solid #b88e76;
}
.input-price {
  border-left: none;
}
.input-price:focus {
  border-left: none;
}
.cross {
  width: 20px;
  cursor: pointer;
  aspect-ratio: 1;
}
.glow {
  box-shadow: 0 0 10px rgba(48, 62, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.8);
}
.texture {
  width: 25vh;
  height: 25vh;
  object-fit: cover;
}
</style>
