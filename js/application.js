angular.module("employeesApp",  []).controller("DBController", function ($scope, dataService) {
    $scope.employeeName;
    $scope.employeeStreet;
    $scope.employeeCity;
    $scope.employeeState;
    $scope.employeeZipCode;

    console.log(dataService)
    $scope.firedCount = dataService.firedCount;
    
    var promise = dataService.getEmployees();

    promise.then(list => {
        // console.log(list);
        $scope.employeesList = list;
    });
    
    $scope.addEmployee = function() {
        var employee = {
          "employeeName": $scope.employeeName, 
          "employeeStreet": $scope.employeeStreet, 
          "employeeCity": $scope.employeeCity, 
          "employeeState": $scope.employeeState, 
          "employeeZipCode": $scope.employeeZipCode
        };

        dataService.addEmployee(employee);
        
        $scope.employeeName = '';
        $scope.employeeStreet = '';
        $scope.employeeCity = '';
        $scope.employeeState = '';
        $scope.employeeZipCode = '';
        
        $scope.employeesList = dataService.getEmployees();
    }
    
    $scope.deleteEmployee = function(deletedEmployee) {
        dataService.removeEmployee(deletedEmployee);
        $scope.employeesList = dataService.getEmployees();
    }
});