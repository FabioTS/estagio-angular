'use strict';

angular.module('myApp.all_cards', ['ngRoute'])



    .controller('View1Ctrl', ["$http", "config", function ($http, config) {
        var vm = this;

        vm.sendGet = function () {
            $http({
                url: config.URL + "cards",
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + config.SECRET_KEY
                },
            }).then(function (response) {
                vm.data = response.data;
                vm.dataView = JSON.stringify(vm.data, null, "\t");
            }, function (response) {
                vm.data = response.data || 'Request failed';

            });
        }

    }]);
