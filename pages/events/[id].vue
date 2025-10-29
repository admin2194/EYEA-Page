<script setup>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import VOtpInput from "vue3-otp-input";

import { format, parseISO, differenceInDays } from "date-fns";
import useNotify from "@/use/notify";
import mutator from "@/composable/anonymous_mutator";
import token_mutator from "@/composable/mutator";
import get_membership_token from "@/API/mutation/get_membership_token.gql";
import upload from "@/API/mutation/upload.gql";
import bookEvent from "@/API/mutation/event/book.gql";
import get_one from "@/composable/query/get_one";
import get_one_api from "@/API/queries/events/get_one_event.gql";
const otpInput = ref(null);
const bindModal = ref("");
const disabled = ref(true);
const booking_token = useCookie("booking_token");

const handleOnChange = (value) => {
  bindModal.value = value;
  if (bindModal.value.length < 6) {
    disabled.value = true;
  } else {
    disabled.value = false;
  }
};
const route = useRoute();
const eventId = ref(route.params.id);
console.log("🚀 ~ file: [id].vue:10 ~eventId:", eventId);
const event = ref({});
const remainingDays = ref("");
const type = ref("");
const { onResult, loading, refetch, onError } = get_one(get_one_api, eventId);
onResult((result) => {
  event.value = result.data.event_events_by_pk;
  type.value =  !event.value.is_zelela ? "Zelela" : "EYEA";
  const currentDate = new Date();
  const parsedTimestamp = parseISO(event.value.event_start_time);
  remainingDays.value =
    differenceInDays(parsedTimestamp, currentDate) > 0
      ? `${differenceInDays(parsedTimestamp, currentDate)} days remaining`
      : "Expired";
  //  remainingDays.value = event.value.event_start_time

  // Format the given timestamp according to your format
});
const router = useRouter();
onError(() => {
  router.replace({
    path: "/error",
  });
  showError({
    statusCode: 404,
    message: "Page not found",
  });
});
// Section for Event booking
const membership = ref("");
const clientId = ref("member_anonymous");
const bookClientId = ref("member_event_booker");
const memberShipId = ref("");
const role = ref("member");
const isNotMember = computed(() => {
  return membership.value === "notMember";
});
const fullName = ref("");
const email = ref("");
const openOtpModel = ref(false);
const companyName = ref("");
const base64 = ref("");
const phoneNumber = ref("");
const occupation = ref("");
const photo_url = ref("");
const { handleSubmit, resetForm } = useForm({});

const { notify } = useNotify();
const {
  mutate: bookEventSubmit,
  loading: bookEventLoading,
  onDone: bookEventDone,
  onError: bookEventError,
} = mutator(bookEvent, {});
const {
  mutate: memberBookEventSubmit,
  loading: memberBookEventLoading,
  onDone: memberBookEventDone,
  onError: memberBookEventError,
} = token_mutator(bookEvent, { clientId: bookClientId, role: role });
const {
  mutate,
  loading: loading_token,
  onError: onTokenError,
  onDone,
} = token_mutator(get_membership_token, { clientId: clientId });

const handleBookEventSubmit = handleSubmit((values, { resetForm }) => {
  bookEventSubmit({
    data: {
      event_id: eventId.value,
      full_name: values.fullName,
      email: values.email,
      // company_name: values.companyName,
      phone_number: values.phoneNumber,
      occupation: values.occupation,
      photo_url: values.photoUrl,
    },
  }).then(() => {
    resetForm();
  });
});

const openOtp = (id) => {
  memberShipId.value = id;
  // memberShipId.value = memberShipId;
  openBookModal.value = false;
  openOtpModel.value = true;
};
const confirm = () => {
  mutate({
    id: memberShipId.value,
    otp: bindModal.value,
  });
};

memberBookEventDone(() => {
  notify({
    title: `Your request has been submitted successfully!`,
    description: `Your request has been submitted successfully! We will contact you soon. Thank you`,
    cardClass: "bg-yellow-100",
  });
  openOtpModel.value = false;
});
memberBookEventError(() => {
  notify({
    title: `Duplicate Booking!`,
    description: `You have already booked this event.`,
    cardClass: "bg-red-100",
  });

  openOtpModel.value = false;
});
bookEventDone((data) => {
  console.log("done book", data);
  notify({
    title: `Your request has been submitted successfully!`,
    description: `Your request has been submitted successfully! We will contact you soon. Thank you`,
    cardClass: "bg-yellow-100",
  });
  // resetForm();
  openBookModal.value = false;
});

bookEventError(({ message }) => {
  notify({
    title: `Duplicate Booking!`,
    description: `You have already booked this event.`,
    cardClass: "bg-red-100",
  });
  // resetForm();
  openBookModal.value = false;
});
const memberData = ref({});
onDone((result) => {
  var token = result.data.membership_event_token.data.token;
  let session = token.split(".")[1];
  booking_token.value = "Bearer " + token;
  console.log(token);

  let data = JSON.parse(window.atob(session));
  memberData.value = data.metadata;
  memberBookEventSubmit({
    data: {
      event_id: eventId.value,
      full_name: memberData.value.full_name,
      email: memberData.value.email,
      // company_name: values.companyName,
      membership_id: memberShipId.value,
      phone_number: memberData.value.phone_number,
      occupation: memberData.value.occupation,
      photo_url: memberData.value.photo_url,
    },
  });
});
const {
  mutate: uploadImage,
  loading: uploadingImage,
  onDone: imageUploadDone,
} = mutator(upload, {});

function uploadId(value) {
  console.log("file upload start");
  let file = value.split(";base64,")[1];
  uploadImage({
    arg: {
      files: [file],
      folder: "book",
    },
  });
}

imageUploadDone(({ data }) => {
  photo_url.value = data.upload.secure_urls[0];
  base64.value = "";
});

// Add to calendar logic section
const formattedStartDate = computed(() => {
  const date = new Date(event.value.event_start_time);
  return format(date, "yyyyMMdd'T'HHmmssz");
});
const formattedEndDate = computed(() => {
  const date = new Date(event.value.event_end_time);
  return format(date, "yyyyMMdd'T'HHmmssz");
});
const formattedEventTitle = computed(() => {
  return event.value.title.split(" ").join("+");
});
const googleCalendarUrl = computed(() => {
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${formattedEventTitle.value}&dates=${formattedStartDate.value}/${formattedEndDate.value}&ctz=UTC&sf=true&output=xml`;
});

const breakpoint = ref({
  50: {
    itemsToShow: 1,
    snapAlign: "start",
  },
  // 780 and up
  400: {
    itemsToShow: 1.3,
    snapAlign: "start",
  },
  820: {
    itemsToShow: 1.5,
    snapAlign: "start",
  },
  // 1067 and up
  923: {
    itemsToShow: 2,
    snapAlign: "start",
  },
  // 1340 and up
  1150: {
    itemsToShow: 2.5,
    snapAlign: "start",
  },
  // 1536 and up
  1370: {
    itemsToShow: 3,
    snapAlign: "start",
  },
  // 1536 and up
  1570: {
    itemsToShow: 3,
    snapAlign: "start",
  },
});
const settings = ref({
  itemsToShow: 1,
  // snapAlign: "end",
});
const openBookModal = ref(false);
</script>
<template>
  <HModal
    v-model="openOtpModel"
    wrapper-class="w-[30vw]   bg-white flex  justify-center rounded-lg p-4 py-14"
  >
    <template #ModalContent>
      <div class="w-[50%] flex items-center flex-col">
        <div class="space-y-4">
          <div class="text-primary-text">
            Enter the OTP sent to your mobile. It's a one-time code for secure
            access. If you don't receive it, click 'Resend OTP.' Keep the code
            confidential for your security
          </div>
          <v-otp-input
            ref="otpInput"
            v-model:value="bindModal"
            input-classes="otp-input dark:bg-dark-secondary dark:text-white"
            separator=" "
            :num-inputs="6"
            :should-auto-focus="true"
            input-type="letter-numeric"
            :conditionalClass="['one', 'two', 'three', 'four']"
            @on-change="handleOnChange"
          />
        </div>

        <button
          name="Verify"
          @click="confirm"
          :disabled="disabled"
          :class="
            disabled
              ? 'px-4 w-full h-[40px] rounded-md bg-[#FFDA92] text-white mt-4'
              : 'px-4 w-full h-[40px] rounded-md bg-primary text-white mt-4'
          "
        >
          <span v-if="!loading_token">Verify</span>
          <Icon
            v-else
            width="20"
            name="eos-icons:bubble-loading"
            class="mx-auto text-3xl text-white"
          ></Icon>
        </button>
      </div>
    </template>
  </HModal>
  <div class="dark:bg-dark-primary">
    <HModal
      v-model="openBookModal"
      wrapperClass="w-full md:w-1/2 lg:w-[30%] h-[96vh] space-y-4 px-2 dark:bg-dark-secondary py-6 rounded-lg py-3 bg-white shadow-xl overflow-y-auto  duration-300"
      class=""
    >
      <template #ModalContent>
        <div class="flex justify-between px-6">
          <p class="dark:text-white">Book Event</p>
          <Icon
            @click="openBookModal = false"
            class="ml-auto text-2xl cursor-pointer dark:text-white"
            name="carbon:close-outline"
          ></Icon>
        </div>
        <div class="flex items-center px-6 gap-x-3">
          <InputsRadio name="member" value="member" v-model="membership"
            ><template #label>
              <label for="member" class="dark:text-white">Member</label>
            </template></InputsRadio
          >
          <InputsRadio name="member" value="notMember" v-model="membership"
            ><template #label>
              <label for="member" class="dark:text-white">Not Member</label>
            </template></InputsRadio
          >
        </div>
        <div class="px-6">
          <BookingSendOtp
            v-model="isNotMember"
            @openOtp="openOtp"
            :type="type"
          ></BookingSendOtp>
          <div class="border-[1px] relative my-4">
            <div
              class="absolute left-[35%] -top-3 dark:text-white bg-white dark:bg-dark-secondary px-4"
            >
              Not A Member
            </div>
          </div>
          <form @submit.prevent="handleBookEventSubmit">
            <InputsTextfield
              :disabled="!isNotMember || membership === ''"
              name="fullName"
              rules="required"
              type="text"
              class="focus:border-primary px-16 py-[12px] mb-4 dark:bg-dark-secondary"
              placeholder="Full Name"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
              v-model="fullName"
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
                  Full Name
                </div>
              </template>
            </InputsTextfield>
            <InputsTextfield
              :disabled="!isNotMember || membership === ''"
              name="email"
              rules="required"
              type="email"
              class="focus:border-primary px-16 py-[12px] mb-4 dark:bg-dark-secondary"
              placeholder="Email"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
              v-model="email"
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
                  Email
                </div>
              </template>
            </InputsTextfield>
            <InputsTextfield
              :disabled="!isNotMember || membership === ''"
              name="companyName"
              rules=""
              type="text"
              class="focus:border-primary px-16 py-[12px] mb-4 dark:bg-dark-secondary"
              placeholder="Company Name"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
              v-model="companyName"
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
              :disabled="!isNotMember || membership === ''"
              name="phoneNumber"
              rules="ethiopian_phone_number"
              type="text"
              class="focus:border-primary px-20 py-[12px] mb-4 dark:bg-dark-secondary"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary"
              v-model="phoneNumber"
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
              :disabled="!isNotMember || membership === ''"
              name="occupation"
              rules="required"
              type="text"
              class="focus:border-primary px-16 py-[12px] mb-4 dark:bg-dark-secondary"
              placeholder="Occupation"
              placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
              v-model="occupation"
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
                  Occupation
                </div>
              </template>
            </InputsTextfield>
            <div class="space-y-2">
              <div
                class="mb-3 text-left text-secondary-text dark:text-dark-text-secondary font-poppins"
              >
                Photo
              </div>
              <InputsScanUpload
                :disabled="!isNotMember || membership === ''"
                v-model="base64"
                :uploaded="photo_url"
                name="photoUrl"
                @upload="uploadId"
                :loading="uploadingImage"
                :crop-max-hight="600"
                :crop-max-width="600"
                :max-file-size="4000000"
                rules="required"
              ></InputsScanUpload>
            </div>
            <div class="pb-2 text-left dark:text-white">
              Please check your account for an email form us and confirm to RSVP
              .Thank you!
            </div>
            <InputsButton
              :disabled="!isNotMember || membership === ''"
              disabled-class="bg-primary-light "
              class="flex items-center justify-center w-full p-2 py-3 space-x-2 text-xl text-white rounded-lg bg-primary font-poppins"
              :name="bookEventLoading ? '' : 'Book Now'"
            >
              <template #leadingIcon>
                <Icon
                  name="lucide:ticket"
                  width="25"
                  height="25"
                  v-if="!bookEventLoading"
                ></Icon>
                <Icon
                  v-else
                  width="20"
                  name="eos-icons:bubble-loading"
                  class="mx-auto text-3xl text-white"
                ></Icon>
              </template>
            </InputsButton>
          </form>
        </div>
      </template>
    </HModal>
    <NavBar navClass="dark:bg-dark-primary"></NavBar>
    <div
      v-if="!loading"
      class="px-2 md:min-h-screen font-poppins md:px-20 md:pt-10 dark:bg-dark-primary"
    >
      <div class="relative">
        <carousel class="w-full" :items-to-show="1">
          <slide :key="1" class="w-full">
            <div class="relative w-full">
              <div class="absolute left-[3%] bottom-[9%] md:w-[50%]">
                <p
                  class="text-xs text-white font-poppins md:text-2xl md:font-semibold"
                >
                  {{ event.title }}.
                </p>
              </div>
              <img
                class="w-full rounded-t-2xl max-h-[80vh] object-cover"
                :src="event.feature_image"
                alt=""
                srcset=""
              />
            </div>
          </slide>

          <template #addons>
            <navigation />
            <!-- <pagination /> -->
          </template>
        </carousel>
      </div>
      <div class="grid grid-cols-1 pt-2 md:grid-cols-11 md:pt-20">
        <div
          class="space-y-10 border-r-2 md:col-span-8 md:pr-20 dark:border-dark-text-secondary"
          :class="event.is_expired ? '!col-span-full !border-none' : ''"
        >
          <div class="dark:text-dark-text-secondary">
            {{ format(parseISO(event?.event_start_time), "MMMM dd, y") }}
          </div>
          <div>
            <p
              class="text-2xl text-center md:text-5xl md:text-left dark:text-white"
            >
              {{ event.title }}
            </p>
          </div>
          <div>
            <p
              class="text-justify md:text-xl md:text-left md:leading-relaxed break-word text-secondary-text dark:text-dark-text-secondary"
            >
              {{ event.description }}
            </p>
          </div>
          <div
            class="px-2 pb-8 space-y-10"
            v-if="event.event_sponsors.length > 0"
          >
            <p class="text-lg font-semibold md:text-2xl dark:text-white">
              Sponsors
            </p>
            <div class="flex flex-wrap">
              <div
                v-for="(data, index) in event.event_sponsors"
                :key="index"
                class="pb-2 pr-2 md:pb-4 md:pr-4"
              >
                <NuxtImg
                  class="w-[100px] h-[100px] object-contain"
                  format="webp"
                  loading="lazy"
                  :src="data.sponsor.logo_url"
                ></NuxtImg>
              </div>
            </div>
          </div>
          <div class="pb-8 space-y-10">
            <p class="text-lg font-semibold md:text-2xl dark:text-white">
              Time & Place
            </p>
            <div class="grid px-2 md:grid-cols-2 space-y-14 md:space-y-0">
              <div class="md:border-r-4">
                <div class="flex space-x-2 md:space-x-14">
                  <div class="text-xl md:text-3xl text-primary">
                    <div
                      class="bg-primary-light dark:bg-[#FAC45D57] p-2 px-4 rounded-lg"
                    >
                      <Icon name="zondicons:calendar"></Icon>
                    </div>
                  </div>
                  <div class="space-y-2 md:space-y-10">
                    <p class="pl-2 md:text-2xl dark:text-white">
                      Date and Time
                    </p>
                    <p
                      v-if="event.event_start_time"
                      class="pl-2 text-secondary-text dark:text-dark-text-secondary"
                    >
                      {{
                        format(
                          parseISO(event?.event_start_time),
                          "EEEE MMMM dd y, hh:mm a"
                        )
                      }}
                    </p>
                    <nuxt-link
                      v-if="event.event_start_time && event.event_end_time"
                      :to="googleCalendarUrl"
                      target="_blank"
                      class="flex items-center space-x-2 text-primary"
                    >
                      <p class="pl-2 font-semibold">Add To Calendar</p>
                      <Icon class="text-2xl" name="jam:arrow-up-right"></Icon>
                    </nuxt-link>
                  </div>
                </div>
              </div>

              <div class="flex md:justify-center">
                <div class="flex space-x-2 md:space-x-14">
                  <div class="text-xl md:text-3xl text-primary">
                    <div
                      class="bg-primary-light dark:bg-[#FAC45D57] p-2 px-4 rounded-lg"
                    >
                      <Icon name="zondicons:location"></Icon>
                    </div>
                  </div>
                  <div class="space-y-2 md:space-y-10">
                    <p class="pl-2 md:text-2xl dark:text-white">Location</p>
                    <p
                      class="pl-2 text-secondary-text dark:text-dark-text-secondary"
                    >
                      {{ event.location }} {{ type }}
                    </p>
                    <!-- <nuxt-link
                      :to="`https://www.google.com/maps?q=${event?.location_coordinates[0]},${event?.location_coordinates[1]}`"
                      target="_blank"
                      class="flex items-center space-x-2 text-primary"
                    >
                      <p class="pl-2 font-semibold">View on map</p>
                      <Icon class="text-2xl" name="jam:arrow-up-right"></Icon>
                    </nuxt-link> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="px-2 pb-8 space-y-10"
            v-if="event.event_partners.length > 0"
          >
            <p class="text-lg font-semibold md:text-2xl dark:text-white">
              Partners
            </p>
            <div class="flex flex-wrap md:space-x-6">
              <div
                v-for="(data, index) in event.event_partners"
                :key="index"
                class="pb-2 pr-2 md:pb-4 md:pr-4"
              >
                <NuxtImg
                  class="md:w-[100px] md:h-[100px] w-[80px] h-[80px] object-contain"
                  format="webp"
                  loading="lazy"
                  :src="data.partner.logo_url"
                ></NuxtImg>
              </div>
            </div>
          </div>
          <div class="px-2 pb-8 space-y-10" v-if="event.speakers.length > 0">
            <p class="text-lg font-semibold md:text-2xl dark:text-white">
              Speakers
            </p>
            <div class="flex justify-center">
              <div class="w-full md:max-w-full">
                <carousel
                  class="pb-20"
                  :breakpoints="breakpoint"
                  snap-align="start"
                >
                  <slide
                    class="pb-10"
                    v-for="(speaker, i) in event.speakers"
                    :key="i"
                  >
                    <Event-Detail-Speaker :speaker="speaker" />
                  </slide>

                  <template #addons>
                    <pagination />
                  </template>
                </carousel>
              </div>
            </div>
          </div>

          <div class="md:w-[50%] pb-5" v-if="event.event_agendas.length > 0">
            <div>
              <p class="mb-5 text-lg font-semibold md:text-2xl dark:text-white">
                Agenda
              </p>
            </div>
            <div
              v-for="(agenda, i) in event.event_agendas"
              :key="i"
              class="space-y-4 pb-10 pl-4 border-l-[3px] relative py-3"
            >
              <Icon
                class="absolute -left-[9px] -top-2 text-gray-400"
                name="octicon:dot-fill-16"
              ></Icon>

              <p class="text-lg md:text-2xl dark:text-white">
                {{ agenda.title }}
              </p>
              <div
                class="flex space-x-4 text-secondary-text dark:text-dark-text-secondary"
              >
                <div
                  class="flex items-center justify-center space-x-2 text-sm md:text-base"
                >
                  <Icon name="subway:time-5"></Icon>
                  <span class="pt-1 dark:text-dark-text-secondary"
                    >2:30 PM - 4:30 PM</span
                  >
                </div>
                <div
                  class="flex items-center justify-center space-x-2 text-sm md:text-base"
                >
                  <Icon name="mdi:museum-outline"></Icon>
                  <span>{{ agenda.venue }}</span>
                </div>
              </div>
              <p
                class="text-sm text-justify text-primary-text-light md:text-left md:text-base dark:text-dark-text-secondary"
              >
                {{ agenda.description }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="md:px-6 md:col-span-3"
          :class="event.is_expired ? '!hidden' : ''"
        >
          <div
            class="w-full p-4 py-8 space-y-10 border-2 rounded-lg border-primary"
          >
            <div class="flex justify-between">
              <p class="text-2xl font-semibold text-primary">Free</p>
              <p class="text-secondary-text dark:text-dark-text-secondary">
                {{ remainingDays }}
              </p>
            </div>
            <p
              class="text-sm text-justify text-secondary-text dark:text-dark-text-secondary md:text-left md:text-base"
            >
              Secure your spot now! Book your event and make memories that last
              a lifetime. Limited availability, reserve today!
            </p>
            <InputsButton
              v-if="!event.is_expired"
              @click="openBookModal = true"
              class="flex items-center justify-center w-full p-2 py-4 space-x-4 text-xl text-white rounded-lg bg-primary font-poppins"
              name="Book Now"
            >
              <template #leadingIcon>
                <Icon name="lucide:ticket" width="25" height="25"></Icon>
              </template>
            </InputsButton>
          </div>
          <div
            class="flex items-center py-10 space-x-2 text-lg text-secondary-text dark:text-dark-text-secondary"
          >
            <img src="@/assets/images/temp/subscribers.png" alt="" />
            <span>people are attending</span>
          </div>
        </div>
      </div>
    </div>
    <Basic-PageLoading v-else />
  </div>
  <LayoutFooter></LayoutFooter>
</template>
<style>
.scroll::-webkit-scrollbar {
  width: 1em;
  display: none;
}

.scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  display: none;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
  display: none;
}

.carousel__next,
.carousel__prev {
  @apply bg-[#5c5b5bb9] rounded-full md:h-10 md:w-10 h-6 w-6 text-white;
}

.carousel__prev--disabled,
.carousel__next--disabled {
  display: none;
}

.carousel__pagination-button::after {
  @apply bg-primary-light h-2 rounded-lg hover:bg-primary;
}
.carousel__pagination-button--active::after {
  @apply bg-primary w-8 rounded-lg;
}

.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  outline-style: none;
  text-align: center;
  @apply border-2 border-primary-light  focus:border-primary focus:outline-0;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  @apply border-primary;
}
</style>
