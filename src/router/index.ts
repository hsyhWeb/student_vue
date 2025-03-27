import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/discover'
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('../views/DiscoverView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/chat/knowledge',
      name: 'knowledge-chat',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/chat/ppt',
      name: 'ppt-chat',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/chat/grade',
      name: 'grade-chat',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/HistoryView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

export default router
