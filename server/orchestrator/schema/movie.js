const { userAxios, appAxios } = require("../axiosUrl");
const Redis = require("ioredis");
const redis = new Redis({
  port: 13284, // Redis port
  host: "redis-13284.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "zachary",
  password: process.env.REDIS_PASS,
});

const typeDefs = `#graphql
  type Movie{
    id: ID 
    title: String
    slug: String
    synopsis: String
    trailerUrl: String
    imgUrl : String
    rating: Int
    Genre : Genre
    Casts : [Cast]
  }

  type MovieDetail {
    id: ID 
    title: String
    slug: String
    synopsis: String
    trailerUrl: String
    imgUrl : String
    rating: Int
    Genre : Genre
    Casts : [Cast]
    User : User
  }

  type Genre {
   name : String
  }

  type Cast {
    name: String
    profilePict: String
  }

  type User {
    _id: String
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  input CastInput {
    name: String
    profilePict: String
  }

  input AddMovieInput {
    title: String
    synopsis: String
    trailerUrl: String
    imgUrl : String
    rating: Int
    genreId : Int
    Casts : [CastInput]
    userMongoId : String
  }

  input EditMovieInput {
    title: String
    synopsis: String
    trailerUrl: String
    imgUrl : String
    rating: Int
    genreId : Int
    Casts : [CastInput]
  }

  type Message{
    message: String
  }

  type Query {
    getMovies:[Movie]
    getMovie(id: ID): MovieDetail
  }

  type Mutation{
    addMovie(movieInput: AddMovieInput): Message
    updateMovie(movieInput: EditMovieInput, id:ID): Message
    deleteMovie(id:ID): Message
  }
`;

const resolvers = {
  Query: {
    getMovies: async () => {
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
        return movies;
      } catch (err) {
        throw new Error(err.response ? err.response.data.message : err.message);
      }
    },
    getMovie: async (parent, args) => {
      try {
        const { id } = args;
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
        return movieData;
      } catch (err) {
        throw new Error(err.response ? err.response.data.message : err.message);
      }
    },
  },
  Mutation: {
    addMovie: async (parent, args) => {
      try {
        const { movieInput } = args;
        const { data } = await appAxios.post("/", movieInput);
        await redis.del("app:movies");
        return data;
      } catch (err) {
        if (err.response && err.response.status === 400) {
          throw new Error("Bad Request: " + err.response.data.message);
        }
        throw new Error(err.response ? err.response.data.message : err.message);
      }
    },
    updateMovie: async (parent, args) => {
      try {
        const { movieInput, id } = args;
        const { data } = await appAxios.put(`/${id}`, movieInput);
        await redis.del("app:movies");
        await redis.del(`app:movie:${id}`);

        return data;
      } catch (err) {
        if (err.response && err.response.status === 400) {
          throw new Error("Bad Request: " + err.response.data.message);
        }
        throw new Error(err.response ? err.response.data.message : err.message);
      }
    },
    deleteMovie: async (parent, args) => {
      try {
        const { id } = args;
        const { data } = await appAxios.delete(`/${id}`);
        await redis.del("app:movies");
        await redis.del(`app:movie:${id}`);
        return data;
      } catch (err) {
        if (err.response && err.response.status === 400) {
          throw new Error("Bad Request: " + err.response.data.message);
        }
        throw new Error(err.response ? err.response.data.message : err.message);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
