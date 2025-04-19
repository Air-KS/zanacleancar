<template>
  <div class="page-container">
    <section class="intro-section">
      <h1 class="page-title">Nos Services</h1>
      <p class="description">
        👉 <strong>Avant de nous confier votre véhicule</strong>, pensez à
        retirer vos effets personnels. Nous ne pourrons être tenus responsables
        en cas de perte ou d’aspiration accidentelle.
      </p>
      <br />
      <p class="description">
        <strong
          >Nous utilisons du matériel professionnel et des produits
          adaptés</strong
        >, pour garantir un nettoyage efficace et sans risque pour votre
        voiture.
      </p>
    </section>

    <p class="sub-title">Nos Pack</p>
    <p style="text-align: center; font-size: 15px">
      <strong>🛻 Déplacement : 💶 10€ / 30 min à partir de Roubaix</strong>
    </p>
    <br />
    <div class="arrow-down">
      <img src="@/assets/arrow-down.png" alt="arrow-down" />
    </div>
    <section class="service-list">
      <!-- Service 1 - Pack Bronze -->
      <article class="service-card">
        <div class="service-header">
          <div class="service-info">
            <img
              class="service-icon"
              src="@/assets/Pack/bronze.png"
              alt="Pack Bronze"
            />
            <h2 class="service-title">Pack Express +/- 25Minutes</h2>
          </div>
          <span class="service-price">💶 25€</span>
        </div>
        <p class="service-description">
          Rapide et efficace pour un coup de propre immédiat.<br />
          Parfait pour les gens pressés ou les entretiens réguliers.
        </p>
        <ul class="service-features">
          <li>
            ✔️ Aspiration rapide <span class="stars" data-stars="1"></span>
          </li>
          <li>✔️ Tableau de bord</li>
          <li>✔️ Nettoyage rapide des plastiques</li>
        </ul>
      </article>
      <!-- Service 2 - Pack Gold -->
      <article class="service-card">
        <div class="service-header">
          <div class="service-info">
            <img
              class="service-icon"
              src="@/assets/Pack/gold.png"
              alt="Pack Gold"
            />
            <h2 class="service-title">Pack Confort +/- 45Minutes</h2>
          </div>
          <span class="service-price">💶 35€</span>
        </div>
        <p class="service-description">
          Un nettoyage complet et soigné pour un intérieur propre et
          agréable.<br />
          Idéal pour un véhicule utilisé au quotidien.
        </p>
        <ul class="service-features">
          <li>
            ✔️ Aspiration complète <span class="stars" data-stars="2"></span>
          </li>
          <li>✔️ Shampouineuse <span class="stars" data-stars="1"></span></li>
          <li>✔️ Nettoyage plastiques</li>
          <li>✔️ Tableau de bord</li>
          <li>✔️ Vitres intérieures</li>
        </ul>
      </article>

      <!-- Service 3 - Pack Diamond -->
      <article class="service-card">
        <div class="service-header">
          <div class="service-info">
            <img
              class="service-icon"
              src="@/assets/Pack/diamond.png"
              alt="Pack Diamond"
            />
            <h2 class="service-title">Pack Premium +/- 1heure</h2>
          </div>
          <span class="service-price">💶 45€</span>
        </div>
        <p class="service-description">
          Un nettoyage en profondeur pour un habitacle comme neuf.<br />
          Parfait pour les voitures très sales ou avant revente.
        </p>
        <ul class="service-features">
          <li>
            ✔️ Aspiration approfondie <span class="stars" data-stars="3"></span>
          </li>
          <li>
            ✔️ Shampouineuse approfondie
            <span class="stars" data-stars="2"></span>
          </li>
          <li>✔️ Nettoyage complet plastiques</li>
          <li>✔️ Tableau de bord</li>
          <li>✔️ Nettoyage complet des vitres</li>
          <li>✔️ Carrosserie intérieure</li>
        </ul>
      </article>
    </section>

    <!-- ========================================
     SECTION - OPTION À LA CARTES
=================================================
================================================= -->
    <section>
      <p class="sub-title" style="padding-top: 50px">➕ OPTIONS À LA CARTE</p>

      <!-- Aspiration standard -->
      <article class="service-item">
        <div class="service-header">
          <div class="service-title">
            <span class="service-name" style="margin-left: 30px"
              >✔️ Aspiration standard</span
            >
            <span class="stars" data-stars="1"></span>
          </div>
          <span class="service-price">💶 10€</span>
        </div>
        <p class="service-desc">
          * Poussière légère, saletés superficielles...
        </p>
      </article>

      <!-- Aspiration renforcée -->
      <article class="service-item">
        <div class="service-header">
          <div class="service-title">
            <span class="service-name" style="margin-left: 30px"
              >✔️ Aspiration renforcée</span
            >
            <span class="stars" data-stars="2"></span>
          </div>
          <span class="service-price">💶 15€</span>
        </div>
        <p class="service-desc">* Miettes incrustées & Poussière collante...</p>
      </article>

      <!-- aspiration complète -->
      <article class="service-item">
        <div class="service-header">
          <div class="service-title">
            <span class="service-name" style="margin-left: 30px"
              >✔️ Aspiration puissante</span
            >
            <span class="stars" data-stars="3"></span>
          </div>
          <span class="service-price">💶 20€</span>
        </div>
        <p class="service-desc">
          * Idéal pour les poils d’animaux & Tapis épais...
        </p>
      </article>

      <!-- Shampouineuse standard -->
      <article class="service-item">
        <div class="service-header">
          <div class="service-title">
            <span class="service-name" style="margin-left: 30px"
              >✔️ Shampouineuse standard</span
            >
            <span class="stars" data-stars="1"></span>
          </div>
          <span class="service-price">💶 15€</span>
        </div>
        <p class="service-desc">
          * Rafraîchissement des sièges & Tapis propres...
        </p>
      </article>

      <!-- Shampouineuse renforcée -->
      <article class="service-item">
        <div class="service-header">
          <div class="service-title">
            <span class="service-name" style="margin-left: 30px"
              >✔️ Shampouineuse renforcée</span
            >
            <span class="stars" data-stars="2"></span>
          </div>
          <span class="service-price">💶 25€</span>
        </div>
        <p class="service-desc">
          * Pour les taches apparentes et sièges très sales...
        </p>
      </article>
    </section>

    <!-- ========================================
      SECTION - ENTRETIEN & SOINS
=================================================
================================================= -->
    <section>
      <p class="sub-title">🧼 ENTRETIEN & SOINS</p>

      <!-- ===== RENOVATION PLASTIQUE INTERIEUR ===== -->
      <article class="service-features">
        <div class="service-header">
          <div class="service-title">
            <span class="service-name" style="margin-left: 30px"
              >✔️ Rénovation plastiques intérieurs</span
            >
          </div>
          <span class="service-price">💶 +10€</span>
        </div>
        <p class="service-desc">* Finition satinée, effet neuf</p>
      </article>

      <!-- ===== TRAITEMENT CUIR ===== -->
      <article class="service-features">
        <div class="service-header">
          <div class="service-title">
            <span class="service-name" style="margin-left: 30px"
              >✔️ Traitement cuir</span
            >
          </div>
          <span class="service-price">💶 +10€</span>
        </div>
        <p class="service-desc">* Nettoyage doux + baume nourrissant</p>
      </article>

      <!-- ===== TRAITEMENT ANTI-ODEURS BACTERICIDES ===== -->
      <article class="service-features">
        <div class="service-header">
          <div class="service-title">
            <span class="service-name" style="margin-left: 30px"
              >✔️ Traitement anti-odeurs (bactéricide)</span
            >
          </div>
          <span class="service-price">💶 +10€</span>
        </div>
        <p class="service-desc">
          * Supprime odeurs profondes (animaux, tabac…)
        </p>
      </article>
    </section>

    <!-- ========================================
      SECTION - BONUS
=================================================
================================================= -->
    <section>
      <div class="sub-title-bonus">⚡ BONUS</div>
      <p class="sub-title-bonus-desc">Connectez-vous pour voir votre cartes</p>

      <!-- ===== CARTES DE FIDELITE ===== -->
      <article class="service-item">
        <div class="service-header">
          <div class="service-title">
            <span class="service-name" style="margin-left: 30px"
              >✔️ Carte de Fidélité ➕ Loyalties</span
            >
          </div>
        </div>
        <div class="service-desc">
          <p>* 7 nettoyages = 1 Pack Express OFFERT</p>
          <p>* 2 points de Loyalties / €</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: "ServicePage",
};
</script>

<style scoped>
/* TITRES */
.page-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.sub-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 50px 50px;
}
.sub-title-bonus {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
}

.sub-title-bonus-desc {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  padding-bottom: 50px;
}

/* SECTIONS SERVICES */
.service-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.service-card {
  padding: 15px;
  border-radius: 10px;
  background: var(--color-background-serviceCard);
  border: 1px solid var(--color-separator);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 1s ease, border-color 1s ease, box-shadow 1s ease;
}

.service-card:hover {
  background-color: var(--color-pack-hover);
  border-color: var(--color-pack-hover-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 1s ease, border-color 1s ease, box-shadow 1s ease;
}

/* EN-TÊTE DU SERVICE */
.service-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  width: 100%;
}

.service-title {
  display: flex;
  align-items: center;
  gap: 5px;
  /* Espace entre l'étoile et le service */
  font-size: 15px;
}

/* PRIX */
.service-price {
  color: var(--color-border);
  font-weight: bold;
  font-size: 20px;
  min-width: 60px;
  text-align: right;
}

/* DESCRIPTION */
.service-desc {
  color: #666;
  text-align: left;
  padding-left: 30px;
  margin-top: 3px;
  width: 100%;
}

/* CONTENEUR SERVICE */
.service-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 5px 0;
}

/* LISTE DES SERVICES */
.service-features {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
}

/* ÉTOILES */
.stars {
  display: flex;
  gap: 2px;
}

.stars::before {
  content: "⭐";
  /* Une étoile par défaut */
  font-size: 14px;
  text-shadow: 1px 1px 9px var(--color-border-shadow);
}

.stars[data-stars="1"]::before {
  content: "⭐";
}

.stars[data-stars="2"]::before {
  content: "⭐⭐";
}

.stars[data-stars="3"]::before {
  content: "⭐⭐⭐";
}

/* ICÔNES SERVICES */
.service-icon {
  width: 40px;
  height: auto;
  border: solid 2px var(--color-border);
  border-radius: 10px;
}

/* ALIGNEMENT PRIX & NOM SERVICE */
.service-name {
  flex: 1;
  text-align: left;
}

/* MISE EN PAGE GÉNÉRALE */
.service-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* FLECHE BAS */
.arrow-down {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding-bottom: 30px;
}

.arrow-down img {
  width: 100px;
  height: auto;
}

/* RESPONSIVE */

@media (max-width: 600px) {
  .page-container {
    width: 80%;
  }

  .service-icon {
    width: 50px;
  }

  .service-price,
  .service-name,
  .service-desc {
    font-size: 14px;
  }

  .sub-title,
  .sub-title-bonus,
  .sub-title-bonus-desc {
    font-size: 16px;
  }
}

@media (min-width: 600px) and (max-width: 1199px) {
  .page-container {
    width: 80%;
  }

  .service-icon {
    width: 50px;
  }

  .service-title,
  .price {
    font-size: 18px;
  }
}

@media (min-width: 1200px) {
  .page-container {
    width: 60%;
  }

  .service-icon {
    width: 60px;
  }

  .service-title,
  .price {
    font-size: 20px;
  }
}
</style>
