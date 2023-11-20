require("dotenv").config();

const {ApolloServer} = require("@apollo/server")
const {startStandaloneServer} = require("@apollo/server/standalone")

const {
    typeDefs: movieTypeDefs,
    resolvers: movieResolvers,
  } = require("./schema/movie");
  
  const {
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
  } = require("./schema/user");

const server = new ApolloServer({
    typeDefs: [movieTypeDefs, userTypeDefs],
    resolvers: [movieResolvers, userResolvers],
    introspection: true
})

startStandaloneServer(server,{
    listen: {port: process.env.PORT || 4000},
}).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
})
