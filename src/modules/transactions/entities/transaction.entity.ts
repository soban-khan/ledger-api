import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @Column({ type: 'string' })
  narration: string;

  @Column({ type: 'string', nullable: false })
  reference_no: string;

  @Column({ type: 'date', nullable: false })
  date: Date;
}
