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
    }
  }

  const actions = {
    setCSRFToken ({commit, state}, token) {
      commit('setCSRFToken', token)
    },
    logMemberIn ({commit, state}) {
      commit('logMemberIn')
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