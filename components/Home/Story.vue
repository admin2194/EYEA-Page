<template>
  <section class="relative from-white to-[#349c54]/20 dark:from-gray-900 dark:to-[#245ca4]/20 overflow-hidden isolate">
   <!-- Cursor Tracker Canvas -->
  <canvas ref="trailCanvas" class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1;"></canvas>

    <!-- Background Elements -->
    <GeometricBackground />

    <div class="container mx-auto px-6 relative z-10">
      <!-- Header -->
      <HeaderSection />

      <!-- Mission & Vision -->
      <MissionVisionSection />

      <!-- Strategic Pillars & Values Side by Side -->
      <div class="flex flex-col lg:flex-row gap-8 relative">
        <!-- Strategic Pillars -->
        <div class="flex-1">
          <StrategicPillarsSection />
        </div>

        <!-- Decorative Bridge -->
        <div class="hidden lg:block absolute inset-0 w-1 bg-gradient-to-b from-[#215ca3] via-[#2d7e8a] to-[#369d65] mx-auto left-1 transform -translate-x-2 animate-grow"></div>
        <div class="hidden lg:block absolute inset-0 w-1 bg-gradient-to-b from-[#369d65] via-[#2d7e8a] to-[#369d65] mx-auto left-1 transform -translate-x-2 blur-sm animate-grow-delay"></div>

        <!-- Values -->
        <div class="flex-1">
          <ValuesSection />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GeometricBackground from '@/components/GeometricBackground.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import MissionVisionSection from '@/components/MissionVisionSection.vue';
import StrategicPillarsSection from '@/components/StrategicPillarsSection.vue';
import ValuesSection from '@/components/ValuesSection.vue';
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

<style>
.perspective-1000 {
  perspective: 1000px;
}

.flip-card {
  transform-style: preserve-3d;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.flip-front,
.flip-back {
  backface-visibility: hidden;
}

.flip-back {
  transform: rotateY(180deg);
}

@media (prefers-reduced-motion: reduce) {
  .flip-card {
    transition: none !important;
    transform: none !important;
  }
}

/* Night Mode Adaptations */
@media (prefers-color-scheme: dark) {
  section {
    background: #1a1a1a; /* Dark background */
  }

  .bg-gradient-to-b {
    background: linear-gradient(to bottom, rgba(52, 156, 84, 0.15), rgba(36, 92, 164, 0.20));
  }

  /* Adjust text colors for dark mode */
  .text-gray-600 {
    color: rgba(255, 255, 255, 0.7);
  }

  .text-gray-900 {
    color: white;
  }

  /* Border colors */
  .border-l-4 {
    border-color: #fcb41c;
  }
}
</style>