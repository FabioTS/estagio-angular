'use strict';

angular.module('myApp.new_card', ['ngRoute'])

    .controller('View2Ctrl', ["$http", "config", "$scope", function ($http, config, $scope) {
        var vm = this;

        vm.sendCard = function () {
            $http({
                method: "POST",
                url: config.URL + "cards",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + config.SECRET_KEY
                },
                data: {
                        "number": $scope.card.number,
                        "brand": $scope.card.brand,
                        "exp_month":$scope.card.exp_month,
                        "exp_year": $scope.card.exp_year,
                        "name": $scope.card.name,
                        "limit": $scope.card.limit
                }
            }).then(function (response) {
                vm.data = response.data;

                $scope.new_card_sucess = "Cartão adicionado!";
                vm.dataView = JSON.stringify(vm.data, null, "\t");
            }, function (response) {
                vm.data = response.data || 'Request failed';

                $scope.new_card_fail = "Falha ao adicionar cartão";
            });
        }
    }]);
