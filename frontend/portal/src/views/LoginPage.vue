<!-- frontend/portal/src/views/RegisterPage.vue-->

<template>
  <div class="auth-container">
    <!-- Colonne gauche : Infos -->
    <div class="auth-info-col">
      <div class="separator"></div>
      <h2 class="auth-title">Pourquoi se Connecter ?</h2>
      <ul class="auth-info-list starred-list">
        <li> 🔐 Accéder à ton espace personnel </li>
        <li> 📊 Voir ton historique ou ta progression </li>
        <li> 💎 Utiliser tes points de fidélité </li>
        <li> ✨ Profiter de tes avantages exclusifs </li>
      </ul>
      <div class="separator"></div>
    </div>

    <!-- Colonne droite : Formulaire -->
    <div class="form-wrapper">
      <h2 class="form-title">⚡Connecte-toi</h2>

      <section>
        <form class="fade-in-up" @submit.prevent="handleLogin">

          <!-- Email -->
          <div class="forms-input-container">
            <input v-model="email" type="email" autocomplete="email" id="email" required
              placeholder="Veuillez entrer un mail valide" class="forms-input-style" />
            <label for="email" class="forms-input-label">Adresse E-mail</label>
          </div>

          <!-- Mot de passe -->
          <div class="forms-input-container">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" type="password"
              autocomplete="new-password" id="password" required placeholder=" " class="forms-input-style" />
            <label for="password" class="forms-input-label">Mot de passe</label>

            <!-- Icône toggle -->
            <i :class="showPassword ? 'fa-solid fa-eye eye-iconOpen' : 'fa-solid fa-eye-slash eye-iconClose'"
              @click="togglePassword"></i>
          </div>

          <p v-if="errorMessage" class="errorMessage" v-html="formattedErrorMessage"></p>

          <!-- Bouton Créer un Compte -->
          <button type="submit" class="forms-button" :disabled="isResending">
            {{ isResending ? "Connexion en cours..." : "Se connecter" }}</button>

          <p class="auth-subtle-link">
            T'as pas de Compte ?
            <router-link to="/">
              Inscris-toi
            </router-link>
          </p>

          <!-- Séparateur OU -->
          <div class="auth-separator-or">
            <span>ou</span>
          </div>

          <button @click="loginWithGoogle" class="google-button">
            <img src="@/assets/google-logo.png" alt="Google" width="20" />
            Se connecter avec Google
          </button>
        </form>
      </section>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "RegisterPage",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      showPassword: false,
      isResending: false,
      errorMessage: "",
    };
  },
  computed: {
    formattedErrorMessage() {
      return this.errorMessage.replace(/\n/g, "<br>");
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    async handleLogin() {
      this.errorMessage = "";
      this.isResending = true;

      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
          email: this.email,
          password: this.password,
        }, { withCredentials: true });

        if (res.status === 200) {
          const { token, userId } = res.data;

          // Tu peux stocker le token dans localStorage si tu veux
          localStorage.setItem("token", token);

          // Redirection vers le tableau de bord
          this.$router.push("/dashboard");
        }
      } catch (err) {
        console.error("Erreur de connexion :", err);
        this.errorMessage = err.response?.data?.error || "Une erreur est survenue.";
      } finally {
        this.isResending = false;
      }
    },

    loginWithGoogle() {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    }
  }

};
</script>
