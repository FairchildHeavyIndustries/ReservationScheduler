describe("frsApp.schedule", function() {
    beforeEach(function() {
        module('frsApp');
        module('frsApp.schedule');
        module('mock.fbutil');
    });
    describe("ScheduleController", function() {
        var $scope, $controller, fbutil, uiCalendarConfig, $compile;
        controllerInit();
        beforeEach(inject(function(_$controller_, _fbutil_, _uiCalendarConfig_, _$rootScope_, _$compile_) {
            $controller = _$controller_;
            fbutil = _fbutil_;
            $compile = _$compile_
            uiCalendarConfig = _uiCalendarConfig_;
            spyOn(fbutil.$$ref, 'limitToFirst').and.callThrough();
            $scope = _$rootScope_.$new();

            var controller = $controller('ScheduleController', {
                $scope: $scope
            });
        }))

        it("reads from events", function() {
            expect(fbutil.$$ref.limitToFirst).toHaveBeenCalled();
        })
        
    })


})