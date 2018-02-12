var app = angular.module("app", []);

var API_URL = "http://localhost:3000"

app.controller("IndexController", ["$scope", "$http", function($scope, $http) {
  $http({
    method: 'GET',
    url: API_URL + '/api/catalog/'
  }).then(function successCallback(response) {
    $scope.catalog = Object.values(response.data);
    console.log($scope.catalog);
  }, function errorCallback(response) {
    // TODO: figure out how to raise a 404 in this case
  });

  $scope.edit_product = function (product_id) {
    // body...
  };

  $scope.delete_product = function (product_id, product_index) {
    $http({
      method: 'DELETE',
      url: API_URL + '/api/catalog/' + product_id
    }).then(function successCallback(response) {
      // Handle success
      $scope.catalog.splice(product_index, 1);
    }, function errorCallback(response) {
      // Handle error
    });
  };
}]);
