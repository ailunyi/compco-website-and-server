import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    if (from.matched[0] != to.matched[0]){
      //from.path.split(window.location.hostname)[1].split("/")[1];
      return { top: 0}
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/explore',
      name: 'explore',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/explore.vue'),
      props:{
        exploreIndex:0
      },
      children:[
        {
          path: '',
          name: 'explore all',
          component: () => import('../views/explore/all.vue'),
          props:{
            exploreIndex:1
          }
        },
        {
          path: 'subject',
          name: 'explore subject',
          component: () => import('../views/explore/subject.vue'),
          props:{
            exploreIndex:1
          }
        },
        {
          path: 'sports',
          name: 'explore sports',
          component: () => import('../views/explore/sports.vue'),
          props:{
            exploreIndex:2
          }
        },
        {
          path: 'hobbies',
          name: 'explore hobbies',
          component: () => import('../views/explore/hobbies.vue'),
          props:{
            exploreIndex:3
          }
        },
        {
          path: 'other',
          name: 'explore other',
          component: () => import('../views/explore/other.vue'),
          props:{
            exploreIndex:4
          }
        },
      ]
    },
    
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/signIn.vue'),
      props:{
        signIn: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/signIn.vue'),
      props:{
        signIn: false
      }
    },
    {
        path: '/communities',
        name: 'communities',
        component: () => import('../views/communities.vue'),
        children: [
            
            {
                path: '',
                name: 'chat',
                component: () => import('../views/communities/chat.vue')
            }
        ]
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: () => import('../views/profile.vue')
    },
    {
      path: '/activity/:url',
      name: 'activity',
      component: () => import('../views/activityPage.vue')
    },
    {
      path: '/search/',
      name: 'search',
      component: () => import('../views/searchResults.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/create.vue')
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('../views/resources.vue'),
      children:[
        {
          path: '',
          component: () => import('../views/resources/home.vue')
        },
        {
          path: 'gpa_calculator',
          name: 'gpa_calculator',
          component: () => import('../views/resources/gpa_calculator.vue')
        },
        {
          path: 'love_calculator',
          name: 'love_calculator',
          component: () => import('../views/resources/love_calculator.vue')
        }
      ]
    },
    
  ]
})

export default router
