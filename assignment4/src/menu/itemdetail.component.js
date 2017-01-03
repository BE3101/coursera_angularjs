(function () {
'use strict';

angular.module('MenuApp')
.component('itemDetail', {
  templateUrl: 'src/menu/templates/item-detail.template.html',
  bindings: {
    category: '<',
    items: '<'
  }
});

})();
