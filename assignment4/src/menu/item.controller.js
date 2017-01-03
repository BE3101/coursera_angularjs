(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemController', ItemController);

ItemController.$inject = ['MenuService', 'itemDetail'];
function ItemController(MenuService, itemDetail) {
  var itemInfo = this;
  itemInfo.category = itemDetail.category;
  itemInfo.items = itemDetail.menu_items;
};

})();
