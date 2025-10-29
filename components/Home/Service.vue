<script setup>
const services = [
  {
    id: 'capacity_building',
    title: 'CAPACITY BUILDING',
    description: 'The Association works to build the capacity of its member entrepreneurs and businesses. This service involves providing members with opportunities, resources, and support to enhance their knowledge, skills, and capabilities in various aspects of entrepreneurship and business management. It provides training, business development services, mentorship, coaching, and other activities to this end. To develop competencies, capacity building covers areas such as financial management, marketing strategies, leadership skills, and innovation. Knowledge sharing platforms and industry insights are also part of this pillar.',
    icon: 'mdi:lightbulb-outline', // Modern icon for capacity building
  },
  {
    id: 'advocacy',
    title: 'ADVOCACY',
    description: 'This is one of the areas EYEA has become successful within a short period of time. EYEA launched a regular monthly policy advocacy and networking platform titled “Zelela” – meaning a bunch in Amharic language, signifying harmony for a cause. This is a platform which is geared towards creating a favorable business environment and policies supporting youth entrepreneurship in Ethiopia to have access to finance, capacity, and work towards a connected entrepreneurial and startup ecosystem.',
    icon: 'mdi:bullhorn-outline', // Modern icon for advocacy
  },
  {
    id: 'network_and_exposure',
    title: 'NETWORK & EXPOSURE',
    description: 'EYEA works to create networks between members and help entrepreneurs learn from each other as well as create market linkages. EYEA has partnered with several institutions including government ministries, financial institutions, and associations to achieve this pillar. The association has more than 400 members for which it will create a networking platform that includes experience sharing both locally and internationally. Some of these entrepreneurs are start-ups while others have grown and become medium and large-sized enterprises.',
    icon: 'mdi:share-variant-outline', // Modern icon for network & exposure
  },
];
</script>

<template>
  <div
    id="service"
    class="relative from-white to-[#349c54]/20 dark:from-gray-900 dark:to-[#245ca4]/20 overflow-hidden isolate"
  >
    <LayoutSectionHeader
      iconName="uil:shop"
      title="What Our"
      subtitle="Services"
      class="mb-12"
    ></LayoutSectionHeader>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
      <NuxtLink
        v-for="(service, index) in services"
        :key="index"
        :to="`/services/#${service.id}`"
        class="service-card transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      >
        <div
          class="element relative rounded-t-2xl primary-light to-blue-600 p-6 flex justify-center items-center"
        >
          <Icon
            :name="service.icon"
            color="white"
            class="text-5xl animate-pulse-slow"
          ></Icon>
        </div>
        <div class="p-6 space-y-4">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ service.title }}
          </h3>
          <p
            class="leading-relaxed text-gray-600 dark:text-gray-300 text-base text-justify"
          >
            {{ service.description }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Base Styles */
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* Service Card Element (Icon Container) */
.element {
  float: right;
  shape-outside: rectangle(0, 0, 100%, 100%);
  @apply 2xl:w-36 2xl:h-28 w-24 h-24 2xl:pl-4 2xl:pb-4 pl-2 pb-2;
}

/* Service Card Styling */
.service-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 245, 245, 0.9));
  @apply dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* Animation for Icons */
.animate-pulse-slow {
  animation: pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
}

/* Hover Effects */
.service-card:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.service-card:hover .element {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .service-card {
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }

  .service-card {
    max-width: 100%;
  }

  .element {
    @apply w-20 h-20 pl-2 pb-2;
  }

  .text-2xl {
    font-size: 1.5rem;
  }

  .text-base {
    font-size: 0.875rem;
  }
}

/* Dark Mode Adjustments */
.dark .service-card {
  border-color: #4a5568;
}

.dark .text-gray-900 {
  color: #e2e8f0;
}

.dark .text-gray-600 {
  color: #a0aec0;
}

/* Additional Styling for Smooth Transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: ease-in-out;
}

/* Ensure overflow is handled gracefully */
.overflow-hidden {
  overflow: hidden;
}
</style>