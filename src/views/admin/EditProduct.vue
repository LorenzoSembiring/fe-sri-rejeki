<template>
  <LayoutDefault route="product">
    <div class="header">
      <div class="col h2 text-header px-4">Edit Produk</div>
    </div>
    <div class="bg-light mt-4 p-4">
      <div class="py-1 mb-2 rounded border bg-white px-4">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3">Informasi Produk</div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Nama Produk</div>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="name"
              :placeholder="fetchedData.name"
            />
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Kategori</div>
            <select
              class="form-select"
              aria-label="Default select example"
              id="category"
              v-model="category_id"
            >
              <option value="" selected disabled hidden>
                {{ fetchedData.category }}
              </option>
              <option
                v-for="category in categories"
                :id="category.id"
                :value="category.id"
                :key="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Deskripsi</div>
            <textarea
              class="form-control"
              id="description"
              rows="4"
              v-model="description"
              :placeholder="fetchedData.description"
            ></textarea>
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
                v-model="price"
                class="rounded-end input-item input-price"
                type="text"
                id="price"
                :placeholder="fetchedData.price"
                v-on:focus="setPriceFocus(true)"
                v-on:blur="setPriceFocus(false)"
                style="width: 7rem"
              />
            </div>
          </div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Berat</div>
            <div class="col-1">
              <input
                type="text"
                class="form-control"
                id="weight"
                v-model="weight"
                :placeholder="fetchedData.weight"
              />
            </div>
            <span class="ps-2 pt-1">gram</span>
          </div>
        </div>
      </div>
      <div class="py-1 my-2 rounded border bg-white">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3 px-3">Gambar Produk</div>
          <div class="ms-4 my-4">
            <!-- {{ uploads }} -->
            <div class="row">
              <div
                class="col-lg-2 col-md-3 col-sm-4"
                v-for="(item, index) in uploads"
                :key="index"
              >
                <div @click="triggerPictureInput(index)">
                  <img
                    v-if="
                      item.preview ||
                      (isJsonString(fetchedData?.picture) &&
                        JSON.parse(fetchedData.picture)[index])
                    "
                    class="texture"
                    :src="
                      item.preview ||
                      getFullImageUrl(
                        JSON.parse(fetchedData.picture)[index].path
                      )
                    "
                    alt="Selected Image"
                  />
                  <div v-else class="rounded product-picture p-3 pt-4">
                    <div class="d-flex justify-content-center">
                      <Icon
                        class="text-secondary d-flex justify-contents-center"
                        icon="icon-park-outline:picture"
                        style="font-size: 10vh"
                      />
                    </div>
                    <div
                      class="d-flex justify-content-center text-secondary fw-semibold mt-1"
                    >
                      Foto {{ index + 1 }}
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  :ref="(el) => (pictureInputs[index] = el)"
                  @change="handleFileChange(index)"
                  style="display: none"
                  accept=".png,.jpg,.jpeg"
                />
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
            <button
              v-if="selected3D || fetchedData.mesh"
              class="button-putih py-2 px-3"
              data-bs-toggle="modal"
              data-bs-target="#D3Modal"
            >
              {{ selected3D || fetchedData.mesh }}
            </button>
            <button
              v-else
              class="button-putih py-2 px-3"
              data-bs-toggle="modal"
              data-bs-target="#D3Modal"
            >
              Pilih objek 3D
            </button>
          </div>
          <div class="my-4 d-flex fw-semibold text-grey">
            <div class="col-4 p-0">Tekstur</div>
            <div
              v-if="textureUrl || fetchedData.texture"
              @click="triggerTextureInput"
            >
              <img
                class="texture"
                :src="
                  texture
                    ? textureUrl
                      ? textureUrl
                      : getFullImageUrl(fetchedData.texture)
                    : ''
                "
                alt="Selected Image"
              />
            </div>
            <div
              v-else
              class="rounded p-3"
              @click="triggerTextureInput"
              style="border: 3px dashed #6e6c6b; cursor: pointer"
            >
              <div class="d-flex justify-content-center">
                <Icon
                  class="text-secondary d-flex justify-content-center"
                  icon="icon-park-outline:picture"
                  style="font-size: 7vh"
                />
              </div>
              <div class="d-flex justify-content-center mt-1">
                Pilih Tekstur
              </div>
            </div>
            <input
              type="file"
              ref="textureInput"
              @change="handleTextureChange"
              style="display: none"
              accept=".png,.jpg,.jpeg"
            />
          </div>
        </div>
      </div>
      <div class="py-1 my-2 rounded border bg-white px-3">
        <div class="col">
          <div class="h5 mt-2 border-bottom pb-3">Ukuran</div>
          <div class="my-4 fw-semibold text-grey d-flex">
            <div class="col-4 p-0">Ukuran dan Stok</div>
            <div class="col row">
              <div class="d-flex">
                <div
                  :class="[
                    { focused: isSizeInputFocused },
                    'd-inline fw-semibold rounded-start border-end-0 bg-light section-price px-2',
                  ]"
                >
                  Ukuran
                </div>
                <input
                  class="rounded-end input-item input-price me-2"
                  type="text"
                  id="size"
                  maxlength="3"
                  v-model="size"
                  v-on:focus="setSizeFocus(true)"
                  v-on:blur="setSizeFocus(false)"
                  style="width: 3rem"
                />
                <div
                  :class="[
                    { focused: isStockInputFocused },
                    'd-inline fw-semibold rounded-start border-end-0 bg-light section-price px-2',
                  ]"
                >
                  Stok
                </div>
                <input
                  class="rounded-end input-item input-price"
                  type="text"
                  id="price"
                  maxlength="4"
                  v-model="stock"
                  v-on:focus="setStockFocus(true)"
                  v-on:blur="setStockFocus(false)"
                  style="width: 4rem"
                />
                <button
                  class="button-coklat py-2 px-4 mx-2"
                  @click="addSize(size, stock)"
                >
                  Tambah
                </button>
              </div>
              <div class="row">
                <!-- {{ sizesMatch  }} -->
                <div
                  v-for="(size, key) in sizes"
                  :key="key"
                  class="my-1 fs-5 col-3"
                >
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
                    <div
                      class="cross d-inline-flex badge rounded-circle text-bg-light p-2 ms-2 my-1 border-light d-inline align-items-center fs-5 fw-semibold"
                      @click="deleteSize(key)"
                    >
                      x
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
            Batal
          </button>
          <button class="button-coklat py-2 px-5" @click="submit">
            Simpan
          </button>
        </div>
      </div>
    </div>
    <!-- modal 3D -->
    <div
      class="modal fade"
      id="D3Modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Pilih objek 3D
            </h1>
          </div>
          <div class="modal-body">
            <div
              v-for="item in D3items"
              class="d-inline-block border rounded mx-1"
              :class="{ glow: selected3D === item.id }"
              :id="item.id"
              @click="select3D(item.id)"
            >
              <div class="m-2 justify-content-center d-flex">
                <ModalView3D
                  :width="200"
                  :height="200"
                  :mesh="item.path"
                  :texture="texture"
                ></ModalView3D>
              </div>
              <div class="my-2 text-center fw-semibold">{{ item.name }}</div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn button-putih border"
              data-bs-dismiss="modal"
              @click="selected3D = null"
            >
              Batal
            </button>
            <button
              type="button"
              class="btn button-coklat"
              data-bs-dismiss="modal"
              @click="select3D(item.id)"
            >
              Pilih
            </button>
          </div>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import ModalView3D from "@/components/ModalView3D.vue";
import router from "../../router/index.js";
import { Icon } from "@iconify/vue";
import { ref, computed, reactive, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const token = localStorage.getItem("token");

const isPriceInputFocused = ref(false);
const fetchedData = reactive({
  name: "",
  category: "",
  description: "",
  price: 0,
  weight: 200,
  mesh: "",
  texture: "",
  picture: [],
  sizes: [],
});

const route = useRoute();
const id = ref("");
id.value = route.params.id;
const URL = window.URL;
const size = ref("");
const stock = ref("");
const sizes = ref([]);
const jsonSize = JSON.stringify(sizes.value);
const categories = ref([]);
const pictureInputs = ref([]);
const uploads = ref([
  { file: null, index: 1, preview: "" },
  { file: null, index: 2, preview: "" },
  { file: null, index: 3, preview: "" },
  { file: null, index: 4, preview: "" },
  { file: null, index: 5, preview: "" },
]);
const textureInput = ref(null);
const textureUrl = ref(null);
const selected3D = ref(null);
const D3items = ref([]);
const texture = "/uploads/texture/checker-default.png";
// submited data
const name = ref("");
const description = ref("");
const price = ref("");
const weight = ref("");
const category_id = ref("");
const productId = ref("");
const fetchedSizes = ref([]);

const getFullImageUrl = (path) => {
  return `${import.meta.env.VITE_API_URL}${path}`;
};
function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
const isJsonString = (str) => {
  if (typeof str !== "string") {
    return false;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};
const sizesMatch = computed(() => {
  // Or if using the custom function:
  return isEqual(sizes.value, fetchedSizes.value);
});
async function submit() {
  try {
    const formData = new FormData();

    // Append only if values exist
    if (name.value) formData.append("name", name.value);
    if (description.value) formData.append("description", description.value);
    if (price.value) formData.append("price", price.value);
    if (weight.value) formData.append("weight", weight.value);
    if (category_id.value) formData.append("category_id", category_id.value);
    if (sizes.value.length > 0) formData.append("size", JSON.stringify(sizes.value));
    if (selected3D.value) formData.append("mesh_id", selected3D.value);
    if (textureInput.value.files[0]) formData.append("file", textureInput.value.files[0]);
    // Check for pictures that are new or updated
    for (const upload of uploads.value) {
      if (upload.file) {
        formData.append(`picture_${upload.index}`, upload.file);
      }
    }

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/product/update/${id.value}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      await submitPictures(response.data.data.id);
    } else {
      // Show modal
    }
  } catch (error) {
    console.error("Error storing product:", error);
  }
}


async function submitPictures(productId) {
  try {
    for (let i = 0; i < uploads.value.length; i++) {
      if (uploads.value[i].file) {
        const existingPictures = JSON.parse(fetchedData.picture);
        const existingPicture = existingPictures.find(picture => picture.index === uploads.index);
        console.log(existingPicture)
        const formData = new FormData();
        formData.append("file", uploads.value[i].file);
        formData.append("product_id", productId);
        formData.append("index", uploads.value[i].index);

        if (existingPicture) {          
          const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/product/picture/update/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
      }
        else {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/product/picture/store/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        }
        
        if (i + 1 == smallestIndexWithoutFile.value && response.status == 200) {
          router.push("/admin/product");
        }
      }
    }
  } catch (error) {
    console.error("Error updating pictures:", error);
  }
}

function back() {
  router.push("/admin/product");
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
    console.log(response.data.data.name);
    fetchedData.name = response.data.data.name;
    fetchedData.category = response.data.data.category;
    fetchedData.description = response.data.data.description;
    fetchedData.price = response.data.data.price;
    fetchedData.weight = response.data.data.weight;
    fetchedData.mesh = response.data.data.mesh_id;
    fetchedData.texture = response.data.data.texture;
    fetchedData.picture = response.data.data.pictures;
    fetchedData.sizes = JSON.parse(response.data.data.sizes);
    // sizes.value = JSON.parse(fetchProductData.value.sizes)
    const parsedSizes = JSON.parse(response.data.data.sizes);
    fetchedSizes.value = parsedSizes;
    sizes.value = parsedSizes;
    console.log(fetchedData)
  } catch (error) {
    console.log("Error fetching product:", error);
  }
}

async function fetchCategory() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/category/get"
    );
    categories.value = response.data.data.data;
  } catch (error) {
    console.log("Error fetching categories:", error);
    console.log("error");
  }
}
async function fetchMesh() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/mesh/index",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    D3items.value = response.data.data;
  } catch (error) {
    console.error("Error fetching mesh:", error);
  }
}

const smallestIndexWithoutFile = computed(() => {
  return uploads.value.findIndex((item) => !item.preview);
});

const triggerPictureInput = (index) => {
  pictureInputs.value[index].click();
  console.log(smallestIndexWithoutFile);
};

const triggerTextureInput = () => {
  textureInput.value.click();
};

// Function to handle file selection
const handleFileChange = (index) => {
  const files = pictureInputs.value[index].files;
  if (files.length) {
    const file = files[0];
    uploads.value[index].file = file;
    // Revoke the old object URL to avoid memory leaks
    if (uploads.value[index].preview) {
      URL.revokeObjectURL(uploads.value[index].preview);
    }
    uploads.value[index].preview = URL.createObjectURL(file);
    // Ensure reactivity
    uploads.value = [...uploads.value];
    console.log("File changed for index:", index, uploads.value);
  } else {
    console.log("No file selected for index:", index);
  }
};

const handleTextureChange = () => {
  const selectedTexture = textureInput.value.files[0];
  if (selectedTexture) {
    // console.log(selectedTexture)
    textureUrl.value = URL.createObjectURL(selectedTexture);
  }
};

const deleteSize = (key) => {
  sizes.value = sizes.value.filter((_, index) => index !== key);
};

function addSize(size, stock) {
  if (!size || !stock) {
    alert("Ukuran dan stok tidak boleh kosong");
    return;
  }
  const sizeExists = sizes.value.some((item) => item.size === size);
  if (sizeExists) {
    alert("Ukuran telah ada");
  } else {
    sizes.value.push({ size: size, stock: stock });
  }
}

const setPriceFocus = (value) => {
  isPriceInputFocused.value = value;
};
const isSizeInputFocused = ref(false);

const setSizeFocus = (value) => {
  isSizeInputFocused.value = value;
};
const isStockInputFocused = ref(false);

const setStockFocus = (value) => {
  isStockInputFocused.value = value;
};

function select3D(id) {
  if (selected3D.value === id) {
    selected3D.value = null;
  } else {
    selected3D.value = id;
  }
}

onMounted(() => {
  fetchProduct();
});

fetchCategory();
fetchMesh();
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
