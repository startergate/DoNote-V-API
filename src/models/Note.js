module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Note', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING
    },
    edittime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    id: {
      type: DataTypes.TEXT("long"),
      primaryKey: true
    },
    align: {
      type: DataTypes.NUMBER(11),
      unique: "compositeIndex",
      autoIncrement: true
    },
    category: {
      type: DataTypes.STRING(32)
    }
  }, {
    timestamps: false
  });
};
