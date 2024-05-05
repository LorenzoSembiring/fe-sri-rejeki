<template>
    <div class="d-flex align-items-center">
						<div class="form-check col-1 d-flex align-items-center ms-3">
							<input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
						</div>
						<div class="d-flex align-items-center">
							<img
								class="m-2 rounded"
								src="@/assets/default_profile_picture.jpg"
								alt=""
								/>
						</div>
						<div class="col-3 my-2">
							<div class="p-0 h5 mt-4">Blangkon Solo</div>
							<div class="p-0">ID: 1</div>
						</div>
						<div class="col-harga">
							<div>Rp 100.000,00</div>
						</div>
						<div class="col-1 ms-5">
							<div>100</div>
						</div>
						<div class="col-1 ms-5">
							<label class="toggle" for="myToggle">
								<input class="toggle__input" name="" type="checkbox" id="myToggle">
								<div class="toggle__fill"></div>
							</label>
						</div>
						<div class="ms-5">
							<button class=" btn button-putih border px-3 py-1">Atur</button>
						</div>
					</div>
  </template>
  <script setup>
  import {ref} from 'vue';
  
  let inputValue = ref(0)
  
  const increment = () => {
    inputValue.value = parseInt(inputValue.value) + 1;
    console.log(count)
  };
  
  const decrement = () => {
    inputValue.value = parseInt(inputValue.value) - 1;
  };
  </script>
  <style scoped>
  .button-putih {
	border-radius: 8px;
	border-style:none;
	background-color: #ffffff;
	color: rgb(53, 53, 53);
	font-weight: 600;
}
.table {
	max-width: 80vw;
}
.row {
	max-width: 100vw;
}
img {
    width: 90px;
}
.toggle {
    --width: 40px;
    --height: calc(var(--width) / 2);
    --border-radius: calc(var(--height) / 2);

    display: inline-block;
    cursor: pointer;
}
.toggle__input {
    display: none;
}
.toggle__fill {
    position: relative;
    width: var(--width);
    height: var(--height);
    border-radius: var(--border-radius);
    background: #dddddd;
    transition: background 0.2s;
}
.toggle__fill::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: var(--height);
    width: var(--height);
    background: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    border-radius: var(--border-radius);
    transition: transform 0.2s;
}
.toggle__input:checked ~ .toggle__fill {
    background: #b88e76;
}
.toggle__input:checked ~ .toggle__fill::after {
    transform: translateX(var(--height));
}
  </style>
  