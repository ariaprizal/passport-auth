'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.addColumn(
      'Users',
      'role',
      {
        type: Sequelize.DataTypes.STRING,
      });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Users', 
      'role' 
    );
  }
};
