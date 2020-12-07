import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";

interface MetaIndexAttribute extends Model {
    readonly metaid: string;
    readonly userid: string;
}

type MetaIndexStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): MetaIndexAttribute
};

export const MetaIndex = (sequelize: Sequelize) => {
  return <MetaIndexStatic>sequelize.define(
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

interface MetaDataAttribute extends Model {
    readonly datatype: string;
    readonly metadata: string;
    readonly metaid: string;
}

type MetaDataStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): MetaDataAttribute
};

export const MetaData = (sequelize: Sequelize) => {
  return <MetaDataStatic>sequelize.define(
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
