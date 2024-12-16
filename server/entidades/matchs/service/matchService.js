const Match = require('../model/matchs');
const PermissionError = require('../../../errors/PermissionError');
const QueryError = require('../../../errors/QueryError');

class MatchService {
  async getAllMatchs() {
    const result = await Match.findAll();
    return result;
  }

  async get10() {
    const result = await Match.findAll({limit: 10});
    return result;
  }

  async createMatch(match) {
    await Match.create(match);
  }

  async getMatchById(id) {
    const match = await Match.findOne({where: {id: id},
      include: {association: 'matchUserData', attributes: ['username']},
    });


    if (!match) {
      throw new QueryError(`Não foi encontrado uma partida com ID ${id}`);
    }

    return match;
  }

  async updateMatchInfo(id, reqUserId, reqUserRole, body) {
    const match = await Match.findByPk(id);
    if (!match) {
      throw new QueryError(`Não foi encontrado um match com ID ${id}`);
    }

    const isAdmin = reqUserRole === 'admin';
    const isMatchOwner = reqUserId === match.UserId;
    // console.log(isAdmin, isMatchOwner);
    if (!isAdmin && !isMatchOwner) {
      throw new PermissionError(
        'Você não tem permissão para editar esse match',
      );
    }

    await match.update(body);
  }

  async deleteMatch(id, reqUserId, reqUserRole) {
    const match = await Match.findByPk(id);
    if (!match) {
      throw new QueryError(`Não foi encontrado um match com ID ${id}`);
    }

    const isAdmin = reqUserRole === 'admin';
    const isMatchOwner = reqUserId == match.UserId;

    if (!isAdmin && !isMatchOwner) {
      throw new PermissionError(
        'Você não tem permissão para deletar esse match',
      );
    }
    // o certo é destroy ou delete????
    await match.destroy();
  }
}

module.exports = new MatchService;
