import Vue from 'vue'
import Vuex from 'vuex'


import control from "./modules/control";
import data from "./modules/data";
import stats from "./modules/stats";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        control,
        data,
        stats
    },
})
