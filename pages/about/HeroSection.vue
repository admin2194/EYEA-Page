<template>
  <section class="hero-section relative overflow-hidden">
    <!-- Background design elements -->
    <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-light/10 to-white/0 dark:from-primary/5 dark:to-dark-primary/0 -z-10"></div>
    <div class="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl -z-10"></div>
    <div class="absolute bottom-20 -left-20 w-80 h-80 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl -z-10"></div>

    <div class="container mx-auto px-4 py-16 md:py-24 lg:py-32">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-5 relative z-10">
          <h1 class="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            <span class="text-primary">Empowering</span> Young Ethiopian Entrepreneurs
          </h1>
          <div class="w-24 h-1 bg-primary mb-6"></div>
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Founded to address the challenges facing young Ethiopian entrepreneurs in their pursuit of success and innovation.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/join">
              <button class="btn-primary">
                Join Us
                <Icon name="heroicons:arrow-right" class="ml-2" />
              </button>
            </NuxtLink>
            <button class="btn-outline">
              Learn More
              <Icon name="heroicons:information-circle" class="ml-2" />
            </button>
          </div>
        </div>
        <div class="lg:col-span-7 relative">
          <div class="relative bg-white dark:bg-dark-secondary rounded-xl shadow-xl p-6 md:p-10">
            <div class="absolute -top-10 -left-10 text-[120px] md:text-[180px] font-black text-primary/10 dark:text-primary/5 leading-none z-0">EYEA</div>
            <div class="relative z-10">
              <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">How We Started</h2>
              <div class="prose prose-lg dark:prose-invert max-w-none">
                <p class="mb-4">
                  The Ethiopian Youth Entrepreneurs Association (EYEA) is a registered association established to address the challenges facing young Ethiopian entrepreneurs.
                </p>
                <p class="mb-4">
                  EYEA was founded by young Ethiopian startups who experienced firsthand the obstacles within the ecosystem.
                </p>
                <p>
                  We strongly believe young people must be change-makers and problem solvers.
                </p>
              </div>
            </div>
            <img class="absolute -right-6 -bottom-6 w-28 h-28 md:w-40 md:h-40 opacity-50" src="@/assets/images/shapes/riverShape.svg" alt="Decorative shape" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  @apply relative overflow-hidden;
}

.absolute-bg {
  @apply absolute top-0 left-0 w-full h-full -z-10;
}

.bg-gradient {
  @apply bg-gradient-to-b from-primary-light/10 to-white/0 dark:from-primary/5 dark:to-dark-primary/0;
}

.bg-blob {
  @apply absolute rounded-full blur-3xl;
}

.bg-blob-top-right {
  @apply -top-20 -right-20 w-64 h-64 bg-primary/10 dark:bg-primary/5;
}

.bg-blob-bottom-left {
  @apply bottom-20 -left-20 w-80 h-80 bg-secondary/10 dark:bg-secondary/5;
}

.hero-content {
  @apply container mx-auto px-4 py-16 md:py-24 lg:py-32;
}

.hero-grid {
  @apply grid grid-cols-1 lg:grid-cols-12 gap-8 items-center;
}

.hero-left {
  @apply lg:col-span-5 relative z-10;
}

.hero-title {
  @apply text-4xl md:text-5xl xl:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight;
}

.hero-title-highlight {
  @apply text-primary;
}

.hero-divider {
  @apply w-24 h-1 bg-primary mb-6;
}

.hero-description {
  @apply text-lg text-gray-700 dark:text-gray-300 mb-8;
}

.hero-actions {
  @apply flex flex-wrap gap-4;
}

.hero-right {
  @apply lg:col-span-7 relative;
}

.hero-card {
  @apply relative bg-white dark:bg-dark-secondary rounded-xl shadow-xl p-6 md:p-10;
}

.hero-card-title {
  @apply text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white;
}

.hero-card-content {
  @apply relative z-10;
}

.hero-card-shape {
  @apply absolute -right-6 -bottom-6 w-28 h-28 md:w-40 md:h-40 opacity-50;
}
</style>