("use strict");
const moment = require("moment");
moment.locale('pt-br');
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Patient, Facility, Doctor, Specialty, Exam }) {
      this.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });
      this.belongsTo(Facility, { foreignKey: "facilityId", as: "facility" });
      this.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctor" });
      this.belongsTo(Specialty, {foreignKey: 'specialtyId', as: 'specialty'});
      this.belongsTo(Exam, {foreignKey: 'examId', as: 'exam'});
    }
  }
  Appointment.init(
    {
      appointmentType: {
        type: DataTypes.ENUM("consulta", "exame"),
        defaultValue: "consulta",
      },
      status: {
        type: DataTypes.ENUM("pendente", "informado", "realizado", "ausente"),
        defaultValue: "pendente",
      },
      dateTime: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("dateTime")).format("llll");
        },
        validate: {
          isDate: { msg: "Date must be in 'YYYY/MM/DD' format." },
        },
      },
      
    },
    {
      sequelize,
      tableName: "appointments",
      modelName: "Appointment",
    }
  );
  return Appointment;
};
