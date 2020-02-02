<template>
    <div>
        <div id="link-measurement-entry">
        </div>
    </div>
</template>

<script>

    import * as Plotly from "plotly.js-dist";
    import {mapGetters} from 'vuex';

    export default {
        name: "LinkMeasurementFigure",
        data: function () {
            return {}
        },
        mounted: function () {
            this.draw_scatter()
        },
        watch: {
            link_measurements: function () {
                this.draw_scatter()
            }
        },
        methods: {
            draw_scatter: function () {

                var data = this.get_series;

                var layout = {
                    title: 'Link Measurement Figure',
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
                    annotations: [{
                        xref: 'paper',
                        yref: 'paper',
                        x: 0,
                        xanchor: 'right',
                        y: 1,
                        yanchor: 'bottom',
                        text: 'Speed, Kbits/s',
                        showarrow: false
                    }, {
                        xref: 'paper',
                        yref: 'paper',
                        x: 1,
                        xanchor: 'left',
                        y: 0,
                        yanchor: 'top',
                        text: 'Date',
                        showarrow: false
                    }]
                };

                Plotly.newPlot('link-measurement-entry', data, layout, {responsive: true});
            }
        },
        computed: {
            ...mapGetters("data", {
                link_measurements: "GET_LINK_MEASUREMENTS",
            }),
            ...mapGetters("visual", {
                width: "GET_WIDTH",
                height: "GET_HEIGHT"
            }),

            get_series: function () {
                return this.link_measurements.flatMap(function (d) {
                    return [
                        {
                            name: d.client_id.slice(0, 6) + ".DL",
                            type: 'scatter',
                            x: d.data.map(s=>s.time),
                            y: d.data.map(s => s.downlink),
                        },
                        {
                            name: d.client_id.slice(0, 6) + ".UL",
                            type: 'scatter',
                            x: d.data.map(s=>s.time),
                            y: d.data.map(s => s.uplink),
                        }
                    ]
                })

            },
        }
    }
</script>

<style scoped>


</style>