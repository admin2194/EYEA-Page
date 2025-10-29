<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const goHome = () => {
  clearError();
  router.replace("/");
};
const goBack = () => {
  clearError();
  router.back();
};
</script>

<template>
  <div
    class="flex items-center justify-center w-full min-h-screen py-16 m-auto bg-white dark:bg-dark-primary"
  >
    <div class="pb-8 overflow-hidden sm:rounded-lg">
      <div class="pt-8 text-center dark:text-white">
        <h1 class="font-bold text-purple-400 text-9xl">404</h1>
        <h1
          class="py-8 text-2xl font-medium sm:text-3xl md:text-4xl lg:text-6xl"
        >
          oops! Page not found
        </h1>
        <p class="px-12 pb-8 text-xl font-medium md:text-2xl">
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <div class="flex items-center mx-auto gap-x-4 w-fit">
          <button
            @click="goHome"
            class="px-6 py-3 mr-6 font-semibold text-white rounded-md bg-primary hover:from-pink-500 hover:to-orange-500"
          >
            HOME
          </button>
          <button
            @click="goBack"
            class="px-6 py-3 ml-5 font-semibold border rounded-md text-primary-text dark:text-white border-primary-text hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
