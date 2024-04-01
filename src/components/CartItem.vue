<template>
  <div class="border d-flex rounded">
    <div class="form-check col-1 d-flex align-items-center ms-3">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="defaultCheck1"
      />
    </div>
    <div class="col-2">
      <img
        class="m-2 rounded"
        src="@/assets/default_profile_picture.jpg"
        alt=""
      />
    </div>
    <div class="col">
      <div class="row">
        <div class="col ms-3 mt-2 h5 fw-semibold">Blangkon Jawa Tengah</div>
        <div class="d-flex justify-content-end col mt-3 me-4 fw-bold">
          Rp 50.000
        </div>
        <div class="ms-3">Ukuran: 9</div>
        <div class="ms-3 mt-1 border rounded" style="width: fit-content">
          <button class="button-counter">-</button>
          <input type="number" class="input-counter" />
          <button class="button-counter">+</button>
        </div>
      </div>

      <div></div>
    </div>
  </div>
</template>
<style scoped>
img {
  width: 90px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
textarea:focus,
input:focus {
  outline: none;
}
.button-counter {
  border-style: none;
  color: #aa7d61;
  background-color: white;
  font-weight: 800;
  width: 30px;
}
.input-counter {
  border: none;
  width: 30px;
  text-align: center;
}
</style>
