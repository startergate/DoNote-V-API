import { DataTypes } from "sequelize";

export const MetaIndex = (sequelize) => {
  return sequelize.define(
    "MetaIndex",
    {
      metaid: {
        type: DataTypes.CHAR(32),
        allowNull: false,
      },
      userid: {
        type: DataTypes.CHAR(32),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};

export const MetaData = (sequelize) => {
  return sequelize.define(
    "MetaData",
    {
      datatype: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      metadata: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      metaid: {
        type: DataTypes.CHAR(32),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
