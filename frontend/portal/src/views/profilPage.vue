<template>
  <div class="page-container">

    <!-- Infos de confiance -->
    <section>
      <div class="auth-info-col">
        <h2 class="auth-title">Confidentialité des informations !</h2>
        <p>
          Les données personnelles renseignées ici sont uniquement visibles par vous et les administrateurs du
          site.
          Elles ne seront jamais partagées, ni utilisées à des fins commerciales.<br /><br />
          Toutes les informations sont stockées de manière sécurisée et restent strictement à but informatif.
          Votre vie privée est notre priorité. 🤝
        </p>
      </div>
    </section>

    <!-- Formulaire de profil -->
    <div class="form-wrapper">
      <div>
        <h2 class="form-title">Ta cartes de Fidélité</h2>
        <CardFidelity v-if="user.name && user.loyalty_points !== undefined" :stamps="7" :name="user.name"
          :lastName="user.last_name" :dateOfBirth="user.date_of_birth" :loyalty_points="user.loyalty_points"
          :userId="user.id" />
      </div>
      <h2 class="form-title">Ton Profil</h2>

      <section>
        <form class="fade-in-up" @submit.prevent="handleSave">

          <div class="form-row">
            <!-- Prénom -->
            <div class="form-group">
              <div class="forms-input-container">
                <input :class="{ 'has-value': user.name }" v-model="user.name" type="text" autocomplete="family-name"
                  id="name" required placeholder="Ton nom de famille" class="forms-input-style" />
                <label for="name" class="forms-input-label">Prénom</label>
              </div>
            </div>

            <!-- Nom -->
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

          <!-- E-mail -->

          <div class="forms-input-container email-input">
            <input :class="{ 'has-value': user.email }" v-model="user.email" type="email" autocomplete="email"
              id="email" required placeholder="Ton adresse e-mail" disabled class="forms-input-style" />
            <label for="email" class="forms-input-label">E-mail</label>
            <small class="info-text">✉️ Contactez-nous pour changer d’e-mail.</small>
          </div>


          <!-- Bouton -->
          <button type="submit" class="forms-button">Enregistrer</button>
        </form>
      </section>

      <div class="separator-gradient"></div>

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
  components: {
    CardFidelity,
  },
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
    const cached = localStorage.getItem('user_cache');
  if (cached) {
    this.user = JSON.parse(cached);
    this.toast?.info("💾 Données affichées en cache.");
  }

  this.fetchUserProfil(); // toujours tenter une requête serveur
},
  methods: {
    testToast() {
      console.log("Toast injecté ?", this.toast);
      this.toast?.success("🎉 Toast injecté et fonctionnel !");
    },
    async fetchUserProfil() {
      const userId = parseInt(this.$route.params.id);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/profil/${userId}`,
          { withCredentials: true }
        );

        console.log("Données utilisateur récupérées :", response.data);
        console.log("✅ Données utilisateur :", this.user);

        if (response.data.redirect && response.data.ownId !== userId) {
          window.location.href = `/profil/${response.data.ownId}`;
          return;
        }

        this.user = response.data;

        // Fallback si Safari perd la session
        localStorage.setItem('user_cache', JSON.stringify(response.data));
      } catch {
        console.error("❌ Erreur récupération profil :", error.response || error);

        const store = useUserStore();
        const ownId = store.user?.id;

        if (ownId) {
          window.location.href = `/profil/${ownId}`;
        } else {
          window.location.href = '/';
        }
      }
    },
    async handleSave() {
      const userId = this.$route.params.id;
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/v1/user/profil/${userId}`,
          {
            name: this.user.name,
            last_name: this.user.last_name,
            phone: this.user.phone,
            date_of_birth: this.user.date_of_birth,
            loyalty_points: Number(this.user.loyalty_points)
          },
          { withCredentials: true }
        );

        if (response.data.warning === 'Aucun changement effectué.') {
          this.toast.warning("ℹ️ Aucun changement effectué.");
        } else if (response.data.success) {
          this.toast.success(response.data.message || "✅ Profile mis à jour avec succès !");
        }
      } catch (error) {
        console.error("❌ Erreur lors de la mise à jour :", error);
        this.toast.error("❌ Une erreur est survenue pendant la sauvegarde.");
      }
    },

    async handleDelete() {
      const userId = this.$route.params.id;
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/v1/user/delete/${userId}`,
          { withCredentials: true }
        );

        const store = useUserStore();
        this.toast.error("Compte supprimé !");
        await store.logout();
        setTimeout(() => {
          this.$router.push('/');
        }, 1000);
      } catch (error) {
        console.error("Erreur suppression :", error);
        this.toast.error("Erreur pendant la suppression du compte.");
      }
    },
  }
};
</script>

<style scoped>
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
.forms-input-style.has-value+.forms-input-label {
  top: 0.1rem;
  font-size: 0.80rem;
  color: var(--color-focus);
  transform: translateY(3px);
}

.forms-input-style[disabled] {
  background-color: #e7e7e7;
  cursor: not-allowed;
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
