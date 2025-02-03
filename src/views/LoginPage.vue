<template>
  <v-container>
    <v-card class="mx-auto" max-width="400">
      <v-card-title>Логин</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="handleLogin">
          <v-text-field v-model="username" label="Имя пользователя" />
          <v-text-field v-model="password" type="password" label="Пароль" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :loading="loading" color="primary" type="submit" @click="handleLogin">Войти</v-btn>
      </v-card-actions>
      <v-alert v-if="loginError" type="error" dense class="mt-4">{{ loginError }}</v-alert>
    </v-card>
  </v-container>
</template>

<script>
// import { mapActions } from 'vuex';
import { mapState } from 'vuex';
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapState(['loginError', 'isLoggedIn'])
  },
  methods: {
    // ...mapActions(['login']),
    // авторизация через API
    // async handleLogin() {
    //   this.loading = true;
    //   this.error = null;
    //   try {
    //     await this.login({ username: this.username, password: this.password });
    //     this.$router.push('/headquarters'); // Перенаправление после успешного логина
    //   } catch (err) {
    //     this.error = err.message || 'Login failed';
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    // Простая проверка логина
    async handleLogin() {
      if (this.username && this.password) {
        await this.$store.dispatch("login", {username: this.username, password: this.password});
        if (this.isLoggedIn) {
          localStorage.setItem("isLoggedIn", "true");
          this.$router.push("/headquarters");
        }
      }
    },
  },
};
</script>