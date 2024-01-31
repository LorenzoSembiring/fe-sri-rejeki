<template>
  <div
    class="position-relative"
    @mouseenter="popover = true"
    @mouseleave="popover = false"
  >
    <div class="p-1 rounded cart-background">
      <Icon style="font-size: 3.75vh; color: gray" icon="mdi:cart" />
    </div>
    <div class="card bg-white position-fixed" v-if="popover">
      <div class="card-body">
        <p class="border-bottom fw-semibold pb-1">Keranjang (2)</p>
        <div class="d-flex my-1">
          <div class="logo"></div>
          <div>Halo</div>
        </div>
        <div class="d-flex my-1">
          <div class="logo"></div>
          <div>Halo</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";

export default {
  components: {
    Icon,
  },
  setup() {
    const popover = ref(false);
    // Use ref to get a reference to the button
    const popoverTrigger = ref(null);

    // Initialize popover in the onMounted lifecycle hook
    onMounted(() => {
      // Check if the popoverTrigger is not null before initializing
      if (popoverTrigger.value) {
        new bootstrap.Popover(popoverTrigger.value);
      }
    });

    // Return the popoverTrigger reference
    return { popoverTrigger, popover };
  },
};
</script>
<style scoped>
.logo {
  width: 7vh;
  height: 7vh;
  background-image: url("@/assets/default_profile_picture.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
