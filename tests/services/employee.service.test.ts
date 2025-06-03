import EmployeeService from '../../services/employee.service';
import EmployeeRepository from '../../repositories/employee.repositories';
import Employee, { EmployeeRole, EmployeeStatus } from '../../entities/employee.entity';
import Address from '../../entities/address.entity';
import Department from '../../entities/department.entity';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let mockRepository: jest.Mocked<EmployeeRepository>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findMany: jest.fn(),
      findOneByID: jest.fn(),
      findOneByEmail: jest.fn(),
      update: jest.fn(),
      deleteOneByID: jest.fn(),
    } as unknown as jest.Mocked<EmployeeRepository>;

    employeeService = new EmployeeService(mockRepository);
  });

  const sampleEmployee = new Employee();
  sampleEmployee.id = 1;
  sampleEmployee.name = 'razal';
  sampleEmployee.email = 'razal@abc.com';
  sampleEmployee.age = 30;
  sampleEmployee.address = new Address();
  sampleEmployee.password = 'hashed-password';
  sampleEmployee.role = EmployeeRole.DEVELOPER;
  sampleEmployee.department = new Department();
  sampleEmployee.status = EmployeeStatus.ACTIVE;
  sampleEmployee.Experience = 5;
  sampleEmployee.joiningdate = new Date('2022-01-01');

  it('should create an employee', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
    mockRepository.create.mockResolvedValue(sampleEmployee);

    const result = await employeeService.createEmployee(
      sampleEmployee.email,
      sampleEmployee.name,
      sampleEmployee.age,
      sampleEmployee.address,
      'plain-password',
      sampleEmployee.role,
      sampleEmployee.department,
      sampleEmployee.status,
      sampleEmployee.Experience,
      sampleEmployee.joiningdate,
      sampleEmployee.employeeId
    );

    expect(bcrypt.hash).toHaveBeenCalledWith('plain-password', 10);
    expect(mockRepository.create).toHaveBeenCalled();
    expect(result).toEqual(sampleEmployee);
  });

  it('should return all employees', async () => {
    mockRepository.findMany.mockResolvedValue([sampleEmployee]);

    const result = await employeeService.getAllEmployees();
    expect(result).toEqual([sampleEmployee]);
    expect(mockRepository.findMany).toHaveBeenCalled();
  });

  it('should return employee by ID', async () => {
    mockRepository.findOneByID.mockResolvedValue(sampleEmployee);

    const result = await employeeService.getEmployeeByID(1);
    expect(result).toEqual(sampleEmployee);
    expect(mockRepository.findOneByID).toHaveBeenCalledWith(1);
  });

  it('should throw error if employee not found by ID', async () => {
    mockRepository.findOneByID.mockResolvedValue(null);

    await expect(employeeService.getEmployeeByID(999)).rejects.toThrow('Employee Not Found');
  });

  it('should return employee by email', async () => {
    mockRepository.findOneByEmail.mockResolvedValue(sampleEmployee);

    const result = await employeeService.getEmployeeByEmail('razal@abc.com');
    expect(result).toEqual(sampleEmployee);
  });

  it('should update employee if exists', async () => {
    mockRepository.findOneByID.mockResolvedValue(sampleEmployee);

    await employeeService.updateEmployee(
      1,
      sampleEmployee.name,
      sampleEmployee.email,
      sampleEmployee.age,
      sampleEmployee.address,
      sampleEmployee.password,
      sampleEmployee.role,
      sampleEmployee.department,
      sampleEmployee.status,
      sampleEmployee.joiningdate,
      sampleEmployee.Experience,
      sampleEmployee.employeeId
    );

    expect(mockRepository.update).toHaveBeenCalled();
  });

  it('should not update employee if not exists', async () => {
    mockRepository.findOneByID.mockResolvedValue(null);

    await employeeService.updateEmployee(
      1,
      sampleEmployee.name,
      sampleEmployee.email,
      sampleEmployee.age,
      sampleEmployee.address,
      sampleEmployee.password,
      sampleEmployee.role,
      sampleEmployee.department,
      sampleEmployee.status,
      sampleEmployee.joiningdate,
      sampleEmployee.Experience,
      sampleEmployee.employeeId
    );

    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it('should delete employee if exists', async () => {
    mockRepository.findOneByID.mockResolvedValue(sampleEmployee);

    await employeeService.deleteEmployeeByID(1);
    expect(mockRepository.deleteOneByID).toHaveBeenCalledWith(1);
  });

  it('should throw error when deleting non-existent employee', async () => {
    mockRepository.findOneByID.mockResolvedValue(null);

    await expect(employeeService.deleteEmployeeByID(999)).rejects.toThrow('employee not found');
  });
});
