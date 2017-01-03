(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/templates/home.template.html'
  })

  // Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menu/templates/all-categories.template.html',
    controller: 'CategoriesController as categoryList',
    resolve: {
      categories: ['MenuService', function (MenuService) {
        return MenuService.getAllCategories();
      }]
    }
  })

  // Item detail
  .state('categories.items', {
    url: '/items/{itemId}',
    templateUrl: 'src/menu/templates/items.template.html',
    controller: 'ItemController as itemInfo',
    resolve: {
       itemDetail: ['MenuService', '$stateParams', function (MenuService, $stateParams) {
         return MenuService.getItemsForCategory($stateParams.itemId);
      }]
    }
  });
}

})();
