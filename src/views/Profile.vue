<template>
  <Navbar class="fixed-top" />
  <div class="row mt-5 pt-5">
    <div class="col-3">
      <div class="ms-5 border rounded px-3">
        <div class="px-2 pe-3 my-3 border-bottom">
          <div
            class="d-flex ms-1 border-profile rounded-pill row mt-auto mb-2"
            style="height: 9vh; width: 100%"
          >
            <div class="col-3 align-items-center p-1">
              <img
                class="rounded-circle profile-picture"
                style="height: 7vh; width: 7vh"
                :src="profilePicture"
              />
            </div>
            <div
              class="text-brown fw-semibold d-flex align-items-center col"
              style="height: 100%"
            >
              {{ username }}
            </div>
          </div>
        </div>
        <div class="px-3 py-2 border-bottom">
          <div class="py-2 sidebar-list">Biodata</div>
          <div
            @click="router.push('/profile/address')"
            class="py-2 sidebar-list"
          >
            Daftar Alamat
          </div>
        </div>
        <div class="px-3 pt-2 pb-4">
          <div
            @click="router.push('/profile/waiting-payment')"
            class="py-2 sidebar-list"
          >
            Menunggu Pembayaran
          </div>
          <div
            @click="router.push('/profile/transaction-history')"
            class="py-2 sidebar-list"
          >
            Riwayat Transaksi
          </div>
        </div>
      </div>
    </div>
    <div class="col pt-4 summary-col">
      <div class="row">
        <div class="col-4 border-end">
          <div class="d-flex ps-5">
            <Icon
              class="text-secondary"
              icon="mdi:account-outline"
              style="font-size: 24px"
            />
            <p class="text-secondary fw-bold">{{ username }}</p>
          </div>
          <div class="d-flex justify-content-center">
            <div class=" image-container">
              <img :src="profilePicture" class="square-image" />
            </div>
          </div>
          <div class="px-5 mx-3" style="font-size: smaller; color: #555">
            Besar file maksimum 2Mb. Ekstensi file yang diperbolehkan: .JPG
            .JPEG .PNG
          </div>
          <div class="mt-3 d-flex justify-content-center">
            <input
              type="file"
              ref="fileInput"
              @change="onFileChange"
              style="display: none"
            />
            <button class="btn button-foto border" @click="triggerFileInput">
              <Icon icon="mdi:image" class="" style="font-size: 24px" /> Ubah
              foto
            </button>
          </div>
        </div>
        <div class="col ps-4">
          <div class="row">
            <div class="fw-semibold">Biodata Diri</div>
            <div class="col-4">
              <div class="my-2">Nama</div>
              <div class="my-2">Username</div>
              <div class="my-2">Email</div>
              <div class="my-2">Nomor Telpon</div>
            </div>
            <div class="col">
              <div class="my-2">{{ users.first_name }}</div>
              <div class="my-2">{{ users.username }}</div>
              <div class="my-2">{{ users.email }}</div>
              <div class="my-2">{{ users.phone }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- modal -->
  <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="successModalLabel">Berhasil</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Foto berhasil diperbarui
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="reload()">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { Icon } from "@iconify/vue";
import { ref, computed, onMounted } from "vue";
import router from "../router/index.js";
import axios from "axios";
import defaultProfilePicture from "@/assets/default_profile_picture.jpg";

const token = localStorage.getItem("token");
const users = ref([""]);
const picture = ref([""]);
const username = localStorage.name ?? null;
const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const onFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await updatePicture(file);
  }
};

const updatePicture = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/user/update-picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status === 200) {
      openModal();
    }
  } catch (error) {
    console.log('Error updating picture:', error);
  }
};
const openModal = () => {
  const modal = new bootstrap.Modal(document.getElementById("successModal"));
  modal.show();
};

// Ensure users.value.picture is a string URL or get the correct property from the object
const profilePicture = computed(() => {
  return picture.value.slice(-4) === 'null'
    ? defaultProfilePicture
    : "http://" + picture.value;
});

async function fetchUser() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/auth/get/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    users.value = response.data.data;
    console.log(users.value);
  } catch (error) {
    console.log("Error fetching user:", error);
  }
}
async function fetchUserPicture() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/user/get-picture",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    picture.value = response.data.data;
    console.log(users.value);
  } catch (error) {
    console.log("Error fetching picture:", error);
  }
}
const reload = () => {
  location.reload();
};
fetchUser();
fetchUserPicture();
</script>

<style scoped>
.sidebar-list {
  cursor: pointer;
  padding-left: 5px;
  padding-right: 5px;
}
.sidebar-list:hover {
  background-color: #f7f5f0;
  border-radius: 1px;
  font-weight: 500;
}
.button-foto {
  align-items: center;
  background-color: white;
  color: rgb(105, 75, 58);
  cursor: pointer;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  max-width: 100%;
}
.button-foto:hover {
  background-color: #fffaf8;
  color: #694b3a;
  transform: scale(0.98);
}
.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.image-container {
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
}

.square-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* This ensures the image covers the container */
}
</style>
