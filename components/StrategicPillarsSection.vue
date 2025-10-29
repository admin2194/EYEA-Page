<template>
  <div class="mb-24">
    <h3 class="text-3xl font-bold text-[#245ca4] text-center mb-12">Our Strategic Pillars</h3>
    <div class="grid md:grid-cols-2 gap-8">
      <div v-for="(pillar, index) in strategicPillars"
           :key="index"
           class="group perspective-1000 h-48 relative"
           @mouseenter="startFlip(index)"
           @mouseleave="resetFlip">
        <!-- Flip Card -->
        <FlipCard :item="pillar" :is-flipped="flippedIndex === index" />

        <!-- Decorative SVG Infographic (Moved to Left Side) -->
        <div class="absolute -top-6 -left-6 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <rect x="10" y="10" width="80" height="80" :stroke="pillar.color" stroke-width="8" fill="none" class="animate-pulse" />
            <path :fill="pillar.color" d="M50 20l30 30-30 30-30-30z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FlipCard from './FlipCard.vue';

const flippedIndex = ref(-1);
const strategicPillars = [
  {
    title: 'Capacity Building',
    detailedDesc: 'Our training programs, mentorship opportunities, and resources help young entrepreneurs sharpen their business acumen and develop innovative ideas.',
    color: '#349c54'
  },
  {
    title: 'Partnership & Collaboration',
    detailedDesc: 'Collaborating with government, private sector, and international partners to create opportunities and support joint initiatives.',
    color: '#245ca4'
  },
  {
    title: 'Membership Development',
    detailedDesc: 'Transparent governance and active communication channels that allow members to shape the association\'s direction.',
    color: '#fcb41c'
  },
  {
    title: 'Innovation & Advocacy',
    detailedDesc: 'Creating enabling environment through advocacy and partnerships for resource access and growth opportunities.',
    color: '#405c90'
  }
];

function startFlip(index) {
  flippedIndex.value = index;
}

function resetFlip() {
  flippedIndex.value = -1;
}
</script>

<style scoped>
/* Custom Animation */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
</style>