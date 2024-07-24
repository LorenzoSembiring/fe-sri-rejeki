<template>
  <body>
    <navbar />
    <div class="tagline pt-5 pb-5 ps-5">
      <div class="row m-0">
        <div class="pe-5 text-end col" style="padding-top: 10vh;">
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
    <div id="about" class="m-5 split justify-content-center d-flex fs-2 border-top border-2">
      TENTANG KAMI
    </div>
    <div class="container my-5">
      <p class="fw-semibold fs-4">Selamat datang di Sri Rejeki</p>
      <p>
        Kami adalah toko online yang khusus menyediakan berbagai macam blangkon, penutup kepala tradisional khas Jawa yang penuh makna dan sejarah. Dengan menggabungkan tradisi dan gaya modern, kami menawarkan koleksi blangkon yang cocok untuk segala kesempatan, baik acara formal maupun santai.
      </p>
      <h4 class="mt-5">Produk Kami</h4>
      <p>
        Di <strong>Sri Rejeki</strong>, Anda akan menemukan berbagai jenis blangkon dengan desain yang beragam, mulai dari yang klasik hingga yang modern. Setiap blangkon diproduksi dengan perhatian penuh terhadap detail dan kualitas, sehingga Anda bisa tampil percaya diri dan bergaya dengan sentuhan tradisional.
      </p>
      <h4 class="mt-5">Mengapa Memilih Kami?</h4>
      <div><strong>Autentik dan Berkualitas:</strong> Semua produk kami adalah hasil karya pengrajin lokal yang berpengalaman.</div>
      <div><strong>Desain Eksklusif:</strong> Kami menawarkan desain unik yang tidak akan Anda temukan di tempat lain.</div>
      <div><strong>Pengiriman Cepat dan Aman:</strong> Kami bekerja sama dengan kurir terpercaya untuk memastikan pesanan Anda sampai dengan cepat dan dalam kondisi baik.</div>
      <div><strong>Harga Terjangkau:</strong> Kami menawarkan produk berkualitas tinggi dengan harga yang bersaing.</div>
      <p class="text-center mt-5">
        Terima kasih telah berkunjung ke <strong>Sri Rejeki</strong>. Selamat berbelanja dan semoga Anda menemukan blangkon yang sempurna untuk Anda!
      </p>
    </div>
  </body>
  <footer>
    <div class="bg-dark py-4"></div>
  </footer>
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
  background-image: url("@/assets/hero4.png");
  background-size: cover;
  width:100%;
  height:70vh;
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
