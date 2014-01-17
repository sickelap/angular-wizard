angular-wizard
==============

Native Angular.JS wizard directive

 Example usage:

 In your template add tag:
    
    <div wizard="wizardConfig"></div>

 Then in your controller create wizard configuration:

    $scope.wizardConfig = {
       steps: [
           {
               title: 'Step #1',
               titleNext: 'Next: Step #2',
               templateUrl: 'wizard_step1.html',
               callback: function(){ return true; }
           },
           {
               title: 'Step #2',
               titlePrev: 'Back: Step #1'
               titleNext: 'Next: Step #3',
               templateUrl: 'wizard_step1.html',
               callback: function(){ return true; }
           },
           {
               title: 'Step #3',
               titlePrev: 'Back: Step #2'
               titleNext: 'Finish',
               templateUrl: 'wizard_step1.html',
               callback: function(){ return true; }
           }
       ]
    }
    
