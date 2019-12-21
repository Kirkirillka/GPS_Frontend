import api from "../api";

const state = {
    clients_locations: [],
    uavs_locations: [],
};

const getters = {
    CLIENTS_LOCATIONS: state => {
        return state.clients_locations
    },
    UAVS_LOCATIONS: state => {
        return state.uavs_locations
    },
};

const actions = {

    GET_CLIENT_INFO: async ({commit}, body) => {

        let data = await api.fetch_info_by_client(body)

        commit("UPDATE_CLIENTS_LOCATION_DATA", data)
    },
    GET_LOCATION_ESTIMATIONS: async ({commit}, body) => {

        let data = await api.fetch_estimations(body)

        commit("UPDATE_UAVS_ESTIMATION_LOCATION_DATA", data)
    }

};

const mutations = {
    UPDATE_CLIENTS_LOCATION_DATA: (state, payload) => {
        state.clients_locations = payload
    },
    UPDATE_UAVS_ESTIMATION_LOCATION_DATA: (state, payload) => {
        state.uavs_locations = payload
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
