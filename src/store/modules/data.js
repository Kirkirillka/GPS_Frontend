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

    // eslint-disable-next-line no-unused-vars
    GET_CLIENT_INFO:  async ({commit, state, getters, rootGetters}, body) => {

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
    GET_LOCATION_ESTIMATIONS: async ({commit, state, getters, rootGetters}, body) => {

        let predefined_body = {
            limits: rootGetters['control/WINDOW_SIZE'],
            start_date: rootGetters['control/START_DATETIME_FILTER'],
            end_date: rootGetters['control/END_DATETIME_FILTER']
        };

        if (body === undefined) {
            body = predefined_body
        }

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
