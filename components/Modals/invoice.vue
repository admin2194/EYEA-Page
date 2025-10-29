<script setup>
const emit = defineEmits(["update:modelValue", "refetcher"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  invoiceDetail: {
    type: [Array, Object, String],
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
</script>

<template>
  <HModal
    v-model="openModal"
    class="mx-auto w-auto rounded-none"
    wrapperClass="relative transform overflow-visible bg-white text-left shadow-xl transition-all sm:w-full max-w-[95vw] sm:max-w-lg md:max-w-[50vw] "
    ><template #ModalContent>
      <div
        class="flex justify-center mx-auto gap-x-20 font-poppins w-full relative"
      >
        <button
          class="absolute top-2 right-3 text-xl ring-1 rounded-md px-1 ring-primary/50 hover:bg-primary hover:text-white duration-200"
          @click="openModal = false"
        >
          <Icon name="uiw:close" />
        </button>
        <div class="flex flex-col border w-full">
          <div
            class="bg-secondary flex md:flex-row flex-col-reverse justify-between items-center gap-x-40 gap-y-10 px-10 py-7"
          >
            <div class="gap-y-3 grid grid-cols-1 md:grid-cols-1 w-full">
              <div class="flex gap-x-2 items-center">
                <Icon
                  name="ri:phone-fill"
                  class="text-4xl text-primary rounded-full p-1 bg-white ring-1 ring-green-200 shrink-0"
                />
                <div
                  class="flex flex-col text-secondary-text font-light text-sm leading-tight"
                >
                  <span>+251 977 061 167</span>
                  <span>+251 922 024 197</span>
                </div>
              </div>
              <div class="flex gap-x-2 items-center text-sm">
                <Icon
                  name="mi:email"
                  class="text-4xl text-primary rounded-full bg-white p-1 ring-1 ring-green-200"
                />
                <div
                  class="flex flex-col text-secondary-text font-light leading-tight"
                >
                  <span>info@eyea.et</span>
                </div>
              </div>
              <div class="flex gap-x-2 items-center text-sm">
                <Icon
                  name="fluent:globe-24-regular"
                  class="text-4xl text-primary bg-white rounded-full p-1 ring-1 ring-green-200"
                />
                <div class="flex flex-col text-secondary-text font-light">
                  <span>www.eyea.et</span>
                </div>
              </div>
              <div class="flex gap-x-2 items-center text-sm">
                <Icon
                  name="tdesign:location"
                  class="text-4xl text-primary rounded-full bg-white p-1 ring-1 ring-green-200"
                />
                <div
                  class="flex flex-col text-secondary-text font-light leading-tight"
                >
                  <span>Dink Sra Building, 4th floor</span>
                  <span>4kilo, Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </div>
            <div
              class="flex-1 flex flex-col lg:items-center lg:justify-center gap-y-2 h-full"
            >
              <img
                src="/images/EYEA_cropped.png"
                class="w-[8rem] lg:max-w-[18rem] lg:self-end"
              />
            </div>
          </div>
          <div class="px-10 flex flex-col gap-y-2">
            <div
              class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-5 overflow-hidden leading-6 py-1 border-b-2 border-primary"
            >
              <div class="flex flex-col text-base">
                <p class="font-semibold mb-5">
                  Bill To: &nbsp;{{ invoiceDetail?.bill_to || "---" }}
                </p>
                <p class="text-base max-w-sm gap-x-2 font-extralight">
                  Address: &nbsp;
                  <span class="font-normal">
                    {{ invoiceDetail?.address || "---" }}
                  </span>
                </p>
                <p class="font-extralight">
                  Phone: &nbsp;
                  <span class="font-normal">
                    {{ `+251${invoiceDetail?.phone}` || "---" }}
                  </span>
                </p>
                <p class="font-extralight">
                  Email: &nbsp;
                  <span class="font-normal">{{
                    invoiceDetail?.email || "---"
                  }}</span>
                </p>
              </div>
              <div class="flex flex-col">
                <h3 class="font-extrabold text-primary-text mb-2">INVOICE</h3>
                <h6 class="font-light text-gray-500">
                  Date:
                  <span class="font-normal text-gray-800">{{
                    invoiceDetail?.date || "---"
                  }}</span>
                </h6>
                <h6 class="font-light flex flex-col text-gray-500">
                  Membership ID:
                  <span class="font-normal text-gray-800">
                    {{ invoiceDetail?.contract_number || "---" }}
                  </span>
                </h6>
                <h6 class="font-light flex flex-col text-gray-500">
                  Invoice Number:
                  <span class="font-normal text-gray-800">{{
                    invoiceDetail?.invoice_number || "---"
                  }}</span>
                </h6>
              </div>
            </div>
            <div
              class="flex flex-col md:flex-row justify-between gap-x-7 border-b-2 border-gray-300 pb-1 text-gray-700"
            >
              <div class="flex flex-col gap-y-1">
                <h1 class="text-primary font-semibold text-lg">Description</h1>
                <h2 class="text-lg font-semibold flex flex-col capitalize">
                  {{ invoiceDetail?.plan }}
                  Plan ({{ invoiceDetail?.frequency }})<span
                    class="text-lg font-light max-w-[300px] normal-case"
                    >{{ invoiceDetail?.reason || "---" }}</span
                  >
                </h2>
              </div>
              <div class="flex flex-col gap-y-1">
                <h1 class="text-primary font-semibold text-lg">Price</h1>
                <h2 class="text-lg font-semibold">
                  {{ invoiceDetail?.price || 0 }}
                </h2>
              </div>
              <div class="flex flex-col gap-y-1">
                <h1 class="text-primary font-semibold text-lg">Qty</h1>
                <h2 class="text-lg font-semibold capitalize">
                  {{ invoiceDetail?.frequency || 1 }}
                </h2>
              </div>
              <div class="flex flex-col gap-y-`">
                <h1 class="text-primary font-semibold text-lg">Amount</h1>
                <h4 class="font-semibold">
                  {{ invoiceDetail?.price || 0 }}
                </h4>
              </div>
            </div>
            <div class="w-full text-gray-700">
              <div
                class="grid grid-cols-1 md:grid-cols-5 content-end place-content-end place-items-end"
              >
                <p class="text-primary font-semibold col-span-4">Subtotal</p>
                <p class="col-span-1 text-xl font-semibold">
                  {{ invoiceDetail?.sub_total }}
                </p>
              </div>
              <div
                class="grid grid-cols-1 lg:grid-cols-5 content-end place-content-end place-items-end"
              >
                <p class="text-primary font-semibold col-span-4">VAT</p>
                <p class="col-span-1 text-xl font-semibold">
                  {{ invoiceDetail?.tax }}
                </p>
              </div>
              <div
                class="grid grid-cols-1 md:grid-cols-5 content-end place-content-end place-items-end"
              >
                <p class="text-primary font-semibold col-span-4">
                  Total Amount Due
                </p>
                <p class="col-span-1 underline text-xl font-semibold">
                  {{ invoiceDetail?.total.toLocaleString("en-US") }}
                </p>
              </div>
            </div>
            <div
              class="flex flex-col md:flex-row items-end justify-between gap-x-10 gap-y-5 mb-5"
            >
              <div class="flex flex-col">
                <h1 class="font-light text-lg">Invoice Terms:</h1>
                <p class="font-extralight break-all">
                  Please deposit your membership fee amount indicated on your
                  invoice into our Comercial Bank of Ethiopia Account,
                  1000554779108 Ethiopia Youth Entrepreneurs Association. Note:
                  indicate your membership ID as the payment description for
                  Mobile Bank transfers.
                </p>
              </div>
              <!-- <button
                class="border px-4 py-1 border-gray-400 flex items-center shadow-full rounded-md mb-2"
              >
                <Icon name="material-symbols:download" width="20" height="20" />
                Download
              </button> -->
            </div>
            <hr />
            <div v-if="false" class="flex justify-end gap-x-10 my-5">
              <button
                @click="openModal = false"
                class="px-3 py-1 ring-1 ring-primary flex items-center gap-x-2 rounded-md shadow-md font-semibold hover:shadow-lg duration-200"
              >
                Cancel
              </button>
              <button
                @click="openPaymentModal = true"
                class="px-3 py-2 ring-1 ring-primary flex items-center gap-x-2 rounded-md shadow-md font-semibold hover:shadow-lg duration-200 bg-primary text-white hover:bg-primary/90"
              >
                <Icon name="teenyicons:attach-outline" class="text-2xl" />
                Attach Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </HModal>
</template>
