import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";

interface SharedMetaIndexAttribute extends Model {
    readonly note: string;
    readonly id: string;
    readonly isEditable: boolean;
}

type SharedMetaIndexStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SharedMetaIndexAttribute
};

export const SharedMetaIndex = (sequelize: Sequelize) => {
  return <SharedMetaIndexStatic>sequelize.define(
    "SharedMetaIndex",
    {
      note: {
        type: DataTypes.STRING(65),
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: "compositeIndex",
        primaryKey: true,
      },
      isEditable: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );
};

interface SharedMetaDataAttribute extends Model {
    readonly shareTable: string;
    readonly shareID: string;
    readonly shareEdit: boolean;
}

type SharedMetaDataStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SharedMetaDataAttribute
};

export const SharedMetaData = (sequelize: Sequelize) => {
  return <SharedMetaDataStatic>sequelize.define(
    "SharedMetaData",
    {
      shareTable: {
        type: DataTypes.STRING(65),
        allowNull: false,
        unique: true,
      },
      shareID: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        allowNull: false,
        unique: "compositeIndex",
      },
      shareEdit: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );
};
