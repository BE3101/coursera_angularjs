(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

//ToBuy controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getBuyItems();

  buyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };

  buyList.isComplete = function () {
    return ShoppingListCheckOffService.complete();
  }
}

//AlreadyBought controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();

  boughtList.isComplete = function () {
    return ShoppingListCheckOffService.notComplete();
  }
}

function ShoppingListCheckOffService() {
  var service = this;

  //Hard coded initial items
  var buyItems = [
    { name: "Bags of Cookies",
      quantity: 10
    },
    { name: "Bags of Candy",
      quantity: 5
    },
    { name: "Bags of Chips",
      quantity: 15
    },
    { name: "Cans of Coke",
      quantity: 24
    },
    { name: "Tube of Toothpaste",
      quantity: 1
    }
  ];

  //Empty array for bought items
  var boughtItems = [];

  //Add the item at some index to the bought items and remove it from the
  // items to buy
  service.removeItem = function (itemIndex) {
    boughtItems.push(buyItems[itemIndex]);
    buyItems.splice(itemIndex,1);
  };

  //Complete if all the buy items have been bought
  service.complete = function () {
    return buyItems.length == 0;
  }

  //Not started if the bought items is still 0
  service.notComplete = function () {
    return boughtItems.length == 0;
  }

  //All of the items to buy
  service.getBuyItems = function () {
    return buyItems;
  };

  //All of the items bought
  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
