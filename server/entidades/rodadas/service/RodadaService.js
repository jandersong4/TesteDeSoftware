const Rodada = require('../model/Rodada');
const PermissionError = require('../../errors/PermissionError');
const QueryError = require('../../errors/QueryError');

class RodadaService {
  async getAllRodadas() {
    const result = await Rodada.findAll();
    return result;
  }

  async createRodada(rodada) {
    await Rodada.create(rodada);
  }

  async getRodadaById(id) {
    const rodada = await Rodada.findByPk(id);

    if (!rodada) {
      throw new QueryError(`Não foi encontrado uma rodada com ID ${id}`);
    }

    return rodada;
  }

  async deleteRodada(id, reqUserId, reqUserRole) {
    const rodada = await Rodada.findByPk(id);
    if (!rodada) {
      throw new QueryError(`Não foi encontrado um rodada com ID ${id}`);
    }

    const isAdmin = reqUserRole === 'admin';
    const isRodadaOwner = reqUserId == rodada.UserId;

    if (!isAdmin && !isRodadaOwner) {
      throw new PermissionError(
        'Você não tem permissão para deletar esse rodada',
      );
    }
    await rodada.destroy();
  }
}


module.exports = new RodadaService;
