import { ACCOUNT_TYPES } from 'src/constants/app.constants';
import { BaseEntity } from 'src/universal/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Account extends BaseEntity {
  @Column({ type: 'string', nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: ACCOUNT_TYPES,
    nullable: false,
  })
  type: ACCOUNT_TYPES;
}
