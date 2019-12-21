import api from "../api";

const state = {
    registered_clients: [],
    message_counts: []
};

const getters = {
    REGISTERED_CLIENTS: state => {
        return state.registered_clients
    },
    MESSAGES_STATISTICS: state => {
        return state.message_counts
    },
};

const actions = {
    GET_REGISTERED_CLIENTS: async ({commit}, body) => {

        let data = await api.fetch_registered_clients_list(body)

        commit("UPDATE_REGISTERED_CLIENTS_LIST", data)
    },
    GET_MESSAGES_STATISTICS: async ({commit}, body) => {

        let data = await api.fetch_messages_statistics(body)

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
