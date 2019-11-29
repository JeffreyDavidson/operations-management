import angular from "angular";
import employeeController from '../../app/components/employees/employeeController.js';
import employeeService from '../../app/components/employees/employeeService.js';
import modalService from "./modalService";

angular.module("employeesApp", [])
.controller('employeeController', employeeController)
.service('employeeService', employeeService)
.service('modalService', modalService);
