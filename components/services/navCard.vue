<script setup>
const emits = defineEmits(["CloseNavCard"]);

const closeNavCard = () => {
  emits("CloseNavCard");
};

const currentTab = ref("zelela");
</script>

<template>
  <div>
    <TransitionRoot
      enter="transition-opacity duration-75"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-150"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div
        @mouseleave="closeNavCard"
        class="absolute w-full z-30 grid grid-cols-12 left-0 py-10 bg-white dark:bg-dark-primary shadow-lg"
      >
        <div class="lg:px-24 col-span-3 flex-col flex space-y-6 border-r-2">
          <div
            @mouseenter="currentTab = 'zelela'"
            class="singleSectionTab"
            :class="currentTab == 'zelela' ? 'bg-[#4B1796]/50' : ''"
          >
            <img src="@/assets/images/logos/zelela_logo.png " alt="" class="" />
            <p class="text-2xl mt-2">Zelela</p>
          </div>
          <div
            @mouseenter="currentTab = 'kena'"
            class="singleSectionTab hover:bg-[#FF9BA8]"
            :class="currentTab == 'kena' ? 'bg-[#FF9BA8]' : ''"
          >
            <img src="@/assets/images/logos/kena_logo.png " alt="" class="" />
            <p class="text-2xl mt-2">Kena</p>
          </div>
        </div>
        <div v-if="currentTab == 'kena'" class="flex items-start lg:col-span-7">
          <div class="flex justify-center items-center">
            <div class="w-full flex items-center">
              <div class="lg:w-[440px]">
                <img
                  src="@/assets/images/kena-banner.png"
                  alt=""
                  class="w-full h-[292px] object-contain mx-auto"
                />
              </div>
            </div>
            <div class="space-y-4">
              <div class="singleSectionText">
                Kena is a capacity-building service product of the EYEA, with an
                objective to provide training, mentorship, access to finance,
                and market exposure to youth-founded or run businesses. It also
                aims to encourage youth entrepreneurship through hosting
                innovation competitions. The association is partnering with a
                diverse set of stakeholders like private and government-owned
                financial institutions, policymakers as well development
                partners, to provide such enabling services in four primary
                categories.
              </div>

              <NuxtLink
                to="https://kena.eyea.et"
                target="_blank"
                class="text-primary"
                >Explore More <Icon name="formkit:arrowright"></Icon
              ></NuxtLink>
            </div>
          </div>
        </div>
        <div
          v-if="currentTab == 'zelela'"
          class="flex items-start lg:col-span-7"
        >
          <div
            to="https://zelela.eyea.et"
            target="_blank"
            class="flex justify-center items-center"
          >
            <div class="w-full flex items-center justify-center">
              <div class="lg:w-[440px]">
                <img
                  src="@/assets/images/zelela-banner.png"
                  alt=""
                  class="w-full h-[292px] object-contain mx-auto"
                />
              </div>
            </div>
            <div class="space-y-4">
              <div class="singleSectionText">
                Zelela (monthly policy advocacy and networking platform) is
                designed to sound inputs of policy advocacy activities that
                enables every stakeholder and concerned bodies in innovation
                driven entrepreneurial ecosystem to address the challenges
                facing young Ethiopians in their entrepreneurial vision,
                essentially in the areas of skills, access to finance, policy
                advocacy, access to networking and information, and bureaucratic
                bottlenecks.
              </div>
              <NuxtLink
                to="https://zelela.eyea.et"
                target="_blank"
                class="text-primary"
                >Explore More <Icon name="formkit:arrowright"></Icon
              ></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </TransitionRoot>
  </div>
</template>

<style scoped>
.singleSectionTab {
  @apply h-fit flex items-center space-x-4 p-4 rounded-md  hover:shadow-lg cursor-pointer text-secondary-text  dark:text-white hover:!text-white;
}
.singleSectionText {
  @apply text-lg text-justify text-black dark:text-white font-poppins;
}
</style>
