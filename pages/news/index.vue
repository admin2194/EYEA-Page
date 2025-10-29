<script setup>
import { ref, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();
const email = ref('');
const isSubscribed = ref(false);
const isValidEmail = ref(true);
const loadingProgress = ref(0);
const loading = ref(true);

const subscribe = () => {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    isValidEmail.value = false;
    return;
  }
  
  isValidEmail.value = true;
  isSubscribed.value = true;
  email.value = '';
  
  // Reset subscription message after 5 seconds
  setTimeout(() => {
    isSubscribed.value = false;
  }, 5000);
};

onMounted(() => {
  // Initial loading animation
  const loadingInterval = setInterval(() => {
    loadingProgress.value += 1;
    if (loadingProgress.value >= 100) {
      clearInterval(loadingInterval);
      loading.value = false;
    }
  }, 25);
  
  // Particle animation
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = width.value > 768 ? 50 : 30;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: ['#215ca3', '#fcb217', '#369d65'][Math.floor(Math.random() * 3)],
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5
      });
    }
    
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }
      
      requestAnimationFrame(drawParticles);
    }
    
    drawParticles();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
});
</script>

<template>
  <!-- Loading Screen -->
  <div v-if="loading" class="loading-screen">
    <div class="loading-logo">
      <div class="eyea-logo">
        <span class="blue">E</span><span class="yellow">Y</span><span class="blue">E</span><span class="green">A</span>
      </div>
    </div>
    <div class="loading-bar-container">
      <div class="loading-bar" :style="{ width: `${loadingProgress}%` }"></div>
    </div>
    <div class="loading-text">{{ loadingProgress }}%</div>
  </div>
  
  <!-- Main Content -->
  <div v-else class="min-h-screen font-poppins bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] dark:from-[#1a202c] dark:to-[#2d3748] relative overflow-hidden">
    <!-- Particle Background -->
    <canvas id="particle-canvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    
    <!-- Decorative Shapes -->
    <div class="absolute top-20 left-0 opacity-20 dark:opacity-10">
      <div class="shape-circle bg-[#fcb217]/20 w-64 h-64 rounded-full filter blur-xl"></div>
    </div>
    <div class="absolute bottom-20 right-0 opacity-20 dark:opacity-10">
      <div class="shape-circle bg-[#369d65]/20 w-96 h-96 rounded-full filter blur-xl"></div>
    </div>
    
    <!-- Navigation Bar (matching the provided image) -->
      <NavBar nav-class="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] dark:from-[#1a202c] dark:to-[#2d3748] relative overflow-hidden" />
      <!-- Search Bar -->
        <!-- <div class="search-container">
      <div class="container mx-auto px-4 py-4">
        <div class="max-w-md mx-auto relative">
          <input type="text" placeholder="Search" class="search-input" />
          <span class="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>
      </div>
    </div>-->
    
    <!-- Tab Navigation -->
    <div class="tab-container">
      <div class="container mx-auto px-4">
        <div class="flex justify-center space-x-8">
          <a href="#" class="tab-item active">News</a>
          <a href="#" class="tab-item">Articles</a>
          <a href="#" class="tab-item">Research</a>
        </div>
      </div>
    </div>
    
    <!-- Coming Soon Content -->
    <div class="container mx-auto px-4 pt-16 pb-20">
      <div class="max-w-4xl mx-auto text-center content-section">
        <!-- Title Section -->
        <div class="hero-title mb-10 animate-fadeIn">
          <div class="inline-block bg-[#fcb217]/20 text-[#fcb217] px-4 py-1 rounded-full mb-4">
            <div class="flex items-center justify-center space-x-2">
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </span>
              <span>Coming Soon</span>
            </div>
          </div>
          <h1 class="text-4xl md:text-6xl font-bold mb-6 text-[#215ca3] dark:text-white leading-tight">
            Our <span class="text-[#fcb217]">News</span> Section is Under Construction
          </h1>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            We're working hard to bring you the latest news and updates from the Ethiopian Youth Entrepreneurs Association. Stay tuned for our grand launch!
          </p>
        </div>
        
        <!-- Illustration -->
        <div class="illustration-container mb-12 animate-slideUp">
          <div class="relative mx-auto w-full max-w-lg">
            <div class="news-illustration">
              <svg width="100%" height="220" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                <rect x="100" y="50" width="600" height="300" rx="20" fill="#f8f9fa" stroke="#215ca3" stroke-width="5"/>
                <rect x="150" y="100" width="200" height="150" rx="10" fill="#215ca3"/>
                <rect x="380" y="100" width="270" height="40" rx="5" fill="#fcb217"/>
                <rect x="380" y="160" width="270" height="20" rx="5" fill="#e0e0e0"/>
                <rect x="380" y="190" width="270" height="20" rx="5" fill="#e0e0e0"/>
                <rect x="380" y="220" width="270" height="20" rx="5" fill="#e0e0e0"/>
                <circle cx="250" cy="175" r="30" fill="#369d65"/>
              </svg>
            </div>
            <div class="absolute -top-4 -right-4 animate-float">
              <div class="bg-[#fcb217] w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold">
                <span>!</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Subscription Form -->
        <div class="subscribe-section bg-white dark:bg-[#2d3748] rounded-3xl p-8 shadow-xl max-w-2xl mx-auto animate-fadeIn">
          <h3 class="text-2xl font-semibold mb-4 text-[#215ca3] dark:text-white">Get Notified When We Launch</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Subscribe to our newsletter and be the first to know when our news section goes live.
          </p>
          
          <div v-if="isSubscribed" class="bg-[#369d65]/10 text-[#369d65] p-4 rounded-lg mb-4 animate-pulse">
            <p>Thank you for subscribing! We'll keep you updated.</p>
          </div>
          
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-grow">
              <input 
                type="email" 
                v-model="email" 
                placeholder="Enter your email" 
                class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#215ca3] dark:bg-[#1a202c] dark:border-gray-700 dark:text-white"
                :class="{ 'border-red-500 focus:ring-red-500': !isValidEmail }"
              >
              <p v-if="!isValidEmail" class="text-red-500 text-sm mt-1 text-left">
                Please enter a valid email address
              </p>
            </div>
            <button @click="subscribe" class="bg-[#215ca3] hover:bg-[#215ca3]/90 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center">
              <span>Notify Me</span>
              <span class="ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
        
        <!-- Social Media Links -->
        <!--         <div class="social-icons mt-12 flex justify-center space-x-6 animate-fadeIn">
          <a href="#" class="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="#" class="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a href="#" class="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="#" class="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle> 
            </svg>
          </a>
        </div>-->
      </div>
    </div>
    <LayoutFooter />
  </div>
</template>

<style scoped>
/* Brand colors */
:root {
  --primary-blue: #215ca3;
  --primary-yellow: #fcb217;
  --primary-green: #369d65;
}

/* Logo styling */
.eyea-logo {
  font-family: Arial, sans-serif;
  letter-spacing: 0.1em;
}
.eyea-logo .blue { color: #215ca3; }
.eyea-logo .yellow { color: #fcb217; }
.eyea-logo .green { color: #369d65; }

/* Loading screen */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.dark .loading-screen {
  background: #1a202c;
}

.loading-logo {
  margin-bottom: 24px;
  animation: pulse 1.5s infinite ease-in-out;
}

.loading-bar-container {
  width: 300px;
  height: 6px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 16px;
}

.dark .loading-bar-container {
  background-color: rgba(255, 255, 255, 0.1);
}

.loading-bar {
  height: 100%;
  background-color: #215ca3;
  border-radius: 3px;
  transition: width 0.2s ease-out;
}

.loading-text {
  font-size: 14px;
  color: #666;
}

.dark .loading-text {
  color: #ccc;
}

/* Navigation */
.nav-link {
  color: #555;
  font-size: 14px;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
}

.dark .nav-link {
  color: #e2e8f0;
}

.nav-link.active {
  color: #215ca3;
  font-weight: 600;
}

.dark .nav-link.active {
  color: #fcb217;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #fcb217;
  border-radius: 2px;
}

.login-btn {
  color: #215ca3;
  font-weight: 500;
  border: 1px solid #215ca3;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  transition: all 0.2s;
}

.login-btn:hover {
  background-color: rgba(33, 92, 163, 0.1);
}

.signup-btn {
  background-color: #fcb217;
  color: white;
  font-weight: 500;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  transition: all 0.2s;
}

.signup-btn:hover {
  background-color: rgba(252, 178, 23, 0.9);
}

.dark-mode-toggle {
  color: #555;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.dark .dark-mode-toggle {
  color: #e2e8f0;
}

.dark-mode-toggle:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.dark .dark-mode-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Search */
.search-container {
  padding: 1rem 0;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #e5e7eb;
  border-radius: 2rem;
  background-color: white;
  color: #374151;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}

.dark .search-input {
  background-color: #2d3748;
  border-color: #4a5568;
  color: white;
}

.search-input:focus {
  border-color: #215ca3;
  box-shadow: 0 0 0 2px rgba(33, 92, 163, 0.2);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

/* Tabs */
.tab-container {
  margin-top: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.dark .tab-container {
  border-color: #4a5568;
}

.tab-item {
  font-size: 14px;
  font-weight: 500;
  padding: 0.75rem 0;
  color: #6b7280;
  position: relative;
  transition: all 0.2s;
}

.dark .tab-item {
  color: #e2e8f0;
}

.tab-item.active {
  color: #215ca3;
  font-weight: 600;
}

.dark .tab-item.active {
  color: #fcb217;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #215ca3;
}

.dark .tab-item.active::after {
  background-color: #fcb217;
}

/* Social Icons */
.social-icon {
  color: #6b7280;
  transition: all 0.2s;
}

.dark .social-icon {
  color: #e2e8f0;
}

.social-icon:hover {
  color: #215ca3;
  transform: translateY(-3px);
}

.dark .social-icon:hover {
  color: #fcb217;
}

/* Animations */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slideUp {
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Shape styling */
.shape-circle {
  border-radius: 50%;
}

/* Content section spacing */
.content-section {
  margin-top: 2rem;
}
</style>