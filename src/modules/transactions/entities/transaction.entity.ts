import { Entry } from 'src/modules/entries/entities/entry.entity';
import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @Column({ type: 'string' })
  narration: string;

  @Column({ type: 'string', nullable: false })
  referenceNo: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @OneToMany(() => Entry, (entry) => entry.transaction)
  entries: Entry[];
}
