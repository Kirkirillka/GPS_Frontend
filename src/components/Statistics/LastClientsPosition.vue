<template>
    <div>
        <apexchart :options="options" :series="get_series"></apexchart>
    </div>
</template>

<script>

    //import * as d3 from "d3";

    export default {
        name: "LastClientsPosition",
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
            return {
                options: {
                    chart: {
                        height: 250,
                        width: 200,
                        type: 'scatter',
                        zoom: {
                            enabled: true,
                            type: 'xy'
                        },
                        animations: {
                            enabled: false
                        }
                    },
                    xaxis: {
                        tickAmount: 10,
                        labels: {
                            formatter: function (val) {
                                return parseFloat(val).toFixed(2);
                            }
                        }
                    },
                    yaxis: {
                        tickAmount: 10,
                        labels: {
                            formatter: function (val) {
                                return parseFloat(val).toFixed(2);
                            }
                        }
                    }

                }
            }
        },
        computed: {
            get_series: function () {

                let current_dates = this.selected_dates

                return this.series
                    .map(function (r) {
                        return {
                            "name": r.device.id,
                            "data": r.data
                                .filter(function (d) {
                                    var target_date = new Date(d.time);
                                    var left = new Date(current_dates.start)
                                    var right = new Date(current_dates.end)

                                    return  left <= target_date && target_date <= right
                                })
                                .map(function (d) {
                                        return {
                                            'x': parseFloat(d.latitude),
                                            'y': parseFloat(d.longitude),
                                        }
                                }).slice(0,1)
                        }
                    })
            },
            get_labels: function () {
                return this.series.map(function (r) {
                    return {
                        seriesName: r.device.id,
                    }
                })
            }
        }
    }
</script>

<style scoped>


</style>