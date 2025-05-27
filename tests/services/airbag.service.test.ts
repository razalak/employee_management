import EmployeeService from '../../services/employee.service';
import { mock, MockProxy } from 'jest-mock-extended';
import { when } from 'jest-when';
import EmployeeRepository from '../../repositories/employee.repositories';
import Employee, { EmployeeRole, EmployeeStatus } from '../../entities/employee.entity';
import Address from '../../entities/address.entity';
import Department from '../../entities/department.entity';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('EmployeeService', () => {
  let repositoryMock: MockProxy<EmployeeRepository>;
  let service: EmployeeService;

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

  beforeEach(() => {
    repositoryMock = mock<EmployeeRepository>();
    service = new EmployeeService(repositoryMock);
  });

  it('creates an employee', async () => {
    // Arrange
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
    when(repositoryMock.create).calledWith(expect.any(Employee)).mockResolvedValue(sampleEmployee);

    // Act
    const result = await service.createEmployee(
      sampleEmployee.email,
      sampleEmployee.name,
      sampleEmployee.age,
      sampleEmployee.address,
      'plain-password',
      sampleEmployee.role,
      sampleEmployee.department,
      sampleEmployee.status,
      sampleEmployee.Experience,
      sampleEmployee.joiningdate
    );

    // Assert
    expect(result).toEqual(sampleEmployee);
    expect(repositoryMock.create).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith('plain-password', 10);
  });

  it('returns all employees', async () => {
    when(repositoryMock.findMany).calledWith().mockResolvedValue([sampleEmployee]);

    const result = await service.getAllEmployees();

    expect(result).toEqual([sampleEmployee]);
  });

  it('returns employee by ID', async () => {
    when(repositoryMock.findOneByID).calledWith(1).mockResolvedValue(sampleEmployee);

    const result = await service.getEmployeeByID(1);

    expect(result).toEqual(sampleEmployee);
  });

  it('throws if employee not found by ID', async () => {
    // Arrange
    when(repositoryMock.findOneByID).calledWith(999).mockResolvedValue(null);

    await expect(service.getEmployeeByID(999)).rejects.toThrow('Employee Not Found');
  });

  it('returns employee by email', async () => {
    // Arrange
    when(repositoryMock.findOneByEmail).calledWith('john@example.com').mockResolvedValue(sampleEmployee);

    // Act
    const result = await service.getEmployeeByEmail('john@example.com');

    // Assert
    expect(result).toEqual(sampleEmployee);
  });

  it('updates employee if exists', async () => {

    when(repositoryMock.findOneByID).calledWith(1).mockResolvedValue(sampleEmployee);

    await service.updateEmployee(
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
      sampleEmployee.Experience
    );

    expect(repositoryMock.update).toHaveBeenCalled();
  });

  it('does not update employee if not found', async () => {
 
    when(repositoryMock.findOneByID).calledWith(999).mockResolvedValue(null);

    await service.updateEmployee(
      999,
      sampleEmployee.name,
      sampleEmployee.email,
      sampleEmployee.age,
      sampleEmployee.address,
      sampleEmployee.password,
      sampleEmployee.role,
      sampleEmployee.department,
      sampleEmployee.status,
      sampleEmployee.joiningdate,
      sampleEmployee.Experience
    );

    expect(repositoryMock.update).not.toHaveBeenCalled();
  });

  it('deletes employee if exists', async () => {

    when(repositoryMock.findOneByID).calledWith(1).mockResolvedValue(sampleEmployee);

    await service.deleteEmployeeByID(1);

    expect(repositoryMock.deleteOneByID).toHaveBeenCalledWith(1);
  });

  it('throws if employee not found on delete', async () => {
    when(repositoryMock.findOneByID).calledWith(999).mockResolvedValue(null);

    await expect(service.deleteEmployeeByID(999)).rejects.toThrow('employee not found');
  });
});
