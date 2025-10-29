<template>
  <div class="chart-container">
    <div class="chart">
      <header class="chart-header">
        <h1 class="chart-title">EYEA Organizational Structure</h1>
        <p class="chart-subtitle">Ethiopian Youth Entrepreneurship Association's organizational hierarchy and reporting structure</p>
      </header>

      <!-- Legend -->
      <div class="legend">
        <div class="legend-item">
          <span class="legend-color" style="background-color: var(--primary-color);"></span>
          <span>Governance</span>
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background-color: var(--info-color);"></span>
          <span>Oversight</span>
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background-color: var(--warning-color);"></span>
          <span>Advisory</span>
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background-color: var(--success-color);"></span>
          <span>Management</span>
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background-color: var(--accent-color);"></span>
          <span>Operations</span>
        </div>
      </div>
      
      <!-- Level 1: General Assembly -->
      <section class="flex flex-col items-center">
        <div class="node governance" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="node-title">General Assembly</div>
          <div class="node-subtitle">Highest decision-making body</div>
        </div>
      </section>
      <div class="connector-vertical" ref="connectors"></div>
      
      <!-- Level 2: External Auditor -->
      <section class="row-right">
        <div class="node oversight" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-balance-scale"></i>
          </div>
          <div class="node-title">External Auditor</div>
          <div class="node-subtitle">Independent financial verification</div>
        </div>
      </section>
      <div class="connector-vertical" ref="connectors"></div>
      
      <!-- Level 3: Advisory Boards & President -->
      <section class="row">
        <div class="node advisory" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-comment-dots"></i>
          </div>
          <div class="node-title">Youth Advisory Board</div>
          <div class="node-subtitle">Youth perspective and guidance</div>
        </div>
        <div class="node president" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="node-title">President</div>
          <div class="node-subtitle">Organizational leadership</div>
        </div>
        <div class="node advisory" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-compass"></i>
          </div>
          <div class="node-title">Strategic Advisory Board</div>
          <div class="node-subtitle">Strategic guidance</div>
        </div>
      </section>
      <div class="connector-vertical" ref="connectors"></div>
      
      <!-- Level 4: Monitoring & Internal Audit -->
      <section class="row-right">
        <div class="node oversight" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="node-title">Monitoring & Evaluation</div>
          <div class="node-subtitle">Performance assessment</div>
        </div>
        <div class="node oversight" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-search"></i>
          </div>
          <div class="node-title">Internal Auditor</div>
          <div class="node-subtitle">Internal control</div>
        </div>
      </section>
      <div class="connector-vertical" ref="connectors"></div>
      
      <!-- Level 5: IT & Administration -->
      <section class="row">
        <div class="node management" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-laptop-code"></i>
          </div>
          <div class="node-title">IT & Communication</div>
          <div class="node-subtitle">Digital infrastructure</div>
        </div>
        <div class="node management" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-file-invoice"></i>
          </div>
          <div class="node-title">Administration & Finance</div>
          <div class="node-subtitle">Resource management</div>
        </div>
      </section>
      <div class="connector-vertical" ref="connectors"></div>
      
      <!-- Level 6: Operations Manager -->
      <section class="flex flex-col items-center">
        <div class="node management" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-tasks"></i>
          </div>
          <div class="node-title">Operations Manager</div>
          <div class="node-subtitle">Day-to-day operations</div>
        </div>
      </section>
      <div class="connector-vertical" ref="connectors"></div>
      
      <!-- Level 7: Bottom Row Units -->
      <section class="row">
        <div class="node operations" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-user-plus"></i>
          </div>
          <div class="node-title">Membership Development</div>
          <div class="node-subtitle">Community engagement</div>
        </div>
        <div class="node operations" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-bullhorn"></i>
          </div>
          <div class="node-title">Policy Advocacy</div>
          <div class="node-subtitle">Influencing policy</div>
        </div>
        <div class="node operations" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-project-diagram"></i>
          </div>
          <div class="node-title">Project Management</div>
          <div class="node-subtitle">Program execution</div>
        </div>
        <div class="node operations" ref="nodes">
          <div class="node-icon">
            <i class="fas fa-handshake"></i>
          </div>
          <div class="node-title">Partnership Development</div>
          <div class="node-subtitle">Resource mobilization</div>
        </div>
      </section>
      
      <!-- SVG Connector Lines -->
      <div class="line-container" ref="connectorLines"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrgChart',
  mounted() {
    this.initAnimations();
    window.addEventListener('resize', this.handleResize);
    this.handleDarkMode();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    initAnimations() {
      const nodes = this.$refs.nodes ? (Array.isArray(this.$refs.nodes) ? this.$refs.nodes : [this.$refs.nodes]) : [];
      const connectors = this.$refs.connectors ? (Array.isArray(this.$refs.connectors) ? this.$refs.connectors : [this.$refs.connectors]) : [];
      const isMobile = window.innerWidth <= 768;

      const nodeDelay = 100;
      const connectorDelay = 80;

      nodes.forEach((node, index) => {
        setTimeout(() => {
          node.classList.add('animate-node');
          if (node.classList.contains('president')) {
            setTimeout(() => {
              node.classList.add('animate-pulse');
            }, 700);
          }
        }, nodeDelay * index);
      });

      connectors.forEach((connector, index) => {
        setTimeout(() => {
          connector.classList.add('animate-line');
          if (isMobile) {
            connector.style.animation = 'drawMobileLine 0.5s ease forwards';
          }
        }, (nodeDelay * nodes.length) + (connectorDelay * index));
      });

      setTimeout(() => {
        this.createConnectorLines();
      }, (nodeDelay * nodes.length) + (connectorDelay * connectors.length));
    },
    handleResize() {
      const lineContainer = this.$refs.connectorLines;
      if (lineContainer) {
        lineContainer.innerHTML = '';
        this.createConnectorLines();
      }
    },
    createConnectorLines() {
      const lineContainer = this.$refs.connectorLines;
      if (!lineContainer) return;

      lineContainer.innerHTML = '';

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.style.position = 'absolute';
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.pointerEvents = 'none';

      lineContainer.appendChild(svg);

      const gradientColor1 = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
      const gradientColor2 = getComputedStyle(document.documentElement).getPropertyValue('--primary-light').trim();

      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      gradient.setAttribute('id', 'line-gradient');
      gradient.setAttribute('x1', '0%');
      gradient.setAttribute('y1', '0%');
      gradient.setAttribute('x2', '100%');
      gradient.setAttribute('y2', '0%');

      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', gradientColor1);

      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', gradientColor2);

      gradient.appendChild(stop1);
      gradient.appendChild(stop2);
      defs.appendChild(gradient);
      svg.appendChild(defs);

      this.drawHorizontalLines(svg);
    },
    drawHorizontalLines(svg) {
      const rows = document.querySelectorAll('.row');

      if (rows.length > 0) {
        const level3Row = rows[0];
        const nodes = level3Row.querySelectorAll('.node');
        if (nodes.length >= 3) {
          this.drawHorizontalLine(svg, nodes[0], nodes[nodes.length - 1]);
        }
      }

      if (rows.length > 1) {
        const level5Row = rows[1];
        const nodes = level5Row.querySelectorAll('.node');
        if (nodes.length >= 2) {
          this.drawHorizontalLine(svg, nodes[0], nodes[nodes.length - 1]);
        }
      }

      if (rows.length > 2) {
        const level7Row = rows[2];
        const nodes = level7Row.querySelectorAll('.node');
        if (nodes.length >= 2) {
          this.drawHorizontalLine(svg, nodes[0], nodes[nodes.length - 1]);
        }
      }
    },
    drawHorizontalLine(svg, leftNode, rightNode) {
      const leftRect = leftNode.getBoundingClientRect();
      const rightRect = rightNode.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();

      const x1 = leftRect.left + leftRect.width / 2 - svgRect.left;
      const x2 = rightRect.left + rightRect.width / 2 - svgRect.left;
      const y = leftRect.top + leftRect.height / 2 - svgRect.top;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'url(#line-gradient)');
      line.setAttribute('stroke-width', '3');
      line.classList.add('line-animation');

      svg.appendChild(line);
    },
    handleDarkMode() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
      }

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
        setTimeout(() => {
          const lineContainer = this.$refs.connectorLines;
          if (lineContainer) {
            lineContainer.innerHTML = '';
            this.createConnectorLines();
          }
        }, 100);
      });
    }
  }
};
</script>

<style scoped>
/* Import Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap');

:root {
  --primary-color: #5D5CDE;
  --primary-dark: #4A49B7;
  --primary-light: #8F8EE7;
  --accent-color: #FF6B6B;
  --success-color: #20C997;
  --warning-color: #FFD166;
  --info-color: #3498DB;
  --text-color: #333;
  --text-light: #666;
  --bg-color: #fff;
  --card-bg: #fff;
  --border-color: #e0e0e0;
  --node-bg: #f8f9fa;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #f0f0f0;
    --text-light: #b0b0b0;
    --bg-color: #181818;
    --card-bg: #222230;
    --border-color: #444;
    --node-bg: #2d2d3d;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.4);
  }
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
  transition: background-color 0.3s ease;
  min-height: 100vh;
}

/* Typography */
.chart-container {
  font-family: 'Poppins', sans-serif;
  overflow-x: auto;
  padding: 20px;
  min-height: 100vh;
}

.chart {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 40px;
}

.chart-header {
  text-align: center;
  padding: 20px 10px 30px;
  margin-bottom: 20px;
}

.chart-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.chart-subtitle {
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin: 0 auto 30px;
  padding: 15px;
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  max-width: 800px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  transition: var(--transition);
}

.legend-item:hover {
  background-color: rgba(93, 92, 222, 0.1);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.row,
.row-right {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 1rem 0;
  position: relative;
  z-index: 1;
}

.row {
  justify-content: center;
}

.row-right {
  justify-content: flex-end;
  padding-right: 5%;
}

.node {
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 16px 20px;
  min-width: 200px;
  max-width: 250px;
  text-align: center;
  position: relative;
  z-index: 2;
  transition: var(--transition);
  opacity: 0;
  transform: translateY(20px);
}

.node-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.3;
  margin-bottom: 6px;
}

.node-subtitle {
  font-family: 'Roboto', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-light);
}

.node-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background-color: rgba(93, 92, 222, 0.1);
  color: var(--primary-color);
  font-size: 1.2rem;
}

.node:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.governance {
  border-left: 4px solid var(--primary-color);
}

.governance .node-icon {
  background-color: rgba(93, 92, 222, 0.1);
  color: var(--primary-color);
}

.oversight {
  border-left: 4px solid var(--info-color);
}

.oversight .node-icon {
  background-color: rgba(52, 152, 219, 0.1);
  color: var(--info-color);
}

.advisory {
  border-left: 4px solid var(--warning-color);
}

.advisory .node-icon {
  background-color: rgba(255, 209, 102, 0.1);
  color: var(--warning-color);
}

.management {
  border-left: 4px solid var(--success-color);
}

.management .node-icon {
  background-color: rgba(32, 201, 151, 0.1);
  color: var(--success-color);
}

.operations {
  border-left: 4px solid var(--accent-color);
}

.operations .node-icon {
  background-color: rgba(255, 107, 107, 0.1);
  color: var(--accent-color);
}

.president {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  border-left: none;
}

.president .node-icon {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.president .node-subtitle {
  color: rgba(255, 255, 255, 0.8);
}

.connector-vertical {
  width: 3px;
  background: linear-gradient(to bottom, var(--primary-color), var(--primary-light));
  height: 40px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  opacity: 0;
}

.connector-wrapper {
  position: relative;
  width: 100%;
  height: 40px;
}

.line-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

@media (max-width: 768px) {
  .row,
  .row-right {
    flex-direction: column;
    align-items: center;
    padding-right: 0;
    gap: 20px;
  }
  .node {
    margin: 5px 0;
    min-width: 180px;
  }
  .chart-title {
    font-size: 1.8rem;
  }
  .chart-subtitle {
    font-size: 1rem;
  }
  .connector-vertical {
    height: 30px;
  }
  .chart-container {
    padding: 10px;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes drawLine {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: 40px;
    opacity: 1;
  }
}

@keyframes drawMobileLine {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: 30px;
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

.animate-node {
  animation: fadeInUp 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

.animate-line {
  animation: drawLine 0.5s ease forwards;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

.line-animation {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dashAnimation 1.5s ease-in-out forwards;
}

@keyframes dashAnimation {
  to {
    stroke-dashoffset: 0;
  }
}
</style>