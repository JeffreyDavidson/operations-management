angular.module("employeesApp").service("dataService", function ($http) {
    
    var employeesList = [];
    this.firedCount = 0;
    
    this.getNewEmployees = function () {
        var url = "https://randomuser.me/api";
        var params = {
            nat: "us",
            results: 100,
            inc: "name,location,id"
        };
        var config = { params: params };

        return $http.get(url, config)
            .then(function (response) {
                var list = response.data.results;
                var newList = list.map(employee => ({
                    employeeName: employee.name.first + ' ' + employee.name.last,
                    employeeStreet: employee.location.street.number + ' ' + employee.location.street.name,
                    employeeCity: employee.location.city,
                    employeeState: employee.location.state,
                    employeeZipCode: employee.location.postcode,
                }));
                employeesList = newList;

                return employeesList;
            });
    }

    this.getEmployees = function () {
        if (employeesList.length > 0) {
            return Promise.resolve(employeesList);
        }

        if (localStorage.getItem("Employees") !== null) {
            employeesList = JSON.parse(localStorage.getItem("Employees"));
            if (employeesList.length > 0) {
                return Promise.resolve(employeesList);
            }
        }

        return this.getNewEmployees();
    };
    
    this.addEmployee = function (employee) {
        var employeesList = this.getEmployees();
        employeesList.push(employee);   
        console.log
        var str = JSON.stringify(employeesList);
        localStorage.setItem("Employees", str);
    };
    
    this.removeEmployee = async function (employee) {
        let employeesList = await this.getEmployees();
        let output = employeesList.map((o, k) => (o.employeeName !== employee.employeeName));
        localStorage.setItem("Employees", JSON.stringify(output));
        return true;
    }
});
