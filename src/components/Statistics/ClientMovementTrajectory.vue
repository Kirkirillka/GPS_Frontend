<template>
    <div class="p-3" id="trajectory-entry">
    </div>
</template>

<script>

    import * as Plotly from "plotly.js-dist";

    export default {
        name: "ClientMovementTrajectory",
        props: {
            series: {
                type: Array,
                default: function () {
                    return []
                }
            },
            windows_size: {
                type: Number,
                default: 20
            },
            selected_dates: {
                type: Object
            }
        },
        data: function () {
            return {}
        },
        mounted: function () {
            this.draw_scatter()
        },
        watch: {
           get_series: function(){
               this.draw_scatter()
           }
        },
        methods: {
            draw_scatter: function () {

                var data = this.get_series;

                var layout = {
                    title: 'Clients Movement Trajectory',
                    autosize: true,
                    height: 700,
                };

                Plotly.newPlot('trajectory-entry', data, layout);
            }
        },
        computed: {
            get_series: function () {


                let current_dates = this.selected_dates

                var prepared = this.series
                    .map(function (r) {
                        return {
                            name: r.device.id,
                            mode: 'markers',
                            type: 'scatter',
                            data: r.data
                                .filter(function (d) {
                                    var target_date = new Date(d.time);
                                    var left = new Date(current_dates.start)
                                    var right = new Date(current_dates.end)

                                    return left <= target_date && target_date <= right
                                })
                                .map(function (d) {
                                    return {
                                        'x': parseFloat(d.latitude),
                                        'y': parseFloat(d.longitude),
                                    }
                                })
                        }
                    })

                return prepared.map( function (d) {
                    let x = d.data.map(d => d.x)
                    let y = d.data.map(d => d.y)

                    d.x =x
                    d.y=y

                    delete  d.data

                    return d

                })
            },
        }
    }
</script>

<style scoped>


</style>