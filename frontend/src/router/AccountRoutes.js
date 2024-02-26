const AccountRoutes = {
    path: '/account',
    meta: {
      requiresAuth: true
    },
    redirect: '/account/profile',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
          name: 'Profile',
          path: '/account/profile',
          component: () => import('@/views/pages/account/ProfilePage.vue')
        },
    ]
}

export default AccountRoutes;