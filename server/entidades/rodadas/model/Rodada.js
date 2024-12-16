const sequelize = require('../../../database');
const {DataTypes} = require('sequelize');

const Rodada = sequelize.define('Rodadas', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  d4: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  d6: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  d8: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  d10: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  d12: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  d20: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  IdDoMatch: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },


});

module.exports = Rodada;
