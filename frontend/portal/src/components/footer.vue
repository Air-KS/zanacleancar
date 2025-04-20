<!--
	./frontend/portal/src/components/header.vue
-->

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
  <!-- Footer -->
  <footer class="footer-container">
    <div class="footer-banner"></div>
    <div class="footer-content">
      <img src="@/assets/produit-footer.png" class="footer-image" alt="car" loading="lazy" />
      <div class="footer-links-container">
        <div class="footer-links">
          <div class="footer-section">
            <h4 class="size">Qui sommes-nous</h4>
            <p>
              <router-link class="footer-link" to="/about">
                À propos
              </router-link>
            </p>
            <p>
              <router-link class="footer-link" to="/howItWorks">
                Comment ça marche
              </router-link>
            </p>
          </div>
          <div class="footer-section">
            <h4 class="size">Ressources</h4>
            <p>
              <router-link class="footer-link" to="/privacyPolicy">
                Politique de confidentialité
              </router-link>
            </p>
            <p>
              <router-link class="footer-link" to="/cancellationPolicy">
                Politique d’annulation
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-contact">Besoin d’aide ? <a href="mailto:contact@zanacleancar.fr">contact@zanacleancar.fr</a></p>
      <div class="footer-icons">
        <a href="https://www.tiktok.com/@zanacleacar" target="_blank">
          <i class="fa-brands fa-tiktok"></i>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61573004206051&locale=fr_FR" target="_blank">
          <i class="fa-brands fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/zanaa.contact" target="_blink">
          <i class="fa-brands fa-instagram"></i>
        </a>
      </div>
    </div>
    <div class="footer-copyright">
      <p>&copy; 2025 Zana Clean Car. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<script>

</script>

<style scoped>
.footer-container {
  background: linear-gradient(to bottom, #4687af 30%, #0a101d 70%);
  padding: 20px;
  text-align: center;
  color: #ffffff;
  position: relative;
  margin-top: 50px;
}

.footer-banner {
  width: 100%;
  background: #000000;
  color: var(--color-bg);
  padding: 30px 0;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  font-weight: bold;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
}

.footer-image {
  width: 100%;
  height: auto;
  max-width: 50%;
  margin-bottom: 20px;
}

.footer-links-container {
  width: 70%;
}

.footer-links {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  border-top: 1px solid var(--color-bg);
  padding: 20px 0;
  text-decoration: none;
}

.footer-link {
  color: var(--color-bg);
  text-decoration: none;
}

.footer-link:hover {
  color: var(--nav-color-hover);
  text-decoration: none;
}

.footer-section {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid var(--color-bg);
  /* Ajouter une bordure horizontale par défaut */
  margin-bottom: 10px;
}

.footer-contact {
  color: var(--color-bg);
  margin: 25px;
}

.footer-contact a {
  color: var(--color-bg);
}

.footer-contact a:hover {
  color: var(--nav-color-hover);
}

.footer-links h4 {
  margin-top: 0px;
  margin-bottom: 5px;
  font-size: 30px;
  color: var(--color-bg);
  text-shadow: 2px 2px 4px #fd0000;
}

/* Supprimer la bordure du dernier et de l'avant-dernier élément */
.footer-section:last-child {
  border-bottom: none;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  border-top: 1px solid var(--color-bg);
}

.footer-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  /* Espace entre les icônes */
  text-shadow: 2px 2px 4px #fd0000;
  margin-bottom: 25px;
}

.footer-icons a {
  color: white;
  text-decoration: none;
}

.footer-icons a:hover {
  color: white;
  text-shadow: 2px 2px 4px var(--nav-color-hover);
}

.footer-copyright {
  display: flex;
  justify-content: center;
  width: 100vw;
  font-size: 16px;
  position: absolute;
  background: #000000;
  right: 0;
  align-items: center;
  padding: 20px;
}

/* Responsiveness */
@media (min-width: 1200px) {
  .footer-links {
    flex-direction: row;
  }

  .footer-section {
    flex: 1;
    text-align: center;
    margin-bottom: 0;
    border-bottom: none;
    border-left: 1px solid var(--color-bg);
  }

  .footer-section:first-child {
    border-left: none;
  }

  .footer-links .footer-section:not(:last-child) {
    border-right: 1px solid var(--color-bg);
  }

  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 10%;
    align-items: center;
  }

  .footer-icons {
    margin: 25px;
  }
}

@media (max-width: 450px) {
  .footer-copyright {
    font-size: 12px;
  }

  .size {
    font-size: 20px !important;
  }

  .footer-contact {
    font-size: 15px;

  }
}
</style>
