export default function EmployeeService($http) {
    var employeesList = [];
    this.firedCount = 0;

    this.addEmployee = function (employee) {
        var employeesList = this.getEmployees();
        employeesList.push(employee);
        var str = JSON.stringify(employeesList);
        localStorage.setItem("Employees", str);
    };

    this.removeEmployee = async function (employee) {
        let employeesList = await this.getEmployees();
        let output = employeesList.filter((o, k) => (o.name !== employee.name));
        localStorage.setItem("Employees", JSON.stringify(output));
        return true;
    }

    buildEmployeeList = () => {
        return localStorage.getItem('Employees') !== null ?
            JSON.parse(localStorage.getItem('Employees'))
            :
            this.generateEmployeeListAPI();
    }
    
    generateEmployeeListAPI = () => {
        let promise = new Promise((res, rej) => {
            let config = {
                prarms: {
                    nat: "us",
                    results: 100,
                    inc: "name,location,id"
                }
            };
    
            let url = "https://randomuser.me/api";
    
            $http.get(url, config)
        })
    
        promise.then((res) => {
            JSON.stringify(res.data.results.map(employee => ({
                        name: employee.name.first + ' ' + employee.name.last,
                        street: employee.location.street.number + ' ' + employee.location.street.name,
                        city: employee.location.city,
                        state: employee.location.state,
                        zip: employee.location.postcode,
                        }
                    )
                )
            );
            this.buildEmployeeList();
        });
    
        promise.catch((e) => {
            alert('Error: Communicating with API');
        });
    }
}

EmployeeService.$inject = ['$http'];
