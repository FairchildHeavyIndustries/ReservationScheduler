var controllerInit = function() {
    MockFirebase.override();
    beforeEach(module(function($provide) {
        $provide.value('user', {
            uid: 'test123'
        });
    }));
}