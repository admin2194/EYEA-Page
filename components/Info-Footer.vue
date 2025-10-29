<script
setup>
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
});


</script>
<template>
  <div class="border-[1px] relative my-12">
    <div
      class="absolute left-[35%] -top-3 dark:text-white bg-white dark:bg-dark-secondary px-4"
    >
      {{ title }}
    </div>
  </div>
  <div class="md:flex justify-evenly dark:text-white">
    <div class="flex items-center space-x-2">
      <Icon name="ph:phone" width="30" height="30"></Icon>
      <p class="flex flex-wrap">
        <span>+251 977 061 167</span>,<span>+251 922 024 197</span>
      </p>
    </div>
    <div class="flex items-center space-x-2">
      <Icon name="material-symbols:mail-outline" width="30" height="30"></Icon>
      <p>info.eyea.org</p>
    </div>
  </div>
</template>
