/**
 * Created by KSingh1 on 1/27/2016.
 */
var app = angular.module('dashboardApp', ['angular-raphael-gauge']);
app.controller('dashboardController', function($scope) {
    $scope.conversionData = data = [{"key":"Addition","values":1965},{"key":"Division","values":2053},{"key":"Multiplication","values":1979},{"key":"Artios CAD","values":4003}, {"key":"subtraction", "values": 4352}];
    $scope.gauge = {
        name: 'Best Customers',
        opacity:0.55,
        value: 40,
        text: '',
        arcColor: "skyblue"
    };
    $scope.gauge1 = {
        name: 'Former Best Customers',
        opacity: 0.55,
        value: 30,
        text: '',
        arcColor: "skyblue"
    };
    $scope.gauge2 = {
        name: 'New Customers',
        opacity: 0.55,
        value: 10,
        text: '',
        arcColor: "skyblue"
    };
    $scope.gauge3 = {
        name: 'One Time User',
        opacity: 0.55,
        value: 20,
        arcColor: "skyblue",
        text: ''
    };

    $scope.loadConversionData = function () {
        //$http.get('').success(function (data) {
        //
        //})
        $scope.data = [{"key":"Addition","values":1965},{"key":"Division","values":2053},{"key":"Multiplication","values":1979},{"key":"Artios CAD","values":4003}, {"key":"subtraction", "values": 4352}];
        $scope.productData = [{"key":"Amitcalc","values":5},{"key":"Adds Ver 1.02","values":2},{"key":"SoftwareCloud ver 1.02","values":1},{"key":"Currency CAD","values":3}, {"key":"Trial ver 1.03", "values": 1}];
    }
});
app.directive('conversionChart', [function(){
    return {
        restrict: 'EA',
        scope: {
            data: '=',
            id: '@',
            title: '@',
            width: '@'
        },
        link: function (scope, element, attrs) {
            var margin = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 130
            },
            width = attrs.width,
            width = width - margin.left - margin.right,
            height = 350 - margin.top - margin.bottom;

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

            var svg = d3.select(element[0])
                .append("svg")
                .attr("id", "conv-" + attrs.id)
                .attr('width', width+margin.left+margin.right)
                .attr('height', height + margin.top + margin.bottom);

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([120, 20])
                .html(function (d) {
                    return " <strong> " +
                        (d.key) + "</strong><br><strong> Conversion : </strong>" + d.values;
                });
            svg.call(tip);

            scope.render = function (data, id) {

                var barHeight = height/data.length,
                    percent = d3.format('%');

                xScale.domain([0, d3.max(data, function(d) { return d.values;})]);
                yScale.domain(data.map(function (d) {
                    return d.key;
                }));

                // Render the SVG
                var svg = d3.select('#conv-'+id)
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
                    .attr('height', yScale.rangeBand)
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)
                    .style('fill','#98C3DC');

                bar2.transition()
                    .attr('width', function (d) {
                        return xScale(d.values);
                    })
                    .delay(function (data, i) {
                        return i * 20;
                    })
                    .duration(2000)
                    .ease('elastic');

            };
            scope.$watch('data', function (data) {
                scope.render(data, scope.id);
            }, true);
        }
    }
}]);