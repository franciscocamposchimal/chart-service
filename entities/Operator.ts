import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Test } from "./Test";

@Index("Operator.name", ["name"], { unique: true })
@Entity("Operator")
export class Operator {
  @Column("date", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name", unique: true })
  name: string;

  @Column("date", { name: "updatedAt" })
  updatedAt: string;

  @OneToMany(() => Test, (test) => test.operator)
  tests: Test[];
}
