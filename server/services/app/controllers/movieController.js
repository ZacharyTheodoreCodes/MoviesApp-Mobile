const { Op } = require("sequelize");
const { Movie, Genre, Cast, User, sequelize } = require("../models");
const slugFormatter = require("../helpers/slugFormatter");

class MovieController {
  static async getMovies(req, res, next) {
    try {
      const movies = await Movie.findAll({
        order: [["id", "ASC"]],
        include: [
          {
            model: Genre,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Cast,
            order: [["id", "ASC"]],
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          }
        ],
      });
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async getMovieDetails(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findOne({
        where: {
          id: +id,
        },
        include: [
          {
            model: Genre,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Cast,
            order: [["id", "ASC"]],
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });

      if (!movie) throw { name: "NotFound" };
      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async addMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId, userMongoId, Casts } =
        req.body;
      // Add Movie
      const slug = slugFormatter(title);

      const movie = await Movie.create(
        {
          title,
          slug,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId :+genreId,
          userMongoId,
        },
        { transaction: t }
      );

      // Add casts
      Casts.forEach((cast) => {
        cast.movieId = movie.id;
      });

      await Cast.bulkCreate(Casts, {
        transaction: t,
      });

      await t.commit();

      res.status(201).json({ message: `${movie.title} added to list` });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async editMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId, Casts } =
        req.body;
      const movieId = req.params.id;
      const slug = slugFormatter(title);

      const movie = await Movie.findByPk(+movieId, { transaction: t });
      if (!movie) throw { name: "NotFound" };

      await Movie.update(
        {
          title,
          slug,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
        },
        { where: { id: +movieId }, transaction: t }
      );

      // Edit casts
      await Cast.destroy({ where: { movieId: +movieId }, transaction: t });

      Casts.forEach((cast) => {
        cast.movieId = +movieId;
      });

      await Cast.bulkCreate(Casts, { transaction: t });

      await t.commit();

      res
        .status(201)
        .json({ message: `Movie ${movieId} has been edited successfully` });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(+id);
      if (!movie) throw { name: "NotFound" };
      movie.destroy();

      res.status(200).json({
        message: `Movie with id ${id} removed successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
