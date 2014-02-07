angular.module('wizardDemo', ['wizard'])
  .controller('DemoController', function($scope){
    
    $scope.data = {
      firstName: null,
      lastName: null,
      email: null
    };
    
    var submitData = function(){
      alert('Well done!');
    };
    
    $scope.wizardConfig = {
      steps: [
        {
          title: 'Step #1',
          titleNext: 'Next: Step #2',
          templateUrl: 'partials/wizard_step1.html',
          callback: function(){ return true; }
        },
        {
          title: 'Step #2',
          titlePrev: 'Back: Step #1',
          titleNext: 'Next: Step #3',
          templateUrl: 'partials/wizard_step2.html'
          // no callback
        },
        {
          title: 'Step #3',
          titlePrev: 'Back: Step #2',
          titleNext: 'Finish',
          templateUrl: 'partials/wizard_step3.html',
          callback: submitData
        }
      ]
    };
  });