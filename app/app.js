'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.all_cards',
    'myApp.new_card',
    'myApp.delete_card',
    'ui.bootstrap'
])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/all_cards', {
                templateUrl: 'all_cards/all_cards.html',
                controller: 'View1Ctrl',
                controllerAs: 'vm'
            })
            .when('/new_card', {
                templateUrl: 'new_card/new_card.html',
                controller: 'View2Ctrl',
                controllerAs: 'vm'
            })
            .when('/delete_card', {
                templateUrl: 'delete_card/delete_card.html',
                controller: 'deleteCtrl',
                controllerAs: 'vm'
            });


        $routeProvider.otherwise({redirectTo: '/all_cards'});

    }])

    .constant('config', {
        "URL": "http://estagio.zagu.com.br/",
        // Chave secreta para a API
        "SECRET_KEY": "df46fd8a503e18125b8d997dacedf4dc"
    });
