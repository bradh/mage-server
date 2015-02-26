angular
  .module('mage')
  .directive('userNewsItem', userNewsItem);

function userNewsItem() {
  var directive = {
    restrict: "A",
    templateUrl:  "js/app/partials/user-news-item.html",
    scope: {
      user: '=userNewsItem',
      followUserId: '=userNewsItemFollow'
    },
    controller: UserNewsItemController,
    bindToController: true
  }

  return directive;
}

UserNewsItemController.$inject = ['$scope', 'LocalStorageService'];

function UserNewsItemController($scope, LocalStorageService) {
  $scope.followingUserId = null;

  if ($scope.user.avatarUrl) {
    $scope.avatarUrl = $scope.user.avatarUrl + "?access_token=" + LocalStorageService.getToken();
  } else {
    $scope.avatarUrl = "img/missing_photo.png";
  }

  $scope.followUser = function(e, user) {
    e.stopPropagation();
    $scope.$emit('user:follow', user);
  }

  $scope.onUserClick = function (user) {
    $scope.$emit('user:selected', user, {panToLocation: true});
  }
}
