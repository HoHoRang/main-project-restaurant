import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  Args,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
} from '@nestjs/graphql';
import { CreatePostInput } from './dto/createPost.input';
import { UpdatePostInput } from './dto/updatePost.input';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import { Cache } from 'cache-manager';

enum SEARCH_TYPE_ENUM {
  TITLE = 'title',
  CONTENTS = 'contents',
}

registerEnumType(SEARCH_TYPE_ENUM, {
  name: 'SEARCH_TYPE_ENUM',
});

@Resolver()
export class PostResolver {
  constructor(
    private readonly postService: PostService, //
    private readonly elasticsearchService: ElasticsearchService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Post])
  async fetchPosts(
    @Args('search') search: string, //
    @Args({ name: 'type', type: () => SEARCH_TYPE_ENUM })
    type: SEARCH_TYPE_ENUM, // title or contents
  ) {
    const resultPosts = [];
    let posts;
    search = search.toLowerCase();

    // 1. Redis에 검색 결과 캐시되어 있는지 확인
    const searchCache = await this.cacheManager.get<[string]>(
      `${search}:${type}`,
    );

    // 2. 있으면 결과[Post] 반환
    if (searchCache) {
      for (let i = 0; i < searchCache.length; i++) {
        // searchCache[i]['board']['createdAt'] =
        //   searchCache[i]['board']['createdAt'] === null
        //     ? null
        //     : new Date(searchCache[i]['board']['createdAt']);
        // searchCache[i]['board']['deletedAt'] = new Date(
        //   searchCache[i]['board']['deletedAt'],
        // );
        // searchCache[i]['store']['createdAt'] = new Date(
        //   searchCache[i]['store']['createdAt'],
        // );
        // searchCache[i]['store']['deletedAt'] = new Date(
        //   searchCache[i]['store']['deletedAt'],
        // );
        // searchCache[i]['foodType']['deletedAt'] = new Date(
        //   searchCache[i]['foodType']['deletedAt'],
        // );
        searchCache[i]['updatedAt'] = new Date(searchCache[i]['updatedAt']);
      }

      console.log('🔴 On Redis:', searchCache);
      return searchCache;
    }

    // 3. 없으면 ElasticSearch 검색
    else {
      console.log('🔴 On Redis: No Data');

      if (type === 'title') {
        posts = await this.elasticsearchService.search({
          index: 'mypost',
          query: {
            bool: {
              should: [{
                  "prefix":{ "title": search} 
                },
                {
                  "prefix":{ "title.keyword": search }
                }
              ]
            }
            // wildcard: {
            //   title: {
            //     value: `*${search}*`,
            //   },
            // },
            //match: { title: search },
          },
        });
      } else {
        posts = await this.elasticsearchService.search({
          index: 'mypost',
          query: {
            bool: {
              should: [{
                  "prefix":{ "contents": search} 
                },
                {
                  "prefix":{ "contents.keyword": search }
                }
              ]
            }
            // wildcard: {
            //   contents: {
            //     value: `*${search}*`,
            //   },
            // },
            //match: { contents: search },
          },
        });
      }

      console.log('🟢 On Elastic Search:', JSON.stringify(posts, null, '  '));

      for (let i = 0; i < posts.hits.hits.length; i++) {
        const post = posts.hits.hits[i]._source;

        //   const board = {
        //     id: post.boardid,
        //     boardName: post.boardname,
        //     createdAt: new Date(post.boardcreatedat),
        //     deletedAt: new Date(post.boarddeletedat),
        //   };

        //   const store = {
        //     id: post.storeid,
        //     storeName: post.storename,
        //     address: post.address,
        //     latitude: post.latitude,
        //     longitude: post.longitude,
        //     category: post.category,
        //     createdAt: new Date(post.storecreatedat),
        //     deletedAt: new Date(post.storedeletedat),
        //     owner: {
        //       id: post.ownerid,
        //     },
        //   };

        //   const foodType = {
        //     id: post.foodtypeid,
        //     typeName: post.foodtypename,
        //     deletedAt: new Date(post.foodtypedeletedat),
        //   };

        //   const user = {
        //     id: post.userid,
        //     name: post.username,
        //     email: post.useremail,
        //     phone: post.userphone,
        //     loginId: post.userloginid,
        //     rrn: post.userrrn,
        //     nickname: post.usernickname,
        //     provider: post.userprovider,
        //     createdAt: new Date(post.usercreatedat),
        //     updatedAt: new Date(post.userupdatedat),
        //     deletedAt: new Date(post.userdeletedat),
        //     userGrade: {
        //       id: post.usergradeid,
        //     },
        //   };

        const createPost = {
          id: post.id,
          title: post.title,
          contents: post.contents,
          likeCount: post.likecount,
          dislikeCount: post.dislikecount,
          hitCount: post.hitcount,
          updatedAt: new Date(post.updatedat * 1000),
        };

        resultPosts.push(createPost);
      }

      // 4. 검색 결과가 있으면 Redis에 저장
      if (resultPosts.length !== 0) {
        console.log('🔴 On Redis: Cache Saved');
        await this.cacheManager.set(`${search}:${type}`, resultPosts, {
          ttl: 20,
        });
      }

      // 5. 조회 결과[Post] 반환
      return resultPosts;
    }
  }

  @Query(() => [Post])
  fetchPostsWithDeleted() {
    return this.postService.findAllWithDeleted();
  }

  @Query(() => Post)
  async fetchPost(@Args('postId') postId: string) {
    await this.postService.checkExist({ postId });

    return await this.postService.findOne({ postId });
  }

  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput, //
  ) {
    return this.postService.create({ createPostInput });
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('postId') postId: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    // 존재하는지 확인
    await this.postService.checkExist({ postId });
    // 수정하기
    return await this.postService.update({
      postId,
      updatePostInput,
    });
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Args('postId') postId: string, //
  ) {
    return await this.postService.delete({ postId });
  }

  @Mutation(() => Boolean)
  async restorePost(
    @Args('postId') postId: string, //
  ) {
    return await this.postService.restore({ postId });
  }
}
