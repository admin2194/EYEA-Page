import { defineApolloClient } from "@nuxtjs/apollo";

export default defineApolloClient({
  httpEndpoint: import.meta.env.VITE_GRAPH_URL,
  tokenStorage: import.meta.env.VITE_AUTH_TOKEN_STORAGE || "cookie",
  authType: "Bearer",
  authHeader: "Authorization",
  tokenName: import.meta.env.VITE_AUTH_TOKEN_NAME || "custom_token",
});