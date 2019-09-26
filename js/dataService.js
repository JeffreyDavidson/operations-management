angular.module("employeesApp").service("dataService", function () {
    
    var employeesList = [];
    
    this.getEmployees = function () {
        var str = localStorage.getItem("Employees");
        employeesList = JSON.parse(str) || employeesList;
        return employeesList;
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