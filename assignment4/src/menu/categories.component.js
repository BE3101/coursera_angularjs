(function () {
'use strict';

angular.module('MenuApp')
.component('categoryList', {
  templateUrl: 'src/menu/templates/categories.template.html',
  bindings: {
    categories: '<'
  }
});

})();
