import api from "../api";

const state = {
    registered_clients: Array(),
    message_counts: Array()
};

const getters = {
    REGISTERED_CLIENTS: state => {
        return state.registered_clients
    },
    MESSAGES_STATISTICS: state => {
        return state.message_counts
    },
    get_registered_clients_num: (state, getters, rootState, rootGetters) => {
        return rootGetters["data/GET_UES_LOCATIONS"].length
    }
};

const actions = {
    GET_REGISTERED_CLIENTS: async ({commit}, body) => {

        let data = await api.fetch_registered_clients_list(body)

        commit("UPDATE_REGISTERED_CLIENTS_LIST", data)
    },
    GET_MESSAGES_STATISTICS: async ({commit}, body) => {

        let data = await api.fetch_db_messages_stats(body)

        commit("UPDATE_MESSAGES_STATISTICS", data)
    }
};

const mutations = {
    UPDATE_REGISTERED_CLIENTS_LIST: (state, payload) => {
        state.registered_clients = payload;
    },
    UPDATE_MESSAGES_STATISTICS: (state, payload) => {
        state.message_counts = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
