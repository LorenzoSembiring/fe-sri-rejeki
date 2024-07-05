<template>
  <body>
    <navbar />
    <div class="tagline pt-5 pb-5 ps-5">
      <div class="row m-0">
        <div class="pe-5 text-end col" style="padding-top: 20vh;">
          <div class="text">Warisan Budaya</div>
          <div class="text">Pesona Tradisi</div>
          <a class="btn button-belanja p-3 mt-4 mb-5" href="/shop"
            >Belanja Sekarang</a
          >
        </div>
        <!-- <div class="m-0 p-0 d-flex flex-row-reverse col">
          <div>a</div>
          <div>a</div>
        </div> -->
      </div>
    </div>
    <div class="my-5 split justify-content-center d-flex fs-2">PRODUK KAMI</div>
    <div class="row m-0 px-5">
      <div class="d-inline-flex col-4 justify-content-center d-flex">
        <div class="product-card border">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Ngayogyakarta-style_blangkon%2C_2015-05-17_04.jpg/800px-Ngayogyakarta-style_blangkon%2C_2015-05-17_04.jpg" style="width: 50vh;" alt="">
          <div class="fw-semibol fs-4" style="font-family: 'Inter', sans-serif;">Blangkon Jogja</div>
        </div>
      </div>
      <div class="d-inline-flex col-4 justify-content-center d-flex">
        <div class="product-card border">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Ngayogyakarta-style_blangkon%2C_2015-05-17_04.jpg/800px-Ngayogyakarta-style_blangkon%2C_2015-05-17_04.jpg" style="width: 50vh;" alt="">
        </div>
      </div>
      <div class="d-inline-flex col-4 justify-content-center d-flex">
        <div class="product-card border">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Ngayogyakarta-style_blangkon%2C_2015-05-17_04.jpg/800px-Ngayogyakarta-style_blangkon%2C_2015-05-17_04.jpg" style="width: 50vh;" alt="">
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
.tagline {
  background-image: url("@/assets/hero3.jpg");
  background-size: cover;
  width:100%;
  height:100vh;
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
  box-sizing: border-box;
  color: rgb(105, 75, 58);
  cursor: pointer;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1;
  max-width: 100%;
}
.button-belanja:hover {
  transform: scale(0.98);
}
.tagline .image {
  /* width: 1vh; */
  /* height: 100vh; */
  margin-left: vh;
  background-image: url("@/assets/e011fd6eff94052cdfab87ca7f2492258504836e_s2_n2_y1.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.split {
  font-family: "Plus Jakarta Sans", sans-serif;
}
.product-card {

}
</style>
