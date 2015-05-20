(function () {
  "use strict";

  angular
    .module("newrelic", []);
})();

(function () {
  "use strict";
  
  angular
    .module("newrelic")
    .factory("NewRelicService", NewRelicService);

  NewRelicService.$inject = ["$location"];

  /* @ngInject */
  function NewRelicService($location) {

    var noop = function () {};
    var actionName = "routeChange";
    var service = {
      reportCurrentRoute: noop
    };

    if (window.newrelic) {

      service.reportCurrentRoute = function () {
        console.log($location.url())
        newrelic.addPageAction(actionName, {
          url: $location.url()
        });
      }

    }

    return service;
  }
})();

(function () {
  "use strict";

  appRun.$inject = ["$rootScope", "NewRelicService"];

  /* @ngInject */
  function appRun($rootScope, NewRelicService) {
    $rootScope.$on("$stateChangeSuccess", NewRelicService.reportCurrentRoute);
  }

  angular
    .module("newrelic")
    .run(appRun);
})();
