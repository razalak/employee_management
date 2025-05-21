import express from "express";
import Employee from "./entities/employee.entity";
import datasource from "../session-05-starter/db/data-source";
import { Entity } from "typeorm";

const employeeRouter = express.Router();

employeeRouter.get("/", async (req, res) => {
   const employeeRepository=datasource.getRepository(Employee);
   const employees=await employeeRepository.find();
   res.status(200).send(employees);
});

employeeRouter.get("/:id", async(req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository=datasource.getRepository(Employee);
  const employee=await employeeRepository.findOneBy({
    id:empId
  });
  res.status(200).send(employee);
});

employeeRouter.post("/", async(req, res) => {
  console.log(req.body);
  const employeeRepository=datasource.getRepository(Employee);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  const employee=await employeeRepository.save(newEmployee);
  res.status(201).send(employee);
});

employeeRouter.delete("/:id", async(req, res) => {
   const empId = Number(req.params["id"]);
  const employeeRepository=datasource.getRepository(Employee);
   const employee=await employeeRepository.findOneBy({
    id:empId
  });
  employeeRepository.delete({id:empId});
  res.status(200).send();
});

employeeRouter.put("/:id", async(req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository=datasource.getRepository(Employee);
   const employee=await employeeRepository.findOneBy({
    id:empId
  });
  const newemployee=employeeRepository.update(empId,{...req.body});
  res.status(200).send(newemployee);
});

employeeRouter.patch("/:id", async(req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository=datasource.getRepository(Employee);
   const employee=await employeeRepository.findOneBy({
    id:empId
  });
  const newemployee=employeeRepository.update(empId,{...req.body});
  res.status(200).send(newemployee);
});

export default employeeRouter;
