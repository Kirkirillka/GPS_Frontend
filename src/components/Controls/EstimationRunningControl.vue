<template>
    <div>
        <b-form-group
                label-size="sm"
                label-align-sm="center"
                label="Estimation Running"
                label-for="run-estimation-btn">

            <b-button-group vertical>
                <b-button variant="outline-primary" id="run-estimation-btn" size="sm"
                          v-on:click="dispatch_new_estimation_task">Run a new estimation
                </b-button>

            </b-button-group>
        </b-form-group>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        name: "EstimationRunningControl",
        computed: {
            ...mapGetters("control", {
                start_time_filter: "START_DATETIME_FILTER",
                end_time_filter: "END_DATETIME_FILTER",
                window_size: "WINDOW_SIZE",
                refresh_timeout: "REFRESH_TIMEOUT"
            }),
        },
        methods: {
            dispatch_new_estimation_task: function () {

                this.$store.dispatch("estimations/RUN_OPTIMIZATION",);

            },
        }
    }
</script>

<style scoped>

</style>