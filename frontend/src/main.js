import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import vuetify from "./plugins/vuetify";
import "@/scss/style.scss";
import App from "./App.vue";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import VueApexCharts from "vue3-apexcharts";
import VueTablerIcons from "vue-tabler-icons";
import { useAuthStore } from "./stores/auth";


startApp();

// async start function to enable waiting for refresh token call
async function startApp () {
    const app = createApp(App);
    app.use(router);
    app.use(PerfectScrollbar);
    app.use(createPinia());
    app.use(VueTablerIcons);
    app.use(VueApexCharts);
    app.use(vuetify);

    // attempt to auto refresh token before startup
    try {
        const authStore = useAuthStore();
        await authStore.rehydrateSession();
    } catch {
        // catch error to start app on success or failure
    }

    app.mount('#app');
}
