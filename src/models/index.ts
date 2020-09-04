const { Sequelize } = require('sequelize');

const { MetaData, MetaIndex } = require('./Meta');
const Note = require('./Note');
const { SharedMetaData, SharedMetaIndex } = require('./Shared');
const User = require('./User');

const config = require('modules/dbInfo');

const sequelize = new Sequelize('donote_beta', config.id, config.pw, {
  host: config.host,
  dialect: "mysql"
});

const metaData = MetaData(sequelize);
const metaIndex = MetaIndex(sequelize);
const note = Note(sequelize, Sequelize);
const sharedMetaData = SharedMetaData(sequelize);
const sharedMetaIndex = SharedMetaIndex(sequelize);
const user = User(sequelize);

module.exports = { sequelize, metaData, metaIndex, note, sharedMetaData, sharedMetaIndex, user};

