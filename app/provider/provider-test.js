describe('frsApp.provider', function() {
    beforeEach(function() {
        module('frsApp');
        module('frsApp.provider');
    });

    describe('ProviderController ', function() {
        var providerController, $scope, user, fbutil;
        controllerInit();


        describe('Modify Provider', function() {
            beforeEach(inject(function(_$controller_) {
                $scope = {};
                providerController = _$controller_('ProviderController', {
                    $scope: $scope,
                    $routeParams: {
                        providerId: "1234"
                    }
                });
            }))
            it('should have modify mode when id passed', function() {
                expect($scope.modifyMode).toBe(true);
            });
        })

        describe('Create Provider', function() {
            var mockUserRef, mockProvidersRef, mockNewProviderRef;
            beforeEach(inject(function(_$controller_, _fbutil_) {
                $scope = {};
                fbutil = _fbutil_;
                mockUserRef = new Firebase();
                mockProvidersRef = new Firebase();
                mockNewProviderRef = new Firebase();
                fbutil.ref = function(name) {
                    if (name == "users") {
                        return mockUserRef;
                    }
                    if (name == "providers")
                        return mockProvidersRef;
                };

                spyOn(mockUserRef, "child").and.callThrough();
                spyOn(mockNewProviderRef, "child").and.callThrough();
                spyOn(mockProvidersRef, "push").and.returnValue(mockNewProviderRef);

                providerController = _$controller_('ProviderController', {
                    $scope: $scope,
                    fbutil: fbutil
                });

                $scope.createProvider();
                mockNewProviderRef.flush();
            }))
            it('should add a key to user', function() {

                expect(mockUserRef.child).toHaveBeenCalled();
            });
            it('should add the user key to provider', function() {
                expect(mockNewProviderRef.child).toHaveBeenCalledWith('users/test123')
            })
        })
    });
});