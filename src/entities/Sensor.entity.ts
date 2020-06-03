import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestSource } from "./TestSource.entity";

@Entity("Sensor")
export class Sensor {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;
  
  @Column("text", { name: "name" })
  name: string;
  
  @Column("text", { name: "tag" })
  tag: string;
  
  @OneToMany(() => TestSource, (testSource) => testSource.sensor)
  testSources: TestSource[];
  
  @Column("date", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Column("date", { name: "updatedAt", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;

}

