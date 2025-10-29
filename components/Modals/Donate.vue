<script setup>
const DonateVia = ref([
  {
    id: 1,
    url: "https://res.cloudinary.com/blue-sky/image/upload/v1690984637/TeleBirr_ezrsod.png",
    name: "TeleBirr",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/blue-sky/image/upload/v1690984637/CBE_Birr_xpo0h9.png",
    name: "CBE Birr",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/blue-sky/image/upload/v1690984637/Visa_guxqog.png",
    name: "Visa",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/blue-sky/image/upload/v1690984637/alipay_ayrx3q.png",
    name: "AliPay",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/blue-sky/image/upload/v1690984637/Mastercard_e74nfy.png",
    name: "MasterCard",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/blue-sky/image/upload/v1690984637/HibretBank_uwyrt8.png",
    name: "Hibret Bank",
  },
]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  }
})
const  emit = defineEmits(['update:modelValue'])
const openModal = computed({
    get(){
        return props.modelValue
    },
    set(newVal){
        emit("update:modelValue", newVal)
    }
})
</script>

<template>
     <HModal
    v-model="openModal"
    wrapperClass="lg:w-[30%]  space-y-4 px-2 dark:bg-dark-secondary py-6 rounded-lg py-3 bg-white shadow-xl overflow-visible  duration-300"
    class=""
  >
    <template #ModalContent>
      <div class="px-6 flex justify-between">
        <p class="dark:text-white">Donate Cash</p>
        <Icon
          @click="openModal = false"
          class="ml-auto cursor-pointer text-2xl dark:text-white"
          name="carbon:close-outline"
        ></Icon>
      </div>
      <div class="px-6 pt-10">
        <div class="grid md:grid-cols-3  grid-cols-2 gap-6">
          <div
            v-for="(bank, i) in DonateVia"
            :key="i"
            class="border-[1px] rounded-lg p-4"
          >
            <div class="space-y-2">
              <img :src="bank.url" alt="" />
              <p class="dark:text-white text-left">
                {{ bank.name }}
              </p>
            </div>
          </div>
        </div>

        <InfoFooter :title="'For More Information'"></InfoFooter>
        
      </div>
    </template>
  </HModal>
</template>