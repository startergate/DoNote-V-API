import { Sequelize } from "sequelize";

import { MetaData, MetaIndex } from "./Meta";
import { Note } from "./Note";
import { SharedMetaData, SharedMetaIndex } from "./Shared";
import { User } from "./User";

const sequelize = new Sequelize(
  "donote_beta",
  process.env.DB_ID,
  process.env.DB_PW,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const metaData = MetaData(sequelize);
const metaIndex = MetaIndex(sequelize);
const note = Note(sequelize);
const sharedMetaData = SharedMetaData(sequelize);
const sharedMetaIndex = SharedMetaIndex(sequelize);
const user = User(sequelize);

export {
  sequelize,
  metaData,
  metaIndex,
  note,
  sharedMetaData,
  sharedMetaIndex,
  user,
};
