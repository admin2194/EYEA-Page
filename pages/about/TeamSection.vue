<template>
  <section class="team-section py-16 md:py-24 bg-white dark:bg-dark-primary-light relative overflow-hidden">
    <!-- Background design elements -->
    <div class="absolute-bg top-40 -left-20 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -z-10"></div>
    <div class="absolute-bg bottom-20 -right-40 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl -z-10"></div>

    <div class="container mx-auto px-4">
      <LayoutSectionHeader
        iconName="bx:layer"
        title="Our Team"
        subtitle="Meet the team working to realize objectives of the association"
      />
      <div class="mt-12">
        <!-- Team members carousel for desktop -->
        <Carousel v-if="memberItems.length > 0" class="team-carousel md:block hidden" :items-to-show="1" snap-align="center" :items-to-scroll="1">
          <Slide v-for="sub in members" :key="sub">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <AboutPersonInfo v-for="(item, i) in sub" :key="i" :item="item" class="person-card" />
            </div>
          </Slide>
          <template #addons>
            <Pagination />
          </template>
        </Carousel>
        <!-- Team members carousel for mobile -->
        <div class="max-w-[380px] mx-auto md:hidden">
          <Carousel v-if="memberItems.length > 0" class="team-carousel">
            <Slide v-for="item in memberItems" :key="item.id">
              <AboutPersonInfo :item="item" class="person-card" />
            </Slide>
            <template #addons>
              <Pagination />
            </template>
          </Carousel>
          <div v-else class="flex justify-center text-gray-500">
            <p>No team members to display</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
// leter import AboutPersonInfo from '@/components/AboutPersonInfo.vue';

// Reactive state for team members
const memberItems = ref([]); // Assume you populate this from a data source

// Computed property to chunk members for desktop carousel
const members = computed(() => {
  const chunkSize = 4; // Adjust based on your design
  const chunks = [];
  for (let i = 0; i < memberItems.value.length; i += chunkSize) {
    chunks.push(memberItems.value.slice(i, i + chunkSize));
  }
  return chunks;
});
</script>

<style scoped>
.team-section {
  @apply py-16 md:py-24 bg-white dark:bg-dark-primary-light relative overflow-hidden;
}

.absolute-bg {
  @apply absolute w-full h-full -z-10;
}

.bg-blob {
  @apply absolute rounded-full blur-3xl;
}

.bg-blob-top-left {
  @apply top-40 -left-20 w-80 h-80 bg-primary/5 dark:bg-primary/10;
}

.bg-blob-bottom-right {
  @apply bottom-20 -right-40 w-96 h-96 bg-secondary/5 dark:bg-secondary/10;
}

.team-carousel {
  @apply mt-12;
}

.carousel__pagination {
  @apply mt-6;
}

.carousel__pagination-button::after {
  @apply bg-gray-300 dark:bg-gray-700 h-2 w-2 rounded-full transition-all duration-300;
}

.carousel__pagination-button--active::after {
  @apply bg-primary w-8 rounded-full;
}

.carousel__next,
.carousel__prev {
  @apply bg-gray-800/50 dark:bg-gray-200/30 text-white dark:text-gray-900 rounded-full p-2 transition-all duration-300 hover:bg-primary hover:dark:bg-primary;
}
</style>