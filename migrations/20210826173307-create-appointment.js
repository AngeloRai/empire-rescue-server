"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("appointments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      patientId: {
        type: DataTypes.INTEGER,
      },
      facilityId: {
        type: DataTypes.INTEGER,
      },
      doctorId: {
        type: DataTypes.INTEGER,
      },
      specialtyId: {
        type: DataTypes.INTEGER,
      },
      examId: {
        type: DataTypes.INTEGER,
      },
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("appointments");
  },
};
