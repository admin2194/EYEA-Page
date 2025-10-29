<script setup>
import { ref, computed } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import list from "@/composable/query/list";
import get_list from "@/API/queries/partner/get_partners.gql";

// Reactive variables for data fetching
const items = ref([]);
const items2 = ref([]);
const offset = ref(0);
const limit = ref(60);
const type = ref("government");
const privates = ref(0);
const government = ref(0);
const NGO = ref(0);

// Computed filter for GraphQL query
const filter = computed(() => ({
  _and: [{ type: { _eq: type.value } }]
}));

// Fetch data using the list composable
const { onResult, loading } = list(get_list, {
  limit,
  offset,
  filter,
});

// Update reactive variables with fetched data
onResult((result) => {
  items.value = result.data.items;
  items2.value = result.data.items2;
  privates.value = result.data.private_count.aggregate.count;
  government.value = result.data.government_count.aggregate.count;
  NGO.value = result.data.NGO_count.aggregate.count;
});

// Mock partners data (replace with actual fetched data if needed)
const partners = ref({
  government: [
    { id: 1, name: 'Ministry of Innovation & Technology', logo: 'data:image/jpeg;base64,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', sector: 'Government', mou_content: true },
    { id: 2, name: 'Information Network Security Agency (INSA)', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Logo_of_Ethiopian_INSA.png', sector: 'Government', mou_content: true },
    { id: 3, name: 'Ministry of Education (Ethiopia)', logo: 'https://ethiojobs.b-cdn.net/wp-content/uploads/2020/10/Ministry-of-Education-Ethiopia-Logo.jpg', sector: 'Government', mou_content: true },
    { id: 4, name: 'Ethiopian Intellectual Property Authority-EIPA', logo: 'https://eipa.gov.et/wp-content/uploads/2021/11/logo-eipa.jpg', sector: 'Government', mou_content: true },
    { id: 3, name: 'Development Bank of Ethiopia (DBE)', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Development_Bank_of_Ethiopia.png', sector: 'Government', mou_content: true },
    { id: 4, name: 'Entrepreneurship Development Institute', logo: 'https://effoysira.com/wp-content/uploads/2025/02/Entrepreneurship-Development-Institute-Vacancy.webp', sector: 'Government', mou_content: true },
    { id: 5, name: 'FDRE Authority for Civil Society Organizations - ACSO', logo: 'https://acso.gov.et/wp-content/uploads/2025/01/logo.png', sector: 'Government', mou_content: true },
    { id: 6, name: 'Ministry of Foreign Affairs', logo: 'https://aspyee.org/sites/default/files/2023-11/2_0.jpg', sector: 'Government', mou_content: true },
    { id: 7, name: 'Ministry of Trade & Regional integration', logo: 'https://www.thereporterethiopia.com/wp-content/uploads/2024/11/Trade-Ministry-clamps-down-on-cement.jpg', sector: 'Government', mou_content: true },
    { id: 8, name: 'Commercial Bank of Ethiopia (CBE)', logo: 'https://psssa.gov.et/sites/default/files/partner/cbe-logo.png', sector: 'Government', mou_content: true },
    { id: 9, name: 'Ministry of Women and Social Affairs', logo: 'https://tse1.mm.bing.net/th?id=OIP.R7IJNK_puMOJFW5Q1Ul4KAHaHa&pid=Api', sector: 'Government', mou_content: true },
    { id: 10, name: 'Ministry of Labor and Skills (MoLS)', logo: 'https://i0.wp.com/awaqi.org/wp-content/uploads/2022/03/MoLS-Final-Logo.png?fit=10087%2C2801&ssl=1', sector: 'Government', mou_content: true },
    { id: 11, name: 'ITDB - Innovation and Technology Development Bureau', logo: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRYsqM_Bm5JJvqEvKSUoMGZxrsEcfeZC5q0MW_KWsDZKnMbWY-r', sector: 'Government', mou_content: true },
    { id: 12, name: 'Ethio telecom', logo: 'https://oauthteledrive.ethiotelecom.et/ethio_tel_logo_250.png', sector: 'Government', mou_content: true },
    { id: 13, name: 'Fayda ID | የፋይዳ መታወቂያ', logo: 'https://play-lh.googleusercontent.com/tx1qrpGe0b6uBTadJqLqF64_HW-ehqnH_00J5L5CxjtDPu84eDgnDvSD5d9OTHe3Suw', sector: 'Government', mou_content: true },
    { id: 14, name: 'National Bank of Ethiopia', logo: 'https://shega.co/_next/image?url=https%3A%2F%2Fshegastrpool.blob.core.windows.net%2Fmedia-prod%2Fmedia-prod%2Fphoto_2024_10_15_18_56_14_897ef48641.webp&w=1920&q=75', sector: 'Government', mou_content: true },
    { id: 15, name: 'Ministry of Finance and Economic Development', logo: 'https://upload.wikimedia.org/wikipedia/en/3/38/Ministry_of_Finance_%28Ethiopia%29_Flag.png', sector: 'Government', mou_content: true },
    { id: 16, name: 'Ethiopian Securities Exchange (ESX)', logo: 'https://www.fanabc.com/english/wp-content/uploads/2024/08/jzoMuXNP_400x400.jpg', sector: 'Government', mou_content: true },
  ],
  ngo: [
    { id: 1, name: 'Ethiopian Diaspora Service', logo: 'https://www.fanabc.com/english/wp-content/uploads/2024/09/FB_IMG_17254748266686413-526x430.jpg', sector: 'NGO', mou_content: true },
    { id: 2, name: 'Ethiopian Diaspora Trust Fund', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3X9ouo2VwzFls58_rVkKl52c86NpV4KZeHSOPR7OKT3-ALaJCLJVHaGi-cJzspDxtqA&usqp=CAU', sector: 'NGO', mou_content: true },
    { id: 4, name: 'Mastercard Foundation', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/MCF_Logo.jpg', sector: 'NGO', mou_content: true },
    { id: 5, name: 'Club des Jeunes Entrepreneurs Djibouti', logo: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTQHAgI7peCDOWl4HTmZRAahsNvXqwL-ZoFxFEwA_OJ6CLCQM67', sector: 'NGO', mou_content: true },
    { id: 5, name: 'Women\'s World Banking', logo: 'https://upload.wikimedia.org/wikipedia/en/7/72/Women%27s_World_Banking_Logo.png', sector: 'NGO', mou_content: true },
    { id: 6, name: 'STEMpower', logo: 'https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t1.6435-9/97546135_2285372978437884_4776757258178527232_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=4LeeYU8e97wQ7kNvgGPIc3O&_nc_oc=Adh722R4H_48-OBuSeihJxVZQha1jNRW4alrDmYSP7nQV-5r6JlJNNBYbFI5CCX6n8Q&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=4SvLyGI3BiJco77UHGDf7Q&oh=00_AYECzzE7j3zq83TLrn6DB2rCbKDtnxkA7TLU2WU3HjKdoQ&oe=67FD6141', sector: 'NGO', mou_content: true },
    { id: 6, name: 'Center for International Private Enterprise (CIPE)', logo: 'https://www.cipe.org/wp-content/uploads/2025/02/cipe-log-white-451x363.png', sector: 'NGO', mou_content: true },
    { id: 6, name: 'United Nations Development Programme (UNDP)', logo: 'https://www.ethyp.com/img/et/e/1634669322-60-united-nations-development-program-undp.jpg', sector: 'NGO', mou_content: true },
    { id: 7, name: 'ATD-Ethiopia', logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQE8BBeUA4Iz3A/company-logo_200_200/company-logo_200_200/0/1695454924260/atd_ethiopia_logo?e=2147483647&v=beta&t=Nx_XeTjIFdITkPpdOse3MYaK9ttfYBgS9GOFaYCSioU', sector: 'NGO', mou_content: true },
    { id: 6, name: 'United Nations Conference on Trade and Development (UNCTAD)', logo: 'https://habitat3.org/wp-content/uploads/UNTT-Logo_35.jpg', sector: 'NGO', mou_content: true },
    { id: 6, name: 'Deutsche Gesellschaft für Internationale Zusammenarbeit GmbH', logo: 'https://unitir.edu.al/wp-content/uploads/2021/07/GIZ.png', sector: 'NGO', mou_content: true },
  ],
  private: [
    { id: 7, name: 'Kazana Group', logo: 'https://pragma-advisory.com/wp-content/uploads/2020/11/kazana.png', sector: 'Private', mou_content: true },
    { id: 8, name: 'Association of Chartered Certified Accountants', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/ACCA_logo.svg', sector: 'Private', mou_content: true },
    { id: 7, name: 'Melela Partners', logo: 'https://melela-partners.com/wp-content/uploads/2024/02/Melela-Logo-2-1-1024x454.png', sector: 'Private', mou_content: true },
    { id: 8, name: 'Hibret Bank', logo: 'https://business.linkupaddis.com/wp-content/uploads/2021/07/51B0D04F-E239-4F22-9AC7-1EAF33317854.jpeg', sector: 'Private', mou_content: true },
    { id: 9, name: 'Renew Capital', logo: 'https://mms.businesswire.com/media/20220929005659/en/1587210/23/Renew_Capital_logo_dark.jpg', sector: 'Private', mou_content: true },
    { id: 10, name: 'DCT entertainment', logo: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcROxrVxfdkqR8Qqp2TGRxcX9CjWFhgN0_V3n2iwZalrr6jzWh7_', sector: 'Private', mou_content: true },
    { id: 11, name: 'One Take Production', logo: 'https://static10.tgstat.ru/channels/_100/bd/bd5fa1a48f5a426b41103d98b99307a1.jpg', sector: 'Private', mou_content: true },
    { id: 12, name: 'Ethio Legal Shield', logo: 'https://ethioadvert.com/wp-content/uploads/listing-uploads/logo/2025/01/35997.png', sector: 'Private', mou_content: true },
    { id: 10, name: 'Pragma Investment Advisory', logo: 'https://pragma-advisory.com/wp-content/uploads/2018/11/pragmaDarkblue.png', sector: 'Private', mou_content: true },
  ]
});

// Categories with dynamic counts
const categories = ref([
  {
    id: 'government',
    label: 'Government Entities',
    icon: 'heroicons:building-library-20-solid',
    count: computed(() => partners.value.government.length)
  },
  {
    id: 'ngo',
    label: 'Global NGOs',
    icon: 'heroicons:globe-americas-20-solid',
    count: computed(() => partners.value.ngo.length)
  },
  {
    id: 'private',
    label: 'Corporate Partners',
    icon: 'heroicons:briefcase-20-solid',
    count: computed(() => partners.value.private.length)
  }
]);

const activeCategory = ref('government');

// Reasons for partnering (static data)
const reasons = [
  {
    icon: "mdi:hand-coin-outline",
    title: "Support Start-ups",
    description: "EYEA is a non-profitable association working to support the creation of an active start-up ecosystem."
  },
  {
    icon: "uil:briefcase-alt",
    title: "Youth Employment",
    description: "The Association works to help youth entrepreneurs realize their business ideas and create jobs."
  },
  {
    icon: "icon-park-outline:people-top",
    title: "Social Impact",
    description: "We support entrepreneurs working towards social and environmental goals."
  },
  {
    icon: "wpf:future",
    title: "Market Opportunities",
    description: "We focus on building relationships within the youth market segment."
  },
  {
    icon: "iconoir:agile",
    title: "Agility",
    description: "We adapt quickly to changes and embrace new technologies."
  },
  {
    icon: "uil:lightbulb-alt",
    title: "Innovative Perspectives",
    description: "Tap into the youth’s innovative spirit and fresh perspectives."
  }
];

// Image fallback handler
const addImageFallback = (event) => {
  event.target.src = '/placeholder-logo.svg';
};
</script>

<template>
  <div>
    <!-- Navigation -->
    <NavBar nav-class="bg-[#B5B5B53B] backdrop-blur-md dark:bg-dark-primary/95" />

    <!-- Hero Section -->
    <div class="relative min-h-[80vh] flex items-center justify-center partnersBackground">
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 dark:from-black/70 dark:to-black/80"></div>
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <Transition appear name="fade-up">
          <div class="text-center space-y-8">
            <div class="relative mx-auto w-32 h-32 mb-8">
              <img src="@/assets/images/temp/joint_venture.png" 
                   alt="Partnership" 
                   class="w-full h-full object-contain animate-float" />
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Partner with the Ethiopian Youth Entrepreneurs Association
            </h1>
            <p class="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              We are actively working to acquire new partners to help achieve our goals 
              and objectives in offering a diverse set of services to the Ethiopian youth.
            </p>
            <NuxtLink to="/supports#membership" class="inline-block mt-8 group">
              <button class="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-lg
                             transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                             flex items-center space-x-3">
                <Icon name="heroicons:hand-raised" class="text-2xl group-hover:rotate-12 transition-transform" />
                <span>Express Interest of Partnership</span>
              </button>
            </NuxtLink>
            <div class="mt-16">
              <LayoutPartenredWith :partners="items2" />
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Partners Section -->
    <section class="py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20 animate-fade-in">
        <span class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-[#215ca3] dark:text-primary-light font-medium text-sm mb-6">
            <Icon name="mdi:handshake-outline" class="w-5 h-5 mr-2" />
            Strategic Collaborations
        </span>
        <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Driving global progress through strategic partnerships across sectors and borders
        </p>
        </div>

        <!-- Partners Content -->
        <div class="max-w-6xl mx-auto">
        <TabGroup v-model="activeCategory" vertical>
            <div class="flex flex-col lg:flex-row gap-8">
            <!-- Category Selector -->
            <TabList class="flex flex-col space-y-3 lg:w-72">
                <Tab 
                v-for="category in categories" 
                :key="category.id"
                v-slot="{ selected }"
                as="template"
                >
                <button :class="[
                    'w-full text-left px-6 py-4 rounded-xl transition-all duration-300',
                    'border-2 hover:border-primary/30',
                    selected 
                    ? 'bg-white dark:bg-gray-800 border-primary shadow-xl'
                    : 'border-transparent bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700'
                ]">
                    <div class="flex items-center space-x-4">
                    <div class="p-2 rounded-lg bg-primary/10">
                        <Icon :name="category.icon" class="w-6 h-6 text-[#215ca3]" />
                    </div>
                    <div>
                        <span class="block font-semibold text-[#215ca3] dark:text-gray-100">{{ category.label }}</span>
                        <span class="block text-sm text-[#369d65] dark:text-primary-light mt-1">
                        {{ category.count }} Global Partners
                        </span>
                    </div>
                    </div>
                </button>
                </Tab>
            </TabList>

            <!-- Enhanced Partners Grid -->
            <TabPanels class="flex-1 animate-fade-in">
                <TabPanel 
                v-for="category in categories" 
                :key="category.id"
                class="space-y-8"
                >
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    <div 
                    v-for="partner in partners[category.id]" 
                    :key="partner.id"
                    class="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
                    >
                    <NuxtLink :to="`/partners/${partner.id}`" class="block">
                        <div class="flex flex-col items-center space-y-4">
                        <!-- Logo Container with Floating Effect -->
                        <div class="relative w-full h-24 flex items-center justify-center p-4 perspective-1000">
                            <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-100/50 dark:from-primary/10 dark:to-blue-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div class="relative transform transition-transform duration-500 group-hover:rotate-y-12">
                            <img 
                                :src="partner.logo" 
                                :alt="partner.name"
                                class="max-h-16 w-auto transform transition-all duration-300 group-hover:scale-110"
                                loading="lazy"
                            />
                            </div>
                        </div>
                        
                        <!-- Dynamic Content Reveal -->
                        <div class="text-center space-y-2 overflow-hidden">
                            <h3 class="font-semibold text-[#215ca3] dark:text-white text-lg leading-tight transform transition-all duration-300 group-hover:text-primary">
                            {{ partner.name }}
                            </h3>
                            <p class="text-sm text-[#369d65] dark:text-primary-light font-medium translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                            {{ partner.sector }}
                            </p>
                            <div class="flex flex-wrap justify-center gap-2 max-h-0 group-hover:max-h-20 transition-all duration-300 opacity-0 group-hover:opacity-100">
                            <span 
                                v-for="(tag, index) in partner.tags" 
                                :key="index"
                                class="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                            >
                                {{ tag }}
                            </span>
                            </div>
                        </div>
                        </div>
                    </NuxtLink>
                    </div>
                </div>
                </TabPanel>
            </TabPanels>
            </div>
        </TabGroup>
        </div>
    </div>
    </section>

    <!-- Why Partner Section -->
    <div class="py-20" style="background-color: #215ca3;">
      <div class="absolute right-0 bottom-0 opacity-10">
        <NuxtImg format="webp" 
                 loading="lazy"
                 src="https://res.cloudinary.com/blue-sky/image/upload/v1690980105/flowerShape_bkwvfq.svg"
                 class="w-96" />
      </div>
      <div class="max-w-7xl mx-auto px-6">
        <Transition appear name="fade-up">
          <div class="text-center mb-16">
            <span class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Icon name="mdi:partnership-outline" class="mr-2" />
              Why Partner
            </span>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              Why should you partner with us?
            </h2>
            <p class="text-white max-w-3xl mx-auto">
              EYEA works with government, non-government, and private sector partners to achieve
              its objective of building an active start-up and youth entrepreneurship ecosystem in Ethiopia.
            </p>
          </div>
        </Transition>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Transition v-for="(reason, index) in reasons" 
                      :key="index"
                      appear 
                      name="fade-up">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg
                        transform hover:-translate-y-1 transition-all duration-300">
              <div class="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Icon :name="reason.icon" class="text-2xl text-primary" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {{ reason.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ reason.description }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <LayoutFooter />
  </div>
</template>

<style scoped>
.partnersBackground {
  background-image: url("/assets/images/temp/partners.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-up-enter-active,
.fade-down-enter-active {
  transition: all 0.5s ease-out;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth transitions for hover effects */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.perspective-1000 {
  perspective: 1000px;
}

.rotate-y-12 {
  transform: rotateY(12deg);
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Initial state for tags container */
.group-hover\:max-h-20 {
  max-height: 5rem;
}
</style>