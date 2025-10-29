<template>
  <div>
    <h3 class="text-3xl font-bold text-[#215ca3] text-center mb-12">Our Values</h3>
    <div class="grid md:grid-cols-2 gap-8">
      <div v-for="(value, index) in values"
           :key="index"
           class="group perspective-1000 h-48 relative"
           @mouseenter="startValueFlip(index)"
           @mouseleave="resetValueFlip">
        <!-- Flip Card -->
        <FlipCard :item="value" :is-flipped="flippedValueIndex === index" 
                  description-property="description" />

        <!-- Decorative SVG Infographic -->
        <div class="absolute -top-6 -right-6 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <circle cx="50" cy="50" r="45" :stroke="value.color" stroke-width="8" fill="none" class="animate-spin-slow" />
            <path :fill="value.color" d="M50 20a30 30 0 1 1 0 60 30 30 0 0 1 0-60zm0 10a20 20 0 1 0 0 40 20 20 0 0 0 0-40z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FlipCard from './FlipCard.vue';

const flippedValueIndex = ref(-1);
const values = [
  {
    title: 'Empowerment & Enablement',
    description: 'Providing tools and guidance to empower young entrepreneurs',
    color: '#349c54'
  },
  {
    title: 'Collaboration & Engagement',
    description: 'Fostering collaboration for collective action',
    color: '#245ca4'
  },
  {
    title: 'Inclusivity & Accessibility',
    description: 'Ensuring equal opportunities for all',
    color: '#fcb41c'
  },
  {
    title: 'Innovation & Problem-Solving',
    description: 'Encouraging innovative solutions and entrepreneurial culture',
    color: '#405c90'
  }
];

function startValueFlip(index) {
  flippedValueIndex.value = index;
}

function resetValueFlip() {
  flippedValueIndex.value = -1;
}
</script>

<style scoped>
/* Custom Animation */
@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 6s linear infinite;
}
</style>