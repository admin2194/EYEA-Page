import { useUserStore } from "@/store/userStore";
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const route = useRoute();
  const user = useUserStore();
  const cookieUser = useCookie("custom_token");
  nuxtApp.hook("apollo:error", (error) => {
    if (error.networkError) {
      console.log("check you network connection");
    }

    if (error.graphQLErrors) {
      var  message  =  error.graphQLErrors[0]
      if (
        message == "Could not verify JWT: JWTExpired" ||message =="Could not verify JWT: JWSError JWSInvalidSignature invalid-jwt"
      ) {
        cookieUser.value = "";
        user.unset();
        router.replace("/login");
      }
    }

    if (error.response) {
      console.log("response one");
    }

    // Handle different error cases
  });
});
