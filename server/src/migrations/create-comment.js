'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Comments', {
            userId: {
                type: Sequelize.STRING,
                allowNull: false,

            },
            postId: {
                type: Sequelize.STRING,
                allowNull: false,

            },
            commentId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            content: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Comments');
    }
};
