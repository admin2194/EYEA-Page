<template>
    <div class="flip-card relative w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
         :class="{ 'rotate-y-180': isFlipped }">
      <div class="flip-front absolute w-full h-full p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-[#dce4dc] flex flex-col justify-center text-center">
        <h3 class="text-xl font-semibold mb-2" :style="{'color': item[colorProperty] }">{{ item.title }}</h3>
      </div>
      <div class="flip-back absolute w-full h-full p-6 text-white rounded-xl flex flex-col items-center justify-center text-center rotate-y-180"
           :style="{'background-color': item[colorProperty] }">
        <p class="font-medium text-lg">{{ item[descriptionProperty] }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    item: Object,
    isFlipped: Boolean,
    colorProperty: {
      type: String,
      default: 'color'
    },
    descriptionProperty: {
      type: String,
      default: 'detailedDesc'
    }
  });
  </script>
  
  <style scoped>
  </style>