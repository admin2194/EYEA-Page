<script setup>
import { useForm } from "vee-validate";
import insert_billing_mutation from "@/API/mutation/membership/insert_billing.gql";
import invoice_generator_mutation from "@/API/mutation/membership/generate_invoice.gql";
import mutator from "@/composable/mutator";

const emit = defineEmits(["update:modelValue"]);
const  clientId = ref("member_user")

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  pricing_plan_frequency_id: {
    type: String,
    required: true,
  },
});

const openModal = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  },
});

const {
  mutate: insertBilling,
  loading: insertBillingLoading,
  onDone: insertBillingDone,
} = mutator(insert_billing_mutation,{clientId: clientId});
const {
  mutate: generateInvoice,
  loading: generateInvoiceLoading,
  onDone: generateInvoiceDone,
} = mutator(invoice_generator_mutation ,{clientId: clientId});

const { handleSubmit } = useForm({});

const item = ref({});

const paymentMethods = ref([
  { id: "cash", name: "Cash" },
  { id: "cheque", name: "Cheque" },
  { id: "bank", name: "Bank" },
]);



const submit = handleSubmit(() => {
  insertBilling({
    billing: {
      address: item.value.address,
      payment_method: item.value.payment_method,
      woreda_town_id: item.value.woreda_town_id,
      membership_id: props.pricing_plan_frequency_id,
    },
  });
});

insertBillingDone(({ data }) => {
  if (data) {
    generateInvoice({
      billing_id: data.items?.id,
      pricing_plan_frequency_id: props.pricing_plan_frequency_id,
    });
  }
});

generateInvoiceDone(({ data }) => {
  console.log("go to invoice", date);
  emit("update:modelValue", false);
});
</script>

<template>
  <HModal
    v-model="openModal"
    class="mx-auto w-auto rounded-none"
    wrapperClass="relative transform overflow-visible rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg md:max-w-[40vw] sm:p-1 "
    ><template #ModalContent>
      <div class="py-6 px-8 md:px-10">
        <div class="w-full flex justify-between items-center">
          <div
            class="font-black text-xl p-1 text-primary leading-6 dark:text-white"
          >
            Billing Information
          </div>
          <button
            class="hover:bg-primary/30 cursor-pointer p-1 rounded-md"
            @click="openModal = false"
          >
            <Icon name="mingcute:close-line" class="text-2xl" />
          </button>
        </div>
        <div class="h-0.5 bg-gray-200 dark:bg-secondary my-2 mb-10"></div>
        <form @submit.prevent="submit" class="flex flex-col">
          <div class="flex flex-wrap gap-x-10">
            <div class="flex-1 min-w-[10rem]">
              <InputsListselect
                name="payment method"
                :items="paymentMethods"
                rules="required"
                v-model="item.payment_method"
                placeholder="Select Payment Method"
              >
                <template v-slot:label>
                  <div class="pb-4 text-secondary-text">Payment Method</div>
                </template>
              </InputsListselect>
            </div>
            <div class="flex-1 min-w-[10rem]">
              <BasicRegion
                v-model="item.region_city_id"
                textClass=" font-sans md:text-lg text-base dark:text-white"
              />
            </div>
          </div>
          <div class="flex flex-wrap gap-x-10">
            <div class="flex-1 min-w-[10rem]">
              <BasicSubcity
                v-model="item.subcity_zone_id"
                :region_id="item.region_city_id"
                textClass=" font-sans md:text-lg text-base dark:text-white"
              />
            </div>
            <div class="flex-1 min-w-[10rem]">
              <BasicWored
                v-model="item.woreda_town_id"
                rules="required"
                textClass=" font-sans md:text-lg text-base dark:text-white"
                :subcity_id="item.subcity_zone_id"
              />
            </div>
          </div>
          <div class="mb-10 flex-1 min-w-[10rem]">
            <InputsTextfield
              name="address"
              rules="required"
              v-model="item.address"
              placeholder="Enter Address"
            >
              <template v-slot:label>
                <div class="pb-4 text-secondary-text">
                  Address <span class="text-red-500">*</span>
                </div>
              </template>
            </InputsTextfield>
          </div>
        </form>
        <div class="flex justify-end w-full">
          <button
            @click="submit"
            class="px-6 py-2 rounded-md text-white bg-primary font-semibold shadow hover:shadow-lg text-lg duration-200"
          >
            <Icon
              name="svg-spinners:ring-resize"
              class="text-2xl"
              v-if="insertBillingLoading || generateInvoiceLoading"
            />
            Save
          </button>
        </div>
      </div>
    </template>
  </HModal>
</template>
