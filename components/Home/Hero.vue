<template>
  <section class="relative from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden isolate">
    <!-- Geometric Background Elements -->
    <div class="absolute inset-0 z-0 opacity-20">
      <div class="absolute top-10 right-10 w-64 h-64 bg-[#215ca3]/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 left-10 w-64 h-64 bg-[#fcb217]/20 rounded-full blur-3xl"></div>
      <div class="absolute top-20 left-20 w-32 h-32 bg-[#369d65]/20 rounded-full blur-2xl"></div>
      <div class="absolute bottom-20 right-20 w-48 h-48 bg-[#fcb217]/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Cursor Tracker Canvas -->
    <canvas ref="trailCanvas" class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1;"></canvas>
    <!-- Content Container -->
    <div class="container mx-auto py-28 px-4 relative z-10">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Content Column -->
        <div class="space-y-8">
          <!-- EYEA Badge -->
          <div class="inline-flex items-center gap-3 text-[#215ca3] dark:text-[#3c8c80] font-semibold">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15.93V21c-3.17-.78-5.6-3.65-6-7H6c.4 3.29 2.97 6 6 6.93zM18 11c-.4 3.29-2.83 6.12-6 7v-2.93c3.03-.93 5.6-3.61 6-6.07h-6v-2h6V6l-6 2.25V4.26L18 6v5z"/>
            </svg>
            <span>ETHIOPIAN YOUTH ENTREPRENEURS ASSOCIATION</span>
          </div>

          <!-- Main Title -->
          <h1>
            <span class="text-5xl font-bold text-[#215ca3] dark:text-white leading-tight" style="animation: slideUp 1s ease-out">
              INCLUSIVE!
            </span>
            <span class="text-5xl font-bold text-[#215ca3] dark:text-white leading-tight" style="animation: slideUp 1s ease-out">
              INNOVATIVE!
            </span>
            <span class="text-5xl font-bold text-[#215ca3] dark:text-white leading-tight" style="animation: slideUp 1s ease-out">
              DISRUPTIVE!
            </span>
          </h1>


          <!-- Key Initiatives -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 bg-[#e71d37]/10 rounded-xl transform transition-all hover:scale-105 hover:shadow-lg">
              <div class="text-[#e71d37] font-semibold mb-2">Kena</div>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Capacity-building service product of the EYEA, providing training, mentorship, 
                access to finance, and market exposure to youth-founded businesses.
              </p>
            </div>
            <div class="p-4 bg-[#4b1796]/10 rounded-xl transform transition-all hover:scale-105 hover:shadow-lg">
              <div class="text-[#4b1796] font-semibold mb-2">Zelela</div>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Policy advocacy initiative addressing challenges facing young Ethiopian entrepreneurs 
                in skills, finance, networking, and bureaucratic processes.
              </p>
            </div>
          </div>

          <!-- CTA -->
          <NuxtLink 
            to="/membership" 
            class="inline-flex items-center gap-4 px-8 py-4 bg-[#215ca3] text-white font-semibold rounded-xl shadow-lg transition-all duration-300 animate-pulse-custom"
          >
            Join Our Network
            <svg class="w-5 h-5 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>

        <!-- Image Column -->
        <div class="relative group">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:rotate-1">
            <img 
              src="@/assets/images/temp/hero.jpg"
              alt="EYEA Members Collaborating" 
              class="w-full h-[600px] object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#349c54]/40 to-transparent"></div>
            
            <!-- Impact Stats -->
            <div class="absolute bottom-8 left-8 text-white">
              <div class="flex gap-8">
                <div class="pr-8 border-r border-white/20">
                  <div class="text-2xl font-bold"><span class="stat-number">502</span>+</div>
                  <div class="text-sm">Fully registered Entrepreneurs</div>
                </div>
                <div>
                  <div class="text-2xl font-bold"></div>
                  <div class="text-sm"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Accent Element -->
          <div class="absolute -top-8 -right-8 w-24 h-24 bg-[#fcb41c]/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      trail: [],
      maxTrail: 5, // Reduced for subtlety
      canvas: null,
      ctx: null,
      isAnimating: false,
      observer: null
    };
  },
  mounted() {
    // Cursor Tracker Setup
    if (window.matchMedia('(pointer: fine)').matches) {
      this.canvas = this.$refs.trailCanvas;
      this.ctx = this.canvas.getContext('2d');
      this.handleResize();
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('resize', this.handleResize);
      this.isAnimating = true;
      this.animate();
    }

    // Stat Count-Up Observer
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.startCountUp();
          this.observer.disconnect();
        }
      });
      this.observer.observe(this.$el);
    }
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);
    this.isAnimating = false;
    if (this.observer) this.observer.disconnect();
  },
  methods: {
    handleMouseMove(e) {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.trail.push({ x, y });
      if (this.trail.length > this.maxTrail) {
        this.trail.shift();
      }
    },
    handleResize() {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    },
    animate() {
      if (!this.isAnimating) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.trail.forEach((point, index) => {
        const alpha = (index + 1) / this.maxTrail;
        const size = 10 * alpha; // Reduced size for subtlety
        const gradient = this.ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size);
        gradient.addColorStop(0, `rgba(33, 92, 163, ${alpha})`);
        gradient.addColorStop(1, `rgba(33, 92, 163, 0)`);
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      });
      requestAnimationFrame(this.animate);
    },
    startCountUp() {
      const statNumber = this.$el.querySelector('.stat-number');
      if (!statNumber) return;
      const target = 502;
      const duration = 2000;
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);
        statNumber.textContent = value;
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }
};
</script>

<style scoped>
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-pulse-custom {
  animation: pulse 2s infinite;
}

@keyframes bounce-horizontal {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

.animate-bounce-horizontal {
  animation: bounce-horizontal 1.5s ease-in-out infinite;
}

</style>
