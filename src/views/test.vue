<template>
  <div class="row">
    <div
      class="col-lg-2 col-md-3 col-sm-4"
      v-for="(item, index) in uploads"
      :key="index"
    >
      <div @click="triggerPictureInput(index)">
        <img
          v-if="item.preview"
          class="texture"
          :src="item.preview"
          alt="Selected Image"
        />
        <div
          v-else
          class="rounded product-picture p-3 pt-4"
        >
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
  <button @click="submit">Submit</button>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { Icon } from '@iconify/vue';

const token = 'your-token-here';  // Replace with actual token
const pictureInputs = ref([]);
const uploads = ref([
  { file: null, index: 1, preview: '' },
  { file: null, index: 2, preview: '' },
  { file: null, index: 3, preview: '' },
  { file: null, index: 4, preview: '' },
  { file: null, index: 5, preview: '' },
]);

const name = ref('');
const description = ref('');
const price = ref('');
const weight = ref('');
const category_id = ref('');
const sizes = ref([]);
const selected3D = ref('');
const textureInput = ref(null);

const triggerPictureInput = (index) => {
  console.log('Picture div clicked, triggering input for index:', index);
  if (pictureInputs.value[index]) {
    pictureInputs.value[index].click();
  } else {
    console.error('File input not found for index:', index);
  }
};

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
    console.log('File changed for index:', index, uploads.value);
  } else {
    console.log('No file selected for index:', index);
  }
};

async function submit() {
  try {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("weight", weight.value);
    formData.append("category_id", category_id.value);
    formData.append("size", JSON.stringify(sizes.value));
    formData.append("mesh_id", selected3D.value);
    formData.append("file", textureInput.value.files[0]);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/product/store/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 201) {
      await submitPictures(response.data.data.id);
    } else {
      // show modal
    }
  } catch (error) {
    console.error("Error storing product:", error);
  }
}

async function submitPictures(productId) {
  try {
    for (let i = 0; i < uploads.value.length; i++) {
      if (uploads.value[i].file) {
        const formData = new FormData();
        formData.append('file', uploads.value[i].file);
        formData.append('product_id', productId);
        formData.append('index', uploads.value[i].index);

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/pictures/store/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log("Picture upload response:", response.data);
      }
    }
  } catch (error) {
    console.error("Error storing pictures:", error);
  }
}
</script>

<style>
.texture {
  width: 100%;
  height: auto;
}
.product-picture {
  cursor: pointer;
  border: 1px dashed #ccc;
}
</style>
