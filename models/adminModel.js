const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Admin extends Model {}

  Admin.init(
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );

  return Admin;
};
