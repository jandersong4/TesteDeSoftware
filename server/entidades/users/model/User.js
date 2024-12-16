
const sequelize = require('../../../database');
const {DataTypes} = require('sequelize');
const Match = require('../../matchs/model/matchs');
const Rodada = require('../../rodadas/model/Rodada');
const Play = require('../../plays/model/Play');

const User = sequelize.define('User', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM,
    values: ['admin', 'user'],
    allowNull: false,
  },

}, {timestamps: false,
  freezeTableName: true},

);

User.hasMany(Match, {
  onDelete: 'cascade',
  as: 'matchUserData', foreignKey: {name: 'UserId'},
});
Match.belongsTo(User, {as: 'matchUserData', foreignKey: {name: 'UserId'}});


User.sync({alter: false, force: false})
  // .then(() => console.log('A tabela Users foi (re)criada'))
  .catch((error) => console.log(error));

Match.sync({alter: false, force: false})
  // .then(() => console.log('A tabela Matchs foi (re)criada'))
  .catch((error) => console.log(error));

// ////////////////////////Rolagem de dados//////////////
User.hasMany(Rodada, {
  onDelete: 'cascade',
});
Rodada.belongsTo(User);

Rodada.belongsTo(User);

Rodada.sync({alter: false, force: false})
  // .then(() => console.log('A tabela Rodadas foi (re)criada'))
  .catch((error) => console.log(error));


User.hasMany(Play, {
  onDelete: 'cascade',
  as: 'userdata', foreignKey: {name: 'UserId'},
});
Play.belongsTo(User, {as: 'userdata', foreignKey: {name: 'UserId'}});


User.sync({alter: false, force: false})
  // .then(() => console.log('A tabela Users foi (re)criada'))
  .catch((error) => console.log(error));

Play.sync({alter: false, force: false})
  // .then(() => console.log('A tabela Plays foi (re)criada'))
  .catch((error) => console.log(error));


module.exports = User;


