<template>
  <div class="about">
    <h1>This is an The login page</h1>
      <div class="container">
     
        <form>
        <p>Username<br>
        <input type="text" autocomplete=""  v-model="form.username" placeholder="Enter Username" required>
        </p>

        <p>Password<br>
        <input type="password" autocomplete="" v-model="form.password"  placeholder="Enter Password" required>
        </p>
        <br>
        </form>
        <button @click="loginUser">Login</button>


    <!-- Display error message -->
      <p style="color:red;">{{request_fail}}</p>
      </div>


  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'


  export default {
    data: () => ({
      valid: true,
       form: {
        username: '',
        password: '',
       },
       request_fail : ''
    }),


    
 computed: {
   ...mapGetters({
        authenticated : 'auth/authenticated',
        user : 'auth/user',
    }),

 },

    methods: {
    
      //The Login method
      async loginUser(){
        this.request_fail = "" 
        this.$store.commit('auth/SET_USER', null)
        this.$store.commit('auth/SET_TOKEN', null)


          try {
            let response = await axios.post('/accounts/auth/login/', this.form)
            // Login the user with vuex
            this.attemptLogin(response.data).then(() => {

            // Move to home
              this.$router.replace({ name:'Home' })

            }).catch(()=>{
                this.request_fail = "An error occured, please try again." 
            })
            
          }
         catch {
          //Errors from the Api
          this.request_fail = "An error occured, please try again." 
         
        }
         finally {
          //Done fetching
        }
      },


// The mapActions for getting the token in vuex
      ...mapActions({
        attemptLogin: 'auth/attemptLogin',
      }),


    },
  }
</script>
