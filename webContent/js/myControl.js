contact.controller('showMessage', function($scope) {
    $scope.userInput = 'Leave a message or ask questions here!'; 
    $scope.username = 'anonymous';
});

contact.directive("inputMessageDirective", function(){
    return {
        restrict: "E",
        template: "<h1> This is a test! </h1>"
    }
});