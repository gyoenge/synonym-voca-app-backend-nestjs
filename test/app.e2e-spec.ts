import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { AuthCredentialDto } from "src/auth/dto/auth-credential.dto";
import { CollectionStatus } from "src/collection/collection-status.enum";
import { CreateCollectionDto } from "src/collection/dto/create-collection.dto";
import { CreateWordDto } from "src/word/dto/create-word.dto";
import * as request from "supertest";


describe('App (E2E)', () => {
    let app: INestApplication;

    let accessToken: string; 
    let userId: number;
    let collectionId: number; 
    let wordId: number; 

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        if (app) {
            await app.close();
        };
    });

    // auth mock data
    const authDto: AuthCredentialDto = {
        username: 'testuser1',
        password: 'testpassword',
    };

    // mock 
    describe('auth sign up & in', () => {
        it('should sign up a user ', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signup')
                .send(authDto)
                .expect(201);
        });

        it('should sign in a user & return an access token', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signin')
                .send(authDto)
                .expect(201);

            accessToken = response.body.accessToken;
            expect(accessToken).toBeDefined();
        });
    });

    describe('create collection & word', () => {
        it('should create a collection', async () => {
            const createCollectionDto: CreateCollectionDto = {
                title: 'Test Collection',
                description: 'A collection for testing'
            };

            const response = await request(app.getHttpServer())
                .post('/collection')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(createCollectionDto)
                .expect(201);

            collectionId = response.body.collection_id;
            expect(collectionId).toBeDefined();
        });

        it('should create a word & associate it with a collection', async () => {
            const createWordDto: CreateWordDto = {
                word: 'hello', 
                meaning: 'greating', 
                example: 'Hello, world!',
                collection_ids: [collectionId]
            };

            const response = await request(app.getHttpServer())
                .post('/word')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(createWordDto)
                .expect(201);

            wordId = response.body.word_id;
            expect(wordId).toBeDefined();
        });
    });

    describe('get colleciton & word', () => {
        it('should get the created collection', async () => {
            const response = await request(app.getHttpServer())
                .get(`/collection/${collectionId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);

            expect(response.body.collection_id).toBe(collectionId);
            console.log(response.body);
        })

        it('should get the created word', async () => {
            const response = await request(app.getHttpServer())
                .get(`/word/${wordId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
    
            expect(response.body.word_id).toBe(wordId);
            console.log(response.body);
        });
    })

    ////////////////////////////////////////////////////////////////////////////

    

});