import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import axios from "axios"


Vue.use(Vuex)

export default new Vuex.Store({
  // State 
  state: {
    userDetails: [],
  },

  // Mutations
  mutations: {
    setUserDetials (state, userDetails) {
      state.userDetails = userDetails
  }
  },


//Actions 
  actions: {
    async loadUserDetails ({ commit }) {

      try{
        let response = await axios.get('accounts/user/')
        commit('setUserDetials', response.data)
        commit('auth/SET_USER', response.data)


      }catch({ response  }){
        if(response.status==401){
            commit('SET_TOKEN', null)
            commit('SET_USER', null)
            localStorage.removeItem('authToken')
          }
    }


      },


  

  },


//Modules 

  modules: {
  // Register the auth module 
    auth
  }
})
