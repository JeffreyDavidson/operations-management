angular.module("employeesApp").service("dataService", function ($http) {
    
    var employeesList = [];
    this.firedCount = 0;
    
    this.getEmployees = function () {
        var url = "https://randomuser.me/api";
        var params = {
          nat: "us",
          results: 100,
          inc: "name,location,id"
        };
        var config = { params: params };
    
        return $http.get(url, config)
            .then(function(response) {
            var list = response.data.results;
            var newList = list.map(employee => ({
              employeeId: employee.id,
              employeeName: employee.name.first + ' ' + employee.name.last, 
              employeeStreet: employee.location.street.number + ' ' + employee.location.street.name,
              employeeCity: employee.location.city,
              employeeState: employee.location.state,
              employeeZipCode: employee.location.postcode,
            }));
            employeesList = newList;

            return employeesList;
        });
    };
    
    this.addEmployee = function (employee) {
        var employeesList = this.getEmployees();
        employeesList.push(employee);
        var str = JSON.stringify(employeesList);
        localStorage.setItem("Employees", str);
    };
    
    this.removeEmployee = async function (employee) {
        console.log(employee);
        var employeesList = await this.getEmployees();
        console.log(employeesList);
        this.firedCount++;
        console.log(this.firedCount);
        employeesList.splice(employeesList.indexOf(employee), 1);
        var str = JSON.stringify(employeesList);
        localStorage.setItem("Employees", str);
    };
});
