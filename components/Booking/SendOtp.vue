<script setup>
import opt_query from "@/API/mutation/get_opt.gql";
import mutator from "@/composable/mutator";
import useNotify from "@/use/notify";
// const type = import.meta.env.VITE_TYPE;

const { notify } = useNotify();
const { handleSubmit, resetForm } = useForm({});
const memberShipId = ref("");
const clientId = ref("member_anonymous");
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    default: "Zelela",
    required: true,
  },
});
const emit = defineEmits(["update:modelValue", "openOtp"]);
const isNotMember = computed(() => {
  return props.modelValue;
});
console.log(isNotMember.value);
const {
  mutate,
  loading: otp_loading,
  onDone,
  onError,
} = mutator(opt_query, { clientId: clientId });
const sendOpt = handleSubmit((values, { resetForm }) => {
  console.log("event type ======",props.type);
  mutate({
    id: memberShipId.value,
    event_type: props.type,
  }).then(() => {
    resetForm();
  });
});
onDone((data) => {
  console.log(data);
  emit("openOtp",  memberShipId.value);
});
onError((error) => {
  notify({
    title: `Invalid Membership ID`,
    description: `Please enter a valid membership ID`,
    cardClass: "bg-red-100",
  });
});
</script>

<template>
  <form @submit.prevent="sendOpt">
    <div class="">
      <InputsTextfield
        name="id"
        rules="required"
        type="text"
        :disabled="isNotMember"
        class="focus:border-primary px-16 py-[12px] mb-4 dark:bg-dark-secondary"
        placeholder="EYEA Membership ID"
        placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
        v-model="memberShipId"
      >
        <template #leading>
          <div
            class="absolute top-3 left-6 text-primary-text-light dark:text-white font-poppins"
          >
            <Icon name="octicon:id-badge-16" width="25" height="25"></Icon>
          </div>
        </template>
        <template #label>
          <div
            class="mb-3 top-3 left-6 text-secondary-text dark:text-white font-poppins"
          >
            Membership ID
          </div>
        </template>
      </InputsTextfield>
      <button
        :disabled="isNotMember"
        class="flex items-center justify-center relative p-3 w-full bg-primary text-white py-3 space-x-2 text-xl rounded-md"
        :class="isNotMember || otp_loading ? 'bg-primary-light' : 'bg-primary'"
        :name="otp_loading ? '' : 'Book Now'"
      >
        <div
          class="flex justify-center items-center space-x-4"
          v-if="!otp_loading"
        >
          <Icon name="bi:send-fill" width="25" height="25"></Icon>
          <span>Send</span>
        </div>
        <Icon
          v-else
          width="20"
          name="eos-icons:bubble-loading"
          class="mx-auto text-3xl text-white"
        ></Icon>
      </button>
    </div>
  </form>
</template>
