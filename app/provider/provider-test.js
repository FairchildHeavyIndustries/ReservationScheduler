describe('frsApp.provider', function() {
    beforeEach(function() {
        module('frsApp');
        module('frsApp.provider');
    });

    describe('ProviderController', function() {
        var providerController, $scope, $location, $rootScope
        beforeEach(inject(function(_$controller_, _$location_, _$rootScope_) {
            $scope = {};
            $location = _$location_;
            $rootScope = _$rootScope_;
            $location.path('/provider/update/1234');
            $rootScope.$digest();
            providerController = _$controller_('ProviderController', {
                $scope: $scope
            });
        }));

        it('should have modify mode when no id passed', function() {
            expect($scope.modifyMode).toBeTrue();
        });
    });
});