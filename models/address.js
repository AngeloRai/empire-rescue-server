"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Patient, Facility }) {
      // define association here
      this.hasMany(Patient, { foreignKey: "addressId", as: "patient" });
      this.hasMany(Facility, { foreignKey: "addressId", as: "facilities" });
    }
  }
  Address.init(
    {
      postalCode: {
        type: DataTypes.STRING,
      },
      street: {
        type: DataTypes.STRING,
      },
      number: {
        type: DataTypes.STRING,
      },
      neighborhood: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      complement: DataTypes.STRING,
      observations: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "addresses",
      modelName: "Address",
    }
  );
  return Address;
};
