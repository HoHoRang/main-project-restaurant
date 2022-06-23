import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async findAll() {
    return await this.boardRepository.find();
  }

  async findAllWithDeleted() {
    return await this.boardRepository.find({ withDeleted: true });
  }

  async findOne({ boardId }) {
    return await this.boardRepository.findOne({ where: { id: boardId } });
  }

  async create({ createBoardInput }) {
    const result = await this.boardRepository.save({
      ...createBoardInput,
    });

    return result;
  }

  async update({ boardId, updateBoardInput }) {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    const newBoard = {
      ...board,
      ...updateBoardInput,
    };

    return await this.boardRepository.save(newBoard);
  }

  async checkExist({ boardId }) {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });
    if (!board)
      throw new UnprocessableEntityException('존재하지 않는 게시판입니다.');
  }

  async delete({ boardId }) {
    const result = await this.boardRepository.softDelete({ id: boardId });
    return result.affected ? true : false;
  }

  async restore({ boardId }) {
    const result = await this.boardRepository.restore({ id: boardId });
    return result.affected ? true : false;
  }
}
