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
    RUN_OPTIMIZATION: async ({commit}, body) => {
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
        state.running_tasks.append(payload)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
