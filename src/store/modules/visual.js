
const state = {
    figures_width: 600,
    figures_height: 600
};

const getters = {
    GET_WIDTH: state => {
        return state.figures_width
    },
    GET_HEIGHT: state => {
        return state.figures_height
    },
};

const actions = {
};

const mutations = {
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
