import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {
  CreateTransactionDto,
  TransactionFilterDto,
} from './dto/create-transaction.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseFormat } from 'src/decorators/response.decorator';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    example: {
      isSuccess: true,
      error: '',
      data: {},
    },
  })
  @ResponseFormat()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    example: {
      isSuccess: true,
      error: '',
      data: {},
    },
  })
  @ResponseFormat()
  findAll(@Query() filters: TransactionFilterDto) {
    return this.transactionsService.findAll(filters);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    example: {
      isSuccess: true,
      error: '',
      data: {},
    },
  })
  @ResponseFormat()
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }
}
