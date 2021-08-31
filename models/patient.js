'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Address, Appointment }) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'});
      this.belongsTo(Address, {foreignKey: 'addressId', as: 'address'});
      this.hasMany(Appointment, {foreignKey: "patientId", as: "appointments"})
    }
  };
  Patient.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    phone1: {
      type: DataTypes.STRING,
      allowNull: false
     },
    phone2: {
      type: DataTypes.STRING,
     },
    rg: {
      type: DataTypes.STRING,
      
     },
    cpf: {
      type: DataTypes.STRING,
      
     },
  }, {
    sequelize,
    tableName: "patients",
    modelName: 'Patient',
  });
  return Patient;
};