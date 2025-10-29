import { defineApolloClient } from "@nuxtjs/apollo";

export default defineApolloClient({
  httpEndpoint: import.meta.env.VITE_USER_GRAPH_URL,
  tokenStorage: import.meta.env.VITE_AUTH_TOKEN_STORAGE || "localStorage",
  authType: "Bearer",
  authHeader: "Authorization",
  tokenName: import.meta.env.VITE_AUTH_TOKEN_NAME || "anonymous_token",
});