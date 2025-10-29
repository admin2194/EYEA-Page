<script setup>
definePageMeta({
  layout: "registration",
  middleware: ["auth"],
});
</script>

<template>
  <div
    class="flex justify-center px-4 py-10 space-y-2 font-poppins dark:bg-dark-secondary"
  >
    <div class="2xl:w-[70%] lg:w-[90%] space-y-4 2xl:h-screen xl:h-[80vh]">
      <div class="flex justify-center">
        <img
          src="@/assets/images/logos/EYEA_logos/EYEA_logo_color.svg"
          alt=""
          srcset=""
          class="2xl:w-[300px] lg:[200px] w-[150px]"
        />
      </div>
      <div class="flex justify-center space-y-2 dark:text-white">
        <div class="md:w-[60%] text-center space-y-4">
          <p class="2xl:text-4xl lg:text-xl">Register As</p>
          <p
            class="text-sm text-secondary-text lg:text-base dark:text-dark-text-secondary"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            eius fugit delectus ullam accusamus mollitia ea fuga! Optio,
            distinctio vel!
          </p>
        </div>
      </div>
      <div
        class="grid md:grid-cols-2 gap-4 w-full 2xl:px-6 place-content-center 2xl:h-[60%] xl:h-[80%] dark:text-white pb-10"
      >
        <NuxtLink
          :to="{
            path: 'app/membership',
            hash: '#individual',
          }"
          class="group space-y-4 2xl:p-8 p-4 border-[2px] hover:border-primary hover:border-[3px] cursor-pointer rounded-lg"
        >
          <div class="space-y-4">
            <Icon
              class="text-3xl text-secondary-text dark:text-dark-text-secondary"
              name="mdi:user-circle-outline"
            ></Icon>
            <p class="text-lg 2xl:text-xl">Individual</p>
            <p class="text-sm 2xl:text-lg">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
              exercitationem, minus expedita dicta veniam nulla animi
              repudiandae quasi repellat debitis.
            </p>
          </div>
          <InputsButton
            class="rgbuttton"
            name="Register as an Individual"
          ></InputsButton>
        </NuxtLink>
        <NuxtLink
          :to="{
            path: 'app/membership',
            hash: '#organization',
          }"
          class="group space-y-4 2xl:p-8 p-4 border-[3px] flex-col hover:border-primary hover:border-[3px] cursor-pointer rounded-lg"
        >
          <div class="flex flex-col justify-between h-full space-y-4">
            <div class="space-y-4">
              <Icon
                class="text-3xl text-secondary-text dark:text-dark-text-secondary"
                name="tabler:building"
              ></Icon>
              <p class="text-lg 2xl:text-xl">Organization</p>
              <p class="text-sm 2xl:text-lg">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
                exercitationem, minus expedita dicta veniam nulla animi
                repudiandae quasi repellat debitis.
              </p>
            </div>
            <InputsButton
              class="rgbuttton"
              name="Register as an Organization"
            ></InputsButton>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
.rgbuttton {
  @apply w-full group-hover:bg-primary group-hover:text-white border-2 2xl:text-[14px] text-base font-poppins border-primary text-primary rounded-md p-2;
}
</style>
