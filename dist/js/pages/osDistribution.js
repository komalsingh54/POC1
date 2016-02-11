<<<<<<< HEAD
/**
 * Created by KSingh1 on 1/28/2016.
 */
function conversion(id, data) {
        /*data = d3.nest()
            .key(function (d) {
                return d.OS_Distribution;
            })
            .rollup(function (leaves) {
                return leaves.length;
            })
            .entries(data);*/
       // data = [{"key":"Addition","values":1965},{"key":"Division","values":2053},{"key":"Multiplication","values":1979},{"key":"Artios CAD","values":4003}, {"key":"subtraction", "values": 4352}];

        var margin = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 150
            },
            width = parseInt(d3.select('#'+id).style('width'), 10),
            width = width - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom,
            barHeight = height/data.length,
            percent = d3.format('%');

        var xScale = d3.scale.linear()
            .range([0, width]);

        var yScale = d3.scale.ordinal()
            .rangeRoundBands([0, height], 0.3);

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .ticks(5);

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left');

        xScale.domain([0, d3.max(data, function(d) { return d.values;})]);
        yScale.domain(data.map(function (d) {
            return d.key;
        }));


        // Render the SVG
        var svg = d3.select('#'+id)
            .append('svg')
            .attr('width', width+margin.left+margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        var bar2 = svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', function (d) {
                return yScale(d.key);
            })
            .attr('width', 0)
            .attr('height', yScale.rangeBand);

        bar2.transition()
            .attr('width', function (d) {
                return xScale(d.values);
            })
            .delay(function (data, i) {
                return i * 20;
            })
            .duration(2000)
            .ease('elastic');


}
=======
/**
 * Created by KSingh1 on 1/28/2016.
 */
d3.csv('data/dashboardData.csv' , function(data) {
    data = d3.nest()
        .key(function (d) {
            return d.OS_Distribution;
        })
        .rollup(function (leaves) {
            return leaves.length;
        })
        .entries(data);

    var margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 150
        },
        width = parseInt(d3.select('#os-chart').style('width'), 10),
        width = width - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom,
        barHeight = height/data.length,
        percent = d3.format('%');

    var xScale = d3.scale.linear()
        .range([0, width]);

    var yScale = d3.scale.ordinal()
        .rangeRoundBands([0, height], 0.3);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .ticks(5);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left');

    xScale.domain([0, d3.max(data, function(d) { return d.values;})]);
    yScale.domain(data.map(function (d) {
        return d.key;
    }));

    var svg = d3.select('#os-chart')
        .append('svg')
        .attr('width', width+margin.left+margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .style('fill', 'steelblue')
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .style('fill', 'steelblue')
        .call(yAxis);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([0, 60])
        .html(function(d) {
            return "<strong>" + d.values +
                " Units</strong><br>";
        });
    svg.call(tip);

    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('y', function (d) {
            return yScale(d.key);
        })
        .attr('width', function (d) {
            return xScale(d.values)
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .attr('height', yScale.rangeBand)
        .style('fill', 'steelblue');


});
>>>>>>> origin/master
