import { gql } from "@apollo/client";

const GET_MOVIES = gql`
  query Query {
    getMovies {
      id
      title
      imgUrl
    }
  }
`;

const GET_MOVIE = gql`
  query Query($getMovieId: ID) {
    getMovie(id: $getMovieId) {
      id
      title
      slug
      synopsis
      trailerUrl
      imgUrl
      rating
      Genre {
        name
      }
      Casts {
        name
        profilePict
      }
      User {
        username
      }
    }
  }
`;

export { GET_MOVIES, GET_MOVIE };
