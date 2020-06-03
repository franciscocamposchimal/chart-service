import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Instrumentalist } from "./Instrumentalist";
import { Operator } from "./Operator";
import { TestSource } from "./TestSource";

@Entity("Test")
export class Test {
  @Column("date", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Column("text", { name: "dateEnd", nullable: true })
  dateEnd: string | null;

  @Column("text", { name: "dateInit" })
  dateInit: string;

  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("boolean", { name: "isEnd", default: () => "false" })
  isEnd: boolean;

  @Column("text", { name: "name" })
  name: string;

  @Column("date", { name: "updatedAt" })
  updatedAt: string;

  @ManyToOne(
    () => Instrumentalist,
    (instrumentalist) => instrumentalist.tests,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "instrumentalistId", referencedColumnName: "id" }])
  instrumentalist: Instrumentalist;

  @ManyToOne(() => Operator, (operator) => operator.tests, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "operatorId", referencedColumnName: "id" }])
  operator: Operator;

  @OneToMany(() => TestSource, (testSource) => testSource.test)
  testSources: TestSource[];
}
