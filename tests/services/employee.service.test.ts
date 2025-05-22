import { mock, MockProxy } from "jest-mock-extended";
import {when} from 'jest-when';
import EmployeeService from "../../services/employee.service";
import EmployeeRepository from "../../repositories/employee.repositories";
import Employee from "../../entities/employee.entity";

describe('EmployeeService',()=>{
    let employeeRepository:MockProxy<EmployeeRepository>;
    let employeeService:EmployeeService;

    beforeEach(()=>{
        employeeRepository=mock<EmployeeRepository>();
        employeeService= new EmployeeService(employeeRepository);
    })
    describe('getEmployeeById',()=>{
        it('if employee is called with an valid id',async()=>{
            const mockEmployee={id:2,name:"raju"} as Employee;
              when(employeeRepository.findOneByID).calledWith(2).mockReturnValue(mockEmployee);
              const result=await employeeService.getEmployeeByID(2);
              expect(result).toStrictEqual(mockEmployee);
              expect(employeeRepository.findOneByID).toHaveBeenCalledWith(2);
        })

        it('if employee is called with an invalid id',async()=>{
              when(employeeRepository.findOneByID).calledWith(2).mockReturnValue(null);
              const result= employeeService.getEmployeeByID(2);
              expect(result).rejects.toThrow("Employee Not Found");
              expect(employeeRepository.findOneByID).toHaveBeenCalledWith(2);
        })
    })
})