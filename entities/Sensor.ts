import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestSource } from "./TestSource";

@Entity("Sensor")
export class Sensor {
  @Column("date", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "tag" })
  tag: string;

  @Column("date", { name: "updatedAt" })
  updatedAt: string;

  @OneToMany(() => TestSource, (testSource) => testSource.sensor)
  testSources: TestSource[];
}
