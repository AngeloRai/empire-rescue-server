'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Facility, FacilityExam }) {
        this.belongsToMany(Facility, {through: FacilityExam, foreignKey: "examId", as: "facilities"})
      }
  };
  Exam.init({
    examName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    examType: {
      type: DataTypes.STRING,
      defaultValue: "exame"
    }
  }, {
    sequelize,
    tableName: "exams",
    modelName: 'Exam',
  });
  return Exam;
};