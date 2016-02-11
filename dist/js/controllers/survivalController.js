/**
 * Created by KSingh1 on 2/4/2016.
 */
/**
 * Created by Komal on 02/02/16.
 */
var app = angular.module('survival', []);
app.controller('survivalController', function ($scope, $http) {

    $scope.$watch('selectEngage', function (selectEngage) {
        var file = '../../data/'+selectEngage+'.json';
       $http.get(file).success( function (data) {
           engagement(data, 'strata2',selectEngage)
       })
    });

    $scope.$watch('selectChurn', function (selectChurn) {
        var file = '../../data/'+selectChurn+'.json';
        $http.get(file).success( function (data) {
            churn(data, 'miles5', selectChurn)
        })
    });

    var engagement = function(data, id, title) {
        var margin = {top: 50, right: 130, bottom: 45, left: 40},
            width = $('#'+id).width() - margin.left - margin.right,
            height = $('#'+id).height() - margin.top - margin.bottom;

        var x = d3.scale.linear().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis().scale(x)
            .innerTickSize(-height)
            .outerTickSize(0)
            .orient("bottom").ticks(10);

        var yAxis = d3.svg.axis().scale(y)
            .innerTickSize(-width)
            .outerTickSize(1)
            .orient("left").ticks(8);

        var priceline = d3.svg.line()
            .x(function(d) { return x(d.Time); })
            .y(function(d) { return y(d.Cummlative_hazard); });

        d3.select("#"+id).selectAll('svg').remove();

        var svg = d3.select("#"+id)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([120, 20])
            .html(function (d) {
                return" Day- " +
                    (d.Time) + "<br><strong> Customers - &nbsp;</strong>" + d3.format(".0%")(d.Cummlative_hazard) +
                    "<br>Risk - &nbsp;"+ d.Risk;
            });

        svg.call(tip);

        data.forEach(function(d) {
            d.Time = (d.Time);
            d.Cummlative_hazard = +d.Cummlative_hazard;
        });

        x.domain([0,d3.max(data, function(d) { return d.Time+15; })]);
        y.domain([0,1/*d3.max(data, function(d) { return d.Cummlative_hazard; })*/]);

        var dataNest = d3.nest()
            .key(function(d) {return d.Strata;})
            .entries(data);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", 9)
            .attr("x", 9)
            .attr("dy", ".35em")
            //.attr("transform", "rotate(45)")
            .style("text-anchor", "start");


        var titles;

        if(title== 'cc')
            titles='Survival Distribution by Customer Care Calls';
        else if( title == '')
            titles = 'Survival Deistribution by Postpaid or Others';
        else
            titles = 'Rate of Customer Churn';

        svg.append("text")
            .attr("class", "graphtitle")
            .attr("y", -30)
            .attr("x", width / 2)
            .style("text-anchor", "middle")
            .text(titles);

        svg.append("text")
            .attr("class", "xlabel")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom-10)
            .style('color', 'steelblue')
            .style('font-size',16)
            .text("Number of days ");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("text")
            .attr("class", "ylabel")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .text("Percentage Survived");

        var color= ['blue','silver','orange'];

        dataNest.forEach(function(d) {
            svg.append("path")
                .attr("class", "line")
                .attr("d", priceline(d.values))
                .style('fill', 'none')
                .style('stroke', color[d.key]);

        });

        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr('class', 'datapoint')
            .attr('cx', function (d) {
                return x(d.Time);
            })
            .attr('cy', function (d) {
                return y(d.Cummlative_hazard);
            })
            .attr('r', 2)
            .attr('fill', 'white')
            .attr('stroke', function (d,i) {
                return color[d.Strata];
            })
            .attr('stroke-width', '1')
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        //strata- orange - hight cc
        //silver low cc
        var legendDiv = svg.append('g')
            .attr("class", "legendDiv")
            .style('width', '300px')
            .style('height', '100px')
            .attr('y', height)
            .style("background", "#E9F0FC");

        var legend = legendDiv.selectAll(".legend")
            .data(dataNest)
            .enter().append("g")
            .attr("class", "legend")
            .style("background", "#E9F0FC")
            .attr("transform", function (d, i) {
                return "translate(10," + i * 18 + ")";
            });

        legend.append("rect")
            .attr("x", width)
            .attr("width", 12)
            .attr("height", 12)
            .style("fill", function (d) {
                return color[d.key];
            });

        legend.append("text")
            .attr("x", width +15)
            .attr("y", 7)
            .attr("dy", ".35em")
            .style("font-size", "12")
            .text(function (d) {
                if(d.key == 1 ){
                    if(title=='cc')
                        return 'Low ' + 'Customer Care Calls';
                    else if(title == 'pre_post_survival')
                        return 'Low ' + 'Postpaid or Others';
                    else
                        return 'Rate of Customer Churn';
                }
                else
                {
                    if(title=='cc')
                        return 'High ' + 'Customer Care Calls';
                    else if(title == 'pre_post_survival')
                        return 'High ' + 'Postpaid or Others';
                    else
                        return 'Rate of Customer Churn';
                }
            });
    };
    var churn = function (data1, id, title) {
        var margin = {top: 50, right: 160, bottom: 45, left: 50},
            width = $('#'+id).width() - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var x = d3.scale.linear().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis().scale(x)
            .innerTickSize(-height)
            .outerTickSize(0)
            .orient("bottom").ticks(10);

        var yAxis = d3.svg.axis().scale(y)
            .innerTickSize(-width)
            .outerTickSize(1)
            .orient("left").ticks(8);

        var priceline = d3.svg.line()
            .x(function(d) { return x(d.Time); })
            .y(function(d) { return y(d.Surv); });

        d3.select("#"+id).selectAll('svg').remove();

        var svg = d3.select("#"+id)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        var color= ['blue','silver','orange'];

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([120, 20])
            .html(function (d) {
                return "<strong>Customers - &nbsp;</strong>" + d3.format(".0%")(d.Surv) +
                    " <br>Day- " +
                    (d.Time) + "<br>Risk - &nbsp;"+ d.Risk;
            });

        svg.call(tip);

        data1.forEach(function(d) {
            d.Time = (d.Time);
            d.Surv = +d.Surv;
        });

        x.domain([0,d3.max(data1, function(d) { return d.Time+15; })]);
        y.domain([0,d3.max(data1, function(d) { return d.Surv; })]);

        var dataNest = d3.nest()
            .key(function(d) {return d.Strata;})
            .entries(data1);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", 9)
            .attr("x", 9)
            .attr("dy", ".35em")
            //.attr("transform", "rotate(45)")
            .style("text-anchor", "start");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("text")
            .attr("class", "ylabel")
            .attr("y", 0 - margin.left) // x and y switched due to rotation!!
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .text("Percentage Survived");

        var titles;

        if(title == 'cc')
            titles = 'Survival Distribution by Customer Care Calls';
        else if(title == 'pre_post_survival')
            titles = 'Survival Distribution by Postpaid or others';
        else
            titles = title;

        svg.append("text")
            .attr("class", "graphtitle")
            .attr("y", -30)
            .attr("x", width / 2)
            .style("text-anchor", "middle")
            .text(titles);

        svg.append("text")
            .attr("class", "xlabel")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom-10)
            .style('color', 'steelblue')
            .style('font-size',16)
            .text("Number of days ");

        var color= ['blue','silver','orange'];

        dataNest.forEach(function(d) {
            svg.append("path")
                .attr("class", "line")
                .attr("d", priceline(d.values))
                .style('stroke', color[d.key]);

        });

        svg.selectAll(".dot")
            .data(data1)
            .enter().append("circle")
            .attr('class', 'datapoint')
            .attr('cx', function (d) {
                return x(d.Time);
            })
            .attr('cy', function (d) {
                return y(d.Surv);
            })
            .attr('r', 2)
            .attr('fill', 'white')
            .attr('stroke',  function (d,i) {
                return color[d.Strata];
            })
            .attr('stroke-width', '1')
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        var legendDiv = svg.append('g')
            .attr("class", "legendDiv")
            .style('width', '3000px')
            .style('height', '100px')
            .attr('y', height)
            .style("background", "#E9F0FC");

        var legend = legendDiv.selectAll(".legend")
            .data(dataNest)
            .enter().append("g")
            .attr("class", "legend")
            .style("background", "#E9F0FC")
            .attr("transform", function (d, i) {
                return "translate(20," + i * 18 + ")";
            });

        legend.append("rect")
            .attr("x", width-5)
            .attr("width", 12)
            .attr("height", 12)
            .style("fill", function (d) {
                return color[d.key];
            });

        legend.append("text")
            .attr("x", width + 18)
            .attr("y", 7)
            .attr("dy", ".35em")
            .style("font-size", "12")
            .text(function (d) {
                if(d.key == 1 ){
                    if(title=='cc')
                        return 'Low ' + 'Customer Care Calls';
                    else if(title == '')
                        return 'Low ' + 'Postpaid or Others';
                    else
                        return 'Rate of Customer Engaged';
                }
                else
                {
                    if(title=='cc')
                        return 'High ' + 'Customer Care Calls';
                    else if(title == 'pre_post_survival')
                        return 'High ' + 'Postpaid or Others';
                    else
                        return 'Rate of Customer Engaged';
                }

            });
    };
    $scope.load = function () {
        $http.get('../../data/cc.json').success(function (data) {

            engagement(data, 'strata2','Strata-2');
            churn(data, 'miles5','Strata-2');

        });
        $http.get('../../data/fullSurvival.json').success(function (data) {
            $scope.data3 = data;
            engagement(data,'miles1','Rate of Customer Churn');
        });
    };

    $scope.load1 = function () {
        $http.get('../../data/survival.json').success(function (data1) {
            $scope.data1 = data1;
            var strata1 = data1.filter(function (d) {
                return d.Strata == 1;
            });
            var strata2 = data1.filter(function (d) {
                return d.Strata == 2;
            });
            //churn(strata1, 'miles4', 'Strata-1');
            churn(strata2, 'miles5', 'Strata-2');

            var dates = [];
            for (var i = 0; i < 31; i++ ) {
                if (i % 7 == 0) dates.push([]);
                dates[dates.length-1].push(data1[i]);
            }
            $scope.dates = dates;

        });
        $http.get('../../data/fullSurvival.json').success(function (data1) {
            $scope.data1 = data1;
            churn(data1, 'miles2', 'Rate of Customer Engaged');

        });

    }
});