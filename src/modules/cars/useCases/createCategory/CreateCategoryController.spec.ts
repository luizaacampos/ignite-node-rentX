import { app } from '@shared/infra/http/app';
import { hash } from 'bcryptjs';
import request from "supertest";
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import createConnection from '@shared/infra/typeorm';

let connection: Connection
describe("Create category controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driverslicense)
                values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'ABC-123')
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions")
            .send({
                email: 'admin@rentx.com',
                password:  'admin'
            });

            const { refresh_token } = responseToken.body;

        const response = await request(app).post("/categories")
        .send({
            name: "Categort test",
            description: "description test"
        })
        .set({
            Authorization: `Bearer ${refresh_token}`
        });

        expect(response.status).toBe(201);
    });

    it("should not be able to create a new category with an existing name", async () => {
        const responseToken = await request(app).post("/sessions")
            .send({
                email: 'admin@rentx.com',
                password:  'admin'
            });

            const { refresh_token } = responseToken.body;

        const response = await request(app).post("/categories")
        .send({
            name: "Categort test",
            description: "description test"
        })
        .set({
            Authorization: `Bearer ${refresh_token}`
        });

        expect(response.status).toBe(400);
    })
})