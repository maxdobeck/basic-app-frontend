/* 
*  Members Vuex Module
*  Module for monitoring and managing users
*/

export const members = {
  state: {
    loggedIn: false
  },
  
  /*,
    mutations: {

  },

  actions: {

  },*/
  
  getters: {
     logInStatus: state => state.loggedIn
    
  }
}
