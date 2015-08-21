/**
 * Created by mattcho on 8/21/15.
 */
angular.module('flightsTracker', []);
angular.module('flightsTracker').controller('flightsCtrl', function($scope){
    $scope.data = {
        flights: [
            {flightNum: 'AA100', datetime: new Date().toString()},
            {flightNum: 'AA200', datetime: new Date().toString()}
        ]
    }
})
