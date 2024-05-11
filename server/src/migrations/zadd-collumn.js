module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Posts',
            'isLiked',
            Sequelize.BOOLEAN
        );
    },

};