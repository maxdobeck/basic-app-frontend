import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store/index'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import Signup from '@/components/auth/Signup'
import Home from '@/components/Home'
import Schedules from '@/components/Schedules'
import Welcome from '@/components/Welcome'

Vue.use(Router)

async function checkAuth (to, from, next) {
  // if user is logged in, move to next route
  let proceed
  await validSession().then(valid => {
    proceed = valid
    console.log('***--->', valid)
  })
  console.log('Proceed?', proceed)
  if (proceed === true) {
    next()
  // else if user is not logged in, go to login page
  } else {
    next('/login')
  }
}

async function validSession () {
  let valid = true
  let token = store.getters.curCSRFToken
  let api // Need to find a way to turn all this into a function
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
    api = process.env.DEV_API
  } else if (process.env.NODE_ENV === 'test') {
    api = process.env.TEST_API
  } else {
    api = process.env.PROD_API
  }
  const apiURL = api + 'validsession'
  let response = await fetch(apiURL, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'X-CSRF-Token': token
    }
  })
  let status = await response.status
  if (status !== 200) {
    valid = false
  }
  console.log('Status: ', status)
  return valid
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/schedules', name: 'Schedules', component: Schedules, beforeEnter: checkAuth },
    { path: '/login', name: 'Login', component: Login },
    { path: '/logout', name: 'Logout', component: Logout },
    { path: '/signup', name: 'Signup', component: Signup },
    { path: '/welcome', name: 'Welcome', component: Welcome }
  ]
})
