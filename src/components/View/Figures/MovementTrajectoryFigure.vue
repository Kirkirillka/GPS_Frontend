<template>
    <div >
        <div id="trajectory-entry">
        </div>
    </div>
</template>

<script>

    import * as Plotly from "plotly.js-dist";
    import {mapGetters} from 'vuex';

    export default {
        name: "ClientMovementTrajectory",
        data: function () {
            return {}
        },
        mounted: function () {
            this.draw_scatter()
        },
        watch: {
            ues_trajectory: function () {
                this.draw_scatter()
            }
        },
        methods: {
            draw_scatter: function () {

                var data = this.get_series;

                var layout = {
                    title: 'Clients Movement Trajectory',
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

                Plotly.newPlot('trajectory-entry', data, layout, {responsive: true});
            }
        },
        computed: {
            ...mapGetters("data", {
                ues_trajectory: "GET_UES_TRAJECTORIES",
            }),
            ...mapGetters("visual", {
                width: "GET_WIDTH",
                height: "GET_HEIGHT"
            }),

            get_series: function () {
                return this.ues_trajectory.map( function (d) {
                    return {
                        name: d.client_id.slice(0,6),
                        mode: 'markers+lines',
                        type: 'scatter',
                        x: d.movement.map(s => s.x),
                        y: d.movement.map(s => s.y)
                    }
                })

            },
        }
    }
</script>

<style scoped>


</style>