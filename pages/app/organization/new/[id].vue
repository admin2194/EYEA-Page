<script setup>
import { Form, useForm } from "vee-validate";
import mutator from "@/composable/mutator";
import upload from "@/API/mutation/upload.gql";
import insert_org_mutate from "@/API/mutation/membership/insert_organization_membership.gql";
import insert_billing_mutate from "@/API/mutation/membership/insert_billing.gql";
import insert_invoice from "@/API/mutation/membership/generate_invoice.gql";
import { useUserStore } from "@/store/userStore";
import { useMembership, commonMembership } from "@/store/membership";
import Slider from "@vueform/slider";
import list from "@/composable/query/list";
import get_list from "@/API/queries/pricing/get.gql";
import useNotify from "@/use/notify";
const { notify } = useNotify();
const clientId = ref("member_user");
definePageMeta({
  layout: "registration",
  middleware: ["auth"],
});
const route = useRoute();
const orgMemStore = useMembership();
const commonStore = commonMembership();
const item = orgMemStore.items;
const common = commonStore.items;
const current = computed(() => orgMemStore.current);
const items = ref([]);
const offset = ref(0);
const limit = ref(4);
const type = ref("organization");
const frequency = ref("year");
const paymentMethods = ref([
  { id: "cash", name: "Cash" },
  { id: "cheque", name: "Cheque" },
  { id: "bank", name: "Bank" },
  { id: "telebirr", name: "Telebirr" },
]);
const prev = function () {
  orgMemStore.prevStep();
};

onUnmounted(() => {
  orgMemStore.$reset();
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
} = list(get_list, { limit, offset, filter, clientId: clientId });
onResult((result) => {
  items.value = result.data.items;
});
let mebmershipID = ref();
const useUser = useUserStore();
const router = useRouter();

const range = ref([1000000, 10000000]);
const { handleSubmit } = useForm({});
const base64File = ref("");
const base64File2 = ref("");
const base64File3 = ref("");
const {
  mutate: uploadMutate,
  loading: uploadingLogo,
  onDone: uploadDone,
} = mutator(upload, {});
const {
  mutate: ImageuploadMutate,
  loading: ImageuploadingLogo,
  onDone: ImageuploadDone,
} = mutator(upload, {});
const {
  mutate: uploadID,
  loading: uploadingId,
  onDone: IDuploadDone,
  onError: idUploadError,
} = mutator(upload, {});
uploadDone(({ data }) => {
  orgMemStore.$patch((state) => {
    state.items.company_logo_url = data.upload.secure_urls[0];
  });
  base64File.value = "";
});
IDuploadDone(({ data }) => {
  orgMemStore.$patch((state) => {
    state.items.TIN_file_url = data.upload.secure_urls[0];
  });
  base64File2.value = "";
});
ImageuploadDone(({ data }) => {
  orgMemStore.$patch((state) => {
    state.items.contact_person_photo_url = data.upload.secure_urls[0];
  });
  base64File3.value = "";
});

function uploadLogo(value) {
  console.log("file upload start");
  let file = value.split(";base64,")[1];
  uploadMutate({
    arg: {
      files: [file],
      folder: "membership",
    },
  });
}
function uploadImage(value) {
  console.log("file upload start");
  let file = value.split(";base64,")[1];
  ImageuploadMutate({
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

const {
  mutate,
  loading,
  onDone,
  onError: memberError,
} = mutator(insert_org_mutate, { clientId: clientId });
const {
  mutate: billingMutate,
  loading: billingLoading,
  onDone: billingDone,
  onError: billingError,
} = mutator(insert_billing_mutate, { clientId: clientId });
const {
  mutate: invoiceMutate,
  loading: invoiceLoading,
  onDone: invoiceDone,
  onError: invoiceError,
} = mutator(insert_invoice, { clientId: clientId });

const submit = handleSubmit(async (values) => {
  if (current.value >= 6) {
    insert_membership();
    return;
  }
  orgMemStore.nextStep();
});

orgMemStore.$patch((state) => {
  state.items.phone_number =
    useUser?.users?.phone_number?.split("+251")[1] || "";
  state.items.email = useUser?.users?.email || "";
  state.items.range = range.value;
});

function insert_membership() {
  commonStore.$patch((state) => {
    state.items.pricing_plan_frequency_id = route.params.id;
    // state.items.user_id = useUser?.users?.metadata?.user_id || "";
    state.items.membership_type = "organization";
  });
  let memberData = {
    ...item,
    // pricing_frequency_price_id: route.params.id,
    capital_range_start: item.range[0],
    capital_range_end: item.range[1],
  };
  memberData.memberships = {
    data: { ...commonStore.items },
  };
  let billing = {
    address: item.address,
    membership_id: item.membership_id,
    payment_method: item.payment_method,
    woreda_town_id: item.billing_woreda_town_id,
  };
  delete memberData.payment_method;
  delete memberData.address;
  delete memberData.region_city_id;
  delete memberData.subcity_zone_id;
  delete memberData.billing_region_city_id;
  delete memberData.billing_subcity_zone_id;
  delete memberData.billing_woreda_town_id;
  delete memberData.range;
  mutate({
    data: memberData,
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
    (mebmershipID.value = data.items.memberships[0].membership_id),
      useUser.$patch((state) => {
        state.users.organizationMem++;
      });
    if (data) {
      billingMutate({
        billing: billing,
      });
    }
  }
});
memberError((err) => {
  notify({
    title: "organization already exist",
    description: "You have already registered as an organization",
    cardClass: "bg-red-100",
  });
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
      name: "app-organization-new-completed-id",
      params: { id: mebmershipID.value },
    });
  }
});
</script>

<template>
  <!------------  Loading Modal ------------------>
  <HModal v-model="loading" wrapper-class="bg-none">
    <template #ModalContent>
      <Icon
        name="eos-icons:bubble-loading"
        class="text-7xl text-primary"
      ></Icon>
    </template>
  </HModal>
  <div
    class="flex flex-col items-center pb-5 font-poppins dark:bg-dark-secondary"
  >
    <div class="md:w-[100%]">
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
      <div class="flex justify-center w-full">
        <!-------------------  step --------------------->
        <div
          class="grid grid-cols-6 2xl:w-[50%] xl:w-[70%] md:w-[65%] w-full px-12 md:pl-24 gap-2"
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
          <div
            :class="[
              current > 5 ? 'bg-third' : 'bg-third-light2 dark:bg-gray-500',
            ]"
            class="h-2 rounded-lg"
          ></div>
        </div>
      </div>
      <div class="flex justify-center w-full pt-10">
        <div class="2xl:w-[80%] lg:w-[70%] md:w-[60%] w-full px-6 md:px-0">
          <!-- Step one  -->
          <form
            v-if="current == 1"
            @submit.prevent="submit"
            class="md:px-[20%]"
          >
            <InputsTextfield
              v-model="item.company_name"
              name="Company name"
              rules="required"
              type="text"
              class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder="Company Name"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
            >
              <template #leading>
                <div
                  class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
                >
                  <Icon name="uil:building" width="25" height="25"></Icon>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
                >
                  Company Name
                </div>
              </template>
            </InputsTextfield>
            <InputsTextfield
              v-model="item.business_type"
              name="business type"
              rules="required"
              type="text"
              class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder="Business Type"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
            >
              <template #leading>
                <div
                  class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
                >
                  <Icon
                    name="carbon:business-processes"
                    width="25"
                    height="25"
                  ></Icon>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
                >
                  Business Type
                </div>
              </template>
            </InputsTextfield>
            <InputsTextfield
              v-model="item.TIN_number"
              name="Tin number"
              rules="required"
              type="text"
              class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder="Enter Tax ID"
              placeholder-style="text-primary-text-light dark:text-white  "
            >
              <template #leading>
                <div
                  class="absolute top-3 left-6 text-primary-text-light dark:text-white font-poppins"
                >
                  <Icon
                    name="octicon:id-badge-16"
                    width="20"
                    height="20"
                  ></Icon>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
                >
                  TIN Number
                </div>
              </template>
            </InputsTextfield>
            <div class="space-y-2">
              <div class="text-secondary-text dark:text-white">
                Scanned TIN Document
              </div>
              <InputsScanUpload
                v-model="base64File2"
                :uploaded="item.TIN_file_url"
                @upload="uploadId"
                file-type="pdf"
                name="Tin Certificate"
                :loading="uploadingId"
                rules="required"
              ></InputsScanUpload>
            </div>
            <InputsTextfield
              v-model="item.number_of_co_owners"
              name="Number of co-owners"
              rules="required"
              type="number"
              class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder="Number of co-owners"
              placeholder-style="text-primary-text-light dark:text-white  "
            >
              <template #leading>
                <div
                  class="absolute top-3 left-6 text-primary-text-light dark:text-white font-poppins"
                >
                  <Icon name="ph:users" width="25" height="25"></Icon>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
                >
                  Number of co-owners
                </div>
              </template>
            </InputsTextfield>
            <button
              type="submit"
              class="px-4 w-full h-[40px] rounded-md bg-primary text-white mt-4"
            >
              Create
            </button>
          </form>
          <!-- Step Two -->
          <form
            v-if="current == 2"
            @submit.prevent="submit"
            class="md:px-[20%]"
          >
            <BasicRegion
              v-model="item.region_city_id"
              name="region"
              rules="required"
            ></BasicRegion>
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
            <BasicCity
              v-model="common.city_id"
              :woreda_id="common.woreda_town_id"
              name="city"
              rules="required"
            ></BasicCity>
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
          <form
            v-if="current == 3"
            @submit.prevent="submit"
            class="md:px-[20%]"
          >
            <InputsTextfield
              v-model="item.phone_number"
              name="phone number"
              rules="ethiopian_phone_number"
              type="text"
              class="focus:border-primary px-20 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder-style="text-primary-text-light dark:text-white  "
            >
              <template #leading>
                <div
                  class="absolute flex justify-center py-4 px-4 bg-gray-200 h-[95%] dark:bg-dark-secondary border-r-[1px] top-[1px] left-[1px] rounded-l-md text-primary-text-light dark:text-white font-poppins"
                >
                  <span>+251</span>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
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
              placeholder-style="text-primary-text-light dark:text-white  "
            >
              <template #leading>
                <div
                  class="absolute flex justify-center py-4 px-4 bg-gray-200 h-[95%] dark:bg-dark-secondary border-r-[1px] top-[1px] left-[1px] rounded-l-md text-primary-text-light dark:text-white font-poppins"
                >
                  <span>+251</span>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
                >
                  Alternative Phone Number
                </div>
              </template>
            </InputsTextfield>

            <InputsTextfield
              v-model="item.website_link"
              name="website link"
              rules="required"
              type="text"
              class="focus:border-primary px-24 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder-style="text-primary-text-light dark:text-white  "
            >
              <template #leading>
                <div
                  class="absolute flex justify-center py-4 px-4 bg-gray-200 h-[95%] dark:bg-dark-secondary border-r-[1px] top-[1px] left-[1px] rounded-l-md text-primary-text-light dark:text-white font-poppins"
                >
                  <span>http://</span>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
                >
                  website
                </div>
              </template>
            </InputsTextfield>

            <InputsTextfield
              name="email"
              rules="required"
              type="email"
              v-model="item.email"
              class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder="user@example.com"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
            >
              <template #leading>
                <div
                  class="absolute top-3 left-6 text-primary-text-light dark:text-white font-poppins"
                >
                  <Icon name="ic:outline-email" width="25" height="25"></Icon>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
                >
                  Email
                </div>
              </template>
            </InputsTextfield>
            <div class="space-y-2">
              <div class="text-secondary-text dark:text-white">
                Company Logo
              </div>
              <InputsScanUpload
                v-model="base64File"
                :uploaded="item.company_logo_url"
                @upload="uploadLogo"
                name="Company Logo"
                :loading="uploadingLogo"
                rules="required"
              ></InputsScanUpload>
            </div>

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
          <!-- Step Four -->
          <form v-if="current == 4" @submit.prevent="submit" class="">
            <div>
              <div
                class="w-full flex flex-col justify-center space-y-6 h-[50vh] items-center pb-2"
              >
                <div
                  class="2xl:w-[50%] lg:w-[70%] md:w-[60%] flex flex-col space-y-20 items-center"
                >
                  <div class="space-y-10">
                    <p
                      class="text-3xl text-center text-secondary-text dark:text-white"
                    >
                      Capital Range
                    </p>
                    <p
                      class="px-20 text-center text-secondary-text dark:text-white"
                    >
                      Enim quis cursus eget blandit consectetur venenatis
                      imperdiet id. Nulla amet sit lacinia vestibulum sapien
                      ultrices vitae.
                    </p>
                    <Slider v-model="item.range" :max="20000000" :min="1000" />
                    <div
                      class="flex justify-between text-secondary-text dark:text-white"
                    >
                      <div>
                        <p>
                          <span>{{ item.range[0] }}</span>
                          <span>Birr</span>
                        </p>
                      </div>
                      <p>
                        <span>{{ item.range[1] }}</span>
                        <span>Birr</span>
                      </p>
                    </div>
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
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form
            v-if="current == 5"
            @submit.prevent="submit"
            class="md:px-[20%]"
          >
            <div class="space-y-2">
              <div class="text-secondary-text dark:text-white">
                Contact Person photo
              </div>
              <InputsFileUpload
                name="log"
                v-model="base64File3"
                :uploaded="item.contact_person_photo_url"
                image-class="w-[200px] h-[150px]"
                @upload="uploadImage"
                :crop-max-hight="10000"
                :crop-max-width="10000"
                rules="required"
                :loading="ImageuploadingLogo"
              ></InputsFileUpload>
            </div>
            <InputsTextfield
              v-model="item.contact_person_name"
              name="contact person name"
              rules="required"
              type="text"
              class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder="full Name"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
            >
              <template #leading>
                <div
                  class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
                >
                  <Icon name="ph:user-bold" width="25" height="25"></Icon>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
                >
                  Contact person Name
                </div>
              </template>
            </InputsTextfield>
            <InputsTextfield
              name="contact email"
              rules="required"
              type="email"
              v-model="item.contact_person_email"
              class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder="user@example.com"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
            >
              <template #leading>
                <div
                  class="absolute top-3 left-6 text-primary-text-light dark:text-white font-poppins"
                >
                  <Icon name="ic:outline-email" width="25" height="25"></Icon>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
                >
                  Contact person Email
                </div>
              </template>
            </InputsTextfield>
            <InputsTextfield
              v-model="item.contact_phone_number"
              name="contact_person_phone"
              rules="ethiopian_phone_number"
              type="text"
              class="focus:border-primary px-20 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder-style="text-primary-text-light dark:text-white"
            >
              <template #leading>
                <div
                  class="absolute flex justify-center py-4 px-4 bg-gray-200 h-[95%] dark:bg-dark-secondary border-r-[1px] top-[1px] left-[1px] rounded-l-md text-primary-text-light dark:text-white font-poppins"
                >
                  <span>+251</span>
                </div>
              </template>
              <template #label>
                <div
                  class="mb-3 top-3 left-6 text-primary-text dark:text-white font-poppins"
                >
                  Contact person phone
                </div>
              </template>
            </InputsTextfield>
            <InputsTextfield
              v-model="item.contact_person_national_id"
              name="contact person phone"
              rules="required"
              type="text"
              class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
              placeholder="National"
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
              v-model="item.contact_person_occupation"
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
          <!-- Step Five -->
          <form
            v-if="current == 6"
            @submit.prevent="submit"
            class="p-4 max-w-[40rem] mx-auto"
          >
          <div class="w-full flex justify-center pb-10 text-xl font-bold text-primary-text "><p clas>Billing address</p> </div>
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
                placeholderStyle="text-primary-text-light dark:text-white"
                class="dark:bg-inherit"
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

<style src="@vueform/slider/themes/default.css"></style>
