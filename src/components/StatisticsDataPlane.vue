<template>

    <b-container fluid>
        <b-row>
            <b-col md="3">

                <ClientsList></ClientsList>
                <b-card bg-variant="light">
                    <DateControl v-model="selected_dates"></DateControl>
                    <PollingControl v-model="is_polling"></PollingControl>
                    <WindowSizeControl v-model="window_size"></WindowSizeControl>
                    <RefreshTimeControl v-model="refresh_timeout"></RefreshTimeControl>
                </b-card>
                <b-card>

                    <OperationControl v-on:data-fetch="fetch_info_by_client"></OperationControl>

                </b-card>

            </b-col>
            <b-col md="8">
                <b-card no-body>
                    <b-tabs pills card>
                        <b-tab title="Signal Quality Heatmap" active>
                            <b-card-text>
                                <SignalQualityGeoPosition
                                        v-bind:series="clients_data"
                                        v-bind:window_size="window_size"
                                        v-bind:selected_dates="selected_dates">
                                </SignalQualityGeoPosition>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Signal Level Changes Diagram">
                            <b-card-text>
                                <SignalQualityDynamics
                                        v-bind:series="clients_data"
                                        v-bind:window_size="window_size"
                                        v-bind:selected_dates="selected_dates">
                                </SignalQualityDynamics>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Last Known Clients Position">
                            <LastClientsPosition
                                    v-bind:series="clients_data"
                                    v-bind:window_size="window_size"
                                    v-bind:selected_dates="selected_dates"
                            >
                            </LastClientsPosition>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>


    import LastClientsPosition from "@/components/Statistics/LastClientsPosition";
    import SignalQualityDynamics from "@/components/Statistics/SignalQualityDynamics";
    import SignalQualityGeoPosition from "@/components/Statistics/SignalQualityGeoPosition";
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
            RefreshTimeControl

        },
        data: function () {
            return {
                clients_data: [],
                refresh_timeout: 1,
                selected_dates: {
                    start: moment().add(-1, 'days').toDate(),
                    end: new Date()
                },
                is_polling: false,
                window_size: 20
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
                if (this.timer) {
                    // Reinstall timer with new refresh timeout
                    this.stop_timer()
                    this.start_timer()

                }
            }
        },
        methods: {
            fetch_info_by_client: function () {
                axios.get("http://localhost:5000/aggr/by_device_id?limit=" + this.window_size)
                    .then(response => this.clients_data = response.data);
            },
            start_timer: function () {

                this.timer = setInterval(this.fetch_info_by_client, this.refresh_timeout * 1000)
            },
            stop_timer: function () {
                clearInterval(this.timer)
            }

        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped>

</style>