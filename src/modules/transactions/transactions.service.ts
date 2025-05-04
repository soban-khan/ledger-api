import { randomBytes } from 'crypto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  CreateTransactionDto,
  TransactionFilterDto,
} from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { EntriesService } from '../entries/entries.service';
import { AccountsService } from '../accounts/accounts.service';
import { DataSource } from 'typeorm';
import { Entry } from '../entries/entities/entry.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly entryService: EntriesService,
    private readonly accountService: AccountsService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const isBalanced = this.entryService.validateEntries(
        createTransactionDto.entries,
      );
      if (!isBalanced) {
        throw new BadRequestException(
          'Transaction entries not balanced (debits must equal credits)',
        );
      }
      for (const entry of createTransactionDto.entries) {
        await this.accountService.findOne(entry.accountId);
      }

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const transactionData = {
          referenceNo: this.generateRefNo(),
          narration: createTransactionDto.narration,
          date: createTransactionDto.date,
        };

        const savedTransaction = await queryRunner.manager.save(
          Transaction,
          transactionData,
        );
        const entries = createTransactionDto.entries.map((entry) => {
          return {
            transaction: { id: savedTransaction.id },
            account: { id: entry.accountId },
            amount: entry.amount,
            type: entry.type,
          };
        });
        await queryRunner.manager.save(Entry, entries);
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
      return {};
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  generateRefNo(): string {
    const date = new Date();
    const datePart = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    const hash = randomBytes(2).toString('hex').toUpperCase();
    return `TXN-${datePart}-${randomNumbers}-${hash}`;
  }

  async findAll(filters?: TransactionFilterDto) {
    try {
      const queryBuilder = this.transactionRepository
        .createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.entries', 'entry')
        .leftJoinAndSelect('entry.account', 'account');

      if (filters) {
        if (filters.accountId) {
          queryBuilder.andWhere('entry.account_id = :accountId', {
            accountId: filters.accountId,
          });
        }
        if (filters.startDate && filters.endDate) {
          queryBuilder.andWhere(
            'transaction.date BETWEEN :startDate AND :endDate',
            {
              startDate: filters.startDate,
              endDate: filters.endDate,
            },
          );
        } else if (filters.startDate) {
          queryBuilder.andWhere('transaction.date >= :startDate', {
            startDate: filters.startDate,
          });
        } else if (filters.endDate) {
          queryBuilder.andWhere('transaction.date <= :endDate', {
            endDate: filters.endDate,
          });
        }
      }
      queryBuilder.orderBy('transaction.date', 'DESC');

      const results = await queryBuilder.getManyAndCount();
      return { results: results[0], totalCount: results[1] };
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async findOne(id: string) {
    try {
      const transaction = await this.transactionRepository.findOne({
        select: ['id', 'narration', 'referenceNo'],
        where: { id },
        relations: ['entries', 'entries.account'],
      });
      if (!transaction)
        throw new HttpException('No Such transaction', HttpStatus.NOT_FOUND);

      return transaction;
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
