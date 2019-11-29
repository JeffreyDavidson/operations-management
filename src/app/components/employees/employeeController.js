export default function EmployeesController(employeeService, $scope, $interval) {
    var vm = this;
    vm.timed = null;
    vm.firedCount = employeeService.firedCount;
    //vm.employees = [];
    vm.employees = employeeService.buildEmployeeList();

    vm.addEmployee = () => {
        var employee = {
            "name": vm.employee.name,
            "street": vm.employee.street,
            "city": vm.employee.city,
            "state": vm.employee.state,
            "zip": vm.employee.zip
        };

        employeeService.addEmployee(employee);

        /**
         * Create an empty employee object by clearing
         * out the form inputs after submission.
         */
        vm.employee = Object.keys(vm.employee).map(
            key => (vm.employee[key] = "")
        );

        vm.employees = employeeService.buildEmployeeList();
    }

    vm.removeEmployee = (employee) => {
        if (!employeeService.doesListExist()) {
            alert('Something Went Wrong, my list is missing!!!!!!!!!')
        }

        let output = employeeService.getExistingList().filter((o, k) => (o.name !== employee.name));
        localStorage.setItem("Employees", JSON.stringify(output));
        vm.employees = output;
        vm.firedCount = vm.firedCount+1;
        return true;
    }

    vm.timed = setInterval(()=>{
        if(employeeService.doesListExist() === true) {
            vm.employees = employeeService.getExistingList();
            clearInterval(vm.timed);
        }
    }, 500)

}
EmployeesController.$inject = ['employeeService', '$scope', '$interval'];
