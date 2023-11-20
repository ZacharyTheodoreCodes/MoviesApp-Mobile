import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://movie-mobileapp.zacharytheodore.online/",
  cache: new InMemoryCache(),
});

export default client;
