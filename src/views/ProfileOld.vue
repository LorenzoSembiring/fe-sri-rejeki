<template>
  <body class="body">
    <Navbar />
    <div class="container mx-4">
      <div class="row my-5">
        <!-- sidebar -->
        <div class="col-4">
          <div class="p-2 bg-light shadow rounded">
            <div class="p-3 border-bottom">
              <img
                src="@/assets/default_profile_picture.jpg"
                alt="@/assets/default_profile_picture.jpg"
                class="rounded-circle"
                style="max-width: 15%"
              />
              <div class="d-inline mx-3 text">{{ profile.name }}</div>
            </div>
            <div class="m-3 border-bottom">
              <div class="my-2 hov">Biodata</div>
              <div class="my-2 hov">Daftar Alamat</div>
            </div>
            <div class="m-3 border-bottom">
              <div class="my-2 hov">Menunggu Pembayaran</div>
              <div class="my-2 hov">Riwayat Transaksi</div>
            </div>
          </div>
        </div>

        <!-- profile -->
        <div class="col">
          <div class="bg-light shadow rounded">
            <div class="row mx-3 pt-4">
              <div class="text">
                <Icon icon="mdi:account-outline" style="font-size: 24px" />
                {{ profile.name }}
              </div>
            </div>
            <div class="row mx-3 py-4">
              <!-- picture profile -->
              <div class="col-4">
                <div class="border p-4 rounded shadow">
                  <div class="d-flex justify-content-center">
                    <div class="picture rounded"></div>
                  </div>
                  <div class="d-flex justify-content-center">
                    <div class="mt-2" style="font-size: smaller; color: #555">
                      Besar file maksimum 2Mb. Ekstensi file yang diperbolehkan:
                      .JPG .JPEG .PNG
                    </div>
                  </div>
                  <div class="d-flex justify-content-center">
                    <div>
                      <input id="fileUpload" type="file" hidden />
                      <button
                        type="button"
                        class="mt-3 btn btn-primary align-item-center"
                        @click="chooseFiles()"
                      >
                        <Icon
                          icon="mdi:image"
                          class=""
                          style="font-size: 24px"
                        />
                        Ganti foto
                      </button>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button
                    type="button"
                    class="mt-3 btn btn-primary align-item-center"
                  >
                    Ganti kata Sandi
                  </button>
                </div>
              </div>
              <!-- personal info -->
              <div class="col">
                <div class="row text ms-5 mb-2">
                  Informasi Personal
                </div>
                <div class="row">
                  <div class="ms-5 col-3 text">
                    <div class="my-2">Nama</div>
                    <div class="my-2">Username</div>
                    <div class="my-2">Email</div>
                    <div class="my-2">Phone</div>
                  </div>
                  <div class="col text">
                    <div class="my-2">{{ profile.name }}</div>
                    <div class="my-2">{{ profile.username }}</div>
                    <div class="my-2">{{ profile.email }}</div>
                    <div class="my-2">{{ profile.phone }}</div>
                  </div>
                </div>
                <div class="row text-center">
                  <div class="col mt-5">
                    <button class="btn btn-primary">Edit Bio</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { Icon } from "@iconify/vue";

export default {
  components: {
    Navbar,
    Icon,
  },
  data() {
    return {
      profile: {
        name: "Fanny",
        username: "fanny",
        email: "fanny@email.com",
        phone: "081662771",
      },
    };
  },
  methods: {
    chooseFiles() {
      document.getElementById("fileUpload").click();
    },
  },
};
</script>

<style scoped>
.body {
  background-image: url("@/assets/bg-icon-sm.png");
  background-color: rgb(255, 242, 224);
}
.name {
  font-size: 2.5rem;
  font-family: "Plus Jakarta Sans", sans-serif;
}
.picture {
  width: 20vh;
  height: 20vh;
  background-image: url("@/assets/default_profile_picture.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
.text {
  font-weight: 600;
  color: #834c2c;
}

.hov {
  cursor: pointer;
  padding-left: 5px;
  padding-right: 5px;
}
.hov:hover {
  background-color: #f0f3f7;
  /* padding-left: 10px; */
  /* padding-right: 10px; */
  border-radius: 5px;
}
</style>
