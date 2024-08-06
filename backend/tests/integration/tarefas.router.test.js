// tests/integration/tarefas.router.test.js
const request = require('supertest');
const express = require('express');
const tarefasRouter = require('../../tarefas/tarefas.router');
const app = express();

app.use(express.json());
app.use('/tarefas', tarefasRouter);

describe('Tarefas Router', () => {
    test('should create a new task', async () => {
        const newTask = { title: 'Test Task', description: 'Test Description' };

        const response = await request(app)
            .post('/tarefas')
            .send(newTask)
            .expect(201);

        expect(response.body).toEqual(expect.objectContaining(newTask));
    }, 20000); // Aumenta o tempo limite para 20 segundos

    test('should read all tasks', async () => {
        const response = await request(app)
            .get('/tarefas')
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
    }, 20000); // Aumenta o tempo limite para 20 segundos
});
