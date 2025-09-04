import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { dbName: "jest" });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("Auth E2E - Login", () => {
    beforeEach(async () => {
        // clear DB before each test
        await User.deleteMany({});
    });

    it("should login successfully with correct credentials", async () => {
        // Arrange: create a test user
        const passwordHash = await bcrypt.hash("123456", 10);
        await User.create({
            name: "John Doe",
            email: "john@example.com",
            password: passwordHash,
        });

        // Act: send login request
        const res = await request(app)
            .post("/api/user/login")
            .send({
                email: "john@example.com",
                password: "123456",
            });

        // Assert
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Login Successfully");
        expect(res.headers["set-cookie"]).toBeDefined(); // JWT cookie is set
    });

    it("should fail with wrong password", async () => {
        const passwordHash = await bcrypt.hash("123456", 10);
        await User.create({
            name: "John Doe",
            email: "john@example.com",
            password: passwordHash,
        });

        const res = await request(app)
            .post("/api/user/login")
            .send({
                email: "john@example.com",
                password: "wrongpass",
            });

        expect(res.body.status).toBe(404);
        expect(res.body.message).toBe("Invalid Credentials");
    });

    it("should fail with non-existing user", async () => {
        const res = await request(app)
            .post("/api/user/login")
            .send({
                email: "nouser@example.com",
                password: "123456",
            });

        expect(res.body.status).toBe(404);
        expect(res.body.message).toBe("Invalid Credentials");
    });
});
