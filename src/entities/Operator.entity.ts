import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Test } from "./Test.entity";

@Index("Operator.name", ["name"], { unique: true })
@Entity("Operator")
export class Operator {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;
  
  @Column("text", { name: "name", unique: true })
  name: string;
  
  @OneToMany(() => Test, (test) => test.operator)
  tests: Test[];
  
  @Column("date", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Column("date", { name: "updatedAt", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;

}
