<script setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { Icon } from '@iconify/vue';

// Define form data and validation
const formData = ref({
  name: '',
  email: '',
  message: '',
});
const loading = ref(false);
const { handleSubmit } = useForm();

const onSubmit = handleSubmit((values) => {
  loading.value = true;
  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    console.log('Form submitted:', values);
    loading.value = false;
    formData.value = { name: '', email: '', message: '' }; // Reset form
  }, 1000);
});
</script>

<template>
  <div
    id="contact"
    class="font-poppins w-full py-12 bg-[#FFFFFF] dark:bg-dark-secondary overflow-hidden"
  >
    <div class="max-w-5xl mx-auto px-4 md:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-blue-primary dark:text-white animation-slide-in">
          Contact Us
        </h2>
        <p class="text-lg text-dark-light dark:text-dark-text-secondary mt-2 animation-slide-in-delay">
          We’d love to hear from you. Reach out to us for partnerships, inquiries, or support.
        </p>
      </div>

      <!-- Contact Info and Form Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Contact Information -->
        <div class="space-y-6">
          <div class="contact-item flex items-center space-x-4 animation-fade-in">
            <Icon name="mdi:map-marker-outline" class="text-xl text-primary animate-pulse-slow"></Icon>
            <div>
              <h3 class="text-lg font-semibold text-dark-primary dark:text-white">Address</h3>
              <p class="text-dark-light dark:text-dark-text-secondary">
                Dink Sira Building (4 Floor), Arat Killo, Office Number-D066, Addis Ababa, Ethiopia 
              </p>
            </div>
          </div>
          <div class="contact-item flex items-center space-x-4 animation-fade-in-delay">
            <Icon name="mdi:phone-outline" class="text-xl text-primary animate-pulse-slow"></Icon>
            <div>
              <h3 class="text-lg font-semibold text-dark-primary dark:text-white">Phone</h3>
              <p class="text-dark-light dark:text-dark-text-secondary">
                +251 922 02 41 97
              </p>
            </div>
          </div>
          <div class="contact-item flex items-center space-x-4 animation-fade-in">
            <Icon name="mdi:email-outline" class="text-xl text-primary animate-pulse-slow"></Icon>
            <div>
              <h3 class="text-lg font-semibold text-dark-primary dark:text-white">Email</h3>
              <p class="text-dark-light dark:text-dark-text-secondary">
                info@eyea.et
              </p>
            </div>
          </div>
          <div class="contact-item flex items-center space-x-4 animation-fade-in-delay">
            <Icon name="mdi:web-outline" class="text-xl text-primary animate-pulse-slow"></Icon>
            <div>
            </div>
          </div>
          <div class="social-links flex space-x-4 mt-6 animation-fade-in">
            <a href="#" class="text-primary hover:text-primary-dark transition-all duration-300">
              <Icon name="mdi:facebook" class="text-2xl animate-bounce-slow"></Icon>
            </a>
            <a href="#" class="text-primary hover:text-primary-dark transition-all duration-300">
              <Icon name="mdi:twitter" class="text-2xl animate-bounce-slow"></Icon>
            </a>
            <a href="#" class="text-primary hover:text-primary-dark transition-all duration-300">
              <Icon name="mdi:instagram" class="text-2xl animate-bounce-slow"></Icon>
            </a>
            <a href="#" class="text-primary hover:text-primary-dark transition-all duration-300">
              <Icon name="mdi:linkedin" class="text-2xl animate-bounce-slow"></Icon>
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="space-y-6">
          <form @submit.prevent="onSubmit" class="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div class="form-group">
              <label class="block text-sm font-medium text-dark-primary dark:text-white mb-1 animation-slide-in">Name</label>
              <input
                v-model="formData.name"
                type="text"
                class="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
                placeholder="Your Name"
                required
              />
            </div>
            <div class="form-group">
              <label class="block text-sm font-medium text-dark-primary dark:text-white mb-1 animation-slide-in-delay">Email</label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
                placeholder="Your Email"
                required
              />
            </div>
            <div class="form-group">
              <label class="block text-sm font-medium text-dark-primary dark:text-white mb-1 animation-slide-in">Message</label>
              <textarea
                v-model="formData.message"
                class="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark h-32"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 animate-scale-up"
            >
              <span v-if="!loading">Send Message</span>
              <Icon v-else name="mdi:loading" class="text-xl animate-spin"></Icon>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base Styles */
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* Contact Item Styling */
.contact-item {
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Social Links Styling */
.social-links a:hover {
  transform: scale(1.1);
}

/* Form Styling */
.form-group input, .form-group textarea {
  transition: all 0.3s ease;
}

.form-group input:focus, .form-group textarea:focus {
  border-color: #FFBE40;
  box-shadow: 0 0 0 3px rgba(255, 190, 64, 0.2);
}

/* Animations */
.animation-slide-in {
  animation: slideIn 0.8s ease-out;
}

.animation-slide-in-delay {
  animation: slideIn 0.8s ease-out 0.2s;
}

.animation-fade-in {
  animation: fadeIn 0.8s ease-out;
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

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
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
.contact-item:hover, .social-links a:hover, .form-group input:focus, .form-group textarea:focus {
  transition: all 0.3s ease;
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .contact-item, .form-group {
    margin: 0 auto;
  }

  .max-w-5xl {
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .text-3xl {
    font-size: 2rem;
  }

  .text-lg {
    font-size: 1.125rem;
  }

  .max-w-5xl {
    max-width: 100%;
  }

  .form-group input, .form-group textarea {
    padding: 8px 12px;
  }

  .social-links {
    justify-content: center;
  }
}

/* Dark Mode Adjustments */
.dark .text-dark-primary {
  color: #283649;
}

.dark .text-dark-primary-light {
  color: #dce0e7;
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

.dark .bg-gray-800 {
  background: #1f2a37;
}

/* Ensure overflow is handled gracefully */
.overflow-hidden {
  overflow: hidden;
}
</style>