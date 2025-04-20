<!--
  ./frontend/portal/src/views/profilPage.vue
-->

<template>
  <div class="page-container">
    <!-- Infos de confidentialité -->
    <section>
      <div class="auth-info-col">
        <h2 class="auth-title">Confidentialité des informations !</h2>
        <p>
          Les données personnelles renseignées ici sont uniquement visibles par vous et les administrateurs du
          site.<br />
          Elles ne seront jamais partagées, ni utilisées à des fins commerciales.<br /><br />
          Toutes les informations sont stockées de manière sécurisée et restent strictement à but informatif.
        </p>
      </div>
    </section>

    <!-- Carte de fidélité + Formulaire de profil -->
    <div class="form-wrapper">
      <div>
        <h2 class="form-title">Ta carte de Fidélité</h2>
        <CardFidelity v-if="user.FidelityCard?.card_id" :stamps="user.FidelityCard?.total_tampons || 0"
          :name="user.name" :lastName="user.last_name" :dateOfBirth="user.date_of_birth"
          :loyalty_points="user.loyalty_points" :userId="user.id" :cardId="user.FidelityCard?.card_id"
          :cardCreatedAt="user.FidelityCard?.created_at" />
      </div>

      <h2 class="form-title">Ton Profil</h2>

      <section>
        <form class="fade-in-up" @submit.prevent="handleSave">
          <div class="form-row">

            <!-- Champ prénom -->
            <div class="form-group">
              <div class="forms-input-container">
                <input :class="{ 'has-value': user.name }" v-model="user.name" type="text" autocomplete="family-name"
                  id="name" required placeholder="Ton nom de famille" class="forms-input-style" />
                <label for="name" class="forms-input-label">Prénom</label>
              </div>
            </div>

            <!-- Champ nom -->
            <div class="form-group">
              <div class="forms-input-container">
                <input :class="{ 'has-value': user.last_name }" v-model="user.last_name" type="text"
                  autocomplete="given-name" id="last_name" placeholder="Ton prénom" class="forms-input-style" />
                <label for="last_name" class="forms-input-label">Nom</label>
              </div>
            </div>
          </div>

          <div class="form-row">

            <!-- Date de naissance -->
            <div class="form-group">
              <div class="forms-input-container">
                <input :class="{ 'has-value': user.date_of_birth }" v-model="user.date_of_birth" type="date"
                  id="date_of_birth" class="forms-input-style" />
                <label for="date_of_birth" class="forms-input-label">Date de naissance</label>
              </div>
            </div>

            <!-- Téléphone -->
            <div class="form-group">
              <div class="forms-input-container">
                <input :class="{ 'has-value': user.phone }" v-model="user.phone" type="tel" autocomplete="tel"
                  id="phone" placeholder="Ton numéro de téléphone" class="forms-input-style" />
                <label for="phone" class="forms-input-label">Téléphone</label>
              </div>
            </div>
          </div>

          <!-- E-mail (désactivé) -->
          <div class="forms-input-container email-input">
            <input :class="['forms-input-style', { 'has-value': user.email }]" v-model="user.email" type="email"
              autocomplete="email" id="email" required placeholder="Ton adresse e-mail" disabled
              class="forms-input-style" />
            <label for="email" class="forms-input-label">E-mail</label>
            <small class="info-text">✉️ Contactez-nous pour changer d’e-mail.</small>
          </div>

          <!-- Bouton sauvegarde -->
          <button type="submit" class="forms-button">Enregistrer</button>
        </form>
      </section>

      <div class="separator-gradient"></div>

      <!-- Zone de suppression de compte -->
      <section>
        <h2>Supprime ton Compte</h2>
        <div class="danger-zone">
          <h3 class="danger-title">⚠️ Zone dangereuse</h3>
          <p>Pour supprimer votre compte, veuillez entrer la phrase suivante :</p>
          <p><strong>"Je souhaite supprimer mon compte"</strong></p>
          <p>Cela entraînera la suppression <strong>Définitive et Irréversible</strong> de :</p>
          <ul>
            <li>📌 Vos Tampons de Fidélités</li>
            <li>🎁 Vos Loyalties</li>
            <li>🗂️ Vos données personnelles</li>
          </ul>
        </div>
        <input type="text" v-model="deleteCompte" class="delete-input" placeholder="Tape la phrase exacte ici..." />
        <button @click.stop.prevent="handleDelete" :disabled="deleteCompte !== 'Je souhaite supprimer mon compte'"
          class="delete-button">
          Supprimer mon compte
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from '@/store';
import CardFidelity from '@/components/cardFidelity.vue';

export default {
  name: "Profil",
  components: { CardFidelity },
  inject: ['toast'],
  data() {
    return {
      user: {
        name: '',
        last_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
      },
      deleteCompte: ''
    };
  },
  created() {
    const store = useUserStore();

    if (!store.isLoggedIn || !store.user) {
      const cached = localStorage.getItem('user_cache');
      if (cached) {
        const cachedUser = JSON.parse(cached);
        this.user = { ...this.user, ...cachedUser };
      } else {
        this.$router.push('/login');
        return;
      }
    } else {
      this.user = store.user;
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        const store = useUserStore();
        const userId = parseInt(newId);

        if (isNaN(userId) && store.user?.id) {
          this.$router.replace(`/profil/${store.user.id}`);
          return;
        }

        if (isNaN(userId)) {
          this.$router.replace('/');
          return;
        }

        this.fetchUserProfil(userId);
      }
    }
  },
  methods: {
    async fetchUserProfil(userId) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/profil/${userId}`,
          { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        );
        this.user = response.data;
        localStorage.setItem('user_cache', JSON.stringify(response.data));
      } catch (error) {
        this.$router.replace('/');
      }
    },
    async handleSave() {
      const userId = this.$route.params.id;
      const headers = { 'Content-Type': 'application/json' };
      const token = localStorage.getItem('jwt_token');
      if (token) headers['Authorization'] = `Bearer ${token}`;

      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/v1/user/profil/${userId}`,
          {
            name: this.user.name,
            last_name: this.user.last_name,
            phone: this.user.phone,
            date_of_birth: this.user.date_of_birth || null,
            loyalty_points: Number(this.user.loyalty_points) || 0
          },
          { withCredentials: true, headers }
        );

        if (response.data.warning === 'Aucun changement effectué.') {
          this.toast.warning("ℹ️ Aucun changement effectué.");
        } else if (response.data.success) {
          this.toast.success(response.data.message || "✅ Profil mis à jour avec succès !");
        }
      } catch (error) {
        this.toast.error("❌ Une erreur est survenue pendant la sauvegarde.");
      }
    },
    async handleDelete() {
      const userId = this.$route.params.id;
      const headers = { 'Content-Type': 'application/json' };
      const token = localStorage.getItem('jwt_token');
      if (token) headers['Authorization'] = `Bearer ${token}`;

      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/v1/user/delete/${userId}`,
          { withCredentials: true, headers }
        );

        const store = useUserStore();
        this.toast.error("Compte supprimé !");
        await store.logout();
        this.$router.push('/');
      } catch (error) {
        this.toast.error("Erreur pendant la suppression du compte.");
      }
    },
  }
};
</script>

<style scoped>
/* 🧭 Aligne correctement le contenu sur Safari */
input[type="date"]::-webkit-date-and-time-value {
  text-align: left;
}

/* Correction du champ date sur iOS et Safari */
input[type="date"] {
  -webkit-appearance: none;
  appearance: none;
  font-size: 16px;
  background-color: white;
  width: 100%;
  border: 1px solid #ccc;
  color: #333;
  box-sizing: border-box;
}

/* Gère le label flottant pour date si rempli */
input[type="date"].has-value~.forms-input-label,
input[type="date"]:not(:placeholder-shown)~.forms-input-label {
  top: 0.2rem;
  font-size: 0.80rem;
  color: var(--color-focus);
  transform: translateY(3px);
}

.page-container {
  background: transparent !important;
  box-shadow: none;
  width: 50%;
}

.form-wrapper {
  margin-top: 30px;
}

.auth-info-col {
  margin: 0 !important;
}

/* Fix label flottant si input pré-rempli */
.forms-input-style.has-value~.forms-input-label {
  top: 0.2rem;
  font-size: 0.80rem;
  color: var(--color-focus);
  transform: translateY(3px);
}

.forms-input-style[disabled] {
  background-color: #e7e7e7;
  cursor: not-allowed;
  box-sizing: border-box;
}

/* DANGER ZONE */
li {
  list-style: none;
}

.danger-zone {
  background-color: #ffeaea;
  border: 1px solid red;
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  width: 80%;
  display: block;
  margin: 30px auto;
}

.danger-title {
  color: red;
  font-weight: bold;
  margin-bottom: 1rem;
}

.delete-input {
  width: 50%;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  display: block;
  margin: 0 auto;
}

.delete-button {
  display: block;
  margin: 1rem auto 0;
  padding: 0.75rem 1rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: opacity 0.3s;
}

h2 {
  text-align: center;
}

.delete-button:hover {
  background-color: #d62828;
}

.delete-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.email-input {
  max-width: 400px;
  margin: 0 auto 1.5rem;
  /* centre le champ */
}

.forms-button {
  width: 50%;
  margin-top: 50px;
}

/* =============================================
   RESPONSIVE : MOBILE (<768px)
============================================= */
@media (max-width: 768px) {
  .page-container {
    width: 95% !important;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .forms-button {
    width: 80%;
    margin: 0 auto;
    display: block;
  }

  .delete-input {
    width: 90%;
  }

  .danger-zone {
    width: 90%;
  }
}

/* =============================================
   RESPONSIVE : TABLETTE (769px à 1200px)
============================================= */
@media (min-width: 768px) and (max-width: 1200px) {
  .page-container {
    width: 80% !important;
  }
}
</style>
