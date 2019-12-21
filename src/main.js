import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueApexCharts from 'vue-apexcharts'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from './store'


// axios
Vue.use(VueAxios, axios)

// apexchart
Vue.component('apexchart', VueApexCharts)

// Bootstrap
Vue.use(BootstrapVue)

Vue.config.productionTip = true

new Vue({
    el: "#app",
    store,
    render: h => h(App),
}).$mount('#app')


