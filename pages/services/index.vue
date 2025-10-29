<script setup>
import { onMounted, ref } from 'vue';

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <div>
    <NavBar nav-class="bg-[#215ca3]/25 dark:bg-dark-primary backdrop-blur-lg"/>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <!-- Hero Section -->
      <div class="relative py-24 sm:py-32 bg-gradient-to-b from-[#215ca3]/30 dark:from-[#215ca3]/20">
        <div class="absolute inset-0 bg-pattern opacity-10 dark:opacity-20" />
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="text-center">
            <Transition appear name="fade-down">
              <h1 class="text-6xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
                Services
              </h1>
            </Transition>
            <div class="mt-6 h-1 w-24 bg-[#215ca3] mx-auto rounded-full" />
          </div>
        </div>
      </div>

      <!-- Services Content -->
      <div class="mx-auto max-w-7xl px-6 lg:px-8 py-24 space-y-32">
        <!-- Capacity Building Section -->
        <Transition appear name="fade-up">
          <div id="capacity_building" class="service-section">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div class="space-y-8">
                <div class="inline-flex items-center space-x-3 bg-[#15151c]/20 px-4 py-2 rounded-full">
                  <Icon name="humbleicons:bulb-off" class="text-2xl text-[#e71d37]" />
                  <span class="text-[#e71d37] font-semibold">Capacity Building</span>
                </div>
                <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  The Association works to build the capacity of its member entrepreneurs and businesses. This service
                  involves providing members with opportunities, resources, and support to enhance their knowledge,
                  skills, and capabilities in various aspects of entrepreneurship and business management.
                </p>

                <!-- Kena Card -->
                <div class="relative mt-12 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div class="absolute -top-10 right-8 w-20 h-20 conerDiv bg-[#] flex items-center justify-center rounded-2xl transform hover:scale-105 transition-transform">
                    <img src="@/assets/images/logos/kena_logo.png" class="w-8 h-8" alt="Kena Logo" />
                  </div>
                  <h3 class="text-2xl font-bold text-[#e71d37] dark:text-white mb-4">Kena</h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Kena is a capacity-building service product of the EYEA, with an objective to provide training,
                    mentorship, access to finance, and market exposure to youth-founded or run businesses.
                  </p>
                  <a href="https://kena.eyea.et/" target="_blank" 
                     class="inline-flex items-center mt-6 text-[#15151c] hover:text-[#1a4a7a]">
                    <span>Explore More</span>
                    <Icon name="jam:arrow-up-right" class="ml-2 text-xl" />
                  </a>
                </div>
              </div>

              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-[#e71d37]/20 to-[#15151c]/50 dark:from-[#fcb217]/10 dark:to-[#369d65]/10 rounded-3xl transform -rotate-6" />
                <img src="@/assets/images/kena-banner.png" 
                     class="relative rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                     alt="Capacity Building" />
              </div>
            </div>
          </div>
        </Transition>

        <!-- Advocacy Section -->
        <Transition appear name="fade-up">
          <div id="advocacy" class="service-section">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div class="relative order-2 lg:order-1">
                <div class="absolute inset-0 bg-gradient-to-r from-[#34126c]/50 to-[#0d8e32]/20 dark:from-[#215ca3]/70 dark:to-[#fcb217]/10 rounded-3xl transform rotate-6" />
                <img src="@/assets/images/service-advocacy.png" 
                     class="relative rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                     alt="Advocacy" />
              </div>

              <div class="space-y-8 order-1 lg:order-2">
                <div class="inline-flex items-center space-x-3 bg-[#0d8e32]/20 px-4 py-2 rounded-full">
                  <Icon name="grommet-icons:announce" class="text-2xl text-[#34126c]" />
                  <span class="text-[#34126c] font-semibold">Advocacy</span>
                </div>
                <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  This is one of the areas EYEA has become successful within a short period of time. EYEA launched a
                  regular monthly policy advocacy and networking platform titled "Zelela".
                </p>

                <!-- Zelela Card -->
                <div class="relative mt-12 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div class="absolute -top-10 right-8 w-20 h-20 conerDiv bg-[] flex items-center justify-center rounded-2xl transform hover:scale-105 transition-transform">
                    <img src="@/assets/images/logos/zelela_logo.png" class="w-8 h-8" alt="Zelela Logo" />
                  </div>
                  <h3 class="text-2xl font-bold text-[#34126c] dark:text-white mb-4">Zelela</h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Zelela is designed to sound inputs of policy advocacy activities that enables every stakeholder
                    and concerned bodies in innovation driven entrepreneurial ecosystem.
                  </p>
                  <a href="https://zelela.eyea.et/" target="_blank" 
                     class="inline-flex items-center mt-6 text-[#0d8e32] hover:text-[#d89a14]">
                    <span>Explore More</span>
                    <Icon name="jam:arrow-up-right" class="ml-2 text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Network & Exposure Section -->
        <Transition appear name="fade-up">
          <div id="network_and_exposer" class="service-section">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div class="space-y-8">
                <div class="inline-flex items-center space-x-3 bg-[#369d65]/20 px-4 py-2 rounded-full">
                  <Icon name="streamline:interface-arrows-data-transfer-diagonal-arrows-arrow-server-data-diagonal-internet-transfer-network" 
                        class="text-2xl text-[#215ca3]" />
                  <span class="text-[#215ca3] font-semibold">Network & Exposure</span>
                </div>
                <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  EYEA works to create networks between members and help entrepreneurs learn from each other as well as
                  create market linkages. EYEA has partnered with several institutions including government ministries,
                  financial institutions, and associations.
                </p>

                <!-- Experience Sharing Card -->
                <div class="relative mt-12 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div class="absolute -top-10 right-8 w-20 h-20 conerDiv bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-2xl transform hover:scale-105 transition-transform">
                    <Icon name="streamline:interface-arrows-data-transfer-diagonal-arrows-arrow-server-data-diagonal-internet-transfer-network" 
                          class="text-2xl text-[#369d65]" />
                  </div>
                  <h3 class="text-2xl font-bold text-black dark:text-white mb-4">Experience sharing</h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    EYEA is working with international ecosystem actors to offer a diverse set of exposure to its
                    members and to the Ethiopian youth through business expos and delegation visits.
                  </p>
                </div>
              </div>

              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-[#215ca3]/20 to-[#215ca3]/20 dark:from-[#369d65]/10 dark:to-[#fcb217]/10 rounded-3xl transform -rotate-6" />
                <img src="@/assets/images/service-network-and-exposure.png" 
                     class="relative rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                     alt="Network and Exposure" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <LayoutFooter />
  </div>
</template>

<style scoped>
.service-section {
  @apply relative;
}

.service-section::before {
  content: '';
  @apply absolute w-full h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-800 to-transparent opacity-0 transition-opacity duration-300;
  top: 50%;
  transform: translateY(-50%);
}

.service-section:hover::before {
  @apply opacity-100;
}

.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.conerDiv {
  clip-path: polygon(100% 0, 100% 50%, 67% 100%, 0% 100%, 0 50%, 0% 0%);
}

/* Vue Transitions */
.fade-up-enter-active,
.fade-up-leave-active,
.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 0.5s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-up-leave-to,
.fade-down-leave-to {
  opacity: 0;
}

* {
  @apply transition-colors duration-300;
}
</style>