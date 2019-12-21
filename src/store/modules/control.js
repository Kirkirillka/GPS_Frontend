import moment from "moment";

const state = {
    refresh_timeout: 5,
    window_size: 20,
    polling: false,
    start_datetime_filter: moment().add(-1, 'days').toDate(),
    end_datetime_filter: moment().add(1, 'days').toDate(),

};

const getters = {
    // eslint-disable-next-line no-unused-vars
    WINDOW_SIZE: state => {
        return state.window_size
    },
    POLLING: state => {
        return state.polling
    },
    START_DATETIME_FILTER: state => {
        return new Date(state.start_datetime_filter)
    },
    END_DATETIME_FILTER: state => {
        return new Date(state.end_datetime_filter)
    },
    REFRESH_TIMEOUT: state => {
        return state.refresh_timeout
    },
};

const actions = {
};

const mutations = {
    UPDATE_WINDOW_SIZE: (state, payload) => {
        state.window_size = payload;
    },
    TOGGLE_PULLING: (state,payload) => {
        state.polling = payload;
    },
    UPDATE_START_DATETIME_FILTER: (state, payload) => {
        state.start_datetime_filter = new Date(payload);
    },
    UPDATE_END_DATETIME_FILTER: (state, payload) => {
        state.end_datetime_filter = new Date(payload);
    },
    UPDATE_REFRESH_TIMEOUT: (state, payload) => {
        state.refresh_timeout = payload;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
