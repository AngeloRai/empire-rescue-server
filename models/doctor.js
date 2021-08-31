"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Appointment, Specialty, DoctorSpecialty, Facility, FacilityDoctor }) {
      // define association here
      this.hasMany(Appointment, {foreignKey: "doctorId", as: "appointments"})
      this.belongsToMany(Specialty, {
        through: DoctorSpecialty,
        foreignKey: "doctorId",
        as: "specialties",
      });
      this.belongsToMany(Facility, {
        through: FacilityDoctor,
        foreignKey: "doctorId",
        as: "facilities",
      });
    }
  }
  Doctor.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      crm: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
        unique: true,
      },
      phone2: DataTypes.STRING,
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: "doctors",
      modelName: "Doctor",
    }
  );
  return Doctor;
};
