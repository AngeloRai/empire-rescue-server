'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      postalCode: {
        type: DataTypes.STRING
      },
      street: {
        type: DataTypes.STRING
      },
      number: {
        type: DataTypes.STRING
      },
      neighborhood: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      state: {
        type: DataTypes.STRING
      },
      cpf: {
        type: DataTypes.STRING
      },
      complement: {
        type: DataTypes.STRING
      },
      observations: {
        type: DataTypes.STRING
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
    await queryInterface.dropTable('addresses');
  }
};