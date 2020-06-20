import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TestSource } from './TestSource.entity';

@Entity('Sensor')
export class Sensor {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'tag' })
  tag: string;

  @Column('text', { name: 'type', nullable: true })
  type?: string;

  @OneToMany(
    () => TestSource,
    testSource => testSource.sensor,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  testSources: TestSource[];

  @Column('date', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column('date', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;
}
