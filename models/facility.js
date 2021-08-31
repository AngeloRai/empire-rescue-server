"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Appointment,
      Address,
      Exam,
      FacilityExam,
      Specialty,
      FacilitySpecialty,
      Doctor,
      FacilityDoctor,
    }) {
      this.hasMany(Appointment, {foreignKey: "facilityId", as: "appointments"})
      this.belongsTo(Address, { foreignKey: "addressId", as: "address" });
      this.belongsToMany(Exam, {
        through: FacilityExam,
        foreignKey: "facilityId",
        as: "exams",
      });
      this.belongsToMany(Specialty, {
        through: FacilitySpecialty,
        foreignKey: "facilityId",
        as: "specialties",
      });
      this.belongsToMany(Doctor, {
        through: FacilityDoctor,
        foreignKey: "facilityId",
        as: "doctors",
      });
    }
  }
  Facility.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      phone1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone2: {
        type: DataTypes.STRING,
      },
      phone3: {
        type: DataTypes.STRING,
      },
      clinic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      hospital: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      laboratory: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      emergency: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "facilities",
      modelName: "Facility",
    }
  );
  return Facility;
};
