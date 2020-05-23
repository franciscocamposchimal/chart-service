# Migration `20200520195931-test`

This migration has been generated by Francisco Campos at 5/20/2020, 7:59:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Operator" (
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT NOT NULL  ,"updatedAt" DATE NOT NULL  )

CREATE TABLE "quaint"."Instrumentalist" (
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT NOT NULL  ,"updatedAt" DATE NOT NULL  )

CREATE TABLE "quaint"."Test" (
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"dateEnd" TEXT   ,"dateInit" TEXT NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"instrumentalistId" INTEGER NOT NULL  ,"isEnd" BOOLEAN NOT NULL DEFAULT false ,"name" TEXT NOT NULL  ,"operatorId" INTEGER NOT NULL  ,"updatedAt" DATE NOT NULL  ,FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("instrumentalistId") REFERENCES "Instrumentalist"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "quaint"."TestSource" (
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"datasourceId" INTEGER NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"sensorId" INTEGER NOT NULL  ,"testId" INTEGER   ,"updatedAt" DATE NOT NULL  ,FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("datasourceId") REFERENCES "DataSource"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE)

CREATE TABLE "quaint"."Sensor" (
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT NOT NULL  ,"tag" TEXT NOT NULL  ,"updatedAt" DATE NOT NULL  )

CREATE TABLE "quaint"."DataSource" (
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"data" TEXT NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"updatedAt" DATE NOT NULL  )

CREATE UNIQUE INDEX "quaint"."Operator.name" ON "Operator"("name")

CREATE UNIQUE INDEX "quaint"."Instrumentalist.name" ON "Instrumentalist"("name")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200520195931-test
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,65 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource sqlite {
+  provider = "sqlite"
+  url      = "file:dev.db"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Operator {
+  id         Int         @id @default(autoincrement())
+  name       String      @unique
+  tests      Test[]
+  createdAt  DateTime    @default(now())
+  updatedAt  DateTime    @updatedAt
+}
+model Instrumentalist {
+  id         Int         @id @default(autoincrement())
+  name       String      @unique
+  tests      Test[]
+  createdAt  DateTime    @default(now())
+  updatedAt  DateTime    @updatedAt
+}
+model Test {
+  id                Int             @id @default(autoincrement())
+  name              String
+  dateInit          String
+  dateEnd           String?
+  isEnd             Boolean         @default(false)
+  operator          Operator        @relation(fields: [operatorId], references: [id])
+  operatorId        Int
+  instrumentalist   Instrumentalist @relation(fields: [instrumentalistId], references: [id])
+  instrumentalistId Int
+  testsources       TestSource[]
+  createdAt         DateTime        @default(now())
+  updatedAt         DateTime        @updatedAt
+}
+
+model TestSource {
+  id           Int          @id @default(autoincrement())
+  sensor       Sensor       @relation(fields: [sensorId], references: [id])
+  sensorId     Int
+  datasource   DataSource   @relation(fields: [datasourceId], references: [id])
+  datasourceId Int
+  createdAt    DateTime     @default(now())
+  updatedAt    DateTime     @updatedAt
+}
+
+model Sensor {
+  id         Int         @id @default(autoincrement())
+  name       String
+  tag        String
+  createdAt  DateTime    @default(now())
+  updatedAt  DateTime    @updatedAt
+}
+
+model DataSource {
+  id         Int         @id @default(autoincrement())
+  data       String
+  createdAt  DateTime    @default(now())
+  updatedAt  DateTime    @updatedAt
+}
```

