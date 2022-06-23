import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { SubscribeTransactionService } from './subscribeTransaction.service';
import { IamportService } from '../iamport/iamport.service';
import { SubscribeTransaction } from './entities/subscribeTransaction.entity';

@Resolver()
export class SubscribeTransactionResolver {
  constructor(
    private readonly subscribeTransactionService: SubscribeTransactionService,
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => SubscribeTransaction)
  async createSubscribeTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @Args('productId') productId: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // iamport에 accessToken 요청
    const importAccessToken = await this.iamportService.getImportAccessToken();

    // accessToken과 함께 impUid가 유효한지 확인
    await this.iamportService.checkAvailableImpUid({
      impUid,
      importAccessToken,
    });

    // 결제 테이블에 추가된 건인지 확인
    await this.subscribeTransactionService.checkExist({ impUid });

    return this.subscribeTransactionService.create({
      impUid,
      amount,
      productId,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => SubscribeTransaction)
  async cancelSubscribeTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 해당 impUid로 결제된 이력이 있는지, 취소금액이 다른지 확인(없거나 다르면 Unprocessable 에러 반환)
    const paymentInfo =
      await this.subscribeTransactionService.checkPaymentExist({
        impUid,
        amount,
      });

    const productId = paymentInfo.product.id;

    // 해당 impUid로 취소된 이력이 있는지 확인(이미 취소되었으면 Unprocessable 에러 반환)
    await this.subscribeTransactionService.checkCancelExist({ impUid });

    // 토큰 받기
    const importAccessToken = await this.iamportService.getImportAccessToken();

    // accessToken과 함께 impUid가 유효한지 확인
    await this.iamportService.checkAvailableImpUid({
      impUid,
      importAccessToken,
    });

    // 토큰과 impUid로 취소 요청
    const cancelResult = await this.iamportService.cancelPayment({
      impUid,
      importAccessToken,
    });

    if (cancelResult) {
      // import에 취소요청 완료되면, 취소로 데이터 생성
      return await this.subscribeTransactionService.createCancel({
        impUid,
        amount,
        productId,
        currentUser,
      });
    }
  }
}
