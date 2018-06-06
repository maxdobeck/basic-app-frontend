/* 
*  Members Vuex Module
*  Module for monitoring and managing users
*/

  const state = {
    loggedIn: false,
    csrf_token: ''
  }
  
  const mutations = {
    setCSRFToken(state, t) {
      state.csrf_token = t
    },
    logMemberIn(state) {
      state.loggedIn = true
    },
    logMemberOut(state) {
      state.loggedIn = false
    }
  }

  const actions = {
    setCSRFToken ({commit, state}, token) {
      commit('setCSRFToken', token)
    },
    logMemberIn ({commit, state}) {
      commit('logMemberIn')
    },
    logMemberOut ({commit, state}) {
      commit('logMemberOut')
    }
  }
  
  const getters = {
     logInStatus: state => state.loggedIn,
     curCSRFToken: state => state.csrf_token
    
  }

export default {
  state,
  mutations,
  actions,
  getters
}