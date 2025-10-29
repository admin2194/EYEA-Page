<script setup>
definePageMeta({
  middleware: "third-party",
});
</script>

<template>
  <div
    id="home"
    class="lg:min-h-screen relative dark:bg-dark-primary font-poppins"
  >
    <!-- /* ------------------------------ Graphic Lines ----------------------------- */ -->
    <div class="absolute -z-10 xl:inline-block hidden">
      <img
        alt=""

        sizes=""
        srcset=""
      />
    </div>
    <!-- /* -------------------------- EASY ACCESS NAVIGATOR ------------------------- */ -->
    <!--
         <Home-Easy-Access></Home-Easy-Access>
    -->
    <!-- /* --------------------------------- NAV BAR -------------------------------- */ -->
    <NavBar navClass="" />
    <!-- /* -------------------------------------------------------------------------- */ -->
    <!-- /*                                    HERO                                    */ -->
    <!-- /* -------------------------------------------------------------------------- */ -->
    <Home-Hero></Home-Hero>
    <!-- /* -------------------------------------------------------------------------- */ -->
    <!-- /*                                    NEWS                                    */ -->
    <!-- /* -------------------------------------------------------------------------- */ -->

    <!--
      <Home-News></Home-News>
    -->

    <!-- /* -------------------------------------------------------------------------- */ -->
    <!-- /*                                    STORY                                   */ -->
    <!-- /* -------------------------------------------------------------------------- */ -->

    <Home-Story></Home-Story>

    <!-- /* -------------------------------------------------------------------------- */ -->
    <!-- /*                                   SERVICE                                  */ -->
    <!-- /* -------------------------------------------------------------------------- */ -->

    <Home-Service></Home-Service>

    <!-- /* -------------------------------------------------------------------------- */ -->
    <!-- /*                                 MEMBERSHIP                                 */ -->
    <!-- /* -------------------------------------------------------------------------- */ -->
    <!--
      <Home-Membership></Home-Membership
    -->
    <!-- /* -------------------------------------------------------------------------- */ -->
    <!-- /*                                   PARTNER                                  */ -->
    <!-- /* -------------------------------------------------------------------------- */ -->
    <!--
      <Home-Partner></Home-Partner>
    -->
    <!-- /* -------------------------------------------------------------------------- */ -->
    <!-- /*                                   CONTACT                                  */ -->
    <!-- /* -------------------------------------------------------------------------- */ -->
    <div
      id="contact"
      class="md:min-h-screen font-poppins  w-full relative"
    >
      <LayoutSectionHeader
        iconName="simple-line-icons:call-out"
        title="Let's stay connected"
      ></LayoutSectionHeader>

      <div class="w-full h-[60%] flex justify-center md:px-20 p-4">
        <div class="flex justify-center md:w-[80%]">
          <HomeContact></HomeContact>
        </div>
      </div>
      <LayoutFooter id="footer"></LayoutFooter>
    </div>

    <!-- /* ----------------------------------- -- ----------------------------------- */ -->
  </div>
</template>


<!--
      <style>
.floutingButton {
  @apply absolute  md:w-[200px] w-[170px] rounded-full font-poppins justify-center items-center space-x-2 md:p-2 p-1 flex;
}
.floutingButtonSub {
  @apply flex items-center justify-center rounded-full md:w-10 md:h-10 h-8 w-8;
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
</style>*/}

    -->
