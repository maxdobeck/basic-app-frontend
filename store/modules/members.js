/* 
*  Members Vuex Module
*  Module for monitoring and managing users
*/

  const state = {
    loggedIn: false,
    csrf_token: '',
    memberId: '',
    memberName: '',
    memmberEmail: ''
  }
  
  const mutations = {
    setCSRFToken(state, t) {
      state.csrf_token = t
    },
    logMemberIn(state) {
      state.loggedIn = true
    },
    logMemberOut(state) {
      state.loggedIn = false,
      state.memberId = '',
      state.memberName = '',
      state.memberEmail = ''
    },
    setMemberId(state, id) {
      state.memberId = id
    },
    setMemberName(state, name) {
      state.memberName = name
    },
    setMemberEmail(state, email) {
      state.memberEmail = email
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
    },
    setMemberName ({commit, state}, name) {
      commit('setMemberName', name)
    },
    setMemberEmail ({commit, state}, email) {
      commit('setMemberEmail', email)
    }
  }
  
  const getters = {
     logInStatus: state => state.loggedIn,
     curCSRFToken: state => state.csrf_token,
     curMemberId: state => state.memberId,
     memberName: state => state.memberName,
     memberEmail: state => state.memberEmail
    
  }

export default {
  state,
  mutations,
  actions,
  getters
}