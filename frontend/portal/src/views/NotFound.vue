<template>
  <div class="not-found-container">
    <h1 class="not-found-title">404</h1>
    <p class="not-found-message">Oups... cette page n'existe pas ou plus.</p>
    <router-link to="/" class="not-found-home-link">
      ⬅ Retour à l'accueil
    </router-link>
  </div>
</template>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #f9fafb;
  padding: 2rem;
}

.not-found-title {
  font-size: 6rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
}

.not-found-message {
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 2rem;
}

.not-found-home-link {
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.3s;
}

.not-found-home-link:hover {
  background-color: #2563eb;
}
</style>
