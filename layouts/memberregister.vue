<script setup>

import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  TransitionRoot,
} from "@headlessui/vue";
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
  <div class="w-full max-w-screen-4xl overflow-x-hidden mx-auto">
    <div class="h-20 px-2 flex items-center" :class="navClass">
      <div class="flex w-full items-center">
        <div
          class="absolute 2xl:left-[96px] lg:left-[75px] 2xl:top-4 xl:top-1 lg:relative"
        >
          <NuxtLink class="" to="/">
            <img
              type="image"
              src="@/assets/images/logos/final_logo.svg"
              alt=""
              class="2xl:w-[250px] lg:w-[120px] w-[80px] dark:hidden inline-block"
            />
            <img
              type="image"
              src="@/assets/images/logos/final_logo_white.svg"
              alt=""
              class="2xl:w-[250px] lg:w-[120px] w-[80px] hidden dark:inline-block"
            />
          </NuxtLink>
        </div>

        <div class="lg:hidden flex justify-end items-center w-full">
          <HeadlessMenu as="div" class="lg:hidden w-full inline-block text-left z-50">
            <HeadlessMenuButton
              @click="openMenu()"
              class="flex justify-end px-4 w-screen"
            >
              <Icon
                :name="
                  !isMenuOpen ? 'material-symbols:menu' : 'ic:baseline-close'
                "
                class="lg:text-5xl text-3xl dark:text-white"
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
                class="absolute w-full z-50 left-0 bg-white"
                :class="navClass ? navClass : 'bg-white '"
              >
                <div
                  class="px-1 py-1 grid grid-cols-2 shadow-lg"
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
                    @click="logout"
                    v-else
                    :class="route.path == '/signup'"
                    class="hover:text-primary"
                    v-slot="{ active }"
                  >
                    <NuxtLink
                      :class="[
                        'group flex w-full items-center rounded-md px-2 py-2  capitalize text-sm dark:text-white whitespace-nowrap',
                      ]"
                      >logout</NuxtLink
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
          </HeadlessMenu>
          <div class="">
            <div></div>
            <div
              @click="themeSwitcher"
              class="relative md:text-4xl text-xl ml-2 items-center rounded-full"
              :class="[]"
            >
              <Icon
                v-if="colorMode.value == 'dark'"
                name="material-symbols:light-mode"
                :class="colorMode.value == 'dark' ? 'inline-block' : 'hidden'"
                class="text-white transform rounded-full mb-1"
              ></Icon>
              <Icon
                v-else
                name="ic:baseline-dark-mode"
                :class="colorMode.value == 'light' ? 'hidden' : 'inline-block'"
                class="transform rounded-full mb-1"
              ></Icon>
            </div>
          </div>
        </div>
        <!-- /* -------------------------------------------------------------------------- */ -->
        <!-- /*                                 Desktop nav                                */ -->
        <!-- /* -------------------------------------------------------------------------- */ -->
        <div class="flex w-full">
          <div
            class="hidden hover:text-primary col-span-9 mx-auto py-6 lg:flex space-x-6 dark:text-white"
          >
            <NuxtLink
              v-for="navbar in NavBars"
              :to="navbar.to"
              :key="navbar.to"
            >
              <button
                v-if="navbar.name != 'services'"
                @mouseleave="isShowing2 = false"
                class="hover:text-primary cursor-pointer capitalize 2xl:text-lg lg:text-base dark:hover:text-primary font-poppins"
                :class="[
                  navbar.name == route.path.split('/')[1]
                    ? 'text-primary dark:text-primary'
                    : 'text-secondary-text dark:text-white',
                ]"
              >
                {{ navbar.name }}
              </button>
              <div
                @mouseenter="isShowing2 = true"
                v-else
                class="cursor-pointer text-secondary-text capitalize 2xl:text-lg lg:text-base dark:text-white dark:hover:text-primary font-poppins"
              >
                services
              </div>
              <div v-if="isShowing2">
                <ServicesNavCard></ServicesNavCard>
              </div>
            </NuxtLink>
          </div>
          <div
            class="2xl:text-base xl:text-sm col-span-3 lg:flex py-4 items-center hidden"
            :class="[user.isLoggedIn ? 'justify-end' : 'justify-between']"
          >
            <div v-if="!user.isLoggedIn" class="space-x-10">
              <NuxtLink to="/login">
                <button
                  class="border-2 px-6 border-primary py-2 rounded-md text-primary"
                >
                  Login
                </button>
              </NuxtLink>
              <NuxtLink to="signup">
                <button
                  class="px-6 border-2 border-primary bg-primary py-2 rounded-md text-white"
                >
                  SignUp
                </button>
              </NuxtLink>
            </div>
            <div v-else class="hidden md:flex justify-end gap-x-10">
              <div class="flex gap-x-5 items-center">
                <div class="hidden md:inline-block">
                  <div
                    @click="themeSwitcher"
                    class="relative text-2xl cursor-pointer items-center rounded-full"
                  >
                    <Icon
                      v-if="$colorMode.preference == 'light'"
                      name="material-symbols:light-mode"
                      class="text-gray-500 transform rounded-full"
                    ></Icon>
                    <Icon
                      v-if="$colorMode.preference == 'dark'"
                      name="material-symbols:dark-mode"
                      class="transform rounded-full text-gray-500"
                    ></Icon>
                  </div>
                </div>
                <NuxtLink to="/join">
                  <InputsButton
                    class="border-2 flex justify-center space-x-2 items-center border-primary p-1 px-2 rounded-md text-primary"
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
              </div>

              <HeadlessMenu as="div" class="relative inline-block text-left">
                <div>
                  <HeadlessMenuButton class="flex gap-x-2 items-center group">
                    <Icon
                      name="mdi:account-circle"
                      class="text-4xl text-primary"
                    />
                    {{ `${user.given_name}` }}
                    <Icon
                      name="tabler:chevron-down"
                      class="text-2xl text-gray-500 group-hover:translate-y-1 transition-all duration-300"
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
                    class="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div class="px-1 py-1">
                      <HeadlessMenuItem v-slot="{ active }">
                        <button
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
          </div>
        </div>
      </div>
    </div>
    <div class="grid lg:grid-cols-8 lg:min-h-[100vh]">
      <div class="col-span-5 dark:bg-dark-secondary-light">
        <slot></slot>
      </div>

      <div
        class="bg-third-light2 dark:bg-dark-primary-light lg:flex hidden col-span-3 dark:text-white items-center"
      >
        <div class="space-y-10 border-l-4 px-20 border-[#40FF81]">
          <div>
            <Icon name=""></Icon>
            <img
              src="@/assets/images/shapes/Highlight_top_green.svg"
              alt=""
              srcset=""
            />
          </div>
          <p class="3xl:text-2xl 2xl:text-base leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, iusto
            explicabo! Velit amet praesentium, consectetur, aliquam, nostrum
            suscipit similique facere doloremque repellat sunt voluptatum
            impedit tempora at itaque voluptas facilis! Alias, nobis! Eos id
          </p>
          <div class="flex space-x-2 items-center">
            <div class="w-20 h-20 bg-black overflow-hidden rounded-full">
              <img
                src="@/assets/images/temp/speaker.jpg"
                alt=""
                srcset=""
                width="100"
                height="100"
              />
            </div>
            <div class="space-y-2">
              <p class="2xl:text-xl text-base font-semibold">Samuel Noah</p>
              <p class="text-sm text-secondary-texts">CEO eLikeAddis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LayoutFooter></LayoutFooter>
</template>
