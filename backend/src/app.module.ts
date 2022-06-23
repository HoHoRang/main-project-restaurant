import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { OwnerAuthModule } from './apis/auth/owner.auth.module';
import { BoardModule } from './apis/board/board.module';
import { FileModule } from './apis/file/file.module';
import { FoodTypeModule } from './apis/foodType/foodType.module';
import { OwnerModule } from './apis/owner/owner.module';
import { PostModule } from './apis/post/post.module';
import { PostImageModule } from './apis/postImage/postImage.module';
import { ProductModule } from './apis/product/product.module';
import { StoreModule } from './apis/store/store.module';
import { SubscribeTransactionModule } from './apis/subscribeTransaction/subscribeTransaction.module';
import { UserModule } from './apis/user/user.module';
import { UserGradeModule } from './apis/userGrade/userGrade.module';
import { ConfigModule } from '@nestjs/config';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    AuthModule,
    BoardModule,
    FileModule,
    FoodTypeModule,
    OwnerModule,
    OwnerAuthModule,
    PostModule,
    PostImageModule,
    ProductModule,
    StoreModule,
    SubscribeTransactionModule,
    UserModule,
    UserGradeModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my-database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mydocker02',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
