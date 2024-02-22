<template>
  <body class="body">
    <Navbar />
    <div class="container mx-4">
      <div class="row my-5">
        <!-- sidebar -->
        <div class="col-4">
          <div class="p-2 bg-light shadow rounded">
            <div class="p-3 border-bottom">
              <img src="@/assets/default_profile_picture.jpg" alt="@/assets/default_profile_picture.jpg" class="rounded-circle" style="max-width: 15%;">
              <div class=" d-inline mx-3 text">Malika</div>
            </div>
            <div class="m-3 border-bottom">
              <div class="my-2">Biodata</div>
              <div class="my-2">Daftar Alamat</div>
            </div>
            <div class="m-3 border-bottom">
              <div class="my-2">Menunggu Pembayaran</div>
              <div class="my-2">Riwayat Transaksi</div>
            </div>
          </div>
        </div>

        <!-- profile -->
        <div class="col">
          <div class="bg-light shadow rounded">
            <div class="row mx-3 py-4">
              <div class="col-4 border p-4 rounded shadow">
                <!-- picture profile -->
                <div class="d-flex justify-content-center">
                  <div class=" picture rounded"></div>
                </div>
                <div class="d-flex justify-content-center">
                  <div class="mt-2" style="font-size: smaller; color: #555;">Besar file maksimum 2Mb. Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</div>

                </div>
                <div class="d-flex justify-content-center">
                  <button type="button" class="mt-3 btn btn-primary align-item-center">
                    <Icon icon="mdi:image" class="" style="font-size: 24px ;" /> Ganti foto</button>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="button" class="mt-3 btn btn-primary align-item-center">Ganti kata Sandi</button>                  
                </div>
              </div>
              <div class="ms-5 col-3 text">
                <div class="my-2">Nama:</div>
                <div class="my-2">Username:</div>
                <div class="my-2">email:</div>
                <div class="my-2">phone:</div>
              </div>
              <div class="col text">
                <div class="my-2">Malika</div>
                <div class="my-2">Malika 12</div>
                <div class="my-2">malika@admin.com</div>
                <div class="my-2">081234567890</div>
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
    Icon
  },
};
</script>

<style scoped>
.body {
  background-image: url("@/assets/bg-icon-sm.png") ;
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
</style>
