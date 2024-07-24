<template>
    <LayoutDefault route="d3">
      <div class="header">
        <div class="col h2 text-header px-4">Edit Mesh 3D</div>
      </div>
      <div class="bg-light mt-4 p-4">
        <div class="p-4 mb-2 rounded border bg-white">
          <div
            class="d-flex align-items-center row fw-semibold p-2"
            style="font-size: 1rem"
          >
            <div class="my-4 fw-semibold text-grey d-flex">
              <div class="col-4 p-0">Nama Mesh 3D</div>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="nameMesh"
              />
            </div>
            <div class="my-4 fw-semibold text-grey d-flex">
              <div class="col-4 p-0">Mesh 3D</div>
              <input
                type="file"
                ref="meshInput"
                @change="handleMeshChange"
                style="display: none"
                accept=".glTF,.obj,.fbx,.glb"
              />
              <div
                class="rounded p-4"
                style="border: 3px dashed #6e6c6b; cursor: pointer"
                @click="triggerMeshInput"
              >
                <div class="d-flex justify-content-center">
                  <Icon
                    class="text-secondary d-flex justify-content-center"
                    icon="iconoir:3d-select-solid"
                    style="font-size: 7vh"
                  />
                </div>
                <div v-if="meshUrl" class="d-flex justify-content-center mt-1">
                  {{ meshName }}
                </div>
                <div v-else class="d-flex justify-content-center mt-1">
                  Pilih Mesh
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button class="button-putih py-2 px-5 mx-4" @click="back">
              Batal
            </button>
            <button class="button-coklat py-2 px-5" @click="submit">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </LayoutDefault>
  </template>
  
  <script setup>
  import LayoutDefault from "@/components/LayoutDefault.vue";
  import { Icon } from "@iconify/vue";
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import router from "../../router/index.js";
  import { useRoute } from "vue-router";

  const route = useRoute();

  // Declare reactive variables
  const meshInput = ref(null);
  const meshUrl = ref(null);
  const meshName = ref("");
  const nameMesh = ref("");
  const token = localStorage.getItem("token");
  const id = ref("");

  onMounted(() => {
    id.value = route.params.id;
    getMesh();
  })
  // Function to trigger file input click
  const triggerMeshInput = () => {
    meshInput.value.click();
  };
  
  // Function to handle mesh file change
  function handleMeshChange() {
    const selectedMesh = meshInput.value.files[0];
    if (selectedMesh) {
      meshName.value = selectedMesh.name;
      meshUrl.value = URL.createObjectURL(selectedMesh); 
    }
  }
  
  // Function to submit the form
  async function submit() {
  const formData = new FormData();

  if (nameMesh.value) {
    formData.append("name", nameMesh.value);
  }

  if (meshInput.value.files.length) {
    formData.append("file", meshInput.value.files[0]);
  }

  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/mesh/update/${id.value}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.status);

    if (response.status === 200) {
      router.push("/admin/3D");
    } else {
      // show modal
    }
  } catch (error) {
    console.error("Error storing file:", error);
  }
}

  async function getMesh() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/mesh/get/${id.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      nameMesh.value = response.data.data.name
      console.log(response.data)
    } catch (error) {
      console.log("Error fetch data:", error);
    }
  }
  function back() {
    router.back()
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
  .form-control:focus {
    box-shadow: none;
  }
  input:focus {
    border: 1px solid #b88e76;
  }
  </style>
  