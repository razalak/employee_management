import {Column,CreateDateColumn,DeleteDateColumn,Entity,PrimaryGeneratedColumn,UpdateDateColumn,OneToOne,JoinColumn} from "typeorm";
import AbstractEntity from "./abstract.entity";
 import Address from "./address.entity";

export enum EmployeeRole{
  UI='UI',
  UX='UX',
  DEVELOPER='DEVELOPER',
  HR='HR'
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
    role:EmployeeRole
  }
  
  export default Employee;
  