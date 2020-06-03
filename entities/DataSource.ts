import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestSource } from "./TestSource";

@Entity("DataSource")
export class DataSource {
  @Column("date", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Column("text", { name: "data" })
  data: string;

  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "updatedAt" })
  updatedAt: string;

  @OneToMany(() => TestSource, (testSource) => testSource.datasource)
  testSources: TestSource[];
}
