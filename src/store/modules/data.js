import api from "../api";

const state = {
    ues_locations: [],
    uavs_location_estimations: [],
    recent_uavs_estimated_location: {},
    current_estimation: {}
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
        },
        GET_UES_RECENT_LOCATION: state => {
            return state.ues_locations.flatMap(function (r) {
                let data_by_client = r.data.map(function (d) {
                        return {
                            'x': parseFloat(d.longitude),
                            'y': parseFloat(d.latitude),
                        }
                    }
                ).map(function (f) {
                    f.id = r.device.id

                    return f
                }).slice(0, 1)

                return data_by_client
            })
        },
        GET_UES_TRAJECTORIES: state => {
            return state.ues_locations.map(function (r) {
                return {
                    client_id: r.device.id,
                    movement: r.data.map(function (d) {
                        return {
                            'x': parseFloat(d.longitude),
                            'y': parseFloat(d.latitude),
                        }
                    })
                }
            })
        },
        GET_SIGNAL_BY_COORDINATES: state => {
            return state.ues_locations.flatMap(function (r) {
                return r.data.flatMap(function (d) {
                    return {
                        'x': parseFloat(d.longitude),
                        'y': parseFloat(d.latitude),
                        'z': d.signal
                    }
                })
            })
        },
        GET_CURRENT_ESTIMATION: state => {
            return state.current_estimation
        }
    }
;

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
    },
    SET_CURRENT_ESTIMATION: async ({commit}, estimation) => {

        commit("UPDATE_CURRENT_ESTIMATION", estimation)
    }

};

const mutations = {
    UPDATE_CLIENTS_LOCATION_DATA: (state, payload) => {
        state.ues_locations = payload
    },
    UPDATE_UAVS_ESTIMATION_LOCATION_DATA: (state, payload) => {
        state.uavs_location_estimations = payload
    },
    UPDATE_CURRENT_ESTIMATION: (state, payload) => {
        state.current_estimation = payload
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
