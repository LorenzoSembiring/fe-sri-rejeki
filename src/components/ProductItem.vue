<template>
    <div class="rounded col-2 content border">
        <div class="d-inline">
            <div class="img-fluid my-2" style="text-align: center">
                <img
                    class="justify-center"
                    src="@/assets/default_profile_picture.jpg"
                    alt=""
                />
            </div>
        </div>
        <div class="mx-3 kategori ">Blangkon Jogja</div>
        <div class="mx-3 nama fs-5">Blangkon Putih Jogja</div>
        <div class="mx-3 mb-3 harga fw-bold">50000</div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  // `setup` is a special hook dedicated for the Composition API.
  setup() {
    const count = ref(0)

    // expose the ref to the template
    return {
      count
    }
  }
}
</script>

<style>
.content {
    width: 250px;
}
</style>
