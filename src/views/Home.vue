<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome!!!</h1>
      <div v-if="userDetails.username">
        <p>Logged in as {{userDetails.username}}</p>
        <p>Your email is {{userDetails.email}}</p>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex';


export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
,
  data: () => ({
    //
  }),
  
  methods : {

  },

 computed: mapState([
        'userDetails'
    ]),

  beforeMount() {
      this.$store.dispatch('loadUserDetails')
  },
}
</script>
