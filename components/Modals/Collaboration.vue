<script setup>
const pops = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const  emit = defineEmits(["update:modelValue"]);
const openModal = computed({
    get(){
        return pops.modelValue
    },
    set(newVal){
        emit("update:modelValue", newVal)
    }

})


</script>

<template>
  <HModal
    v-model="openModal"
    wrapperClass="lg:w-[30%] space-y-4 px-2 dark:bg-dark-secondary py-6 rounded-lg py-3 bg-white shadow-xl overflow-visible  duration-300"
    class=""
  >
    <template #ModalContent>
      <div class="px-6 flex justify-between">
        <p class="dark:text-white">Implementation & Collaboration</p>
        <Icon
          @click="openModal = false"
          class="ml-auto cursor-pointer text-2xl dark:text-white"
          name="carbon:close-outline"
        ></Icon>
      </div>
      <div class="px-6 pt-10">
        <InputsTextfield
          name="full name"
          rules=""
          type="email"
          class="focus:border-primary px-16 py-[12px] mb-4 dark:bg-dark-secondary"
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
              class="top-3 left-6 text-secondary-text mb-3 dark:text-dark-text-secondary font-poppins"
            >
              Full Name
            </div>
          </template>
        </InputsTextfield>
        <InputsTextfield
          name="email"
          rules=""
          type="email"
          class="focus:border-primary px-16 py-[12px] mb-4 dark:bg-dark-secondary dark:"
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
              class="top-3 left-6 text-secondary-text mb-3 dark:text-dark-text-secondary font-poppins"
            >
              Email
            </div>
          </template>
        </InputsTextfield>

        <InputsTextfield
          name="Document"
          type="email"
          :disabled="true"
          class="focus:border-primary px-16 py-[12px] mb-4 dark:bg-dark-secondary dark:"
          placeholder=""
          placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
        >
          <template #leading>
            <div
              class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
            >
              <Icon name="mingcute:scan-line" width="25" height="25"></Icon>
            </div>
          </template>
          <template #trailing>
            <div
              class="absolute flex justify-center py-4 px-4 dark:bg-dark-secondary bg-gray-200 h-[93%] w-[40%] top-[1px] right-[1px] rounded-r-md text-primary-text-light dark:text-dark-text-secondary font-poppins"
            >
              <Icon name="pajamas:upload" width="20" height="20"></Icon>
              <span class="text-primary-text ml-4 dark:text-dark-text-secondary"
                >upload</span
              >
            </div>
          </template>
          <template #label>
            <div
              class="top-3 left-6 text-secondary-text mb-3 dark:text-dark-text-secondary font-poppins"
            >
              Document
            </div>
          </template>
        </InputsTextfield>
        <HTextarea
          name="description"
          label="About"
          label-class="dark:text-white"
          textareaClass="dark:bg-dark-secondary dark:text-white"
        >
          <template #label>
            <div
              class="top-3 left-6 text-secondary-text mb-3 dark:text-dark-text-secondary font-poppins"
            >
              Description
            </div>
          </template>
        </HTextarea>

        <InputsButton
          @click="openBookModal = true"
          class="flex justify-center items-center space-x-2 text-white bg-primary font-poppins text-xl w-full p-2 py-3 rounded-lg"
          name="Book Now"
        >
          <template #leadingIcon>
            <Icon name="lucide:ticket" width="25" height="25"></Icon>
          </template>
        </InputsButton>
       
        <InfoFooter title="More Information "></InfoFooter>
      </div>
    </template>
  </HModal>
</template>
