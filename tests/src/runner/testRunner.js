var Runner = require('../../../runner/run.js');

module.exports = {
  testRunEmptyFolder : function(test) {
    Runner.run([process.cwd() + '/sampletests/empty'], {
    }, {
      output_folder : false
    }, function(err) {
      test.ok(err.message.indexOf('No tests defined!') == 0);
      test.done();
    });
  },

  testRunSimple : function(test) {
    Runner.run([process.cwd() + '/sampletests/simple'], {
      seleniumPort : 10195,
      silent : true,
      output : false,
      globals : {
        test : test
      }
    }, {
      output_folder : false
    }, function(err, results) {
      test.equals(err, null);
      test.ok('sample' in results.modules);
      test.ok('demoTest' in results.modules.sample);
      test.done();
    });
  },

  testRunWithExcludeFolder : function(test) {
    Runner.run([process.cwd() + '/sampletests/withexclude'], {
      seleniumPort : 10195,
      silent : true,
      output : false,
      globals : {
        test : test
      },
      exclude : ['excluded']
    }, {
      output_folder : false
    }, function(err, results) {
      test.ok(!('excluded-module' in results.modules));
      test.done();
    });
  },

  testRunWithExcludePattern : function(test) {
    Runner.run([process.cwd() + '/sampletests/withexclude'], {
      seleniumPort : 10195,
      silent : true,
      output : false,
      globals : {
        test : test
      },
      exclude : ['excluded/excluded-*']
    }, {
      output_folder : false
    }, function(err, results) {
      test.ok(!('excluded-module' in results.modules));
      test.done();
    });
  },

  testRunAsync : function(test) {
    test.expect(5);

    Runner.run([process.cwd() + '/sampletests/async'], {
      seleniumPort : 10195,
      silent : true,
      output : false,
      globals : {
        test : test
      }
    }, {
      output_folder : false
    }, function(err, results) {
      test.equals(err, null);
      test.ok('sample' in results.modules);
      test.ok('demoTestAsync' in results.modules.sample);
      test.done();
    });
  },

  testRunMixed : function(test) {
    test.expect(4);

    Runner.run([process.cwd() + '/sampletests/mixed'], {
      seleniumPort : 10195,
      silent : true,
      output : false,
      globals : {
        test : test
      }
    }, {
      output_folder : false
    }, function(err, results) {
      test.equals(err, null);
      test.ok('sample' in results.modules);
      test.ok('demoTestMixed' in results.modules.sample);
      test.done();
    });
  }
};
