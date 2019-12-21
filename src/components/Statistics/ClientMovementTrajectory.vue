<template>
    <div class="p-3" id="trajectory-entry">
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
                    height: 700,
                };

                Plotly.newPlot('trajectory-entry', data, layout);
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
                clients_locations: "CLIENTS_LOCATIONS",
                uavs_locations: "UAVS_LOCATIONS"
            }),

            get_series: function () {

                let entries = this.clients_locations.map(r => r).map(function (r) {
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