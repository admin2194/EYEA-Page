<script setup>
import { format } from "date-fns";
import memberships_query from "@/API/queries/membership/membership_list.gql";
import lists_composable from "@/composable/query/lists";

definePageMeta({
  layout: "members",
  middleware: "members",
});
const  route = useRoute();
const type = ref(route.hash ? route.hash.slice(1) : "individual");
const selectedIndex = type.value == 'individual' ? 0 : 1

const statuses = {
  paid: "text-green-700 bg-green-50 ring-green-600/20",
  pending: "text-yellow-600 bg-yellow-50 ring-yellow-500/10",
  unpaid: "text-red-700 bg-red-50 ring-red-600/10",
};
const clientId = ref("member_user");

const clients = ref([]);
const filter = computed(() => {
  if (type.value == "organization") {
    return {
      billing: {
        membership: {
          membership_type: { _eq: "organization" },
        },
      },
    };
  } else {
    return {
      billing: {
        membership: {
          membership_type: { _eq: "individual" },
        },
      },
    };
  }
});
const { onResult, onError, loading, refetch } = lists_composable(
  memberships_query,
  { filter, clientId: clientId }
);

onResult(({ data }) => {
  if (data) {
    clients.value = data.items;
    console.log("data", data);
  }
});
</script>

<template>
  <div class="flex flex-col items-center w-full py-10 gap-y-10">
    <div
      class="relative flex flex-col items-center justify-center w-full space-y-6"
    >
      <h1 class="text-2xl font-medium text-center lg:text-7xl text-primary">
        Membership
      </h1>
      <button
        @click="$router.push({ name: 'app-membership', hash: '#individual' })"
        class="lg:absolute right-[10%] px-8 py-2 border-primary border rounded-lg text-primary font-semibold hover:bg-primary hover:text-white duration-200"
      >
        Add Membership
      </button>
    </div>
    <HeadlessTabGroup
      as="div"
      :default-index="selectedIndex"
      class="flex flex-col items-center w-full px-4 mt-10 gap-y-10"
    >
      <HeadlessTabList  class="flex lg:w-[40%] justify-between">
        <HeadlessTab
          as="template"
          v-slot="{ selected }"
          class="w-1/2 focus:outline-none"
          ><button
            @click="type = 'individual'"
            :class="
              selected
                ? 'border-b-2 border-primary text-primary'
                : 'border-b-2 text-primary-text-light dark:text-dark-text-primary border-gray-100'
            "
            class="flex items-center justify-center space-x-2 cursor-pointer md:space-x-4"
          >
            <Icon name="lucide:user-check-2" width="25" height="25"></Icon>
            <div class="flex mt-2 font-semibold">Individual  </div>
          </button></HeadlessTab
        >
        <HeadlessTab
          class="w-1/2 focus:outline-none"
          as="template"
          v-slot="{ 
            selected
           }"
        >
          <button
            button
            @click="type = 'organization'"
            :class="
              selected
                ? 'border-b-2 border-primary text-primary'
                : 'border-b-2 text-primary-text dark:text-dark-text-primary border-gray-100'
            "
            class="flex items-center justify-center p-2 space-x-2 cursor-pointer md:space-x-4"
          >
            <Icon name="uil:building" class="text-6xl lg:text-2xl"></Icon>
            <p>Organization</p>
          </button>
        </HeadlessTab>
      </HeadlessTabList>
      <HeadlessTabPanels class="w-full">
        <HeadlessTabPanel class="w-full flex justify-center min-h-[40vh]">
          <ul
            role="list"
            class="flex flex-wrap  gap-20"
            v-if="!loading && clients.length"
          >
            <!-- class="grid content-center grid-cols-1 bg-red-400 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 place-items-center justify-items-stretch" -->
            <li
              v-for="client in clients"
              :key="client.id"
              class="overflow-hidden border border-gray-200 dark:bg-dark-primary rounded-xl"
            >
              <div
                class="flex items-center p-6 border-b dark:shadow dark:shadow-white bg-gray-900/5 gap-x-4 border-gray-900/5"
              >
                <img
                  :src="
                    client?.billing?.membership.individual_membership?.photo_url
                  "
                  alt="profile image"
                  class="flex-none object-cover w-12 h-12 bg-white rounded-lg ring-1 ring-gray-900/10"
                />
                <div
                  class="flex flex-col text-sm font-medium leading-6 text-gray-900 dark:text-dark-text-secondary"
                >
                  <h1 class="text-xl">
                    {{
                      client?.billing?.membership?.individual_membership?.first_name
                    }}
                    {{
                      client?.billing?.membership?.individual_membership?.last_name
                    }}
                  </h1>
                  <h2 class="text-sm font-light">
                    {{
                      client?.invoice_pricing_plan_frequency_price?.pricing_plan
                        ?.name
                    }}
                  </h2>
                </div>
                <HeadlessMenu as="div" class="relative ml-auto">
                  <HeadlessMenuButton
                    class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500"
                  >
                    <span class="sr-only">Open options</span>
                    <Icon
                      name="heroicons-outline:dots-vertical"
                      class="text-2xl text-secondary-text dark:text-dark-text-secondary"
                    />
                  </HeadlessMenuButton>
                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <HeadlessMenuItems
                      class="absolute right-0 z-10 mt-0.5 w-20 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                    >
                      <HeadlessMenuItem v-slot="{ active }">
                        <button
                          @click="
                            $router.push({
                              name: 'app-individual-invoice-id',
                              params: { id: client?.billing?.membership_id },
                            })
                          "
                          :class="[
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left',
                          ]"
                        >
                          Detail
                        </button>
                      </HeadlessMenuItem>
                    </HeadlessMenuItems>
                  </transition>
                </HeadlessMenu>
              </div>
              <dl
                class="px-6 py-4 -my-3 text-sm leading-6 divide-y divide-gray-100"
              >
                <ul class="flex flex-col my-5 gap-y-2">
                  <li
                    v-for="i in client?.invoice_pricing_plan_frequency_price
                      ?.pricing_plan?.features"
                    class="flex gap-x-2"
                    :key="i.id"
                  >
                    <Icon
                      name="iconamoon:check-fill"
                      class="text-2xl text-primary shrink-0"
                    />
                    <span
                      class="font-light text-gray-500 dark:text-dark-text-secondary"
                      >{{ i?.feature?.title }}</span
                    >
                  </li>
                </ul>
                <div class="flex justify-between py-3 gap-x-4">
                  <dt
                    class="font-semibold text-gray-600 dark:text-dark-text-secondary"
                  >
                    Membership Duration
                  </dt>
                  <dd class="text-gray-600 dark:text-dark-text-secondary">
                    <span>{{
                      format(new Date(client?.start_date), "PP")
                    }}</span>
                    -
                    <span>{{ format(new Date(client?.end_date), "PP") }}</span>
                  </dd>
                </div>
                <div class="flex justify-between py-3 gap-x-4">
                  <dt
                    class="font-semibold text-gray-600 dark:text-dark-text-secondary"
                  >
                    Price
                  </dt>
                  <dd class="flex items-start gap-x-2">
                    <div
                      class="font-medium text-gray-900 dark:text-dark-text-secondary"
                    >
                      {{ client?.total }} 
                    </div>
                    <div
                      class="px-3 py-px capitalize rounded-lg bg-blue-100 bg-opacity-30 text-blue-600"
                      v-if="
                        client.has_member_paid && client.status === 'unpaid'
                      "
                    >
                      Pending
                    </div>
                    <div
                      class="px-3 py-px text-red-700 capitalize rounded-lg bg-red-50 ring-red-600/10 bg-opacity-30"
                      v-else-if="!client.has_member_paid"
                    >
                      Unpaid
                    </div>
                    <div
                      class="px-3 py-px text-green-700 capitalize bg-green-200 rounded-lg dark:text-green-500 ring-green-600/20 bg-opacity-30"
                      v-else
                    >
                      Paid
                    </div>
                  </dd>
                </div>
              </dl>
            </li>
          </ul>
          <div
            v-else-if="!loading && !clients.length"
            class="flex flex-col items-center justify-center my-10"
          >
            <Icon
              name="mdi:database-search"
              class="text-[8rem] text-gray-500"
            />
            <h1 class="mt-10 text-gray-500">No Memberships Found</h1>
            <button
              @click="
                $router.push({ name: 'app-membership', hash: '#individual' })
              "
              class="px-5 py-1 mt-10 font-semibold duration-200 border-2 rounded-md border-primary hover:bg-primary text-primary hover:text-white hover:shadow-lg"
            >
              Join Now
            </button>
          </div>
          <div v-else class="flex flex-wrap gap-10">
            <Basic-PageLoading />
          </div>
        </HeadlessTabPanel>
        <HeadlessTabPanel
          class="w-full flex justify-center min-h-[40vh]   sideSpace"
        >
          <ul
            role="list"
            class=" content-center flex flex-wrap  justify-center gap-y-10 xl:gap-x-8"
            v-if="!loading && clients.length"
          >
            <!-- class="grid content-center grid-cols-1 bg-red-400 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 place-items-center justify-items-stretch" -->
            <li
              v-for="client in clients"
              :key="client.id"
              class="overflow-hidden border border-gray-200 rounded-xl"
            >
              <div
                class="flex items-center p-6 border-b shadow gap-x-4 border-gray-900/5 bg-gray-50 dark:bg-dark-primary shadow-white"
              >
                <img
                  :src="
                    client?.billing?.membership.organization_membership?.company_logo_url
                  "
                  alt="profile image"
                  class="flex-none object-cover w-12 h-12 bg-white rounded-lg ring-1 ring-gray-900/10"
                />
                <div
                  class="flex flex-col text-sm font-medium leading-6 text-gray-900 dark:text-dark-text-secondary"
                >
                  <h1 class="text-xl">
                    {{
                      client?.billing?.membership?.organization_membership?.company_name
                    }}
                  </h1>
                  <h2 class="text-sm font-light dark:text-dark-text-secondary">
                    {{
                      client?.invoice_pricing_plan_frequency_price?.pricing_plan
                        ?.name
                    }}
                  </h2>
                </div>
                <HeadlessMenu as="div" class="relative ml-auto">
                  <HeadlessMenuButton
                    class="-m-2.5 block p-2.5 text-gray-400 dark:text-dark-text-secondary hover:text-gray-500"
                  >
                    <span class="sr-only">Open options</span>
                    <Icon
                      name="heroicons-outline:dots-vertical"
                      class="text-2xl text-secondary-text dark:text-dark-text-secondary"
                    />
                  </HeadlessMenuButton>
                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <HeadlessMenuItems
                      class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                    >
                      <HeadlessMenuItem v-slot="{ active }">
                        <button
                          @click="
                            $router.push({
                              name: 'app-organization-invoice-id',
                              params: { id: client?.billing?.membership_id },
                            })
                          "
                          :class="[
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left',
                          ]"
                        >
                          Detail
                        </button>
                      </HeadlessMenuItem>
                    </HeadlessMenuItems>
                  </transition>
                </HeadlessMenu>
              </div>
              <dl
                class="px-6 py-4 -my-3 text-sm leading-6 divide-y divide-gray-100"
              >
                <ul class="flex flex-col my-5 gap-y-2">
                  <li
                    v-for="i in client?.invoice_pricing_plan_frequency_price
                      ?.pricing_plan?.features"
                    :key="i"
                    class="flex gap-x-2"
                  >
                    <Icon
                      name="iconamoon:check-fill"
                      class="text-2xl text-primary shrink-0"
                    />
                    <span
                      class="font-light text-gray-500 dark:text-dark-text-secondary"
                      >{{ i?.feature?.title }}</span
                    >
                  </li>
                </ul>
                <div class="flex justify-between py-3 gap-x-4">
                  <dt
                    class="font-semibold text-gray-600 dark:text-dark-text-secondary"
                  >
                    Membership Duration
                  </dt>
                  <dd class="text-gray-600 dark:text-dark-text-secondary">
                    <span>{{
                      format(new Date(client?.start_date), "PP")
                    }}</span>
                    -
                    <span>{{ format(new Date(client?.end_date), "PP") }}</span>
                  </dd>
                </div>
                <div class="flex justify-between py-3 gap-x-4">
                  <dt
                    class="font-semibold text-gray-600 dark:text-dark-text-secondary"
                  >
                    Price
                  </dt>
                  <dd class="flex items-center gap-x-2">
                    <div
                      class="font-medium text-gray-900 dark:text-dark-text-secondary"
                    >
                      {{ client?.total }} 
                    </div>
                    <div
                      class="px-3 py-px capitalize rounded-lg bg-blue-100 bg-opacity-30 text-blue-600"
                      v-if="
                        client.has_member_paid && client.status === 'unpaid'
                      "
                    >
                      unVerified
                    </div>
                    <div
                      class="px-3 py-px text-red-700 capitalize rounded-lg bg-red-50 ring-red-600/10 bg-opacity-30"
                      v-else-if="!client.has_member_paid"
                    >
                      Unpaid
                    </div>
                    <div
                      class="px-3 py-px text-green-700 capitalize bg-green-200 rounded-lg dark:text-green-500 ring-green-600/20 bg-opacity-30"
                      v-else
                    >
                      Paid
                    </div>
                  </dd>
                </div>
              </dl>
            </li>
          </ul>
          <div
            v-else-if="!loading && !clients.length"
            class="flex flex-col items-center justify-center my-10"
          >
            <Icon
              name="mdi:database-search"
              class="text-[8rem] text-gray-500"
            />
            <h1 class="mt-10 text-gray-500">No Memberships Found</h1>
            <button
              @click="
                $router.push({ name: 'app-membership', hash: '#organization' })
              "
              class="px-5 py-1 mt-10 font-semibold duration-200 border-2 rounded-md border-primary hover:bg-primary text-primary hover:text-white hover:shadow-lg"
            >
              Join Now
            </button>
          </div>
          <div v-else class="flex flex-wrap gap-10">
            <Basic-PageLoading />
          </div>
        </HeadlessTabPanel>
      </HeadlessTabPanels>
    </HeadlessTabGroup>
  </div>
</template>
