const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const app = require("../app");
const { User } = require("../models/user");

const PORT = process.env.PORT || 3000;
const TEST_DB_HOST = process.env.TEST_DB_HOST;

describe("login controller unit test", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(TEST_DB_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  it("status 200, token and user object with email", async () => {
    const newUser = {
      email: "test@mail.com",
      password: "Test123456",
    };

    const { _id } = await User.create({
      ...newUser,
      name: "Test",
      password: await bcrypt.hash(newUser.password, 10),
    });

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;
    const { token, email, name } = await User.findById(_id);

    expect(response.statusCode).toBe(200);
    expect(body.token).toBeDefined();
    expect(body.token).toBe(token);
    expect(body.user).toBeDefined();
    expect(body.user).toEqual(
      expect.objectContaining({
        email,
        name,
      })
    );
  });

  it("empty user, status 400, '\"email\" is required'", async () => {
    const newUser = {};

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"email" is required');
  });

  it("no password, status 400, '\"password\" is required'", async () => {
    const newUser = {
      email: "test@mail.com",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"password" is required');
  });

  it("no email, status 400, '\"email\" is required'", async () => {
    const newUser = {
      password: "Test123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"email" is required');
  });

  it("extra field, status 400, '\"extra\" is not allowed'", async () => {
    const newUser = {
      email: "test@mail.com",
      password: "Test123456",
      extra: 123,
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"extra" is not allowed');
  });

  it("invalid email 123 , status 400, '\"email\" must be a string'", async () => {
    const newUser = {
      email: 123,
      password: "Test123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"email" must be a string');
  });

  it("invalid email false , status 400, '\"email\" must be a string'", async () => {
    const newUser = {
      email: false,
      password: "Test123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"email" must be a string');
  });

  it("invalid email {} , status 400, '\"email\" must be a string'", async () => {
    const newUser = {
      email: {},
      password: "Test123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"email" must be a string');
  });

  it("invalid email [] , status 400, '\"email\" must be a string'", async () => {
    const newUser = {
      email: [],
      password: "Test123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"email" must be a string');
  });

  it("invalid password 123456 , status 400, '\"password\" must be a string'", async () => {
    const newUser = {
      email: "test@mail.com",
      password: 123456,
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"password" must be a string');
  });

  it("invalid password false , status 400, '\"password\" must be a string'", async () => {
    const newUser = {
      email: "test@mail.com",
      password: false,
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"password" must be a string');
  });

  it('invalid password {} , status 400, \'"password" must be a string', async () => {
    const newUser = {
      email: "test@mail.com",
      password: {},
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"password" must be a string');
  });

  it('invalid password [] , status 400, \'"password" must be a string', async () => {
    const newUser = {
      email: "test@mail.com",
      password: [],
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"password" must be a string');
  });

  it("no such email in base, status 401, Email or password is wrong", async () => {
    const newUser = {
      email: "test@mail.com",
      password: "Test123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;
    expect(response.statusCode).toBe(401);
    expect(body.message).toBe("Email or password is wrong");
  });

  it("wrong password, status 401, Email or password is wrong", async () => {
    const newUser = {
      email: "test@mail.com",
      password: "Test123456",
    };
    await User.create({ ...newUser, name: "Test" });

    const wrongUser = {
      ...newUser,
      password: "Test1234567",
    };
    const response = await request(app)
      .post("/api/users/login")
      .send(wrongUser);
    const { body } = response;
    expect(response.statusCode).toBe(401);
    expect(body.message).toBe("Email or password is wrong");
  });
});
