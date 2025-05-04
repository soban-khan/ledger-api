import { Entry } from 'src/modules/entries/entities/entry.entity';
import { BaseEntity } from 'src/universal/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @Column({ type: 'varchar', length: '500' })
  narration: string;

  @Column({ type: 'varchar', nullable: false, length: '200' })
  referenceNo: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @OneToMany(() => Entry, (entry) => entry.transaction, {
    cascade: true,
    eager: true,
  })
  entries: Entry[];
}
