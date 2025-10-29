<script setup>
import { addCommasToNumbers } from "@/helpers/formatNumber.js";
import list from "@/composable/query/list";
import get_list from "@/API/queries/pricing/get.gql";
import { useUserStore } from "@/store/userStore";

const useUser = useUserStore();
const props = defineProps({
  type: {
    type: String,
    default: "individual",
  },
});
const clientId =  ref("member_anonymous");
const emit = defineEmits(["selectedPricing"]);
const items = ref([]);
const offset = ref(0);
const limit = ref(4);
const type = ref(props.type);
const isIndividualMember = useUser.users.individualMem;

console.log("111111", type.value);
const frequency = ref("year");

const filter = computed(() => {
  return {
    _and: [
      {
        pricing_plan: {
          type: {
            _eq: type.value,
          },
        },
      },
      {
        frequency: {
          _eq: frequency.value,
        },
      },
    ],
  };
});
const { onResult, loading, onError } = list(
  get_list,
  { limit, offset, filter ,clientId }

);
onResult((result) => {
  items.value = result.data.items;
});
</script>

<template>
  <div class="flex flex-col items-center w-full space-y-2 md:space-y-16">
    <!-- Title -->
    <div class="2xl:w-[100%]">
      <div class="space-y-2 md:space-y-10">
        <p
          class="text-xl font-semibold text-center lg:text-3xl text-primary-text dark:text-white"
        >
          Membership is open to both individuals and businesses.
        </p>
        <p
          v-if="type == 'organization'"
          class="text-center text-primary-text-light md:font-semibold dark:text-dark-text-secondary"
        >
          If you are an enterprise, you have three membership options
        </p>
        <p
          v-else
          class="text-center text-primary-text-light md:font-semibold dark:text-dark-text-secondary"
        >
          If you are an individual, you have two membership options
        </p>
      </div>
    </div>
    <HeadlessTabGroup
      as="div"
      :defaultIndex="type == 'individual' ? 0 : 1"
      class="flex flex-col items-center w-full px-4 gap-y-10"
    >
      <HeadlessTabList class="flex lg:w-[40%] justify-between">
        <HeadlessTab
          as="template"
          v-slot="{ selected }"
          class="w-1/2 border-b-2 focus:outline-none"
          ><button
            @click="type = 'individual'"
            :class="
              selected
                ? 'border-b-2 border-primary text-primary'
                : 'border-b-2 text-primary-text-light dark:text-dark-text-primary'
            "
            class="flex items-center justify-center space-x-2 cursor-pointer md:space-x-4"
          >
            <Icon name="lucide:user-check-2" width="25" height="25"></Icon>
            <div class="flex mt-2 font-semibold">Individual</div>
          </button></HeadlessTab
        >
        <HeadlessTab
          class="w-1/2 focus:outline-none"
          as="template"
          v-slot="{ selected }"
        >
          <button
            button
            @click="type = 'organization'"
            :class="
              selected
                ? 'border-b-2 border-primary text-primary'
                : 'border-b-2 text-primary-text-light dark:text-dark-text-primary'
            "
            class="flex items-center justify-center p-2 space-x-2 border-b-2 cursor-pointer md:space-x-4"
          >
            <Icon name="uil:building" class="text-6xl lg:text-2xl"></Icon>
            <p>Organization</p>
          </button></HeadlessTab
        >
      </HeadlessTabList>
      <HeadlessTabPanels class="w-full">
        <HeadlessTabPanel class="flex justify-center w-full">
          <div
            v-if="!loading && items"
            class="grid 2xl:w-[70%] lg:grid-cols-2 gap-4 lg:space-x-10 pt-10 space-y-4 md:space-y-0"
          >
            <!-- class="grid 2xl:w-[70%] lg:grid-cols-2 gap-4 lg:space-x-10 pt-10 space-y-4 md:space-y-0 bg-red-600" -->
            <div
              v-for="(item, i) in items"
              :key="i"
              class="bg-[#F7F8F9] dark:bg-dark-third rounded-lg flex-col flex justify-between max-w-md"
            >
              <div
                class="flex items-center justify-between px-6 py-6 border-b-2"
              >
                <div class="space-y-2">
                  <p
                    class="text-xl font-semibold capitalize 2xl:text-3xl text-primary-text dark:text-white"
                  >
                    {{ item.pricing_plan.name }}
                  </p>
                  <p class="text-primary-text-light dark:text-white">
                    For {{ item.pricing_plan.name }} team
                  </p>
                </div>
                <div>
                  <span class="font-semibold dark:text-white text-primary-text"
                    >ETB</span
                  >

                  <span
                    class="text-3xl font-semibold 2xl:text-4xl dark:text-white text-primary-text"
                    >{{ addCommasToNumbers(item?.lump_sum_price) }}</span
                  >
                  <span class="text-primary-text-light dark:text-white"
                    >/{{ item.frequency }}</span
                  >
                </div>
              </div>
              <div class="h-full border-b-2">
                <div class="">
                  <div class="p-6 space-y-4">
                    <div
                      v-for="(feature, i) in item.pricing_plan.features"
                      :key="i"
                      class="flex space-x-4"
                    >
                      <div
                        class="flex items-center justify-center w-6 h-6 rounded-full aspect-square bg-primary"
                      >
                        <Icon
                          name="iconamoon:check-fill"
                          color="white"
                          width="20"
                          height="20"
                        ></Icon>
                      </div>
                      <div class="">
                        <p class="text-primary-text-light dark:text-white">
                          {{ feature.feature.title }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-center my-5">
                <button
                  class="w-[70%] disabled:cursor-not-allowed bg-primary p-2 text-white rounded-lg"
                  :title="
                    isIndividualMember
                      ? 'You are already an existing member.'
                      : ''
                  "
                  :disabled="isIndividualMember"
                  @click="
                    $router.push({
                      name: 'app-individual-new-id',
                      params: { id: item.id },
                    })
                  "
                >
                  Get Started Now
                </button>
              </div>
            </div>
            <!-- card two -->
          </div>
          <div class="pt-10" v-else>
            <Icon
              name="eos-icons:bubble-loading"
              class="mx-auto text-3xl text-primary"
            ></Icon>
          </div>

          <!-- </div> -->
        </HeadlessTabPanel>
        <HeadlessTabPanel class="w-full">
          <!-- <div class="md:w-[70%] bg-black w-full grid md:grid-cols-2  grid-cols-1 md:gap-16 gap-4"> -->
          <!-- card one -->
          <div
            v-if="!loading"
            class="grid gap-4 mt-4 2xl:grid-cols-3 lg:grid-cols-2"
          >
            <!-- class="grid gap-4 mt-4 2xl:grid-cols-3 lg:grid-cols-2" -->
            <div
              v-for="(item, i) in items"
              :key="i"
              class="bg-[#F7F8F9] dark:bg-dark-third rounded-lg flex-col flex justify-between max-w-md"
            >
              <div
                class="flex items-center justify-between px-6 py-6 border-b-2"
              >
                <div class="space-y-2">
                  <p
                    class="text-xl font-semibold capitalize 2x:text-3xl text-primary-text dark:text-white"
                  >
                    {{ item.pricing_plan.name }}
                  </p>
                  <p class="text-primary-text-light dark:text-white">
                    For {{ item.pricing_plan.name }} team
                  </p>
                </div>
                <div>
                  <span class="font-semibold dark:text-white text-primary-text"
                    >ETB</span
                  >

                  <span
                    class="text-3xl font-semibold 2xl:text-4xl dark:text-white text-primary-text"
                    >{{ addCommasToNumbers(item?.lump_sum_price) }}</span
                  >
                  <span class="text-primary-text-light dark:text-white"
                    >/{{ item.frequency }}</span
                  >
                </div>
              </div>
              <div class="h-full border-b-2">
                <div>
                  <div class="p-6 space-y-4">
                    <div
                      v-for="(feature, i) in item.pricing_plan.features"
                      :key="i"
                      class="flex space-x-4"
                    >
                      <div
                        class="flex items-center justify-center w-6 h-6 rounded-full aspect-square bg-primary"
                      >
                        <Icon
                          name="iconamoon:check-fill"
                          color="white"
                          width="20"
                          height="20"
                        ></Icon>
                      </div>
                      <div class="">
                        <p class="text-primary-text-light dark:text-white">
                          {{ feature.feature.title }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <NuxtLink
                  :to="{
                    name: 'app-organization-new-id',
                    params: { id: item.id },
                  }"
                >
                  <div class="flex items-center justify-center p-6">
                    <button
                      class="bg-primary p-2 w-[70%] text-white rounded-lg"
                    >
                      Get Started Now
                    </button>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="flex justify-center w-full h-full pt-10" v-else>
            <Icon
              name="eos-icons:bubble-loading"
              class="mx-auto text-3xl text-primary"
            ></Icon>
          </div>

          <!-- </div> -->
        </HeadlessTabPanel>
      </HeadlessTabPanels>
    </HeadlessTabGroup>
    <!-- Group -->
    <div class="grid grid-cols-2 md:w-[40%]"></div>
    <!-- cards -->
  </div>
</template>
