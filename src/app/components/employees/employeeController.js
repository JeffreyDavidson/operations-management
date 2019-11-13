export default function EmployeesController(employeeService) {
    var vm = this;
    vm.firedCount = employeeService.firedCount;

    var promise = employeeService.getEmployees();

    promise.then(list => {
        vm.employees = list;
    });

    vm.addEmployee = function () {
        var employee = {
            "name": vm.employee.name,
            "street": vm.employee.street,
            "city": vm.employee.city,
            "state": vm.employee.state,
            "zip": vm.employee.zip
        };

        employeeService.addEmployee(employee);

        vm.employee.name = '';
        vm.employee.street = '';
        vm.employee.city = '';
        vm.employee.state = '';
        vm.employee.zip = '';

        vm.employees = employeeService.getEmployees();
    }

    vm.deleteEmployee = function (employee) {
        employeeService.removeEmployee(employee);
        vm.employees = employeeService.getEmployees();
    }
}
   
EmployeesController.$inject = ['employeeService'];