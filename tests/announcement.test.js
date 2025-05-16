import request from 'supertest';
import app from '../app.js';
import Announcement from '../models/Announcement.js';

describe('Announcement API', () => {
    let authCookie;

    beforeAll(async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({});

        authCookie = res.headers['set-cookie'];
    });

    afterAll(async () => {
        await Announcement.deleteMany({});
    });

    describe('GET /api/announcements', () => {
        it('should fetch all announcements', async () => {
            await Announcement.create({
                title: 'Test Announcement',
                author: 'Test Author',
                course: 'Test Course',
                content: 'Test Content',
            });

            const res = await request(app).get('/api/announcements');

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.length).toBe(1);
            expect(res.body.data[0].title).toBe('Test Announcement');
        });
    });

    describe('POST /api/announcements', () => {
        it('should create a new announcement with valid data', async () => {
            const res = await request(app)
                .post('/api/announcements')
                .set('Cookie', authCookie)
                .send({
                    title: 'New Announcement',
                    author: 'New Author',
                    course: 'New Course',
                    content: 'This is a new announcement content',
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.title).toBe('New Announcement');
        });

        it('should return 400 with invalid data', async () => {
            const res = await request(app)
                .post('/api/announcements')
                .set('Cookie', authCookie)
                .send({
                    title: 'A', // Too short
                    author: 'B', // Too short
                    course: '', // Empty
                    content: 'Short', // Too short
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toContain('Title must be at least 3 characters');
        });

        it('should return 401 when not authenticated', async () => {
            const res = await request(app)
                .post('/api/announcements')
                .send({
                    title: 'Unauthorized',
                    author: 'Test',
                    course: 'Test',
                    content: 'This should fail',
                });

            expect(res.statusCode).toEqual(401);
        });
    });
});