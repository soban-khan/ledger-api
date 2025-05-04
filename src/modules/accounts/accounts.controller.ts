import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseFormat } from 'src/decorators/response.decorator';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

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
  create(@Body() createAccountDto: CreateAccountDto): object {
    return this.accountsService.create(createAccountDto);
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
  findAll(): Promise<{ results: Array<object>; totalCount: number }> {
    return this.accountsService.findAll();
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
  findOne(@Param('id', ParseUUIDPipe) id: string): object {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  @ResponseFormat()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): object {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @ResponseFormat()
  remove(@Param('id', ParseUUIDPipe) id: string): object {
    return this.accountsService.remove(id);
  }

  @Get(':id/balance')
  @ApiResponse({
    status: 200,
    example: {
      isSuccess: true,
      error: '',
      data: {},
    },
  })
  @ResponseFormat()
  getBalance(@Param('id') id: string) {
    return this.accountsService.getBalance(id);
  }
}
