import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "../src/app.module";
import { User } from "../src/auth/user.entity";
import * as request from "supertest";
import * as bcrypt from "bcryptjs";


describe('AuthController (e2e)', () => {
    let app: INestApplication; 

    // Mock User Repository
    // const mockUserRepository = {
    //     create: jest.fn(),
    //     save: jest.fn(),
    //     findOne: jest.fn()
    // };

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
        // .overrideProvider(getRepositoryToken(User))
        // .useValue(mockUserRepository)   
        .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        // mockUserRepository.create.mockImplementation((dto) => dto);
    });

    // beforeEach(() => {
    //     // Reset mocks before each test
    //     mockUserRepository.createUser.mockReset();
    //     mockUserRepository.findOne.mockReset();
    // });

    afterAll(async () => {
        if (app) {
            await app.close();
        } 
    });


    describe('/auth/signup (POST)', () => {
        it('should sign up a user successfully', async () => {
            // mockUserRepository.create.mockImplementation((dto) => dto);

            return request(app.getHttpServer())
                .post('/auth/signup')
                .send({ 
                    username: 'testuser',
                    password: 'testpassword'
                })
                .expect(201);
        });

        it('should return validation error for invalid data', async () => {
            return request(app.getHttpServer())
                .post('/auth/signup')
                .send({
                    username: "",
                    password: "short"
                })
                .expect(400);
        })
    })


    describe('/auth/signin (POST)', () => {
        it('should sign in a user successfully and return accessToken', async () => {
            // const salt = await bcrypt.genSalt();
            // const hashedPassword = await bcrypt.hash('testpassword', salt);
            // const mockUser = {
            //     id: 1, 
            //     username: 'testuser', 
            //     password: hashedPassword
            // };
            // mockUserRepository.findOne.mockResolvedValue(mockUser);

            return request(app.getHttpServer())
                .post('/auth/signin')
                .send({
                    username: 'testuser',
                    password: 'testpassword'
                })
                .expect(201)
                .expect((res) => {
                    expect(res.body).toHaveProperty('accessToken');
                });
        });

        it('should return 401 for invalid credentials', async () => {
            // mockUserRepository.findOne.mockResolvedValue(null);

            return request(app.getHttpServer())
                .post('/auth/signin')
                .send({
                    username: 'wronguser',
                    password: 'wrongpassword'
                })
                .expect(401);
        });

    });
});