const { validationResult } = require("express-validator");
const userValidate = require("../user-validator");
const validate = require("../validate");

jest.mock("../validate", () =>
  jest.fn((validations) => (req, res, next) => {
    const { validationResult } = require("express-validator");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  })
);

describe("userValidate Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  /** * 1. Login Validations ***/
  describe("Login Validations", () => {
    it("deve retornar erro se o campo email estiver ausente", () => {
      const middleware = userValidate("login");
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: expect.arrayContaining([
          expect.objectContaining({
            msg: "O campo de email deve estar preenchido!",
          }),
        ]),
      });
    });

    it("deve retornar erro se o campo email não for válido", () => {
      req.body.email = "invalid-email";
      const middleware = userValidate("login");
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: expect.arrayContaining([
          expect.objectContaining({
            msg: "O email inserido nao é válido!",
          }),
        ]),
      });
    });

    it("deve retornar erro se o campo password estiver ausente", () => {
      req.body = { email: "test@example.com" };
      const middleware = userValidate("login");
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: expect.arrayContaining([
          expect.objectContaining({
            msg: "Você deve digitar uma senha!",
          }),
        ]),
      });
    });

    it("deve passar com email e password válidos", () => {
      req.body = { email: "test@example.com", password: "ValidPassword123!" };
      const middleware = userValidate("login");
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  /** * 2. CreateUser Validations ***/
  describe("CreateUser Validations", () => {
    it("deve retornar erro se full_name estiver ausente", () => {
      const middleware = userValidate("createUser");
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: expect.arrayContaining([
          expect.objectContaining({
            msg: "Voce deve enviar seu nome completo!",
          }),
        ]),
      });
    });

    it("deve retornar erro se full_name contiver caracteres inválidos", () => {
      req.body.full_name = "João123";
      const middleware = userValidate("createUser");
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: expect.arrayContaining([
          expect.objectContaining({
            msg: "Seu nome so pode conter letras!",
          }),
        ]),
      });
    });

    it("deve passar com todos os campos válidos", () => {
      req.body = {
        full_name: "João Silva",
        username: "joaosilva",
        email: "joao@example.com",
        password: "StrongPass!1",
        image: "http://example.com/image.png",
      };
      const middleware = userValidate("createUser");
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  /** * 3. UpdateUser Validations ***/
  describe("UpdateUser Validations", () => {
    it("deve passar se nenhum campo for fornecido", () => {
      const middleware = userValidate("updateUser");
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("deve retornar erro se email não for válido", () => {
      req.body.email = "invalid-email";
      const middleware = userValidate("updateUser");
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: expect.arrayContaining([
          expect.objectContaining({
            msg: "O email inserido nao é valido.",
          }),
        ]),
      });
    });
  });
});
