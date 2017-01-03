(function () {
'use strict';

angular.module('Data')
.service('MenuService', MenuService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

//Service to go out to a web service and retrieve a list
MenuService.$inject = ['$http', 'ApiBasePath'];
function MenuService($http, ApiBasePath) {
  var service = this;

  //Returning the result of an http GET
  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then( function (result) {
      return result.data;
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: categoryShortName
      }
    }).then( function (result) {
      return result.data;
    });
  };
}
})();
