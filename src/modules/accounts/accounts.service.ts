import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { Entry } from '../entries/entities/entry.entity';
import { ENTRY_TYPES } from 'src/constants/app.constants';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<object> {
    try {
      await this.accountRepository.save(createAccountDto);

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

  async findAll(): Promise<{ results: Array<object>; totalCount: number }> {
    try {
      const results = await this.accountRepository.findAndCount({
        select: ['id', 'name', 'type'],
        order: {
          id: 'ASC',
        },
      });
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

  async findOne(id: string): Promise<object> {
    try {
      const account = await this.accountRepository.findOne({
        select: ['id', 'name', 'type'],
        where: { id },
      });
      if (!account)
        throw new HttpException('No Such Account', HttpStatus.NOT_FOUND);

      return account;
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

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<object> {
    try {
      const accountToUpdate = await this.accountRepository.findOne({
        where: { id },
      });
      if (!accountToUpdate)
        throw new HttpException('Account Not Exist', HttpStatus.NOT_FOUND);

      await this.accountRepository.update(id, updateAccountDto);
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

  async remove(id: string): Promise<object> {
    try {
      const deletedAccount = await this.accountRepository.delete(id);
      if (!deletedAccount.affected)
        throw new HttpException('No Such Account', HttpStatus.NOT_FOUND);

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

  async getBalance(id: string) {
    const account = await this.findOne(id);
    const entries = await this.entryRepository.find({
      where: { account: { id: id } },
    });

    let balance = 0;
    for (const entry of entries) {
      // debit and credit depend on the account type
      const isDebitPositive = ['ASSET', 'EXPENSE'].includes(entry.type);

      if (entry.type === ENTRY_TYPES.DEBIT) {
        balance += isDebitPositive ? entry.amount : -entry.amount;
      } else {
        balance += isDebitPositive ? -entry.amount : entry.amount;
      }
    }

    const formattedBalance = (balance / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return {
      ...account,
      balance,
      formattedBalance,
    };
  }
}
