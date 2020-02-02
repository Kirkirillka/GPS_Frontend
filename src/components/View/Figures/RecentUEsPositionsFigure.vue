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
                    annotations: [{
                        xref: 'paper',
                        yref: 'paper',
                        x: 0,
                        xanchor: 'right',
                        y: 1,
                        yanchor: 'bottom',
                        text: 'Latitude',
                        showarrow: false
                    }, {
                        xref: 'paper',
                        yref: 'paper',
                        x: 1,
                        xanchor: 'left',
                        y: 0,
                        yanchor: 'top',
                        text: 'Longitude',
                        showarrow: false
                    }]
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
                get_ues_locations: "GET_UES_RECENT_LOCATION"
            }),
            ...mapGetters("visual", {
                width: "GET_WIDTH",
                height: "GET_HEIGHT"
            }),
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