import { mock, MockProxy } from 'jest-mock-extended';
import { when } from 'jest-when';
import bcrypt from 'bcrypt';

import EmployeeService from '../../services/employee.service';
import EmployeeRepository from '../../repositories/employee.repositories';
import Employee, {
  EmployeeRole,
  EmployeeStatus,
} from '../../entities/employee.entity';
import Address from '../../entities/address.entity';
import Department from '../../entities/department.entity';
import HttpException from '../../exceptions/httpException';

describe('EmployeeService', () => {
  let employeeRepository: MockProxy<EmployeeRepository>;
  let employeeService: EmployeeService;

  beforeEach(() => {
    employeeRepository = mock<EmployeeRepository>();
    employeeService = new EmployeeService(employeeRepository);
  });


  describe('getEmployeeByID', () => {
    it('returns the employee when a valid id is supplied', async () => {
      const mockEmployee = { id: 2, name: 'raju' } as unknown as Employee;
      when(employeeRepository.findOneByID)
        .calledWith(2)
        .mockResolvedValue(mockEmployee);

      const result = await employeeService.getEmployeeByID(2);

      expect(result).toStrictEqual(mockEmployee);
      expect(employeeRepository.findOneByID).toHaveBeenCalledWith(2);
    });

    it('throws "Employee Not Found" when the id is invalid', async () => {
      when(employeeRepository.findOneByID)
        .calledWith(2)
        .mockResolvedValue(null as unknown as Employee);

      await expect(employeeService.getEmployeeByID(2)).rejects.toThrow(
        'Employee Not Found',
      );
      expect(employeeRepository.findOneByID).toHaveBeenCalledWith(2);
    });
  });


  describe('getAllEmployees', () => {
    it('simply returns whatever the repository returns', async () => {
      const list = [{ id: 1, name: 'foo' }] as unknown as Employee[];
      employeeRepository.findMany.mockResolvedValue(list);

      const result = await employeeService.getAllEmployees();

      expect(result).toBe(list);
      expect(employeeRepository.findMany).toHaveBeenCalledTimes(1);
    });
  });



  describe('createEmployee', () => {
    it('hashes the password and delegates to create()', async () => {
      const address = { houseno:230,line_1:'sm street',line_2:'narikkuni' } as Address;
      const dept = { id: 7, dpt_name: 'HR' } as Department;

      const created = { id: 99 } as Employee;
      employeeRepository.create.mockResolvedValue(created);

      const result = await employeeService.createEmployee(
        'dias@abc.com',
        'dias',
        22,
        address,
        'plain',
        EmployeeRole.HR,
        dept,
        EmployeeStatus.ACTIVE,
        1,
        new Date('2025-01-01'),
      );

      expect(bcrypt.hash).toHaveBeenCalledWith('plain', 10);
      expect(employeeRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'dias',
          email: 'dias@abc.com',
          password: 'hashed-password',
        }),
      );
      expect(result).toBe(created);
    });
  });


  describe('updateEmployee', () => {
    const baseArgs = [
      1, 
      'razal', 
      'razal@abc.com', 
      30,
      {} as Address,
      'pw',
      EmployeeRole.DEVELOPER,
      {} as Department,
      EmployeeStatus.ACTIVE,
      new Date('2025-01-01'),
      5,
    ] as const;

    it('calls repository.update when the employee exists', async () => {
      when(employeeRepository.findOneByID)
        .calledWith(1)
        .mockResolvedValue({ id: 1 } as Employee);

      await employeeService.updateEmployee(...baseArgs);

      expect(employeeRepository.update).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ name: 'ziya', email: 'ziya@abc.com' }),
      );
    });

    it('does nothingwhen the employee does not exist', async () => {
      when(employeeRepository.findOneByID)
        .calledWith(1)
        .mockResolvedValue(null as unknown as Employee);

      await employeeService.updateEmployee(...baseArgs);

      expect(employeeRepository.update).not.toHaveBeenCalled();
    });
  });


  describe('deleteEmployeeByID', () => {
    it('deletes when the employee exists', async () => {
      when(employeeRepository.findOneByID)
        .calledWith(1)
        .mockResolvedValue({ id: 1 } as Employee);

      await employeeService.deleteEmployeeByID(1);

      expect(employeeRepository.deleteOneByID).toHaveBeenCalledWith(1);
    });

    it('throws HttpException when the employee is missing', async () => {
      when(employeeRepository.findOneByID)
        .calledWith(1)
        .mockResolvedValue(null as unknown as Employee);

      await expect(employeeService.deleteEmployeeByID(1)).rejects.toBeInstanceOf(
        HttpException,
      );
      expect(employeeRepository.deleteOneByID).not.toHaveBeenCalled();
    });
  });
});
