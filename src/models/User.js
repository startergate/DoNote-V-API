const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    pid: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      unique: "compositeIndex"
    },
    recentSessid: {
      type: DataTypes.STRING(64),
      unique: "compositeIndex"
    }
  }, {
    timestamps: false
  });
};
