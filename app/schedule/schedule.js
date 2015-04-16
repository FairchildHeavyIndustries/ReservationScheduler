(function(angular) {
  "use strict";

  var scheduleModule = angular.module('frsApp.schedule', ['firebase', 'firebase.utils', 'firebase.auth', 'ngRoute', 'angularMoment', 'ui.calendar']);

  scheduleModule.controller('ScheduleController', ['$scope', 'fbutil', 'user', '$routeParams', '$firebaseArray', '$location', 'uiCalendarConfig', '$timeout',
    function ScheduleController($scope, fbutil, user, $routeParams, $firebaseArray, $location, uiCalendarConfig, $timeout) {
      var eventsRef = fbutil.ref('events').orderByChild('start').limitToFirst(100);
      var eventsObj = $firebaseArray(eventsRef);
      $scope.events = eventsObj;
      $scope.eventSources = [];
      $scope.eventSources.push(eventsObj);
      
      $scope.uiConfig = {
        calendar: {
          // defaultView: 'agendaWeek',
          height: 500,
          editable: true,
          lang: 'es',
          header: {
            left: 'month,agendaWeek,agendaDay',
            center: 'title',
            right: 'today prev,next'
          },
          eventDrop: function(event) {
            var fbEvent = $scope.events.$getRecord(event.$id);
            fbEvent.start = event.start.format();
            
            $scope.events.$save(fbEvent);
          },
          eventAfterAllRender: function(view){
            var calEvents = uiCalendarConfig.calendars.frsCalendar.fullCalendar( 'clientEvents' );
            if (calEvents.length)
            console.log(calEvents[0].start.format());
          }
        }
      };
      $timeout(function() { //defaultView broken in fullCalendar
        uiCalendarConfig.calendars.frsCalendar.fullCalendar('changeView', 'agendaWeek');
      })
    }
  ]);

  scheduleModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.whenAuthenticated('/schedule/:providerId', {
      templateUrl: 'schedule/schedule.html',
      controller: 'ScheduleController'
    });
  }]);

})(angular);