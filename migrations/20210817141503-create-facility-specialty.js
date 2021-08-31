'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('FacilitySpecialties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      facilityId: {
        type: DataTypes.INTEGER,
        reference: { model: "facilities", key: "id" },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      specialtyId: {
        type: DataTypes.INTEGER,
        reference: { model: "specialties", key: "id" },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('FacilitySpecialties');
  }
};