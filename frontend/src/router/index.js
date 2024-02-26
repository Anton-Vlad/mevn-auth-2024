import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AccountRoutes from './AccountRoutes';
import AuthRoutes from './AuthRoutes';
import { useAuthStore } from '@/stores/auth';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    MainRoutes,
    AccountRoutes,
    AuthRoutes
  ]
});

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/auth/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // console.log('AUTHENTICATED ROUTE')
    // Check if the user has a active auth store (from one vue route to another)
    // on browser refresh, the vue store gets cleared, ant the user will no longer exist,  BUT th cookie token remains
    if (authRequired && !auth.user) {
      // console.log('NO AUTH USER STORE')
      // verify if the user has a valid token in the cookie
      await auth.rehydrateSession();

      // If the Session hydration was successfull,  the user should have an auth store.
      if (auth.user) {
        // console.log('SESSION HYDRATED SUCCESSFULLY')
        return next();

      // If it wasn't successfull, it means the token was invalid, and the user has to be redirected to Login.
      } else {
        // console.log('SESSION HYDRATION ERROR')
        return next('/auth/login');
      }
    // Else, if auth is required, but I have user data in the store, let it pass
    } else {
      // console.log('ACTIVE AUTH USER STORE')
      next();
    };
  // Else, if auth is NOT required, let it pass anyway
  } else {
    // console.log('FREE ROUTE')
    next();
  }
});