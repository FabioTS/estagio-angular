'use strict';

angular.module('myApp.payments', ['ngRoute'])

    .controller('paymentsCtrl', ["$http", "config", "$scope", function ($http, config, $scope) {
        var vm = this;

        vm.getPayments = function () {
            $http({
                method: "GET",
                url: config.URL + "cards/",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + config.SECRET_KEY
                },
                
            }).then(function (response) {
                vm.data = response.data;

                
            }, function (response) {
                vm.data = response.data || 'Request failed';

            });
        }
    }]);
