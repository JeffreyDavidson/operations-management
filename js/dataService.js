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
        return new Promise((resolve, reject) => {
            $http.get(url, config)
                .then(function (response) {
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
                    resolve(employeesList);
                });
        });
    }

    this.getEmployees = async function () {
        if (employeesList.length > 0) {
            return Promise.resolve(employeesList);
        }

        if (localStorage.getItem("Employees") !== null) {
            employeesList = JSON.parse(localStorage.getItem("Employees"));
            if (employeesList.length > 0) {
                return Promise.resolve(employeesList);
            }
        }

        return await this.getNewEmployees();
    };
    
    this.addEmployee = function (employee) {
        var employeesList = this.getEmployees();
        employeesList.push(employee);
        var str = JSON.stringify(employeesList);
        localStorage.setItem("Employees", str);
    };
    
    this.removeEmployee = async function (employee) {
        var employeesList = await this.getEmployees();
        this.firedCount++;
        employeesList.splice(employeesList.findIndex(e => e.name === employee.name), 1);
        localStorage.setItem("Employees", JSON.stringify(employeesList));
    };
});
