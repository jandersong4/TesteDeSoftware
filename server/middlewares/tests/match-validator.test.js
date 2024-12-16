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
    // it("deve retornar erro se o campo name estiver ausente", () => {
    //   // Configuramos req.body como vazio
    //   req.body = {};

    //   // Invocamos o middleware
    //   const middleware = matchValidate("createMatch");
    //   middleware(req, res, next);

    //   // Verificamos se o middleware retornou o status e o erro esperados
    //   expect(res.status).toHaveBeenCalledTimes(1);
    //   expect(res.status).toHaveBeenCalledWith(400);
    //   expect(res.json).toHaveBeenCalledWith({
    //     errors: expect.arrayContaining([
    //       expect.objectContaining({
    //         msg: "Você deve enviar um nome para a partida!",
    //       }),
    //     ]),
    //   });
    // });

    // it("deve retornar erro se o campo name estiver vazio", () => {
    //   req.body.name = "";
    //   const middleware = matchValidate("createMatch");
    //   middleware(req, res, next);
    //   expect(res.status).toHaveBeenCalledWith(400);
    //   expect(res.json).toHaveBeenCalledWith({
    //     errors: expect.arrayContaining([
    //       expect.objectContaining({
    //         msg: "O nome da partida não pode ficar vazio!",
    //       }),
    //     ]),
    //   });
    // });
    // it("deve retornar erro se o campo image estiver ausente", () => {
    //   req.body.name = "Partida 1";
    //   const middleware = matchValidate("createMatch");
    //   middleware(req, res, next);
    //   expect(res.status).toHaveBeenCalledWith(400);
    //   expect(res.json).toHaveBeenCalledWith({
    //     errors: expect.arrayContaining([
    //       expect.objectContaining({
    //         msg: "O campo de imagem deve estar preenchido!",
    //       }),
    //     ]),
    //   });
    // });
    // it("deve retornar erro se o campo image não for uma URL válida", () => {
    //   req.body = { name: "Partida 1", image: "not-a-url" };
    //   const middleware = matchValidate("createMatch");
    //   middleware(req, res, next);
    //   expect(res.status).toHaveBeenCalledWith(400);
    //   expect(res.json).toHaveBeenCalledWith({
    //     errors: expect.arrayContaining([
    //       expect.objectContaining({
    //         msg: "A imagem deve ser uma URL",
    //       }),
    //     ]),
    //   });
    // });
    it("deve passar com campos válidos", () => {
      req.body = { name: "Partida 1", image: "http://example.com/image.png" };
      const middleware = matchValidate("createMatch");
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("updateMatch Validations", () => {
    // it("deve retornar erro se o campo name estiver vazio", () => {
    //   req.body = { name: "" };
    //   const middleware = matchValidate("updateMatch");
    //   middleware(req, res, next);
    //   expect(res.status).toHaveBeenCalledWith(400);
    //   expect(res.json).toHaveBeenCalledWith({
    //     errors: expect.arrayContaining([
    //       expect.objectContaining({
    //         msg: "O nome da partida não pode ficar vazio!",
    //       }),
    //     ]),
    //   });
    // });
    // it("deve retornar erro se o campo image não for uma URL válida", () => {
    //   req.body = { image: "not-a-url" };
    //   const middleware = matchValidate("updateMatch");
    //   middleware(req, res, next);
    //   expect(res.status).toHaveBeenCalledWith(400);
    //   expect(res.json).toHaveBeenCalledWith({
    //     errors: expect.arrayContaining([
    //       expect.objectContaining({
    //         msg: "A imagem deve ser uma URL!",
    //       }),
    //     ]),
    //   });
    // });
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
