const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();
const app = require("../app");
const { User } = require("../models/usersModel");

const PORT = process.env.PORT || 3000;
const TEST_DB_HOST = process.env.TEST_DB_HOST;

describe("signup controller unit test", () => {
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

  it("status 201, token and user object with email", async () => {
    const newUser = {
      name: "test",
      email: "test@mail.com",
      password: "123456",
    };

    const { _id } = await User.create(newUser);

    const response = await request(app).post("/api/users/signup").send(newUser);
    const { body } = response;
    const { token, email } = await User.findById(_id);

    expect(response.statusCode).toBe(201);
    expect(body.token).toBeDefined();
    expect(body.token).toBe(token);
    expect(body.user).toBeDefined();
    expect(body.user).toEqual(
      expect.objectContaining({
        email,
      })
    );
  });
});
