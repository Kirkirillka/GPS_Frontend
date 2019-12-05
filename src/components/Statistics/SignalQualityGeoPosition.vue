<template>
    <div>
        <svg id="my_dataviz">
            <g id="scale">
                <g id="y_axis"></g>
                <g id="x_axis"></g>
            </g>
        </svg>
    </div>
</template>

<script>

    import * as d3 from 'd3v4';

    export default {
        name: "SignalQualityGeoPosition",
        props: ["series", "window_size", "selected_dates"],
        watch: {
            get_series: function () {
                // eslint-disable-next-line no-console
                console.log("updated")
                this.draw_scatter()
            }
        },
        mounted: function () {
            this.draw_scatter()
        },

        methods: {
            draw_scatter: function () {

                // set the dimensions and margins of the graph
                var margin = {top: 10, right: 30, bottom: 40, left: 50},
                    width = 700 - margin.left - margin.right,
                    height = 700 - margin.top - margin.bottom;

                // append the svg object to the body of the page
                var svg = d3.select("#my_dataviz")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .select("#scale")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");


                var x_min = d3.min(this.get_series, r => r.x) - 1
                var x_max = d3.max(this.get_series, r => r.x) + 1

                var y_min = d3.min(this.get_series, r => r.y) - 1
                var y_max = d3.max(this.get_series, r => r.y) + 1

                //Color interpolation
                var color_interpolation = d3.interpolateHsl("red", "blue")


                // Add X axis
                var x = d3.scaleLinear()
                    .domain([x_min, x_max])
                    .range([0, width])

                svg.select("#x_axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));


                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([y_min, y_max])
                    .range([height, 0])
                    .nice()

                svg.select("#y_axis")
                    .call(d3.axisLeft(y));


                // Update the array of dots
                var persisted_circles = svg.selectAll("circle")
                    .data(this.get_series)
                    .enter()
                    .append("circle")

                // Find out which dots to delete
                var circles_to_delete = svg.selectAll("circle")
                    .data(this.get_series)
                    .exit()

                // Delete stage
                circles_to_delete.remove()


                // eslint-disable-next-line no-console
                console.log(persisted_circles)
                // eslint-disable-next-line no-console
                console.log(circles_to_delete)

                // Update stage
                svg.selectAll("circle")
                    .data(this.get_series)
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

                let current_dates = this.selected_dates;

                return this.series.flatMap(function (r) {
                    return r.data.filter(function (d) {
                        var target_date = new Date(d.time);
                        var left = new Date(current_dates.start)
                        var right = new Date(current_dates.end)

                        return left <= target_date && target_date <= right
                    }).flatMap(function (d) {
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