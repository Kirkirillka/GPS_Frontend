import Vue from 'vue'
import Vuex from 'vuex'


import control from "./modules/control";
import data from "./modules/data";
import stats from "./modules/stats";
import estimations from "./modules/estimations";
import visual from "./modules/visual";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        control,
        data,
        stats,
        estimations,
        visual
    },
})
