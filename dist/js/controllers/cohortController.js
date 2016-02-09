/**
 * Created by KSingh1 on 1/18/2016.
 */
var app = angular.module('cohort', []);
app.factory('myService', ['$http', function ($http) {
    return {
        get: function (callback) {
            $http.get('../../data/cohortData.json').success(function (data) {
                callback(data);
            });
        }
    };
}]);
app.factory('perClientCohort', ['$http', function ($http) {
    return {
        get: function (callback) {
            $http.get('../../data/perClientData.json').success(function (data) {
                callback(data);
            });
        }
    };
}]);
app.factory('avgPerClientCohort', ['$http', function ($http) {
    return {
        get: function (callback) {
            $http.get('../../data/avgPerClient.json').success(function (data) {
                callback(data);
            });
        }
    };
}]);
app.controller('cohortController', function ($scope, $http, myService, perClientCohort, avgPerClientCohort) {

    myService.get(function (data) {
        $scope.data = data;
    });

    perClientCohort.get(function (data) {
        $scope.perClientData = data;
    });
    avgPerClientCohort.get(function (data) {
        $scope.avg = data;
    })
});
app.directive('cohortGraph', [function () {
    return {
        restrict: 'EA',
        scope: {
            data: '=',
            id: '@',
            color: '@',
            endColor: '@',
            title: '@'
        },
        link: function (scope, element, attrs) {

            var margin = {left: 80, top: 10, right: 10, bottom: 70},
                width = element[0].attributes.width.value - margin.left - margin.right,
                height = 500 - 50 - margin.top - margin.bottom;

            var attrColor = element[0].attributes.color.value;
            var endColor = element[0].attributes.endColor.value;
            var titles = element[0].attributes.title.value;

            var svg = d3.select(element[0])
                .append("svg")
                .attr("class", "cohort")
                .attr("id", "Cohort-" + attrs.id);

            scope.render = function (data, id) {

                data = buildCohortData(data);

                svg = d3.select("#Cohort-" + id)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([120, 20])
                    .html(function (d) {
                        var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        var mouseX = d3.mouse(this)[0];
                        var invertedX = x.invert(mouseX);
                        var invertedx = invertedX.getMonth();
                        return '&nbsp;&nbsp;Month: ' + (monthName[invertedx] + ',' + invertedX.getFullYear()) + '<br>&nbsp;&nbsp;Cohort Data- <br>' + getDatas(data, invertedx);
                    });

                svg.call(tip);

                var nMonths = 12,
                    newPerMonth = 100;

                var stack = d3.layout.stack()
                    .values(function (d) {
                        return d
                    });

                var stacked = stack(data);

                var x = d3.time.scale()
                    .domain(d3.extent(stacked[0], function (d) {
                        return d.x;
                    }))
                    .range([0, width]);

                var y = d3.scale.linear()
                    .domain([0, yMax()])
                    .range([height, 0]);

                svg.append('g').attr('class', 'y axis');

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom');

                var layers = svg.append('g').attr('class', 'layer');

                svg.append('g').attr('class', 'x axis')
                    .attr('transform', 'translate(0, ' + height + ')')
                    .call(xAxis)
                    .selectAll("text").style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .style("font-size", "12")
                    .attr("transform", function (d) {
                        return "rotate(-45)"
                    });

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .innerTickSize(-width)
                    .outerTickSize(0)
                    .orient('left');

                svg.select('g.y.axis')
                    .transition().duration(400)
                    .call(yAxis);

                function yMax() {
                    return d3.max(stacked, function (layer) {
                        return d3.max(layer, function (d) {
                            return d.y0 + d.y;
                        });
                    });
                }

                var zeroArea = d3.svg.area()
                    .x(function (d) {
                        return x(d.x)
                    })
                    .y0(y(0))
                    .y1(y(0));

                var area = d3.svg.area()
                    .x(function (d) {
                        return x(d.x)
                    })
                    .y0(function (d) {
                        return y(d.y0);
                    })
                    .y1(function (d) {
                        return y(d.y0 + d.y);
                    });

                var color = d3.scale.linear()
                    .domain([0, nMonths])
                    .range([attrColor, endColor]);

                var areas = bindLayers(stacked);

                areas.enter()
                    .append('path')
                    .attr('class', 'area')
                    .attr('d', zeroArea)
                    .attr('fill', function (d, i) {
                        return color(i)
                    })
                    .attr('stroke', function (d, i) {
                        return color(i)
                    })
                    .on("mouseenter", function (d, i) {
                        svg.selectAll(".area").transition()
                            .duration(250)
                            .attr("opacity", function (d, j) {
                                return j != i ? 0.8 : 1;
                            })
                    })
                    .on('mousemove', tip.show)
                    .on("mouseout", tip.hide)
                    .on("mouseleave", changeOpacity);


                function changeOpacity(d, i) {
                        svg.selectAll(".area")
                            .transition()
                            .duration(250)
                            .attr("opacity", '1');
                    }

                function getDatas(data, invertdx) {
                    var dss = '';
                    for (var i = 0; i < 12; i++) {
                        for (var j = 0; j < 12; j++) {
                            if (data[i][j].x.getMonth() == invertdx && data[i][j].y != 0) {
                                dss = dss + '&nbsp;&nbsp;Cohort ' + (i + 1) + ': ' + data[i][j].y + '<br>';
                            }
                        }
                    }
                    return dss;
                }

                var vertical = d3.select("#Cohort-" + id)
                    .append("div")
                    .attr("class", "remove")
                    .style("position", "absolute")
                    .style("z-index", "19")
                    .style("width", "1px")
                    .style("height", height)
                    .style("top", "10px")
                    .style("bottom", "30px")
                    .style("left", "0px")
                    .style("background", "#fff");

                d3.select("#Cohort-" + id)
                    .on("mousemove", function () {
                        var mousex = d3.mouse(this);
                        mousex = mousex[0] + 5;
                        vertical.style("left", mousex + "px")
                    })
                    .on("mouseover", function () {
                        var mousex = d3.mouse(this);
                        mousex = mousex[0] + 5;
                        vertical.style("left", mousex + "px")
                    });

                svg.append("g")
                    .attr("class", "x axis")
                    .append("text")
                    .attr("x", width / 4)
                    .attr("y", height + margin.bottom - 15)
                    .attr("dy", ".71em")
                    .style("text-anchor", "center")
                    .style('font-size', '17')
                    .text(titles);

                var legendDiv = svg.append('g')
                    .attr("class", "legendDiv")
                    .style('width', '280px')
                    .style('height', '100px')
                    .attr('y', height)
                    .style("background", "#E9F0FC");

                var legend = legendDiv.selectAll(".legend")
                    .data([1, 2, 3, 4, 5, 6, 7])
                    .enter().append("g")
                    .attr("class", "legend")
                    .style("background", "#E9F0FC")
                    .attr("transform", function (d, i) {
                        return "translate(30," + i * 18 + ")";
                    });

                legend.append("rect")
                    .attr("x", width)
                    .attr("width", 12)
                    .attr("height", 12)
                    .style("fill", color);

                legend.append("text")
                    .attr("x", width + 20)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("font-size", "12")
                    .text(function (d) {
                        return 'Cohort-' + d;
                    });

                function update() {
                    //stacked = stack(buildCohortData(nMonths, newPerMonth, retention()));

                    y.domain([0, yMax()])

                    svg.select('g.y.axis')
                        .transition().duration(400)
                        .call(yAxis);

                    areas.transition().duration(400)
                        .attr('d', area)

                    areas = bindLayers(stacked);

                    areas.transition().delay(600).duration(400)
                        .attr('d', area)
                }

                update();

                function bindLayers(data) {
                    return layers.selectAll('path.area').data(data, function (d, i) {
                        return i;
                    });
                }

                d3.select('form').on('submit', function () {
                    d3.event.preventDefault();
                    update();
                    return false;
                });

                function retention(set) {
                    var input = d3.select('#retention');

                    if (arguments.length) {
                        input.property('value', set);
                        return 50;
                    } else {
                        return parseFloat(50);
                    }
                }

            };
            var buildCohortData = function (data) {
                var datas = [];
                for (var cohort = 0; cohort < 12; cohort++) {
                    var values = [];

                    values.push({
                        x: new Date(Date.parse("2014-01-01").valueOf() + (1000 * 60 * 60 * 24 * 30 * 0)),
                        y: data[cohort].M1
                    });
                    values.push({
                        x: new Date(Date.parse("2014-01-01").valueOf() + (1000 * 60 * 60 * 24 * 30 * 1)),
                        y: data[cohort].M2
                    });
                    values.push({
                        x: new Date(Date.parse("2014-01-01").valueOf() + (1000 * 60 * 60 * 24 * 30 * 2)),
                        y: data[cohort].M3
                    });
                    values.push({
                        x: new Date(Date.parse("2014-01-01").valueOf() + (1000 * 60 * 60 * 24 * 30 * 3)),
                        y: data[cohort].M4
                    });
                    values.push({
                        x: new Date(Date.parse("2014-01-01").valueOf() + (1000 * 60 * 60 * 24 * 30 * 4)),
                        y: data[cohort].M5
                    });
                    values.push({
                        x: new Date(Date.parse("2014-01-01").valueOf() + (1000 * 60 * 60 * 24 * 30 * 5)),
                        y: data[cohort].M6
                    });
                    values.push({
                        x: new Date(Date.parse("2014-01-01").valueOf() + (1000 * 60 * 60 * 24 * 30 * 6)),
                        y: data[cohort].M7
                    });
                    values.push({
                        x: new Date(Date.parse("2014-01-01").valueOf() + (1000 * 60 * 60 * 24 * 30 * 7)),
                        y: data[cohort].M8
                    });
                    values.push({
                        x: new Date(Date.parse("2014-01-01").valueOf() + (1000 * 60 * 60 * 24 * 30 * 8)),
                        y: data[cohort].M9
                    });
                    values.push({
                        x: new Date(Date.parse("2014-01-01").valueOf() + (1000 * 60 * 60 * 24 * 30 * 9)),
                        y: data[cohort].M10
                    });
                    values.push({
                        x: new Date(Date.parse("2014-01-01").valueOf() + (1000 * 60 * 60 * 24 * 30 * 10)),
                        y: data[cohort].M11
                    });
                    values.push({
                        x: new Date(Date.parse("2014-01-01").valueOf() + (1000 * 60 * 60 * 24 * 30 * 11)),
                        y: data[cohort].M12
                    });
                    datas.push(values)
                }

                return datas;
            };

            scope.$watch('data', function (data) {
                scope.render(data, scope.id);
            }, true);
        }
    }
}]);