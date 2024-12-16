const sequelize = require('../../../database');
const {DataTypes} = require('sequelize');

const Play = sequelize.define('Plays', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  IdDaPartida: {
    type: DataTypes.STRING,
    allowNull: false,
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
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'User', key: 'id'},
  },

});


module.exports = Play;
