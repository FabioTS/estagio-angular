'use strict';

angular.module('myApp.all_cards', ['ngRoute'])



    .controller('View1Ctrl', ["$http", "config", "$scope", function ($http, config, $scope) {
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

                // $scope.user_msg = "Carregado!";
                
            }, function (response) {
                vm.data = response.data || 'Request failed';
                $scope.user_msg = "Falha ao carregar";
            });
        }

        vm.deleteCard = function (id){
            $http({
                url: config.URL + "cards/" + id,
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + config.SECRET_KEY
                }
            }).then(function (response) {
                vm.data = response.data;

                vm.sendGet();
                $scope.user_msg = "Excluido!";
                
            }, function (response) {
                vm.data = response.data || 'Request failed';
                $scope.user_msg = "Falha ao excluir";
            });
        }

         vm.editCard = function (id, number, brand, exp_month, exp_year, name, limit) {
            $http({
                method: "PATCH",
                url: config.URL + "cards/" + id,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + config.SECRET_KEY
                },
                data: {
                        // "number": card.number,
                        // "brand": card.brand,
                        // "exp_month":card.exp_month,
                        // "exp_year": card.exp_year,
                        // "name": "editaaado",
                        // "limit": card.limit
                        "number": number,
                        "brand": brand,
                        "exp_month":exp_month,
                        "exp_year": exp_year,
                        "name": name,
                        "limit": limit
                }
            }).then(function (response) {
                vm.data = response.data;


                vm.sendGet();
                $scope.user_msg = "Cartão editado!";
                
            }, function (response) {
                vm.data = response.data || 'Request failed';

                $scope.user_msg = "Falha ao editar cartão";
            });
        }

    }]);
