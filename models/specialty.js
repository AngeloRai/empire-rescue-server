"use strict";
const { Model } = require("sequelize");
const appointment = require("./appointment");
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Facility, FacilitySpecialty, Doctor, DoctorSpecialty }) {
      // define association here
      this.belongsToMany(Facility, {
        through: FacilitySpecialty,
        foreignKey: "specialtyId",
        as: "facilities",
      });
      this.belongsToMany(Doctor, {
        through: DoctorSpecialty,
        foreignKey: "specialtyId",
        as: "doctors",
      });
      
    }
  }
  Specialty.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'specialties',
      modelName: "Specialty",
    }
  );
  return Specialty;
};
