<template>
    <NuxtLayout class="">
      <NuxtPage />
    </NuxtLayout>
    <div
      v-if="useRuntimeConfig().public.mode == 'development'"
      class="fixed px-3 py-2 text-sm font-bold text-white bg-gray-900 rounded bottom-4 left-4 z-50"
    >
      <span class="hidden xs:inline-block sm:hidden">XS</span>
      <span class="inline-block md:hidden">Default</span>
      <span class="hidden sm:inline-block md:hidden">SM</span>
      <span class="hidden md:inline-block lg:hidden">MD</span>
      <span class="hidden lg:inline-block xl:hidden">LG</span>
      <span class="hidden xl:inline-block 2xl:hidden">XL</span>
      <span class="hidden 2xl:inline-block 3xl:hidden">2XL</span>
      <span class="hidden 3xl:inline-block">3XL</span>
    </div>
    <Notification></Notification>
  </template>
  
  <style scoped>
  body {
    @apply dark:bg-dark-third;
  }
  </style>
  