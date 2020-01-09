import moment from "moment";

const state = {
    refresh_timeout: 5,
    window_size: 20,
    polling: false,
    start_datetime_filter: moment().subtract(1,"hour").toDate(),
    end_datetime_filter: moment().add(1, 'days').toDate(),
    polling_timer: -1

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
    GET_POLLING_TIMER: state => {
        return state.polling_timer
    }
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
    },
    UPDATE_POLLING_TIMER: (state, payload) => {
        state.polling_timer = payload
    },
    STOP_POLLING_TIMER: (state) => {
        clearInterval(state.polling_timer)
        state.polling_timer = -1
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
