var controllerInit = function(loggedIn) {
    //MockFirebase.override();

    if (loggedIn) {
        beforeEach(function() {
            module(function($provide) {
                $provide.value('user', {
                    uid: 'test123'
                });
                if (typeof Auth != "undefined")
                    spyOn(Auth, "$getAuth").and.returnValue({
                        uid: "test123"
                    })
            });
            inject(function(_Auth_) {
                Auth = _Auth_;
                spyOn(Auth, "$getAuth").and.returnValue({
                    uid: "test123"
                });
            });

        })
    }
}
