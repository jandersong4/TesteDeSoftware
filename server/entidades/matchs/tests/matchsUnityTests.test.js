const MatchService = require("../service/matchService");
const Match = require("../model/matchs");

jest.mock("../model/matchs");

describe("MatchService", () => {
  let matchService;

  beforeEach(() => {
    matchService = MatchService;
  });

  test("should return all matchs", async () => {
    const matchs = [
      {
        id: 1,
        name: "Match 1",
        image: "image_url_1",
        UserId: 1,
      },
      {
        id: 2,
        name: "Match 2",
        image: "image_url_2",
        UserId: 2,
      },
    ];

    Match.findAll.mockResolvedValue(matchs);

    const result = await matchService.getAllMatchs();

    expect(result).toEqual(matchs);
  });

  test("should return 10 matchs", async () => {
    const matchs = [
      {
        id: 1,
        name: "Match 1",
        image: "image_url_1",
        UserId: 1,
      },
      {
        id: 2,
        name: "Match 2",
        image: "image_url_2",
        UserId: 2,
      },
      {
        id: 3,
        name: "Match 3",
        image: "image_url_3",
        UserId: 3,
      },
      {
        id: 33,
        name: "Match 33",
        image: "image_url_33",
        UserId: 33,
      },
      {
        id: 4,
        name: "Match 4",
        image: "image_url_4",
        UserId: 4,
      },
      {
        id: 5,
        name: "Match 5",
        image: "image_url_5",
        UserId: 5,
      },
      {
        id: 6,
        name: "Match 6",
        image: "image_url_6",
        UserId: 6,
      },
      {
        id: 7,
        name: "Match 7",
        image: "image_url_7",
        UserId: 7,
      },
      {
        id: 8,
        name: "Match 8",
        image: "image_url_8",
        UserId: 8,
      },
      {
        id: 9,
        name: "Match 9",
        image: "image_url_9",
        UserId: 9,
      },
    ];

    Match.findAll.mockResolvedValue(matchs);

    const result = await matchService.get10();

    expect(result).toEqual(matchs);
    expect(result.length).toBe(10);
  });

  test("should create a new match", async () => {
    const matchData = {
      id: "1",
      name: "New Match",
      image: "image_url_new",
      UserId: 1,
    };

    // Mock a resposta do create
    Match.create.mockResolvedValue();

    // Chama a função que você está testando
    await matchService.createMatch(matchData);

    // Verifica se a função create foi chamada com os dados corretos
    expect(Match.create).toHaveBeenCalledWith(matchData);

    // Verifica se o produto foi persistido no banco de dados
    const createdMatch = await Match.findOne({ where: { id: matchData.id } });
    expect(createdMatch === matchData); // Verifica se o produto existe (não é nulo ou indefinido)
  });

  test("should return a match with the specified ID", async () => {
    const matchId = 1;
    const match = {
      id: matchId,
      name: "Match 1",
      image: "image_url_1",
      UserId: 1,
    };

    Match.findOne.mockResolvedValue(match);

    const result = await matchService.getMatchById(matchId);

    expect(result).toEqual(match);
  });

  test("should allow match owner to update match info", async () => {
    const match = {
      id: 1,
      name: "Match 1",
      image: "image_url_1",
      UserId: 1,
      update: jest.fn().mockResolvedValue(),
    };
    const body = {
      name: "Updated Match",
      image: "updated_image_url",
    };

    Match.findByPk.mockResolvedValue(match);

    await matchService.updateMatchInfo(1, 1, "user", body);

    expect(match.update).toHaveBeenCalledWith(body);
  });

  test("should allow admin to update match info", async () => {
    const match = {
      id: 1,
      name: "Match 1",
      image: "image_url_1",
      UserId: 1,
      update: jest.fn().mockResolvedValue(),
    };

    Match.findByPk.mockResolvedValue(match);

    await matchService.updateMatchInfo(1, 2, "admin", {
      name: "Updated Match",
    });

    expect(match.update).toHaveBeenCalledWith({ name: "Updated Match" });
  });

  test("should allow match owner to delete match", async () => {
    const match = {
      id: 1,
      name: "Match 1",
      image: "image_url_1",
      UserId: 1,
      destroy: jest.fn().mockResolvedValue(),
    };

    Match.findByPk.mockResolvedValue(match);

    await matchService.deleteMatch(1, 1, "user");

    expect(match.destroy).toHaveBeenCalled();
  });

  test("should allow admin to delete match", async () => {
    const match = {
      id: 1,
      name: "Match 1",
      image: "image_url_1",
      UserId: 1,
      destroy: jest.fn().mockResolvedValue(),
    };

    Match.findByPk.mockResolvedValue(match);

    await matchService.deleteMatch(1, 2, "admin");

    expect(match.destroy).toHaveBeenCalled();
  });
});
