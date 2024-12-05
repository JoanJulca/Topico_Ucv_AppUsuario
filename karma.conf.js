module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        timeoutInterval: 10000,
        random: false, // Mantiene el orden de las pruebas consistente
        failFast: false, // Ejecuta todas las pruebas incluso si alguna falla
      },
      clearContext: false
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcov' }  // Agrega formato lcov para mejor integración con herramientas de análisis
      ],
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      }
    },
    reporters: ['progress', 'kjhtml', 'coverage'], // Agrega reporter de coverage
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: false,
    restartOnFileChange: true,
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless']
      }
    },
    browserNoActivityTimeout: 60000, // Aumenta el timeout para evitar problemas en máquinas más lentas
    failOnEmptyTestSuite: false, // No falla si no encuentra pruebas en algún archivo
    processKillTimeout: 10000 // Tiempo de espera para matar procesos
  });
};