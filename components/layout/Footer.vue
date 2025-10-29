<template>
  <footer class="modern-footer">
    <div class="footer-grid container mx-auto px-4">
      <!-- Brand Section -->
      <div class="brand-section">
        <NuxtLink to="/" class="logo-link">
          <img
            src="@/assets/images/logos/final_logo.svg"
            alt="EYEA Logo"
            class="logo transition-transform duration-300 hover:scale-105"
          />
        </NuxtLink>
        <p class="brand-description">
          Ethiopia's leading youth-led entrepreneurial community driving innovation and economic transformation
        </p>
        <div class="social-icons mt-6 flex gap-4">
          <a 
            v-for="(icon, index) in socialIcons" 
            :key="index" 
            :href="icon.link" 
            class="social-link"
            target="_blank"
            rel="noopener"
          >
            <Icon 
              :name="icon.name" 
              class="text-2xl text-gray-600 hover:text-yellow-400 transition-colors" 
            />
          </a>
        </div>
      </div>

      <!-- Navigation Sections -->
      <div class="nav-columns grid gap-400 sm:grid-cols-3">
        <!-- Services Column -->
        <div class="nav-column">
          <h3 class="section-title text-yellow-400 mb-4">Services</h3>
          <ul class="space-y-2">
            <li v-for="link in serviceLinks" :key="link.link">
              <NuxtLink 
                :to="link.link" 
                class="nav-link text-gray-700 hover:text-yellow-400 transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Engage Column -->
        <div class="nav-column">
          <h3 class="section-title text-yellow-400 mb-4">Engage</h3>
          <ul class="space-y-2">
            <li v-for="link in engagementLinks" :key="link.link">
              <NuxtLink 
                :to="link.link" 
                class="nav-link text-gray-700 hover:text-yellow-400 transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter Column -->
        <div class="nav-column">
          <h3 class="section-title text-yellow-400 mb-4">Stay Updated</h3>
          <form @submit.prevent="submit" class="newsletter-form">
            <div class="input-group relative">
              <input
                v-model="email"
                type="email"
                placeholder="E-mail"
                class="email-input w-full px-4 py- 6rounded-lg border-2 border-yellow-400/80 bg-white/90 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
              <button 
                type="submit" 
                class="subscribe-btn absolute right-1 top-0 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md transition-all duration-300 shadow-sm"
                :disabled="loading"
              >
                <span v-if="!loading">Subscribe</span>
                <Icon v-else name="eos-icons:bubble-loading" class="animate-spin text-xl" />
              </button>
            </div>
            <p class="subscription-msg text-gray-500 text-xs mt-2">
              Monthly updates on events, opportunities, and more
            </p>
          </form>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="bottom-bar mt-8 py-4 border-t border-gray-200">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <p class="copyright text-gray-500 text-sm">
            © {{ currentYear }} EYEA. All rights reserved.
          </p>
          <div class="legal-links flex gap-4 mt-2 md:mt-0">
            <NuxtLink 
              to="/terms" 
              class="legal-link text-gray-500 hover:text-yellow-400 transition-colors text-sm"
            >
              Terms of Service
            </NuxtLink>
            <NuxtLink 
              to="/privacy" 
              class="legal-link text-gray-500 hover:text-yellow-400 transition-colors text-sm"
            >
              Privacy Policy
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useForm } from 'vee-validate';
import anonymous_mutator from '@/composable/anonymous_mutator';
import insert_subscription from '@/API/mutation/subscription/insert.gql';
import useNotify from '@/use/notify';

const { notify } = useNotify();
const email = ref('');
const loading = ref(false);
const currentYear = computed(() => new Date().getFullYear());

const socialIcons = [
  { name: 'uil:facebook', link: 'https://www.facebook.com/EthiopianYouthEntrepreneursAssociation' },
  { name: 'uil:youtube', link: 'https://youtube.com/@eyea_et' },
  { name: 'uil:instagram', link: 'https://www.instagram.com/eyea_et' },
  { name: 'uil:linkedin', link: 'https://www.linkedin.com/company/eyea-et' },
  { name: 'uil:telegram', link: 'https://t.me/eyea_et' },
];

const serviceLinks = [
  { name: 'Kena', link: 'https://kena.eyea.et' },
  { name: 'Zelela', link: 'https://zelela.eyea.et' },
  { name: 'Annual summit', link: 'https://eventzelela.eyea.et/' },
  { name: 'Privacy', link: 'https://www.eyea.et/privacy' }
];

const engagementLinks = [
  { name: 'News', link: 'https://www.eyea.et/news' },
  { name: 'Membership', link: 'https://www.eyea.et/membership' },
  { name: 'Partners', link: 'https://www.eyea.et/partners' },
  { name: 'Support', link: 'https://www.eyea.et/supports' }
];

const { mutate } = anonymous_mutator(insert_subscription);
const { handleSubmit } = useForm();

const submit = handleSubmit(async () => {
  loading.value = true;
  try {
    await mutate({ email: email.value });
    notify({
      title: 'Success!',
      description: 'You have successfully subscribed',
      type: 'success'
    });
    email.value = '';
  } catch (error) {
    notify({
      title: 'Error',
      description: 'Subscription failed. You might be already subscribed.',
      type: 'error'
    });
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.modern-footer {
  @apply relative z-10 bg-white/95 backdrop-blur-xl shadow-lg;
  padding: 4rem 1rem 2rem;
}

.footer-grid {
  max-width: 1400px;
  margin: 0 auto;
  @apply grid grid-cols-1 md:grid-cols-2 gap-8;
}

.brand-section {
  @apply flex flex-col items-center md:items-start;
}

.logo {
  @apply w-44 h-auto transition-transform duration-300;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.05));
}

.brand-description {
  @apply text-gray-600 text-sm text-center md:text-left my-6 max-w-xs md:max-w-md;
  line-height: 1.6;
}

.social-icons {
  @apply flex gap-4;
}

.section-title {
  @apply text-yellow-400 font-semibold mb-4 relative text-lg;
}

.section-title::after {
  @apply content-[''] absolute bottom-[-0.5rem] left-0 w-8 h-[2px] bg-yellow-400;
}

.nav-link {
  @apply text-gray-700 hover:text-yellow-400 transition-colors text-sm py-1;
  @apply relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-yellow-400 before:transition-all before:duration-300;
}
.nav-link:hover::before { @apply w-full; }

.input-group {
  @apply relative mt-4;
}

.email-input {
  @apply pl-4 pr-24 py-3 rounded-lg border-2 border-yellow-400/80 bg-white/90 placeholder-gray-400;
  transition: all 0.3s ease;
}

.email-input:focus {
  @apply border-yellow-400 ring-2 ring-yellow-200;
}

.subscribe-btn {
  @apply absolute right-1 top-1 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md transition-all duration-300 shadow-sm;
}

.subscription-msg {
  @apply text-gray-500 text-xs mt-2;
}

.bottom-bar {
  @apply flex flex-col md:flex-row justify-between items-center py-4 mt-8 border-t border-gray-200;
}

@media (max-width: 768px) {
  .footer-grid {
    @apply grid-cols-1 gap-6;
  }
  .nav-columns {
    @apply grid-cols-2;
  }
  .nav-column:last-child {
    @apply col-span-2;
  }
  .brand-description {
    @apply max-w-full;
  }
  .legal-links {
    @apply flex flex-col items-center gap-2 mt-4;
  }
}
</style>