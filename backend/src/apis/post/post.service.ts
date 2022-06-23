import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../tag/entities/tag.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return await this.postRepository.find({
      relations: ['board', 'store', 'foodType', 'user'],
    });
  }

  async findAllWithDeleted() {
    return await this.postRepository.find({
      withDeleted: true,
      relations: ['board', 'store', 'foodType', 'user'],
    });
  }

  async findOne({ postId }) {
    return await this.postRepository.findOne({
      where: { id: postId },
      relations: ['board', 'store', 'foodType', 'user'],
    });
  }

  async create({ createPostInput }) {
    const { boardId, storeId, foodTypeId, userId, tags, ...post } =
      createPostInput;

    const tag = [];

    for (let i = 0; i < tags.length; i++) {
      const tagName = tags[i].replace('#', '');

      const prevTag = await this.tagRepository.findOne({
        where: { tagName },
      });

      if (prevTag) {
        tag.push(prevTag);
      } else {
        const newTag = await this.tagRepository.save({ tagName });
        tag.push(newTag);
      }
    }

    const result = await this.postRepository.save({
      ...post,
      board: { id: boardId },
      store: { id: storeId },
      foodType: { id: foodTypeId },
      user: { id: userId },
      tags: tag,
    });

    return result;
  }

  async update({ postId, updatePostInput }) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });

    const newPost = {
      ...post,
      ...updatePostInput,
    };

    return await this.postRepository.save(newPost);
  }

  async checkExist({ postId }) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });
    if (!post) throw new UnprocessableEntityException('없는 게시글입니다.');
  }

  async delete({ postId }) {
    const result = await this.postRepository.softDelete({ id: postId });
    return result.affected ? true : false;
  }

  async restore({ postId }) {
    const result = await this.postRepository.restore({ id: postId });
    return result.affected ? true : false;
  }
}
