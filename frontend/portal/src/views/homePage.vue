<template>
  <div class="page-container">
    <h1 class="welcome">Bienvenue à tous ! <br /> Site en cours de Rédaction </h1>
    <h2 class="sub-title">Nettoyage intérieur de véhicule</h2><br />

    <p class="description">
      Zana Clean Car est une entreprise de nettoyage spécialisée dans l’entretien des intérieurs de véhicules.
      Que vous ayez besoin d’un nettoyage en profondeur, d’un service précis ou d’exigences complexes...
    </p>

    <br />
    <div class="center-bold" data-aos="fade-right">Zana Clean Car est là pour vous offrir un service de qualité.
    </div><br />

    <p class="description">
      Grâce à des équipements professionnels tels qu’un aspirateur haute performance et une shampouineuse,
      on assure de redonner à vos surfaces une propreté éclatante.
      Notre objectif est de vous offrir un service personnalisé, pratique et efficace,
      pour que chaque espace soit impeccable.
    </p>

    <br />
    <div class="center-bold" data-aos="fade-left">Zana Clean Car met son expertise à votre service.</div><br />

    <h2 class="sub-title">Avant / Après</h2>
    <div class="beforeAfter">
      <div v-for="(item, index) in photos" :key="index">
        <BeforeAfter :before="item.avant1" :after="item.apres1" />
      </div>

      <div v-for="(item, index) in photos" :key="index">
        <BeforeAfter :before="item.avant2" :after="item.apres2" />
      </div>
    </div>

    <div class="img-bancar">
      <img src="@/assets/bancar.png" alt="car" loading="lazy" />
    </div>

    <!-- Info section-->
    <div class="grid-home-info">
      <div class="grid-info-section" id="pick" data-aos="zoom-in">
        <div class="grid-info">
          <div class="grid-icon"></div>
          <h3>Choisissez !</h3>
        </div>
        <p>Choisissez parmi notre large gamme de services adaptés à vos besoins.
          Que vous ayez besoin d'un nettoyage rapide ou en profondeur, nous avons la solution qu’il vous
          faut.
        </p>
      </div>

      <div class="grid-separator"></div>

      <div class="grid-info-section" id="book" data-aos="zoom-in">
        <div class="grid-info">
          <div class="grid-icon"></div>
          <h3>Réservez !</h3>
        </div>
        <p>Contactez directement un de nos agent par téléphone pour réserver votre service.
          Nous nous adaptons à vos disponibilités et vous guidons pour choisir le créneau qui vous
          convient le
          mieux..</p>
      </div>

      <div class="grid-separator"></div>

      <div class="grid-info-section" id="clean" data-aos="zoom-in">
        <div class="grid-info">
          <div class="grid-icon"></div>
          <h3>Néttoyez !</h3>
        </div>
        <p>Profitez d'un moment de tranquillité pendant que nous redonnons à votre véhicule un second
          souffle !
          Nous mettons un point d'honneur à prendre soin de vos demandes et à satisfaire vos besoins !</p>
      </div>
    </div>

    <!-- Middle page -->
    <div class="separator-gradient"></div>
    <br />
    <h2 class="sub-title">Pourquoi Zana Clean Car ?</h2><br />
    <!-- Section 1 -->
    <div class="section" data-aos="fade-right">
      <div class="section-info" id="whyzcc1">
        <h3>Séances 1 à 1 personnalisées</h3>
        <div class="info">
          <div class="whyzcc-icon" aria-label="Why Zana Clean Car Icon"></div>
          <p>
            Nos agents offrent un service sur-mesure pour le nettoyage intérieur de votre véhicule, en
            prenant
            soin de chaque détail, selon vos préférences et exigences. Que ce soit pour un nettoyage
            complet
            ou une
            attention particulière aux zones spécifiques, nous nous engageons à fournir un service de
            qualité.
          </p>
        </div>
      </div>
      <div class="number">
        <img src="@/assets/step/number1.svg" alt="number1" loading="lazy" />
      </div>
    </div>

    <!-- Section 2 -->
    <div class="section" data-aos="fade-left">
      <div class="section-info" id="whyzcc2">
        <h3>Service à domicile</h3>
        <div class="grid-info">
          <div class="whyzcc-icon" aria-label="why service icon"></div>
          <p>
            Nous comprenons que votre emploi du temps peut être chargé, c'est pourquoi nous offrons un
            service
            flexible qui s'adapte à vos besoins. Que ce soit à votre domicile ou à l'adresse de votre
            choix,
            notre
            équipe se déplace où vous le souhaitez. Profitez d’un nettoyage de qualité, rapide et sans
            tracas, selon
            vos disponibilités.
          </p>
        </div>
      </div>
      <div class="number">
        <img src="@/assets/step/number2.svg" alt="number2" loading="lazy" />
      </div>
    </div>

    <!-- Section 3 -->
    <div class="section" data-aos="fade-right">
      <div class="section-info" id="whyzcc3">
        <h3>Disponibilité le jour même</h3>
        <div class="grid-info">
          <div class="whyzcc-icon" aria-label="why service icon"></div>
          <p>
            Besoin d'un nettoyage rapide ? Un nettoyage d'urgence ?
            Nos services sont disponibles à tout moment. Nous nous adaptons à vos besoins pour vous
            offrir
            un
            nettoyage rapide et de qualité. Où que vous soyez, nous nous déplaçons pour satisfaire vos
            besoins !
          </p>
        </div>
      </div>
      <div class="number">
        <img src="@/assets/step/number3.svg" alt="number3" loading="lazy" />
      </div>
    </div>

    <!-- Section 4 -->
    <div class="section" data-aos="fade-left">
      <div class="section-info" id="whyzcc4">
        <h3>Produits efficaces et adaptés</h3>
        <div class="grid-info">
          <div class="whyzcc-icon" aria-label="why service icon"></div>
          <p>
            Nous choisissons des produits de nettoyage qui assurent une propreté éclatante et une
            brillance
            durable
            pour l'intérieur de votre véhicule. Conçus pour être efficaces tout en préservant vos
            surfaces,
            nos
            nettoyants s'adaptent à tous les besoins pour un résultat optimal.
          </p>
        </div>
      </div>
      <div class="number">
        <img src="@/assets/step/number4.svg" alt="number3" loading="lazy" />
      </div>
    </div>

    <!-- SECTION AVIS GOOGLE -->
    <section id="avis-google">
      <div class="elfsight-app-d9b72142-4d5e-4e85-af2a-e4a6732451d9" data-elfsight-app-lazy></div>
    </section>

  </div>
</template>

<script>
import BeforeAfter from "@/components/beforeAfter.vue";
import Before1 from "@/assets/beforeAfter/before1.jpg";
import After1 from "@/assets/beforeAfter/after1.jpg";
import Before2 from "@/assets/beforeAfter/before2.jpg";
import After2 from "@/assets/beforeAfter/after2.jpg";

export default {
  name: "HomePage",
  components: {
    BeforeAfter
  },
  data() {
    return {
      photos: [
        {
          avant1: Before1,
          apres1: After1,
          avant2: Before2,
          apres2: After2,
        },
      ],
    };
  },
  mounted() {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }
}

</script>

<style scoped>
.img-bancar {
  width: 100%;
  display: flex;
  justify-content: center;
}

.img-bancar img {
  width: 90%;
}

.grid-home-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  margin: 0 auto;
  background-color: white;

}

.grid-info-section {
  border: 1px solid var(--color-border);
  background-color: white;
  padding: 15px;
  border-radius: 8px;
}

.grid-info-section h3 {
  margin: 0;
  font-size: 1.5em;
  color: var(--color-separator);
}

.grid-info {
  display: flex;
  align-items: center;
}

.grid-separator {
  display: block;
  width: 100%;
  border-bottom: 2px solid var(--color-separator);
}

.grid-icon {
  width: 40px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 10px;
}

.whyzcc-icon {
  width: 70px;
  height: 70px;
  background-size: contain;
  align-items: center;
  background-repeat: no-repeat;
  margin-right: 15px;
  flex-shrink: 0;
  /* Pour empêcher l'icône de rétrécir */
}

/* ================================
      Section
      ================================ */
.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
}

.section-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: flex-start;
  margin: 10px 0;
  padding: 10px;
}

.section-info h3 {
  margin: 0;
  font-size: 1.2em;
  color: var(--color-separator);

}

.info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
}

#pick .grid-icon {
  background-image: url("@/assets/pick-it.svg");
}

#book .grid-icon {
  background-image: url("@/assets/book-it.svg");
}

#clean .grid-icon {
  background-image: url("@/assets/spray.svg");
}

#whyzcc1 .whyzcc-icon {
  background-image: url('@/assets/step/whyzcc1.svg');
}

#whyzcc2 .whyzcc-icon {
  background-image: url('@/assets/step/whyzcc2.svg');
}

#whyzcc3 .whyzcc-icon {
  background-image: url('@/assets/step/whyzcc3.svg');
}

#whyzcc4 .whyzcc-icon {
  background-image: url('@/assets/step/whyzcc4.svg');
}

@media (max-width: 1024px) {
  .number {
    display: none;
  }
}

@media (max-width: 599px) {
  .grid-home-info {
    flex-direction: column;
    margin-left: -50px;
    width: calc(100% + 10%);
    gap: 5px;
  }

  .grid-info-section {
    border-left: none;
    border-radius: 0 25px 25px 0;
    padding: 10px 10px 10px 50px;
  }

  .img-bancar {
    margin-left: -20px;
  }

  .grid-separator {
    border: none;
  }
}

@media (min-width: 600px) and (max-width: 1199px) {
  .grid-home-info {
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
  }

  .grid-info-section {
    border-radius: 25px;
    padding: 10px;
  }

  .grid-separator {
    border: none;
  }
}

@media (min-width: 1025px) {
  .section {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
    margin: 0 auto;
  }

  .section-info h3 {
    margin-bottom: 10px;
  }

  .section-info .number {
    margin-left: 100px;
  }
}

@media (min-width: 1200px) {
  .grid-info-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: none;
    gap: 5px;
  }

  .grid-home-info {
    display: flex;
    justify-content: space-between;
    border: solid 2px var(--color-border);
    border-radius: 25px;
  }

  .grid-separator {
    width: 1px;
    margin: 0 auto;
    background-color: var(--color-separator);
  }

  .grid-info-section h3 {
    margin: 50;
    font-size: 1.5em;
    color: var(--color-separator);
  }
}
</style>
