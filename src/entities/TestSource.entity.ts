import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Test } from "./Test.entity";
import { DataSource } from "./DataSource.entity";
import { Sensor } from "./Sensor.entity";

@Entity("TestSource")
export class TestSource {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Test, (test) => test.testSources, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "testId", referencedColumnName: "id" }])
  test: Test;
  
  @ManyToOne(() => DataSource, (dataSource) => dataSource.testSources, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "datasourceId", referencedColumnName: "id" }])
  datasource: DataSource;
  
  @ManyToOne(() => Sensor, (sensor) => sensor.testSources, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "sensorId", referencedColumnName: "id" }])
  sensor: Sensor;

  @Column("date", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;
  
  @Column("date", { name: "updatedAt", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;
}
