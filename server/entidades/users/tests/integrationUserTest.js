const superTest = require("supertest");
const app = require("../../../config/express-config");
const request = superTest.agent(app);

describe("User Service Integration Tests", () => {
  let userId = 0;

  test("should login successfully", async () => {
    const response = await request
      .post("/users/login")
      .send({ email: "adm@gmail.com", password: "Adm123@" });

    expect(response.status).toBe(204);
    expect(response.headers).toHaveProperty("set-cookie");
  });

  test("should verify if the route of create a new user is working", async () => {
    const newUser = {
      full_name: "John Doe",
      username: "johndoexxx",
      email: "john@example.com",
      password: "Password123@",
      image: "profile.jpg",
      role: "user",
    };

    const response = await request.post("/users").send(newUser);
    userId = response._body.user.id;
    expect(response.status).toBe(201);
  });

  // Teste para a função getAllUsers
  test("should verify if the route of get all users is woking", async () => {
    const response = await request.get("/users");

    expect(response.status).toBe(200);
  });

  test("should verify if the route of edit an existing user is working", async () => {
    // Definir os dados para atualização
    const updatedUserData = {
      full_name: "John Doe Jr",
      username: "johndoejr",
      email: "john@example.com",
      image: "updatedprofile.com",
    };

    const response = await request
      .put(`/users/user/${userId}`)
      .send(updatedUserData);

    // Assegurar que o usuário foi editado com sucesso
    expect(response.status).toBe(200);

    // // Assegurar que os dados foram enviados conforme esperado
    expect(response.body.username).toBe(updatedUserData.username);
    expect(response.body.email).toBe(updatedUserData.email);
    expect(response.body.image).toBe(updatedUserData.image);
  });

  test("should verify if the route of deleteUser is working", async () => {
    const response = await request.delete(`/users/user/${userId}`);
    expect(response.statusCode).toBe(204);
  });
});
