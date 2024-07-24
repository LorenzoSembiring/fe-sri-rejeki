<template>
  <LayoutDefault route="d3">
    <div class="header">
      <div class="col h2 text-header px-4">3D</div>
    </div>
    <div class="col justify-content-end d-flex px-5">
      <button class="btn button-coklat py-2" @click="routeToAdd3DView">
        + Tambah 3D Objek
      </button>
    </div>
    <div class="bg-light mt-4 p-4">
      <div class="p-4 mb-2 rounded border bg-white row row-gap-3">
        <div class="col-3" v-for="item in mesh">
          <div class="d-inline-block border rounded">
            <div class="m-2 justify-content-center d-flex">
              <View3D
                width="200"
                height="200"
                :mesh="item.path"
                :texture="texture"
              ></View3D>
            </div>
            <div class="my-2 text-center fw-semibold">{{ item.name }}</div>
            <div class="d-flex justify-content-center">
              <div @click="router.push('/admin/edit-3d/' + item.id);" class="pe-3" style="cursor: pointer;">
                <Icon icon="material-symbols:edit" class="text-primary fs-4"/>
              </div>
              <div @click="shareData(item.id, item.name)" style="cursor: pointer;"  data-bs-toggle="modal" data-bs-target="#deleteModal">
                <Icon icon="iconamoon:trash"  class="text-danger fs-4"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"

    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Konfirmasi penghapusan</h1>
          </div>
          <div class="modal-body">Anda yakin ingin menghapus 3D objek {{ dataName }}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn button-putih border"
              data-bs-dismiss="modal"
            >
              Tidak
            </button>
            <button type="button" class="btn button-merah" @click="deleteMesh(dataID)">Ya, Hapus</button>
          </div>
        </div>
      </div>
    </div>  </LayoutDefault>
</template>

<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import View3D from "@/components/View3D.vue";
import router from "../../router/index.js";
import axios from "axios";
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";

const token = localStorage.getItem("token");
const mesh = ref([]);
const dataID = ref("")
const dataName = ref("")
const texture = "/uploads/texture/checker-default.png";

function routeToAdd3DView() {
  router.push("/admin/add-3d");
}

function shareData(id, name) {
  dataID.value = id
  dataName.value = name
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
    mesh.value = response.data.data;
    console.log(mesh.value);
  } catch (error) {
    console.error("Error fetching mesh:", error);
  }
}
async function deleteMesh(id) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/mesh/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    if (response.status == 200) {
      location.reload()
    } else {
      
    }
  } catch (error) {
    
  }
}
onMounted(async () => {
  fetchMesh()
});
</script>

<style scoped>
.header {
  margin-top: 5vh;
}
.text-header {
  color: #402218;
}
.button-coklat {
  border-radius: 8px;
  border-style: none;
  background-color: #a77155;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.button-putih {
  border-radius: 8px;
  border-style: none;
  background-color: #ffffff;
  color: rgb(53, 53, 53);
  font-weight: 600;
}
.button-putih:hover {
  background-color: #ececec;
}
.button-merah {
  border-radius: 8px;
  border-style: none;
  background-color: #d14747;
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.button-merah:hover {
  background-color: #be2020;
}
</style>
