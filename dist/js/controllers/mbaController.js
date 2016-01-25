/**
 * Created by KSingh1 on 1/23/2016.
 */
var mbaApp = angular.module('MBA', [])
    .factory('mbaService', ['$http', function ($http) {
        return {
            get: function (callback) {
                $http.get('../../data/mbaData.json').success(function (data) {
                    callback(data);
                });
            }
        };
    }]);
mbaApp.filter('filters', function () {
    return function (data, searchfor) {
        var nestedData = '';
        if (data == undefined) {
            return '';
        }
        if (searchfor === 'SKUID') {
            nestedData = d3.nest()
                .key(function (d) {
                    return d.SKUID;
                }).entries(data);
        }
        else {
            nestedData = d3.nest()
                .key(function (d) {
                    return d.FeatureID;
                }).entries(data);
        }
        return nestedData;
    };
});
mbaApp.controller('mbaController', function ($scope, mbaService) {
    mbaService.get(function (data) {
        var nestedData = d3.nest()
            .key(function (d) {
                return d.SKUID;
            }).entries(data);

        var nestedFtrData = d3.nest()
            .key(function (d) {
                return d.FeatureID;
            }).entries(data);

        $scope.ddData = {selectedID: 3};
        $scope.mbaData = nestedData;

        $scope.ddDataFtr = {selectedID: 1};
        $scope.mbaDataFtr = nestedFtrData;

        drawPie(data);
        drawPieFtr(data);
    });
    function drawPieFtr(data) {
        var maxWidth = 380;
        var maxHeight = 350;
        var outerRadius = 130;
        var ringWidth = 55;

        function angle(d) {
            var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
            return a > 90 ? a - 180 : a;
        }

        function checkEndAll(transition, callback) {
            var n = 0;
            transition
                .each(function () {
                    ++n;
                })
                .each("end", function () {
                    if (!--n) callback.apply(this, arguments);
                });
        }

        function drawAnimatedRingChartf(config) {

            var pie = d3.layout.pie().value(function (d) {
                return d.values;
            });

            var color = d3.scale.category20c();
            var arc = d3.svg.arc();

            function tweenPie(finish) {
                var start = {
                    startAngle: 0,
                    endAngle: 0
                };
                var i = d3.interpolate(start, finish);
                return function (d) {
                    return arc(i(d));
                };
            }

            arc.outerRadius(config.outerRadius || outerRadius)
                .innerRadius(config.innerRadius || innerRadius);
            d3.select(config.el).selectAll('text').remove();
            d3.select(config.el).selectAll('svg').remove();
            d3.select(config.el).selectAll('g').remove();

            var svg = d3.select(config.el)
                .attr({
                    width: maxWidth,
                    height: maxHeight
                });
            var text = '';
            var groups = svg.selectAll('g.arc')
                .data(pie(config.data))
                .enter()
                .append('g')
                .attr({
                    'class': 'arc',
                    'transform': 'translate(' + outerRadius + ', ' + outerRadius + ')'
                });

            groups.append('path')
                .attr({
                    'fill': function (d, i) {
                        return color(i);
                    }
                })
                .transition()
                .duration(config.duration || 1000)
                .attrTween('d', tweenPie)
                .call(checkEndAll, function () {

                    var legend = d3.select(config.el).append("svg")
                        .attr("class", "legend")
                        .attr("width", 550)
                        .attr("height", 100 * 2)
                        .selectAll("g")
                        .data(config.data)
                        .enter().append("g")
                        .attr("transform", function (d, i) {
                            return "translate(280," + i * 20 + ")";
                        });

                    legend.append("rect")
                        .attr("width", 15)
                        .attr("height", 15)
                        .style("fill", function (d, i) {
                            return color(i);
                        });

                    legend.append("text")
                        .attr("x", 24)
                        .attr("y", 9)
                        .attr("dy", ".35em")
                        .style('font-size', 10)
                        .text(function (d) {
                            return 'SKUID - ' + d.key;
                        });

                    svg.append("text")
                        .attr("x", 0)
                        .attr("y", 300)
                        .attr("dy", ".35em")
                        .text('Consuption of Features in Selected Product')
                        .style('font-size', 17);
                });
        }

        function getDataf(data, selections) {
            var data = data.filter(function (d) {
                return d.FeatureID == selections;
            });

            var data = d3.nest()
                .key(function (d) {
                    return d.SKUID;
                })
                .rollup(function (d) {
                    return d3.sum(d, function (g) {
                        return g.Usage_Count;
                    });
                }).entries(data);
            return data;
        }

        drawAnimatedRingChartf({
            el: '.animated-rings svg',
            outerRadius: outerRadius,
            innerRadius: outerRadius - ringWidth,
            data: getDataf(data)
        });
        $scope.$watch('ddDataFtr.selectedID', function (newVal, oldVal) {
            drawAnimatedRingChartf({
                el: '.animated-rings svg',
                outerRadius: outerRadius,
                innerRadius: outerRadius - ringWidth,
                data: getDataf(data, newVal)
            });
            var slct = 'FeatureID=' + newVal;
            drawBarChartf(slct);
        }, true);
        function drawBarChartf(slct) {
            var n = 6, // number of layers
                m = 13; // number of samples per layer
            var div_width = $("#bar-chart").width();
            var div_height = $("#bar-chart").height();

            var margin = {top: 20, right: 130, bottom: 100, left: 30},
                width = div_width - margin.left - margin.right,
                height = div_height - margin.top - margin.bottom;

            d3.select("#bar-chartf").selectAll('svg').remove();

            var svg = d3.select("#bar-chartf").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .style("background", "white")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.csv("../../data/MBA_Data_Final.csv", function (dataf) {

                var filtereddsf = dataf.filter(function (d) {
                    return d.CurrentProduct == slct;
                });
                console.log(filtereddsf);
                var nestedDataf = d3.nest()
                    .key(function (d) {
                        return d.CurrentProduct;
                    })
                    .entries(filtereddsf);
                console.log(nestedDataf);

                var headers = ["Support", "Confidence", "Lift"];

                var layers = d3.layout.stack()(headers.map(function (dataRange) {
                    return nestedDataf[0].values.map(function (d) {
                        return {x: d.RecommendedProduct, y: +d[dataRange]};
                    });
                }));


                var yGroupMax = d3.max(layers, function (layer) {
                    return d3.max(layer, function (d) {
                        return d.y;
                    });
                });

                var yStackMax = d3.max(layers, function (layer) {
                    return d3.max(layer, function (d) {
                        return d.y0 + d.y;
                    });
                });

                var div = d3.select("#bar-chartf").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

                var xScale = d3.scale.ordinal()
                    .domain(layers[0].map(function (d) {
                        return d.x;
                    }))
                    .rangeRoundBands([25, width], .08);

                var y = d3.scale.linear()
                    .domain([0, yGroupMax])
                    .range([height, 0]);

                var color = d3.scale.ordinal()
                    .domain(headers)
                    .range(["#3182BD", "#6BAED6", "#9ECAE1"]);

                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .tickSize(0)
                    .tickPadding(6)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .innerTickSize(-width)
                    .outerTickSize(0)
                //.tickFormat(d3.format(".2s"));

                svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(20,0)")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr({"x": -100, "y": -50})
                    .attr("dy", ".75em")
                    .style("text-anchor", "end")
                    .text("Value");

                var layer = svg.selectAll(".layer")
                    .data(layers)
                    .enter().append("g")
                    .attr("class", "layer")
                    .style("fill", function (d, i) {
                        return color(i);
                    });

                var rect = layer.selectAll("rect")
                    .data(function (d) {
                        return d;
                    })
                    .enter().append("rect")
                    .attr("x", function (d) {
                        return xScale(d.x);
                    })
                    .attr("y", height)
                    .attr("width", xScale.rangeBand())
                    .attr("height", 0)
                    .on('mousemove', function (d, i) {

                        div.transition()
                            .duration(200)
                            .style("opacity", .9);

                        div.html(d.x + '<br>' + d.y)
                            .style("left", (d3.mouse(this)[0]) + 60 + "px")
                            .style("top", (d3.mouse(this)[1]) - 20 + 'px');

                    })
                    .on("mouseout", function (d, i) {
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                        svg.selectAll(".area")
                            .transition()
                            .duration(250)
                            .attr("opacity", '1');
                    })
                    .on('click', function (d) {
                        var feature = 'Feature - ' + d.x + '<br>';
                        var freq = 'Frequency - ' + d.y;
                        var ds = feature + freq;
                        $(function () {
                            $("#dialog").dialog({
                                autoOpen: false,
                                minWidth: 550,
                                maxHeight: 350,
                                show: {
                                    effect: "blind",
                                    duration: 1000
                                },
                                hide: {
                                    effect: "blind",
                                    duration: 1000
                                }
                            });
                            $("#dialog").dialog("open");
                            $("#table").html(ds);
                        });
                    });

                rect.transition()
                    .delay(function (d, i) {
                        return i * 10;
                    })
                    .attr("y", function (d) {
                        return y(d.y0 + d.y);
                    })
                    .attr("height", function (d) {
                        return y(d.y0) - y(d.y0 + d.y);
                    });

                //********** AXES ************
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text").style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", function (d) {
                        return "rotate(-45)"
                    });

                var legendDiv = svg.append('g')
                    .attr("class", "legendDiv")
                    .style('width', '280px')
                    .style('height', '100px')
                    .attr('y', height)
                    .style("background", "#E9F0FC");

                var legend = legendDiv.selectAll(".legend")
                    .data(headers.slice().reverse())
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
                        return d;
                    });


                d3.selectAll("input").on("change", change);

                var timeout = setTimeout(function () {
                    d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
                }, 2000);

                function change() {
                    clearTimeout(timeout);
                    if (this.value === "grouped") transitionGrouped();
                    else transitionStacked();
                }

                function transitionGrouped() {
                    y.domain([0, yGroupMax]);
                    rect.transition()
                        .duration(500)
                        .delay(function (d, i) {
                            return i * 10;
                        })
                        .attr("x", function (d, i, j) {
                            return xScale(d.x) + xScale.rangeBand() / n * j;
                        })
                        .attr("width", xScale.rangeBand() / n)
                        .transition()
                        .attr("y", function (d) {
                            return y(d.y);
                        })
                        .attr("height", function (d) {
                            return height - y(d.y);
                        });

                }

                function transitionStacked() {
                    y.domain([0, yStackMax]);
                    console.log('stacked');
                    rect.transition()
                        .duration(500)
                        .delay(function (d, i) {
                            return i * 10;
                        })
                        .attr("y", function (d) {
                            return y(d.y0 + d.y);
                        })
                        .attr("height", function (d) {
                            return y(d.y0) - y(d.y0 + d.y);
                        })
                        .transition()
                        .attr("x", function (d) {
                            return xScale(d.x);
                        })
                        .attr("width", xScale.rangeBand());
                }

            });
        }
    }

    function drawPie(data) {
        var maxWidth = 380;
        var maxHeight = 350;
        var outerRadius = 130;
        var ringWidth = 55;

        function angle(d) {
            var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
            return a > 90 ? a - 180 : a;
        }

        function checkEndAll(transition, callback) {
            var n = 0;
            transition
                .each(function () {
                    ++n;
                })
                .each("end", function () {
                    if (!--n) callback.apply(this, arguments);
                });
        }

        function drawAnimatedRingChart(config) {

            var pie = d3.layout.pie().value(function (d) {
                return d.values;
            });

            var color = d3.scale.category20c();
            var arc = d3.svg.arc();

            function tweenPie(finish) {
                var start = {
                    startAngle: 0,
                    endAngle: 0
                };
                var i = d3.interpolate(start, finish);
                return function (d) {
                    return arc(i(d));
                };
            }

            arc.outerRadius(config.outerRadius || outerRadius)
                .innerRadius(config.innerRadius || innerRadius);


            d3.select(config.el).selectAll('text').remove();
            d3.select(config.el).selectAll('svg').remove();
            d3.select(config.el).selectAll('g').remove();

            var svg = d3.select(config.el)
                .attr({
                    width: maxWidth,
                    height: maxHeight
                });
            var text = '';
            var groups = svg.selectAll('g.arc')
                .data(pie(config.data))
                .enter()
                .append('g')
                .attr({
                    'class': 'arc',
                    'transform': 'translate(' + outerRadius + ', ' + outerRadius + ')'
                });

            groups.append('path')
                .attr({
                    'fill': function (d, i) {
                        return color(i);
                    }
                })
                .transition()
                .duration(config.duration || 1000)
                .attrTween('d', tweenPie)
                .call(checkEndAll, function () {

                    var legend = d3.select(config.el).append("svg")
                        .attr("class", "legend")
                        .attr("width", 550)
                        .attr("height", 100 * 2)
                        .selectAll("g")
                        .data(config.data)
                        .enter().append("g")
                        .attr("transform", function (d, i) {
                            return "translate(280," + i * 20 + ")";
                        });

                    legend.append("rect")
                        .attr("width", 15)
                        .attr("height", 15)
                        .style("fill", function (d, i) {
                            return color(i);
                        });

                    legend.append("text")
                        .attr("x", 24)
                        .attr("y", 9)
                        .attr("dy", ".35em")
                        .style('font-size', 10)
                        .text(function (d) {
                            return 'FeatureID - ' + d.key;
                        });

                    svg.append("text")
                        .attr("x", 0)
                        .attr("y", 300)
                        .attr("dy", ".35em")
                        .text('Consuption of Features in Selected Product')
                        .style('font-size', 17);
                });
        }

        function getData(data, selections) {
            var data = data.filter(function (d) {
                return d.SKUID == selections;
            });

            var data = d3.nest()
                .key(function (d) {
                    return d.FeatureID;
                })
                .rollup(function (d) {
                    return d3.sum(d, function (g) {
                        return g.Usage_Count;
                    });
                }).entries(data);
            return data;
        }

        drawAnimatedRingChart({
            el: '.animated-ring svg',
            outerRadius: outerRadius,
            innerRadius: outerRadius - ringWidth,
            data: getData(data)
        });
        $scope.$watch('ddData.selectedID', function (newVal, oldVal) {
            drawAnimatedRingChart({
                el: '.animated-ring svg',
                outerRadius: outerRadius,
                innerRadius: outerRadius - ringWidth,
                data: getData(data, newVal)
            });
            var slct = 'SKUID=' + newVal;
            drawBarChart(slct);
        }, true);

        function drawBarChart(slct) {
            var n = 6, // number of layers
                m = 13; // number of samples per layer
            var div_width = $("#bar-chart").width();
            var div_height = $("#bar-chart").height();

            var margin = {top: 20, right: 130, bottom: 100, left: 30},
                width = div_width - margin.left - margin.right,
                height = div_height - margin.top - margin.bottom;

            d3.select("#bar-chart").selectAll('svg').remove();

            var svg = d3.select("#bar-chart").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .style("background", "white")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.csv("../../data/MBA_Data_Final.csv", function (data) {

                var filteredds = data.filter(function (d) {
                    return d.CurrentProduct == slct;
                });

                var nestedData = d3.nest()
                    .key(function (d) {
                        return d.CurrentProduct;
                    })
                    .entries(filteredds);

                var headers = ["Support", "Confidence", "Lift"];

                var layers = d3.layout.stack()(headers.map(function (dataRange) {
                    return nestedData[0].values.map(function (d) {
                        return {x: d.RecommendedProduct, y: +d[dataRange]};
                    });
                }));


                var yGroupMax = d3.max(layers, function (layer) {
                    return d3.max(layer, function (d) {
                        return d.y;
                    });
                });

                var yStackMax = d3.max(layers, function (layer) {
                    return d3.max(layer, function (d) {
                        return d.y0 + d.y;
                    });
                });

                var div = d3.select("#bar-chart").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

                var xScale = d3.scale.ordinal()
                    .domain(layers[0].map(function (d) {
                        return d.x;
                    }))
                    .rangeRoundBands([25, width], .08);

                var y = d3.scale.linear()
                    .domain([0, yGroupMax])
                    .range([height, 0]);

                var color = d3.scale.ordinal()
                    .domain(headers)
                    .range(["#3182BD", "#6BAED6", "#9ECAE1"]);

                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .tickSize(0)
                    .tickPadding(6)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .innerTickSize(-width)
                    .outerTickSize(0)
                //.tickFormat(d3.format(".2s"));

                svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(20,0)")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr({"x": -100, "y": -50})
                    .attr("dy", ".75em")
                    .style("text-anchor", "end")
                    .text("Value");

                var layer = svg.selectAll(".layer")
                    .data(layers)
                    .enter().append("g")
                    .attr("class", "layer")
                    .style("fill", function (d, i) {
                        return color(i);
                    });

                var rect = layer.selectAll("rect")
                    .data(function (d) {
                        return d;
                    })
                    .enter().append("rect")
                    .attr("x", function (d) {
                        return xScale(d.x);
                    })
                    .attr("y", height)
                    .attr("width", xScale.rangeBand())
                    .attr("height", 0)
                    .on('mousemove', function (d, i) {

                        div.transition()
                            .duration(200)
                            .style("opacity", .9);

                        div.html(d.x + '<br>' + d.y)
                            .style("left", (d3.mouse(this)[0]) + 60 + "px")
                            .style("top", (d3.mouse(this)[1]) - 20 + 'px');

                    })
                    .on("mouseout", function (d, i) {
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                        svg.selectAll(".area")
                            .transition()
                            .duration(250)
                            .attr("opacity", '1');
                    })
                    .on('click', function (d) {
                        var feature = 'Feature - ' + d.x + '<br>';
                        var freq = 'Frequency - ' + d.y;
                        var ds = feature + freq;
                        $(function () {
                            $("#dialog").dialog({
                                autoOpen: false,
                                minWidth: 550,
                                maxHeight: 350,
                                show: {
                                    effect: "blind",
                                    duration: 1000
                                },
                                hide: {
                                    effect: "blind",
                                    duration: 1000
                                }
                            });
                            $("#dialog").dialog("open");
                            $("#table").html(ds);
                        });
                    });

                rect.transition()
                    .delay(function (d, i) {
                        return i * 10;
                    })
                    .attr("y", function (d) {
                        return y(d.y0 + d.y);
                    })
                    .attr("height", function (d) {
                        return y(d.y0) - y(d.y0 + d.y);
                    });

                //********** AXES ************
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text").style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", function (d) {
                        return "rotate(-45)"
                    });

                var legendDiv = svg.append('g')
                    .attr("class", "legendDiv")
                    .style('width', '280px')
                    .style('height', '100px')
                    .attr('y', height)
                    .style("background", "#E9F0FC");

                var legend = legendDiv.selectAll(".legend")
                    .data(headers.slice().reverse())
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
                        return d;
                    });


                d3.selectAll("input").on("change", change);

                var timeout = setTimeout(function () {
                    d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
                }, 2000);

                function change() {
                    clearTimeout(timeout);
                    if (this.value === "grouped") transitionGrouped();
                    else transitionStacked();
                }

                function transitionGrouped() {
                    y.domain([0, yGroupMax]);
                    rect.transition()
                        .duration(500)
                        .delay(function (d, i) {
                            return i * 10;
                        })
                        .attr("x", function (d, i, j) {
                            return xScale(d.x) + xScale.rangeBand() / n * j;
                        })
                        .attr("width", xScale.rangeBand() / n)
                        .transition()
                        .attr("y", function (d) {
                            return y(d.y);
                        })
                        .attr("height", function (d) {
                            return height - y(d.y);
                        });

                }

                function transitionStacked() {
                    y.domain([0, yStackMax]);
                    console.log('stacked');
                    rect.transition()
                        .duration(500)
                        .delay(function (d, i) {
                            return i * 10;
                        })
                        .attr("y", function (d) {
                            return y(d.y0 + d.y);
                        })
                        .attr("height", function (d) {
                            return y(d.y0) - y(d.y0 + d.y);
                        })
                        .transition()
                        .attr("x", function (d) {
                            return xScale(d.x);
                        })
                        .attr("width", xScale.rangeBand());
                }

            });
        }
    }
});
/*mbaApp.directive('dropDownList', [ '$filter',
 function ($filter) {
 return {
 restrict: 'EA',
 scope: {
 data: '=',
 id: '@',
 filterValue:'='
 },
 link: function (scope, element, attrs) {
 scope.render = function (data, id) {

 d3.select("#"+id).selectAll('div').remove();

 var select = d3.select("#"+id)
 .append("div")
 .attr('class', 'col-md-2')
 .style('display','inline')
 .append("select")
 .attr('class', 'form-control')
 .attr('id',('dd'+id))
 .style('height','29px')
 .attr('ng-model','myModel');

 select.selectAll("option")
 .data(data)
 .enter()
 .append("option")
 .attr("value", function (d) { return d.value; })
 .text(function (d) { return d.key; });
 };
 scope.$watch('data', function (data) {
 data = $filter('filters')(data, scope.filterValue);
 scope.render(data, scope.id);
 }, true);
 }
 };
 }]
 );*/

