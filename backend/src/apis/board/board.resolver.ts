import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  // @Query(() => [Board])
  // fetchBoards() {
  //   return this.boardService.findAll();
  // }

  // @Query(() => [Board])
  // fetchBoardsWithDeleted() {
  //   return this.boardService.findAllWithDeleted();
  // }

  // @Query(() => Board)
  // async fetchBoard(@Args('boardId') boardId: string) {
  //   await this.boardService.checkExist({ boardId });

  //   return await this.boardService.findOne({ boardId });
  // }

  // @Mutation(() => Board)
  // createBoard(
  //   @Args('createBoardInput') createBoardInput: CreateBoardInput, //
  // ) {
  //   return this.boardService.create({ createBoardInput });
  // }

  // @Mutation(() => Board)
  // async updateBoard(
  //   @Args('boardId') boardId: string,
  //   @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
  // ) {
  //   // 존재하는지 확인
  //   await this.boardService.checkExist({ boardId });
  //   // 수정하기
  //   return await this.boardService.update({
  //     boardId,
  //     updateBoardInput,
  //   });
  // }

  // @Mutation(() => Boolean)
  // async deleteBoard(
  //   @Args('boardId') boardId: string, //
  // ) {
  //   return await this.boardService.delete({ boardId });
  // }

  // @Mutation(() => Boolean)
  // async restoreBoard(
  //   @Args('boardId') boardId: string, //
  // ) {
  //   return await this.boardService.restore({ boardId });
  // }
}
