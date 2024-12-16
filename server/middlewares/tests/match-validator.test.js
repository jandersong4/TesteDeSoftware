const { validationResult } = require("express-validator");
const matchValidate = require("../match-validator");
const validate = require("../validate");

// Mockando o middleware validate
jest.mock("../validate", () =>
  jest.fn((validations) => (req, res, next) => {
    const { validationResult } = require("express-validator");
    const errors = validationResult(req); // Simula o comportamento real
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  })
);

describe("matchValidate Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(), // Retorna `res` para permitir encadeamento
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe("createMatch Validations", () => {
    it("deve passar com campos válidos", () => {
      req.body = { name: "Partida 1", image: "http://example.com/image.png" };
      const middleware = matchValidate("createMatch");
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("updateMatch Validations", () => {
    it("deve passar com campos válidos", () => {
      req.body = {
        name: "Partida Atualizada",
        image: "http://example.com/image.png",
      };
      const middleware = matchValidate("updateMatch");
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it("deve passar se nenhum campo for enviado", () => {
      const middleware = matchValidate("updateMatch");
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
