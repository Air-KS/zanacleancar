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
      localStorage.setItem('user_cache', JSON.stringify(user)); // 🧠 stock dans le cache
    },

    async logout() {
      this.isLoggedIn = false;
      this.user = null;
      localStorage.removeItem('user_cache'); // ❌ supprime le cache
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, { withCredentials: true });
      } catch (error) {
        console.error("Erreur déconnexion :", error);
      }
    },

    async checkLoginState() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/checkSession`, {
          withCredentials: true
        });

        if (response.data.user) {
          this.user = response.data.user;
          this.isLoggedIn = true;
          localStorage.setItem('user_cache', JSON.stringify(response.data.user));
        } else {
          throw new Error("Pas de session");
        }
      } catch (error) {
        const cached = localStorage.getItem('user_cache');

        if (cached) {
          this.user = JSON.parse(cached);
          this.isLoggedIn = true;
        } else {
          this.user = null;
          this.isLoggedIn = false;
        }
      }
    },
  },
});
