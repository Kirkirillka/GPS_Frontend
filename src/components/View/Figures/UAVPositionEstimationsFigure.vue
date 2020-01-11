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
            },
            get_uavs_locations: function () {
                this.draw()
            }
        },
        computed: {
            ...mapGetters("data", {
                ues_locations: "GET_UES_LOCATIONS",
                uavs_location_estimations: "GET_UAVS_ESTIMATED_LOCATIONS",
                current_estimation: "GET_CURRENT_ESTIMATION"
            }),
            ...mapGetters("visual", {
                width: "GET_WIDTH",
                height: "GET_HEIGHT"
            }),
            get_ues_locations: function () {
                let cur_estimation = this.current_estimation

                if (cur_estimation.payload === undefined) {
                    return []
                } else {
                    return cur_estimation.payload.ues_location.map(function (d) {
                        return {
                            x: d[0],
                            y: d[1]
                        }
                    })
                }
            },
            get_uavs_locations: function () {
                let cur_estimation = this.current_estimation
                if (cur_estimation.payload === undefined) {
                    return []
                } else {
                    return cur_estimation.payload.suggested.map(function (r) {
                        return {
                            'x': parseFloat(r.latitude),
                            'y': parseFloat(r.longitude),
                        }
                    })
                }
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