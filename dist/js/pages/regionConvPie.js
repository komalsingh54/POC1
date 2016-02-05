/**
 * Created by KSingh1 on 1/28/2016.
 */

d3.csv('data/LS_RGN_CONV.csv', function (data) {

    var w = 250;
    var h = 250;
    var r = h/2;
    var color = d3.scale.category20c();

    /* var filteredData = data.filter(function (d) {
     return d.SKUID == 3;
     });*/

    var keyData = d3.nest()
        .key(function(d) { return d.region;})
        .rollup(function(d) {
            return d3.sum(d, function(g) {return g.count; });
        }).entries(data);

    var div = d3.select("#region-conv-pie").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style('height',20)
       // .style('margin','10px');

    var vis = d3.select('#region-conv-pie').append("svg:svg").data([keyData]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
    var pie = d3.layout.pie().value(function(d){return d.values;});

    var arc = d3.svg.arc().outerRadius(r);

    var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
    arcs.append("svg:path")
        .attr('class', 'area')
        .attr("fill", function(d, i){
            return color(i);
        })
        .attr("d", function (d) {
            console.log(d.value);
            return arc(d);
        })
        .on('mouseover', function (d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html('Region : ' + JSON.stringify(d.data.key) + '<br>Total Conversion : ' + d.value + "")
                .style("left", (d3.mouse(this)[0]+70) + "px")
                .style("top", (d3.mouse(this)[1]+70) + "px");
        })
        .on('mouseout', function (d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .style('stroke','white')
        .style('stroke-width', 3);

    var legend = d3.select('#region-conv-pie').append("svg")
        .attr("class", "legend")
        .attr("width", 300)
        .attr("height", 50 * 2)
        .selectAll("g")
        .data(keyData)
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate("+i*100+",50 )";
        });

    legend.append("rect")
        .attr("width", 13)
        .attr("height", 13)
        .style("fill", function (d, i) {
            return color(i);
        });

    legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style('font-size', 10)
        .text(function (d) {
            return  d.key;
        });

})