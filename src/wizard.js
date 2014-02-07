/**
 * Angular Wizard directive
 * Copyright (c) 2014 Genadijus Paleckis (genadijus.paleckis@gmail.com)
 * License: MIT
 * GIT: https://github.com/sickelap/angular-wizard
 *
 * Example usage:
 *
 * In your template add tag:
 *   <div wizard="wizardConfig"></div>
 *
 * Then in your controller create wizard configuration:
 *
 *   $scope.wizardConfig = {
 *      steps: [
 *          {
 *              title: 'Step #1',
 *              titleNext: 'Next: Step #2',
 *              templateUrl: 'wizard_step1.html',
 *              callback: function(){ return true; }
 *          },
 *          {
 *              title: 'Step #2',
 *              titlePrev: 'Back: Step #1'
 *              titleNext: 'Next: Step #3',
 *              templateUrl: 'wizard_step1.html',
 *              callback: function(){ return true; }
 *          },
 *          {
 *              title: 'Step #3',
 *              titlePrev: 'Back: Step #2',
 *              titleNext: 'Finish',
 *              templateUrl: 'wizard_step1.html',
 *              callback: function(){ return true; }
 *          }
 *      ]
 *   }
 *
 */
angular.module('wizard', ['wizardStep'])
    .directive('wizard', function () {
        var template = '' +
            '<div class="wizard">' +
            '    <ol class="wizard-breadcrumbs">' +
            '        <li ng-repeat="s in config.steps" class="{{ s.position }}">' +
            '            <a href="#" ng-click="gotoStep($index)" ng-if="s.position===\'past\'">{{ s.title }}</a>' +
            '            <span ng-if="s.position!==\'past\'">{{ s.title }}</span>' +
            '        </li>' +
            '   </ol>' +
            '   <ul class="wizard-steps">' +
            '       <li ng-repeat="s in config.steps" ng-show="isCurrent($index)">' +
            '           <div data-wizard-step="s"></div>' +
            '       </li>' +
            '   </ul>' +
            '</div>';

        var linkFn = function (scope) {
            scope.currentStep = 0;

            /**
             * set correct position for all the steps in the wizard
             */
            angular.forEach(scope.config.steps, function (step, index) {
                step.position = (index === 0) ? 'current' : 'future';
            });

            scope.isCurrent = function (index) {
                return (scope.config.steps[index].position === 'current');
            };
            scope.gotoStep = function (transitionTo) {
                if (transitionTo > scope.currentStep) {
                    var step = scope.config.steps[scope.currentStep];
                    if (typeof step.callback === 'function') {
                        if (true !== step.callback()) {
                            return;
                        }
                    }
                }

                if (transitionTo >= scope.config.steps.length) {
                    return; // last step
                }
                if (transitionTo < 0) {
                    return; // first step
                }

                scope.currentStep = transitionTo;
                angular.forEach(scope.config.steps, function (step, index) {
                    if (index < scope.currentStep) {
                        step.position = 'past';
                    }
                    if (index === scope.currentStep) {
                        step.position = 'current';
                    }
                    if (index > scope.currentStep) {
                        step.position = 'future';
                    }
                });
            };
        };

        var controllerFn = ['$scope', function ($scope) {
            return {
                goBack: function () {
                    $scope.gotoStep($scope.currentStep - 1);
                },
                goNext: function () {
                    $scope.gotoStep($scope.currentStep + 1);
                }
            };
        }];

        return {
            replace: true,
            scope: {
                config: '=wizard'
            },
            template: template,
            link: linkFn,
            controller: controllerFn
        };
    })
;

angular.module('wizardStep', [])
    .directive('wizardStep', ['$templateCache', '$compile', function ($templateCache, $compile) {
        var template = '' +
            '<div class="wizard-step">' +
            '   <div class="wizard-step-nav">' +
            '       <a href="#" class="wizard-step-nav-prev" ng-click="goBack()" ng-if="config.titlePrev">{{ config.titlePrev }}</a>' +
            '       <a href="#" class="wizard-step-nav-next" ng-click="goNext()" ng-if="config.titleNext">{{ config.titleNext }}</a>' +
            '   </div>' +
            '</div>';

        var linkFn = function (scope, element, attr, wizard) {
            /**
             * interpolate template into the step's DOM
             */
            element.prepend($templateCache.get(scope.config.templateUrl));
            $compile(element.contents())(scope);

            /**
             * Expose step configuration items directly to the scope.
             * This way we can access step's consiguration properties directly,
             * for instance {{title}} instead of {{config.title}}.
             */
            angular.forEach(scope.config, function (value, key) {
                scope[key] = value;
            });

            scope.goBack = function () {
                wizard.goBack();
            };
            scope.goNext = function () {
                // find a form in the scope
                var formElm = element.find('form');
                var form = scope[formElm.prop('name')];

                /**
                 * By default step will be valid even if form element does not exist
                 * @type {boolean}
                 */
                var formValid = true;

                if (form) { // Do we have a form with controller?
                    form.$setDirty();
                    formValid = form.$valid;
                }

                if (formValid) {
                    wizard.goNext();
                }
            };
        };

        return {
            restrict: 'A',
            require: '^wizard',
            scope: {
                config: '=wizardStep'
            },
            template: template,
            link: linkFn
        };
    }])
;