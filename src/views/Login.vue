<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Login</title>
    </head>
    <body class="body pb-5">
      <div v-if="loading" class="load">
        <Icon icon="line-md:loading-twotone-loop" />
      </div>
      <div
        :class="{ blur: loading }"
        class="container d-flex justify-content-center"
      >
        <div class="mt-5 pb-5 rounded row">
          <div class="logo my-4 mx-auto d-block"></div>
          <div
            class="form-container border border-2 shadow-sm col-10 mx-auto d-block rounded"
          >
            <div class="text text-center mt-4 mb-2">Masuk dulu, yuk!</div>
            <div class="form text-center pt-3">
              <form action="#" @submit.prevent="handleSubmit">
                <input
                  required
                  class="form-control"
                  v-model="formData.email"
                  type="email"
                  placeholder="Email"
                /><br />
                <div class="input-group mb-3 eye-icon">
                  <input
                    required
                    class="form-control border-right-0"
                    v-model="formData.password"
                    :type="password_visible ? 'text' : 'password'"
                    placeholder="Password"
                  />
                  <span
                    @click="password_visible = !password_visible"
                    class="input-group-text bg-transparent"
                    id="basic-addon2"
                    ><Icon
                      :icon="password_visible ? 'el:eye-close' : 'mdi:eye'"
                  /></span>
                </div>
                <br />
                <div class="alert alert-danger" v-if="error_auth">
                  {{ error_auth }}
                </div>
                <button class="button px-4 mb-4" type="submit">Masuk</button>
                <div class="text-register -px-4 mb-4">
                  Belum punya akun?
                  <a class="link" href="/register">Daftar</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, onMounted } from "vue";
import axios from "axios";
import router from "../router/index.js";
import { Icon } from "@iconify/vue";

export default defineComponent({
  components: {
    Icon,
  },
  setup() {
    const formData = reactive({
      email: "",
      password: "",
    });

    const error_auth = ref("");
    const password_visible = ref(false);
    const loading = ref(false);

    let code;

    const handleSubmit = async () => {
      loading.value = true;
      try {
        const response = await axios.post( import.meta.env.VITE_API_URL + "/api/user/login", {
          email: formData.email,
          password: formData.password,
        });

        code = response.data.code;
        loading.value = false;
        if (code == 200) {
          const token = JSON.stringify(response.data.data.token.token);
          const strippedToken = token.slice(1, -1);

          localStorage.setItem("token", strippedToken);
          localStorage.setItem("name", response.data.data.user.username);
          if (response.data.data.user.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/");
          }
        }
      } catch (error: any) {
        if (error.response?.status == 401) {
          error_auth.value = "Email atau Password salah!";
        } else {
          error_auth.value = "Ada kesalahan sistem, coba lagi nanti!";
        }
        loading.value = false;
      }
    };

    onMounted(() => {
      window.document.title = "Sri Rejeki - Login";
    });
    return {
      formData,
      handleSubmit,
      code,
      password_visible,
      error_auth,
      loading,
    };
  },
});
</script>

<style scoped>
.blur {
  filter: blur(2px);
  transition: filter 0.5s;
}
.body {
  /* background-image: url("@/assets/bg-icon-sm.png"); */
  background-color: rgb(255, 255, 255);
}
.load {
  position: absolute;
  left: calc(50% - 50px);
  top: calc(50vh - 50px);
  z-index: 1;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-size: 100px;
}

.logo {
  width: 35vh;
  height: 7vh;
  background-image: url("@/assets/logo-cropped.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.text {
  font-family: "Roboto", sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
  color: #555;
}

.input {
  border-radius: 5px;
  width: 56vh;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}

.input::placeholder {
  color: #b4b4b4;
  font: 13px sans-serif;
}

.input:focus {
  border: 1px solid #c6a28a;
}

.form-control:focus,
.form-control:focus + .input-group-text {
  box-shadow: none;
  border-color: #c6a28a;
}

.eye-icon {
  cursor: pointer;
}
.button {
  align-items: center;
  background-image: linear-gradient(135deg, #c6a28a 40%, #aa7d61);
  border: 0;
  border-radius: 10px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: "Codec cold", sans-serif;
  font-size: 16px;
  font-weight: 600;
  height: 8vh;
  letter-spacing: 0.4px;
  line-height: 1;
  max-width: 100%;
  padding-top: 3px;
  transition: background-image 0.5s;
}

.button:hover {
  transform: scale(0.98);
  background-image: linear-gradient(-135deg, #c6a28a 40%, #aa7d61);
  opacity: 0.9;
}

.text-register {
  font-family: "Roboto", sans-serif;
  color: #555;
}

.link {
  text-decoration: none;
  font-weight: 700;
}

.border-right-0 {
  border-right: 0;
}
</style>
