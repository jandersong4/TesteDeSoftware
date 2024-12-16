const {
  loginMiddleware,
  jwtMiddleware,
  checkRole,
  notLoggedIn,
} = require("../auth-middlewares"); // Caminho ajustado

const passport = require("passport");
const jwt = require("jsonwebtoken");

jest.mock("passport");
jest.mock("jsonwebtoken");

describe("auth-middlewares", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { login: jest.fn(), cookies: {}, headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      cookie: jest.fn(),
      end: jest.fn(),
    };
    next = jest.fn();
  });

  describe("loginMiddleware", () => {
    // it("deve retornar 204 e gerar um token", (done) => {
    //   const mockUser = { id: 1, role: "user" };

    //   // Mock da função authenticate do Passport
    //   passport.authenticate.mockImplementation((strategy, callback) => {
    //     return (req, res, next) => callback(null, mockUser, null);
    //   });

    //   // Mock da função sign do JWT
    //   jwt.sign.mockReturnValue("mockedToken");

    //   // Simular req.login de forma assíncrona
    //   req.login.mockImplementation((user, options, callback) => {
    //     callback(null); // Simula o sucesso do req.login
    //   });

    //   // Chamar o middleware
    //   loginMiddleware(req, res, (err) => {
    //     if (err) return done(err); // Lida com qualquer erro inesperado

    //     // Verificações
    //     expect(res.cookie).toHaveBeenCalledWith(
    //       "jwt",
    //       "mockedToken",
    //       expect.objectContaining({
    //         httpOnly: true,
    //         secure: false,
    //       })
    //     );
    //     expect(res.status).toHaveBeenCalledWith(204);
    //     expect(res.end).toHaveBeenCalled();

    //     done();
    //   });
    // });

    it("deve chamar next com erro em caso de falha", () => {
      passport.authenticate.mockImplementation((strategy, callback) => {
        return (req, res, next) => callback(new Error("Erro de autenticação"));
      });

      loginMiddleware(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("jwtMiddleware", () => {
    it("deve adicionar usuário no req e chamar next", () => {
      const mockUser = { id: 1, role: "user" };
      passport.authenticate.mockImplementation(
        (strategy, options, callback) => {
          return (req, res, next) => callback(null, mockUser, null);
        }
      );

      jwtMiddleware(req, res, next);

      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
    });

    it("deve retornar 401 se o usuário não estiver autenticado", () => {
      passport.authenticate.mockImplementation(
        (strategy, options, callback) => {
          return (req, res, next) => callback(null, false, null);
        }
      );

      jwtMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith(
        "Você precisa estar logado para realizar essa ação"
      );
    });
  });

  describe("checkRole", () => {
    it("deve chamar next se o papel for correto", () => {
      req.user = { role: "admin" };
      const middleware = checkRole("admin");

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("deve retornar 401 se o papel for incorreto", () => {
      req.user = { role: "user" };
      const middleware = checkRole("admin");

      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith(
        "Voce nao tem permissão para realizar ação!"
      );
    });
  });

  describe("notLoggedIn", () => {
    it("deve chamar next se não houver token", () => {
      req.cookies = {};

      notLoggedIn(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("deve retornar 400 se o usuário já estiver logado", () => {
      req.cookies["jwt"] = "token";
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { id: 1 });
      });

      notLoggedIn(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Você já está logado no sistema!");
    });
  });
});
