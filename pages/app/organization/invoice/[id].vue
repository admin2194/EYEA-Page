<script setup>
import { format } from "date-fns";
import invoice_detail_query from "@/API/queries/membership/org_invoice.gql";
import lists_composable from "@/composable/query/lists";

definePageMeta({
  layout: "members",
});
const invoiceDetail = ref({});
const clientId = ref("member_user");
const openPaymentModal = ref(false);
const openInvoiceModal = ref(false);
const route = useRoute();

const items = ref([]);
const headers = ref([
  {
    text: "date",
    value: "date",
    sortable: false,
  },
  {
    text: "Description",
    value: "reason",
    sortable: false,
  },
  {
    text: "Invoice Total",
    value: "total",
    sortable: false,
  },
  {
    text: "Status",
    value: "status",
    sortable: false,
  },
  {
    text: "Payment Status",
    value: "payment_status",
    sortable: false,
  },
  {
    text: "Action",
    value: "action",
    sortable: false,
  },
]);

items.value = [
  {
    id: 1,
    name: "abebe",
    reason: "car",
    total: 1000,
    status: "Valid",
    payment_status: "Paid",
    action: true,
  },
  {
    id: 2,
    name: "abebe",
    reason: "car",
    total: 1000,
    status: "Valid",
    payment_status: "Paid",
    action: true,
  },
];
const filter = computed(() => route.params.id);
const {
  onResult,
  onError,
  loading: invoiceLoading,
  refetch,
} = lists_composable(invoice_detail_query, { filter, clientId: clientId });

onResult(({ data }) => {
  if (data) {
    console.log("show data", data);
    items.value = data.invoice;
    invoiceDetail.value = {
      id: data.invoice[0],
      bill_to: `${data?.member[0]?.company_name}`,
      address: `${data?.invoice[0]?.billing?.address}`,
      phone: data?.member[0]?.phone_number,
      email: data?.member[0]?.email,
      date: data?.invoice[0]?.date
        ? format(new Date(data?.invoice[0]?.date), "dd/MM/yyyy")
        : "",
      invoice_number: data?.invoice[0].invoice_number,
      contract_number: data?.member[0]?.memberships[0]?.membership_id,
      plan: data?.member[0]?.memberships[0]?.pricing_plan_frequency_price?.name,
      price:
        data?.member[0]?.memberships[0]?.pricing_plan_frequency_price
          ?.lump_sum_price,
      frequency:
        data?.member[0]?.memberships[0]?.pricing_plan_frequency_price
          ?.frequency,
      reason: data?.invoice[0]?.reason,
      sub_total: data?.invoice[0]?.sub_total,
      tax: data?.invoice[0]?.tax,
      total: data?.invoice[0].total,
      end_date: data?.invoice[0].end_date,
      pricing_plan_frequency_id:
        data?.member[0]?.memberships[0].pricing_plan_frequency_id,
    };
  }
});
</script>
<template>
  <div
    class="flex flex-col py-5 2xl:w-[70%] lg:w-[80%] mx-auto"
    v-if="!invoiceLoading"
  >
    <ModalsPayment
      v-model="openPaymentModal"
      :pricing_plan_frequency_id="invoiceDetail?.pricing_plan_frequency_id"
      @refetcher="refetch"
    />
    <ModalsInvoice v-model="openInvoiceModal" :invoiceDetail="invoiceDetail" />
    <h1 class="mb-5 text-3xl font-black text-primary">Billing</h1>
    <div
      class="grid items-center w-full grid-cols-12 gap-3 px-8 py-5 mx-auto bg-gray-200 rounded-md dark:bg-dark-secondary lg:gap-0"
    >
      <div
        class="flex flex-col col-span-12 gap-4 text-HahuGray2 dark:text-dark-text-secondary lg:col-span-10"
      >
        <div class="text-base font-normal font-body">Current Membership</div>
        <div class="flex flex-row items-center justify-start gap-4">
          <div
            class="text-3xl font-black leading-8 capitalize text-secondary-text dark:text-dark-text-secondary"
          >
            {{ invoiceDetail.plan }}
          </div>
          <!---->
        </div>
        <div class="items-start font-medium w-full lg:w-[60%]">
          {{ invoiceDetail?.reason || "" }}
        </div>
        <div class="flex flex-row justify-start capitalize whitespace-nowrap">
          <div>
            Next Payment: on
            {{ format(new Date(invoiceDetail.end_date), "PP") }}
          </div>
        </div>
      </div>
      <div
        class="relative flex flex-col items-center w-full col-span-12 gap-4 xs:flex-row xs:justify-between lg:col-span-3 lg:flex-col 3xl:col-span-2"
      >
        <!-- <Icon name="ph:user-bold" class="absolute mt-2 text-3xl text-primary" />
        <Icon name="simple-line-icons:badge" class="text-7xl text-primary" /> -->
        <!-- <a
          href="/app/pricing"
          class="w-[90%] rounded bg-primary px-3 py-2 text-center text-white hover:bg-HaHuGreen/2"
        >
          Upgrade Plan
        </a> -->
      </div>
    </div>
    <div
      class="flow-root px-6 mt-8 bg-gray-100 rounded-md dark:bg-dark-secondary"
    >
      <div class="pb-2 -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  v-for="i in headers"
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-dark-text-secondary sm:pl-0 whitespace-nowrap"
                >
                  {{ i.text }}
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only dark:text-dark-text-secondary"
                    >Edit</span
                  >
                </th>
              </tr>
            </thead>
            <tbody
              class="divide-y divide-gray-200 dark:text-dark-text-secondary"
            >
              <tr v-for="invoice in items" :key="invoice.id">
                <td
                  class="py-4 pl-4 pr-3 text-sm font-medium text-left text-gray-900 dark:text-dark-text-secondary whitespace-nowrap sm:pl-0"
                >
                  {{ format(new Date(invoice.date), "dd/MM/yyyy") }}
                </td>
                <td
                  class="py-4 pr-3 text-sm text-left text-gray-500 dark:text-dark-text-secondary whitespace-nowrap"
                >
                  {{ invoice.reason }}
                </td>
                <td
                  class="py-4 pr-3 text-sm text-left text-gray-500 dark:text-dark-text-secondary whitespace-nowrap"
                >
                  {{ invoice.total }}
                </td>

                <td
                  class="py-4 pr-3 text-sm text-left text-gray-500 dark:text-dark-text-secondary whitespace-nowrap"
                >
                  <p
                    class="text-center h-6 rounded-full flex justify-center items-center"
                    :class="
                      invoice.has_member_paid
                        ? 'text-green-600  bg-green-100'
                        : 'text-red-600  bg-red-100'
                    "
                  >
                    {{ invoice.has_member_paid ? "paid" : "unpaid" }}
                  </p>
                </td>
                <td
                  class="py-4 pr-3 text-sm text-left text-gray-500 dark:text-dark-text-secondary whitespace-nowrap"
                >
                  <p
                    class="text-center h-6 w-24 rounded-full flex justify-center items-center"
                    :class="
                      !invoice.has_member_paid
                        ? 'text-red-600  bg-red-100'
                        : invoice.status == 'paid'
                        ? 'text-green-600  bg-green-100'
                        : 'text-blue-600  bg-blue-100'
                    "
                  >
                    {{ !invoice.has_member_paid? "unpaid":invoice.status == "paid" ? "Verified" : "unVerified" }}
                  </p>
                </td>
                <td
                  class="flex gap-5 py-4 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0"
                >
                  <button
                    @click="openInvoiceModal = true"
                    class="px-2 py-1 text-white duration-200 rounded-md shadow bg-primary hover:shadow-lg"
                  >
                    View Invoice
                  </button>
                  <button
                    @click="openPaymentModal = true"
                    v-if="!invoice.has_member_paid"
                    class="flex items-center px-2 py-1 text-white duration-200 rounded-md shadow bg-primary gap-x-2 hover:shadow-lg"
                  >
                    Attach Payment
                    <Icon name="teenyicons:attach-outline" class="text-sm" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-center w-full mx-auto mt-5 gap-x-20 font-poppins">
      <div class="flex flex-col w-full border">
        <div
          class="flex flex-col-reverse items-center justify-between px-10 bg-secondary md:flex-row gap-x-40 py-7"
        >
          <div class="grid w-full grid-cols-2 gap-y-3 md:grid-cols-1">
            <div class="flex items-center gap-x-2">
              <Icon
                name="ri:phone-fill"
                class="p-1 text-4xl bg-white rounded-full text-primary ring-1 ring-green-200"
              />
              <div
                class="flex flex-col text-sm font-light leading-tight text-secondary-text"
              >
                <span>+251 977 061 167</span>
                <span>+251 922 024 197</span>
              </div>
            </div>
            <div class="flex items-center text-sm gap-x-2">
              <Icon
                name="mi:email"
                class="p-1 text-4xl bg-white rounded-full text-primary ring-1 ring-green-200"
              />
              <div
                class="flex flex-col font-light leading-tight text-secondary-text"
              >
                <span>info@eyea.et</span>
              </div>
            </div>
            <div class="flex items-center text-sm gap-x-2">
              <Icon
                name="fluent:globe-24-regular"
                class="p-1 text-4xl bg-white rounded-full text-primary ring-1 ring-green-200"
              />
              <div class="flex flex-col font-light text-secondary-text">
                <span>www.eyea.et</span>
              </div>
            </div>
            <div class="flex items-center text-sm gap-x-2">
              <Icon
                name="tdesign:location"
                class="p-1 text-4xl bg-white rounded-full text-primary ring-1 ring-green-200"
              />
              <div
                class="flex flex-col font-light leading-tight text-secondary-text"
              >
                <span>Dink Sra Building, 4th floor</span>
                <span>4kilo, Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col items-center justify-center flex-1 h-full gap-y-2"
          >
            <img
              src="/images/EYEA_cropped.png"
              class="max-w-[18rem] self-end"
            />
          </div>
        </div>
        <div class="flex flex-col px-10 gap-y-5">
          <div
            class="flex items-center justify-between py-5 overflow-hidden leading-6 border-b-2 border-primary"
          >
            <div class="flex flex-col text-base">
              <p class="mb-5 font-semibold">
                Bill To: &nbsp;{{ invoiceDetail?.bill_to || "---" }}
              </p>
              <p class="max-w-sm text-base gap-x-2 font-extralight">
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
              <h3 class="mb-5 font-semibold text-gray-800">INVOICE</h3>
              <h6 class="font-light text-gray-500">
                Date:
                <span class="font-normal text-gray-800">{{
                  invoiceDetail?.date || "---"
                }}</span>
              </h6>
              <h6 class="flex flex-col font-light text-gray-500">
                Membership ID:
                <span class="font-normal text-gray-800">
                  {{ invoiceDetail?.contract_number || "---" }}
                </span>
              </h6>
              <h6 class="flex flex-col font-light text-gray-500">
                Invoice Number:
                <span class="font-normal text-gray-800">{{
                  invoiceDetail?.invoice_number || "---"
                }}</span>
              </h6>
            </div>
          </div>
          <div
            class="flex justify-between pb-5 text-gray-700 border-b-2 border-gray-300 gap-x-7"
          >
            <div class="flex flex-col gap-y-3">
              <h1 class="text-lg font-semibold text-primary">Description</h1>
              <h2 class="flex flex-col text-lg font-semibold capitalize">
                {{ invoiceDetail?.plan }}
                Plan ({{ invoiceDetail?.frequency }})<span
                  class="text-lg font-light max-w-[300px] normal-case"
                  >{{ invoiceDetail?.reason || "---" }}</span
                >
              </h2>
            </div>
            <div class="flex flex-col gap-y-3">
              <h1 class="text-lg font-semibold text-primary">Price</h1>
              <h2 class="text-lg font-semibold">
                {{ invoiceDetail?.price || 0 }}
              </h2>
            </div>
            <div class="flex flex-col gap-y-3">
              <h1 class="text-lg font-semibold text-primary">Qty</h1>
              <h2 class="text-lg font-semibold capitalize">
                {{ invoiceDetail?.frequency || 1 }}
              </h2>
            </div>
            <div class="flex flex-col gap-y-3">
              <h1 class="text-lg font-semibold text-primary">Amount</h1>
              <h4 class="font-semibold">
                {{ invoiceDetail?.price || 0 }}
              </h4>
            </div>
          </div>
          <div class="w-full text-gray-700">
            <div
              class="grid content-end grid-cols-5 place-content-end place-items-end"
            >
              <h1 class="col-span-4 text-lg font-semibold text-primary">
                Subtotal
              </h1>
              <h2 class="col-span-1">{{ invoiceDetail?.sub_total }}</h2>
            </div>
            <div
              class="grid content-end grid-cols-5 place-content-end place-items-end"
            >
              <h1 class="col-span-4 text-lg font-semibold text-primary">VAT</h1>
              <h2 class="col-span-1">{{ invoiceDetail?.tax }}</h2>
            </div>
            <div
              class="grid content-end grid-cols-5 place-content-end place-items-end"
            >
              <h1 class="col-span-4 text-lg font-semibold text-primary">
                Total Amount Due
              </h1>
              <h2 class="col-span-1 underline">{{ invoiceDetail?.total }}</h2>
            </div>
          </div>
          <div class="flex items-end justify-between mb-5 gap-x-10">
            <div class="flex flex-col">
              <h1 class="text-lg font-light">Invoice Terms:</h1>
              <p class="break-all font-extralight">
                Please deposit your membership fee amount indicated on your
                invoice into our Comercial Bank of Ethiopia Account,
                1000554779108 Ethiopia Youth Entrepreneurs Association. Note:
                indicate your membership ID as the payment description for
                Mobile Bank transfers.
              </p>
            </div>
            <button
              class="flex items-center px-4 py-1 mb-2 border border-gray-400 rounded-md shadow-full"
            >
              <Icon name="material-symbols:download" width="20" height="20" />
              Download
            </button>
          </div>
          <hr />
          <div class="flex justify-end my-5 gap-x-10">
            <button
              @click="$router.push({ name: 'app' })"
              class="flex items-center px-3 py-1 font-semibold duration-200 rounded-md shadow-md ring-1 ring-primary gap-x-2 hover:shadow-lg"
            >
              <Icon name="ion:return-up-back" class="text-2xl" />
              Back
            </button>
            <button
              @click="openPaymentModal = true"
              class="flex items-center px-3 py-2 font-semibold text-white duration-200 rounded-md shadow-md ring-1 ring-primary gap-x-2 hover:shadow-lg bg-primary hover:bg-primary/90"
            >
              <Icon name="teenyicons:attach-outline" class="text-2xl" />
              Attach Payment
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<style scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 5px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(13deg, #cccccc 14%, #cccccc 64%);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cccccc;
  opacity: 90%;
}
::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 0px;
  box-shadow: inset 7px 10px 12px #fff;
}
</style>
