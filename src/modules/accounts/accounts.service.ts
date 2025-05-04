import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
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
      const pageToUpdate = await this.accountRepository.findOne({
        where: { id },
      });
      if (!pageToUpdate)
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
}
