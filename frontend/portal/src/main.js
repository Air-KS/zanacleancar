import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './styles/global.css';
import './styles/authPage.css';
import './styles/forms.css';

// Fichier d'import animation
import './styles/animations/auth-animation.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
