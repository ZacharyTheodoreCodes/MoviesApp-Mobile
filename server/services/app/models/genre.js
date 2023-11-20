"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      Genre.hasMany(models.Movie, { foreignKey: "genreId" });
    }
  }
  Genre.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Genre is required",
          },
          notEmpty: {
            msg: "Genre is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Genre",
    }
  );
  return Genre;
};
