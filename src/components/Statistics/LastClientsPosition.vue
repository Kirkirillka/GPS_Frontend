<template>
    <div>
        <apexchart :options="options" :series="get_series"></apexchart>
    </div>
</template>

<script>

    //import * as d3 from "d3";


    export default {
        name: "LastClientsPosition",
        props: ["series"],
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
                return this.series.map(function (r) {
                    return {
                        "name": r.device.id,
                        "data": [r.data.map(function (d) {
                            return {
                                'x': parseFloat(d.latitude),
                                'y': parseFloat(d.longitude),
                            }
                        }).pop()]
                    }
                })
            },
            get_labels : function () {
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