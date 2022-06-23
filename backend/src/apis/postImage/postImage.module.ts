import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImage } from './entities/postImage.entity';
import { PostImageResolver } from './postImage.resolver';
import { PostImageService } from './postImage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostImage, //
    ]),
  ],
  providers: [
    PostImageResolver, //
    PostImageService,
  ],
})
export class PostImageModule {}
