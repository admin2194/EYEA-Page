<template>
  <div class="relative">
    <!-- Header Section -->
    <div class="text-center mb-8 md:mb-12 lg:mb-16 px-4 sm:px-6">
      <h1
        class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#245ca4] mb-4 md:mb-6 animate-fade-in"
      >
        Welcome to the Ethiopian Youth Entrepreneurs Association (EYEA)
      </h1>
      <h2
        class="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#245ca4] animate-fade-in delay-200"
      >
        Empowering the Next Generation of Innovators and Entrepreneurs
      </h2>
    </div>

    <!-- Description Section -->
    <div
      class="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 text-center mb-12 md:mb-16 lg:mb-20 px-4 sm:px-6 leading-relaxed animate-fade-in delay-400"
    >
      At EYEA, we are dedicated to nurturing Ethiopia's youth entrepreneurial spirit. Our mission is to provide young entrepreneurs with the tools, resources, and connections needed to turn innovative ideas into thriving businesses. Through our strategic pillars and initiatives, we strive to build a vibrant ecosystem that promotes collaboration, innovation, and sustainable economic growth.
    </div>
  </div>
</template>

<script setup>
// No additional setup required for this component
</script>

<style scoped>
/* Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-400 {
  animation-delay: 0.4s;
}

/* Responsive Typography Adjustments */
@media (max-width: 640px) {
  .text-3xl {
    font-size: 1.875rem; /* 30px */
    line-height: 2.25rem;
  }
  .text-2xl {
    font-size: 1.5rem; /* 24px */
    line-height: 2rem;
  }
  .text-base {
    font-size: 0.875rem; /* 14px */
    line-height: 1.5rem;
  }
}

/* Dark Mode Adjustments */
@media (prefers-color-scheme: dark) {
  .text-gray-600 {
    color: #d1d5db; /* Lighter gray for better contrast */
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
  }
}
</style>