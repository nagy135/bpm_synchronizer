import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import VariantEntity from './variant.entity';

/**
 * Entity representing stored song original
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
@Entity('songs')
export default class SongEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  path: string;

  @Column({ type: 'numeric' })
  bpm: number; // original bpm

  // relations

  @OneToMany(() => VariantEntity, (variant: VariantEntity) => variant.song)
  variants: VariantEntity;

  // timestamps

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', select: false })
  deletedAt: Date;
}
