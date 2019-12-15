<!--Credits : http://bl.ocks.org/weiglemc/6185069-->

<template>
    <div id="estimation-entry">
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
                    mode: 'markers',
                    type: 'scatter',
                    name: 'UEs\' signal',

                    marker: {
                        size: 12,
                        color: this.get_series.map(d => d.signal),
                    }
                };

                var trace2 = {
                    x: this.get_estimates_for_uavs.map(d => d.x),
                    y: this.get_estimates_for_uavs.map(d => d.y),
                    mode: 'markers',
                    type: 'scatter',
                    name: 'Estimations',
                    marker: {size: 20}
                };


                var data = [trace1, trace2];

                var layout = {
                    title: 'Signal Quality in the plane',
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
                    return r.data.filter(function (d) {
                        var target_date = new Date(d.time);
                        var left = new Date(current_dates.start)
                        var right = new Date(current_dates.end)

                        return left <= target_date && target_date <= right
                    }).flatMap(function (d) {
                        return {
                            'x': parseFloat(d.latitude),
                            'y': parseFloat(d.longitude),
                            'signal': d.signal
                        }
                    }).slice(0, 1)
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