/* 
*  Members Vuex Module
*  Module for monitoring and managing users
*/

  const state = {
    loggedIn: false,
    csrf_token: '',
    memberId: ''
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
    },
    setMemberId(state, id) {
      state.memberId = id
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
    },
    setMemberId ({commit, state}, id) {
      commit('setMemberId', id)
    }
  }
  
  const getters = {
     logInStatus: state => state.loggedIn,
     curCSRFToken: state => state.csrf_token,
     curMemberId: state => state.memberId
    
  }

export default {
  state,
  mutations,
  actions,
  getters
}