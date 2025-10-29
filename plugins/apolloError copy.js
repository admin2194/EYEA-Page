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
      if (
        error.graphQLErrors[0].message == "Could not verify JWT: JWTExpired"
      ) {
        cookieUser.value = "";
        user.unset();
        router.replace("/");
      }
    }

    if (error.response) {
      console.log("response one");
    }

    // Handle different error cases
  });
});
