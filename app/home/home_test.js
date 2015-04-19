
describe('frsApp.home', function() {
  beforeEach(function(){
    module('frsApp.home');
    module('mock.fbutil');
  });

  describe('HomeCtrl', function() {
    var homeCtrl, $scope, fbutil, $timeout, ProviderService, providerRef;
    beforeEach(function() {
      module(function($provide) {
        // comes from routes.js in the resolve: {} attribute
        $provide.value('user', {uid: 'test123'});
        
      });
        
      inject(function($controller, _fbutil_, _$timeout_, _ProviderService_, _$rootScope_) {
        $scope = _$rootScope_.$new();
        fbutil = _fbutil_;
        $timeout = _$timeout_;
        ProviderService = _ProviderService_;
        providerRef = new Firebase("providers");
        providerRef.set({salon123: {name:"salon name"}});
        spyOn(ProviderService, "get").and.returnValue(providerRef)
        fbutil.ref().set({name:"tester", providers:{salon123:true}})
        homeCtrl = $controller('HomeCtrl', {$scope: $scope});
      });
    });

    it('assigns user in scope', function() {
            expect(typeof $scope.profile).toBe('object');
      });
    it("lists providers per user", function(){//$scope.profile.$ref().flush();
      $scope.profile.$ref().flush();
      $timeout.flush();
      providerRef.flush();
      expect($scope.providers[0].name).toBe("salon name");
      
    });
  });
});