import api from "../api";

const state = {
    num_clusters: 0,
    optimization_methods: [],
    chosen_optimization_method: "",
    running_tasks: []
};

const getters = {
    GET_CURRENT_CLUSTERS_NUM: state => {
        return state.num_clusters
    },
    GET_MIN_CLUSTERS_NUM: (state, getters, rootState, rootGetters) => {
        return Math.min(0, rootGetters["stats/get_registered_clients_num"])
    },
    GET_MAX_CLUSTERS_NUM: (state, getters, rootState, rootGetters) => {
        return Math.max(getters.GET_MIN_CLUSTERS_NUM, rootGetters["stats/get_registered_clients_num"])
    },
    GET_OPTIMIZATION_METHODS: (state) => {
        return state.optimization_methods
    },
    GET_CURRENT_OPTIMIZATION_METHOD: (state) => {
        return state.chosen_optimization_method
    },
};

const actions = {
    GET_OPTIMIZATION_METHODS_LIST: async ({commit}, body) => {

        let data = await api.fetch_available_optimization_methods(body)

        commit("UPDATE_OPTIMIZATION_METHODS_LIST", data)
    },
    // eslint-disable-next-line no-unused-vars
    RUN_OPTIMIZATION: async ({commit, state, getters, rootGetters}, body) => {

        let predefined_body = {
            start_date: rootGetters['control/START_DATETIME_FILTER'],
            end_date: rootGetters['control/END_DATETIME_FILTER'],
            num_clusters: getters.GET_CURRENT_CLUSTERS_NUM,
            method: getters.GET_CURRENT_OPTIMIZATION_METHOD
        };

        if (body === undefined) {
            body = predefined_body
        }

        let res = await api.run_estimation_task(body)

        commit("ADD_ESTIMATION_TASKS", res)
    }
};

const mutations = {
    UPDATE_CURRENT_CLUSTERS_NUM: (state, payload) => {
        state.num_clusters = payload
    },
    UPDATE_CURRENT_OPTIMIZATION_METHOD: (state, payload) => {
        state.chosen_optimization_method = payload
    },
    UPDATE_OPTIMIZATION_METHODS_LIST: (state, payload) => {
        state.optimization_methods = payload
    },
    ADD_ESTIMATION_TASKS: (state, payload) => {

        Vue.notify({
            group: 'main',
            title: 'New estimation has been scheduled!',
            text: 'Your task is added to task queue. Press the update button to get new estimations.'
        });

        state.running_tasks.push(payload)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
