const Sequelize = require('sequelize');

const MetaData = require('./Meta').MetaData;
const MetaIndex = require('./Meta').MetaIndex;
const Note = require('./Note');
const SharedMetaData = require('./Shared').SharedMetaData;
const SharedMetaIndex = require('./Shared').SharedMetaIndex;
const User = require('./User');

const config = require('modules/dbInfo');

const sequelize = new Sequelize('donote_beta', config.id, config.pw, {
  host: config.host,
  dialect: "mysql"
});

const metaData = MetaData(sequelize, Sequelize);
const metaIndex = MetaIndex(sequelize, Sequelize);
const note = Note(sequelize, Sequelize);
const sharedMetaData = SharedMetaData(sequelize, Sequelize);
const sharedMetaIndex = SharedMetaIndex(sequelize, Sequelize);
const user = User(sequelize, Sequelize);

module.exports= { sequelize, metaData, metaIndex, note, sharedMetaData, sharedMetaIndex, user};

