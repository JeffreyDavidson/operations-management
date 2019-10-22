angular.module("employeesApp").service("dataService", function ($http) {
    
    var employeesList = [];
    
    this.getEmployees = function () {
        $http.get("https://randomuser.me/api/?nat=us&results=100&inc=name,location")
        .then(function(response) {
            this.employeesList = response.data.results.map(employee => ({
                employeeName: employee.name.first + ' ' + employee.name.last,
                employeeStreet: employee.location.street.number + ' ' + employee.location.street.name,
                employeeCity: employee.location.city,
                employeeState: employee.location.state,
                employeeZipCode: employee.location.postcode
            }));
        });
    };
    
    this.addEmployee = function (employee) {
        var employeesList = this.getEmployees();
        employeesList.push(employee);
        var str = JSON.stringify(employeesList);
        localStorage.setItem("Employees", str);
    };
    
    this.removeEmployee = function (employee) {
        var employeesList = this.getEmployees();
        employeesList.splice(employeesList.indexOf(employee), 1);
        var str = JSON.stringify(employeesList);
        localStorage.setItem("Employees", str);
    };
});