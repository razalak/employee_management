import {Column,CreateDateColumn,DeleteDateColumn,Entity,PrimaryGeneratedColumn,UpdateDateColumn,OneToOne,JoinColumn, ManyToOne} from "typeorm";
import AbstractEntity from "./abstract.entity";
 import Address from "./address.entity";
import Department from "./department.entity";

export enum EmployeeRole{
  UI='UI',
  UX='UX',
  DEVELOPER='DEVELOPER',
  HR='HR'
}

export enum EmployeeStatus{
   ACTIVE="ACTIVE",
   INACTIVE="INACTIVE",
   PROBATION="PROBATION"
}



@Entity()
class Employee extends AbstractEntity{
  @PrimaryGeneratedColumn()
    id: number;
    @Column({unique:true})
    email: string;
    @Column()
    name: string;
    @Column()
    age:number;
    @Column()
    password:string;

    @OneToOne(() => Address,(address)=>address.employee,{
      cascade:true,
      onDelete:"CASCADE"
    })
    @JoinColumn()
    address: Address;

    @Column({
      type:`enum`,
      enum:EmployeeRole,
      default:EmployeeRole.DEVELOPER
    })
    role:EmployeeRole;

      @ManyToOne(()=>Department,(department)=>department.employees)
      @JoinColumn()
      department:Department; 
      
    @Column({
      type:`enum`,
      enum:EmployeeStatus,
      default:EmployeeStatus.INACTIVE
    })
    status:EmployeeStatus;

    @Column()
    joiningdate:Date;

    @Column()
    Experience:number;
  }
  
  export default Employee;
  