// const {update} = require('../model/User');
const User = require('../model/User');
const bcrypt = require('bcrypt');
// const PermissionError = require('../../errors/PermissionError');
const PermissionError = require('../../../errors/PermissionError');
// const QueryError = require('../../errors/QueryError');
const QueryError = require('../../../errors/QueryError');

class UserService {
  async createUser(user) {
    try {
      const saltRounds = 10;

      // Atribuir o hash da senha
      user.password = await bcrypt.hash(user.password, saltRounds);

      // Criar o usuário e aguardar a resolução da Promise retornada por User.create
      const createdUser = await User.create(user);

      // Retornar o usuário criado (incluindo o ID)
      return createdUser; // Ou simplesmente `createdUser` dependendo da estrutura do seu modelo
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    return await User.findAll({
      raw: true,
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
  }

  async getAllUsersById(id) {
    const user = await User.findByPk(id, {raw: true, attributes:
      {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    if (!user) {
      throw new QueryError('Não foi encontrado um usuário com o ID: ${id}');
    }

    return user;
  }


  async updateUser(id, reqUserId, reqUserRole, body) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new QueryError('Não foi encontrado um usuário com o ID: ${id}');
    }

    const isAdmin = reqUserRole === 'admin';
    const isUpdatedUser = reqUserId == id;

    if (isAdmin || isUpdatedUser) {
      if (!isAdmin && body.role) {
        throw new PermissionError(
          'Voce nao tem permissão para atualizar o seu papel de usuário',
        );
      }
      await user.update(body);
      return user;
    } else {
      throw new PermissionError(
        'Voce nao tem permissão para atualizar esse usuário');
    }
  }

  async deleteUser(id, reqUserId) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new QueryError('Não foi encontrado um usuário com o ID: ${id}');
    }

    if (id == reqUserId) {
      throw new PermissionError('Você nao tem permissão para se deletar!');
    }

    await user.destroy();
  }

  async getCurrentUser(id) {
    const user = await User.findByPk(id, {attributes:
      {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    if (!user) {
      throw new QueryError('Não foi encontrado um usuário com o ID: ${id}');
    }
    return user;
  }
}


module.exports = new UserService;
