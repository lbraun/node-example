var app = angular.module("app", []);

var API_URL = "http://localhost:3000" + '/api/catalog/'

app.controller("IndexController", ["$scope", "$http", function($scope, $http) {
  $http({
    method: 'GET',
    url: API_URL
  }).then(function successCallback(response) {
    $scope.catalog = Object.values(response.data);
    console.log($scope.catalog);
  }, function errorCallback(response) {
    // TODO: figure out how to raise a 404 in this case
  });

  $scope.new_product = function (product_index) {
    $scope.current_product = {new: true};
  };

  $scope.update_or_create_product = function () {
    if ($scope.current_product.new) {
      $scope.create_product();
    } else {
      $scope.update_product();
    }
  }

  $scope.create_product = function () {
    delete $scope.current_product.new
    var data = $scope.current_product

    $http({
      method: 'POST',
      url: API_URL,
      data: data
    }).then(function successCallback(response) {
      // Handle success
      $scope.catalog.push(data);
    }, function errorCallback(response) {
      // Handle error
    });
  };

  $scope.edit_product = function (product_index) {
    $scope.current_product = $scope.catalog[product_index];
  };

  $scope.update_product = function () {
    delete $scope.current_product.new
    var data = $scope.current_product

    $http({
      method: 'PUT',
      url: API_URL + $scope.current_product.id,
      data: data
    }).then(function successCallback(response) {
      // Handle success
    }, function errorCallback(response) {
      // Handle error
    });
  };

  $scope.delete_product = function (product_id, product_index) {
    $http({
      method: 'DELETE',
      url: API_URL + product_id
    }).then(function successCallback(response) {
      // Handle success
      $scope.catalog.splice(product_index, 1);
    }, function errorCallback(response) {
      // Handle error
    });
  };
}]);
