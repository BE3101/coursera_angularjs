(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'menuItems.html',
    scope: {
      //One way bind to items
      found: '<',
      //Reference bind to function
      onRemove: '&'
    },
    //Bind to Controller
    controller: NarrowItDownDirectiveController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

//We're just linking the Directive to this controller so we can see changes
// on $scope. We could link to NarrowItDownController but I suspect that might
// be poor coding practice
function NarrowItDownDirectiveController() {
  var menu = this;

  menu.itemsFound = function () {

    if( menu.found === undefined ) {
      //Fake a true if we haven't started
      return true;
    } else {
      if( menu.found.length > 0 ) {
        return true;
      }
    }
    return false;
  }
}

//Controller
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  //Get list from the MenuSearchService
  menu.narrowList = function() {
    var promise = MenuSearchService.getMatchedMenuItems( menu.searchTerm );

    promise.then(function (response) {
      menu.found = response;
    })
    .catch(function (error) {
      console.log( "Oops-This is bad." );
    });
  }

  //Remove item from list
  menu.removeItem = function (itemIndex) {
    menu.found.splice(itemIndex, 1);
  }
}

//Service to go out to a web service and retrieve a list
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    //Returning the result of an http GET
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    //Once we have the result, process it and remove Items that don't match
    }).then( function (result) {
      //Using a hash so we don't get duplicates since AngularJS doesn't like duplicates
      var foundItems = {};
      var numItems = result.data.menu_items.length;

      if( searchTerm !== undefined) {
        if( searchTerm.toLowerCase() != "" ) {
          for( var i=0; i<numItems; i++ ) {
            if(result.data.menu_items[i].name.toLowerCase().indexOf( searchTerm.toLowerCase() ) >= 0 ) {
              //If we've seen it before, add one to it's value otherwise add it to the hash
              foundItems.hasOwnProperty(result.data.menu_items[i].name) ?
                foundItems[result.data.menu_items[i].name] ++ :
                foundItems[result.data.menu_items[i].name] = 1;
            }
          }  
        }
      }

      //return the keys of the hash
      return Object.keys(foundItems);
    });
  };
};

})();
