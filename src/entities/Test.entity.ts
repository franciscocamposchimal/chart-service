import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Instrumentalist } from "./Instrumentalist.entity";
import { Operator } from "./Operator.entity";
import { TestSource } from "./TestSource.entity";

@Entity("Test")
export class Test {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;
  
  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "dateEnd", nullable: true })
  dateEnd: string | null;
  
  @Column("text", { name: "dateInit" })
  dateInit: string;
  
  @Column("boolean", { name: "isEnd", default: () => "false" })
  isEnd: boolean;
  
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
    
    @Column("date", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
    createdAt: string;
    
    @Column("date", { name: "updatedAt", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: string;
  }
  