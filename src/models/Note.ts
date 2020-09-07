import { DataTypes } from "sequelize";

export const Note = (sequelize) => {
  return sequelize.define(
    "Note",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
      },
      edittime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      id: {
        type: DataTypes.TEXT({ length: "long" }),
        primaryKey: true,
      },
      align: {
        type: DataTypes.INTEGER,
        unique: "compositeIndex",
        autoIncrement: true,
      },
      category: {
        type: DataTypes.STRING(32),
      },
    },
    {
      timestamps: false,
    }
  );
};
