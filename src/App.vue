<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

onMounted(async () => {
  // Validate the token on app initialization
  await validateToken();
});

async function validateToken() {
  // Get the token from your authentication state (adjust this based on your app's state management)
  const token = localStorage.getItem("token");

  if (token) {
    try {
      // Make the API request to validate the token directly in App.vue
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/auth/token-validation",
        {
          headers: { Authorization: `Bearer ${token}` }

          // Add any additional options or data as needed
        }
      );

      if (response.data.code != 200) {
        // If the response is not OK, handle the error (e.g., redirect to login page)
        localStorage.removeItem("token");
        location.reload()
      }
      
      // Token is valid, continue with the application initialization
    } catch (error) {
      // Handle token validation error (e.g., redirect to login page)
      localStorage.removeItem("token");
      console.log("error");
      location.reload()
    }
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
/* Your styles here */
</style>
