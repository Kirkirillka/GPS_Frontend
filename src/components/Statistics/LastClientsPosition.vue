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
                        height: 350,
                        type: 'scatter',
                        zoom: {
                            enabled: true,
                            type: 'xy'
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
                    return {"name": r.device.id,
                            "data": r.data.map( r=> [parseFloat(r.latitude), parseFloat(r.longitude)])}
                })
            }
        },
    }
</script>

<style scoped>


</style>