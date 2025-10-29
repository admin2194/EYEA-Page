import { defineApolloClient } from "@nuxtjs/apollo";

export default defineApolloClient({
  httpEndpoint: process.env.VITE_GRAPH_URL,

});
