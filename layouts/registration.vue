<script setup>
const colorMode = useColorMode();
const themeSwitcher = () => {
  colorMode.preference = colorMode.value == "light" ? "dark" : "light";
};
</script>

<template>
  <div class="w-full max-w-screen-4xl overflow-x-hidden mx-auto ">
    <div class="grid lg:grid-cols-8 ">
      <div class="col-span-5 dark:bg-dark-secondary-light">
        <slot></slot>
      </div>

      <div
        class="bg-third-light2 dark:bg-dark-primary-light   lg:flex hidden col-span-3 dark:text-white py-[8%]"
      >
        <div class="space-y-10 border-l-4 px-20 border-[#40FF81]">
          <div class="flex justify-center">
            <img
              src="@/assets/images/logos/EYEA_logos/EYEA_logo_color.svg"
              alt=""
              srcset=""
              class="2xl:w-[300px] lg:[200px] w-[150px]"
            />
          </div>
          <div class="flex w-full text-primary text-2xl justify-center">
            <p>Membership</p>
          </div>

          <div >
            <img src="@/assets/images/temp/member-form.png" class="w-full h-[300px] object-contain" alt="" srcset="" />
          </div>
        </div>
      </div>
    </div>
  <LayoutFooter></LayoutFooter>
  </div>
</template>
