import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";

interface UserAttribute extends Model {
    readonly pid: string;
    readonly recentSessid: string;
}

type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserAttribute
};

export const User = (sequelize: Sequelize) => {
  return <UserStatic>sequelize.define(
    "User",
    {
      pid: {
        type: DataTypes.CHAR(32),
        allowNull: false,
        unique: "compositeIndex",
      },
      recentSessid: {
        type: DataTypes.STRING(64),
        unique: "compositeIndex",
      },
    },
    {
      timestamps: false,
    }
  );
};
