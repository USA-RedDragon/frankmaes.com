import { createApp } from 'vue';
import App from './App.vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App)
  .use(VueReCaptcha, { siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY })
  .use(VueSweetalert2)
  .mount('#app');
