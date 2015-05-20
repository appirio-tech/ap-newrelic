(function () {
  "use strict";

  appRun.$inject = ["$rootScope", "NewRelicService"];

  /* @ngInject */
  function appRun($rootScope, NewRelicService) {
    $rootScope.$on("$stateChangeStart", NewRelicService.reportCurrentRoute);
  }

  angular
    .module("newrelic")
    .run(appRun);
})();
