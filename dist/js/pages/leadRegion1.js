/**
 * Created by Komal on 10/02/16.
 */
/**
 * Created by KSingh1 on 1/27/2016.
 */

var margin = {top: 20, right: 100, bottom: 110, left: 40},
    width = $('#lead-region-bar-chart').width() - margin.left - margin.right,
    height = $('#lead-region-bar-chart').height() - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#BBD9E9", "#9BC6DF","#5EA2CA",  "#7b6888","#6b486b", "#98abc5", "#8a89a6"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .innerTickSize(-width)
    .outerTickSize(0)
    .tickFormat(d3.format(".2s"));

var svg = d3.select("#lead-region-bar-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3.select("#lead-region-bar-chart").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
//.style('margin','5px');

d3.csv("../../data/Lead_ReegionCount.csv", function(error, data) {
    if (error) throw error;
    var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Lead_Source"; });
    data.forEach(function(d) {
        d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
    });

    x0.domain(data.map(function(d) { return d.Lead_Source; }));
    x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text").style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .style('font-size', 10)
        .attr("transform", function(d) {
            return "rotate(-45)"
        });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Counts");

    var state = svg.selectAll(".state")
        .data(data)
        .enter().append("g")
        .attr("class", "state")
        .attr("transform", function(d) { return "translate(" + x0(d.Lead_Source) + ",0)"; });

    var state_rect = state.selectAll("rect")
        .data(function(d) { return d.ages; })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.name); })
        .attr("y", height)
        .attr("height", 0)
        .style("fill", function(d) { return color(d.name); })
        .on('mouseover', function(d,i) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html('Total Conversion : ' + d.value + "  <br>")
                .style("left", (d3.mouse(this)[0]) + "px")
                .style("top", (d3.mouse(this)[1]) + "px");
        })
        .on('mouseout', function(d,i) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    state_rect.transition()
        .attr('height', function(d) { return height - y(d.value); })
        .attr('y', function(d) { return y(d.value); })
        .delay(function (d, i) {
            return i * 20;
        })
        .duration(2000)
        .ease('elastic');

    svg.append("g")
        .attr("class", "title")
        .append("text")
        .attr("x", width/4)
        .attr("y", height+margin.bottom-15)
        .attr("dy", ".71em")
        .style("text-anchor", "start")
        .style('font-size',16)
        .text("LeadSource vs Region Conversion Count");

    var legend = svg.selectAll(".legend")
        .data(ageNames.slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(120," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - margin.right+10)
        .attr("width", 13)
        .attr("height", 13)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - margin.right+30)
        .attr("y", 7)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .style('font-size', 10)
        .text(function(d) { return d; });

});

