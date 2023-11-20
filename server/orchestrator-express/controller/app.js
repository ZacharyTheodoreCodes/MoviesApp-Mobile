const { userAxios, appAxios } = require("../axiosUrl");
const Redis = require("ioredis");
const redis = new Redis({
  port: 13284, // Redis port
  host: "redis-13284.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "zachary",
  password: process.env.REDIS_PASS,
});

class AppController {
  static async getMovies(req, res, next) {
    try {
      const moviesCache = await redis.get("app:movies");
      let movies;
      if (moviesCache) {
        movies = JSON.parse(moviesCache);
      } else {
        const { data } = await appAxios.get("/");
        await redis.set("app:movies", JSON.stringify(data));
        movies = data;
      }
      res.status(200).json(movies);
    } catch (err) {
      //res.status(500).json(err);
      next(err)
    }
  }

  static async getMovieDetails(req, res, next) {
    try {
      const { id } = req.params;
      const movieCache = await redis.get(`app:movie:${id}`);
      let movieData;
      if (movieCache) {
        movieData = JSON.parse(movieCache);
      } else {
        const { data: movie } = await appAxios.get(`/${id}`);
        if (!movie) throw { name: "NotFound" };
        const { data: user } = await userAxios.get(`/${movie.userMongoId}`);
        delete movie.userMongoId;
        movie.User = user;
        await redis.set(`app:movie:${id}`, JSON.stringify(movie));
        movieData = movie;
      }
      res.status(200).json(movieData);
    } catch (err) {
      next(err)
    }
  }

  static async addMovie(req, res, next) {
    try{
      // const { title, synopsis, trailerUrl, imgUrl, rating, genreId, userMongoId, Casts } = req.body
      const {data} = await appAxios.post('/',req.body)
      await redis.del("app:movies")
      res.status(201).json(data)
    }catch(err){
     next(err)
    }
  }

  static async editMovie(req, res, next) {
    try{
      const {id} = req.params
     // { title, synopsis, trailerUrl, imgUrl, rating, genreId, Casts } = req.body
      const {data} = await appAxios.put(`/${id}`,req.body)
      await redis.del("app:movies")
      await redis.del(`app:movie:${id}`)
      res.status(200).json(data)
    }catch(err){
      next(err)
     }
  }

  static async deleteMovie(req, res, next) {
    try{
      const {id} = req.params;
      const {data} = await appAxios.delete(`/${id}`)
      await redis.del("app:movies")
      await redis.del(`app:movie:${id}`)
      res.status(200).json(data)
    }catch(err){
      next(err)
    }
  }
}

module.exports = AppController;
