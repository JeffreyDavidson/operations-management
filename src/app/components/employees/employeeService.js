export default function EmployeeService($http) {
    var employeesList = [];
    this.firedCount = 0;

    this.addEmployee = (employee) => {
        var employeesList = this.getEmployees();
        employeesList.push(employee);
        var str = JSON.stringify(employeesList);
        localStorage.setItem("Employees", str);
    }

    this.removeEmployee = (employee) => {
        let employeesList = this.buildEmployeeList();
        let output = employeesList.filter((o, k) => (o.name !== employee.name));
        localStorage.setItem("Employees", JSON.stringify(output));
        return true;
    }

    this.buildEmployeeList = () => {
        return localStorage.getItem('Employees') !== null ?
            JSON.parse(localStorage.getItem('Employees'))
            :
            this.generateEmployeeListAPI();
    }
    
    this.generateEmployeeListAPI = () => {
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

    this.doesListExist = () => {
        let empList = localStorage.getItem('Employees');

        if(empList === null) {
            // exit early
            return false;
        }

        empList = JSON.parse(empList);
        
        return (empList.length > 0);
    }

    this.getExistingList = () => {
        return JSON.parse(localStorage.getItem('Employees'));
    }
}

EmployeeService.$inject = ['$http'];
