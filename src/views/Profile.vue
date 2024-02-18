<template>
  <body>
    <Navbar />
    <div class="container mx-4">
      <div class="row my-5">
        <!-- sidebar -->
        <div class="col-4">
          <div class="bg-success shadow rounded">
            <div class="mx-3">Sidebar</div>
          </div>
        </div>

        <!-- profile -->
        <div class="col">
          <div class="bg-success shadow rounded">
            <div class="row mx-3 py-4">
              <div class="col-3">
                <div class="justify-content-center picture rounded"></div>
                <div class="d-flex justify-content-center">
                  <button type="button" class="mt-3 btn btn-primary align-item-center">Ganti foto</button>
                </div>
              </div>
              <div class="col-3 text-light">
                <div>Nama:</div>
                <div>Username:</div>
                <div>email:</div>
                <div>phone:</div>
              </div>
              <div class="col text-light">
                <div>Malika</div>
                <div>Malika 12</div>
                <div>malika@admin.com</div>
                <div>081234567890</div>
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
export default {
  components: {
    Navbar,
  },
};
</script>

<style>
.container {
}
.header .name {
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
</style>
