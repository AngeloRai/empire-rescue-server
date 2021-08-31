'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('FacilityDoctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      facilityId: {
        type: DataTypes.INTEGER,
        reference: { model: "facilities", key: "id" },
      },
      doctorId: {
        type: DataTypes.INTEGER,
        reference: { model: "doctors", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('FacilityDoctors');
  }
};