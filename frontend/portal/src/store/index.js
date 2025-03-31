/*
  ./frontend/src/stores/index.js
*/

import { defineStore } from 'pinia';
import axios from 'axios';

function getUserFromLocalStorage() {
  try {
    const user = localStorage.getItem('user');
    if (user && user !== 'undefined') {
      return JSON.parse(user);
    }
    return null;
  } catch (error) {
    console.error('Erreur de parsing user', error);
    return null;
  }
}

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: !!localStorage.getItem('token'),
    user: getUserFromLocalStorage(),
  }),

  actions: {
    async login(user, token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      this.isLoggedIn = true;
      this.user = { ...user, token };

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile/${user.id}`);
        const userInfo = response.data;
        this.user = { ...user, ...userInfo, token };
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    },

    logout() {
      this.isLoggedIn = false;
      this.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },

    async checkLoginState() {
      const token = localStorage.getItem('token');
      const user = getUserFromLocalStorage();

      if (token && user) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile/${user.id}`);
          const userInfo = response.data;
          this.isLoggedIn = true;
          this.user = { ...user, ...userInfo, token };
        } catch (error) {
          console.error("Erreur de vérification du profil :", error);
        }
      } else {
        this.logout();
      }
    },
  },
});
