<template>
    <div>
        <b-form-group
                description="Automatic updates"
                label="Polling Switcher"
                label-size="sm">
            <div>
                <b-checkbox v-bind:checked="is_polling" size="sm" switch v-on:change="toggle_polling_control">
                </b-checkbox>
            </div>
        </b-form-group>
    </div>
</template>

<script>

    // The component controls continuous polling process.
    // If toggled, there will be performed the following actions:
    //  1. Fetches new dataset
    //  2. Fetches DB statistics and registered clients info
    //  3. Fetches information for UAVs estimations


    import {mapGetters} from 'vuex';

    export default {
        name: "PollingControl",
        computed: {
            ...mapGetters("control", {
                is_polling: "POLLING",
                refresh: "REFRESH_TIMEOUT",
                timer: "GET_POLLING_TIMER"
            }),
        },
        watch: {
            is_polling: function () {
                this.on_toggle_pulled()
            }
        },
        methods: {
            toggle_polling_control: function (data) {
                this.$store.commit("control/TOGGLE_PULLING", data);
            },
            poll_operation: function () {
                this.$store.dispatch("data/GET_UES_ALL_LOCATIONS")
                this.$store.dispatch("data/GET_UAVS_ALL_ESTIMATED_LOCATIONS")
                this.$store.dispatch("stats/GET_REGISTERED_CLIENTS")
                this.$store.dispatch("stats/GET_MESSAGES_STATISTICS")

            },
            on_toggle_pulled: function () {
                if (this.is_polling === true) {
                    this.poll_operation()
                    let timer_id = setInterval(this.poll_operation, this.refresh * 1000)

                    // Save timer ID
                    this.$store.commit("control/UPDATE_POLLING_TIMER", timer_id)
                } else {
                    this.$store.commit("control/STOP_POLLING_TIMER")
                }
            }
        },


    }
</script>

<style scoped>

</style>