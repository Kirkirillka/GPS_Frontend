import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@fortawesome/fontawesome-free'

// axios
Vue.use(VueAxios, axios)

// For notification
import Notifications from 'vue-notification'

import store from './store'
// use router
import router from './router'




// Bootstrap
Vue.use(BootstrapVue)

//vue-notifications
Vue.use(Notifications)


Vue.config.productionTip = true

new Vue({
    el: "#app",
    store,
    router,
    render: h => h(App),
}).$mount('#app')


