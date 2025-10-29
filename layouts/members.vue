<script setup>
import { useUserStore } from "@/store/userStore";
const route = useRoute();
const router = useRouter();
const colorMode = useColorMode();
const user = useUserStore();
const custom_cookie = useCookie("custom_token");
const access_cookie = useCookie("access_token");
const themeSwitcher = () => {
  colorMode.preference = colorMode.value == "light" ? "dark" : "light";
};
const isShowing2 = ref(false);
const isMenuOpen = ref(false);
const openMenu = () => {
  console.log("isMenuOpen", isMenuOpen.value);
  isMenuOpen.value = isMenuOpen.value == false ? true : false;
};
const porps = defineProps({
  navClass: {
    type: String,
    default: "",
  },
});

const NavBars = ref([
  {
    name: "home",
    to: "/",
    class: "navbar",
  },
  {
    name: "about",
    to: "/about",
    class: "navbar",
  },
  {
    name: "news",
    to: "/news",
    class: "navbar",
  },
  {
    name: "events",
    to: "/events",
    class: "navbar",
  },
  {
    name: "services",
    to: "/Services",
    class: "navbar",
  },
  {
    name: "membership",
    to: "/membership",
    class: "membership",
  },
  {
    name: "supports",
    to: "/supports",
    class: "navbar",
  },
  {
    name: "partners",
    to: "/partners",
    class: "navbar",
  },
]);
const logout = () => {
  user.unset();
  custom_cookie.value = "";
  access_cookie.value = "";
  router.push("/login");
};
</script>

<template>
  <div class="dark:bg-dark-primary">
    <NavBar nav-class="dark:bg-dark-primary"></NavBar>
    <slot />
    <LayoutFooter class="" />
  </div>
</template>
<style>
.navbar {
  @apply hover:text-primary text-secondary-text dark:text-white text-lg dark:hover:text-primary font-poppins;
}
</style>
