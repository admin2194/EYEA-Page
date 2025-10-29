<template>
  <section class="leadership-section py-16 md:py-24 bg-gray-50 dark:bg-dark-secondary relative overflow-hidden">
    <!-- Background design elements -->
    <div class="absolute-bg top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent -z-10"></div>
    <div class="absolute-bg -bottom-20 -right-20 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -z-10"></div>

    <div class="container mx-auto px-4">
      <LayoutSectionHeader
        iconName="fluent-mdl2:group"
        title="Leadership"
        subtitle="Meet the board of directors and advisory team providing valuable guidance to EYEA"
      />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <!-- Board of Directors -->
        <div class="leadership-card">
          <div class="flex items-center mb-6">
            <div class="leadership-icon leadership-icon-primary">
              <Icon name="ph:users" class="text-primary text-2xl" />
            </div>
            <h3 class="leadership-title">Board of Directors</h3>
          </div>
          <p class="leadership-description">
            Formation of the new board of directors is on the way. The association evaluates organizational performance and board members are voted in yearly.
          </p>
          <div v-if="boards.length > 0" class="md:block hidden">
            <Carousel class="leadership-carousel" :items-to-show="1" snap-align="center" :items-to-scroll="1">
              <Slide v-for="sub in boards" :key="sub" class="w-full">
                <div class="grid grid-cols-2 gap-6">
                  <AboutPersonInfo v-for="(item, i) in sub" :key="i" :item="item" class="person-card" />
                </div>
              </Slide>
              <template #addons>
                <Pagination />
              </template>
            </Carousel>
          </div>
          <div class="max-w-[380px] mx-auto md:hidden">
            <Carousel v-if="boardItems.length > 0" class="leadership-carousel">
              <Slide v-for="item in boardItems" :key="item.id">
                <AboutPersonInfo :item="item" class="person-card" />
              </Slide>
              <template #addons>
                <Pagination />
              </template>
            </Carousel>
            <div v-else class="flex justify-center text-gray-500">
              <p>No board members to display</p>
            </div>
          </div>
        </div>
        
        <!-- Advisory Team -->
        <div class="leadership-card">
          <div class="flex items-center mb-6">
            <div class="leadership-icon leadership-icon-secondary">
              <Icon name="ep:guide" class="text-secondary text-2xl" />
            </div>
            <h3 class="leadership-title">Advisory Team</h3>
          </div>
          <p class="leadership-description">
            Members of the Advisory board are industry experts infusing knowledge and experience to strategic implementation of EYEA.
          </p>
          <div class="md:block hidden">
            <Carousel v-if="advisors.length > 0" class="leadership-carousel" :items-to-show="1" :items-to-scroll="1">
              <Slide v-for="sub in advisors" :key="sub">
                <div class="grid grid-cols-2 gap-6">
                  <AboutPersonInfo v-for="(item, i) in sub" :key="i" :item="item" class="person-card" />
                </div>
              </Slide>
              <template #addons>
                <Pagination />
              </template>
            </Carousel>
            <div v-else class="flex justify-center text-gray-500">
              <p>No advisory members to display</p>
            </div>
          </div>
          <div class="max-w-[380px] mx-auto md:hidden">
            <Carousel v-if="advisorItems.length > 0" class="leadership-carousel">
              <Slide v-for="item in advisorItems" :key="item.id">
                <AboutPersonInfo :item="item" class="person-card" />
              </Slide>
              <template #addons>
                <Pagination />
              </template>
            </Carousel>
            <div v-else class="flex justify-center text-gray-500">
              <p>No advisory members to display</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import necessary components and define reactive data
import { ref } from 'vue';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const boards = ref([]); // Data for board members
const boardItems = ref([]); // Data for mobile view
const advisors = ref([]); // Data for advisory team
const advisorItems = ref([]); // Data for mobile view
</script>

<style scoped>
.leadership-section {
  @apply py-16 md:py-24 bg-gray-50 dark:bg-dark-secondary relative overflow-hidden;
}

.absolute-bg {
  @apply absolute w-full h-full -z-10;
}

.bg-gradient {
  @apply bg-gradient-to-tr from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent;
}

.leadership-card {
  @apply bg-white dark:bg-dark-primary rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 md:p-8;
}

.leadership-icon {
  @apply w-12 h-12 rounded-full flex items-center justify-center mr-4;
}

.leadership-icon-primary {
  @apply bg-primary/20 dark:bg-primary/10;
}

.leadership-icon-secondary {
  @apply bg-secondary/20 dark:bg-secondary/10;
}

.leadership-title {
  @apply text-2xl md:text-3xl font-bold text-gray-900 dark:text-white;
}

.leadership-description {
  @apply text-gray-700 dark:text-gray-300 mb-8;
}

.leadership-carousel {
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