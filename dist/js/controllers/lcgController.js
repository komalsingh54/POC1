/**
 * Created by KSingh1 on 1/24/2016.
 */
var app = angular.module('Lcg', [])
    .factory('myService', ['$http', function ($http) {
        return {
            get: function (callback) {
                $http.get('../../data/lcg.json').success(function (data) {
                    // prepare data here
                    callback(data);
                });
            }
        };
    }])
    .factory('myRFMService', ['$http', function ($http) {
        return {
            get: function (callback) {
                $http.get('../../data/RFM.json').success(function (data) {
                    // prepare data here
                    callback(data);
                });
            }
        };
    }])
    .factory('myServiceP', ['$http', function ($http) {
        return {
            get: function (callback) {
                $http.get('../../data/lcg.json').success(function (data) {
                    // prepare data here
                    callback(data);
                });
            }
        };
    }])
    .factory('myServiceclc', ['$http', function ($http) {
        return {
            get: function (callback) {
                $http.get('../../data/lcg_lcv.json').success(function (data) {
                    // prepare data here
                    callback(data);
                });
            }
        };
    }])
    .factory('myServiceMLC', ['$http', function ($http) {
        return {
            get: function (callback) {
                $http.get('../../data/lcg_lcv.json').success(function (data) {
                    // prepare data here
                    callback(data);
                });
            }
        };
    }]);

app.controller("lcgController", function ($scope, $http, myService, myRFMService, myServiceP, myServiceclc, myServiceMLC) {

    myService.get(function (data) {
        $scope.tags = (data);
    });
    myRFMService.get(function (data) {
        $scope.tags1 = (data);
    });
    myServiceMLC.get(function (data) {
        $scope.tag5 = (data);
    });
    myServiceP.get(function (data) {

        $scope.tag2 = (data);
    });
    myServiceclc.get(function (data) {
        $scope.tag3 = (data);
    });

    $scope.show_best = function () {
        d3.select('#div4').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div5').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div6').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div10').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div11').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div12').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div16').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div17').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div18').style('background', 'rgba(250, 129, 30, 0.56)');

        d3.select('#div1').style('background', 'white');
        d3.select('#div2').style('background', 'white');
        d3.select('#div3').style('background', 'white');
        d3.select('#div13').style('background', 'white');
        d3.select('#div14').style('background', 'white');
        d3.select('#div15').style('background', 'white');
        d3.select('#div7').style('background', 'white');
        d3.select('#div8').style('background', 'white');
        d3.select('#div9').style('background', 'white');
    };

    $scope.show_new = function () {
        d3.select('#div4').style('background', 'white');
        d3.select('#div5').style('background', 'white');
        d3.select('#div6').style('background', 'white');
        d3.select('#div10').style('background', 'white');
        d3.select('#div11').style('background', 'white');
        d3.select('#div12').style('background', 'white');
        d3.select('#div16').style('background', 'white');
        d3.select('#div17').style('background', 'white');
        d3.select('#div18').style('background', 'white');
        d3.select('#div1').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div2').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div3').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div7').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div8').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div9').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div13').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div14').style('background', 'rgba(250, 129, 30, 0.56)');
        d3.select('#div15').style('background', 'rgba(250, 129, 30, 0.56)');
    }
});

// Custom filter for the json data
app.filter('filterData', function () {
    return function (data, searchFor) {
        var property = Object.keys(searchFor)[0];
        var result = [];

        if (searchFor.freq == '1') {
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == ">5"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '2') {
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == ">5"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '3') {
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == ">5"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '4') {
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == ">5"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '5') {
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == ">5"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '6') {
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == ">5"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '7') {
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "5"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '8') {
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "5"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '9') {
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "5"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '10') {
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "5"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '11') {
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "5"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '12') {
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "5"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '13') {
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "4"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '14') {
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "4"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '15') {
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "4"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '16') {
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "4"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '17') {
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "4"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '18') {
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "4"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '19') {
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "3"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '20') {
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "3"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '21') {
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "3"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '22') {
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "3"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '23') {
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "3"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '24') {
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "3"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '25') {
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "2"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '26') {
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "2"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '27') {
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "2"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '28') {
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "2"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '29') {
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "2"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '30') {
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "2"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '31') {
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "1"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '32') {
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "1"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '33') {
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "1"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '34') {
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "1"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '35') {
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "1"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        if (searchFor.freq == '36') {
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "1"
            })
            var feature1_count = temp.filter(function (d) {
                return d.FeatureID == "Feature01";
            });
            var feature2_count = temp.filter(function (d) {
                return d.FeatureID == "Feature02";
            });

            var tempData = [{
                'client': 'client',
                'Feature01': feature1_count.length,
                'Feature02': feature2_count.length
            }];
        }
        /*if (data[i][property].indexOf(searchFor[property]) > -1) {
         result.push(data[i]);
         }*/
        return tempData;
    };
});
app.filter('filterDataMLC', function () {
    return function (data, searchFor) {
        var property = Object.keys(searchFor)[0];
        var result = [];

        if(searchFor.freq == '1'){
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == ">5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '2'){
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == ">5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });

            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '3'){
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == ">5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '4'){
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == ">5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '5'){
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == ">5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '6'){
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == ">5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '7'){
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '8'){
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "5"
            })
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '9'){
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '10'){
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "5"
            })
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '11'){
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '12'){
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '13'){
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "4"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '14'){
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "4"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '15'){
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "4"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '16'){
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "4"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '17'){
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "4"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '18'){
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "4"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '19'){
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "3"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '20'){
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "3"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '21'){
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "3"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '22'){
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "3"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '23'){
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "3"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '24'){
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "3"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '25'){
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "2"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '26'){
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "2"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '27'){
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "2"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '28'){
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "2"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '29'){
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "2"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '30'){
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "2"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '31'){
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "1"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '32'){
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "1"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '33'){
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "1"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '34'){
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "1"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '35'){
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "1"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '36'){
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "1"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        return tempData;
    };
});

app.filter('filterDataclc', function () {
    return function (data, searchFor) {
        var property = Object.keys(searchFor)[0];
        var result = [];

        if(searchFor.freq == '1'){
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == ">5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '2'){
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == ">5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });

            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '3'){
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == ">5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '4'){
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == ">5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '5'){
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == ">5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '6'){
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == ">5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '7'){
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '8'){
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "5"
            })
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '9'){
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '10'){
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "5"
            })
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '11'){
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '12'){
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "5"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '13'){
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "4"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '14'){
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "4"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '15'){
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "4"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '16'){
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "4"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '17'){
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "4"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '18'){
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "4"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '19'){
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "3"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '20'){
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "3"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '21'){
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "3"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '22'){
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "3"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '23'){
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "3"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '24'){
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "3"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '25'){
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "2"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '26'){
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "2"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '27'){
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "2"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '28'){
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "2"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '29'){
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "2"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '30'){
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "2"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '31'){
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "1"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '32'){
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "1"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '33'){
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "1"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '34'){
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "1"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '35'){
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "1"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        if(searchFor.freq == '36'){
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "1"
            });
            var cac = temp.filter(function (d) {
                return d.variable == "cac1";
            });
            var clv = temp.filter(function (d) {
                return d.variable == "clv1";
            });

            var tempData = [];
            if(cac=='')
                tempData.push(0);
            else
                tempData.push(cac[0].value);

            if(clv=='')
                tempData.push(0);
            else
                tempData.push(clv[0].value);
        }
        return tempData;
    };
});

app.filter('filterDatas', function () {
    return function (data, searchFor) {
        var property = Object.keys(searchFor)[0];
        var result = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i][property].indexOf(searchFor[property]) > -1) {
                result.push(data[i]);
            }
        }
        return result;
    };
});

app.filter('filterDataP', function () {
    return function (data, searchFor) {
        var property = Object.keys(searchFor)[0];
        var result = [];

        if (searchFor.freq == '1') {
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == ">5"
            });
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '2') {
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == ">5"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '3') {
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == ">5"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '4') {
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == ">5"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '5') {
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == ">5"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '6') {
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == ">5"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '7') {
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "5"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '8') {
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "5"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '9') {
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "5"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '10') {
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "5"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '11') {
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "5"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '12') {
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "5"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '13') {
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "4"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '14') {
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "4"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '15') {
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "4"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '16') {
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "4"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '17') {
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "4"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '18') {
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "4"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '19') {
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "3"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '20') {
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "3"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '21') {
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "3"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '22') {
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "3"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '23') {
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "3"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '24') {
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "3"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '25') {
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "2"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '26') {
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "2"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '27') {
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "2"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '28') {
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "2"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '29') {
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "2"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '30') {
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "2"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '31') {
            var temp = data.filter(function (d) {
                return d.rec == ">80 days" && d.freq == "1"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '32') {
            var temp = data.filter(function (d) {
                return d.rec == "46-80 days" && d.freq == "1"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '33') {
            var temp = data.filter(function (d) {
                return d.rec == "20-45 days" && d.freq == "1"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '34') {
            var temp = data.filter(function (d) {
                return d.rec == "14-19 days" && d.freq == "1"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '35') {
            var temp = data.filter(function (d) {
                return d.rec == "7-13 days" && d.freq == "1"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        if (searchFor.freq == '36') {
            var temp = data.filter(function (d) {
                return d.rec == "0-6 days" && d.freq == "1"
            })
            var SKU01_count = temp.filter(function (d) {
                return d.cart == "SKU01";
            });
            var SKU01SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02";
            });
            var SKU01SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU02SKU03";
            });
            var SKU01SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU01SKU03";
            });
            var SKU02_count = temp.filter(function (d) {
                return d.cart == "SKU02";
            });
            var SKU02SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU02SKU03";
            });
            var SKU03_count = temp.filter(function (d) {
                return d.cart == "SKU03";
            });

            var tempData = [{
                'client': 'client',
                'SKU01': SKU01_count.length,
                'SKU01SKU02': SKU01SKU02_count.length,
                'SKU01SKU02SKU03': SKU01SKU02SKU03_count.length,
                'SKU01SKU03': SKU01SKU03_count.length,
                'SKU02': SKU02_count.length,
                'SKU02SKU03': SKU02SKU03_count.length,
                'SKU03': SKU03_count.length
            }];
        }
        return tempData;
    };
});

app.directive('barGraphs', [
    '$filter',
    function ($filter) {
        return {
            restrict: 'EA',
            scope: {
                data: '=',
                filtername: '=',
                filtervalue: '=',
                id: '@'
            },
            link: function (scope, element, attrs) {

                var margin = {top: 5, right: 5, bottom: 5, left: 5},
                    width = element[0].attributes.width.value - margin.left - margin.right,
                    height = element[0].attributes.height.value - margin.top - margin.bottom;

                var x = d3.scale.linear()
                    .range([0, width - margin.left - margin.right]);

                var y = d3.scale.linear()
                    .range([0, height]);

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("class", "chart")
                    .attr("id", "chart-" + attrs.id);

                scope.render = function (data, id) {

                    var keys = d3.nest().key(function (d) {
                        return d
                    })
                        .entries(data);
                    var temp = keys[0].values.length;
                    x.domain([0, width - margin.left - margin.right]);
                    y.domain([0, 100]);

                    var chart = d3.select("#chart-" + id)
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top * 2 + ")");

                    chart.append("rect")
                        .attr("class", "rect-bar")
                        .attr('x', 1)
                        .attr("y", height - y(temp))
                        .attr("height", y(temp) + 2)
                        .attr("width", (width))
                        .attr('fill', 'rgb(' + parseInt(temp * 2) + ',60,' + parseInt(temp * 2)
                        + ')')
                        .on('click', function () {
                            var text2 = '<table class="table table-condensed table-bordered table-striped table2excel data-tableName="Test Table 1" style="background: white">' +
                                '<tr class="noExl"><th>Customer ID</th><th> Contract ID</th><th>Feature ID</th><th>Last Feature Used Date</th><th>SKU01</th><th>SKU02</th><th>SKU03</th><th>Frequency</th><th>Recency</th></tr>';
                            for (var i = 0; i < keys[0].values.length; i++) {
                                text2 += '<tr><td>' + keys[0].values[i].CustomerID + '</td><td>' + keys[0].values[i].ContractID + '</td><td>' + keys[0].values[i].FeatureID + '</td><td>' + keys[0].values[i].LastFeatureUseDate + '</td><td>' + keys[0].values[i].SKU01 + '</td><td>' + keys[0].values[i].SKU02 + '</td><td>' + keys[0].values[i].SKU03 + '</td><td>' + keys[0].values[i].frequency + '</td><td>' + keys[0].values[i].recency + '</td></tr>';
                            }
                            text2 += '</table>';
                            $("#dialog").dialog({
                                autoOpen: false,
                                minWidth: 550,
                                maxHeight: 350,
                                show: {
                                    effect: "blind",
                                    duration: 1000
                                },
                                position: {
                                    my: "top center",
                                    at: "top center"
                                },
                                hide: {
                                    effect: "blind",
                                    duration: 1000
                                }
                            });
                            $("#dialog").dialog("open");
                            $("#table").html(text2);
                        });
                    chart.append("text")
                        .attr("x", 15)
                        .attr("y", height - y(temp))
                        .attr("dy", "-0.3em")
                        .text(temp)
                        .attr("class", "bar-text");
                };

                scope.$watch('data', function (data) {
                    if(data != undefined) {
                        var filtered_data = $filter(scope.filtername)(data, scope.filtervalue);
                        scope.render(filtered_data, scope.id);
                    }
                }, true);
            }
        };
    }
]);

app.directive('barGraph', [
    '$filter',
    function ($filter) {
        return {
            restrict: 'EA',
            scope: {
                data: '=',
                filtername: '=',
                filtervalue: '=',
                id: '@'
            },
            link: function (scope, element, attrs) {

                var causes = ["Feature01", "Feature02"];

                var margin = {top: 5, right: 5, bottom: 5, left: 5},
                    width = element[0].attributes.width.value - margin.left - margin.right,
                    height = element[0].attributes.height.value - margin.top - margin.bottom;

                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width]);

                var y = d3.scale.linear()
                    .rangeRound([height, 0]);

                var z = d3.scale.category20();

                var svg = d3.select(element[0]).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("id", "chart-" + attrs.id)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                scope.render = function (data, id) {

                    var layers = d3.layout.stack()(causes.map(function (c) {
                        return data.map(function (d) {
                            return {x: d.client, y: +d[c]};
                        })
                    }));

                    x.domain(layers[0].map(function (d) {
                        return d.x;
                    }));
                    y.domain([0, d3.max(layers[layers.length - 1], function (d) {
                        return d.y0 + d.y;
                    })]).nice();

                    var layer = svg.selectAll(".layer")
                        .data(layers)
                        .enter().append("g")
                        .attr("class", "layer")
                        .style("fill", function (d, i) {
                            return z(i);
                        });

                    layer.selectAll("rect")
                        .data(function (d) {
                            return d;
                        })
                        .enter().append("rect")
                        .attr("x", function (d) {
                            return x(d.x);
                        })
                        .attr("y", function (d) {
                            return y(d.y + d.y0);
                        })
                        .attr("height", function (d) {
                            return y(d.y0) - y(d.y + d.y0);
                        })
                        .attr("width", x.rangeBand() - 1);

                };
                scope.$watch('data', function (data) {
                    if(data!=undefined) {
                        data = $filter(scope.filtername)(data, scope.filtervalue);
                        scope.render(data, scope.id);
                    }
                }, true);
            }
        }
    }
]);

app.directive('barGraphp', [
    '$filter',
    function ($filter) {
        return {
            restrict: 'EA',
            scope: {
                data: '=',
                filtername: '=',
                filtervalue: '=',
                id: '@'
            },
            link: function (scope, element, attrs) {

                var causes = ["SKU01", "SKU01SKU02", 'SKU01SKU02SKU03', 'SKU01SKU03', 'SKU02', 'SKU02SKU03', 'SKU03'];

                var margin = {top: 5, right: 5, bottom: 5, left: 5},
                    width = element[0].attributes.width.value - margin.left - margin.right,
                    height = element[0].attributes.height.value - margin.top - margin.bottom;

                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width]);

                var y = d3.scale.linear()
                    .rangeRound([height, 0]);

                var z = d3.scale.category20c();

                var svg = d3.select(element[0]).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("id", "chart-" + attrs.id)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                scope.render = function (data, id) {

                    var layers = d3.layout.stack()(causes.map(function (c) {
                        return data.map(function (d) {
                            return {x: d.client, y: +d[c]};
                        })
                    }));
                    // console.log(data);
                    // console.log(layers);
                    x.domain(layers[0].map(function (d) {
                        return d.x;
                    }));
                    y.domain([0, d3.max(layers[layers.length - 1], function (d) {
                        return d.y0 + d.y;
                    })]).nice();

                    var layer = svg.selectAll(".layer")
                        .data(layers)
                        .enter().append("g")
                        .attr("class", "layer")
                        .style("fill", function (d, i) {
                            return z(i);
                        });

                    layer.selectAll("rect")
                        .data(function (d) {
                            return d;
                        })
                        .enter().append("rect")
                        .attr("x", function (d) {
                            return x(d.x);
                        })
                        .attr("y", function (d) {
                            return y(d.y + d.y0);
                        })
                        .attr("height", function (d) {
                            return y(d.y0) - y(d.y + d.y0);
                        })
                        .attr("width", x.rangeBand() - 1);

                };
                scope.$watch('data', function (data) {
                    if (data != undefined) {
                        data = $filter(scope.filtername)(data, scope.filtervalue);
                        scope.render(data, scope.id);
                    }
                }, true);
            }
        }
    }
]);
app.directive('barGraphclc', [
    '$filter',
    function ($filter) {
        return {
            restrict: 'EA',
            scope: {
                data: '=',
                filtername: '=',
                filtervalue: '=',
                id: '@'
            },
            link: function (scope, element, attrs) {

                var margin = {top: 5, right: 5, bottom: 5, left: 5},
                    width = element[0].attributes.width.value - margin.left - margin.right,
                    height = element[0].attributes.height.value - margin.top - margin.bottom;

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("class", "chart")
                    .attr("id", "chart-" + attrs.id);

                scope.render = function (data, id) {

                    var colors = d3.scale.category20c();

                    var yScale = d3.scale.linear()
                        .domain([0, 50])
                        .range([0, height]);

                    var xScale = d3.scale.ordinal()
                        .domain(d3.range(0, data.length))
                        .rangeBands([0, width]);

                    var chart = d3.select("#chart-" + id)
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top*2 + ")").selectAll('rect').data(data)
                        .enter().append('rect')
                        .style({
                            'fill': function (d, i) {
                                return colors(i);
                            }, 'stroke': '#31708f', 'stroke-width': '1'
                        })
                        .attr('width', xScale.rangeBand())
                        .attr('x', function (data, i) {
                            return xScale(i);
                        })
                        .attr('height', 0)
                        .attr('y', height);

                    chart.transition()
                        .attr('height', function (data) {
                            return yScale(data);
                        })
                        .attr('y', function (data) {
                            return height - yScale(data);
                        })
                        .delay(function (data, i) {
                            return i * 20;
                        })
                        .duration(2000)
                        .ease('elastic');

                };
                scope.$watch('data', function (data) {
                    if(data!=undefined) {
                        data = $filter(scope.filtername)(data, scope.filtervalue);
                        scope.render(data, scope.id);
                    }
                }, true);
            }
        }
    }
]);
// Bar Graph to show the result
app.directive('barGraphmlc', [
    '$filter',
    function ($filter) {
        return {
            restrict: 'EA',
            scope: {
                data: '=',
                filtername: '=',
                filtervalue: '=',
                id: '@'
            },
            link: function (scope, element, attrs) {

                var margin = {top: 5, right: 5, bottom: 5, left: 5},
                    width = element[0].attributes.width.value - margin.left - margin.right,
                    height = element[0].attributes.height.value - margin.top - margin.bottom;

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("class", "chart")
                    .attr("id", "chart-" + attrs.id);

                scope.render = function (data, id) {

                    var colors = d3.scale.category10();

                    var yScale = d3.scale.linear()
                        .domain([0, 500])
                        .range([0, height]);

                    var xScale = d3.scale.ordinal()
                        .domain(d3.range(0, data.length))
                        .rangeBands([0, width]);

                    var chart = d3.select("#chart-" + id)
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top*2 + ")").selectAll('rect').data(data)
                        .enter().append('rect')
                        .style({
                            'fill': function (d, i) {
                                return colors(i);
                            }, 'stroke': '#31708f', 'stroke-width': '1'
                        })
                        .attr('width', xScale.rangeBand())
                        .attr('x', function (data, i) {
                            return xScale(i);
                        })
                        .attr('height', 0)
                        .attr('y', height);

                    chart.transition()
                        .attr('height', function (data) {
                            return yScale(data);
                        })
                        .attr('y', function (data) {
                            return height - yScale(data);
                        })
                        .delay(function (data, i) {
                            return i * 20;
                        })
                        .duration(2000)
                        .ease('elastic');


                };
                scope.$watch('data', function (data) {
                    if(data != undefined) {
                        data = $filter(scope.filtername)(data, scope.filtervalue);
                        scope.render(data, scope.id);
                    }
                }, true);
            }
        }
    }
]);

app.directive('histogramFrequency', ['$filter', function ($filter) {
    return {
        restrict: 'EA',
        scope: {
            data: '=',
            bin: '=',
            id: '@',
            width:'@',
            height:'@'
        },
        link: function (scope, element, attrs) {
            var margin = {top: 20, right: 20, bottom: 50, left: 50},
                width = attrs.width - margin.left - margin.right,
                height = attrs.height - margin.top - margin.bottom;

            var div = d3.select(element[0]).append("div")
                .attr("class", "tooltip")
                .style("opacity", 0)
                .style('margin','10px');

            var svg = d3.select(element[0])
                .append("svg")
                .attr("id", "chart-" + attrs.id)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            scope.render = function (data, id) {

                var bin = parseInt(d3.select("#binwidthf").node().value);
                var map = data.map(function (i) {
                    return parseInt(i.frequency);
                });

                var xScale = d3.scale.linear()
                    .domain([0, d3.max(map)])
                    .range([0, width]);

                var histogram = d3.layout.histogram()
                    .bins(d3.range(xScale.domain()[0], xScale.domain()[1]+bin,bin))
                (map);

                var yScale = d3.scale.linear()
                    .domain([0, d3.max(histogram.map(function (i) {
                        return i.length;
                    }))])
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(bin*2);

                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .innerTickSize(-width)
                    .outerTickSize(0)
                    .ticks(10);

                svg.append("g")
                    .attr("class", "y1 axis")
                    .attr("transform", "translate(0,0)")
                    .call(yAxis);

                var xBinwidth = width / histogram.length - 2;

                svg.append("g")
                    .attr("class", "x1 axis")
                    .attr("transform", "translate(0,"+height+")")
                    .call(xAxis);

                var tmp = svg.selectAll(".bar")
                    .data(histogram)
                    .enter()
                    .append("rect")
                    .attr("x", function (d) {
                        return xScale(d.x)
                    })
                    .attr('class', 'bar')
                    .attr("y", height)
                    .attr("width", function (d) {
                        return xBinwidth;
                    })
                    .attr("height", 0)
                    .on('mouseover', function(d,i) {
                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
                        div.html(' &nbsp;&nbsp;Recency Counts : ' + d.y + " &nbsp;&nbsp; <br>")
                            .style("left", (d3.mouse(this)[0]) + "px")
                            .style("top", (d3.mouse(this)[1]) + "px");
                    })
                    .on('mouseout', function(d,i) {
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    });

                tmp.transition()
                    .attr('height', function (d) {
                        return height - yScale(d.y);
                    })
                    .attr('y', function (d) {
                        return yScale(d.y);
                    })
                    .delay(function (d, i) {
                        return i * 20;
                    })
                    .duration(2000)
                    .ease('elastic');

                svg.append("text")
                    .attr("text-anchor", "middle")
                    .attr("transform", "translate(-20," + (height / 2) + ")rotate(-90)")
                    .text("Total Counts");

                svg.append("text")
                    .attr("class", "x label")
                    .attr("text-anchor", "middle")
                    .attr("x", width / 2)
                    .attr("y", height + margin.bottom-5)
                    .text("Frequency");

                d3.selectAll("#binwidthf").on("change", update);

                function update() {
                    svg.selectAll("rect").remove();
                    bin = parseInt(d3.select("#binwidthf").node().value);

                    xScale.domain([0, d3.max(map)]);

                    var histogram = d3.layout.histogram()
                        .bins(d3.range(xScale.domain()[0], xScale.domain()[1]+bin,bin))
                    (map);
                    xBinwidth = width / histogram.length - 5;

                    yScale.domain([0, d3.max(histogram.map(function (i) {
                        return i.length;
                    }))]);

                    var bin_var;

                    if(bin==1) bin_var=5;
                    if(bin==2) bin_var=4;
                    if(bin==3) bin_var=3;
                    if(bin==4) bin_var=2;
                    if(bin==5) bin_var=1;

                    var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom")
                        .ticks(bin_var*2);

                    svg.selectAll(".bar").data(histogram)
                        .enter().append("rect")
                        .attr("class", "bar");

                    var tmp = svg.selectAll(".bar").data(histogram)
                        .attr("height", 0)
                        .attr("width", function (d) {
                            return xBinwidth;
                        })
                        .attr("x", function (d) {
                            return xScale(d.x)
                        })
                        .attr("y", height);

                    tmp.transition()
                        .attr('height', function (d) {
                            return height - yScale(d.y);
                        })
                        .attr('y', function (d) {
                            return yScale(d.y);
                        })
                        .delay(function (d, i) {
                            return i * 20;
                        })
                        .duration(2000)
                        .ease('elastic');

                    d3.select(".y1.axis").call(yAxis);
                    d3.select(".x1.axis").call(xAxis);
                }
            };

            scope.$watch('data', function (data) {
                if(data!=undefined)
                    scope.render(data, scope.id);
            }, true);
        }
    }
}]);

app.directive('histogram', ['$filter', function ($filter) {
    return {
        restrict: 'EA',
        scope: {
            data: '=',
            bin: '=',
            id: '@',
            width:'@',
            height:'@'
        },
        link: function (scope, element, attrs) {
            var margin = {top: 20, right: 20, bottom: 50, left: 50},
                width = attrs.width - margin.left - margin.right,
                height = attrs.height - margin.top - margin.bottom;

            var div = d3.select(element[0]).append("div")
                .attr("class", "tooltip")
                .style("opacity", 0)
                .style('margin','10px');

            var svg = d3.select(element[0])
                .append("svg")
                .attr("id", "chart-" + attrs.id)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            scope.render = function (data, id) {

                var bin = parseInt(d3.select("#binwidth").node().value);
                var map = data.map(function (i) {
                    return parseInt(i.recency);
                });

                var xScale = d3.scale.linear()
                    .domain([0, d3.max(map)+5])
                    .range([0, width]);

                var histogram = d3.layout.histogram()
                    .bins(d3.range(xScale.domain()[0], xScale.domain()[1]+bin,bin))
                (map);


                var yScale = d3.scale.linear()
                    .domain([0, d3.max(histogram.map(function (i) {
                        return i.length;
                    }))])
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(20);

                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .innerTickSize(-width)
                    .outerTickSize(0)
                    .ticks(10);

                svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(0,0)")
                    .call(yAxis);

                var xBinwidth = width / histogram.length -1;

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0,"+height+")")
                    .call(xAxis);

                var tmp = svg.selectAll(".bar")
                    .data(histogram)
                    .enter()
                    .append("rect")
                    .attr("x", function (d) {
                        return xScale(d.x)
                    })
                    .attr('class', 'bar')
                    .attr("y", height)
                    .attr("width", function (d) {
                        return xBinwidth;
                    })
                    .attr("height", 0)
                    .on('mouseover', function(d,i) {
                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
                        div.html(' &nbsp;&nbsp;Recency Counts : ' + d.y + " &nbsp;&nbsp; <br>")
                            .style("left", (d3.mouse(this)[0]) + "px")
                            .style("top", (d3.mouse(this)[1]) + "px");
                    })
                    .on('mouseout', function(d,i) {
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    });

                tmp.transition()
                    .attr('height', function (d) {
                        return height - yScale(d.y);
                    })
                    .attr('y', function (d) {
                        return yScale(d.y);
                    })
                    .delay(function (d, i) {
                        return i * 20;
                    })
                    .duration(2000)
                    .ease('elastic');

                svg.append("text")
                    .attr("text-anchor", "middle")
                    .attr("transform", "translate(-20," + (height / 2) + ")rotate(-90)")
                    .text("Total Counts");

                svg.append("text")
                    .attr("class", "x label")
                    .attr("text-anchor", "middle")
                    .attr("x", width / 2)
                    .attr("y", height + margin.bottom-5)
                    .text("Recency");

                d3.selectAll("#binwidth").on("change", update);

                function update() {

                    svg.selectAll("rect").remove();
                    bin = parseInt(d3.select("#binwidth").node().value);

                    xScale.domain([0, d3.max(map)+2]);

                    var histogram = d3.layout.histogram()
                        .bins(d3.range(xScale.domain()[0], xScale.domain()[1]+bin,bin))
                    (map);

                    xBinwidth = width / histogram.length;
                    yScale.domain([0, d3.max(histogram.map(function (i) {
                        return i.length;
                    }))]);

                    var bin_var;

                    if(bin==25) bin_var=4;
                    if(bin==20) bin_var=5;
                    if(bin==15) bin_var=7;
                    if(bin==10) bin_var=10;
                    if(bin==5) bin_var=20;

                    var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom")
                        .ticks(bin_var);


                    svg.selectAll(".bar").data(histogram)
                        .enter().append("rect")
                        .attr("class", "bar");

                    var tmp = svg.selectAll(".bar").data(histogram)
                        .attr("height", 0)
                        .attr("width", function (d) {
                            return xBinwidth-2;
                        })
                        .attr("x", function (d) {
                            return xScale(d.x)
                        })
                        .attr("y", height);

                    tmp.transition()
                        .attr('height', function (d) {
                            return height - yScale(d.y);
                        })
                        .attr('y', function (d) {
                            return yScale(d.y);
                        })
                        .delay(function (d, i) {
                            return i * 20;
                        })
                        .duration(2000)
                        .ease('elastic');

                    d3.select(".y.axis").call(yAxis);
                    d3.select(".x.axis").call(xAxis);
                }
            };

            scope.$watch('data', function (data) {
                if(data!=undefined)
                    scope.render(data, scope.id);
            }, true);
        }
    }
}]);

app.directive('sample', [function () {
    return {
        restrict: 'EA',
        scope: {
            id: '@'
        },
        link: function (scope, element, attrs) {
            var data = ['0', '25', '50', '75', '>100'];
            var width = 35;
            var height = 60;
            var padding = 6;
            var yScale = d3.scale.linear()
                .domain([0, 100])
                .range([height - padding, padding])

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(4);

            var svg = d3.select(element[0])
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            svg.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .style('font-size','7')
                .text(function (d) {
                    return d;
                });

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + (padding * 8) + ",1)")
                .call(yAxis);
        }
    }
}]);