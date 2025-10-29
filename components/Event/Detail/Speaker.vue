<script setup>
const { speaker } = defineProps({
  speaker: {
    type: Object,
    required: true,
  },
});

// const truncatedDescription = computed(() => {
//   if (speaker.description.length < 200) return speaker.description;
//   return speaker.description.substring(0, 200) + "...";
// });
</script>
<template>
  <div
    class="flex flex-col h-full px-10 space-y-2 items-center text-center md:text-left md:items-start font-poppins"
  >
    <div class="w-[100px] h-[100px] overflow-hidden bg-black rounded-full">
      <img
        :src="
          speaker.photo_url ? speaker.photo_url : 'https://placehold.co/600x400'
        "
        alt=""
        class="object-cover w-full h-full"
      />
    </div>
    <div class="font-semibold text-white md:text-lg -text">
      {{ speaker.name }}
    </div>
    <p class="md:text-lg text-third-bold">
      {{ speaker.title }}
    </p>
    <div class="col-span-1 row-span-4">
      <p
        class="text-sm text-primary-text-light line-clamp-6 md:text-base dark:text-dark-text-secondary"
      >
        {{ speaker.description }}
      </p>
    </div>
  </div>
</template>
