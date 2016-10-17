(function(){
  angular.module('turnupApp')
    .directive('projectListing', projectListingView);

  function projectListingView(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: "_projectListingView.html",
    }
  }


})()
