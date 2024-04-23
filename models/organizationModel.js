const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Organization extends sequelize.Sequelize.Model {}

  Organization.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      joinCode: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
      },

      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Organization",
      tableName: "organizations",
    }
  );

  return Organization;
};
