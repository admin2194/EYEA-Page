<template>
  <div class="eyea-structure">
    <!-- Introduction Section -->
    <section class="section introduction">
      <h1>Empowering Young Ethiopian Entrepreneurs</h1>
      <p>
        The Ethiopian Youth Entrepreneurs Association (EYEA) is a registered association established to address the challenges facing young Ethiopian entrepreneurs. In a country where youth unemployment stands at 27% (2022) and the rural labor market faces 40% underemployment (2020), EYEA creates pathways to success through entrepreneurship.
      </p>
      <p>
        EYEA was founded by young Ethiopian startups who experienced firsthand the obstacles within the ecosystem. We create a favorable environment for youth-owned businesses by addressing skills gaps, financial constraints, policy advocacy needs, networking opportunities, and bureaucratic bottlenecks.
      </p>
      <p>
        We strongly believe young people must be change-makers and problem solvers. By having the courage to see and do things differently, focusing on systems change, and creating widespread impact, we can achieve our goals and add value to the world.
      </p>
    </section>

    <!-- Purpose Section -->
    <section class="section purpose">
      <h2>Our Purpose</h2>
      <p>
        EYEA's existence is driven by its aim of creating a conducive environment for Ethiopian youth to pursue entrepreneurship, innovation, and business endeavors to bring impact to their community.
      </p>
      <p>
        We strive to be facilitators of a thriving entrepreneurship ecosystem where youth-owned businesses are supported with an efficient public sector, financial institutions with innovative solutions, and marketplaces open for new products and services.
      </p>
      <p>
        The association is formed with the purpose of identifying significant challenges in the ecosystem, including inadequate access to capital, limited entrepreneurial capacity among youth, inefficient business network exposure, and lack of public sector capacity in serving youth entrepreneurs.
      </p>
    </section>

    <!-- Needs Section -->
    <section class="section needs">
      <h2>Our Needs</h2>
      <p>
        As an association, EYEA has been operational for the past 3 years with the support of members and development partners. The association needs financial support from individuals and various organizations to allocate a dedicated team and keep the positive work in ensuring an efficient ecosystem.
      </p>
      <p>
        The association will be implementing various projects and interventions in partnership with multiple stakeholders. In doing so, EYEA will be needing infrastructure support from development partners.
      </p>
      <p>
        Advocacy is an important tool EYEA uses to enforce policy changes within the ecosystem, and your support is needed to share messages and publications released on all digital platforms by EYEA to reach a larger audience.
      </p>
      <button class="donate-button">Donate Now</button>
    </section>

    <!-- Organizational Structure Section -->
    <section class="section organizational-structure">
      <h2>EYEA Organizational Structure</h2>
      <p>
        European Youth Entrepreneurship Association's organizational hierarchy and reporting structure.
      </p>

      <!-- Governance Section -->
      <section class="subsection governance">
        <h3>Governance</h3>
        <ul>
          <li><strong>General Assembly:</strong> Highest decision-making body.</li>
          <li><strong>Board of Directors:</strong> Formation of the new board of directors is on the way. The association evaluates organizational performance, and board members are voted in on a yearly basis.</li>
          <li><strong>External Auditor:</strong> Independent financial verification.</li>
        </ul>
      </section>

      <!-- Advisory Section -->
      <section class="subsection advisory">
        <h3>Advisory</h3>
        <ul>
          <li><strong>Youth Advisory Board:</strong> Youth perspective and guidance.</li>
          <li><strong>Strategic Advisory Board:</strong> Members of the advisory board are industry experts infusing knowledge and experience into the strategic implementation of EYEA. The advisory board changes every 3 years.</li>
        </ul>
      </section>

      <!-- Management Section -->
      <section class="subsection management">
        <h3>Management</h3>
        <ul>
          <li><strong>President:</strong> Organizational leadership.</li>
          <li><strong>Monitoring & Evaluation:</strong> Performance assessment.</li>
          <li><strong>Internal Auditor:</strong> Internal control.</li>
          <li><strong>IT & Communication:</strong> Digital infrastructure.</li>
          <li><strong>Administration & Finance:</strong> Resource management.</li>
        </ul>
      </section>

      <!-- Operations Section -->
      <section class="subsection operations">
        <h3>Operations</h3>
        <ul>
          <li><strong>Operations Manager:</strong> Day-to-day operations.</li>
          <li><strong>Membership Development & Engagement Unit:</strong> Community engagement.</li>
          <li><strong>Policy Advocacy Unit:</strong> Influencing policy.</li>
          <li><strong>Project Management Unit:</strong> Program execution.</li>
          <li><strong>Partnership & Resource Mobilization Unit:</strong> Resource mobilization.</li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: "EYEAStructure",
};
</script>

<style scoped>
.eyea-structure {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1,
h2,
h3 {
  color: #333;
  text-align: center;
}

.section {
  margin-bottom: 20px;
}

.subsection {
  margin-left: 20px;
}

p {
  line-height: 1.6;
  text-align: justify;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 5px 0;
}

ul li strong {
  color: #007bff;
}

.donate-button {
  display: block;
  width: 150px;
  margin: 20px auto;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.donate-button:hover {
  background-color: #0056b3;
}
</style>