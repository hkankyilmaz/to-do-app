import request from "supertest";
import { app } from "../app";

/**
 * 1. Test the user register endpoint with valid data
 */

describe("Register User with valid and invalid data", () => {
  it("should return 201 status code and User created successfully! text when user is created", async () => {
    const response = await request(app).post("/user/register").send({
      fullname: "Hakan KARAYILMAZ",
      email: "hakankarayilmaz73@gmail.com", // Eeach email must be unique for test
      password: "123456",
    });
    expect(response.status).toBe(201);
    expect(response.text).toBe("User created successfully!");
  });

  it("should return 422 status code when user is created", async () => {
    const response = await request(app).post("/user/register").send({
      fullname:
        "Hakan KARAYILMAZ Hakan KARAYILMAZ Hakan KARAYILMAZ Hakan KARAYILMAZ", // fullname must be less than 50 characters
      email: "hkankyilmazzz@gmail.com",
      password: "123456",
    });
    expect(response.status).toBe(422);
    expect(response.text).toBe("Please enter valid inputs!");
  });
  it("should return 422 status code because email is invalid", async () => {
    const response = await request(app).post("/user/register").send({
      fullname: "Hakan KARAYILMAZ",
      email: "wrong email", // email must be valid
      password: "123456",
    });
    expect(response.status).toBe(422);
    expect(response.text).toBe("Please enter valid inputs!");
  });
  it("should return 422 status code because password is invalid", async () => {
    const response = await request(app).post("/user/register").send({
      fullname: "Hakan KARAYILMAZ",
      email: "hkankyilmazzzzz@gmail.com",
      password: 1, // password must be string,
    });
    expect(response.status).toBe(422);
    expect(response.text).toBe("Please enter valid inputs!");
  });
});

/**
 * 2. Test the user login endpoint with valid and invalid data
 */

describe("Login with valid and invalid data", () => {
  it("should return 200 status code and User created successfully! text when user Login", async () => {
    const response = await request(app).post("/user/login").send({
      email: "hhakankasdsrayilmaz@gmail.com",
      password: "123456",
    });
    expect(response.status).toBe(200);
    expect(response.text).toBe("User logged in successfully!");
  });

  it("should return 401 status code because password is invalid", async () => {
    const response = await request(app).post("/user/login").send({
      email: "hkankyilmazz@gmail.com",
      password: "wrong password !", // password must be valid
    });
    expect(response.status).toBe(401);
    expect(response.text).toBe("User doesn’t exist or wrong password");
  });
  it("should return 401 status code because email is invalid", async () => {
    const response = await request(app).post("/user/login").send({
      email: "wrong email !", // email must be valid
      password: "123456",
    });
    expect(response.status).toBe(401);
    expect(response.text).toBe("User doesn’t exist or wrong password");
  });
});

/**
 * 3. Cretae task endpoint with valid and invalid data
 */

describe("Cretae task with valid and invalid data", () => {
  it("should return 201 status code and todo created successfully! text when todo created", async () => {
    const response = await request(app).post("/todo/register").send({
      title: "Football Match",
      content: "Football Match at 8 pm in the stadium with friends and family",
      completed: false,
      userId: 11,
    });
    expect(response.status).toBe(201);
    expect(response.text).toBe("Todo created successfully!");
  });

  it("should return 422 status code because content is invalid", async () => {
    const response = await request(app).post("/todo/register").send({
      title: "Football Match",
      content:
        "Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family", // content must be less than 150 characters
      completed: false,
      userId: 11,
    });
    expect(response.status).toBe(422);
    expect(response.text).toBe("Please enter valid inputs!");
  });
  it("should return 422 status code because complete is invalid ", async () => {
    const response = await request(app).post("/todo/register").send({
      title: "Football Match",
      content: "Football Match at 8 pm in the stadium with friends and family",
      completed: "false", // completed must be boolean
      userId: 11,
    });
    expect(response.status).toBe(422);
    expect(response.text).toBe("Please enter valid inputs!");
  });
  it("should return 422 status code because userId is invalid", async () => {
    const response = await request(app).post("/todo/register").send({
      title: "Football Match",
      content: "Football Match at 8 pm in the stadium with friends and family",
      completed: false,
      userId: "11", // userId must be number
    });
    expect(response.status).toBe(422);
    expect(response.text).toBe("Please enter valid inputs!");
  });
});

/**
 * 4. Test Update task endpoint with valid and invalid data
 */

describe("Update task with valid and invalid data", () => {
  it("should return 201 status code and todo update successfully! text when todo updated", async () => {
    const response = await request(app).post("/todo/update").send({
      id: 20,
      title: "Football Match",
      content: "Football Match at 8 pm in the stadium with friends and family",
      completed: false,
    });
    expect(response.status).toBe(200);
    expect(response.text).toBe("Todo updated successfully!");
  });

  it("should return 422 status code because content is invalid", async () => {
    const response = await request(app).post("/todo/update").send({
      title: "Football Match",
      content:
        "Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family Football Match at 8 pm in the stadium with friends and family", // content must be less than 150 characters
      completed: false,
      userId: 11,
    });
    expect(response.status).toBe(422);
    expect(response.text).toBe("Please enter valid inputs!");
  });
  it("should return 422 status code because complete is invalid ", async () => {
    const response = await request(app).post("/todo/update").send({
      title: "Football Match",
      content: "Football Match at 8 pm in the stadium with friends and family",
      completed: "false", // completed must be boolean
      userId: 11,
    });
    expect(response.status).toBe(422);
    expect(response.text).toBe("Please enter valid inputs!");
  });
  it("should return 422 status code because userId is invalid", async () => {
    const response = await request(app).post("/todo/update").send({
      title: "Football Match",
      content: "Football Match at 8 pm in the stadium with friends and family",
      completed: false,
      userId: "11", // userId must be number
    });
    expect(response.status).toBe(422);
    expect(response.text).toBe("Please enter valid inputs!");
  });
});

/**
 * 5. Test get all Task endpoint
 */

describe("Get All Task ", () => {
  it("should return 200 status code", async () => {
    const response = await request(app).post("/todo/getAll").send({
      userId: 11,
    });
    expect(response.status).toBe(200);
  });
});

/**
 * 6. Test Delete task endpoint with valid and invalid data
 */

describe("Delete task with valid and invalid data", () => {
  it("should return 200 status code and todo delete successfully! text when todo deleted", async () => {
    const response = await request(app).post("/todo/delete").send({
      id: 59,
    });
    expect(response.status).toBe(200);
    expect(response.text).toBe("Todo deleted successfully!");
  });

  it("should return 400 status code because complete is invalid ", async () => {
    const response = await request(app).post("/todo/delete").send({
      id: 9999,
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe("The task doesn’t exist!");
  });
});
