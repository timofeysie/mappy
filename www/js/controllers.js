angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $ionicAnalytics) {

  // Ionic deploy code
  var deploy = new Ionic.Deploy();
  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    console.log('Ionic update called');
    deploy.update().then(function(res) {
      $scope.checkingForUpdate = false;
      // debug
      console.log('Ionic Deploy: Update Success! ', res);
      $ionicAnalytics.track('Event', {
        msg: 'Ionic Deploy: Update Success! ', 
        'res': res,
        checkingForUpdate: $scope.checkingForUpdate
      });
    }, function(err) {
      $scope.checkingForUpdate = false;
      // debug
      console.log('Ionic Deploy: Update error! ', err);
      $ionicAnalytics.track('Event', {
        msg: 'Ionic Deploy: Update error! ', 
        err: err,
        checkingForUpdate: $scope.checkingForUpdate
      });

    }, function(prog) {
      $scope.checkingForUpdate = false;
      // debug
      console.log('Ionic Deploy: Progress... ', prog);
      $ionicAnalytics.track('Event', {
        msg: 'Ionic Deploy: Progress... ', 
        prog: prog,
        checkingForUpdate: $scope.checkingForUpdate
      });
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    $scope.checkingForUpdate = true;
    $ionicAnalytics.track('Event', {
      msg: 'Ionic update called'
    });
    console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      $scope.checkingForUpdate = false;
      $scope.hasUpdate = hasUpdate;
      // debug
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $ionicAnalytics.track('Event', {
        msg: 'Ionic Deploy: Update available: ',
        hasUpdate: hasUpdate, 
        checkingForUpdate: $scope.checkingForUpdate
      });
    }, function(err) {
      $scope.checkingForUpdate = false;
      // debug
      console.error('Ionic Deploy: Unable to check for updates', err);
      console.log('$scope.checkingForUpdate',$scope.checkingForUpdate);
      $ionicAnalytics.track('Event', {
        msg: 'Ionic Deploy: Unable to check for updates',
        err: err, 
        checkingForUpdate: $scope.checkingForUpdate
      });

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
