import Vue from 'vue'
import Vuex from 'vuex'
import members from './modules/members'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    members
  }
})