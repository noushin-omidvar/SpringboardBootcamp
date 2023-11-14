const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const Message = require("../models/message");
const User = require("../models/user");
const { SECRET_KEY } = require("../config");

describe("Message Routes Test", function () {
  let u1, u2, u1_token, message, message2u1;

  beforeEach(async function () {
    await db.query("DELETE FROM messages");
    await db.query("DELETE FROM users");

    u1 = await User.register({
      username: "test1",
      password: "password",
      first_name: "Test1",
      last_name: "Testy1",
      phone: "+14155550000",
    });

    let response = await request(app)
      .post("/auth/login")
      .send({ username: "test1", password: "password" });

    u1_token = response.body.token;

    u2 = await User.register({
      username: "test2",
      password: "password",
      first_name: "Test2",
      last_name: "Testy2",
      phone: "+14155550001",
    });

    message = await Message.create({
      from_username: u1.username,
      to_username: u2.username,
      body: "Test message",
    });

    message2u1 = await Message.create({
      from_username: u2.username,
      to_username: u1.username,
      body: "Test message 2",
    });
  });

  /** GET /:id - get detail of message */

  describe("GET /messages/:id", function () {
    test("can get message details if authorized", async function () {
      const response = await request(app)
        .get(`/messages/${message.id}`)
        .send({ username: u1.username, _token: u1_token });

      expect(response.body).toEqual({
        message: {
          id: message.id,
          body: "Test message",
          sent_at: expect.any(String),
          read_at: null,
          from_user: {
            username: u1.username,
            first_name: u1.first_name,
            last_name: u1.last_name,
            phone: u1.phone,
          },
          to_user: {
            username: u2.username,
            first_name: u2.first_name,
            last_name: u2.last_name,
            phone: u2.phone,
          },
        },
      });
    });

    test("returns 401 if unauthorized", async function () {
      const response = await request(app)
        .get(`/messages/${message.id}`)
        .send({ username: "unauthorized", _token: "unauthorizde token" });

      expect(response.statusCode).toBe(401);
    });

    test("returns 404 if message id does not exist", async function () {
      const response = await request(app)
        .get("/messages/999")
        .send({ username: u1.username, _token: u1_token });

      expect(response.statusCode).toBe(404);
    });
  });

  /** POST / - post message */

  describe("POST /messages", function () {
    test("can create and send a message", async function () {
      const response = await request(app).post("/messages").send({
        username: u1.username,
        _token: u1_token,
        to_username: u2.username,
        body: "New message",
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toMatchObject({
        id: expect.any(Number),
        from_username: u1.username,
        to_username: u2.username,
        body: "New message",
        sent_at: expect.any(String),
      });
    });
  });

  /** POST /:id/read - mark message as read */

  describe("POST /messages/:id/read", function () {
    test("can mark message as read if authorized", async function () {
      const response = await request(app)
        .post(`/messages/${message2u1.id}/read`)
        .send({ username: u1.username, _token: u1_token });
      expect(response.body.message.read_at).not.toBeNull();
    });

    test("returns 401 if unauthorized", async function () {
      const response = await request(app)
        .post(`/messages/${message.id}/read`)
        .send({ username: "unauthorized", _token: "unauthorized token" });

      expect(response.statusCode).toBe(401);
    });

    test("returns 404 if message id does not exist", async function () {
      const response = await request(app)
        .post("/messages/999/read")
        .send({ username: u1.username, _token: u1_token });

      expect(response.statusCode).toBe(404);
    });
  });
});
