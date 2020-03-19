<template>
    <div>
        <div id="signal-changes-line">
        </div>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import * as Plotly from "plotly.js-dist";


    export default {
        name: "SignalQualityDynamics",
        data: function () {
            return {}
        },
        mounted() {
            this.draw()
        },
        watch: {
            get_series: function () {
                this.draw()
            }
        },
        methods: {
            draw: function () {

                var data = this.get_series;

                var layout = {
                    title: 'Signal Quality Changes for Registered UEs',
                    autosize: true,
                    height: this.height,
                    annotations: [{
                        xref: 'paper',
                        yref: 'paper',
                        xanchor: 'right',
                        yanchor: 'bottom',
                        x: 0,
                        y: 1,
                        text: 'RSS, dBm',
                        showarrow: false
                    }, {
                        xref: 'paper',
                        yref: 'paper',
                        x: 1,
                        xanchor: 'left',
                        yanchor: 'top',
                        y: 0,
                        text: 'Date',
                        showarrow: false
                    }]
                };


                Plotly.newPlot('signal-changes-line', data, layout);
            }
        },
        computed: {

            ...mapGetters("control", {
                start: "START_DATETIME_FILTER",
                end: "END_DATETIME_FILTER",
                window_size: "WINDOW_SIZE",
                refresh_timeout: "REFRESH_TIMEOUT"
            }),
            ...mapGetters("data", {
                ues_locations: "GET_UES_LOCATIONS",
                uavs_location_estimations: "GET_UAVS_ESTIMATED_LOCATIONS"
            }),
            ...mapGetters("visual", {
                width: "GET_WIDTH",
                height: "GET_HEIGHT"
            }),

            get_series: function () {
                return this.ues_locations.map(function (r) {
                    return {
                        "name": r.device.id.slice(0, 6),
                        "x": r.data.map(d=>d.time.value),
                        "y": r.data.map(d=>parseFloat(d.signal)),
                        mode: 'lines+markers'
                    }
                })


            }
        }
        ,
    }
</script>

<style scoped>

</style>