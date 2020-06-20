import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from './Test.entity';

@Index('Instrumentalist.name', ['name'], { unique: true })
@Entity('Instrumentalist')
export class Instrumentalist {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name', unique: true })
  name: string;

  @OneToMany(
    () => Test,
    test => test.instrumentalist,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  tests: Test[];

  @Column('date', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column('date', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;
}
