describe('frsApp.countries', function() {
    beforeEach(module('frsApp.countries'));
    describe('CountryService', function() {
        beforeEach(inject(function($injector) {
            CountryService = $injector.get('CountryService');
        }))


        it('can get all countries ref', function() {
            var ref = CountryService.ref();
            expect(ref.key()).toBe('countries');
        });
        it('can get country details by code', function() {
            var specificRef = CountryService.byCode('DOM');
            specificRef.once('child_added', function(snap){
                console.log('in here');
                expect(snap.child('name').val()).toBe("Republica Dominicana")
            });
            specificRef.flush();
            

        });

    });
});