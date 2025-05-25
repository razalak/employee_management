import {Column,CreateDateColumn,DeleteDateColumn,Entity,OneToOne,PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
class Address extends AbstractEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    houseno:number;
    @Column()
    line_1:string;
    @Column()
    line_2:string;
    @OneToOne(()=>Employee)
    employee:Employee;   
};

export default Address;