import { useUserStore } from "@/store/userStore";
import useNotify from "@/use/notify";
const { notify } = useNotify();
export default defineNuxtRouteMiddleware((to, from, next) => {
  const user = useUserStore();
  // if (process.server) return
  if (user.isLoggedIn) {
    console.log("user is logged in");
    return;
  } else {
    notify({
      title: "You are not logged in",
      description: "Please login to continue",
      cardClass: "bg-red-500",
    });
    return navigateTo("/login");
  }
});
