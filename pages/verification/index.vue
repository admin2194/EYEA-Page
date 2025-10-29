<script setup></script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div>
      <div class="flex flex-col items-center">
        <div class="w-[400px]">
          <Icon name=""></Icon>
          <img
            src="@/assets/images/logos/EYEA_Logo_Color_Final.png"
            alt=""
            srcset=""
            class="object-contain w-full h-full"
          />
        </div>
        <p class="text-xl max-w-xl text-center">
          We have just sent a verification email to your email address. Please
          check your inbox and follow the instructions provided to complete the
          verification process.
        </p>
        <button
          @click="$router.push({ path: '/login' })"
          class="mt-20 flex gap-x-2 py-2 px-8 rounded-md border border-primary bg-primary/90 hover:bg-primary text-white text-xl font-medium shadow hover:shadow-lg transition-all duration-300"
        >
          <Icon name="tabler:arrow-bar-left" class="text-2xl text-white" />
          Back to Login
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.element {
  float: right;
  shape-outside: rectangle(0, 0, 100%, 100%);
  /* width: 120px; */
  /* height: 200px; */
  @apply md:w-40 md:h-40 w-28 h-28 md:pl-4 md:pb-4 pl-2 pb-2;
}
.floutingButton {
  @apply absolute  md:w-[200px] w-[170px] rounded-full font-poppins justify-center items-center space-x-2 md:p-2 p-1 flex;
}
.floutingButtonSub {
  @apply flex items-center justify-center rounded-full md:w-10 md:h-10 h-8 w-8;
}

element.style {
}

.fullShadow {
  box-shadow: 0 0 5px 2px #fff;
}
.carousel__pagination-button::after {
  @apply bg-primary-light h-2 rounded-lg hover:bg-primary;
}
.carousel__pagination-button--active::after {
  @apply bg-primary w-8 rounded-lg;
}
</style>
