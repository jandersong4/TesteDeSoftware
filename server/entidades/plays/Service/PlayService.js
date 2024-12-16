const Play = require('../model/Play');
const PermissionError = require('../../../errors/PermissionError');
const QueryError = require('../../../errors/QueryError');
const {User} = require('../../users/model/User');

class PlayService {
  async getAllPlays() {
    const result = await Play.findAll();
    return result;
  }

  async createPlay(play) {
    await Play.create(play);
  }

  async getPlayById(id) {
    const play = await Play.findByPk(id);

    if (!play) {
      throw new QueryError(`Não foi encontrado uma play com ID ${id}`);
    }

    return play;
  }

  async getPlayByIdDaPartida(idDaPartida) {
    const play = await Play.findAll({
      where: {idDaPartida: idDaPartida},
      include: {association: 'userdata', attributes: ['username']},
    });

    if (!play) {
      throw new QueryError(
        `Não foi encontrado uma play com ID de partida ${idDaPartida}`);
    }

    return play;
  }


  async deletePlay(id, reqUserId, reqUserRole) {
    const play = await Play.findByPk(id);
    if (!play) {
      throw new QueryError(`Não foi encontrado uma play com ID ${id}`);
    }

    const isAdmin = reqUserRole === 'admin';
    const isPlayOwner = reqUserId == play.UserId;

    if (!isAdmin && !isPlayOwner) {
      throw new PermissionError(
        'Você não tem permissão para deletar essa play',
      );
    }
    // o certo é destroy ou delete????
    await play.destroy();
  }
}

module.exports = new PlayService;
