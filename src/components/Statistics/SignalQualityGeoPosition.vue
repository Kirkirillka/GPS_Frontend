<template>
    <div >
        <svg id="my_dataviz"></svg>
    </div>
</template>

<script>

    import * as d3 from 'd3v4';

    export default {
        name: "SignalQualityGeoPosition",
        props: ["series"],
        watch: {
            series: function () {
                // eslint-disable-next-line no-console
                console.log("updated")
                this.draw_scatter()
            }
        },
        methods: {
            draw_scatter: function () {

                // set the dimensions and margins of the graph
                var margin = {top: 10, right: 30, bottom: 40, left: 50},
                    width = 500 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;

                // append the svg object to the body of the page
                var svg = d3.select("#my_dataviz").append('g')
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)



                var x_min = d3.min(this.get_series, r => r.x)-1
                var x_max = d3.max(this.get_series, r => r.x)+1

                var y_min = d3.min(this.get_series, r => r.y)-1
                var y_max = d3.max(this.get_series, r => r.y)+1

                //Color interpolation
                var color_interpolation = d3.interpolateHsl("red", "blue")


                // Add X axis
                var x = d3.scaleLinear()
                    .domain([x_min, x_max])
                    .range([0, width])


                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([y_min, y_max])
                    .range([height, 0])
                    .nice()


                // Add dots
                var circle = svg.selectAll("circle").data(this.get_series)


                circle.enter().append("circle")

                    .attr("cx", function (d) {
                        return x(d.x);
                    })
                    .attr("cy", function (d) {
                        return y(d.y);
                    })
                    .attr("r", "6px")
                    .attr("fill", function (d) {
                        return color_interpolation(d.signal)
                    })

                circle.exit().remove()



            }
        },
        computed: {
            get_series: function () {
                return this.series.flatMap(function (r) {
                    return r.data.flatMap(function (d) {
                        return {
                            'x': parseFloat(d.latitude),
                            'y': parseFloat(d.longitude),
                            'signal': d.signal
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>


</style>