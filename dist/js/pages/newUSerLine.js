<<<<<<< HEAD

    // plot a graph of miles vs. time

function parser(d) {
    //d.pMPG = +d.MPG;
    d.pOdometer = +d.values;
    d.pDate = new Date(d.key);
    return d;
}

var format = d3.time.format("%m/%d/%Y");

function milesovertime(csvdata) {
    var margin = {top: 30, right: 20, bottom: 70, left: 50};
    var width = 450 - margin.left - margin.right;
    var height = 350 - margin.top - margin.bottom;

    var minDate = csvdata[0].pDate;
    var maxDate = csvdata[csvdata.length/2 - 18].pDate;

    var x = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([d3.min(csvdata, function (d) {
            return d.pOdometer;
        }), d3.max(csvdata, function (d) {
            return d.pOdometer;
        })])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(6)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
       // .innerTickSize(-width)
       // .outerTickSize(0)
        .ticks(7)
        .orient("left");

    var svg = d3.select("#miles").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var line = d3.svg.line()
        .x(function(d) { return x(d.pDate); } )
        .y(function(d) { return y(d.pOdometer); } );


    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([0, 60])
        .html(function(d) {
            return "<strong>" + d.pOdometer +
                " Customers on Date</strong><br>" +
                format(d.pDate) + "<br>" ;
        });

    svg.call(tip);

    // add the x axis and x-label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 9)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
        .style('fill', 'white')
        .style("text-anchor", "start");

    svg.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .style('fill', 'white')
        .text("Month in 2015");

    // add the y axis and y-label
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .style('fill', 'white')
        .call(yAxis);

    svg.append("text")
        .attr("class", "ylabel")
        .attr("y", 0 - margin.left) // x and y switched due to rotation!!
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .style('fill','white')
        .text("Total Customer Count");

    svg.append("text")
        .attr("class", "graphtitle")
        .attr("y", 10)
        .attr("x", width/2)
        .style("text-anchor", "middle")
        .style('fill', 'white')
        .text("CUSTOMERS OVER TIME");

    // draw the line
    svg.append("path").
        style('stroke', 'white')
        .style('stroke-width', 2)
        .style('fill', 'none')
        .attr("d", line(csvdata));

    svg.selectAll(".dot")
        .data(csvdata)
        .enter().append("circle")
        .attr('class', 'datapoint')
        .attr('cx', function(d) { return x(d.pDate); })
        .attr('cy', function(d) { return y(d.pOdometer); })
        .attr('r', 3)
        .attr('fill', 'steelblue')
        .attr('stroke', 'white')
        .attr('stroke-width', '2')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
}
// Read in .csv data and make graph
d3.csv("data/result.csv", parser,
    function(error, csvdata) {
        milesovertime(csvdata);
    });

=======

    // plot a graph of miles vs. time

function parser(d) {
    //d.pMPG = +d.MPG;
    d.pOdometer = +d.values;
    d.pDate = new Date(d.key);
    return d;
}

var format = d3.time.format("%m/%d/%Y");

function milesovertime(csvdata) {
    var margin = {top: 30, right: 20, bottom: 70, left: 50};
    var width = 450 - margin.left - margin.right;
    var height = 350 - margin.top - margin.bottom;

    var minDate = csvdata[0].pDate;
    var maxDate = csvdata[csvdata.length/2 - 18].pDate;

    var x = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([d3.min(csvdata, function (d) {
            return d.pOdometer;
        }), d3.max(csvdata, function (d) {
            return d.pOdometer;
        })])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(6)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
       // .innerTickSize(-width)
       // .outerTickSize(0)
        .ticks(7)
        .orient("left");

    var svg = d3.select("#miles").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var line = d3.svg.line()
        .x(function(d) { return x(d.pDate); } )
        .y(function(d) { return y(d.pOdometer); } );


    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([0, 60])
        .html(function(d) {
            return "<strong>" + d.pOdometer +
                " Customers on Date</strong><br>" +
                format(d.pDate) + "<br>" ;
        });

    svg.call(tip);

    // add the x axis and x-label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 9)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
        .style('fill', 'white')
        .style("text-anchor", "start");

    svg.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .style('fill', 'white')
        .text("Month in 2015");

    // add the y axis and y-label
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .style('fill', 'white')
        .call(yAxis);

    svg.append("text")
        .attr("class", "ylabel")
        .attr("y", 0 - margin.left) // x and y switched due to rotation!!
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .style('fill','white')
        .text("Total Customer Count");

    svg.append("text")
        .attr("class", "graphtitle")
        .attr("y", 10)
        .attr("x", width/2)
        .style("text-anchor", "middle")
        .style('fill', 'white')
        .text("CUSTOMERS OVER TIME");

    // draw the line
    svg.append("path").
        style('stroke', 'white')
        .style('stroke-width', 2)
        .style('fill', 'none')
        .attr("d", line(csvdata));

    svg.selectAll(".dot")
        .data(csvdata)
        .enter().append("circle")
        .attr('class', 'datapoint')
        .attr('cx', function(d) { return x(d.pDate); })
        .attr('cy', function(d) { return y(d.pOdometer); })
        .attr('r', 3)
        .attr('fill', 'steelblue')
        .attr('stroke', 'white')
        .attr('stroke-width', '2')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
}
// Read in .csv data and make graph
d3.csv("data/result.csv", parser,
    function(error, csvdata) {
        milesovertime(csvdata);
    });

>>>>>>> origin/master
