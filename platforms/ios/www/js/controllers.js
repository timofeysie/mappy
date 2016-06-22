angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading) {

  // Ionic deploy code
  var deploy = new Ionic.Deploy();
  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    console.log('Ionic update called');
    deploy.update().then(function(res) {
      console.log('Ionic Deploy: Update Success! ', res);
      $scope.checkingForUpdate = false;
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
      $scope.checkingForUpdate = false;
    }, function(prog) {
      console.log('Ionic Deploy: Progress... ', prog);
      $scope.checkingForUpdate = false;
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    $scope.checkingForUpdate = true;
    console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.checkingForUpdate = false;
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
      $scope.checkingForUpdate = false;
    });
  }

  // Map specific code
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});
