'use strict';

angular.module('myApp.all_cards', ['ngRoute'])



.controller('cardsCtrl', ["$http", "config", "$scope", function ($http, config, $scope) {
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

vm.getPayments = function (card) {
    $http({
        method: "GET",
        url: config.URL + "cards/" + card.id + "/payments",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + config.SECRET_KEY
      },
      
  }).then(function (response) {
    vm.pay = response.data;
                // $scope.pay_msg = "Pagamentos carregados!";
                vm.payView = JSON.stringify(vm.pay, null, "\t");

            }, function (response) {
                vm.pay = response.data || 'Request failed';
                vm.payView = "FALHA";
                $scope.pay_msg = "Falha ao carregar";
            });
}

vm.getPayment = function (id) {
    $http({
        method: "GET",
        url: config.URL + "cards/" + id + "/payments",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + config.SECRET_KEY
      },
      
  }).then(function (response) {
    vm.pay = response.data;
                // $scope.pay_msg = "Pagamentos carregados!";

            }, function (response) {
                vm.pay = response.data || 'Request failed';
                $scope.pay_msg = "Falha ao carregar";
            });
}

vm.addPayment = function (id, amount) {
    $http({
        method: "POST",
        url: config.URL + "payments",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + config.SECRET_KEY
      },
      data: {
        "card_id": id,
        "amount": amount
    }
}).then(function (response) {
    vm.pay = response.data;
    vm.getPayment(id);
    $scope.pay_msg = "Pagamento adicionado!";
}, function (response) {
    vm.pay = response.data || 'Request failed';

    $scope.pay_msg = "Falha ao adicionar pagamento";
});
}

vm.deletePayment = function (pay) {
    $http({
        method: "DELETE",
        url: config.URL + "payments/" + pay.id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + config.SECRET_KEY
      },
  }).then(function (response) {
    vm.pay = response.data;
    vm.getPayment(pay.card_id);
    $scope.pay_msg = "Pagamento excluido!";
}, function (response) {
    vm.pay = response.data || 'Request failed';

    $scope.pay_msg = "Falha ao excluir";
});
}

vm.editPayment = function (card, id, amount, status) {
    $http({
        method: "PATCH",
        url: config.URL + "payments/" + id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + config.SECRET_KEY
      },
      data: {
        "amount": amount,
        "status": status
    }
}).then(function (response) {
    vm.pay = response.data;
    vm.getPayment(card);
    $scope.pay_msg = "Pagamento editado!";
}, function (response) {
    vm.pay = response.data || 'Request failed';

    $scope.pay_msg = "Falha ao editar";
});
}



}]);
