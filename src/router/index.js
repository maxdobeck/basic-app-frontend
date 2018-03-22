import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store/index'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import Signup from '@/components/auth/Signup'
import Home from '@/components/Home'
import Schedules from '@/components/Schedules'

Vue.use(Router)

function checkAuth (to, from, next) {
  // if user is logged in, move to next route
  if (store.getters.logInStatus === true) {
    next()
  // else if user is not logged in, go to login page
  } else {
    next('/login')
  }
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/schedules',
      name: 'Schedules',
      component: Schedules,
      beforeEnter: checkAuth
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/logout', name: 'Logout', component: Logout },
    { path: '/signup', name: 'Signup', component: Signup }
  ]
})
