<!-- frontend/portal/src/views/RegisterPage.vue-->

<template>
  <div class="auth-container">
    <!-- Colonne gauche : Infos -->
    <div class="auth-info-col">
      <h2 class="auth-title">Pourquoi S'inscrire ?</h2>
      <ul class="auth-info-list starred-list">
        <li> 🧾 Avoir un compte chez nous </li>
        <li> 🏷️ Recevoir des tampons de fidélité </li>
        <li> 💎 Obtenir des points de loyauté </li>
        <li> 🎉 C’est gratuit, rapide et sans engagement </li>
      </ul>
    </div>

    <!-- Colonne droite : Formulaire -->
    <div class="form-wrapper">
      <h2 class="form-title">🚀 Inscris-toi</h2>

      <section>
        <form class="fade-in-up" @submit.prevent="handleRegister">

          <!-- Nom -->
          <div class="forms-input-container">
            <input v-model="name" type="name" autocomplete="name" id="name" required
              placeholder="Veuillez entrer un nom valide" class="forms-input-style" />
            <label for="name" class="forms-input-label">Nom / Pseudo</label>
          </div>

          <!-- Email -->
          <div class="forms-input-container">
            <input v-model="email" type="email" autocomplete="email" id="email" required
              placeholder="Veuillez entrer un mail valide" class="forms-input-style" />
            <label for="email" class="forms-input-label">Adresse E-mail</label>
          </div>

          <!-- Mot de passe -->
          <div class="forms-input-container">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password" required placeholder=" "
              class="forms-input-style" />
            <label for="password" class="forms-input-label">Mot de passe</label>

            <!-- Icône toggle -->
            <i :class="showPassword ? 'fa-solid fa-eye eye-iconOpen' : 'fa-solid fa-eye-slash eye-iconClose'"
              @click="togglePassword"></i>
          </div>

          <!-- Confirmation -->
          <div class="forms-input-container">
            <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" type="password"
              id="confirmPassword" required placeholder=" " class="forms-input-style" />
            <label for="confirmPassword" class="forms-input-label">Confirmer le Mot de passe</label>
          </div>

          <p v-if="errorMessage" class="errorMessage" v-html="formattedErrorMessage"></p>

          <!-- Bouton Créer un Compte -->
          <button type="submit" class="forms-button" :disabled="isResending">{{ isResending ? "Inscription en cours..."
            : "Créer ton Compte" }}</button>

          <p class="auth-subtle-link">
            T'as déjà un Compte ?
            <router-link to="/login">
              Connecte-toi
            </router-link>
          </p>

          <!-- Séparateur OU -->
          <div class="auth-separator-or">
            <span>ou</span>
          </div>

          <button @click="loginWithGoogle" class="google-button">
            <img src="@/assets/google-logo.png" alt="Google" width="20" />
            S'inscrire avec Google
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
      errorMessage: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      errorMessage: "",
      isResending: false,
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
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Les mots de passe ne correspondent pas !";
        return;
      }

      this.isResending = true;

      try {
        console.log("API URL =", import.meta.env.VITE_API_URL);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
          {
            name: this.name,
            email: this.email,
            password: this.password,
          },
          { withCredentials: true } // important pour les cookies/session
        );
        localStorage.setItem("pending_name", this.name);
        localStorage.setItem("pending_password", this.password);

        this.$router.push({ path: "/verify-code", query: { email: this.email } });
      } catch (error) {
        console.error("Erreur d'inscription :", error);
        this.errorMessage = error.response?.data?.error || "Erreur réseau ou serveur.";
      } finally {
        this.isResending = false;
      }
    },
    loginWithGoogle() {
      console.log("🔍 API URL REGISTER =", import.meta.env.VITE_API_URL);
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    }
  }
};
</script>
