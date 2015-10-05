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

  NewRelicService.$inject = ["$location", "$timeout"];

  /* @ngInject */
  function NewRelicService($location, $timeout) {

    var service = {
      reportCurrentRoute: null,
    };

    var actionName = "routeChange";

    var nr = {
      reportRoute: function (route, renderTime) {}
    };

    if (window.newrelic) {

      nr.reportRoute = function (route, renderTime) {
        var details = {
          url: route
        };
        if (renderTime) details.renderTime = renderTime;

        window.newrelic.addPageAction(actionName, details);
      };

    }

    function deferReportRoute(route, startTime) {
      return function () {
        var now = new Date();
        nr.reportRoute(route, now - startTime);
      };
    }

    service.reportCurrentRoute = function () {
      var now = new Date();
      var url = $location.url();
      // Passing false as the 3rd param to $timeout keeps the deferred function from running during $apply block
      // https://docs.angularjs.org/api/ng/service/$timeout
      $timeout(deferReportRoute(url, now), 0, false);
    };

    return service;
  }
})();

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
