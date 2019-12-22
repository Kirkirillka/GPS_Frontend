<template>
    <div>
        <b-form-group
                label-size="sm"
                label-align-sm="center"
                label="Data update operations"
                label-for="update-clients-btn">

            <b-button-group vertical>
                <b-button variant="outline-primary" id="update-clients-btn" size="sm"
                          v-on:click="dispatch_ues_locations_updates">Get UEs Locations
                </b-button>
                <b-button variant="outline-primary" id="update-estimations-btn" size="sm"
                          v-on:click="dispatch_uavs_locations_updates">Get UAVs Estimated Locations
                </b-button>
                <b-button variant="outline-primary" id="update-stats-btn" size="sm" v-on:click="get_stats"> Update
                    Statistics
                </b-button>
            </b-button-group>
        </b-form-group>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        name: "OperationControl",
        computed: {
            ...mapGetters("control", {
                start_time_filter: "START_DATETIME_FILTER",
                end_time_filter: "END_DATETIME_FILTER",
                window_size: "WINDOW_SIZE",
                refresh_timeout: "REFRESH_TIMEOUT"
            }),
        },
        methods: {
            dispatch_ues_locations_updates: function () {

                let body = {
                    limits: this.window_size,
                    start_date: this.start_time_filter,
                    end_date: this.end_time_filter
                };

                this.$store.dispatch("data/GET_CLIENT_INFO", body);

            },
            dispatch_uavs_locations_updates: function () {

                let body = {
                    limits: this.window_size,
                    start_date: this.start_time_filter,
                    end_date: this.end_time_filter
                };

                this.$store.dispatch("data/GET_LOCATION_ESTIMATIONS", body);

            },
            get_stats: function () {
                this.$store.dispatch("stats/GET_REGISTERED_CLIENTS");
                this.$store.dispatch("stats/GET_MESSAGES_STATISTICS");
            }
        }
    }
</script>

<style scoped>

</style>