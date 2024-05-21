<template>
  <LayoutDefault route="statistic">
    <div class="header">
      <div class="col h2 text-header px-4">Kategori</div>
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
      <div class="row">
        <div class="col-7 mt-5 rounded">
          <div class="d-flex">
            <div class="flex-grow-1">
              <div class="h6 text-secondary">Pendapatan Bulanan</div>
              <div class="h4">Rp. 5.500.000</div>
            </div>
            <div class="col-3 me-5">
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
      </div>
      <div class="row">
        <div>Penjualan Terbaik</div>
      </div>
    </div>
  </LayoutDefault>
</template>
<script setup>
import LayoutDefault from "@/components/LayoutDefault.vue";
import { Icon } from "@iconify/vue";
window.onload = function () {
  var chart = new CanvasJS.Chart("chartContainer", {
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
        color: "rgba(235, 180, 113,.7)",
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
  chart.render();
};
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
</style>
