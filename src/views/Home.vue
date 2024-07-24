<template>
  <body>
    <navbar />
    <div class="tagline pt-5 pb-5 ps-5">
      <div class="row m-0">
        <div class="pe-5 text-end col" style="padding-top: 10vh">
          <div class="text">Warisan Budaya</div>
          <div class="text">Pesona Tradisi</div>
          <a class="btn button-belanja p-3 mt-4 mb-5" href="/shop">Belanja Sekarang</a>
        </div>
      </div>
    </div>
    <div class="my-5 split justify-content-center d-flex fs-2">PRODUK KAMI</div>
    <div class="carousel">
  <div ref="carouselTrack" class="carousel-track">
    <product-item
      class="m-2 card-product"
      v-for="product in products"
      :key="product.id"
      :id="product.id"
      :category="product.category"
      :categoryId="product.category_id"
      :name="product.name"
      :price="product.price"
      :picture="product.picture"
    />
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

<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted, nextTick } from "vue";
import ProductItem from "@/components/ProductItem.vue";
import axios from "axios";

const products = ref([]);

const fetchProduct = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + "/api/product/index-home");
    products.value = response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const carouselTrack = ref(null);

const setupCarousel = () => {
  const track = carouselTrack.value;
  const cards = Array.from(track.children);

  if (cards.length === 0) {
    console.log("No cards found");
    return;
  }

  let cardWidth = cards[0].offsetWidth;
  let visibleCards = Math.ceil(track.offsetWidth / cardWidth);

  // Clone the first few cards and append them to the end
  for (let i = 0; i < visibleCards; i++) {
    track.appendChild(cards[i].cloneNode(true));
  }

  let currentPosition = 0;

  const moveCarousel = () => {
    currentPosition -= 0.3; // Move by 1 pixel each frame
    track.style.transform = `translateX(${currentPosition}px)`;

    // Check if we need to reset
    if (Math.abs(currentPosition) >= cardWidth * cards.length) {
      currentPosition = 0;
      track.style.transform = `translateX(${currentPosition}px)`;
    }

    requestAnimationFrame(moveCarousel);
  };

  requestAnimationFrame(moveCarousel);
};

onMounted(async () => {
  await fetchProduct();
  await nextTick();
  setupCarousel();
});

onMounted(async () => {
  await fetchProduct();
  await nextTick();
  setupCarousel();
});

onMounted(async () => {
  await fetchProduct();
  await nextTick();
  setupCarousel();
});

onMounted(async () => {
  await fetchProduct();
  await nextTick();
  setupCarousel();
});
</script>


<style scoped>
.carousel {
  overflow: hidden;
  width: 100%;
}

.carousel-track {
  display: flex;
}

.card-product {
  flex: 0 0 auto;
  width: 25%; /* Adjust this value based on how many cards you want visible at once */
}

.tagline {
  background-image: url("@/assets/hero4.png");
  background-size: cover;
  width: 100%;
  height: 70vh;
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