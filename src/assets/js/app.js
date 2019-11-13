import angular from "angular";
import employeeController from '../../app/components/employees/employeeController.js';
import employeeService from '../../app/components/employees/employeeService.js';

angular.module("employeesApp", [])
.controller('employeeController', employeeController)
.service('employeeService', employeeService);
