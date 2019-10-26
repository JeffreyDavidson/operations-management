angular.module("employeesApp", [])
  .controller("employeeController", function ($scope, employeeService) {
    $scope.firedCount = employeeService.firedCount;

    var promise = employeeService.getEmployees();

    promise.then(list => {
        $scope.employees = list;
    });

    $scope.addEmployee = function () {
        var employee = {
            "name": $scope.employee.name,
            "street": $scope.employee.street,
            "city": $scope.employee.city,
            "state": $scope.employee.state,
            "zip": $scope.employee.zip
        };

        employeeService.addEmployee(employee);

        $scope.employee.name = '';
        $scope.employee.street = '';
        $scope.employee.city = '';
        $scope.employee.state = '';
        $scope.employee.zip = '';

        $scope.employees = employeeService.getEmployees();
    }

    $scope.deleteEmployee = function (employee) {
        employeeService.removeEmployee(employee);
        $scope.employees = employeeService.getEmployees();
    }
});