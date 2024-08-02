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
          <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">{{ userCount }}</div>
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
          <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">{{totalSales}}</div>
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
            {{ formatToIDR(parseInt(totalRevenue))}}
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
          <div class="h3 mb-3 d-flex flex-row-reverse font-jakarta">{{ totalProduct }}</div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-7 rounded">
          <div class="d-flex">
            <div class="flex-grow-1">
              <div class="h6 text-secondary">Pendapatan Bulanan</div>
              <div class="h4">{{ formatToIDR(averageMonthlyRevenue) }}</div>
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
              <div class="h4">{{ todayOrder }}</div>
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
              <div class="col">Aksi</div>
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
                    :src="parsedImage(n.picture)"
                  />
                </div>
                <span class="ms-2">{{ n.name }}</span>
              </div>
              <div class="col-2">{{ formatToIDR(n.price) }}</div>
              <div class="col-3">{{ n.sales }}</div>
              <div class="col">
                <button class="btn btn-light border" @click="router.push('/admin/product/' + n.id)">
                  Detail
                </button>
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
import axios from "axios";
import router from "../../router/index.js";

const token = localStorage.getItem("token");

const bestSeller = ref([]);
const graphDaily = ref([""]);
const graphMonthly = ref([""]);
const todayOrder = ref(0);
const averageMonthlyRevenue = ref(0);
const totalSales = ref(null);
const userCount = ref(null);
const totalRevenue = ref(null);
const totalProduct = ref(null);

onMounted(() => {
  fetchBestSellers();
  fetchGraphDaily();
  fetchGraphMonthly();
  fetchTotalSales();
  fetchUserCount();
  fetchTotalRevenue();
  fetchTotalProduct();
});

function parsedImage(path) {
  return import.meta.env.VITE_API_URL + path;
}

const fetchTotalProduct = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/statistic/product-count",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    totalProduct.value = response.data.data;
  } catch (error) {
    console.error("Error fetching total revenue:", error);
  }
};
const fetchTotalRevenue = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/dashboard/total-sales",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    totalRevenue.value = response.data.data;
  } catch (error) {
    console.error("Error fetching total revenue:", error);
  }
};
const fetchUserCount = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/statistic/user-count",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    userCount.value = response.data.data;
  } catch (error) {
    console.error("Error fetching total sales:", error);
  }
};
const fetchTotalSales = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/dashboard/count-order",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    totalSales.value = response.data.data;
  } catch (error) {
    console.error("Error fetching total sales:", error);
  }
};

const fetchGraphDaily = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/statistic/graph-daily",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    graphDaily.value = response.data.data;
    todayOrder.value = response.data.data[6].total;
    console.log(todayOrder.value);

    const dataPoints = graphDaily.value.map((item) => {
      return { y: item.total, label: item.day };
    });

    var weeklyChart = new CanvasJS.Chart("weeklyChartContainer", {
      animationEnabled: true,
      theme: "light2",
      axisY: {},
      data: [
        {
          type: "column",
          showInLegend: false,
          color: "rgba(217, 130, 54)",
          dataPoints: dataPoints,
        },
      ],
    });
    weeklyChart.render();
  } catch (error) {
    console.error("Error fetching best-seller data:", error);
  }
};

const fetchGraphMonthly = async () => {
  try {
    const formData = new FormData();
    formData.append("year", 2024);
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/statistic/graph-monthly",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    graphMonthly.value = response.data.data;
    console.log(graphMonthly.value);

    const totalRevenues = graphMonthly.value.map((entry) =>
      Number(entry.total_revenue)
    );
    const totalSum = totalRevenues.reduce((acc, val) => acc + val, 0);
    averageMonthlyRevenue.value = totalSum / totalRevenues.length;

    const dataPoints = graphMonthly.value.map((entry) => ({
      x: new Date(entry.month + "-01"),
      y: Number(entry.total_revenue),
    }));

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
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "Rp#,##0.##",
          dataPoints: dataPoints,
        },
      ],
    });
    monthlyChart.render();
  } catch (error) {
    console.error("Error fetching graph monthly data:", error);
  }
};

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
    console.log(bestSeller.value);
  } catch (error) {
    console.error("Error fetching best-seller data:", error);
  }
};

function formatToIDR(number) {
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
