<!--Credits : http://bl.ocks.org/weiglemc/6185069-->

<template>
    <div id="estimation-entry">
    </div>
</template>

<script>

    import * as d3 from 'd3v4';
    import * as _ from 'underscore';

    export default {
        name: "UAVPositionEstimation",
        props: ["series", "window_size", "selected_dates", "estimations"],
        data: function () {
            return {
                estimation_color: 'black',
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
        },

        methods: {
            draw_estimations: function () {


                // delete previous objects
                d3.select("#estimation-entry").selectAll("*").remove()

                var margin = {top: 20, right: 20, bottom: 30, left: 40},
                    width = 700 - margin.left - margin.right,
                    height = 700 - margin.top - margin.bottom;

                /*
                 * value accessor - returns the value to encode for a given data object.
                 * scale - maps value to a visual display encoding, such as a pixel position.
                 * map function - maps from data value to display value
                 * axis - sets up axis
                 */

                // setup x
                var xValue = function (d) {
                        return d.x;
                    }, // data -> value
                    xScale = d3.scaleLinear().range([0, width]), // value -> display
                    xMap = function (d) {
                        return xScale(xValue(d));
                    }, // data -> display
                    xAxis = d3.axisBottom().scale(xScale);

                // setup y
                var yValue = function (d) {
                        return d.y;
                    }, // data -> value
                    yScale = d3.scaleLinear().range([height, 0]), // value -> display
                    yMap = function (d) {
                        return yScale(yValue(d));
                    }, // data -> display
                    yAxis = d3.axisLeft().scale(yScale);

                // setup fill color
                var cValue = function (d) {
                    return d.signal;
                }

                var color = d3.interpolateHcl("red", "blue");

                // add the graph canvas to the body of the webpage
                var svg = d3.select("#estimation-entry").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                // add the tooltip area to the webpage
                var tooltip = d3.select("#estimation-entry").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

                // don't want dots overlapping axis, so add in buffer to data domain
                let all_data = _.union(this.get_series, this.get_estimates_for_uavs)
                xScale.domain([d3.min(all_data, xValue) - 1, d3.max(all_data, xValue) + 1]);
                yScale.domain([d3.min(all_data, yValue) - 1, d3.max(all_data, yValue) + 1]);


                // x-axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .append("text")
                    .attr("class", "label")
                    .attr("x", width)
                    .attr("y", -6)
                    .style("text-anchor", "end")
                    .text("XXXXXXXX");

                // y-axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("class", "label")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("y");

                // Block for UEs
                let data = this.get_series

                {

                    // draw dots
                    svg.append("g").selectAll(".dot")
                        .data(data)
                        .enter().append("circle")
                        .attr("class", "dot")
                        .attr("r", 10)
                        .attr("cx", xMap)
                        .attr("cy", yMap)
                        .style("fill", function (d) {
                            return color(cValue(d));
                        })
                        .on("mouseover", function (d) {
                            tooltip.transition()
                                .duration(200)
                                .style("opacity", .9);
                            tooltip.html("RSSI:" + parseFloat(d.signal).toFixed(1) + "<br/>" +
                                "X:" + parseFloat(xValue(d)).toFixed(2) + "<br/>" +
                                "Y: " + parseFloat(yValue(d)).toFixed(2))
                                .style("left", (parseInt(d3.select(this).attr("cx")) +200) + "px")
                                .style("top", (parseInt(d3.select(this).attr("cy")) + 20) + "px");
                        })
                        .on("mouseout", function () {
                            tooltip.transition()
                                .duration(500)
                                .style("opacity", 0);
                        });

                }

                //Block for UAVs
                data = this.get_estimates_for_uavs

                {

                    // draw dots
                    svg.append("g").selectAll(".dot")
                        .data(data)
                        .enter().append("circle")
                        .attr("class", "dot")
                        .attr("r", 20)
                        .attr("cx", xMap)
                        .attr("cy", yMap)
                        .style("fill", 'black')
                        .on("mouseover", function (d) {
                            tooltip.transition()
                                .duration(200)
                                .style("opacity", .9);
                            tooltip.html("Suggested position" + "<br/>" +
                                "X:" + parseFloat(xValue(d)).toFixed(2) + "<br/>" +
                                "Y: " + parseFloat(yValue(d)).toFixed(2))
                                .style("left", (parseInt(d3.select(this).attr("cx")) +200) + "px")
                                .style("top", (parseInt(d3.select(this).attr("cy")) + 20) + "px");
                        })
                        .on("mouseout", function () {
                            tooltip.transition()
                                .duration(500)
                                .style("opacity", 0);
                        });

                }

                // draw legend
                var legend = svg.selectAll(".legend")
                //.data(color.domain())
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) {
                        return "translate(0," + i * 20 + ")";
                    });

                // draw legend colored rectangles
                legend.append("rect")
                    .attr("x", width - 18)
                    .attr("width", 18)
                    .attr("height", 18)
                    .style("fill", color);

                // draw legend text
                legend.append("text")
                    .attr("x", width - 24)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("text-anchor", "end")
                    .text(function (d) {
                        return d;
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

    .axis path,
    .axis line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }

    .dot {
        stroke: #000;
    }

    .tooltip {
        position: absolute;
        text-align: right;
        width: 60px;
        height: 12px;
        font: 10px sans-serif;
        background: #ddd;
        pointer-events: none;
    }

</style>