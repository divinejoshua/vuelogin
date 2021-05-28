import axios from "axios"

export default({
namespaced: true,


  // State 
  state: {
   token: null,
   user:null,
  },

  getters: {
    authenticated(state){
        return state.token && state.user
    },

    user(state){
        return state.user
    }
  },


  // Mutations
  mutations: {
  SET_TOKEN (state, access_token){
      state.token = access_token
  },
  SET_USER (state, user){
    state.user = user
},
  },


//Actions 
  actions: {
    //Try to login the user from the login page
    async attemptLogin({ state, commit }, tokens){
      if (tokens){
        commit('SET_TOKEN', tokens.access_token)
        localStorage.setItem('authToken', tokens.refresh_token)
      }else{
        localStorage.setItem('authToken', null)
      }

      if(!state.token){
        return
      }
        try{
            // get the user we just logged in 
            let response = await axios.get('accounts/user')
            commit('SET_USER', response.data)

        } catch(e){
            commit('SET_TOKEN', null)
            commit('SET_USER', null)

        }
    },

    

// Use the jwt refresh token to re authenticate automatically 
    async attemptToken({ commit }, tokens){
      if(!localStorage.getItem('authToken')){
        return
      }

        // Try the refresh 
        try{
            let response = await axios.post('accounts/auth/token/refresh/',  { 
                refresh : tokens
          })
            commit('SET_TOKEN', response.data.access)

            // Get the user from the token 
                try{
                  let response = await axios.get('accounts/user/')
                  commit('SET_USER', response.data)

                } catch(e){
                // Any errors while setting the user state 
                  commit('SET_TOKEN', null)
                  commit('SET_USER', null)
                  localStorage.setItem('authToken', null)
                }

    // Any errors while calling the refresh api 
        } catch({ response  }){
            if(response.status==401){
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
                localStorage.removeItem('authToken')
              }
        }
    }

  },

})
