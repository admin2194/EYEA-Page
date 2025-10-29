<script setup>
definePageMeta({
  layout: "registration",
});

const openBilling = ref(false);
const route = useRoute();
const pricing_plan_frequency_id = route.params.id;
</script>

<template>
  <div class="flex justify-center font-poppins">
    <LazyModalsBilling
      v-model="openBilling"
      :pricing_plan_frequency_id="pricing_plan_frequency_id"
    />
    <div class="md:w-[70%] px-4">
      <div class="flex justify-center">
        <img
          src="@/assets/images/logos/EYEA_logos/EYEA_logo_color.svg"
          alt=""
          srcset=""
          width="400"
          class="md:w-[400px] w-[200px]"
        />
      </div>
      <div class="flex justify-center pb-10">
        <div class="md:w-[50%] text-center md:space-y-4 space-y-1">
          <div class="relative flex justify-center w-full">
            <Icon
              name="uil:building"
              width="100"
              height="100"
              class="absolute top-[20%] text-primary"
            ></Icon>
            <img
              src="@/assets/images/shapes/individual_regi_completed.svg"
              alt=""
              srcset=""
            />
          </div>
          <p class="text-xl text-primary">Successfully Registered</p>
          <p class="text-xs text-secondary-text dark:text-gray-50">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            eius fugit delectus ullam accusamus mollitia ea fuga! Optio, eius
            fugit delectus ullam accusamus mollitia ea fuga! Optio, distinctio
            vel!
          </p>

          <div class="flex flex-col items-center justify-center gap-y-5">
            <button
              @click="$router.push({ name: 'app' })"
              class="w-full px-8 py-2 text-sm duration-200 border rounded-md hover:bg-primary dark:text-gray-50 border-primary"
            >
              Go to Membership List
            </button>
            <button
              @click="
                $router.push({
                  name: 'app-individual-invoice-id',
                  params: { id: $route.params.id },
                })
              "
              class="w-full px-8 py-2 text-sm duration-200 border rounded-md hover:bg-primary dark:text-gray-50 border-primary"
            >
              Proceed with your payment
            </button>
          </div>

          <hr />
          <!-- <p class="text-lg">Your Membership ID</p>
          <p class="text-sm text-primary">Member plus</p>

          <p class="text-xs text-secondary-text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            eius fugit delectus ullam accusamus mollitia ea fuga! Optio, eius
            fugit delectus ullam accusamus mollitia ea fuga! Optio,
          </p>
          <div class="flex flex-col items-center space-y-4">
            <div
              class="py-2 border-l-2 border-primary w-[50%] flex text-secondary-text justify-between px-2 items-center bg-gray-200"
            >
              <p>KTRGJUGUHFPUY</p>
              <Icon name="ci:copy" width="20" height="20"></Icon>
            </div>
            <img src="@/assets/images/temp/QR_code.jpg" alt="" srcset="" />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
