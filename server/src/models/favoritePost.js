"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FavoritePost extends Model {
    static associate(models) {
      FavoritePost.belongsTo(models.User, { foreignKey: "userId", targetKey: "id", as: "user" });
      FavoritePost.belongsTo(models.Post, { foreignKey: "postId", targetKey: "id", as: "post" });
    }
  }

  FavoritePost.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "FavoritePost",
    }
  );

  return FavoritePost;
};
