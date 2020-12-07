import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";

interface NoteAttribute extends Model {
    readonly name: string;
    readonly text: string;
    readonly edittime: Date;
    readonly id: string;
    readonly align: number;
    readonly category: string;
}

type NoteStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): NoteAttribute
};

export const Note = (sequelize: Sequelize) => {
  return <NoteStatic>sequelize.define(
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
