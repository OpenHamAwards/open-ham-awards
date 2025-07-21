import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { UsersModule } from '../src/users/users.module';
import { registerGlobalPipes } from '../src/main';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    registerGlobalPipes(app);
    await app.init();
  });

  describe('/users/register (POST)', () => {
    it('registers a user', () => {
      return request(app.getHttpServer())
        .post('/users/register')
        .send({
          email: 'john@doe.io',
          password: 'secret',
          fullName: 'John Doe',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('email', 'john@doe.io');
          expect(res.body).toHaveProperty('fullName', 'John Doe');
          expect(res.body).not.toHaveProperty('password');
        });
    });

    it('fails to register a user with an invalid email', () => {
      return request(app.getHttpServer())
        .post('/users/register')
        .send({
          email: 'invalid-email',
          password: 'secret',
          fullName: 'John Doe',
        })
        .expect(400);
    });

    it('fails to register a user when missing required fields', () => {
      return request(app.getHttpServer())
        .post('/users/register')
        .send({ email: 'john@doe.io' })
        .expect(400);
    });
  });
});
