"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("facilities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      addressId: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable("facilities");
  },
};
