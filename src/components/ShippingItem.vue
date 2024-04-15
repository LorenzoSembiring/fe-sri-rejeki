<template>
    <div class="ms-5 mt-3 p-2 border rounded">
        <div class="row">
          <div class="col-2">
            <img
              class="m-2 rounded"
              src="@/assets/default_profile_picture.jpg"
              alt=""
            />
          </div>
          <div class="col-7 ms-3">
            <div class="row h5">Blangkon Jawa Tengah</div>
            <div class="row">Ukuran: 9</div>
            <div class="row">
              <div class="dropdown " style="padding-left: 0;">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >Pilih Pengiriman
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col text-end me-2 h5">1 x Rp50.000</div>
        </div>
      </div>
</template>

<script setup>

</script>

<style scoped>
img {
  width: 90px;
}
</style>