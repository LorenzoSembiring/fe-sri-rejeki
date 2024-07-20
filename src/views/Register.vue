<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Registrasi</title>
    </head>
    <body>
      <div class="container d-flex justify-content-center pb-5">
        <div class="mt-5 row">
          <div class="logo my-4 mx-auto d-block"></div>
          <div
            class="form-container border border-2 shadow-sm col-10 mx-auto d-block rounded"
          >
            <div class="text text-center mt-4 mb-2">Daftar dulu, yuk!</div>
            <div class="form text-center pt-3">
              <form action="#" @submit.prevent="handleSubmit">
                <input
                  class="form-control"
                  v-model="formData.email"
                  type="email"
                  placeholder="Email"
                /><br />
                <input
                  class="form-control"
                  v-model="formData.nama_depan"
                  type="text"
                  placeholder="Nama Depan"
                /><br />
                <input
                  class="form-control"
                  v-model="formData.nama_belakang"
                  type="text"
                  placeholder="Nama Belakang"
                /><br />
                <input
                  class="form-control"
                  v-model="formData.phone"
                  type="tel"
                  placeholder="Nomor Telepon"
                /><br />
                <div class="input-group mb-3">
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
                <div class="input-group mb-3">
                  <input
                    required
                    class="form-control border-right-0"
                    v-model="formData.ulangi_password"
                    :type="ulangi_password_visible ? 'text' : 'password'"
                    placeholder="Ulangi Password"
                  />
                  <span
                    @click="ulangi_password_visible = !ulangi_password_visible"
                    class="input-group-text bg-transparent"
                    id="basic-addon2"
                    ><Icon
                      :icon="ulangi_password_visible ? 'el:eye-close' : 'mdi:eye'"
                  /></span>
                </div>
                <div v-if="password_not_match" class="my-2 text-danger">
                  Password tidak cocok!
                </div>
                <button class="button px-4 mb-4" type="submit">Daftar</button>
                <div class="text-login -px-4 mb-4">
                  Sudah punya akun?
                  <a class="link" href="/login">Masuk</a>
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
import { Icon } from "@iconify/vue";
import router from "@/router";

export default defineComponent({
  components: {
    Icon,
  },
  setup() {
    const formData = reactive({
      email: "",
      nama_depan: "",
      nama_belakang: "",
      phone: "",
      password: "",
      ulangi_password: ""
    });

    const password_visible = ref(false);
    const ulangi_password_visible = ref(false)
    let password_not_match = ref(false)

    const handleSubmit = async () => {
      if (formData.password === formData.ulangi_password) {
        // masuk ke logic post register
        try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/api/user/register",
          {
            email: formData.email,
            first_name: formData.nama_depan,
            last_name: formData.nama_belakang,
            password: formData.password,
            username: formData.nama_depan + formData.nama_belakang,
            phone: formData.phone
          }
        );
        console.log(response);
        if (response.status == 200) {
          const token = JSON.stringify(response.data.data.token.token);
          const strippedToken = token.slice(1, -1);

          localStorage.setItem("token", strippedToken);
          localStorage.setItem("name", response.data.data.user.username);
          
          router.push("/")
        }
      } catch (error) {
        console.error(error);
      }
      } else {
        // raise flag password tidak sama
        password_not_match.value = true
      }
    }

    onMounted(() => {
      window.document.title = "Sri Rejeki - Register";
    });
    return { formData, handleSubmit, password_visible, ulangi_password_visible, password_not_match };
  },
});
</script>

<style scoped>
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

.text-login {
  font-family: "Roboto", sans-serif;
  color: #555;
}
</style>
