<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modulevalue: Array,
  accept: {
    type: String,
    default: undefined,
  },
  fileSize: { type: Number },
  limit: { type: Number, default: 1 },
  text: { type: String },
  fileType: { type: String },
  thumbnail: { type: Boolean, default: false },
  previewSrc: [Array, String],
  disabled: Boolean,
});

const input = ref(null);

const rawFiles = ref([]);

const dataUrls = ref([]);

const currentSlide = ref(0);
const selectedForchange = ref(false);
const selectedForAdding = ref(false);

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const open = (index) => {
  input.value.click();
};

const add = () => {
  selectedForAdding.value = true;
  input.value.click();
};

watch(
  () => currentSlide.value,
  (value) => {}
);

const deleteFile = () => {
  if (props.fileType === "pdf") {
    dataUrls.value.splice(0, 1);
    rawFiles.value.splice(0, 1);
    emit("update:modelValue", undefined);
  } else {
    dataUrls.value.splice(currentSlide.value, 1);
    rawFiles.value.splice(currentSlide.value, 1);
    emit("update:modelValue", dataUrls.value);
  }
  // to reset the slider value
  currentSlide.value = 0;
};

watch(
  () => rawFiles.value,
  (value) => {}
);

const change = () => {
  selectedForchange.value = true;
  input.value.click();
};

const drop = (event) => {
  rawFiles.value = [];
  select({ target: { files: event.dataTransfer.files } });
};

const files = computed(() => {
  const fs = [];
  if (dataUrls.value.length && rawFiles.value.length) {
    for (let i = 0; i < rawFiles.value.length; i++) {
      fs.push({
        name: rawFiles.value[i].name,
        size: formatBytes(rawFiles.value[i].size),
        dataUrl: dataUrls.value[i],
      });
    }
  }

  return fs;
});

const readFile = (file) => {
  return new Promise(function (resolve, reject) {
    const fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsDataURL(file);
  });
};

const select = async (event) => {
  if (selectedForchange.value) {
    const rf = event.target.files || [];
    rawFiles.value[currentSlide.value] = rf[0];
  } else if (selectedForAdding.value) {
    if (rawFiles.value.length < 2) {
      const rf = event.target.files || [];
      rawFiles.value.push(rf[0]);
    }
  } else {
    const rf = event.target.files || [];
    for (let j = 0; j < rf.length; j++) {
      if (j <= props.limit - 1) {
        rawFiles.value.push(rf[j]);
      } else {
        break;
      }
    }
  }

  const readers = [];
  for (let i = 0; i < rawFiles.value.length; i++) {
    readers.push(readFile(rawFiles.value[i]));
  }

  dataUrls.value = await Promise.all(readers);
  if (props.fileType === "pdf") {
    emit("update:modelValue", [
      { url: dataUrls.value[0], name: rawFiles.value[0].name },
    ]);
  } else {
    emit("update:modelValue", dataUrls.value);
  }
};
</script>
<template>
  <input
    ref="input"
    type="file"
    class="hidden"
    :accept="props.accept"
    @change="select"
    :disabled="props.disabled"
    :multiple="limit > 1"
  />
  <InputsDragAndDrop :disabled="disabled">
    <template #default="{ drag, hover }">
      <div class="h-[360px]">
        <div
          class="flex border-dashed border-2 border-light-blue-500 rounded-lg w-full text-center h-5/6"
          :class="{ 'shadow-xl': hover }"
          @drop.prevent="drop"
        >
          <div
            class="m-auto"
            v-if="!drag && files.length == 0 && previewSrc?.length == 0"
          >
            <div class="flex justify-center">
              <Icon
                name="radix-icons:image"
                v-if="props.fileType == 'image'"
                class="text-secondary-3"
                width="25"
                height="25"
              />
              <Icon
                name="system-uicons:document"
                width="25"
                height="25"
                v-else-if="props.fileType == 'pdf'"
                class="text-secondary-3"
              />
            </div>
            <div class="text-secondary-2">Upload a file or drag and drop</div>
            <div class="text-md font-thin font-body text-secondary-3">
              <span v-if="props.fileType == 'image'">
                PNG, JPG, GIF
                <span v-if="props.fileSize">
                  Up to {{ props.fileSize }}MB
                </span>
              </span>
              <span v-if="props.fileType == 'pdf'">
                pdf
                <span v-if="props.fileSize">
                  Up to {{ props.fileSize }}MB
                </span>
              </span>
            </div>
            <div
              v-if="props.fileType == 'image'"
              class="text-md font-thin font-body text-secondary-3"
            >
              up to {{ props.limit }} files each less than 5MB
            </div>
            <div class="text-secondary-2">Or</div>
            <div class="mt-10 flex justify-center">
              <button
                type="button"
                @click="open"
                class="text-white bg-new-tale focus:outline-none focus:ring-0 font-medium rounded-md font-body text-sm px-6 py-3 flex justify-between"
                :class="disabled ? 'bg-secondary-2 cursor-not-allowed' : ''"
              >
                <Icon
                  name="octicon:upload-16"
                  width="25"
                  height="25"
                  class="mr-2"
                />
                {{ props.text || "Upload a file" }}
              </button>
            </div>
          </div>
          <div v-else-if="drag" class="m-auto font-bold text-primary">
            Release now
          </div>
          <!-- <div class="m-auto" v-else-if="thumbnail && files.length > 0">
          <img :src="files[0].dataUrl" class="h-56 object-contain" alt="" />
        </div> -->
          <div v-else class="m-auto w-full">
            <Carousel
              ref="carousel"
              v-model="currentSlide"
              class="h-full mx-auto max-w-[540px]"
              v-if="
                fileType == 'image' &&
                (files.length > 0 || previewSrc?.length > 0)
              "
            >
              <Slide
                v-for="(file, index) in files"
                :key="index"
                v-if="files.length && fileType == 'image'"
              >
                <div
                  class="flex items-center justify-center min-h-[240px] max-h-60"
                >
                  <img :src="file.dataUrl" class="h-full w-full" alt="" />
                </div>
              </Slide>
              <Slide
                v-for="(prev, i) in previewSrc"
                :key="i"
                v-else-if="previewSrc?.length && fileType == 'image'"
              >
                <div
                  class="flex items-center justify-center min-h-[240px] max-h-60"
                >
                  <img :src="prev" class="h-full w-full" alt="" />
                  <!-- {{previewSrc.length}} -->
                </div>
              </Slide>
              <!-- <div v-if="props.fileType == 'image'">
            </div> -->

              <template #addons="{ slidesCount }">
                <Navigation v-if="slidesCount > 1" class="text-primary" />
              </template>
            </Carousel>
            <div v-else class="flex justify-center">
              <p class="truncate w-[80%]">{{ previewSrc }}</p>
            </div>
          </div>
        </div>
        <!-- {{ files }}, {{ previewSrc?.length }} -->
        <div class="w-4/5 mx-auto" v-if="files.length || previewSrc?.length">
          <div
            class="w-full flex flex-row justify-between md:justify-center items-center pt-5"
          >
            <button
              type="button"
              @click="change"
              class="text-white bg-primary-orange focus:outline-none focus:ring-0 font-medium rounded-sm md:rounded-md font-body text-sm px-2 md:px-4 py-1 md:py-2 flex justify-between mr-3 md:mr-10"
            >
              <Icon name="charm:refresh" class="mr-2" width="25" height="25" />
              Change
            </button>
            <button
              v-if="fileType == 'image'"
              type="button"
              @click="add"
              :disabled="rawFiles.length >= 2 ? true : false"
              class="text-white bg-new-tale focus:outline-none focus:ring-0 font-medium rounded-md font-body text-sm px-2 md:px-4 py-1 md:py-2 flex justify-between mr-3 md:mr-10"
              :class="
                rawFiles.length >= 2 ? 'bg-secondary-4 text-secondary-2' : ''
              "
            >
              <Icon name="ic:round-plus" width="25" height="25" class="mr-2" />
              Add
            </button>
            <button
              type="button"
              @click="deleteFile"
              class="text-white bg-red-600 focus:outline-none focus:ring-0 font-medium rounded-md font-body text-sm px-2 md:px-4 py-1 md:py-2 flex justify-between"
            >
              <Icon
                name="heroicons:trash"
                width="25"
                height="25"
                class="mr-2"
              />
              Delete
            </button>
          </div>
        </div>
      </div>
    </template>
  </InputsDragAndDrop>
</template>

<style scoped></style>
