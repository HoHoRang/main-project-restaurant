# Main-Project : 맛집 공유 사이트

#### by 김지웅

<br>

> 갔었던 맛집! 가고싶은 맛집! 또는 어디로 갈지 모를 때 사람들과 맛집에 대해 공유해보세요.

<br>

## 1. 프로젝트 설명

많은 사람들은 맛집에 가서, 맛있는 음식을 먹습니다.  
그런데, 모든 사람들이 이 땅에 존재하는 모든 맛집을 알고 있을까요?  
아뇨 모를 수 밖에 없습니다. 그럼 어떡하나요? 네이버에서 검색하나요?  
근데 블로거들이 쓴 믿을 수 없는 식당이면 어떡하죠?

그런 사람들을 위해 만들어진 사이트입니다.

```
- 가봤어요: 내가 가봤던 맛집에 대해 공유해주세요! 많은 사람들의 좋아요, 댓글로 내가 가고 싶은 곳을 확인해보세요.
```

```
- 가주세요: 내가 가고 싶었던 맛집에 대해 알려주세요! 사람들이 대신 가줄지도 모릅니다.
```

```
- 추천좀요: 이 근처에는 맛집이 뭐가 있을까? 로컬 사람의 로컬 맛집 소개가 기대되네요.
```

```
- 팔로우: 아 이 사람은 맛집 도사다. 이 사람이라면 믿을 수 있다 라는 생각이 들면 팔로우하세요.
```

<br>

## 2. 배포 주소

```
https://hohorang.shop/graphql (백엔드 서버에요. 비용이 나가서 지금은 내렸지만, 필요하다면 다시 열겠습니다!)
```

<br>

## 3. 기술 스택

### NestJS

<a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="400"/></a>

### GraphQL API

<img src="https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=GraphQL&logoColor=white"/>

<a href="https://graphql.org/" target="blank"><img src="https://user-images.githubusercontent.com/15374108/167302286-435d57b0-a9f0-490e-88f0-4b202d22f34d.png" width="400"/></a>

### Elastic Search

<a href="https://www.elastic.co/kr/elasticsearch/" target="blank"><img src="https://user-images.githubusercontent.com/15374108/167302395-7f8d24ea-8175-46fe-ac45-dabef3453dc4.png" width="400"/></a>

### Logstash

<a href="https://www.elastic.co/kr/logstash/" target="blank"><img src="https://user-images.githubusercontent.com/15374108/167302434-92e69fa0-5b9a-4b46-b83b-3007c6524d88.png" width="400"/></a>

### Redis

<a href="https://redis.io/" target="blank"><img src="https://user-images.githubusercontent.com/15374108/167302473-46d0af1e-0265-4011-b4b0-68d28f65b0ab.png" width="400"/></a>

### Iamport

<a href="https://www.iamport.kr/" target="blank"><img src="https://user-images.githubusercontent.com/15374108/167302516-1c41e77a-f58f-4c49-85ea-2a8f8569355a.png" width="400"/></a>

### Social Login(Google, Naver, Kakao using passport)

<a href="https://google.com" target="blank"><img src="https://user-images.githubusercontent.com/15374108/167302576-b3014c77-1a32-4dec-8a75-eb8c7d7b8971.png" width="400"/></a>

### Google Cloud Platform - Cloud Storage(파일, 이미지 업로드)

![image](https://user-images.githubusercontent.com/15374108/167303475-435a6ed0-8b4f-4a34-814a-a7c3b71f1277.png)

<br>

## 4. ERD 설계

![ERD](https://user-images.githubusercontent.com/15374108/167302697-ea01b7c5-4221-43d0-aa1e-1928896a7795.png)

<br>

## 5. 전체적인 파이프라인 그림

<img width="1313" alt="main-project pipeline" src="https://user-images.githubusercontent.com/15374108/167301148-f7605bc0-083a-4f92-8769-f3d137c2f49c.png">

<br>

## 6. API 설계

![image](https://user-images.githubusercontent.com/15374108/167303585-f6a7d243-af34-4149-af7c-5fb78ec2c9d7.png)

### - 각 Entity RDBMS 관계 설정하여 TypeORM, GraphQL 이용하여 구현

<br>

![image](https://user-images.githubusercontent.com/15374108/167303615-cb2b04d5-6eb9-4dfb-8b28-1d8352c728e3.png)

### - Resolver 단에서 Service 의존성 주입 및 GrapqhQL 데이터 형식으로 매개변수 받아 처리 및 반환

<br>

![image](https://user-images.githubusercontent.com/15374108/167303640-e434706d-7a51-4597-9f42-94212c277071.png)

### - Service 단에서 필요 Repository 주입 받아 DB 작업 및 로직 수행

<br>

## 7. 프로젝트 설치 방법 & 실행 방법

`main-project/backend/`에서

```
yarn install # 모듈 설치

yarn start:dev # 백엔드 서버 실행
```

<br>

## 8. 폴더 구조

![1](https://user-images.githubusercontent.com/15374108/167302984-70de4908-d1fd-4543-a52c-c89305c91376.png)

- **backend**

  - **elk**  
    Elastic Search, Kibana, Logstash의 ELK Stack 설정 포함
  - **src**  
    각종 Entity 및 Entity 별 API 구현, 그리고 인증(auth)과 결제(iamport) API 구현
  - **commons**  
    인증(auth) - access, refresh token strategy 구현 및 소셜 로그인 strategy 구현

![2](https://user-images.githubusercontent.com/15374108/167302988-17776bae-2e71-42ed-921d-ab24d0f60082.png)

- **backend**

  - .env, docker-compose.yaml, Dockerfile, package.json 등 설정 파일

- **docs**  
  ERD, Pipeline 등 관련문서

- **frontend**  
  Frontend 소스

<br>

## 9. .env 설정

![image](https://user-images.githubusercontent.com/15374108/167303352-0fa96a7b-66e4-4713-9d97-079414473824.png)

- SMS, Mail 전송에 필요한 App Key 및 Secret Key 관리
- Google, Naver, Kakao 등 소셜 로그인에 필요한 Key 관리
- Iamport 결제 API 이용을 위한 Key 관리
- 파일(이미지) 업로드 기능을 위한 GCP Key 관리
