<template>

    <b-container fluid>
        <b-row>
            <b-col md="3">

                <DateControl v-model="selected_dates"></DateControl>
                <PollingControl v-model="is_polling"></PollingControl>
                <WindowSizeControl v-model="window_size"></WindowSizeControl>
                <RefreshTimeControl v-model="refresh_timeout"></RefreshTimeControl>

                <OperationControl v-on:data-fetch="update_data">

                </OperationControl>

                <ClientsList></ClientsList>

            </b-col>
            <b-col md="8">
                <div class="p-3">
                    <b-tabs content-class="mt-3" fill justified>
                        <b-tab title="UAVs Position Estimation" active>
                            <UAVPositionEstimation
                                    v-bind:series="clients_data"
                                    v-bind:window_size="window_size"
                                    v-bind:selected_dates="selected_dates"
                                    v-bind:estimations="estimations"
                            >
                            </UAVPositionEstimation>
                        </b-tab>
                        <b-tab title="Signal Quality Heatmap">
                            <SignalQualityGeoPosition
                                    v-bind:series="clients_data"
                                    v-bind:window_size="window_size"
                                    v-bind:selected_dates="selected_dates">
                            </SignalQualityGeoPosition>
                        </b-tab>
                        <b-tab title="Signal Level Changes">
                            <SignalQualityDynamics
                                    v-bind:series="clients_data"
                                    v-bind:window_size="window_size"
                                    v-bind:selected_dates="selected_dates">
                            </SignalQualityDynamics>
                        </b-tab>
                        <b-tab title="Last Known Clients Position">
                            <LastClientsPosition
                                    v-bind:series="clients_data"
                                    v-bind:window_size="window_size"
                                    v-bind:selected_dates="selected_dates">
                            </LastClientsPosition>
                        </b-tab>
                    </b-tabs>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>


    import LastClientsPosition from "@/components/Statistics/LastClientsPosition";
    import SignalQualityDynamics from "@/components/Statistics/SignalQualityDynamics";
    import SignalQualityGeoPosition from "@/components/Statistics/SignalQualityGeoPosition";
    import UAVPositionEstimation from "./Statistics/UAVPositionEstimation";

    import ClientsList from "./ClientsList";

    import DateControl from "./Controls/DateControl";
    import PollingControl from "./Controls/PollingControl";
    import WindowSizeControl from "./Controls/WindowSizeControl";
    import RefreshTimeControl from "./Controls/RefreshTimeControl";

    import OperationControl from "./Controls/OperationControl";


    import * as axios from "axios";
    import moment from "moment";

    export default {
        name: "StatisticsDataPlane",
        components: {
            LastClientsPosition,
            SignalQualityDynamics,
            SignalQualityGeoPosition,
            ClientsList,
            DateControl,
            PollingControl,
            WindowSizeControl,
            OperationControl,
            RefreshTimeControl,
            UAVPositionEstimation

        },
        data: function () {
            return {
                clients_data: [],
                estimations: [],
                refresh_timeout: 5,
                selected_dates: {
                    start: moment().add(-1, 'days').toDate(),
                    end: moment().add(1, 'days').toDate(),
                },
                is_polling: false,
                window_size: 20,
                timers: []
            }
        },
        watch: {
            is_polling: function () {

                // eslint-disable-next-line no-console
                console.log("Stop the previous timer.")

                this.stop_timer()

                if (this.is_polling == true) {
                    this.start_timer()

                    // eslint-disable-next-line no-console
                    console.log("Start a new timer.")
                }
            },
            refresh_timeout: function () {

                // eslint-disable-next-line no-console
                console.log("Reinstalling timer due to refresh time changes.")

                // Check if we have installed timer
                if (this.timers) {
                    // Reinstall timer with new refresh timeout
                    this.stop_timer()
                    this.start_timer()

                }
            }
        },
        mounted: function () {
            this.update_data()
        },
        methods: {
            fetch_info_by_client: function () {

                var data = {
                    limits: this.window_size,
                    start_date: new Date(this.selected_dates.start),
                    end_date: new Date(this.selected_dates.end),
                };

                axios.post("http://localhost:5000/aggr/by_device_id", data)
                    .then(response => this.clients_data = response.data);
            },
            fetch_estimates: function () {

                var data = {
                    limits: this.window_size,
                    start_date: new Date(this.selected_dates.start),
                    end_date: new Date(this.selected_dates.end),
                };

                axios.post("http://localhost:5000/estimations/all", data)
                    .then(response => this.estimations = response.data);
            },
            update_data: function () {
                this.fetch_estimates()
                this.fetch_info_by_client()
            },
            start_timer: function () {

                var timers = this.timers

                timers.push(setInterval(this.update_data, this.refresh_timeout * 1000))
            },
            stop_timer: function () {

                if (typeof this.timers == 'object') {
                    this.timers.forEach(clearInterval)
                }

                // Delete timers
                this.timers = []
            }

        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped>

</style>