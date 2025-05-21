import {Column,CreateDateColumn,DeleteDateColumn,Entity,PrimaryGeneratedColumn,UpdateDateColumn,OneToOne,JoinColumn} from "typeorm";
import AbstractEntity from "./abstract.entity";
 import Address from "./address.entity";

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

    @OneToOne(() => Address,(address)=>address.employee,{
      cascade:true,
      onDelete:"CASCADE"
    })
    @JoinColumn()
    address: Address;
  }
  
  export default Employee;
  