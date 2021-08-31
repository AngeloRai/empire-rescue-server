'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FacilityExam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FacilityExam.init({
    facilityId: DataTypes.INTEGER,
    examId: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'FacilityExams',
    modelName: 'FacilityExam',
  });
  return FacilityExam;
};