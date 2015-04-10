
describe('frsApp.translate', function() {
  beforeEach(function () {
        module('frsApp');
    });


  it('translates a key to a string', inject(function($filter) {
    var trFilter = $filter('translate');
    expect(trFilter("Log_In")).toEqual("Log In");
  }));
});