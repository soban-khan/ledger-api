import { ENTRY_TYPES } from 'src/constants/app.constants';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Entry extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  amount: number;

  @Column({
    type: 'enum',
    enum: ENTRY_TYPES,
    nullable: false,
  })
  type: ENTRY_TYPES;

  @ManyToOne(() => Account, (account) => account.entries)
  account: Account;

  @ManyToOne(() => Transaction, (transaction) => transaction.entries)
  transaction: Transaction;
}
