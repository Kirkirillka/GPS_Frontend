<template>
    <div>
        <apexchart :options="options" :series="get_series"></apexchart>
    </div>
</template>

<script>

    import moment from "moment";
    //import * as d3 from "d3v4";


    export default {
        name: "SignalQualityDynamics",
        props: ["series"],
        data: function () {
            return {
                options: {
                    plotOptions: {
                        line: {
                            curve: 'smooth',
                        }
                    },
                    chart: {
                        type: "line",
                        stacked: true,
                        zoom: {
                            enabled: false
                        },
                    },

                    dataLabels: {
                        enabled: false
                    },

                    markers: {
                        size: 0,
                        style: 'full',
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {

                            inverseColors: false,
                            opacityFrom: 0.40,
                            opacityTo: 0.8,
                            stops: [20, 100, 100, 100]
                        },
                    },
                    yaxis: {
                        labels: {
                            style: {
                                color: '#8e8da4',
                            },
                            offsetX: 0,
                            formatter: function (val) {
                                return -parseFloat(val).toFixed(2);
                            },
                        },
                        axisBorder: {
                            show: true
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    xaxis: {
                        type: 'datetime',
                        tickAmount: 8,
                        labels: {

                            formatter: function (val, timestamp) {
                                return moment(new Date(timestamp)).format("DD MMM hh:mm:ss")
                            }
                        }
                    },
                    title: {
                        text: 'Irregular Data in Time Series',
                        align: 'left',
                        offsetX: 14
                    },
                    tooltip: {
                        shared: true
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'right',
                        offsetX: -10
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
                                    "y": -parseFloat(r.signal)
                                }
                            }
                        ).slice(0, 20)
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