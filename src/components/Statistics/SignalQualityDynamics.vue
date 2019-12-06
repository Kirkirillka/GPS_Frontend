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
        props: ["series", "window_size", "selected_dates"],
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
                        width: 200,
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
                    tooltip: {
                        shared: true
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'right',
                        offsetX: -10
                    }
                },
            }
        },
        computed: {
            get_window_size: function(){
                return this.windows_size
            },
            get_series: function () {
                let scope = this


                return this.series.map(function (r) {


                    return {
                        "name": r.device.id,
                        "data": r.data.slice(0, scope.window_size)
                            .filter(function (d) {
                                var target_date = new Date(d.time);
                                var left = new Date(scope.selected_dates.start)
                                var right = new Date(scope.selected_dates.end)

                                return left <= target_date && target_date <= right
                            }).map(
                                function (r) {
                                    return {
                                        "x": r.time,
                                        "y": -parseFloat(r.signal)
                                    }
                                }
                            )
                    }
                })


            }
        }
        ,
    }
</script>

<style scoped>

</style>