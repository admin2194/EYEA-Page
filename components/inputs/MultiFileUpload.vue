<script setup>
import { useField } from "vee-validate";
// import upload_query from "@/queries/file_upload_new.gql";
// import mutator from "@/composable/mutator";

const emit = defineEmits([
  "update:modelValue",
  "itemChange",
  "select",
  "clear",
]);

const props = defineProps({
  modelValue: {
    type: [Array, Object, String],
  },
  init: {
    type: [Array, Object, String],
  },
  allowedTypes: {
    type: [Array, String],
    default: "/*",
  },
  folder: {
    type: String,
    default: "files",
    required: false,
  },
  accept: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  invalidFileSizeMessage: {
    type: String,
    default: "{0}: Invalid file size, file size should be smaller than {1}.",
  },
  invalidFileTypeMessage: {
    type: String,
    default: "{0}: Invalid file type, allowed file types: {1}.",
  },
  invalidFileLimitMessage: {
    type: String,
    default: "Maximum number of files exceeded, limit is {0} at most.",
  },
  maxFileSize: {
    type: Number,
    required: true,
  },
  inputClass: {
    type: String,
    default: "",
    required: false,
  },
  name: {
    type: String,
    default: undefined,
    required: true,
  },
  auto: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: String,
    default: "",
    required: false,
  },
  hideDetail: {
    type: Boolean,
    default: false,
    required: false,
  },
  prependIcon: Function,
  fileLimit: { type: Number, default: 1 },
  text: { type: String },
  fileTypes: { type: String },
  thumbnail: { type: Boolean, default: false },
  customizableText: { type: Boolean, default: false },
  preview: {
    type: Boolean,
    default: false,
  },
  editImage: String,
  previewSrc: [Array, String],
  wrapperClass: String,
});

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const fileInput = ref(null);
const files = ref([]);
const uploadedFileCount = ref(0);
const uploadedFiles = ref([]);
const rawFiles = ref([]);
const messages = ref([]);
const dataUrls = ref([]);
const isIcon = ref(true);
const previewSrc = ref(props.init);
const selectedType = ref([]);
const focused = ref(false);
const isUploadDone = ref(false);
const base64Files = ref([]);

onMounted(() => {
  let i = 0;
  const urlToObject = async (imageUrl) => {
    let filename = imageUrl.split("?")[0].split("/").slice(-1)[0].split(".")[0];
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a File object from the Blob
        const file = new File([blob], filename, { type: blob.type });
        file.objectURL = URL.createObjectURL(file);
        createImage(file);
        files.value.push(file);
      });
  };
  while (i < previewSrc.value?.length) {
    urlToObject(previewSrc.value[i]);
    i++;
  }
});

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const open = () => {
  fileInput.value.click();
};

const onFileSelect = async (event) => {
  files.value = files.value || [];
  let _files = event.dataTransfer
    ? event.dataTransfer.files
    : event.target.files;

  for (let file of _files) {
    if (!isFileSelected(file)) {
      if (validate(file)) {
        if (isImage(file)) {
          file.objectURL = window.URL.createObjectURL(file);
        }
        createImage(file);
        files.value.push(file);
      } else {
        console.log("the else", messages.value);
      }
    }
  }

  emit("select", { originalEvent: event, files: files.value });

  if (props.fileLimit) {
    checkFileLimit();
  }

  if (props.auto && hasFiles.value && !isFileLimitExceeded()) {
    upload();
  }
};

function isFileSelected(file) {
  if (files.value && files.value.length) {
    for (let sFile of files.value) {
      if (
        sFile.name + sFile.type + sFile.size ===
        file.name + file.type + file.size
      )
        return true;
    }
  }

  return false;
}

function validate(file) {
  if (props.accept && !isFileTypeValid(file)) {
    messages.value == null ? (messages.value = []) : messages.value;
    messages.value.push(
      props.invalidFileTypeMessage
        .replace("{0}", file.name)
        .replace("{1}", props.accept)
    );

    return false;
  }

  if (props.maxFileSize && file.size > props.maxFileSize) {
    messages.value == null ? (messages.value = []) : messages.value;
    messages.value.push(
      props.invalidFileSizeMessage
        .replace("{0}", file.name)
        .replace("{1}", formatSize(props.maxFileSize))
    );

    return false;
  }

  return true;
}

function isFileTypeValid(file) {
  let acceptableTypes = props.accept.split(",").map((type) => type.trim());

  for (let type of acceptableTypes) {
    let acceptable = isWildcard(type)
      ? getTypeClass(file.type) === getTypeClass(type)
      : file.type == type ||
        getFileExtension(file).toLowerCase() === type.toLowerCase();

    if (acceptable) {
      return true;
    }
  }

  return false;
}

function isWildcard(fileType) {
  return fileType.indexOf("*") !== -1;
}

function getTypeClass(fileType) {
  return fileType.substring(0, fileType.indexOf("/"));
}

function getFileExtension(file) {
  return "." + file.name.split(".").pop();
}
function isImage(file) {
  return /^image\//.test(file.type);
}
function formatSize(bytes) {
  if (bytes === 0) {
    return "0 B";
  }

  let k = 1000,
    dm = 1,
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function checkFileLimit() {
  if (isFileLimitExceeded()) {
    messages.value == null ? (messages.value = []) : messages.value;
    messages.value.push(
      props.invalidFileLimitMessage.replace("{0}", props.fileLimit.toString())
    );
  }
}

function isFileLimitExceeded() {
  if (
    props.fileLimit &&
    props.fileLimit <= files.value.length + uploadedFileCount.value &&
    focused.value
  ) {
    focused.value = false;
  }

  return (
    props.fileLimit &&
    props.fileLimit < files.value.length + uploadedFileCount.value
  );
}

function onMessageClose(index) {
  messages.value.splice(index, 1);
  //   messages.value = null;
}

const hasFiles = computed(() => {
  return files.value && files.value.length > 0;
});

const chooseDisabled = computed(() => {
  return (
    props.disabled ||
    (props.fileLimit &&
      props.fileLimit <= files.value.length + uploadedFileCount.value)
  );
});
const uploadDisabled = computed(() => {
  return (
    props.disabled ||
    !hasFiles.value ||
    (props.fileLimit && props.fileLimit < files.value.length)
  );
});
const cancelDisabled = computed(() => {
  return props.disabled || !hasFiles.value;
});

function clear() {
  files.value = [];
  messages.value = null;
  base64Files.value = [];
  emit("clear");
}

function clearInputElement() {
  fileInput.value = "";
}

function remove(index) {
  files.value.splice(index, 1);
  base64Files.value = [];
  for (let file of files.value) {
    createImage(file);
  }

  emit("update:modelValue", a);
}

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

function createImage(file) {
  var reader = new FileReader();
  reader.onload = (e) => {
    base64Files.value.push(e.target.result);
  };
  reader.readAsDataURL(file);
}
</script>
<template>
  <div
    class="flex flex-col w-auto border border-gray-400 shadow rounded-md pb-3"
  >
    <div
      class="flex flex-wrap items-center gap-y-5 gap-x-10 border-b-2 p-5 bg-gray-100 rounded-t-md"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        :class="[props.inputClass]"
        :accept="props.accept"
        @change="onFileSelect"
        :disabled="disabled"
        :multiple="fileLimit > 1"
      />
      <button
        class="flex-1 flex justify-center items-end gap-2 rounded-md px-4 py-1 bg-gray-200 cursor-pointer disabled:cursor-not-allowed text-new-tale disabled:text-new-tale/50 font-medium border border-new-tale disabled:border-new-tale/50"
        @click="open"
        :disabled="chooseDisabled"
        type="button"
      >
        <Icon name="ph:plus" width="25" height="25" />
        Choose
      </button>
      <button
        @click="upload"
        class="flex-1 flex justify-center items-end gap-2 rounded-md px-4 py-1 bg-gray-200 cursor-pointer disabled:cursor-not-allowed text-new-tale disabled:text-new-tale/50 font-medium border border-new-tale disabled:border-new-tale/50"
        :disabled="uploadDisabled"
        type="button"
      >
        <Icon name="lucide:upload" width="25" height="25" />
        {{ !!init?.length || modelValue ? "Update" : "Upload" }}
      </button>
      <button
        @click="clear"
        class="flex-1 flex justify-center items-end gap-1 rounded-md px-4 py-1 bg-gray-200 cursor-pointer disabled:cursor-not-allowed disabled:text-new-tale/50 text-new-tale font-medium border border-new-tale disabled:border-new-tale/50"
        :disabled="cancelDisabled"
        type="button"
      >
        <Icon name="iconamoon:close-light" width="25" height="25" />
        Clear
      </button>
    </div>
    <TransitionGroup
      name="list"
      tag="ul"
      class="flex flex-col gap-y-5 w-full mt-1 mb-5 px-2"
    >
      <div
        class="bg-red-100 border-l-[6px] border-red-500 rounded-l-md text-teal-900 pl-4 pr-10 py-3 shadow-md relative"
        role="alert"
        v-for="(msg, index) of messages"
        :key="msg"
      >
        <div class="flex">
          <div class="py-1 pr-3">
            <Icon
              name="ion:warning-outline"
              width="35"
              height="35"
              color="#ef4444"
            />
          </div>
          <div class="flex flex-col">
            <p class="font-bold break-words">{{ msg?.split(",")[1] }}</p>
            <p class="text-sm break-all pt-1">
              {{ msg?.split(",")[0] }}
            </p>
          </div>
          <button
            @click="onMessageClose(index)"
            class="hover:text-red-500 duration-200 absolute top-2 right-2"
            type="button"
          >
            <Icon name="carbon:close-outline" width="25" height="25" />
          </button>
        </div>
      </div>
    </TransitionGroup>
    <TransitionGroup
      name="list"
      tag="ul"
      class="flex flex-col gap-5 items-start px-2"
      v-if="files?.length"
    >
      <div
        v-for="(file, index) of files"
        :key="file.name + file.type + file.size"
        class="flex items-center border rounded-md w-full gap-3 px-1 py-3"
      >
        <div class="overflow-hidden w-[150px] rounded-md">
          <img
            role="presentation"
            :alt="file.name"
            :src="file.objectURL"
            class="object-contain"
          />
        </div>
        <div class="w-full flex flex-col justify-start items-start">
          <span class="line-clamp-1">{{ file.name }}</span>
          <div class="flex gap-x-3">
            <span class="">{{ formatSize(file.size) }}</span>
            <!-- <span
              v-if="!isUploadDone"
              class="bg-orange-400 py-1 px-3 rounded-full text-white text-xs font-bold"
              >Pending</span
            >
            <span
              v-if="isUploadDone"
              class="bg-green-500 py-1 px-3 rounded-full text-white text-xs font-bold"
              >Uploaded</span
            > -->
          </div>
        </div>
        <button @click="remove(index)" type="button">
          <Icon name="carbon:close-outline" width="25" height="25" />
        </button>
      </div>
    </TransitionGroup>
    <div v-else class="flex flex-col w-full justify-center items-center">
      <Icon name="radix-icons:image" width="50" height="50" />
      <p class="px-5 w-full lg:w-1/2 text-center text-new-tale pt-3">
        {{ "File Upload" }}
      </p>
    </div>
  </div>
</template>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
