<template>
    <div class="p-3">
        <b-form-group
                label="Available operations"
                description="Choose all available operations"
        >
            <b-button v-on:click="update_data"> Retrieve</b-button>
            <b-button v-on:click="get_stats"> Update Statistics</b-button>
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
            update_data: function () {

                let body = {
                    limits: this.window_size,
                    start_date: this.start_time_filter,
                    end_date: this.end_time_filter
                };

                this.$store.dispatch("data/GET_LOCATION_ESTIMATIONS",body);
                this.$store.dispatch("data/GET_CLIENT_INFO",body);
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