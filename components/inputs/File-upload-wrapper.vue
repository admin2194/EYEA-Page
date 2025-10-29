<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  modelValue: {
    type: [Array, String, Object],
  },
  name: {
    type: String,
  },
  rules: {
    type: String,
  },
  maxFileSize: {
    type: Number,
  },
  fileLimit: {
    type: Number,
  },
  folder: {
    type: String,
  },
  accept: {
    type: String,
  },
  description: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
});

const emit = defineEmits(["update:modelValue"]);

const { value: inputValue, errorMessage } = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});
const uploadedFiles = ref([]);
const openModal = ref(false);
const file_type = ref();
const FileType = async () => {
  // const response = await fetch(uploadedFiles.value[0]);
  // const headers = await response.headers;
  // file_type.value = headers.get("Content-Type");

  const { data } = await useFetch("/api/file_type", {
    method: "post",
    body: { file_url: uploadedFiles.value[0] },
  });
  file_type.value = data.value;
  console.log("show data", data.value);
};

watch(
  () => uploadedFiles.value,
  (newVal) => {
    inputValue.value = newVal;
    emit("update:modelValue", newVal);
  }
);
</script>
<template>
  <div>
    <ClientOnly>
      <!-- <Toast /> -->
      <InputsFileUploadModal
        :name="name"
        :rules="rules"
        :maxFileSize="maxFileSize"
        :fileLimit="fileLimit"
        :folder="folder"
        :accept="accept"
        v-model="uploadedFiles"
        v-model:openModal="openModal"
        @uploadDone="FileType"
        :description="description"
      />
    </ClientOnly>
    <div class="flex flex-col items-center justify-center">
      <button
        type="button"
        v-if="!uploadedFiles.length"
        class="border-dashed border-2 rounded-md py-5 flex flex-col w-full justify-center items-center pb-10"
        :class="[
          errorMessage ? 'border-red-600' : 'border-gray-300',
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer',
        ]"
        :disabled="disabled"
        @click="openModal = true"
      >
        <Icon name="ion:image-outline" class="text-5xl" />

        <p class="px-5 w-full lg:w-3/4 text-center text-new-tale pt-3">
          Attatch your national ID, Kebele ID, Passport or equivalent
        </p>
      </button>
      <div
        v-else
        class="border-dashed border-2 rounded-md pt-5 pb-2 flex flex-col w-full justify-center items-center cursor-pointer"
      >
        <Suspense>
          <template #default>
            <div
              class="flex flex-col justify-center items-center gap-y-3"
              v-if="!!file_type"
            >
              <div v-for="(i, index) in uploadedFiles">
                <object
                  :data="i"
                  class="object-contain"
                  type="application/pdf"
                  v-if="file_type == 'application/pdf'"
                />
                <img
                  :src="i"
                  class="object-contain"
                  v-if="file_type.includes('image')"
                />
              </div>
              <button
                type="button"
                @click="openModal = true"
                class="ring-1 ring-primary-600 rounded-md hover:bg-primary-500 px-3 py-1 hover:text-white flex gap-x-2 text-primary-600 items-center group duration-200 ease-in transition-all"
              >
                <Icon
                  name="subway:round-arrow-1"
                  class="text-lg group-hover:rotate-45 duration-200 ease-in text-primary-600 group-hover:text-white transition-all"
                />
                Change
              </button>
            </div>
          </template>
          <template #fallback>Loading . . .</template>
        </Suspense>
      </div>
      <small class="mt-2 text-red-600">{{ errorMessage }}</small>
    </div>
  </div>
</template>
