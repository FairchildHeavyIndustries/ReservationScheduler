module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/mockfirebase/browser/mockfirebase.js',
      'app/bower_components/angularfire/dist/angularfire.js',
      'app/bower_components/moment/moment.js',  
      'app/bower_components/angular-moment/angular-moment.js',
      'app/bower_components/angular-ui-calendar/src/calendar.js',
      'test/lib/**/*.js',
      'app/app.js',
      'app/config.js',
      'app/components/**/*.js',
      'app/account/**/*.js',
      'app/home/**/*.js',
      'app/login/**/*.js',
      'app/config_test.js',
      'app/navMenu/**/*.js',
      'app/provider/**/*.js',
      'app/schedule/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-firefox-launcher'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
