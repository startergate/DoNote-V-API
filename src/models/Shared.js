exports.SharedMetaIndex = (sequelize, DataTypes) => {
  return sequelize.define("SharedMetaIndex", {
    note: {
      type: DataTypes.STRING(65),
      allowNull: false
    },
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: 'compositeIndex',
      primaryKey: true
    },
    isEditable: {
      type: DataTypes.NUMBER(1)
    }
  }, {
    timestamps: false
  });
};

exports.SharedMetaData = (sequelize, DataTypes) => {
  return sequelize.define("SharedMetaData", {
    shareTable: {
      type: DataTypes.STRING(65),
      allowNull: false,
      unique: true
    },
    shareID: {
      type: DataTypes.STRING(32),
      primaryKey: true,
      allowNull: false,
      unique: 'compositeIndex'
    },
    shareEdit: {
      type: DataTypes.NUMBER(1)
    }
  }, {
    timestamps: false
  });
};