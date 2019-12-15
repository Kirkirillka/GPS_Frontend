<!--Credits  :http://bl.ocks.org/supereggbert/aff58196188816576af0-->

<template>
    <div id="signal-geo-contour">
    </div>
</template>

<script>

    //import * as d3 from 'd3v4';
    import * as Plotly from "plotly.js-dist";

    export default {
        name: "SignalQualityGeoPosition",
        props: ["series", "window_size", "selected_dates"],
        watch: {
            get_series: function () {
                this.draw_contour()
            },
        },
        mounted: function () {
            this.draw_contour()
        },

        methods: {
            draw_contour: function () {


                let x = this.get_series.map(d => d.x).slice(0, this.window_size)
                let y = this.get_series.map(d => d.y).slice(0, this.window_size)
                let z = this.get_series.map(d => d.z).slice(0, this.window_size)


                var data = [{
                    x: x,
                    y: y,
                    z: z,
                    marker: {
                        size: 3,
                        opacity: 0.7,
                    },
                    type: 'contour',
                    contours: {
                        coloring: 'heatmap',
                        showlabels: true,
                        labelfont: {
                            family: 'Raleway',
                            size: 12,
                            color: 'white',
                        }
                    },
                    colorbar: {
                        title: 'RSSI levels',
                        titleside: 'right',
                        titlefont: {
                            size: 14,
                            family: 'Arial, sans-serif'
                        }
                    }
                }];

                var layout = {
                    title: 'Signal Quality in the plane',
                    autosize: true,
                    height: 1000,
                };
                Plotly.newPlot('signal-geo-contour', data, layout, {responsive: true});
            },
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
                            'z': d.signal
                        }
                    })
                })

            }
        }
    }
</script>

<style scoped>


</style>