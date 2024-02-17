import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import App from './App.vue'

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(vuetify).mount('#app');
