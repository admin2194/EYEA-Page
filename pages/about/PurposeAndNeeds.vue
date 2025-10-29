<template>
  <section class="purpose-needs-section bg-gradient-to-br from-[#FFF9ED] to-[#FFF0D2] dark:from-dark-secondary dark:to-dark-secondary/90 py-16 md:py-24">
    <div class="container mx-auto px-4">
      <LayoutSectionHeader
        iconName="fluent-emoji-high-contrast:open-mailbox-with-lowered-flag"
        title="Purpose and Needs"
        subtitle="Understanding our purpose and supporting our cause"
      />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-12">
        <div class="purpose-card bg-white/70 dark:bg-dark-primary/50 rounded-xl p-6 md:p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/10 flex items-center justify-center mr-4">
              <Icon name="ri:ruler-line" class="text-primary text-2xl" />
            </div>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Our Purpose</h3>
          </div>
          <div class="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              EYEA's existence is driven by its aim of creating a conducive environment for Ethiopian youth to pursue entrepreneurship.
            </p>
          </div>
        </div>
        <div class="needs-card bg-white/70 dark:bg-dark-primary/50 rounded-xl p-6 md:p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 rounded-full bg-secondary/20 dark:bg-secondary/10 flex items-center justify-center mr-4">
              <Icon name="mdi:dna" class="text-secondary text-2xl" />
            </div>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Our Needs</h3>
          </div>
          <div class="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              As an association, EYEA has been operational for the past 3 years with the support of members and development partners.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  // You can add any necessary imports or reactive state here
</script>

<style scoped>
.purpose-needs-section {
  @apply bg-gradient-to-br from-[#FFF9ED] to-[#FFF0D2] dark:from-dark-secondary dark:to-dark-secondary/90 py-16 md:py-24;
}

.purpose-card,
.needs-card {
  @apply bg-white/70 dark:bg-dark-primary/50 rounded-xl p-6 md:p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1;
}

.purpose-icon,
.needs-icon {
  @apply w-12 h-12 rounded-full flex items-center justify-center mr-4;
}

.purpose-icon {
  @apply bg-primary/20 dark:bg-primary/10;
}

.needs-icon {
  @apply bg-secondary/20 dark:bg-secondary/10;
}

.purpose-title,
.needs-title {
  @apply text-2xl md:text-3xl font-bold text-gray-900 dark:text-white;
}

.purpose-content,
.needs-content {
  @apply space-y-4 text-gray-700 dark:text-gray-300;
}
</style>