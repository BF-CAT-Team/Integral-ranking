// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'assist',
        home: 'Assist',
        component: () => import('@/views/Helps.vue'),
      },
      {
        path: 'season',
        home: 'Season',
        component: () => import('@/views/Season.vue'),
      },
      {
        path: 'season/detail',
        home: 'SeasonDetail',
        component: () => import('@/views/SeasonDetail.vue'),
      },
      {
        path: 'achievements',
        home: 'Achievements',
        component: () => import('@/views/Achievements.vue'),
      },
      {
        path: 'my',
        home: 'My',
        component: () => import('@/views/My.vue'),
      }
    ],
  },
  // otherwise redirect to home
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    home: 'NotFount',
    component: () => import('@/views/NotFount.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.onError(() => {

})

export default router
