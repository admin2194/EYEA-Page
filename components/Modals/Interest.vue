<script setup>
import mutator from "@/composable/anonymous_mutator";
import insert_interest from "@/API/mutation/interest.gql";
import useNotify from "@/use/notify";
const { notify } = useNotify();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "",
  },
});
const { handleSubmit } = useForm({});
const item = ref({});
const emit = defineEmits(["update:modelValue", "update:type"]);
const openModal = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  },
});
const type = computed({
  get() {
    return props.type;
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  },
});

const { mutate, loading, onDone } = mutator(insert_interest);
const submit = handleSubmit(async (values) => {
  item.value.type = type.value == "interest" ? "partnership" : "collaboration";
  mutate({
    data: [item.value],
  });
});
onDone((data) => {
  emit("update:modelValue", false);
  emit("update:type", "");
  notify({
    title: `Interest for ${item.value.type} has been submitted successfully!`,
    description: `Interest for ${item.value.type} has been submitted successfully!`,
    cardClass: "bg-yellow-100",
  });
  item.value = {};
});
</script>

<template>
  <HModal
    v-model="openModal"
    wrapperClass="lg:w-[30%]   space-y-4 px-2 dark:bg-dark-secondary py-6 rounded-lg py-3 bg-white shadow-xl overflow-visible  duration-300"
    class=""
  >
    <template #ModalContent>
      <div class="px-6 flex justify-between">
        <p v-if="type == 'interest'" class="dark:text-white">
          Express Interest of Partnership
        </p>
        <p v-else class="dark:text-white">Implementation & Collaboration</p>
        <Icon
          @click="openModal = false"
          class="ml-auto cursor-pointer text-2xl dark:text-white"
          name="carbon:close-outline"
        ></Icon>
      </div>
      <form @submit.prevent="submit" class="">
        <div class="px-6 pt-10">
          <InputsTextfield
            name="full name"
            v-model="item.name"
            rules="required"
            type="text"
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
            v-model="item.email"
            name="email"
            rules="required"
            type="email"
            class="focus:border-primary px-16 py-[12px] mb-4 dark:bg-dark-secondary dark:"
            placeholder="email"
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

          <HTextarea
            v-model="item.description"
            name="description"
            label="About"
            rules="required"
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

          <button
            type="submit"
            class="flex justify-center items-center space-x-2 text-white bg-primary font-poppins text-xl w-full p-2 py-3 rounded-lg"
          >
            Submit
          </button>

          <InfoFooter title=" for more information"></InfoFooter>
        </div>
      </form>
    </template>
  </HModal>
</template>
