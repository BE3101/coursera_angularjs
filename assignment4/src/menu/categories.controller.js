(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['MenuService', 'categories'];
function CategoriesController(MenuService, categories) {
  var categoryList = this;
  categoryList.categories = categories;
};

})();
