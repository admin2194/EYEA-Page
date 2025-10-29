<script setup>
import { useForm } from "vee-validate";
import mutator from "@/composable/mutator";
import upload from "@/API/mutation/upload.gql";
import update_invoice_mutation from "@/API/mutation/membership/update_invoice.gql";
import useNotify from "@/use/notify";

const { notify } = useNotify();
const emit = defineEmits(["update:modelValue", "refetcher"]);
const route = useRoute();
const clientId = ref("member_user");
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
const approveModal = ref(false);
const { handleSubmit } = useForm();
const openModal = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  },
});

const item = ref({});
const base64File = ref("");

const paymentMethods = ref([
  { id: "cash", name: "Cash" },
  { id: "cheque", name: "Cheque" },
  { id: "bank", name: "Bank" },
  { id: "telebirr", name: "Telebirr" },
]);

const submit = handleSubmit(() => {
  approveModal.value = true;
});
const {
  mutate: updateMutate,
  onDone: updateDone,
  loading: updateLoading,
  onError: updateError,
} = mutator(update_invoice_mutation, {clientId: clientId});

const approveInvoice = () => {
  let updateData = {
    set: {
      ...item.value,
      has_member_paid: true,
      date: item.value.member_paid_at,
    },
    membership_id: route.params.id,
  };
  updateMutate(updateData);
  console.log("item value", updateData);
  approveModal.value = false;
};

updateDone(({ data }) => {
  if (data) {
    openModal.value = false;
    emit("refetcher");
    notify({
      title: "Invoice Payment Attachment Successfully Attached",
      description:
        "Your invoice payment attachment has been successfully attached.",
      cardClass: "bg-green-100",
    });
  }
});

updateError((err) => {
  console.log("show error", err);
});

const {
  mutate: uploadMutate,
  loading: uploading,
  onDone: uploadDone,
} = mutator(upload, "");
function uploadFile(value) {
  let file = value.split(";base64,")[1];
  uploadMutate({
    arg: {
      files: [file],
      folder: "membership",
    },
  });
}

uploadDone(({ data }) => {
  item.value.receipt_url = data.upload.secure_urls[0];
  base64File.value = "";
});
</script>

<template>
  <ModalsConfirmation
    v-model="approveModal"
    iconWrapperClass=""
    iconClass="text-2xl text-primary"
    icon="ph:seal-check-fill"
    confirmButton="Approve"
    title="Approve Invoice"
    description="Are you sure you want to approve this invoice?"
    confirmButtonClass="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 sm:ml-3 sm:w-auto"
    @confirm="approveInvoice"
  />
  <HModal
    v-model="openModal"
    class="w-auto mx-auto rounded-none"
    wrapperClass="relative transform overflow-visible rounded-lg bg-white dark:bg-dark-primary text-left shadow-xl transition-all sm:w-full sm:max-w-lg md:max-w-[35vw] sm:p-1 "
    ><template #ModalContent>
      <div class="px-8 py-6 md:px-10">
        <div class="flex items-center justify-between w-full">
          <div
            class="p-1 text-xl font-black leading-6 text-primary dark:text-white"
          >
            Attach Payment Information
          </div>
          <button
            class="p-1 rounded-md cursor-pointer hover:bg-primary/30"
            @click="openModal = false"
          >
            <Icon name="mingcute:close-line" class="text-2xl dark:text-white" />
          </button>
        </div>
        <div class="h-0.5 bg-gray-200 dark:bg-secondary my-2 mb-5"></div>
        <form @submit.prevent="submit">
          <div class="border-[1px] rounded-md px-5 py-5">
            <div class="flex flex-col">
              <div class="flex flex-1 gap-x-5">
                <div class="flex-1">
                  <InputsListselect
                    v-model="item.payment_method"
                    name="Payment Method"
                    rules="required"
                    :items="paymentMethods"
                    trailingIcon="tabler:chevron-down"
                    class="dark:bg-inherit dark:text-white"
                  >
                    <template #label>
                      <div
                        class="mb-2 text-lg font-medium text-black capitalize dark:text-white font-body"
                      >
                        Payment Method
                      </div>
                    </template>
                  </InputsListselect>
                </div>
                <div class="flex-1">
                  <InputsDatePicker
                    rules="required"
                    name="payment date"
                    label="Paid on"
                    label-class="mb-2 text-lg font-medium dark:text-white"
                    class="dark:bg-inherit dark:text-white"
                    v-model="item.member_paid_at"
                  />
                </div>
              </div>
              <div class="flex-1">
                <InputsTextfield
                  rules="required"
                  name="transaction id"
                  v-model="item.transaction_id"
                  class="dark:bg-inherit dark:text-white"
                >
                  <template #label>
                    <h1 class="mb-2 text-lg font-medium dark:text-white">
                      Transaction ID
                    </h1>
                  </template>
                </InputsTextfield>
              </div>
            </div>
            <div class="mt-5">
              <h1 class="mb-5 text-lg font-medium dark:text-white">
                Attach Receipt
              </h1>
              <!-- <InputsFileUploadWrapper
                name="TIN_Document"
                v-model="receipt_file"
                rules="arrayRequired"
                :maxFileSize="1000000"
                :fileLimit="1"
                folder="/applications_form"
                accept="image/*,application/pdf"
                description="Attatch your Receipt file in PNG, JPEG, or PDF format upto 5 Mb"
              /> -->
              <InputsFileUpload
                name="log"
                v-model="base64File"
                :uploaded="item.receipt_url"
                image-class="w-[300px] h-[300px]"
                @upload="uploadFile"
                :crop-max-hight="10000"
                :crop-max-width="10000"
                rules="required"
                :loading="uploading"
              ></InputsFileUpload>
            </div>
          </div>
          <div class="flex justify-end my-5 gap-x-10">
            <button
              @click="openModal = false"
              class="flex items-center px-4 py-2 font-semibold duration-200 rounded-md shadow-md ring-1 ring-primary gap-x-2 hover:shadow-lg dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              @click="submit"
              class="flex items-center px-4 py-2 font-semibold text-white duration-200 rounded-md shadow-md ring-1 ring-primary gap-x-2 hover:shadow-lg bg-primary hover:bg-primary/90"
            >
              <Icon name="ph:seal-check-fill" class="text-2xl" />
              Submit
            </button>
          </div>
        </form>
      </div>
    </template>
  </HModal>
</template>
