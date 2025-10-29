<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { ref } from 'vue';

const testimonialCarousel = ref(null);
const testimonialCarousel2 = ref(null);
const testimonialCarousel3 = ref(null);
const emits = defineEmits(["update:modelValue"]);

// Define the props object
const props = defineProps({
  // The value of the model
  modelValue: {
    type: String,
    default: "",
  },
  // Indicates if the component is in a loading state
  loading: {
    type: Boolean,
  },
  // The count of NGOs
  NGO_count: {
    type: Number,
  },
  // The count of private entities
  private_count: {
    type: Number,
  },
  // The count of government entities
  government_count: {
    type: Number,
  },
  // The list of partners
  partners: {
    type: Array,
    required: true,
  },
});

const setting = ref({
  itemsToShow: 1,
  snapAlign: "center",
  wrapAround: true,
});

const breakpoint = ref({
  // 700px and up
  700: {
    itemsToShow: 3,
    snapAlign: "center",
    wrapAround: true,
  },
  // 1024 and up
  1024: {
    itemsToShow: 4,
    snapAlign: "center",
    wrapAround: true,
  },
});

const changeType = (value) => {
  emits("update:modelValue", value);
};
</script>

<template>
  <div
    id="partners"
    class="font-poppins w-full py-12 bg-[#FFF9ED] dark:bg-dark-secondary overflow-hidden"
  >
    <div class="max-w-5xl mx-auto px-4 md:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-dark-primary dark:text-white animation-slide-in">
          Work With Us
        </h2>
        <p class="text-lg text-dark-primary-light dark:text-dark-text-secondary mt-4 animation-slide-in-delay">
          Partnership
        </p>
        <p class="text-xl text-dark-primary-light dark:text-dark-text-secondary mt-2 animation-slide-in-delay">
          The association have signed an operation and cooperation MOUs across a diverse set of organizations in private, nonprofit and government sectors
        </p>
        <p class="text-lg text-dark-primary-light dark:text-dark-text-secondary mt-2 animation-slide-in-delay">
          Below are our esteemed partners and our active MOUs stating our collaboration
        </p>
      </div>

      <!-- Tabs -->
      <TabGroup
        as="div"
        class="w-full flex flex-col items-center space-y-8"
      >
        <TabList as="div" class="flex justify-center w-full mb-8">
          <div class="w-full max-w-2xl flex justify-between border-b border-gray-200 dark:border-gray-700">
            <Tab class="w-1/3 py-2 focus:outline-none" v-slot="{ selected }">
              <button
                @click="changeType('government')"
                :class="[
                  selected
                    ? 'border-b-2 border-primary text-dark-primary font-bold'
                    : 'text-dark-primary-light dark:text-dark-text-secondary',
                  'flex items-center justify-center p-2 mx-auto transition-all duration-300 hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-md'
                ]"
                class="cursor-pointer"
              >
                <Icon name="mdi:city-hall-outline" class="text-xl mr-2 animate-pulse-slow"></Icon>
                <span class="font-semibold">Government ({{ government_count }})</span>
              </button>
            </Tab>
            <Tab class="w-1/3 py-2 focus:outline-none" v-slot="{ selected }">
              <button
                @click="changeType('NGO')"
                :class="[
                  selected
                    ? 'border-b-2 border-primary text-dark-primary font-bold'
                    : 'text-dark-primary-light dark:text-dark-text-secondary',
                  'flex items-center justify-center p-2 mx-auto transition-all duration-300 hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-md'
                ]"
                class="cursor-pointer"
              >
                <Icon name="mdi:handshake-outline" class="text-xl mr-2 animate-pulse-slow"></Icon>
                <span class="font-semibold">NGO ({{ NGO_count }})</span>
              </button>
            </Tab>
            <Tab class="w-1/3 py-2 focus:outline-none" v-slot="{ selected }">
              <button
                @click="changeType('private')"
                :class="[
                  selected
                    ? 'border-b-2 border-primary text-dark-primary font-bold'
                    : 'text-dark-primary-light dark:text-dark-text-secondary',
                  'flex items-center justify-center p-2 mx-auto transition-all duration-300 hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-md'
                ]"
                class="cursor-pointer"
              >
                <Icon name="mdi:briefcase-outline" class="text-xl mr-2 animate-pulse-slow"></Icon>
                <span class="font-semibold">Private ({{ private_count }})</span>
              </button>
            </Tab>
          </div>
        </TabList>
        <TabPanels as="div" class="w-full">
          <TabPanel as="div" class="w-full flex justify-center">
            <div v-if="!loading" class="w-full relative">
              <Carousel
                ref="testimonialCarousel"
                class="max-w-4xl mx-auto px-4"
                :breakpoints="breakpoint"
                :settings="setting"
              >
                <Slide v-for="partner in partners" :key="partner.id" class="p-4">
                  <NuxtLink
                    v-if="partner.mou_content !== ''"
                    :to="`/partners/${partner.id}`"
                    class="partner-card bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      :src="partner.logo_url"
                      alt="Partner Logo"
                      class="max-h-[100px] max-w-[100px] object-contain animate-scale-up"
                    />
                  </NuxtLink>
                  <div
                    v-else
                    class="partner-card bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      :src="partner.logo_url"
                      alt="Partner Logo"
                      class="max-h-[100px] max-w-[100px] object-contain animate-scale-up"
                    />
                  </div>
                </Slide>
                <template #addons>
                  <Pagination
                    class="mt-6 flex justify-center space-x-2"
                  >
                    <span
                      v-for="(item, index) in Math.ceil(partners.length / setting.itemsToShow)"
                      :key="index"
                      :class="[
                        'w-3 h-3 rounded-full cursor-pointer transition-all duration-300',
                        index === testimonialCarousel.currentPage
                          ? 'bg-primary'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                      ]"
                      @click="testimonialCarousel.goTo(index)"
                    ></span>
                  </Pagination>
                  <Navigation
                    class="hidden md:flex mt-4 justify-center space-x-4"
                  >
                    <button
                      @click="testimonialCarousel.prev()"
                      class="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <Icon name="mdi:chevron-left" class="text-xl text-primary dark:text-white animate-bounce-slow"></Icon>
                    </button>
                    <button
                      @click="testimonialCarousel.next()"
                      class="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <Icon name="mdi:chevron-right" class="text-xl text-primary dark:text-white animate-bounce-slow"></Icon>
                    </button>
                  </Navigation>
                </template>
              </Carousel>
            </div>
            <div v-else class="w-full flex justify-center h-full pt-10">
              <Icon
                name="mdi:loading"
                class="text-primary text-3xl mx-auto animate-spin"
              ></Icon>
            </div>
          </TabPanel>
          <TabPanel as="div" class="w-full flex justify-center">
            <div v-if="!loading" class="w-full relative">
              <Carousel
                ref="testimonialCarousel2"
                class="max-w-4xl mx-auto px-4"
                :breakpoints="breakpoint"
                :settings="setting"
              >
                <Slide v-for="partner in partners" :key="partner.id" class="p-4">
                  <NuxtLink
                    v-if="partner.mou_content !== ''"
                    :to="`/partners/${partner.id}`"
                    class="partner-card bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      :src="partner.logo_url"
                      alt="Partner Logo"
                      class="max-h-[100px] max-w-[100px] object-contain animate-scale-up"
                    />
                  </NuxtLink>
                  <div
                    v-else
                    class="partner-card bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      :src="partner.logo_url"
                      alt="Partner Logo"
                      class="max-h-[100px] max-w-[100px] object-contain animate-scale-up"
                    />
                  </div>
                </Slide>
                <template #addons>
                  <Pagination
                    class="mt-6 flex justify-center space-x-2"
                  >
                    <span
                      v-for="(item, index) in Math.ceil(partners.length / setting.itemsToShow)"
                      :key="index"
                      :class="[
                        'w-3 h-3 rounded-full cursor-pointer transition-all duration-300',
                        index === testimonialCarousel2.currentPage
                          ? 'bg-primary'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                      ]"
                      @click="testimonialCarousel2.goTo(index)"
                    ></span>
                  </Pagination>
                  <Navigation
                    class="hidden md:flex mt-4 justify-center space-x-4"
                  >
                    <button
                      @click="testimonialCarousel2.prev()"
                      class="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <Icon name="mdi:chevron-left" class="text-xl text-primary dark:text-white animate-bounce-slow"></Icon>
                    </button>
                    <button
                      @click="testimonialCarousel2.next()"
                      class="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <Icon name="mdi:chevron-right" class="text-xl text-primary dark:text-white animate-bounce-slow"></Icon>
                    </button>
                  </Navigation>
                </template>
              </Carousel>
            </div>
            <div class="w-full flex justify-center h-full pt-10" v-else>
              <Icon
                name="mdi:loading"
                class="text-primary text-3xl mx-auto animate-spin"
              ></Icon>
            </div>
          </TabPanel>
          <TabPanel as="div" class="w-full flex justify-center">
            <div v-if="!loading" class="w-full relative">
              <Carousel
                ref="testimonialCarousel3"
                class="max-w-4xl mx-auto px-4"
                :breakpoints="breakpoint"
                :settings="setting"
              >
                <Slide v-for="partner in partners" :key="partner.id" class="p-4">
                  <NuxtLink
                    v-if="partner.mou_content !== ''"
                    :to="`/partners/${partner.id}`"
                    class="partner-card bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      :src="partner.logo_url"
                      alt="Partner Logo"
                      class="max-h-[100px] max-w-[100px] object-contain animate-scale-up"
                    />
                  </NuxtLink>
                  <div
                    v-else
                    class="partner-card bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      :src="partner.logo_url"
                      alt="Partner Logo"
                      class="max-h-[100px] max-w-[100px] object-contain animate-scale-up"
                    />
                  </div>
                </Slide>
                <template #addons>
                  <Pagination
                    class="mt-6 flex justify-center space-x-2"
                  >
                    <span
                      v-for="(item, index) in Math.ceil(partners.length / setting.itemsToShow)"
                      :key="index"
                      :class="[
                        'w-3 h-3 rounded-full cursor-pointer transition-all duration-300',
                        index === testimonialCarousel3.currentPage
                          ? 'bg-primary'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                      ]"
                      @click="testimonialCarousel3.goTo(index)"
                    ></span>
                  </Pagination>
                  <Navigation
                    class="hidden md:flex mt-4 justify-center space-x-4"
                  >
                    <button
                      @click="testimonialCarousel3.prev()"
                      class="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <Icon name="mdi:chevron-left" class="text-xl text-primary dark:text-white animate-bounce-slow"></Icon>
                    </button>
                    <button
                      @click="testimonialCarousel3.next()"
                      class="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <Icon name="mdi:chevron-right" class="text-xl text-primary dark:text-white animate-bounce-slow"></Icon>
                    </button>
                  </Navigation>
                </template>
              </Carousel>
            </div>
            <div class="w-full flex justify-center h-full pt-10" v-else>
              <Icon
                name="mdi:loading"
                class="text-primary text-3xl mx-auto animate-spin"
              ></Icon>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <!-- Pagination Dot (Optional, based on image) -->
      <div class="absolute bottom-4 right-4">
        <span class="w-3 h-3 bg-primary rounded-full animate-pulse-slow"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base Styles */
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* Partner Card Styling */
.partner-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.95));
  @apply dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  min-height: 150px;
}

/* Animations */
.animation-slide-in {
  animation: slideIn 0.8s ease-out;
}

.animation-slide-in-delay {
  animation: slideIn 0.8s ease-out 0.2s;
}

.animate-pulse-slow {
  animation: pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
}

.animate-bounce-slow {
  animation: bounce 2s infinite ease-in-out;
}

.animate-scale-up {
  animation: scaleUp 1.5s infinite ease-in-out;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes slideIn {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.9; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes scaleUp {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Hover Effects */
.partner-card:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

.partner-card:hover .animate-scale-up {
  animation: scaleUp 1s infinite ease-in-out;
}

/* Tab Styling */
TabList {
  padding-bottom: 1rem;
}

button:focus {
  outline: none;
  box-shadow: none;
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .partner-card {
    max-width: 100%;
  }

  .max-w-5xl {
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .w-full {
    width: 100%;
  }

  .partner-card {
    max-width: 100%;
    min-height: 120px;
  }

  .max-w-5xl {
    max-width: 100%;
  }

  .text-3xl {
    font-size: 2rem;
  }

  .text-xl, .text-lg {
    font-size: 1.125rem;
  }

  .max-w-2xl {
    max-width: 100%;
  }
}

/* Dark Mode Adjustments */
.dark .text-dark-primary {
  color: #283649;
}

.dark .text-dark-primary-light {
  color: #556987;
}

.dark .text-dark-text-secondary {
  color: #BBC3CF;
}

.dark .border-gray-200 {
  border-color: #4a5568;
}

.dark .bg-white {
  background: #2d3748;
}

/* Navigation Button Styling */
button {
  @apply transition-all duration-300;
}

button:hover {
  @apply text-primary-dark bg-gray-100 dark:bg-gray-700 rounded-t-md;
}

/* Ensure overflow is handled gracefully */
.overflow-hidden {
  overflow: hidden;
}

/* Pagination Dot Styling */
.bg-primary {
  background-color: #FFBE40;
}
</style>