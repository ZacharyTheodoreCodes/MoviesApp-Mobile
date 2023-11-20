"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsTo(models.Genre, { foreignKey: "genreId" });
      Movie.hasMany(models.Cast, { foreignKey: "movieId" });
    }
  }
  Movie.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      slug: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Slug is required",
          },
          notEmpty: {
            msg: "Slug is required",
          },
        },
      },
      synopsis: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notNull: {
            msg: "Synopsis is required",
          },
          notEmpty: {
            msg: "Synopsis is required",
          },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1,
            msg: "Minimum rating is 1",
          },
        },
      },
      genreId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "GenreId is required",
          },
          notEmpty: {
            msg: "GenreId is required",
          },
        },
      },
      userMongoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
