<template>
    <div>
        <apexchart :options="options" :series="get_series"></apexchart>
    </div>
</template>

<script>

    import moment from "moment";


    export default {
        name: "SignalQualityDynamics",
        props: ["series"],
        data: function () {
            return {
                options: {
                    plotOptions: {line: {curve: 'smooth'}},
                    stroke: {
                        curve: "smooth"
                    },
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: true,
                            type: 'xy'
                        }
                    },
                    xaxis: {
                        labels: {
                            formatter: (val) =>
                                moment.utc(val).format("hh:mm:ss")
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
        }
        ,
        computed: {
            get_series: function () {
                return this.series.map(function (r) {
                    return {
                        "name": r.device.id,
                        "data": r.data.map(
                            function (r) {
                                return {
                                    "x": r.time,
                                    "y": parseFloat(r.signal)
                                }
                            }
                        )
                    }
                })
            }
            ,
        }
        ,
    }
</script>

<style scoped>

</style>