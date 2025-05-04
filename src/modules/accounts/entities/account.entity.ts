import { ACCOUNT_TYPES } from 'src/constants/app.constants';
import { Entry } from 'src/modules/entries/entities/entry.entity';
import { BaseEntity } from 'src/universal/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Account extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 255 })
  name: string;

  @Column({
    type: 'enum',
    enum: ACCOUNT_TYPES,
    nullable: false,
  })
  type: ACCOUNT_TYPES;

  @OneToMany(() => Entry, (entry) => entry.account)
  entries: Entry[];
}
