<template>
    <div id="main">
        <div id="estimation-entry"></div>

        <svg id="estimation-canvas">
            <g id="scale">
                <g id="y_axis"></g>
                <g id="x_axis"></g>
                <g id="ue"></g>
                <g id="uav"></g>
                <svg id="estimation-legend"></svg>
                <svg id="estimation-colorbar"></svg>
            </g>
        </svg>
    </div>
</template>

<script>

    import * as d3 from 'd3v4';

    export default {
        name: "UAVPositionEstimation",
        props: ["series", "window_size", "selected_dates", "estimations"],
        data: function () {
            return {
                estimation_color: 'black',
                margin: {top: 50, right: 50, bottom: 50, left: 50},
                width: 600,
                height: 600
            }
        },
        watch: {
            get_series: function () {
                // eslint-disable-next-line no-console
                this.draw_estimations()
            },
            get_estimates_for_uavs: function () {
                // eslint-disable-next-line no-console
                this.draw_estimations()
            }
        },
        mounted: function () {
            this.draw_estimations()
            this.draw_legend()

        },

        methods: {
            set_axis: function () {

                var svg = d3.select("#estimation-canvas")


                var series_x_min = d3.min(this.get_series, r => r.x) - 1
                var series_x_max = d3.max(this.get_series, r => r.x) + 1

                var series_y_min = d3.min(this.get_series, r => r.y) - 1
                var series_y_max = d3.max(this.get_series, r => r.y) + 1

                var estimates_x_min = d3.min(this.get_estimates_for_uavs, r => r.x) - 1
                var estimates_x_max = d3.max(this.get_estimates_for_uavs, r => r.x) + 1

                var estimates_y_min = d3.min(this.get_estimates_for_uavs, r => r.y) - 1
                var estimates_y_max = d3.max(this.get_estimates_for_uavs, r => r.y) + 1


                var x_min = Math.min(series_x_min, estimates_x_min)
                var x_max = Math.max(series_x_max, estimates_x_max)

                var y_min = Math.min(series_y_min, estimates_y_min)
                var y_max = Math.max(series_y_max, estimates_y_max)


                // Add X axis
                var xScale = d3.scaleLinear()
                    .domain([x_min, x_max])
                    .range([0, this.width])

                // Put labels for X axis
                svg.select("#x_axis")
                    .attr("transform", "translate(0," + this.height + ")")
                    .call(d3.axisBottom(xScale));


                // Add Y axis
                var yScale = d3.scaleLinear()
                    .domain([y_min, y_max])
                    .range([this.height, 0])
                    .nice()

                // Put labels for Y axis
                svg.select("#y_axis")
                    .call(d3.axisLeft(yScale));

                return [xScale, yScale]
            },

            draw_legend: function () {

                var svg = d3.select("#estimation-legend")
                    .attr("x", this.width - this.margin.right)
                    .attr("y", 200)

                // Add legend
                svg.append("circle").attr("cx", 10).attr("cy", 10).attr("r", 6).style("fill", "black")
                svg.append("text").attr("x", 30).attr("y", 10).text("Estimation").style("font-size", "15px").attr("alignment-baseline", "middle")

            },
            draw_estimations: function () {

                var svg = d3.select("#estimation-canvas")

                // append the svg object to the body of the page
                svg.attr("width", this.width + this.margin.left + this.margin.right)
                    .attr("height", this.height + this.margin.top + this.margin.bottom)

                svg.select("#scale")
                    .attr("transform",
                        "translate(" + this.margin.left + "," + this.margin.top + ")");


                // set axis
                var scales = this.set_axis()

                let xScale = scales[0]
                let yScale = scales[1]


                //Color interpolation
                var color_interpolation = d3.interpolateHsl("red", "blue")


                //
                // Section for UEs
                //estimation-legend"
                // do if only we have series
                if (typeof this.get_series != 'undefined' && this.get_series.length > 0) {

                    var ue_plane = svg.select('#ue')

                    // Update the array of dots
                    ue_plane.selectAll("circle")
                        .data(this.get_series)
                        .enter()
                        .append("circle")

                    // Find out which dots to delete
                    // Delete stage
                    ue_plane.selectAll("circle")
                        .data(this.get_series)
                        .exit()
                        .remove()


                    // Update stage
                    ue_plane.selectAll("circle")
                        .data(this.get_series)
                        .attr("data-legend", function () {
                            return "UEs_Plane"
                        })
                        .attr("cx", function (d) {
                            return xScale(d.x);
                        })
                        .attr("cy", function (d) {
                            return yScale(d.y);
                        })
                        .attr("r", "3px")
                        .attr("fill", function (d) {
                            return color_interpolation(d.signal)
                        })
                }

                //
                // Section for UAVs
                //

                // do if only we have estimates
                if (typeof this.get_estimates_for_uavs != 'undefined' && this.get_estimates_for_uavs.length > 0) {

                    var uavs_plane = svg.select('#uav')

                    // Update the array of dots
                    uavs_plane.selectAll("circle")
                        .data(this.get_estimates_for_uavs)
                        .enter()
                        .append("circle")

                    // Find out which dots to delete
                    // Delete stage
                    uavs_plane.selectAll("circle")
                        .exit()
                        .remove()


                    // Update stage
                    uavs_plane.selectAll("circle")
                        .data(this.get_estimates_for_uavs)
                        .attr("cx", function (d) {
                            return xScale(d.x);
                        })
                        .attr("cy", function (d) {
                            return yScale(d.y);
                        })
                        .attr("r", "10px")


                }

            },

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
                    }).slice(0, 1)
                })
            }
            ,
            get_estimates_for_uavs: function () {
                var datarow = this.estimations
                    .filter(r => r.payload.target == 'uav')
                    .slice(0, 1).pop()

                if (typeof datarow != 'undefined' && typeof datarow.payload != 'undefined') {
                    return datarow.payload.suggested
                        .flatMap(function (d) {
                            return {
                                'x': parseFloat(d.latitude),
                                'y': parseFloat(d.longitude),
                            }
                        })
                } else {
                    return []
                }
            }
        }
    }
</script>

<style scoped>


</style>