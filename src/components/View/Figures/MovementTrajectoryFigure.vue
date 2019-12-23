<template>
    <div>
        <div id="trajectory-entry">
        </div>
    </div>
</template>

<script>

    import * as Plotly from "plotly.js-dist";
    import {mapGetters} from 'vuex';

    export default {
        name: "ClientMovementTrajectory",
        data: function () {
            return {}
        },
        mounted: function () {
            this.draw_scatter()
        },
        watch: {
            get_series: function () {
                this.draw_scatter()
            }
        },
        methods: {
            draw_scatter: function () {

                var data = this.get_series;

                var layout = {
                    title: 'Clients Movement Trajectory',
                    autosize: true,
                    height: this.height,
                    legend: {
                        yref: 'paper',
                        font: {
                            family: 'Arial, sans-serif',
                            size: 10,
                            color: 'grey',
                        }
                    },
                };

                Plotly.newPlot('trajectory-entry', data, layout, {responsive: true});
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

                let entries = this.ues_locations.map(r => r).map(function (r) {
                    return {
                        name: r.device.id.slice(0, 6),
                        mode: 'markers',
                        type: 'scatter',
                        data: r.data
                            .map(function (d) {
                                return {
                                    'x': parseFloat(d.latitude),
                                    'y': parseFloat(d.longitude),
                                }
                            })
                    }
                })

                return entries.map(function (d) {
                    let x = d.data.map(d => d.x)
                    let y = d.data.map(d => d.y)

                    d.x = x
                    d.y = y

                    delete d.data

                    return d

                })
            },
        }
    }
</script>

<style scoped>


</style>