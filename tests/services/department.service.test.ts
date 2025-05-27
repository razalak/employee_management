import DepartmentServices from "../../services/department.service";
import { mock, MockProxy } from "jest-mock-extended";
import DepartmentRepository from "../../repositories/department.repositories";
import EmployeeRepository from "../../repositories/employee.repositories";
import Department from "../../entities/department.entity";
import { when } from "jest-when";

describe("DepartmentServices", () => {
  let departmentRepoMock: MockProxy<DepartmentRepository>;
  let employeeRepoMock: MockProxy<EmployeeRepository>;
  let service: DepartmentServices;

  beforeEach(() => {
    departmentRepoMock = mock<DepartmentRepository>();
    employeeRepoMock = mock<EmployeeRepository>();
    service = new DepartmentServices(departmentRepoMock, employeeRepoMock);
  });

  it("should create a department", async () => {
    const department = new Department();
    department.dpt_name = "HR";

    departmentRepoMock.create.mockResolvedValue(department);

    const result = await service.createDepartment("HR");


    expect(result).toEqual(department);
    expect(departmentRepoMock.create).toHaveBeenCalled();
    expect(departmentRepoMock.create).toHaveBeenCalledWith(expect.objectContaining({ dpt_name: "Engineering" }));
  });

  it("should return all departments", async () => {
  const departments: Department[] = [
  {
    id: 1,
    dpt_name: "HR",
    employees: [],
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2023-01-02T00:00:00Z"),
    deletedAt:  new Date("1970-01-01T00:00:00Z") //dummy value
  },
  {
    id: 2,
    dpt_name: "Engineering",
    employees: [],
    createdAt: new Date("2023-01-03T00:00:00Z"),
    updatedAt: new Date("2023-01-04T00:00:00Z"),
    deletedAt:  new Date("1970-01-01T00:00:00Z") //dummy value
  }
];

    departmentRepoMock.findMany.mockResolvedValue(departments);

    const result = await service.getAllDepartment();

    expect(result).toEqual(departments);
    expect(departmentRepoMock.findMany).toHaveBeenCalled();
  });

  it("should return a department by ID", async () => {
    const department = new Department();
    department.id = 1;
    department.dpt_name = "Sales";

    when(departmentRepoMock.findOneByID).calledWith(1).mockResolvedValue(department);

    const result = await service.getDepartmentByID(1);

    expect(result).toEqual(department);
    expect(departmentRepoMock.findOneByID).toHaveBeenCalledWith(1);
  });

  it("should throw error if department not found by ID", async () => {
    when(departmentRepoMock.findOneByID).calledWith(99).mockResolvedValue(null);

    await expect(service.getDepartmentByID(99)).rejects.toThrow("Department Not Found");
    expect(departmentRepoMock.findOneByID).toHaveBeenCalledWith(99);
  });

  it("should update department if it exists", async () => {
    const existingDepartment = new Department();
    existingDepartment.id = 1;
    existingDepartment.dpt_name = "Marketing";

    when(departmentRepoMock.findOneByID).calledWith(1).mockResolvedValue(existingDepartment);

    await service.updateDepartment(1, "New");

    expect(departmentRepoMock.update).toHaveBeenCalledWith(1, expect.objectContaining({ dpt_name: "SALES" }));
  });

  it("should throw error if department to update does not exist", async () => {
    when(departmentRepoMock.findOneByID).calledWith(2).mockResolvedValue(null);

    await expect(service.updateDepartment(2, "DoesNotExist")).rejects.toThrow();
  });

  it("should delete a department by ID", async () => {
    await service.deleteDepartmentByID(5);

    expect(departmentRepoMock.deleteOneByID).toHaveBeenCalledWith(5);
  });
});
