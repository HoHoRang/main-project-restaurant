import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class IamportService {
  // iamport에 accessToken 요청 API 호출
  async getImportAccessToken() {
    const importApiKey = process.env.IMPORT_API_KEY;
    const importApiSecret = process.env.IMPORT_API_SECRET;

    const importAccessTokenResult = await axios.post(
      `https://api.iamport.kr/users/getToken`,
      {
        imp_key: importApiKey, // REST API키
        imp_secret: importApiSecret, // REST API Secret
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return importAccessTokenResult.data.response.access_token;
  }

  // iamport에 accessToken과 함께 impUid가 유효한지 확인 API 호출
  async checkAvailableImpUid({ impUid, importAccessToken }) {
    await axios
      .get(`https://api.iamport.kr/payments/${impUid}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${importAccessToken}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log('iamport 토큰이 유효하지 않습니다!');
          throw new UnprocessableEntityException(
            'iamport 토큰이 유효하지 않습니다!',
          );
        } else if (error.response.status === 404) {
          console.log('impUid가 유효하지 않습니다!');
          throw new UnprocessableEntityException('impUid가 유효하지 않습니다!');
        }
      });
    return true;
  }

  async cancelPayment({ impUid, importAccessToken }) {
    await axios
      .post(
        `https://api.iamport.kr/payments/cancel`,
        {
          imp_uid: impUid,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${importAccessToken}`,
          },
        },
      )
      .catch((error) => {
        if (error.response.status === 401) {
          console.log('iamport 토큰이 유효하지 않습니다!');
          throw new UnprocessableEntityException(
            'iamport 토큰이 유효하지 않습니다!',
          );
        }
      });
    return true;
  }
}
