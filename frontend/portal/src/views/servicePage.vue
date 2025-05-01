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
        <strong>Nous utilisons du matériel professionnel et des produits
          adaptés</strong>, pour garantir un nettoyage efficace et sans risque pour votre
        voiture.
      </p>
    </section>

    <p class="sub-title">Nos Pack</p>
    <p style="text-align: center; font-size: 15px">
      <strong>🛻 Déplacement : 💶 10€ / 25 min à partir de Roubaix</strong>
    </p>
    <br />
    <div class="arrow-down">
      <img src="@/assets/arrow-down.png" alt="arrow-down" />
    </div>

    <section class="service-list">
      <!-- Service 1 - Pack Eclat -->
      <article class="service-card">
        <div class="service-header">
          <div class="service-info">
            <img class="service-icon" src="@/assets/Pack/badge-eclair.png" alt="Pack Éclat" />
            <h2 class="service-title">Pack Éclat</h2>
          </div>
          <span class="service-price">💶 60€</span>
        </div>
        <p class="service-description">
        <p><strong>Intérieur complet – Léger entretien</strong></p>
        <p>Parfait pour les véhicules du quotidien qui ont simplement besoin d’un petit rafraîchissement.</p>
        <p>Ce pack est idéal si tu veux retrouver un habitacle propre et agréable sans y consacrer trop de temps.</p>
        <p>C’est le bon compromis entre rapidité et efficacité pour garder ta voiture toujours présentable.</p>
        <p><strong>Un service discret mais qui fait toute la différence au quotidien.</strong></p>
        </p>
      </article>

      <!-- Service 2 - Pack Brillance -->
      <article class="service-card">
        <div class="service-header">
          <div class="service-info">
            <img class="service-icon" src="@/assets/Pack/badge-eau.png" alt="Pack Brillance" />
            <h2 class="service-title">Pack Brillance</h2>
          </div>
          <span class="service-price">💶 90€</span>
        </div>
        <p class="service-description">
        <p><strong>Nettoyage intérieur complet – Soin approfondi</strong></p>
        <p>Conçu pour les véhicules qui montrent clairement les signes du quotidien : poussière incrustée, taches
          visibles, traces de vie.</p>
        <p>Ce pack va bien plus loin qu’un simple rafraîchissement : il redonne une vraie allure à ton intérieur, avec
          une finition soignée et durable.</p>
        <p>Idéal si tu veux retrouver le plaisir d’un habitacle net, propre, accueillant.</p>
        <p><strong>Assez complet pour te faire redécouvrir ton habitacle sous un nouveau jour.</strong></p>
        </p>
      </article>

      <!-- Service 3 - Pack Prestige -->
      <article class="service-card">
        <div class="service-header">
          <div class="service-info">
            <img class="service-icon" src="@/assets/Pack/badge-feu.png" alt="Pack Préstige" />
            <h2 class="service-title">Pack Préstige</h2>
          </div>
          <span class="service-price">💶 130€</span>
        </div>
        <p class="service-description">
        <p><strong>Nettoyage intérieur complet – Traitement intensif</strong></p>
        <p>Parfait pour les intérieurs très sales, négligés ou laissés à l’abandon.</p>
        <p>Ici, on parle d’une rénovation complète pour redonner vie à un habitacle abîmé par le temps, les enfants, les
          animaux ou les oublis.</p>
        <p>Ce pack va au bout des choses : chaque recoin est traité avec minutie pour un résultat spectaculaire.</p>
        <p>Si tu veux rouler dans une voiture propre comme au premier jour, c’est ce qu’il te faut.</p>
        <p><strong>Un nettoyage profond, pensé pour transformer l’intérieur, pas juste le nettoyer.</strong></p>
        </p>
      </article>

      <!-- Service 4 - Pack Spécial avant-vente -->
      <article class="service-card">
        <div class="service-header">
          <div class="service-info">
            <img class="service-icon" src="@/assets/Pack/badge-etoile.png" alt="Pack Spécial Avant-Vente" />
            <h2 class="service-title">Pack Spécial Avant-Vente</h2>
          </div>
          <span class="service-price">💶 170€</span>
        </div>
        <p class="service-description">
        <p><strong>Rénovation complète pour la revente</strong></p>
        <p>Pensé pour ceux qui veulent vendre leur véhicule rapidement et au meilleur prix.</p>
        <p>Ce pack offre une présentation irréprochable de l’intérieur, pour séduire l’acheteur dès l’ouverture des
          portes.</p>
        <p>Chaque détail compte : propreté, odeur, aspect visuel… tout est fait pour inspirer confiance et créer le
          coupde cœur.</p>
        <p><strong>Un véritable argument de vente, visuel, propre, prêt à convaincre.</strong></p>
        </p>
      </article>

      <p class="sub-title" style="padding-top: 50px">💼 Petits budgets & Entretiens rapides</p>

      <p>💡 Ces packs express sont pensés pour les besoins simples ou ponctuels.
        Pas de nettoyage en profondeur ici — Juste l’essentiel pour garder votre voiture présentable au quotidien.</p>

      <!-- Service 5 - Pack Bronze -->
      <article class="service-card">
        <div class="service-header">
          <div class="service-info">
            <img class="service-icon" src="@/assets/Pack/badge-plante.png" alt="Pack Express" />
            <h2 class="service-title">Pack Express ~ 25m 🕒</h2>
          </div>
          <span class="service-price">💶 25€</span>
        </div>
        <p class="service-description">
        <p>Rapide et efficace pour un coup de propre immédiat.</p>
        <p>Parfait pour les gens pressés ou les entretiens réguliers.</p>
        <p><strong><em>⚠️ Ne comprend pas les prestations complètes des grands packs.</em></strong></p>
        </p>
        <ul class="service-features">
          <li>
            ✔️ Aspiration rapide <span class="stars" data-stars="1"></span>
          </li>
          <li>✔️ Tableau de bord</li>
          <li>✔️ Nettoyage rapide des plastiques</li>
        </ul>
      </article>

      <!-- Service 6 - Pack Gold -->
      <article class="service-card">
        <div class="service-header">
          <div class="service-info">
            <img class="service-icon" src="@/assets/Pack/badge-vent.png" alt="Pack Confort" />
            <h2 class="service-title">Pack Confort ~ 45m 🕒</h2>
          </div>
          <span class="service-price">💶 35€</span>
        </div>
        <p class="service-description">
        <p>Un nettoyage simple et soigné, pour garder un intérieur agréable sans y passer des heures.</p>
        <p>Idéal pour les véhicules du quotidien, ce pack couvre les bases essentielles sans traitement en profondeur.
        </p>
        <p><strong><em>⚠️ Ne comprend pas les prestations complètes des grands packs.</em></strong></p>
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

      <!-- Service 7 - Pack Diamond -->
      <article class="service-card">
        <div class="service-header">
          <div class="service-info">
            <img class="service-icon" src="@/assets/Pack/badge-terre.png" alt="Pack Premium" />
            <h2 class="service-title">Pack Premium ~ 60m 🕒</h2>
          </div>
          <span class="service-price">💶 45€</span>
        </div>
        <p class="service-description">
        <p>Pensé pour rafraîchir un habitacle visiblement sale, sans aller jusqu’à la rénovation totale.</p>
        <p>Un bon compromis pour les petits budgets qui veulent un résultat propre et net.</p>
        <p><strong><em>⚠️ Ce pack reste une version allégée, sans nettoyage intégral ou ultra-détaillé.</em></strong>
        </p>
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

      <p class="sub-title" style="padding-top: 50px">🎁 Pack Fidélité – Ton nettoyage offert</p>

      <p>💡 Ton habitude d’entretien est récompensée : compose ton propre service, c’est mérité !</p>

      <!-- Service 8 - Pack Cosmos -->
      <article class="service-card">
        <div class="service-header">
          <div class="service-info">
            <img class="service-icon" src="@/assets/Pack/badge-cosmos.png" alt="Pack Cosmos" />
            <h2 class="service-title">Pack Cosmos – Offert</h2>
          </div>
          <span class="service-price">💶 0€</span>
        </div>
        <p class="service-description">
        <p>Un service personnalisé, offert (après 7 lavages).</p>
        <p>Le sourire sur ta carte de fidélité, nous le confirme : Tu mérites ce pack personnalisé !</p>
        <p><strong>Compose ton propre service : choisis 1 prestation dans chaque duo :</strong></p>
        </p>
        <ul class="service-features">
          <li>✔️ Aspiration ou Shampouineuse <span class="stars" data-stars="2"></span></li>
          <li>✔️ Tapis ou moquette</li>
          <li>✔️ Tableau de bord ou plastique</li>
          <li>✔️ Portes ou Vitres</li>
        </ul><br>
        <p>🛠️ Sois créatif, choisis ce qui compte pour toi.</p>
        <p><strong>Nous, on assure derrière — avec la même qualité que n’importe quel pack.</strong></p>
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
            <span class="service-name" style="margin-left: 10px">✔️ Aspiration standard</span>
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
            <span class="service-name" style="margin-left: 10px">✔️ Aspiration renforcée</span>
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
            <span class="service-name" style="margin-left: 10px">✔️ Aspiration puissante</span>
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
            <span class="service-name" style="margin-left: 10px">✔️ Shampouineuse standard</span>
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
            <span class="service-name" style="margin-left: 10px">✔️ Shampouineuse renforcée</span>
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
            <span class="service-name" style="margin-left: 10px">✔️ Rénovation plastiques intérieurs</span>
          </div>
          <span class="service-price">💶 +10€</span>
        </div>
        <p class="service-desc">* Finition satinée, effet neuf</p>
      </article>

      <!-- ===== TRAITEMENT CUIR ===== -->
      <article class="service-features">
        <div class="service-header">
          <div class="service-title">
            <span class="service-name" style="margin-left: 10px">✔️ Traitement cuir</span>
          </div>
          <span class="service-price">💶 +10€</span>
        </div>
        <p class="service-desc">* Nettoyage doux + baume nourrissant</p>
      </article>

      <!-- ===== TRAITEMENT ANTI-ODEURS BACTERICIDES ===== -->
      <article class="service-features">
        <div class="service-header">
          <div class="service-title">
            <span class="service-name" style="margin-left: 10px">✔️ Traitement anti-odeurs
              (bactéricide)</span>
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
            <span class="service-name" style="margin-left: 10px">✔️ Carte de Fidélité ➕ Loyauté</span>
          </div>
        </div>
        <div class="service-desc">
          <p>* 7 tampons = 1 Pack Cosmos OFFERT</p>
          <p>* 2 points par € dépensé → échangeables contre des bonus ou avantages</p>
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

  .service-description,
  .service-features,
  .service-desc {
    font-size: 12px;
  }

  .service-title,
  .service-price,
  .service-name,
  .sub-title {
    font-size: 14px;
  }

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
