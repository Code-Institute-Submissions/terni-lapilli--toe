module.exports = function (wallaby) {
  return {
    //http://http://localhost:51245/ || http://wallabyjs.com/app
    name: 'TicTacToe',
    localProjectDir: "D:/Code/Code Institute/terni-lapilli--toe",
    files: [
      'lib/*.js'
    ],
    // filesWithNoCoverageCalculated: ['src/**/*-helper.js'],

    tests: [
      'test/**/*Spec.js'
    ],
    trace: true,
    preserveComments: true,
    reportConsoleErrorAsError: true,
    maxConsoleMessagesPerTest: 50,
    slowTestThreshold: 75,
    runMode: 'onsave',
    lowCoverageThreshold: 70,
    reportUnhandledPromises: false,
    runAllTestsInAffectedTestFile: true,
    runAllTestsWhenNoAffectedTests: false,
    ignoreFileLoadingDependencyTracking: false,
    maxLogEntrySize: 32768,
    maxTraceSteps: 2000000,
    screenshot: true,
    mapConsoleMessagesStackTrace: true,
    resolveGetters: true
    // for node.js tests you need to set env property as well
    // https://wallabyjs.com/docs/integration/node.html
  };
};
