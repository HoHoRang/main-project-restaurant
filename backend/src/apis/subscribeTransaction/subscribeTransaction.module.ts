import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Owner } from '../owner/entities/owner.entity';
import { SubscribeTransaction } from './entities/subscribeTransaction.entity';
import { SubscribeTransactionResolver } from './subscribeTransaction.resolver';
import { SubscribeTransactionService } from './subscribeTransaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubscribeTransaction, //
      Owner,
    ]),
  ],
  providers: [
    SubscribeTransactionResolver, //
    SubscribeTransactionService,
    IamportService,
  ],
})
export class SubscribeTransactionModule {}
