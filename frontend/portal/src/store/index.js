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

      // 🔒 Fallback iOS : localStorage si cookie bloqué
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        localStorage.setItem('user_cache', JSON.stringify(user));
      }
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

          // Pour iOS (si besoin)
          if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/token`, {
              withCredentials: true
            });
            localStorage.setItem('jwt_token', data.token);
          }

        } else {
          this.user = null;
          this.isLoggedIn = false;
          localStorage.removeItem('user_cache');
        }

      } catch (error) {
        this.user = null;
        this.isLoggedIn = false;
        localStorage.removeItem('user_cache');
        // Aucune alerte, aucune redirection : comportement silencieux
      }
    },
  },
});
