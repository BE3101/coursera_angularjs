(function () {
'use strict';

angular.module('LunchApp', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];
function LunchController( $scope ) {
  $scope.verdict = "";

  $scope.checkLunch = function() {
    var retString = "We seem to have a problem"
    if( $scope.dishes) {
      var tempArray = $scope.dishes.split(",");
      //Remove any empty items from the list
      for(var i=tempArray.length-1; i>=0; i-- ) {
        if( tempArray[i].trim() === "" ) {
          tempArray.splice(i, 1);
        }
      }
      //Calculate the number of things left
      var wc = tempArray.length;
      //Set a message based on home many things were in the array
      //Note you should never have a negative number of items
      if( wc == 0 ) {
        retString = "Please enter data first"
      } else if( wc <= 3 ) {
        retString = "Enjoy!"
      } else if( wc > 3 ) {
        retString = "Too much!"
      } else {
        retString = "We seem to have a problem"
      }
    } else {
      retString = "Please enter data first"
    }
    $scope.verdict = retString;
  };
}

})();
