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

exports.metadata = MetaData(sequelize, Sequelize);
exports.metaindex = MetaIndex(sequelize, Sequelize);
exports.note = Note(sequelize, Sequelize);
exports.sharedmetadata = SharedMetaData(sequelize, Sequelize);
exports.sharedmetaindex = SharedMetaIndex(sequelize, Sequelize);
exports.user = User(sequelize, Sequelize);

