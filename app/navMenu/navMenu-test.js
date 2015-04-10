describe('frsApp.navMenu', function() {
  beforeEach(function() {
    module('frsApp');
    module('frsApp.navMenu');
  });
  
  describe('navMenuController', function() {
    var navMenuController, $scope, Auth;
    beforeEach(function() {

      inject(function(_$controller_, _Auth_) {
        $scope = {};
        Auth = _Auth_;
        spyOn(Auth, "$unauth");
        navMenuController = _$controller_('navMenuController', {
            $scope: $scope,
            Auth : Auth
        });
      });
    });

    it('should define logout method', function() {
      $scope.logout();
      expect(Auth.$unauth).toHaveBeenCalled();
    });
  });
});