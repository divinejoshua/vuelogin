import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'


// Get the subscriber 
require('@/store/subscriber')

// Set the base url for axios 
axios.defaults.baseURL = 'https://testjwtlogin.herokuapp.com/'


// Check if user is logged in before loading the page
store.dispatch('auth/attemptToken', localStorage.getItem('authToken')).then(() =>{
  Vue.config.productionTip = false

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

})
