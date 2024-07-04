<template>
  <LayoutDefault route="statistic">
    <div class="header">
      <div class="col h2 text-header px-4">Statistik</div>
    </div>
    <div class="row m-0 p-4">
      <div
        class="col border-coklat d-inline-flex rounded me-4 bg-card d-flex px-3"
      >
        <div class="align-self-center flex-grow-1">
          <Icon style="font-size: 7vh" icon="mdi:user-outline" />
        </div>
        <div class="">
          <div class="my-2 fw-semibold text-secondary d-flex flex-row-reverse">
            Total Pengguna
          </div>
          <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">118</div>
        </div>
      </div>
      <div class="col border-coklat d-inline-flex rounded me-4 bg-card d-flex">
        <div class="align-self-center flex-grow-1">
          <Icon style="font-size: 7vh" class="d-flex" icon="carbon:product" />
        </div>
        <div>
          <div class="my-2 fw-semibold text-secondary d-flex flex-row-reverse">
            Total Pesanan
          </div>
          <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">372</div>
        </div>
      </div>
      <div class="col border-coklat d-inline-flex rounded me-4 bg-card d-flex">
        <div class="align-self-center flex-grow-1">
          <Icon style="font-size: 7vh" icon="ph:money" />
        </div>
        <div>
          <div class="my-2 fw-semibold text-secondary d-flex flex-row-reverse">
            Total Penjualan
          </div>
          <div class="h4 mb-3 d-flex flex-row-reverse font-jakarta">
            Rp120.000.000
          </div>
        </div>
      </div>
      <div class="col border-coklat d-inline-flex rounded bg-card d-flex">
        <div class="align-self-center flex-grow-1">
          <Icon style="font-size: 7vh" icon="mynaui:package" />
        </div>
        <div>
          <div class="my-2 fw-semibold text-secondary d-flex flex-row-reverse">
            Total Produk
          </div>
          <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">3</div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-7 rounded">
          <div class="d-flex">
            <div class="flex-grow-1">
              <div class="h6 text-secondary">Pendapatan Bulanan</div>
              <div class="h4">Rp. 5.500.000</div>
            </div>
            <div class="col-2 me-5">
              <select
                class="col form-select"
                aria-label="Default select example"
              >
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024" selected>2024</option>
              </select>
            </div>
          </div>
          <div
            id="chartContainer"
            class="col"
            style="height: 250px; width: 95%"
          ></div>
        </div>
        <div class="col">
          <div class="d-flex">
            <div class="flex-grow-1">
              <div class="h6 text-secondary">Pesanan harian</div>
              <div class="h4">4</div>
            </div>
            <div class="col-3 me-4">
              <select
                class="col form-select"
                aria-label="Default select example"
              >
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024" selected>2024</option>
              </select>
            </div>
          </div>
          <div
            id="weeklyChartContainer"
            class="col"
            style="height: 250px; width: 95%"
          ></div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="h4">Produk Terlaris</div>
        <div class="mt-2">
          <div class="py-2 px-0 rounded-top border border-bottom-0 bg-tabel">
            <div class="row fw-semibold ps-5">
              <div class="col-5">Nama Produk</div>
              <div class="col-2">Harga</div>
              <div class="col-3">Penjualan</div>
              <div class="col">
                <Icon icon="ph:dots-three-bold" style="font-size: 26px" />
              </div>
            </div>
          </div>
          <div class="py-2 px-0 border border-bottom-0 fw-semibold">
            <div
              v-for="n in bestSeller"
              class="row my-3 ps-5 d-flex align-items-center"
            >
              <div class="col-5 d-flex align-items-center">
                <div class="d-flex justify-content-center d-inline-flex">
                  <img
                    style="height: 7vh; width: 7vh"
                    src="@/assets/default_profile_picture.jpg"
                  />
                </div>
                <span class="ms-2">{{n.name}}</span>
              </div>
              <div class="col-2">{{formatToIDR(n.price)}}</div>
              <div class="col-3">{{n.sales}}</div>
              <div class="col">
                <Icon icon="ph:dots-three-bold" style="font-size: 26px" />
              </div>
            </div>
          </div>
          <div class="pt-3 rounded-bottom border border-top-0 bg-tabel">
            <div class="row mx-3 text-secondary">
              <div class="col mb-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="tes"></div>
  </LayoutDefault>
</template>
<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import axios from "axios";  // Make sure you import axios

const token = localStorage.getItem("token");

const bestSeller = ref([]);

onMounted(() => {
  console.log(document.getElementById("tes"));
  
  var monthlyChart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    axisY: {
      valueFormatString: "#0,,.",
      gridColor: "rgba(175, 175, 175,.7)",
    },
    axisX: {
      gridColor: "orange",
    },
    data: [
      {
        type: "splineArea",
        color: "rgba(217, 130, 54,.7)",
        markerSize: 5,
        xValueFormatString: "YYYY",
        yValueFormatString: "$#,##0.##",
        dataPoints: [
          { x: new Date(2000, 0), y: 3289000 },
          { x: new Date(2001, 0), y: 3830000 },
          { x: new Date(2002, 0), y: 2009000 },
          { x: new Date(2003, 0), y: 2840000 },
          { x: new Date(2004, 0), y: 2396000 },
          { x: new Date(2005, 0), y: 1613000 },
          { x: new Date(2006, 0), y: 2821000 },
          { x: new Date(2007, 0), y: 2000000 },
          { x: new Date(2008, 0), y: 1397000 },
          { x: new Date(2009, 0), y: 2506000 },
          { x: new Date(2010, 0), y: 2798000 },
          { x: new Date(2011, 0), y: 3386000 },
          { x: new Date(2012, 0), y: 6704000 },
          { x: new Date(2013, 0), y: 6026000 },
          { x: new Date(2014, 0), y: 2394000 },
          { x: new Date(2015, 0), y: 1872000 },
          { x: new Date(2016, 0), y: 2140000 },
        ],
      },
    ],
  });
  monthlyChart.render();

  var weeklyChart = new CanvasJS.Chart("weeklyChartContainer", {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    axisY: {},
    data: [
      {
        type: "column",
        showInLegend: false,
        color: "rgba(217, 130, 54)",
        dataPoints: [
          { y: 1, label: "M" },
          { y: 2, label: "T" },
          { y: 3, label: "W" },
          { y: 4, label: "T" },
          { y: 9, label: "F" },
          { y: 2, label: "S" },
          { y: 3, label: "S" },
        ],
      },
    ],
  });
  weeklyChart.render();

  const fetchBestSellers = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/statistic/best-seller",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      bestSeller.value = response.data.data;
      console.log(bestSeller.value)
    } catch (error) {
      console.error("Error fetching best-seller data:", error);
    }
  };

  fetchBestSellers();
});
function formatToIDR(number) {
    return number.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
    });
}
</script>

<style scoped>
.header {
  margin-top: 5vh;
}
.text-header {
  color: #402218;
}
.border-coklat {
  border: 1px solid #dbcdc5;
  /* box-shadow: 1px 1px 4px rgb(248, 217, 206);  */
}
.bg-tabel {
  background-color: #f0eae8;
}
</style>
