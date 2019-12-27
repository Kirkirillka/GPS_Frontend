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
        name: "RecentUEsPositionsFigure",
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


                var data = [trace1,];

                var layout = {
                    title: 'Recent received GPS Positions for UEs',
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
            get_ues_locations: function () {
                return this.ues_locations.flatMap(function (r) {
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