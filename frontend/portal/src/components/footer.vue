<!--
	./frontend/portal/src/components/header.vue
-->

<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
<!-- Footer -->
<footer class="footer-container">
  <div class="footer-banner"></div>
  <div class="footer-content">
    <img class="footer-image" data-src="produit-footer.png" alt="Car" />
    <div class="footer-links-container">
      <div class="footer-links">
        <div class="footer-section">
          <h4>Qui sommes-nous</h4>
          <p><a id="about-footer" class="footer-link">À propos</a></p>
          <p><a id="howItWorks-footer" class="footer-link">Comment ça marche</a></p>
          <p><a id="contact-footer" class="footer-link"> Contact </a></p>
        </div>
        <div class="footer-section">
          <h4>Ressources</h4>
          <p><a id="privacyPolicy-footer" class="footer-link"> Politique de confidentialité </a></p>
          <p><a id="cancellationPolicy-footer" class="footer-link"> Politique d’annulation </a></p>
          <p><a id="faq-footer" class="footer-link"> FAQ </a></p>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p class="footer-contact">Besoin d’aide ? contact.zanaa@gmail.com</p>
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
  color: var(--color-background);
  padding: 30px 0;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  font-size: 20px;
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
  border-top: 1px solid var(--color-background);
  padding: 20px 0;
  text-decoration: none;
}

.footer-link {
  color: var(--color-background);
  text-decoration: none;
}

.footer-link:hover {
  color: var(--nav-color-hover);
  text-decoration: none;
}

.footer-section {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid var(--color-background);
  /* Ajouter une bordure horizontale par défaut */
  margin-bottom: 10px;
}

.footer-links h4 {
  margin-top: 0px;
  margin-bottom: 5px;
  font-size: 30px;
  color: var(--color-background);
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
  border-top: 1px solid var(--color-background);
  padding: 30px 0px 30px 0px;
}

.footer-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px; /* Espace entre les icônes */
  text-shadow: 2px 2px 4px #fd0000;
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
    border-left: 1px solid var(--color-background);
  }

  .footer-section:first-child {
    border-left: none;
  }

  .footer-links .footer-section:not(:last-child) {
    border-right: 1px solid var(--color-background);
  }

  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 10%;
    align-items: center;
  }
}
</style>
