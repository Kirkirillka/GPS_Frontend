<template>
    <div>
        <b-table sticky-header hover :items="uavs_estimated_locations" head-variant="light"
        v-on:row-clicked="set_current_estimation">
            List of estimations
        </b-table>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    export default {
        name: "EstimationListView",
        computed: {
            ...mapGetters("data", {
                uavs_estimated_locations: "GET_UAVS_ESTIMATED_LOCATIONS",
                current_estimation: "GET_CURRENT_ESTIMATION",
            }),
        },
        methods: {
            ...mapActions("data", {
                set_current_estimation: "SET_CURRENT_ESTIMATION"
            })
        }
    }
</script>

<style scoped>

</style>