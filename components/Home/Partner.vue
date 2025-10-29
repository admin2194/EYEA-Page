<script setup>
import list from "@/composable/query/list";
import get_list from "@/API/queries/partner/get_partners.gql";
const items = ref([]);
const type = ref("government");
const privates = ref(0);
const government = ref(0);
const NGO = ref(0);
const filter = computed(() => {
  return {
    _and: [
      {
        type: {
          _eq: type.value,
        },
      },
    ],
  };
});
const { onResult, loading, onError } = list(
  get_list,
  { filter },
);
onResult((result) => {
  items.value = result.data.items;
  privates.value = result.data.private_count.aggregate.count;
  government.value = result.data.government_count.aggregate.count;
  NGO.value = result.data.NGO_count.aggregate.count;
});

</script>
<template>

<div
      id="partner"
      class="md:min-h-screen font-poppins w-full relative md:px-20 px-4 bg-[#FFF9ED] dark:bg-dark-secondary"
    >
      <LayoutSectionHeader
        iconName="mdi:partnership-outline"
        title="Work With Us"
        subtitle="Partnership"
      ></LayoutSectionHeader>
      <div class="w-full flex justify-center">
        <div class="flex justify-center lg:w-[80%]">
          <div
            class="w-full flex-col md:space-y-16 space-y-2 flex items-center"
          >
            <!-- Title -->
            <div class="md:w-[80%]">
              <div class="space-y-10">
                <p
                  class="lg:text-3xl text-xl font-semibold text-primary-text dark:text-white text-center"
                >
                  The association have signed an operation and cooperation MOUs
                  across a diverse set of organizations in private, nonprofit
                  and government sectors
                </p>
                <p
                  class="text-center text-primary-text-light dark:text-dark-text-secondary font-[600] subpixel-antialiased text-sm md:text-base"
                >
                  Below are our esteemed partners and our active MOUs stating
                  our collaboration
                </p>
              </div>
            </div>
            <!-- Group -->

            <Partners
              v-model="type"
              :-n-g-o_count="NGO"
              :government_count="government"
              :private_count="privates"
              :loading="loading"
              :partners="items"
            ></Partners>
            <div class="grid grid-cols-3 lg:w-[70%]"></div>
            <div class="w-full"></div>
            <div class="flex flex-col justify-center items-center space-y-8">
              <div>
                <img
                  src="@/assets/images/shapes/partner.svg"
                  alt=""
                  srcset=""
                />
              </div>
              <div class="text-2xl backdrop: dark:text-white">
                Do you want to work with us ?
              </div>
              <div
                class="lg:w-[50%] leading-relaxed px-2 text-secondary-text dark:text-dark-text-secondary text-justify"
              >
                If you are a development organization and searching for an
                opportunity to support youth entrepreneurs, if you are an
                ecosystem builder and want to provide the Ethiopian youth with
                tools and resources to build their businesses, If you are
                interested to get access to well organized community of
                innovators and youth entrepreneurs you are in if the answer is
                yes we are delighted to partner with you and get in touch with
                our team following the link below.
              </div>
              <NuxtLink to="/supports#membership" class="pb-10">
                <InputsButton
                  class="bg-primary text-white px-6 text-lg py-2 border-4 border-primary rounded-md"
                  name="Express interest of partnership"
                ></InputsButton>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>