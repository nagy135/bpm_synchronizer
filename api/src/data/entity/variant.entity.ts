import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import SongEntity from './song.entity';

/**
 * Entity representing single item in auction
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
@Entity('variants')
export default class VariantEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  path: string;

  @Column({ type: 'numeric' })
  bpm: number;

  // relations

  @ManyToOne(() => SongEntity, (song: SongEntity) => song.id)
  @JoinColumn({ name: 'song_id' })
  song: SongEntity;

  // timestamps

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', select: false })
  deletedAt: Date;
}
