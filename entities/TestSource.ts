import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Test } from "./Test";
import { DataSource } from "./DataSource";
import { Sensor } from "./Sensor";

@Entity("TestSource")
export class TestSource {
  @Column("date", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "updatedAt" })
  updatedAt: string;

  @ManyToOne(() => Test, (test) => test.testSources, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "testId", referencedColumnName: "id" }])
  test: Test;

  @ManyToOne(() => DataSource, (dataSource) => dataSource.testSources, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "datasourceId", referencedColumnName: "id" }])
  datasource: DataSource;

  @ManyToOne(() => Sensor, (sensor) => sensor.testSources, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "sensorId", referencedColumnName: "id" }])
  sensor: Sensor;
}
