<script setup>
import { Form, useForm } from "vee-validate";
import { useUserStore } from "@/store/userStore";
import mutator from "@/composable/mutator";
import upload from "@/API/mutation/upload.gql";
import insert_individual_mutation from "@/API/mutation/membership/insert_individual_membership.gql";
import insert_billing_mutate from "@/API/mutation/membership/insert_billing.gql";
import insert_invoice from "@/API/mutation/membership/generate_invoice.gql";
import get_list from "@/API/queries/pricing/get.gql";
import list from "@/composable/query/list";
import { useIndividualMembership ,commonMembership } from "@/store/membership";

definePageMeta({
  layout: "registration",
  middleware: "auth",
});
const useUser = useUserStore();
const indMemStore = useIndividualMembership();
const commonStore = commonMembership();
const router = useRouter();
const route = useRoute();
const items = ref([]);
const offset = ref(0);
const limit = ref(4);
const item = indMemStore.items;
const common = commonStore.items;
const type = ref("individual");
const frequency = ref("year");
const { handleSubmit } = useForm({});
const base64File = ref("");
const base64File2 = ref("");
const mebmershipID = ref();
const address = ref({})
const clientId = ref("member_user")
const current = computed(() => indMemStore.current);
const paymentMethods = ref([
  { id: "cash", name: "Cash" },
  { id: "cheque", name: "Cheque" },
  { id: "bank", name: "Bank" },
  { id: "telebirr", name: "Telebirr" },
]);

indMemStore.$patch((state) => {
  state.items.first_name = useUser?.users?.given_name || "";
  state.items.last_name = useUser?.users?.middle_name || "";
  // state.items.user_id = useUser?.users?.metadata?.user_id || "";
  state.items.gender = useUser?.users?.gender || "";
  state.items.phone_number =
    useUser?.users?.phone_number?.split("+251")[1] || "";
  state.items.email = useUser?.users?.email || "";
});

onUnmounted(() => {
  indMemStore.$reset();
  commonStore.$reset();
});

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
const {
  onResult,
  loading: loadingPrice,
  onError,
} = list(get_list, {limit, offset, filter,clientId:clientId});
onResult((result) => {
  items.value = result.data.items;
});

const {
  mutate: uploadMutate,
  loading: uploading,
  onDone: uploadDone,
} = mutator(upload, {});
const {
  mutate: uploadID,
  loading: uploadingId,
  onDone: IDuploadDone,
} = mutator(upload, {});
uploadDone(({ data }) => {
  item.photo_url = data.upload.secure_urls[0];
  indMemStore.$patch((state) => {
    state.items.photo_url = data.upload.secure_urls[0];

  });
  base64File.value = "";
});
IDuploadDone(({ data }) => {
  indMemStore.$patch((state) => {
    state.items.id_url = data.upload.secure_urls[0];
  });
  base64File2.value = "";
});

const genderList = ref([
  {
    id: "male",
    name: "Male",
  },
  {
    id: "female",
    name: "Female",
  },
]);
const MartialStatus = ref([
  {
    id: "single",
    name: "Single",
  },
  {
    id: "married",
    name: "Married",
  },
]);
const haveDisability = ref([
  {
    id: true,
    name: "Yes",
  },
  {
    id: false,
    name: "No",
  },
]);
const clicked = () => {
  console.log("clicked");
};
const prev = function () {
  indMemStore.prevStep();
};

function uploadFile(value) {
  let file = value.split(";base64,")[1];
  uploadMutate({
    arg: {
      files: [file],
      folder: "membership",
    },
  });
}
function uploadId(value) {
  console.log("file upload start");
  let file = value.split(";base64,")[1];
  uploadID({
    arg: {
      files: [file],
      folder: "membership",
    },
  });
}

// Mutations
const submit = handleSubmit(async (values) => {
  if (current.value == 5) {
    insert_membership();
    return;
  }
  indMemStore.nextStep();
});

const { mutate, loading, onDone } = mutator(insert_individual_mutation, {clientId:clientId});

const {
  mutate: billingMutate,
  loading: billingLoading,
  onDone: billingDone,
  onError: billingError,
} = mutator(insert_billing_mutate, {clientId:clientId});
const {
  mutate: invoiceMutate,
  loading: invoiceLoading,
  onDone: invoiceDone,
  onError: invoiceError,
} = mutator(insert_invoice, {clientId});

function insert_membership() {
  commonStore.$patch((state) => {
    state.items.pricing_plan_frequency_id = route.params.id;
    // state.items.user_id = useUser?.users?.metadata?.user_id || "";
    state.items.membership_type = "individual";
  
  });
  let ind_mem = { ...item };
  ind_mem.memberships ={
    data: {...commonStore.items}
  }
  delete ind_mem.woreda_town_id;
  delete ind_mem.subcity_zone_id;
  delete ind_mem.billing_region_city_id;
  delete ind_mem.billing_woreda_town_id;
  delete ind_mem.billing_subcity_zone_id;
  delete ind_mem.payment_method;
  delete ind_mem.address;

  mutate({
    data: ind_mem,
  });
}


onDone(({ data }) => {
  if (data) {
    let billing = {
      address: item.address,
      membership_id: data.items.memberships[0].membership_id,
      payment_method: item.payment_method,
      woreda_town_id: item.billing_woreda_town_id,
    };
    useUser.$patch((state) => {
      state.users.individualMem++;
    });
    mebmershipID.value = data.items.memberships.membership_id;
    if (data) {
      billingMutate({
        billing: billing,
      });
    }
  }
});

billingDone(({ data }) => {
  if (data) {
    invoiceMutate({
      billing_id: data?.billing?.id,
      pricing_plan_frequency_id: route.params.id,
    });
  }
});

invoiceDone(({ data }) => {
  if (data) {
    console.log("invoice generate perfectly", mebmershipID.value);
    router.push({
      name: "app-individual-new-completed-id",
      params: { id: mebmershipID.value },
    });
  }
});
</script>

<template>
  <HModal v-model="loading" wrapper-class="bg-none">
    <template #ModalContent>
      <Icon
        name="eos-icons:bubble-loading"
        class="text-7xl text-primary"
      ></Icon>
    </template>
  </HModal>
  <div class="flex flex-col items-center dark:bg-dark-secondary font-poppins">
    <div class="w-full min-h-screen space-y-2">
      <div class="flex justify-center">
        <div class="w-[200px]">
          <NuxtLink to="/">
            <img
              src="@/assets/images/logos/EYEA_logos/EYEA_logo_color.svg"
              alt=""
              srcset=""
              width="300"
              class="md:w-[300px] w-[200px]"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="flex pl-[7%] justify-center">
        <!-- steps section -->
        <div
          class="grid grid-cols-6 2xl:w-[50%] lg:w-[70%] md:w-[60%] w-full px-12 pb-4 gap-2"
        >
          <div
            :class="[
              current > 1 ? 'bg-third' : 'bg-third-light2 dark:bg-gray-500',
            ]"
            class="h-2 rounded-lg"
          ></div>
          <div
            :class="[
              current > 2 ? 'bg-third' : 'bg-third-light2 dark:bg-gray-500',
            ]"
            class="h-2 rounded-lg"
          ></div>
          <div
            :class="[
              current > 3 ? 'bg-third' : 'bg-third-light2 dark:bg-gray-500',
            ]"
            class="h-2 rounded-lg"
          ></div>
          <div
            :class="[
              current > 4 ? 'bg-third' : 'bg-third-light2 dark:bg-gray-500',
            ]"
            class="h-2 rounded-lg"
          ></div>
        </div>
      </div>
      <div class="w-full flex justify-center md:px-[5%]">
        <div class="2xl:w-[50%] lg:w-[70%] md:w-[60%] w-full px-6 md:px-0">
          <!-- Step One  -->
          <form v-if="current == 1" @submit.prevent="submit" class="">
            <div class="md:flex md:flex-nowrap md:space-x-4">
              <InputsTextfield
                v-model="item.first_name"
                name="First Name"
                rules=""
                type="text"
                class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
                placeholder="Full Name"
                placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
              >
                <template #leading>
                  <div
                    class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
                  >
                    <Icon
                      name="eva:person-done-outline"
                      width="25"
                      height="25"
                    ></Icon>
                  </div>
                </template>
                <template #label>
                  <div
                    class="mb-3 top-3 left-6 text-secondary-text dark:text-dark-text-secondary font-poppins"
                  >
                    First Name
                  </div>
                </template>
              </InputsTextfield>
              <InputsTextfield
                v-model="item.last_name"
                name="last name"
                rules="required"
                type="text"
                class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
                placeholder="last name"
                placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
              >
                <template #leading>
                  <div
                    class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
                  >
                    <Icon
                      name="eva:person-done-outline"
                      width="25"
                      height="25"
                    ></Icon>
                  </div>
                </template>
                <template #label>
                  <div
                    class="mb-3 top-3 left-6 text-secondary-text dark:text-dark-text-secondary font-poppins"
                  >
                    Last Name
                  </div>
                </template>
              </InputsTextfield>
            </div>
            <InputsDatePicker
              v-model="item.date_of_birth"
              name="date of birth"
              label="Date of Birth"
              rules="required"
              label-class="mb-3 text-secondary-text dark:text-dark-text-secondary font-poppins"
              placeholder="Date of Birth"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
              :show-star="true"
              class="py-4 dark:bg-dark-secondary dark:text-white"
            >
              <template #trailing>
                <div
                  class="absolute -translate-y-3.5 text-secondary-text top-1/2 right-3"
                >
                  <Icon
                    name="eva:calendar-outline"
                    width="25"
                    height="25"
                  ></Icon>
                </div>
              </template>
            </InputsDatePicker>
            <InputsListselect
              name="gender"
              :items="genderList"
              v-model="item.gender"
              class="block w-full py-[12px] rounded-md dark:bg-dark-secondary"
              rules="required"
              placeholder="Gender"
            >
              <template v-slot:label>
                <div
                  class="block mb-4 text-base font-medium leading-6 text-gray-700 dark:text-dark-text-secondary"
                >
                  Gender
                </div>
              </template>
            </InputsListselect>
            <InputsListselect
              v-model="item.marital_status"
              name="marital status"
              :items="MartialStatus"
              class="block w-full py-[12px] rounded-md dark:bg-dark-secondary"
              rules="required"
              placeholder="Martial Status"
            >
              <template v-slot:label>
                <div
                  class="block mb-4 text-base font-medium leading-6 text-gray-700 dark:text-dark-text-secondary"
                >
                  Martial Status
                </div>
              </template>
            </InputsListselect>
            <InputsListselect
              name="disability"
              :items="haveDisability"
              v-model="item.disability_status"
              class="block w-full py-[12px] rounded-md dark:bg-dark-secondary"
              rules="boolReq"
              placeholder="Select"
            >
              <template v-slot:label>
                <div
                  class="block mb-4 text-base font-medium leading-6 text-gray-700 dark:text-dark-text-secondary"
                >
                  Do you have disability?
                </div>
              </template>
            </InputsListselect>
            <button
              @click="clicked"
              class="px-4 w-full h-[40px] rounded-md bg-primary text-white mt-4"
            >
              Create
            </button>
          </form>
          <!-- Step Two -->
          <form v-if="current == 2" @submit.prevent="submit" class="">
            <BasicRegion
              v-model="address.region_city_id"
              name="region"
              rules="required"
            ></BasicRegion>
            <BasicCity
              v-model="common.city_id"
              :woreda_id="item.region_city_id"
              name="city"
              rules="required"
            ></BasicCity>
            <BasicSubcity
              v-model="item.subcity_zone_id"
              :region_id="item.region_city_id"
              name="subcity"
              rules="required"
            ></BasicSubcity>
            <BasicWored
              v-model="common.woreda_town_id"
              :subcity_id="item.subcity_zone_id"
              name="woreda"
              rules="required"
            ></BasicWored>
            
            <InputsTextfield
              v-model="common.kebele"
              name="last name"
              rules="required"
              type="text"
              class="focus:border-primary py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder="kebele"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
            >
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-secondary-text dark:text-dark-text-secondary font-poppins"
                >
                  Kebele
                </div>
              </template>
            </InputsTextfield>
            <div class="grid grid-cols-2 gap-12">
              <button
                type="button"
                @click="prev"
                class="px-4 w-full flex justify-center items-center h-[40px] rounded-md border-2 border-primary text-primary mt-4"
              >
                Previous
              </button>
              <button
                type="submit"
                class="px-4 w-full h-[40px] rounded-md bg-primary text-white mt-4"
              >
                Next
              </button>
            </div>
          </form>
          <!-- Step Three -->
          <form v-if="current == 3" @submit.prevent="submit" class="">
            <InputsTextfield
              v-model="item.phone_number"
              name="phone number"
              rules="ethiopian_phone_number"
              type="text"
              class="focus:border-primary px-20 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary"
            >
              <template #leading>
                <div
                  class="absolute flex justify-center py-4 px-4 bg-gray-200 h-[95%] top-[1px] dark:bg-dark-secondary border-r-[1px] left-[1px] rounded-l-md text-primary-text-light dark:text-dark-text-secondary font-poppins"
                >
                  <span>+251</span>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-secondary-text dark:text-dark-text-secondary font-poppins"
                >
                  Phone Number
                </div>
              </template>
            </InputsTextfield>

            <InputsTextfield
              v-model="item.alt_phone_number"
              name="alt phone number"
              rules="ethiopian_phone_number"
              type="text"
              class="focus:border-primary px-20 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
            >
              <template #leading>
                <div
                  class="absolute flex justify-center py-4 px-4 bg-gray-200 h-[95%] top-[1px] dark:bg-dark-secondary border-r-[1px] left-[1px] rounded-l-md text-primary-text-light dark:text-dark-text-secondary font-poppins"
                >
                  <span>+251</span>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-secondary-text dark:text-dark-text-secondary font-poppins"
                >
                  Alternative Phone Number
                </div>
              </template>
            </InputsTextfield>
            <div class="space-y-2">
              <div class="text-secondary-text dark:text-white">Scanned ID</div>
              <InputsScanUpload
                v-model="base64File2"
                :uploaded="item.id_url"
                @upload="uploadId"
                name="logo"
                :loading="uploadingId"
                :crop-max-hight="600"
                :crop-max-width="600"
                :max-file-size="4000000"
                rules="required"
              ></InputsScanUpload>
            </div>
            <InputsTextfield
              v-model="item.id_number"
              name="id"
              rules="required"
              type="text"
              class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder="Your ID Number or Your ID Card"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
            >
              <template #leading>
                <div
                  class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
                >
                  <Icon
                    name="octicon:id-badge-16"
                    class="text-secondary-text dark:text-white"
                  ></Icon>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-secondary-text dark:text-dark-text-secondary font-poppins"
                >
                  ID Number
                </div>
              </template>
            </InputsTextfield>
            <InputsTextfield
              v-model="item.email"
              name="email"
              rules="required"
              type="email"
              class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary dark:"
              placeholder="user@example.com"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
            >
              <template #leading>
                <div
                  class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
                >
                  <Icon name="ic:outline-email" width="25" height="25"></Icon>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-secondary-text dark:text-dark-text-secondary font-poppins"
                >
                  Email
                </div>
              </template>
            </InputsTextfield>
            <InputsTextfield
              v-model="item.national_id"
              name="contact person phone"
              rules="required"
              type="text"
              class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder="national id"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
            >
              <template #leading>
                <div
                  class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
                >
                  <Icon
                    name="teenyicons:id-outline"
                    width="25"
                    height="25"
                  ></Icon>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
                >
                  Contact person National Id
                </div>
              </template>
            </InputsTextfield>

            <InputsTextfield
              v-model="item.occupation"
              name="contact_person_occupation"
              rules="required"
              type="text"
              class="focus:border-primary px-6 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder-style="text-primary-text-light dark:text-white  "
              placeholder="Enter Occupation"
            >
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
                >
                  Contact person occupation
                </div>
              </template>
            </InputsTextfield>

            <div class="grid grid-cols-2 gap-12">
              <button
                @click="prev"
                type="button"
                class="px-4 w-full cursor-pointer h-[40px] flex justify-center items-center rounded-md border-2 border-primary text-primary mt-4"
              >
                Previous
              </button>
              <button
                type="submit"
                class="px-4 w-full h-[40px] rounded-md bg-primary text-white mt-4"
              >
                Next
              </button>
            </div>
          </form>
          <!-- Step Four -->
          <form v-if="current == 4" @submit.prevent="submit" class="p-4">
            <InputsFileUpload
              name="log"
              v-model="base64File"
              :uploaded="item.photo_url"
              image-class="w-[300px] h-[300px]"
              @upload="uploadFile"
              :crop-max-hight="10000"
              :crop-max-width="10000"
              rules="required"
              :loading="uploading"
            ></InputsFileUpload>

            <div class="grid grid-cols-2 gap-12">
              <div
                @click="prev"
                class="px-4 w-full cursor-pointer h-[40px] flex justify-center items-center rounded-md border-2 border-primary text-primary mt-4"
              >
                Previous
              </div>
              <!--  -->

              <button
                type="submit"
                class="px-4 w-full h-[40px] rounded-md bg-primary text-white mt-4"
              >
                Next
              </button>
            </div>
          </form>
          <!-- Step Five -->
          <form
            v-if="current == 5"
            @submit.prevent="submit"
            class="flex flex-col p-4 pb-5"
          >
            <p> Billing address</p>
            <div class="flex flex-wrap gap-x-10">
              <div class="flex-1 min-w-[10rem]">
                <InputsListselect
                  name="payment method"
                  :items="paymentMethods"
                  rules="required"
                  v-model="item.payment_method"
                  placeholder="Select Payment Method"
                  class="dark:bg-inherit"
                >
                  <template v-slot:label>
                    <div class="pb-4 text-secondary-text dark:text-white">
                      Payment Method
                    </div>
                  </template>
                </InputsListselect>
              </div>
              <div class="flex-1 min-w-[10rem]">
                <BasicRegion
                  v-model="item.billing_region_city_id"
                  textClass=" font-sans md:text-lg text-base dark:text-white"
                />
              </div>
            </div>
            <div class="flex flex-wrap gap-x-10">
              <div class="flex-1 min-w-[10rem]">
                <BasicSubcity
                  v-model="item.billing_subcity_zone_id"
                  :region_id="item.billing_region_city_id"
                  textClass=" font-sans md:text-lg text-base dark:text-white"
                />
              </div>
              <div class="flex-1 min-w-[10rem]">
                <BasicWored
                  v-model="item.billing_woreda_town_id"
                  rules="required"
                  textClass=" font-sans md:text-lg text-base dark:text-white"
                  :subcity_id="item.billing_subcity_zone_id"
                />
              </div>
            </div>
            <div class="mb-10 flex-1 min-w-[10rem]">
              <InputsTextfield
                name="address"
                rules="required"
                v-model="item.address"
                placeholder="Enter Address"
                class="dark:bg-inherit dark:text-white"
              >
                <template v-slot:label>
                  <div class="pb-4 text-secondary-text dark:text-white">
                    Address <span class="text-red-500">*</span>
                  </div>
                </template>
              </InputsTextfield>
            </div>
            <div class="grid grid-cols-2 gap-12">
              <button
                type="button"
                @click="prev"
                class="px-4 w-full font-semibold cursor-pointer h-[40px] flex justify-center items-center rounded-md border-2 border-primary text-primary mt-4"
              >
                Previous
              </button>
              <button
                type="submit"
                class="px-4 bg-primary text-white font-semibold w-full cursor-pointer h-[40px] flex justify-center items-center rounded-md border-2 border-primary mt-4"
              >
                <Icon
                  name="svg-spinners:ring-resize"
                  class="text-2xl"
                  v-if="loading"
                />
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
