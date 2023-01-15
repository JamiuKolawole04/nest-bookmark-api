// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as pactum from 'pactum';

import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { PrismaModule } from '../src/prisma/prisma.module';
import { EditUserDto } from '../src/user/dto';
import { createBookmarkDto } from 'src/bookmark/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        PrismaModule,
      ],
      providers: [ConfigService, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(4001);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:4001');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'jakko4real@gmail.com',
      password: '1234567890',
    };

    describe('Signup', () => {
      it('should throw exception if email is empty', () => {
        return pactum
          .spec()
          .post('/api/v1/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw exception if password is empty', () => {
        return pactum
          .spec()
          .post('/api/v1/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw exception if no body is provided', () => {
        return pactum.spec().post('/api/v1/auth/signup').expectStatus(400);
      });
      it('should sign up', () => {
        return pactum
          .spec()
          .post('/api/v1/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw exception if email is empty', () => {
        return pactum
          .spec()
          .post('/api/v1/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw exception if password is empty', () => {
        return pactum
          .spec()
          .post('/api/v1/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw exception if no body is provided', () => {
        return pactum.spec().post('/api/v1/auth/signup').expectStatus(400);
      });
      it('should sign in', () => {
        return pactum
          .spec()
          .post('/api/v1/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/api/v1/user')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      const dto: EditUserDto = {
        firstName: 'Vladimir',
        email: 'jay@gmail.com',
      };
      describe('Get me', () => {
        it('should edit user', () => {
          return pactum
            .spec()
            .patch('/api/v1/user')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .withBody(dto)
            .expectStatus(200)
            .expectBodyContains(dto.firstName)
            .expectBodyContains(dto.email);
        });
      });
    });
  });

  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => {
      it('should get  bookmarks', () => {
        return pactum
          .spec()
          .get('/api/v1/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create bookmark', () => {
      const dto: createBookmarkDto = {
        title: 'React Moonflix tutoorial Part2',
        link: 'https://www.youtube.com/watch?v=Q_uLi4f27Lc',
        description: 'React moonflix app part2',
      };
      it('should create a bookmark', () => {
        return pactum
          .spec()
          .post('/api/v1/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Get bookmarks', () => {
      it('should get  bookmarks', () => {
        return pactum
          .spec()
          .get('/api/v1/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Get bookmark by id', () => {});

    describe('Edit bookmark by id', () => {});

    describe('Delete bookmark by id', () => {});
  });
});
