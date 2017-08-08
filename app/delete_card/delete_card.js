'use strict';

angular.module('myApp.delete_card', ['ngRoute'])

    .controller('deleteCtrl', ["$http", "config", "$scope", function ($http, config, $scope) {
        var vm = this;

        vm.sendDelete = function () {
            $http({
                url: config.URL + "cards/" + $scope.card.id,
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + config.SECRET_KEY
                }
            }).then(function (response) {
                vm.data = response.data;
                vm.dataView = JSON.stringify(vm.data, null, "\t");
            }, function (response) {
                vm.data = response.data || 'Request failed';

            });
        }
    }]);
