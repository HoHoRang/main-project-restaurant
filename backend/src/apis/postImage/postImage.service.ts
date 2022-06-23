import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { PostImage } from './entities/postImage.entity';
@Injectable()
export class PostImageService {
  constructor(
    @InjectRepository(PostImage)
    private readonly postImageRepository: Repository<PostImage>,

    private readonly connection: Connection,
  ) {}

  async create({ postId, urls }) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    // Transaction 시작!!
    // await queryRunner.startTransaction('SERIALIZABLE');

    try {
      // ================= 1번 로직 =================
      // 1. 상품 ID로 저장된 이미지를 전부 삭제
      await queryRunner.manager.delete(PostImage, {
        post: {
          id: postId,
        },
      });
      // 2. url들로 새로운 이미지 데이터들 생성
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];

        const postImage = this.postImageRepository.create({
          url: url,
          post: {
            id: postId,
          },
        });

        await queryRunner.manager.save(postImage);
      }

      // ================= 1번 로직 =================

      // url 전부 저장 후, commit 성공 확정!!
      // await queryRunner.commitTransaction();

      // 3. 최종결과 프론트엔드에 돌려주기
      return true;
    } catch (error) {
      // Rollback 되돌리기!!
      console.log(error);
      // await queryRunner.rollbackTransaction();
      return false;
    } finally {
      // 연결 해제!!
      await queryRunner.release();
    }
  }

  async update({ postId, urls }) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    // Transaction 시작!!
    // await queryRunner.startTransaction('SERIALIZABLE');

    try {
      // ================= 2번 로직 =================
      // 1. 상품 ID로 저장된 이미지를 전부 불러옴
      const prevUrls = await queryRunner.manager.find(PostImage, {
        post: {
          id: postId,
        },
      });

      const storedUrls = prevUrls.map((el) => {
        return el.url;
      });

      // 2. 이미 있는 이미지인지 url과 비교하여 체크

      // 3. 기존에 없는 이미지면 데이터 생성
      for (let i = 0; i < urls.length; i++) {
        if (!storedUrls.includes(urls[i])) {
          const url = urls[i];

          const postImage = this.postImageRepository.create({
            url: url,
            post: {
              id: postId,
            },
          });

          await queryRunner.manager.save(postImage);
        }
      }

      // 4. 해당 안되는 이미지는 삭제
      for (let i = 0; i < prevUrls.length; i++) {
        if (!urls.includes(storedUrls[i])) {
          const url = storedUrls[i];

          await queryRunner.manager.delete(PostImage, {
            url: url,
            post: {
              id: postId,
            },
          });
        }
      }
      // ================= 2번 로직 =================

      // url 전부 저장 후, commit 성공 확정!!
      // await queryRunner.commitTransaction();

      // 3. 최종결과 프론트엔드에 돌려주기
      return true;
    } catch (error) {
      // Rollback 되돌리기!!
      console.log(error);
      // await queryRunner.rollbackTransaction();
      return false;
    } finally {
      // 연결 해제!!
      await queryRunner.release();
    }
  }
}
