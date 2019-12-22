<!--Credits  :http://bl.ocks.org/supereggbert/aff58196188816576af0-->
<template>
    <div>
        <div id="signal-geo-contour">
        </div>
    </div>
</template>

<script>

    //import * as d3 from 'd3v4';
    import * as Plotly from "plotly.js-dist";
    import {mapGetters} from 'vuex';

    export default {
        name: "SignalQualityGeoPosition",
        mounted: function () {
            this.draw()
        },

        methods: {
            draw: function () {
                let x = this.get_ues_locations.map(d => d.x)
                let y = this.get_ues_locations.map(d => d.y)
                let z = this.get_ues_locations.map(d => d.z)


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
                    height: this.height,
                };
                Plotly.newPlot('signal-geo-contour', data, layout, {responsive: true});
            },
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
                    return r.data.flatMap(function (d) {
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