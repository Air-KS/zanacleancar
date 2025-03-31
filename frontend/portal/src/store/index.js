/*
  ./frontend/src/stores/index.js
  (Gestion sessions via cookies Passport)
*/

import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),

  actions: {
    async login(user) {
      this.user = user;
      this.isLoggedIn = true;
    },

    async logout() {
      this.isLoggedIn = false;
      this.user = null;
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, { withCredentials: true });
      } catch (error) {
        console.error("Erreur déconnexion :", error);
      }
    },

    async checkLoginState() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/checkSession`, { withCredentials: true });

        if (response.data.user) {
          this.user = response.data.user;
          this.isLoggedIn = true;
        } else {
          this.user = null;
          this.isLoggedIn = false;
          console.info("✅ Aucune session active côté serveur.");
        }
      } catch (error) {
        console.error("🚨 Erreur inattendue côté serveur :", error);
        this.user = null;
        this.isLoggedIn = false;
      }
    },
  },
});
