export default function EmployeeService($http) {
    this.firedCount = 0;

    this.buildEmployeeList = () => {
        console.log('buildEmployeeList')
        if(!localStorage.getItem('Employees')) {
            this.generateEmployeeListAPI();
        }

        return JSON.parse(localStorage.getItem('Employees'));
    }

    this.generateEmployeeListAPI = () => {
        console.log('generateEmployeeListAPI')

        let url = "https://randomuser.me/api";
        let config = {
            params: {
                nat: "us",
                results: 100,
                inc: "name,location,id"
            }
        };

        $http.get(url, config)
        .then(
            (res)=>{
                let data = res.data.results;
                this.employeesList = data;
                localStorage.setItem('Employees', JSON.stringify(data.map(employee => ({
                            name: employee.name.first + ' ' + employee.name.last,
                            street: employee.location.street.number + ' ' + employee.location.street.name,
                            city: employee.location.city,
                            state: employee.location.state,
                            zip: employee.location.postcode,
                            }
                        )
                    )
                ));
            }
        ).catch(
            (res) => {
                alert('Error: Communicating with API');
            }
        ).finally(
            () => {console.log('Stupid API!')}
        );
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
