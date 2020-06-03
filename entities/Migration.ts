import { Column, Entity } from "typeorm";

@Entity("_Migration")
export class Migration {
  @Column("integer", { primary: true, name: "revision" })
  revision: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "datamodel" })
  datamodel: string;

  @Column("text", { name: "status" })
  status: string;

  @Column("integer", { name: "applied" })
  applied: number;

  @Column("integer", { name: "rolled_back" })
  rolledBack: number;

  @Column("text", { name: "datamodel_steps" })
  datamodelSteps: string;

  @Column("text", { name: "database_migration" })
  databaseMigration: string;

  @Column("text", { name: "errors" })
  errors: string;

  @Column("date", { name: "started_at" })
  startedAt: string;

  @Column("date", { name: "finished_at", nullable: true })
  finishedAt: string | null;
}
