import { defineApolloClient } from "@nuxtjs/apollo";

export default defineApolloClient({
  httpEndpoint: process.env.VITE_GRAPH_URL ,
  // process.env.VITE_GRAPH_URL,
  tokenStorage: "cookie",
  authType: "Bearer",
  authHeader: "Authorization",
  tokenName: "custom_token",
});
