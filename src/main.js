import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'


// app.js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//axios
Vue.use(VueAxios, axios)


Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = true


Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')


