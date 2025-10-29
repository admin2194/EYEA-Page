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
const props = defineProps({
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
    to: "/services",
    class: "navbar",
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
  {
    name: "membership",
    to: "/membership",
    class: "membership",
  },
]);
const logout = () => {
  user.unset();
  custom_cookie.value = "";
  access_cookie.value = "";
  router.push("/login");
};

const testFunc = () => {
  console.log("focused");
};
</script>

<template>
  <div class="relative flex items-center h-20 px-2" :class="navClass">
    <div v-if="isShowing2" class="absolute left-0 w-full top-20">
      <ServicesNavCard @CloseNavCard="isShowing2 = false"></ServicesNavCard>
    </div>

    <div class="flex items-center w-full">
      <div
        class="absolute xl:hidden left-[20px] 2xl:left-[96px] lg:left-[75px] xl:top-0.5 xl:relative"
      >
        <NuxtLink class="" to="/">
          <img
            type="image"
            src="@/assets/images/logos/final_logo.svg"
            alt=""
            class="2xl:w-[160px] lg:w-[130px] w-[110px] dark:hidden inline-block"
          />
          <img
            type="image"
            src="@/assets/images/logos/final_logo_white.svg"
            alt=""
            class="2xl:w-[160px] lg:w-[90px] w-[70px] hidden dark:inline-block"
          />
        </NuxtLink>
      </div>

      <!-- /* -------------------------------------------------------------------------- */ -->
      <!-- /*                                 Mobile Nav                                 */ -->
      <!-- /* -------------------------------------------------------------------------- */ -->
      <div
        class="flex items-center justify-end w-full xl:hidden overflow-x-clip"
      >
        <HeadlessMenu
          v-if="user.isLoggedIn"
          as="div"
          class="relative self-end inline-block text-left"
        >
          <div>
            <HeadlessMenuButton class="flex items-center gap-x-2 group">
              <Icon name="mdi:account-circle" class="text-4xl text-primary" />
            </HeadlessMenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <HeadlessMenuItems
              class="absolute right-0 z-50 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-44 ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    @click="$router.push({ name: 'app' })"
                    :class="[
                      active ? 'bg-primary/10' : 'text-gray-900',
                      'group flex w-full items-center rounded-md gap-x-3 px-2 py-2 text-sm',
                    ]"
                  >
                    <Icon
                      name="clarity:employee-group-solid"
                      class="text-2xl text-secondary-text"
                    />
                    Membership
                  </button>
                </HeadlessMenuItem>
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-primary/10 ' : 'text-gray-900',
                      'group flex w-full items-center gap-x-3 rounded-md px-2 py-2 text-sm',
                    ]"
                    @click="logout"
                  >
                    <Icon
                      name="material-symbols:logout-rounded"
                      class="text-2xl text-secondary-text"
                    />
                    Logout
                  </button>
                </HeadlessMenuItem>
              </div>
            </HeadlessMenuItems>
          </transition>
        </HeadlessMenu>
        <HeadlessMenu as="div" class="z-50 flex text-left">
          <HeadlessMenuButton
            class="flex justify-end px-4 ml-auto"
            @focus="isMenuOpen = false"
          >
            <Icon
              :name="
                !isMenuOpen ? 'material-symbols:menu' : 'ic:baseline-close'
              "
              class="text-3xl xl:text-5xl dark:text-white"
            ></Icon>
          </HeadlessMenuButton>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <HeadlessMenuItems
              class="absolute left-0 z-50 w-full bg-white top-14"
              :class="navClass ? navClass : 'bg-white '"
              @focus="isMenuOpen = true"
            >
              <div
                class="grid grid-cols-2 px-1 py-1 shadow-lg"
                :class="navClass ? navClass : 'bg-white '"
              >
                <HeadlessMenuItem
                  :class="route.path == '/'"
                  class="hover:text-primary"
                  v-slot="{ active }"
                  v-for="(router, i) in NavBars"
                  :key="i"
                >
                  <NuxtLink
                    :key="router.name"
                    :to="router.to"
                    :class="[
                      'group flex w-full items-center rounded-md px-2 py-2  capitalize text-sm dark:text-white whitespace-nowrap',
                      router.name == route.path.split('/')[1]
                        ? 'text-primary dark:text-primary'
                        : 'text-secondary-text',
                      router.name === 'membership' && !user.isLoggedIn
                        ? '!hidden'
                        : '',
                    ]"
                    >{{ router.name }}</NuxtLink
                  >
                </HeadlessMenuItem>
                <HeadlessMenuItem
                  v-if="!user.isLoggedIn"
                  :class="route.path == '/login'"
                  class="hover:text-primary"
                  v-slot="{ active }"
                >
                  <NuxtLink
                    to="/login"
                    :class="[
                      'group flex w-full items-center rounded-md px-2 py-2  capitalize text-sm dark:text-white whitespace-nowrap',
                    ]"
                    >Login</NuxtLink
                  >
                </HeadlessMenuItem>
                <HeadlessMenuItem
                  v-if="!user.isLoggedIn"
                  :class="route.path == '/signup'"
                  class="hover:text-primary"
                  v-slot="{ active }"
                >
                  <NuxtLink
                    to="/signup"
                    :class="[
                      'group flex w-full items-center rounded-md px-2 py-2  capitalize text-sm dark:text-white whitespace-nowrap',
                    ]"
                    >signup</NuxtLink
                  >
                </HeadlessMenuItem>

                <HeadlessMenuItem
                  :class="route.path == '/'"
                  class="hover:text-primary"
                  v-slot="{ active }"
                >
                  <NuxtLink
                    to="/join"
                    :class="[
                      'group flex w-full items-center rounded-md px-2 py-2  capitalize text-sm dark:text-white whitespace-nowrap',
                    ]"
                    >Join</NuxtLink
                  >
                </HeadlessMenuItem>
              </div>
            </HeadlessMenuItems>
          </transition>
          <div
            @click="themeSwitcher"
            class="relative items-center ml-2 text-xl rounded-full 2xl:text-4xl"
            :class="[]"
          >
            <Icon
              v-if="colorMode.value == 'dark'"
              name="material-symbols:light-mode"
              :class="colorMode.value == 'dark' ? 'inline-block' : 'hidden'"
              class="mb-1 text-white transform rounded-full"
            ></Icon>
            <Icon
              v-else
              name="ic:baseline-dark-mode"
              :class="colorMode.value == 'light' ? 'hidden' : 'inline-block'"
              class="mb-1 transform rounded-full"
            ></Icon>
          </div>
        </HeadlessMenu>
      </div>
      <!-- /* -------------------------------------------------------------------------- */ -->
      <!-- /*                                 Desktop nav                                */ -->
      <!-- /* -------------------------------------------------------------------------- */ -->
      <div class="hidden w-full xl:flex sideSpace">
        <div class="p-4">
          <NuxtLink class="" to="/">
            <img
              type="image"
              src="@/assets/images/logos/final_logo.svg"
              alt=""
              class="2xl:w-[160px] lg:w-[130px] w-[70px] dark:hidden inline-block"
            />
            <img
              type="image"
              src="@/assets/images/logos/final_logo_white.svg"
              alt=""
              class="2xl:w-[160px] lg:w-[90px] w-[70px] hidden dark:inline-block"
            />
          </NuxtLink>
        </div>

        <div
          class="flex col-span-9 py-6 mx-auto gap-x-6 hover:text-primary dark:text-white"
        >
          <NuxtLink v-for="navbar in NavBars" :to="navbar.to" :key="navbar.to">
            <button
              v-if="navbar.name != 'services'"
              @mouseleave="isShowing2 = false"
              class="capitalize cursor-pointer hover:text-primary 2xl:text-lg lg:text-base dark:hover:text-primary font-poppins"
              :class="[
                navbar.name == route.path.split('/')[1]
                  ? 'text-primary dark:text-primary'
                  : 'text-secondary-text',
                navbar.name === 'membership' && !user.isLoggedIn
                  ? '!hidden !w-0 overflow-hidden !h-0'
                  : '',
              ]"
            >
              {{ navbar.name }}
            </button>
            <div
              @mouseenter="isShowing2 = true"
              v-else
              class="capitalize cursor-pointer hover:text-primary 2xl:text-lg lg:text-base dark:hover:text-primary font-poppins"
              :class="[
                navbar.name == route.path.split('/')[1]
                  ? 'text-primary dark:text-primary'
                  : 'text-secondary-text dark:text-white',
              ]"
            >
              services
            </div>
          </NuxtLink>
        </div>
        <div
          class="items-center hidden col-span-3 py-4 2xl:text-base xl:text-sm lg:flex"
          :class="[user.isLoggedIn ? 'justify-end' : 'justify-between']"
        >
          <div v-if="!user.isLoggedIn" class="space-x-10">
            <NuxtLink to="/login">
              <button
                class="px-6 py-2 border-2 rounded-md border-primary text-primary"
              >
                Login
              </button>
            </NuxtLink>
            <NuxtLink to="signup">
              <button
                class="px-6 py-2 text-white border-2 rounded-md border-primary bg-primary"
              >
                SignUp
              </button>
            </NuxtLink>
          </div>
          <div v-else class="justify-end hidden pr-0 space-x-10 md:flex">
            <NuxtLink to="/join">
              <InputsButton
                class="flex items-center justify-center p-1 px-2 space-x-2 border-2 rounded-md border-primary text-primary"
                name="Join Us"
              >
                <template #leadingIcon>
                  <Icon
                    name="mingcute:send-line"
                    class="2xl:text-2xl lg:text-base"
                  ></Icon>
                </template>
              </InputsButton>
            </NuxtLink>

            <HeadlessMenu as="div" class="relative inline-block text-left">
              <div>
                <HeadlessMenuButton
                  class="flex items-center gap-x-2 group dark:text-white"
                >
                  <Icon
                    name="mdi:account-circle"
                    class="text-4xl text-primary"
                  />
                  {{ `${user.given_name}` }}
                  <Icon
                    name="tabler:chevron-down"
                    class="text-2xl text-gray-500 transition-all duration-300 group-hover:translate-y-1"
                  />
                </HeadlessMenuButton>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <HeadlessMenuItems
                  class="absolute right-0 z-50 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-44 ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="px-1 py-1">
                    <HeadlessMenuItem v-slot="{ active }">
                      <button
                        @click="$router.push({ name: 'app' })"
                        :class="[
                          active ? 'bg-primary/10' : 'text-gray-900',
                          'group flex w-full items-center rounded-md gap-x-3 px-2 py-2 text-sm',
                        ]"
                      >
                        <Icon
                          name="clarity:employee-group-solid"
                          class="text-2xl text-secondary-text"
                        />
                        Membership
                      </button>
                    </HeadlessMenuItem>
                    <HeadlessMenuItem v-slot="{ active }">
                      <button
                        :class="[
                          active ? 'bg-primary/10 ' : 'text-gray-900',
                          'group flex w-full items-center gap-x-3 rounded-md px-2 py-2 text-sm',
                        ]"
                        @click="logout"
                      >
                        <Icon
                          name="material-symbols:logout-rounded"
                          class="text-2xl text-secondary-text"
                        />
                        Logout
                      </button>
                    </HeadlessMenuItem>
                  </div>
                </HeadlessMenuItems>
              </transition>
            </HeadlessMenu>
          </div>
          <div class="hidden md:inline-flex md:items-center">
            <div
              @click="themeSwitcher"
              class="relative flex items-center w-20 ml-6 text-4xl rounded-full"
            >
              <Icon
                v-if="$colorMode.preference != 'light'"
                name="material-symbols:light-mode"
                class="text-white transform rounded-full cursor-pointer 2xl:text-4xl xl:text-2xl"
              ></Icon>
              <Icon
                v-else
                name="material-symbols:dark-mode"
                class="text-gray-500 transform rounded-full cursor-pointer 2xl:text-4xl xl:text-2xl"
              ></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.navbar {
  @apply hover:text-primary text-secondary-text dark:text-white text-lg dark:hover:text-primary font-poppins;
}
</style>
