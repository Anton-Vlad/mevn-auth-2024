const MainRoutes = {
    path: '/main',
    meta: {
      requiresAuth: true
    },
    redirect: '/main/dashboard/default',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
      {
        name: 'LandingPage',
        path: '/',
        component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
      },
      {
        name: 'Default',
        path: '/dashboard/default',
        component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
      },
      {
        name: 'Starter',
        path: '/starter',
        component: () => import('@/views/StarterPage.vue')
      },
      {
        name: 'Typography',
        path: '/utils/typography',
        component: () => import('@/views/pages/utilities/TypographyPage.vue')
      },
      {
        name: 'Shadows',
        path: '/utils/shadows',
        component: () => import('@/views/pages/utilities/ShadowPage.vue')
      },
      {
        name: 'Colors',
        path: '/utils/colors',
        component: () => import('@/views/pages/utilities/ColorPage.vue')
      },
      {
        name: 'Tabler Icons',
        path: '/icons/tabler',
        component: () => import('@/views/pages/utilities/TablerIcons.vue')
      },
      {
        name: 'Material Icons',
        path: '/icons/material',
        component: () => import('@/views/pages/utilities/MaterialIcons.vue')
      },
    ]
};

export default MainRoutes;