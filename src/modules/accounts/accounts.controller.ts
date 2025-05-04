import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiResponse } from '@nestjs/swagger';

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
  @ApiResponse({
    status: '5XX',
    example: {
      isSuccess: false,
      error: 'error_message (server failed to process request)',
      data: {},
    },
  })
  @ApiResponse({
    status: '4XX',
    example: {
      isSuccess: false,
      error: 'error_message (issue from client end)',
      data: {},
    },
  })
  create(@Body() createAccountDto: CreateAccountDto): object {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
