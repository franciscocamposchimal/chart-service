import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestSource } from "./TestSource.entity";

@Entity("DataSource")
export class DataSource {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;
  
  @Column("text", { name: "data" })
  data: string;
  
  @OneToMany(() => TestSource, (testSource) => testSource.datasource)
  testSources: TestSource[];
  
  @Column("date", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Column("date", { name: "updatedAt", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;

}
