<template>
  <body>
    <navbar />
    <div class="tagline pt-5 pb-5 px-5">
      <div class="row">
        <div class="pt-5 px-5 col">
          <div class="text">Warisan Budaya</div>
          <div class="text">Pesona Tradisi</div>
          <div type="button" class="btn button-belanja p-3 mt-4 mb-5 ">Belanja Sekarang ></div>
        </div>
        <div class="image col"></div>
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
.tagline {
  background-image: linear-gradient(135deg, #c6a28a 40%, #6d4833);
}
.tagline .text {
  color: white;
  font-size: 3.5rem;
  font-family: "Plus Jakarta Sans", sans-serif;
}
.tagline .button-belanja {
  align-items: center;
  background-color: white;
  border: 0;
  border-radius: 10px;
  box-sizing: border-box;
  color: #aa7d61;
  cursor: pointer;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1;
  max-width: 100%;
}
.button-belanja:hover {
  transform: scale(0.95);

}

.tagline .image {
  width: 35vh;
  height: 7vh;
  background-image: url("@/assets/logo-cropped.png");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
