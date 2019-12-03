<template>
    <div>

        <b-button v-on:click="fetch_info_by_client">Fetch new data</b-button>

        <b-container>

            <LastClientsPosition
                    v-bind:series="clients_data">
            </LastClientsPosition>

            <SignalQualityDynamics
                    v-bind:series="clients_data">
            </SignalQualityDynamics>

            <SignalQualityGeoPosition
                    v-bind:series="clients_data">
            </SignalQualityGeoPosition>
        </b-container>


    </div>
</template>

<script>


    import LastClientsPosition from "@/components/Statistics/LastClientsPosition";
    import SignalQualityDynamics from "@/components/Statistics/SignalQualityDynamics";
    import SignalQualityGeoPosition from "@/components/Statistics/SignalQualityGeoPosition";

    import * as axios from "axios";


    export default {
        name: "StatisticsDataPlane",
        components: {
            LastClientsPosition,
            SignalQualityDynamics,
            SignalQualityGeoPosition
        },
        data: function () {
            return {
                clients_data: [],
                records_num: 500,
                refresh_timeout: 4000
            }
        },
        methods: {
            fetch_info_by_client: function () {
                axios.get("http://localhost:5000/aggr/by_device_id?limit=" + this.records_num)
                    .then(response => this.clients_data = response.data);
            },
        },
        created: function () {
            this.fetch_info_by_client();
            //this.timer = setInterval(this.fetch_info_by_client, this.refresh_timeout)

        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped>

</style>