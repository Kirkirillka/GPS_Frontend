<!--Credits : http://bl.ocks.org/weiglemc/6185069-->

<template>
    <div>
        <div id="estimation-entry">
        </div>
    </div>
</template>

<script>

    import * as Plotly from "plotly.js-dist";
    import {mapGetters} from 'vuex';

    export default {
        name: "UAVPositionEstimation",
        data: function () {
            return {
                estimation_color: 'black',
                ues_color: 'blue'
            }
        },
        mounted: function () {
            this.draw()
        },

        methods: {
            draw: function () {
                var trace1 = {
                    x: this.get_ues_locations.map(d => d.x),
                    y: this.get_ues_locations.map(d => d.y),
                    mode: 'markers+text',
                    type: 'scatter',
                    name: 'UE',
                    text: this.get_ues_locations.map(d => d.id.slice(0, 6)),
                    textposition: 'top',

                    marker: {
                        size: 12,
                        color: this.ues_color

                    }
                };

                var trace2 = {
                    x: this.get_uavs_locations.map(d => d.x),
                    y: this.get_uavs_locations.map(d => d.y),
                    mode: 'markers',
                    type: 'scatter',
                    name: 'UAV',
                    marker: {
                        size: 20,
                        color: this.estimation_color
                    }
                };


                var data = [trace1, trace2];

                var layout = {
                    title: 'UEs last positions and estimated locations for UAVs',
                    autosize: true,
                    height: this.height,
                };

                Plotly.newPlot('estimation-entry', data, layout, {responsive: true});

            }
        },
        watch: {
            get_ues_locations: function () {
                this.draw()
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
            ...mapGetters("visual", {
                width: "GET_WIDTH",
                height: "GET_HEIGHT"
            }),
            get_ues_locations: function () {
                return this.clients_locations.flatMap(function (r) {
                    let data_by_client = r.data.map(function (d) {
                            return {
                                'x': parseFloat(d.latitude),
                                'y': parseFloat(d.longitude),
                            }
                        }
                    ).map(function (f) {
                        f.id = r.device.id

                        return f
                    }).slice(0, 1)

                    return data_by_client
                })
            },
            get_uavs_locations: function () {
                let entries = this.uavs_locations
                    .filter(r => r.payload.target == 'uav')
                    .flatMap(r => r.payload.suggested.map(function (r) {
                            return {
                                'x': parseFloat(r.latitude),
                                'y': parseFloat(r.longitude),
                            }
                        }
                    )).slice(0, 1)

                return entries

            }
        }
    }
</script>

<style scoped>

    .axis path,
    .axis line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }

    .dot {
        stroke: #000;
    }

    .tooltip {
        position: absolute;
        text-align: right;
        width: 60px;
        height: 12px;
        font: 10px sans-serif;
        background: #ddd;
        pointer-events: none;
    }

</style>