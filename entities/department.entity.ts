import {Column,CreateDateColumn,DeleteDateColumn,Entity,JoinColumn,OneToMany,OneToOne,PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";
@Entity()
class Department extends AbstractEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    dpt_name:string;
    @OneToMany(() => Employee,(employee)=>employee.department,{
      cascade:true,
      onDelete:"CASCADE"
    }) 
    employees:Employee[];
};   


export default Department;