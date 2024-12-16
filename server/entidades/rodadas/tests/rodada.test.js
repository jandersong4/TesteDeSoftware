const RodadaService = require("../service/RodadaService");
const Rodada = require("../model/Rodada");
const QueryError = require("../../../errors/QueryError");
const PermissionError = require("../../../errors/PermissionError");

jest.mock("../model/Rodada");

describe("RodadaService", () => {
  let rodadaService;

  beforeEach(() => {
    rodadaService = RodadaService;
    jest.clearAllMocks();
  });

  test("should return all rodadas", async () => {
    const rodadas = [
      { id: 1, name: "Rodada 1", UserId: 1 },
      { id: 2, name: "Rodada 2", UserId: 2 },
    ];

    Rodada.findAll.mockResolvedValue(rodadas);

    const result = await rodadaService.getAllRodadas();

    expect(result).toEqual(rodadas);
    expect(Rodada.findAll).toHaveBeenCalledTimes(1);
  });

  test("should create a new rodada", async () => {
    const rodadaData = { id: 1, name: "New Rodada", UserId: 1 };

    Rodada.create.mockResolvedValue(rodadaData);

    await rodadaService.createRodada(rodadaData);

    expect(Rodada.create).toHaveBeenCalledWith(rodadaData);
  });

  test("should return a rodada by ID", async () => {
    const rodada = { id: 1, name: "Rodada 1", UserId: 1 };

    Rodada.findByPk.mockResolvedValue(rodada);

    const result = await rodadaService.getRodadaById(1);

    expect(result).toEqual(rodada);
    expect(Rodada.findByPk).toHaveBeenCalledWith(1);
  });

  test("should throw QueryError if rodada by ID is not found", async () => {
    const id = 999;

    Rodada.findByPk.mockResolvedValue(null);

    let error;
    try {
      await rodadaService.getRodadaById(id);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(QueryError);
    expect(error.message).toBe(`Não foi encontrado uma rodada com ID ${id}`);
    expect(Rodada.findByPk).toHaveBeenCalledWith(id);
  });

  test("should delete a rodada if the requester is the owner", async () => {
    const rodada = {
      id: 1,
      name: "Rodada 1",
      UserId: 1,
      destroy: jest.fn().mockResolvedValue(),
    };

    Rodada.findByPk.mockResolvedValue(rodada);

    await rodadaService.deleteRodada(1, 1, "user");

    expect(Rodada.findByPk).toHaveBeenCalledWith(1);
    expect(rodada.destroy).toHaveBeenCalled();
  });

  test("should delete a rodada if the requester is an admin", async () => {
    const rodada = {
      id: 1,
      name: "Rodada 1",
      UserId: 1,
      destroy: jest.fn().mockResolvedValue(),
    };

    Rodada.findByPk.mockResolvedValue(rodada);

    await rodadaService.deleteRodada(1, 2, "admin");

    expect(Rodada.findByPk).toHaveBeenCalledWith(1);
    expect(rodada.destroy).toHaveBeenCalled();
  });

  test("should throw PermissionError if the requester is not admin or owner", async () => {
    const rodada = {
      id: 1,
      name: "Rodada 1",
      UserId: 1,
      destroy: jest.fn(),
    };

    Rodada.findByPk.mockResolvedValue(rodada);

    let error;
    try {
      await rodadaService.deleteRodada(1, 2, "user");
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(PermissionError);
    expect(error.message).toBe(
      "Você não tem permissão para deletar esse rodada"
    );
    expect(Rodada.findByPk).toHaveBeenCalledWith(1);
    expect(rodada.destroy).not.toHaveBeenCalled();
  });

  test("should throw QueryError if rodada to delete is not found", async () => {
    const id = 999;

    Rodada.findByPk.mockResolvedValue(null);

    let error;
    try {
      await rodadaService.deleteRodada(id, 1, "admin");
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(QueryError);
    expect(error.message).toBe(`Não foi encontrado um rodada com ID ${id}`);
    expect(Rodada.findByPk).toHaveBeenCalledWith(id);
  });

  test("should throw an error when trying to create a rodada with incomplete data", async () => {
    const invalidRodadaData = { name: "Incomplete Rodada" }; // Faltando campos obrigatórios, como UserId

    Rodada.create.mockImplementation(() => {
      throw new Error("Validation error");
    });

    let error;
    try {
      await rodadaService.createRodada(invalidRodadaData);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Validation error");
    expect(Rodada.create).toHaveBeenCalledWith(invalidRodadaData);
  });
});
