<template>
    <div>
        <apexchart :options="options" :series="get_series"></apexchart>
    </div>
</template>

<script>

    import moment from "moment";
    //import * as d3 from "d3v4";
    import {mapGetters} from 'vuex';


    export default {
        name: "SignalQualityDynamics",
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
                        height: this.height,
                        width: "100%",
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
                                return moment(timestamp).format("DD MMM hh:mm:ss")
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

            get_series: function () {
                return this.clients_locations.map(function (r) {
                    return {
                        "name": r.device.id.slice(0, 6),
                        "data": r.data.map(
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