import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from './configs/typeorm.config';
import { AccountsModule } from './modules/accounts/accounts.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
// import { JwtModule, JwtService } from '@nestjs/jwt';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthenticationGuard } from './guards/authentication.guards';

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPEORM_CONFIG),
    AccountsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [
    // JwtService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthenticationGuard,
    // },
  ],
})
export class AppModule {}
