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
            series : function () {
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
                var svg = d3.select("#my_dataviz")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")")


                var x_min = d3.min(this.get_series, r => r.x)
                var x_max = d3.max(this.get_series, r => r.x)

                var y_min = d3.min(this.get_series, r => r.y)
                var y_max = d3.max(this.get_series, r => r.y)

                //Color interpolation
                var color_interpolation = d3.interpolateHsl("red", "blue")


                // Add X axis
                var x = d3.scaleLinear()
                    .domain([x_min, x_max])
                    .range([0, width])
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x).tickSize(-height * 1.3).ticks(10))
                    .select(".domain").remove()

                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([y_min, y_max])
                    .range([height, 0])
                    .nice()
                svg.append("g")
                    .call(d3.axisLeft(y).tickSize(-width * 1.3).ticks(7))
                    .select(".domain").remove()

                // Customization
                svg.selectAll(".tick line").attr("stroke", "white")

                // Add X axis label:
                svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("x", width / 2 + margin.left)
                    .attr("y", height + margin.top + 20)
                    .text("X");

                // Y axis label:
                svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -margin.left + 20)
                    .attr("x", -margin.top - height / 2 + 20)
                    .text("Y")


                // Add dots
                svg.append('g')
                    .selectAll("circle")
                    .data(this.get_series)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) {
                        return x(d.x);
                    })
                    .attr("cy", function (d) {
                        return y(d.y);
                    })
                    .attr("r", "3px")
                    .attr("fill", function (d) {
                        return color_interpolation(d.signal)
                    })


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