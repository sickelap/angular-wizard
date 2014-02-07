angular.module("wizardDemo").run(["$templateCache", function($templateCache) {

  $templateCache.put("partials/wizard_step1.html",
    "<form name=\"form\">\n" +
    "   <div>\n" +
    "       <input type=\"text\" class=\"form-control\" placeholder=\"First Name\" ng-model=\"data.firstName\" ng-required=\"true\">\n" +
    "   </div>\n" +
    "   <div>\n" +
    "       <input type=\"text\" class=\"form-control\" placeholder=\"Last Name\" ng-model=\"data.lastName\" ng-required=\"true\">\n" +
    "   </div>\n" +
    "</form>"
  );


  $templateCache.put("partials/wizard_step2.html",
    "<form name=\"form\">\n" +
    "   <div>\n" +
    "       <input type=\"email\" class=\"form-control\" placeholder=\"Email\" ng-model=\"data.email\" ng-required=\"true\">\n" +
    "   </div>\n" +
    "</form>"
  );


  $templateCache.put("partials/wizard_step3.html",
    "<div>\n" +
    "   <div>\n" +
    "       First Name: {{ data.firstName }}\n" +
    "   </div>\n" +
    "   <div>\n" +
    "       Last Name: {{ data.lastName }}\n" +
    "   </div>\n" +
    "   <div>\n" +
    "       Email: {{ data.email }}\n" +
    "   </div>\n" +
    "</div>"
  );
}]);