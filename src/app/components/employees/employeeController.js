export default function EmployeesController(employeeService) {
    var vm = this;
    vm.firedCount = employeeService.firedCount;
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
        this.employee = Object.keys(this.employee).map(
            key => (this.employee[key] = "")
        );

        vm.employees = employeeService.buildEmployeeList();
    }

    this.removeEmployee = (employee) => {
        if (!employeeService.doesListExist()) {
            alert('Something Went Wrong, my list is missing!!!!!!!!!')
        }

        let output = employeeService.getExistingList().filter((o, k) => (o.name !== employee.name));
        
        localStorage.setItem("Employees", JSON.stringify(output));

        return true;
    }
}
   
EmployeesController.$inject = ['employeeService'];