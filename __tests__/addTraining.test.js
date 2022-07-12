const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();
const app = require("../app");
const { User } = require("../models/user");
const { Book } = require("../models/book");
const { Training } = require("../models/training");

const PORT = process.env.PORT || 3000;
const TEST_DB_HOST = process.env.TEST_DB_HOST;

describe("add Training route test", () => {
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

  it("status 201, training object", async () => {
    const testUser = {
      name: "test user",
      email: "test@mail.com",
      password: "test123456",
    };
    const { _id: userId } = User.create(testUser);

    const testBook1 = {
      title: "Book1",
      author: "Book1 author",
      year: 2022,
      pages: 50,
      status: "goingToRead",
      rating: 0,
      resume: "",
      owner: userId,
    };
    const testBook2 = {
      title: "Book2",
      author: "Book2 author",
      year: 2021,
      pages: 500,
      status: "goingToRead",
      rating: 0,
      resume: "",
      owner: userId,
    };

    const { _id: testBook1Id } = await Book.create(testBook1);
    const { _id: testBook2Id } = await Book.create(testBook2);

    const newTraining = {
      start: new Date(),
      end: new Date(Date.now() + 1000 * 60 * 60 * 24),
      books: [testBook1Id, testBook2Id],
    };

    const { _id } = await Training.create(newTraining);

    const response = await request(app)
      .post("/api/trainings")
      .send(newTraining);
    const { body } = response;
    const { start, end, books } = await Training.findById(_id);
    const booksStrings = books.map((book) => book.toString());

    expect(response.statusCode).toBe(201);
    expect(body.start).toBeDefined();
    expect(new Date(body.start)).toEqual(start);
    expect(body.end).toBeDefined();
    expect(new Date(body.end)).toEqual(end);
    expect(body.books).toEqual(booksStrings);
  });
});
