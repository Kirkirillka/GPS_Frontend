<!--Credits  :http://bl.ocks.org/supereggbert/aff58196188816576af0-->
<template>
    <div>
        <div id="signal-geo-contour">
        </div>
    </div>
</template>

<script>

    import * as Plotly from "plotly.js-dist";
    import {mapGetters} from 'vuex';

    export default {
        name: "SignalQualityHeatmapFigure",
        mounted: function () {
            this.draw()
        },

        methods: {
            draw: function () {

                var data = [{
                    x: this.get_signal_data.map(d => d.x),
                    y: this.get_signal_data.map(d => d.y),
                    z: this.get_signal_data.map(d => d.z),
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

                let layout = {
                    title: 'Signal Quality in the plane',
                    autosize: true,
                    height: this.height,
                };
                Plotly.newPlot('signal-geo-contour', data, layout, {responsive: true});
            },
        },
        watch: {
            get_signal_data: function () {
                this.draw()
            }
        },
        computed: {
            ...mapGetters("data", {
                get_signal_data: "GET_SIGNAL_BY_COORDINATES",
            }),
            ...mapGetters("visual", {
                width: "GET_WIDTH",
                height: "GET_HEIGHT"
            }),
        }
    }
</script>

<style scoped>


</style>