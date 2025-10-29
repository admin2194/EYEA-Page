<script setup>
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  TransitionRoot,
} from "@headlessui/vue";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { NuxtLink } from "#components";

const isMenuOpen = ref(false);
const links = ref([
  { id: "home", label: "Home", icon: "material-symbols:home-outline" },
  { id: "news", label: "What is New with Us", icon: "tabler:news" },
  { id: "story", label: "Our Story", icon: "uil:books" },
  { id: "service", label: "Service", icon: "uil:shop" },
  { id: "membership", label: "Membership", icon: "uil:user-check" },
  { id: "partner", label: "Partnership", icon: "mdi:partnership-outline" },
  { id: "contact", label: "Contact", icon: "tabler:phone" },
]);
</script>

<template>
  <Menu as="div" class="fixed z-30 bottom-32 w-fit hidden lg:inline-block right-0">
    <MenuButton
      @click="isMenuOpen = !isMenuOpen"
      class="p-3 rounded-full mt-2 bg-primary text-white"
    >
      <Icon
        :name="isMenuOpen ? 'tabler:x' : 'pepicons-pop:dots-x'"
        class="text-2xl"
      ></Icon>
    </MenuButton>
    <TransitionRoot
      :show="isMenuOpen"
      enter="transition-opacity duration-75"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-150"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <MenuItems as="div" class="shadow-lg">
        <div
          class="flex flex-col absolute space-y-2 rounded-lg w-[250px] -top-80 right-0 p-2 bg-primary"
        >
          <MenuItem v-for="(link, i) in links" :key="i" v-slot="{ active }">
            <NuxtLink :to="{ path: '/', hash: `#${link.id}` }">
              <div
                :class="[
                  'text-white flex items-center border-b border-white/50 pb-2 space-x-2 cursor-pointer',
                  { 'bg-blue-600': active },
                ]"
              >
                <Icon :name="link.icon" class="text-lg"></Icon>
                <p class="text-lg">{{ link.label }}</p>
              </div>
            </NuxtLink>
          </MenuItem>
        </div>
      </MenuItems>
    </TransitionRoot>
  </Menu>
</template>