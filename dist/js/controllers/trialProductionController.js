/**
 * Created by Komal on 03/02/16.
 */
var app = angular.module('trail', ['angular-raphael-gauge']);
app.controller('trailController', function($scope, $http) {
    $scope.load = function() {
        $scope.gauge = {
            name: 'Prediction',
            opacity: 0.55,
            value: 40,
            text: 'Prediction',
            arcColor: "skyblue"
        };
        $http.get('../../data/trial2Production.json').success(function(data) {

            $scope.data = data;

            $scope.$watch('x_axis', function (x_axis) {
                callin(x_axis);
            });

            $scope.$watch('y_axis', function (y_axis) {
                calln(y_axis);
            });
            var callin = function (x_axis) {
                var filteredData = $scope.data.filter(function(d) {
                    return d.Conversion = $scope.y_axis;
                });
                var data = d3.nest()
                    .key(function (d) {
                        if(x_axis == 'Region')
                            return d.Region;
                        if(x_axis == 'Operating_system')
                            return d.Operating_system;
                        if(x_axis == 'Industry')
                            return d.Industry;
                        if(x_axis == 'Lead_Source')
                            return d.Lead_Source;
                        if(x_axis == 'Device')
                            return d.Device;
                    })
                    .rollup(function(d) {
                        return d3.sum(d, function (v) {
                            return 1;
                        })
                    })
                    .entries(filteredData);
                draw(x_axis, $scope.y_axis, data);
            };
            var calln = function (y_axis) {
                var filteredData = $scope.data.filter(function(d) {
                    return d.Conversion = y_axis;
                });
                var data = d3.nest()
                    .key(function (d) {
                        if($scope.x_axis == 'Region')
                            return d.Region;
                        if($scope.x_axis == 'Operating_system')
                            return d.Operating_system;
                        if($scope.x_axis == 'Industry')
                            return d.Industry;
                        if($scope.x_axis == 'Lead_Source')
                            return d.Lead_Source;
                        if($scope.x_axis == 'Device')
                            return d.Device;
                    })
                    .rollup(function(d) {
                        return d3.sum(d, function (v) {
                            return 1;
                        })
                    })
                    .entries(filteredData);
                draw($scope.x_axis, y_axis, data);
            };
            var draw = function (x_axis, y_axis, data)
            {

                var margin = {top: 20, right: 100, bottom: 80, left: 50},
                    width = document.getElementById('bar-chart').clientWidth - margin.left - margin.right,
                    height = document.getElementById('bar-chart').clientHeight - margin.top - margin.bottom;

                var x0 = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1);

                var x1 = d3.scale.ordinal();

                var y = d3.scale.linear()
                    .range([height, 0]);

                var color = d3.scale.ordinal()
                    .range(["#68BBEB",   "#ff8c00", "#a05d56", "#7b6888","#6b486b", "#98abc5", "#8a89a6"]);

                var xAxis = d3.svg.axis()
                    .scale(x0)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .innerTickSize(-width)
                    .outerTickSize(0);

                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([120, 20])
                    .html(function (d) {
                        return "<strong>Total Conversion :  &nbsp;</strong>" +  d.value;
                    });

                d3.select('#bar-chart').selectAll('svg').remove();

                var svg = d3.select("#bar-chart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                svg.call(tip);

                var ageNames = d3.keys(data[0]).filter(function (key) {
                    return key !== "key";
                });
                data.forEach(function (d) {
                    d.ages = ageNames.map(function (name) {
                        return {name: name, value: +d[name]};
                    });
                });

                x0.domain(data.map(function (d) {
                    return d.key;
                }));

                x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
                y.domain([0, d3.max(data, function (d) {
                    return d3.max(d.ages, function (d) {
                        return d.value;
                    });
                })]);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text").style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .style('font-size',10)
                    .attr("transform", function (d) {
                        return "rotate(-45)"
                    });

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -margin.left)
                    .attr('x', -height/2)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Counts");

                var state = svg.selectAll(".state")
                    .data(data)
                    .enter().append("g")
                    .attr("class", "state")
                    .attr("transform", function (d) {
                        return "translate(" + x0(d.key) + ",0)";
                    });

                var state_rect = state.selectAll("rect")
                    .data(function (d) {
                        return d.ages;
                    })
                    .enter().append("rect")
                    .attr("width", x1.rangeBand())
                    .attr("x", function (d) {
                        return x1(d.name);
                    })
                    .attr("y", height)
                    .attr("height", 0)
                    .style("fill", function (d) {
                        return color(d.name);
                    })
                    .on('mouseover', tip.show)
                    .on('mouseout',  tip.hide);

                state_rect.transition()
                    .attr('height', function (d) {
                        return height - y(d.value);
                    })
                    .attr('y', function (d) {
                        return y(d.value);
                    })
                    .delay(function (d, i) {
                        return i * 20;
                    })
                    .duration(2000)
                    .ease('elastic');

                var y_lable;
                if(y_axis == 1) y_lable = " Conversion";
                if(y_axis == 0) y_lable = " Non-Conversion";

                svg.append("g")
                    .attr("class", "title")
                    .append("text")
                    .attr("x", width-margin.left)
                    .attr("y", height + margin.bottom - 15)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .style('font-size', 16)
                    .text(x_axis + " " + y_lable+ " Count");

            }
        })
    }

    $scope.load1 = function () {
        $scope.gauge = {
            name: 'Prediction',
            opacity: 0.55,
            value: 34,
            text: 'Prediction',
            arcColor: "skyblue"
        };
        $http.get('../../data/trial2Production.json').success(function (datas) {


            data = datas.filter(function (d) {
                if($scope.x_axis1 == 'Windows7')
                    return d.Operating_system == 'Windows7';
                if($scope.x_axis1 == 'Windows8')
                    return d.Operating_system == 'Windows8';
                if($scope.x_axis1 == 'Windows10')
                    return d.Operating_system == 'Windows10';
                if($scope.x_axis1 == 'Android')
                    return d.Operating_system == 'Android';
                if($scope.x_axis1 == 'iOS')
                    return d.Operating_system == 'iOS';
                if($scope.x_axis1 == 'Linux')
                    return d.Operating_system == 'Linux';
            });

            $scope.$watch('x_axis1', function (x_axis1) {
                data = datas.filter(function (d) {
                    if(x_axis1 == 'Windows7')
                        return d.Operating_system == 'Windows7';
                    if(x_axis1 == 'Windows8')
                        return d.Operating_system == 'Windows8';
                    if(x_axis1 == 'Windows10')
                        return d.Operating_system == 'Windows10';
                    if(x_axis1 == 'Android')
                        return d.Operating_system == 'Android';
                    if(x_axis1 == 'iOS')
                        return d.Operating_system == 'iOS';
                    if(x_axis1 == 'Linux')
                        return d.Operating_system == 'Linux';
                });
            });
            var mapdata = data.map(function (d) { return { count: d.Day1_Feature1, Device: d.Device, Operating_system: d.Operating_system, predict: d.Predict};});

            var mapdata2 = data.map(function (d) {return { count: d.Day2_Feature2, Device: d.Device, Operating_system: d.Operating_system, predict: d.Predict};});

            var mapdata3 = data.map(function (d) { return { count: d.Day3_Feature3, Device: d.Device, Operating_system: d.Operating_system, predict: d.Predict}; });

            $scope.maxs = d3.max(mapdata, function (d) { return d.count; });
            $scope.mins = d3.min(mapdata, function (d) { return d.count; });

            $scope.max1 = d3.max(mapdata2, function (d) { return d.count; });
            $scope.min1 = d3.min(mapdata2, function (d) { return d.count; });

            $scope.val  = mapdata[0].count;
            $scope.val1 = mapdata2[0].count;

            $scope.max2 = d3.max(mapdata3, function (d) {
                return d.count;
            });

            $scope.min2 = d3.min(mapdata3, function (d) {
                return d.count;
            });

            $scope.val2 = mapdata3[1].count;

            var val1_predict, val_predict, val2_predict;

            val_predict = d3.sum(mapdata, function (d) {
                if (d.count <= parseInt($scope.val))
                    return d.predict;
            });

            val1_predict = d3.sum(mapdata3, function (d) {
                if (d.count <= parseInt($scope.val1))
                    return d.predict;
            });

            val2_predict = d3.sum(mapdata3, function (d) {
                if (d.count <= parseInt($scope.val2))
                    return d.predict;
            });

            var total_predict = parseInt(val1_predict) + parseInt(val2_predict) + parseInt(val_predict);

            $scope.gauge = {
                name: 'Prediction',
                opacity: 0.55,
                value: total_predict / 100,
                text: 'Prediction',
                arcColor: "skyblue"
            };

            $scope.$watch('val', function (val) {
                val_predict = 0;
                total_predict = 0;
                val_predict = d3.sum(mapdata, function (d) {
                    if (d.count <= parseInt(val))
                        return d.predict;
                });
                var total_predict = parseInt(val1_predict) + parseInt(val2_predict) + parseInt(val_predict);

                $scope.gauge = {
                    name: 'Prediction',
                    opacity: 0.55,
                    value: total_predict / 100,
                    text: 'Prediction',
                    arcColor: "skyblue"
                };
            });

            $scope.$watch('val2', function (val2) {
                val2_predict = 0;
                total_predict = 0;

                val2_predict = d3.sum(mapdata3, function (d) {
                    if (d.count <= parseInt(val2))
                        return d.predict;
                });

                var total_predict = parseInt(val1_predict) + parseInt(val2_predict) + parseInt(val_predict);

                $scope.gauge = {
                    name: 'Prediction',
                    opacity: 0.55,
                    value: total_predict / 100,
                    text: 'Prediction',
                    arcColor: "skyblue"
                };
            });
            $scope.$watch('val1', function (val1) {
                val1_predict = 0;
                total_predict = 0;
                val1_predict = d3.sum(mapdata2, function (d) {
                    if (d.count <= parseInt(val1))
                        return d.predict;
                });
                var total_predict = parseInt(val1_predict) + parseInt(val2_predict) + parseInt(val_predict);

                $scope.gauge = {
                    name: 'Prediction',
                    opacity: 0.55,
                    value: total_predict / 100,
                    text: 'Prediction',
                    arcColor: "skyblue"
                };
            });
        });
    }
});