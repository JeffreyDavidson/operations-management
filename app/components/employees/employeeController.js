angular.module("employeesApp", [])
  .controller("employeeController", function ($scope, employeeService) {
    $scope.firedCount = employeeService.firedCount;

    var promise = employeeService.getEmployees();

    promise.then(list => {
        $scope.employees = list;
    });

    $scope.addEmployee = function () {
        var employee = {
            "name": $scope.name,
            "street": $scope.street,
            "city": $scope.city,
            "state": $scope.state,
            "zip": $scope.zip
        };

        employeeService.addEmployee(employee);

        $scope.name = '';
        $scope.street = '';
        $scope.city = '';
        $scope.state = '';
        $scope.zip = '';

        $scope.employees = employeeService.getEmployees();
    }

    $scope.deleteEmployee = function (employee) {
        employeeService.removeEmployee(employee);
        $scope.employees = employeeService.getEmployees();
    }
});