<!--Credits : http://bl.ocks.org/weiglemc/6185069-->

<template>
    <div class="p-3">
        <div id="estimation-entry">
        </div>
    </div>
</template>

<script>

    import * as Plotly from "plotly.js-dist";

    export default {
        name: "UAVPositionEstimation",
        props: ["series", "window_size", "selected_dates", "estimations"],
        data: function () {
            return {
                estimation_color: 'black',
                ues_color: 'blue'
            }
        },
        watch: {
            get_series: function () {
                // eslint-disable-next-line no-console
                this.draw_estimations()
            },
            get_estimates_for_uavs: function () {
                // eslint-disable-next-line no-console
                this.draw_estimations()
            }
        },
        mounted: function () {
            this.draw_estimations()
        },

        methods: {
            draw_estimations: function () {
                var trace1 = {
                    x: this.get_series.map(d => d.x),
                    y: this.get_series.map(d => d.y),
                    mode: 'markers+text',
                    type: 'scatter',
                    name: 'UE',
                    text: this.get_series.map(d => d.id.slice(0,10)),
                    textposition: 'top',

                    marker: {
                        size: 12,
                        color: this.ues_color

                    }
                };

                var trace2 = {
                    x: this.get_estimates_for_uavs.map(d => d.x),
                    y: this.get_estimates_for_uavs.map(d => d.y),
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
                    height: 700,
                    legend: {
                        y: 0.5,
                        yref: 'paper',
                        font: {
                            family: 'Arial, sans-serif',
                            size: 10,
                            color: 'grey',
                        }
                    },
                };

                Plotly.newPlot('estimation-entry', data, layout);

            }
        },
        computed: {
            get_series: function () {

                let current_dates = this.selected_dates;

                return this.series.flatMap(function (r) {
                    let data_by_client = r.data.filter(function (d) {
                        var target_date = new Date(d.time);
                        var left = new Date(current_dates.start)
                        var right = new Date(current_dates.end)

                        return left <= target_date && target_date <= right
                    }).map(function (d) {
                        return {
                            'x': parseFloat(d.latitude),
                            'y': parseFloat(d.longitude),
                        }
                    }
                    ).map( function (f) {
                        f.id = r.device.id

                        return f
                    }).slice(0,1)

                    return data_by_client
                })
            }
            ,
            get_estimates_for_uavs: function () {
                var datarow = this.estimations
                    .filter(r => r.payload.target == 'uav')
                    .slice(0, 1).pop()

                if (typeof datarow != 'undefined' && typeof datarow.payload != 'undefined') {
                    return datarow.payload.suggested
                        .flatMap(function (d) {
                            return {
                                'x': parseFloat(d.latitude),
                                'y': parseFloat(d.longitude),
                            }
                        })
                } else {
                    return []
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