<script setup>
import { ref } from 'vue';

const partnered = ref([
  { id: 1, url: "https://cdn.hahu.jobs/public/eyea/partners/eyea_sZscCf_1697282684" },
  { id: 2, url: "https://cdn.hahu.jobs/public/eyea/partners/mint.png" },
  { id: 3, url: "https://cdn.hahu.jobs/public/eyea/partners/eyea_wLGWeE_1697275924" },
  { id: 4, url: "https://cdn.hahu.jobs/public/eyea/partners/eyea_kvBfhN_1697277745" },
  { id: 5, url: "https://cdn.hahu.jobs/public/eyea/partners/eyea_Iadupt_1697285083" },
]);

const DonateVia = ref([
  { id: 1, url: "https://upload.wikimedia.org/wikipedia/en/a/a4/Telebirr.png", name: "TeleBirr" },
  { id: 3, url: "https://brandlogos.net/wp-content/uploads/2022/07/visa_inc-logo_brandlogos.net_iai1b.png", name: "Visa" },
  { id: 4, url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHAAeQMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcBAgUECAP/xABFEAABAwICBAkIBwUJAAAAAAABAAIDBAUGERIhMXEHE0FRYYGRlLEiMlJVocHR0hQVF0JDgqIWIzaSsiRTVGJyc3ST8f/EABsBAAIDAQEBAAAAAAAAAAAAAAUGAAMHAQIB/8QAMhEAAQMCAwMJAwUAAAAAAAAAAQACAwQRBRIhIjGhE0FRUmFxgZGx0fAUMsEVM1NU8f/aAAwDAQACEQMRAD8AtTFeJafD1K0lolq5c+Khzy/MeYePhVd0xDdrpI51XWy6J2RRuLGDqHvzKYnuL7pf6ype7NvGFkY5mNOQ+O8lctONBQRwRhzhdxS5V1b5XkA7KIiIksSIiKKIi9lPaLnUwtmp7dWSxO817IHFp3EBZns90p4nTT26siiYM3PfA4AbyQvHKsva4uvWR1r2XiREXteUREUUXTtmILta5GupK6XRH4Uji9h/KfdkVamE8SwYhpXeSIauLLjYc/1N5x4eNMLpYbuL7VfKSra7JokDZOlh1O+O8BDa+gjnjJAs4bltpKt8TwCdlXmiIk5Ma+ekRF0NJ6IvfYbYbzdqe3tmEJm0v3hbpZZNLtmY5lMPsyl9bs7sfmWWetggdlkdY+KvippZRmYLhQBFP/syl9bs7sfmT7MpfW7O7H5lT+q0fX4H2Vn0FR1eI91MMJfwza/+MzwX442/hW5f7XvC6FoojbrXS0Rk4wwRNj08stLIbclpfLebraamhEoiMzdHTLdLLXzJWEjfqs99M1+KPFh5DLz2/ColFP/syl9bs7sfmT7MpfW7O7H5k0/qtH1+B9kB+gqOrxHuoAin/2ZS+t2d2PzKF3aiNtudTROTjDA/Q0w3LS6lfBWRzktjdc+KrlppYhd4svItX+Y7ctlq/zHblqCoX0OiIudpwXz0iIuhpPW0UskMgkhkfHI3Y9ji0jrC9hu1wG461feH/FeVTDCeJLNarUaa5UMk83GudpthY4ZHLIZkg8ioqHFjcwZmKuhAc7KXZQox9a3D1lV94f8AFPrW4esqvvD/AIqwf22wx6qm7tF8yftthj1VN3aL5lh+ql/rngtPIM/mUnws98uHLbJI9z3upmFznHMk5cpX44ykfDhi4SRPdG9seYc12RGscq4zOESyRsDI6Sta1oyDWxMAH6liThEscrCySkrXsO1romEH9SCCjqRNynJm1728UUNRByeTON1lW/1rcPWVX3h/xT61uHrKr7w/4qzLTiXD92uMNDS2qQSyk5F9PGAMgSSdfQpN9XUP+Cpv+pvwRSXFGwnLJDY+HssMdCZBdkl/neqOF1uB2XGr7w/4rzSPfK9z5Xue9xzc5xzJ3lTPhPkp47hR0VNDFHxUZkk0GAZlxyGeXNontULRSlkEsQkDbXWCdhjeWE3si1f5jty2Wr/MduWkKlfQ6Ii52nBfPSIu9hHDcmIK1we50dHDlx0g2n/K3p8OxP8rKyJhe82ASlGx0jg1u8ri09PPVTCGlhkmlOxkbC49gXcp8E4hmAd9A4sH+8lYPZnmrJfV4fwpTCn4yCkGWfFtGlI7pIGbjvK5UvCPZmPIZBXSD0mxtAPa4FBziNXLrTxadJ+D8oiKOnj0lfr2KGy4HxDGMxQtk/0TM95C5lXY7tR5mpttUwDa7iiW9o1KyqbhCsUxylNVT9MkOf9JKkFvutvuTdKgrIZ8tZDHgkbxtCqdidbDrLFp3EcdVYKGmk/bfr4KhQQdhBWVe1ws1suQP06hgmcfvuYNIfm2hRi5cHFumzdbqmaldyNd+8Z7dftWiHG4H6PBbx+eSpkwyVv2m/Bc/gqthdLV3SRupo4iLfqLj/SO1WK5wa0ucQGgZknkXistths1rp6GHW2JmRd6TtpPWc1wOEe8i32Y0UTv7RW5s1ckf3j17OvoQWZzq6s2ec2Hd81RKMClp9eb1Va364G63irrvuyyEs6GDU32ALwoicWNDGho3BLjnFxJPOi1f5jty2Wr/MduXsL4vodERc7TgvnknIZqzZ6s4PwLSMpmhtbUgeURnk9w0nOPPkNQ6lWTtbTuVkcIULq7DFuuNP5UMei52XI17Rke3Idaca8B8kMb/tJ18NyXKQlrJHt3gf6q6kkfLI6WV7nyPObnuOZceclaoiJLEiyxzmPa9ji17Tm1zTkQegrCwoopVZsd3a3aLKpwroByTHJ43P+OatG1VwuVugrGwSwNmbpBkoAdlz6ufaq9wVgt9U+O43iItph5UVO8a5elw5G9HLu22YSGtJJAAGsnkSnirqYyZYRrzkbu5MFA2fJeQ6cyyvFcrTb7pHoXCkinAGQLm+U3cdo6lCrvwiPgu2hbYIqihj8lxcSDKedp5B1HPsUgsuMrRddGPjvo1QdXFT5NzPQdh8ehZnUNVC0S5SO7ePZXCqgkJZdcS68G9PJpPtNY+F3JFONNu4HaOvNRC54VvVszM9DJJGPxYP3jd+rWOsBXYivgxioj0dtDt91VLh0L9W6L55BB2LD/MduV63Kw2q6ZmuoYZXn8TR0X/zDWoxcODWhmDjQ1s9OT92RokaPA+1Focap3feC3j88kPkwyVv26qcosDYFlKiPr56VkcHl7p633Gw3DQc9rXCJsmsSxna3pI16ubcVW6yxzmPa9ji17SC1zTkQRsIKeqmbUx5Dp0HoKVqecwvzBT698HMgkdLZJ2GMnPiJyQW9Ady9faVHZMHYhjdkbZIelsjCPFdmycIlXSsbDdYPpbBq45hDZMukbD7FJoMf4flaDJPPAfRkgcSP5c0K5bE6fZLc/bv9Pyt/JUU2odl7N3qoVRYDv1S4cbBFSs9KaUH2NzU1w/ge3Wl7Z6k/TapusPkbkxh5w33nPqW02PcPRtJZUyynmZA8eIC4Vy4SiWltqoCDySVLtn5W/FUyPxOq2cuUeXrqrGNooNq9z5+intbWU1BTPqKyZkMLNr3nIf+9Cq7F+M5bwH0dv0oaDY4nU6bfzN6O3mUeul1rrtOJrhUvmcPNB1NbuA1BeNbaLCWQHPJq7gFmqsQdKMrNAixtWURdDl2bNim72fRZTVJkgH4E3ls6uUdRU7s3CDbazRjuLHUMp1aROlGfzcnWOtVWiw1GHU9Rq4WPSFqhrJotAbjoK+goZoqiJssEjJI3DNr2OBBHQQt1Qttulfa5eMt9VLA4nMhp8l29p1HrCmto4SC3Jl5pMxyzU/vafcepAqjBpo9Y9ocUVhxKJ+j9DwViN80bllYGwLKDoiqLxHb32u+VlK9uTWyl0fSw62+w+wrnK48X4YixBTtfG5sVbEMopCNTh6Lujw7QaqudnuNqkLK+kliyOQfo5sO5w1FOdBXMqIwCdobwlurpXwvJA2V4UREQWNERFFEREUURERRRERFFEXQw/b3XW80lG1ubXyAydDBrcezNaWy0XC6yhlBSSy5nIvDcmDe46grWwhheLD9O6SRzZa6UZSSDY0ei3o8ezIfX1zKeMgHa5gtlJSumeCRsqRIiJMTIv/Z", name: "AliPay" },
  { id: 5, url: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg", name: "MasterCard" },
  { id: 6, url: "https://addisfortune.news/wp-content/uploads/2020/06/Hibret-bank-logo.jpg", name: "Hibret Bank" },
]);

const openInterestModal = ref(false);
const openDonateModal = ref(false);
const type = ref("");

const openModal = (type_value) => {
  type.value = type_value;
  openInterestModal.value = true;
};

const stats = ref([
  { number: '42', label: 'Engagements', prefix: '' },
  { number: '12', label: 'Signed MOUs', prefix: '' },
  { number: '25', label: 'Total grant received', prefix: 'ETB', suffix: 'Million' },
  { number: '500', label: 'Supported Entrepreneurs', prefix: '' }
]);
</script>

<template>
  <Modals-Interest v-model="openInterestModal" v-model:type="type" />
  <ModalsDonate v-model="openDonateModal" />
  
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"/>
    <div class="fixed w-full top-0 z-50">
      <NavBar nav-class="bg-[#B5B5B53B] dark:bg-dark-primary backdrop-blur-lg shadow-md" />
    </div>

    <div class="relative overflow-hidden pt-16"> 

    <!-- Hero Section -->
    <div class="relative overflow-hidden pt-16"> <!-- Added pt-16 -->
      <div class="relative min-h-[80vh] flex items-center justify-center partnersBackground">
        <div class="absolute inset-0 bg-black/40 dark:bg-black/60 z-10" />
        <div class="relative z-20 max-w-4xl mx-auto px-6 py-24 text-center">
          <Transition appear name="fade-down">
            <div class="space-y-8">
              <div class="relative mx-auto w-32 h-32 transform hover:scale-105 transition-transform">
                <img src="@/assets/images/temp/coin.png" alt="Support" class="w-full h-full object-contain animate-float" />
              </div>
              
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Support the Ethiopian Youth Entrepreneurs Association
              </h1>
              
              <p class="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                We are keen to receive your support in guiding the Ethiopian youth to contribute positively 
                to the Ethiopian economy and realize their untapped potential.
              </p>
              
              <div class="flex justify-center gap-4 pt-8">
                <NuxtLink to="/supports#membership">
                  <button class="group relative px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg 
                               transform transition-all hover:-translate-y-1 hover:shadow-xl">
                    <span class="flex items-center gap-2">
                      <Icon name="mdi:cube-outline" class="text-2xl" />
                      Ways to help
                    </span>
                  </button>
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="relative py-20 dark:bg-dark-primary">
      <div class="max-w-7xl mx-auto px-6">
        <Transition appear name="fade-up">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p class="text-gray-600 dark:text-gray-300">Here is what we have received so far from our partners</p>
          </div>
        </Transition>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Transition appear name="fade-up" v-for="(stat, index) in stats" :key="index">
            <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="text-primary text-4xl font-bold mb-2">
                {{ stat.prefix }} {{ stat.number }}{{ stat.suffix }}
              </div>
              <div class="text-gray-600 dark:text-gray-300">{{ stat.label }}</div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Support Options -->
    <div id="membership" class="py-20" style="background-color: #215ca3;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Transition appear name="fade-up">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-white dark:text-white mb-4">
              Models of Working With Us
            </h2>
            <p class="text-white dark:text-gray-300">
              Below are the engagement modalities of our association
            </p>
          </div>
        </Transition>

        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Donation Card -->
          <Transition appear name="fade-up">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div class="text-primary text-5xl mb-6">
                <Icon name="fa-solid:donate" />
              </div>
              <h3 class="text-2xl font-bold mb-4 dark:text-white">Cash donations</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6 min-h-[100px]">
                We accept direct donation fees made directly through electronic transactions of wire transfer 
                to our association accounts.
              </p>
              
              <div class="space-y-4">
                <p class="text-sm text-gray-500 dark:text-gray-400">Donate through</p>
                <div class="grid grid-cols-3 gap-4">
                  <template v-for="bank in DonateVia" :key="bank.id">
                    <img :src="bank.url" :alt="bank.name" class="h-8 object-contain hover:opacity-80 transition-opacity" />
                  </template>
                </div>
              </div>
              
              <button @click="openDonateModal = true" 
                      class="mt-8 w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg
                             transform transition-all hover:-translate-y-1">
                Donate Now
              </button>
            </div>
          </Transition>

          <!-- Strategic Partnership Card -->
          <Transition appear name="fade-up">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div class="text-primary text-5xl mb-6">
                <Icon name="mdi:partnership" />
              </div>
              <h3 class="text-2xl font-bold mb-4 dark:text-white">Strategic Partnership</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6 min-h-[100px]">
                Our association is always keen to work with partners with aligned visions in the form of 
                strategic partnership to work towards achieving aligned goals through collective efforts.
              </p>
              
              <div class="space-y-4">
                <p class="text-sm text-gray-500 dark:text-gray-400">Our Partners</p>
                <div class="flex flex-wrap gap-4 items-center">
                  <template v-for="partner in partnered" :key="partner.id">
                    <img :src="partner.url" :alt="Partner" 
                         class="h-8 w-8 object-contain hover:opacity-80 transition-opacity" />
                  </template>
                  <span class="text-sm text-gray-600 dark:text-gray-300">17+ partners</span>
                </div>
              </div>
              
              <button @click="openModal('interest')" 
                      class="mt-8 w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg
                             transform transition-all hover:-translate-y-1">
                Express Interest of Partnership
              </button>
            </div>
          </Transition>

          <!-- Implementation Collaboration Card -->
          <Transition appear name="fade-up">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div class="text-primary text-5xl mb-6">
                <Icon name="pepicons-pop:chain" />
              </div>
              <h3 class="text-2xl font-bold mb-4 dark:text-white">Implementation Collaboration</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6 min-h-[100px]">
                Our association collaborates with diverse set of individuals, organizations or associations 
                to collaborate resources and insights to implement various projects or programs.
              </p>
              
              <div class="space-y-4 min-h-[116px]">
                <!-- Placeholder for consistency with other cards -->
                <div class="flex items-center justify-center h-24">
                  <Icon name="heroicons:users-20-solid" class="text-6xl text-gray-200 dark:text-gray-700" />
                </div>
              </div>
              
              <button @click="openModal('collaboration')" 
                      class="mt-8 w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg
                             transform transition-all hover:-translate-y-1">
                Express Interest of Collaboration
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
    
    <LayoutFooter />
  </div>
</template>

<style scoped>
/* Add these new styles */
.fixed {
  position: fixed;
  right: 0;
  left: 0;
}

/* Existing styles remain the same */
.partnersBackground {
  background-image: url("/assets/images/temp/support.png");
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

/* Card hover effects */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

/* Custom Animations */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes icon-float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}

.dark .dark\:bg-gradient-dark {
  background: linear-gradient(315deg, #1a365d 0%, #2d3748 100%);
}

/* Mobile-first media queries */
.partnersBackground {
  background-image: url("/assets/images/temp/support.png");
  background-size: cover;
  background-position: center;
  margin-top: -1px; /* Fix mobile gap */
}

@media (min-width: 768px) {
  .partnersBackground {
    background-attachment: fixed;
  }
}

/* Ensure proper stacking context */
.fixed {
  position: fixed;
  right: 0;
  left: 0;
  transform: translateZ(9999px); /* Create new stacking context */
}

/* Mobile-specific padding adjustment */
@media (max-width: 640px) {
  div[class="pt-20"] {
    padding-top: 5rem; /* 80px */
  }
}

/* Existing animations remain unchanged */
@keyframes float { /* ... */ }
.animate-float { /* ... */ }

</style>