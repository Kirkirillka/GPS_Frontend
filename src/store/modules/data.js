import api from "../api";

const state = {
    ues_locations: [],
    uavs_location_estimations: [],
    recent_uavs_estimated_location: {}
};

const getters = {
    GET_UES_LOCATIONS: state => {
        return state.ues_locations
    },
    GET_UAVS_ESTIMATED_LOCATIONS: state => {
        return state.uavs_location_estimations
    },
    GET_UAVS_RECENT_ESTIMATED_LOCATION: state => {
        return state.recent_uavs_estimated_location
    }
};

const actions = {

    // eslint-disable-next-line no-unused-vars
    GET_UES_ALL_LOCATIONS: async ({commit, state, getters, rootGetters}, body) => {

        let predefined_body = {
            limits: rootGetters['control/WINDOW_SIZE'],
            start_date: rootGetters['control/START_DATETIME_FILTER'],
            end_date: rootGetters['control/END_DATETIME_FILTER']
        };


        if (body === undefined) {
            body = predefined_body
        }

        let data = await api.fetch_info_by_client(body)

        commit("UPDATE_CLIENTS_LOCATION_DATA", data)
    },
    // eslint-disable-next-line no-unused-vars
    GET_UAVS_ALL_ESTIMATED_LOCATIONS: async ({commit, state, getters, rootGetters}, body) => {

        let predefined_body = {
            limits: rootGetters['control/WINDOW_SIZE'],
            start_date: rootGetters['control/START_DATETIME_FILTER'],
            end_date: rootGetters['control/END_DATETIME_FILTER']
        };

        if (body === undefined) {
            body = predefined_body
        }

        let data = await api.fetch_all_estimations(body)

        commit("UPDATE_UAVS_ESTIMATION_LOCATION_DATA", data)
    },
    GET_UAVS_RECENT_ESTIMATED_LOCATION: async ({commit},) => {

        let data = await api.fetch_recent_estimation()

        commit("UPDATE_UAVS_ESTIMATION_LOCATION_DATA", data)
    }

};

const mutations = {
    UPDATE_CLIENTS_LOCATION_DATA: (state, payload) => {
        state.ues_locations = payload
    },
    UPDATE_UAVS_ESTIMATION_LOCATION_DATA: (state, payload) => {
        state.uavs_location_estimations = payload
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
