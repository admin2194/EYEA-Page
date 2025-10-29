<script setup>
import { useField } from "vee-validate";
import mutator from "@/composable/mutator";
import upload_query from "@/API/mutation/upload.gql";
import useNotify from "@/use/notify";
// import { useToast } from "primevue/usetoast";

const emit = defineEmits([
  "update:modelValue",
  "update:openModal",
  "uploadDone",
  "itemChange",
  "select",
  "clear",
]);

const props = defineProps({
  modelValue: {
    type: [Array, Object, String],
    required: true,
  },
  description: {
    type: String,
  },
  openModal: {
    type: Boolean,
  },
  init: {
    type: [Array, Object, String],
    default: undefined,
  },
  allowedTypes: {
    type: [Array, String],
    default: "/*",
  },
  folder: {
    type: String,
    default: "files",
    required: true,
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

const { modelValue } = toRefs(props);
// const toast = useToast();

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: modelValue.value,
});

const { notify } = useNotify();
const fileInput = ref(null);
const files = ref([]);
const uploadedFileCount = ref(0);
// const uploadedFiles = ref([]);
const uploadedFilesIndex = ref([]);
const rawFiles = ref([]);
const messages = ref([]);
const dataUrls = ref([]);
const isIcon = ref(true);
const previewSrc = ref(props.init);
const selectedType = ref([]);
const focused = ref(false);
const isUploadDone = ref(false);
const base64Files = ref([]);
const uploadedFiles = computed({
  get() {
    return props.init || [];
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  },
});
const openModalVal = computed({
  get() {
    return props.openModal;
  },
  set(newVal) {
    emit("update:openModal", newVal);
  },
});

const urlToObject = async (imageUrl) => {
  const url = new URL(imageUrl);
  console.log("url is", url);
  const filename = url.pathname.split("/").slice(-1)[0].split(".")[0];
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], filename, { type: blob.type });
  file.objectURL = URL.createObjectURL(file);
  file.fromBack = true;
  files.value.push(file);
  console.log("after change", files.value);
};

onMounted(async () => {
  if (previewSrc.value) {
    await Promise.all(previewSrc.value?.map(urlToObject));
  }
});

watch(
  () => modelValue.value,
  (newVal) => {
    inputValue.value = newVal;
  },
  { deep: true }
);

const open = () => {
  fileInput.value.click();
};

const onFileSelect = async (event) => {
  files.value = files.value || [];
  let _files = event.target.files;

  for (let file of _files) {
    if (!isFileSelected(file)) {
      if (validate(file)) {
        file.objectURL = window.URL.createObjectURL(file);
        files.value.push(file);
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

const getNumberOfFiles = computed(() => {
  return Math.floor(parseInt(props.maxFileSize) / parseInt(props.fileLimit));
});

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
  uploadedFiles.value.splice(0, uploadedFiles.value.length);
  emit("update:modelValue", uploadedFiles.value);
}

function clearInputElement() {
  fileInput.value = "";
}

function remove(index) {
  files.value.splice(index, 1);
  uploadedFiles.value.splice(index, 1);
  if (uploadedFiles.value?.length) {
    emit("update:modelValue", uploadedFiles.value);
  }
}

watch(
  () => files.value,
  async (newFiles) => {
    base64Files.value = [];

    const base64Promises = newFiles.map(async (file) => {
      if (file.fromBack || file.fileIsUploaded) {
        return null;
      }
      return {
        base64: await fileToBase64(file),
      };
    });
    const base64Results = await Promise.all(base64Promises);
    base64Files.value = base64Results.filter((result) => result !== null);
  },
  { deep: true }
);

function fileToBase64(file) {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}
const { mutate, onError, onDone, loading } = mutator(upload_query, "");
const upload = () => {
  isUploadDone.value = true;
  let _files = base64Files.value
    .filter((e) => !e.fromBack)
    .map((e) => e.base64.split(";base64,")[1]);
  if (_files.length) {
    mutate({
      arg: {
        files: _files,
        folder: props.folder,
      },
    });
  } else {
    emit("update:modelValue", uploadedFiles.value);
    notify({
      title: "No File Change!",
      description: "No change have been made to the file.",
      cardClass: "bg-yellow-100",
    });
    // toast.add({
    //   severity: "info",
    //   summary: "No Change!",
    //   detail: "No change have been made.",
    //   life: 3000,
    // });
  }
};

onDone(({ data }) => {
  if (data) {
    uploadedFiles.value.push(...data.upload.secure_urls);

    files.value = files.value.map((file) => {
      const fl = new File([file], file.name, {
        ...file,
        type: file.type,
      });
      fl.objectURL = file.objectURL;
      fl.fileIsUploaded = true;
      fl.fromBack = file.fromBack;
      return fl;
    });
    emit("update:modelValue", uploadedFiles.value);
    openModalVal.value = false;
    emit("uploadDone");
    notify({
      title: "File Uploaded Successfully!",
      description: "File Uploaded Successfully!",
      cardClass: "bg-yellow-100",
    });
    // toast.add({
    //   severity: "success",
    //   summary: "File Uploaded Successfully!",
    //   detail: "File Uploaded Successfully!",
    //   life: 3000,
    // });
  }
});
</script>
<template>
  <InputsModal v-model="openModalVal" :autoClose="true">
    <!-- <Toast /> -->
    <template #Heading>
      <div class="flex justify-between items-center w-full text-gray-600">
        <div class="flex gap-x-3">
          <Icon name="icons8:upload-2" width="25" height="25" />
          <p>Upload File</p>
        </div>
        <h1></h1>
      </div>
    </template>
    <template #content>
      <div
        class="mt-10 flex flex-col w-auto border border-gray-300 shadow rounded-md pb-3 transition-all duration-300"
        :class="[
          errorMessage && !value?.length
            ? 'focus:ring-red-500 focus:border-red-500 hover:border-red-500 border-red-500'
            : 'hover:ring-gray-400   hover:border-gray-400 border-gray-300',
        ]"
      >
        <div
          class="flex flex-wrap items-center justify-center gap-y-5 gap-x-3 border-b-2 py-2 px-3 bg-gray-100 rounded-t-md"
        >
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            :name="name"
            :class="[props.inputClass]"
            :accept="props.accept"
            @change="onFileSelect"
            :disabled="disabled"
            :multiple="fileLimit > 1"
          />
          <div class="flex justify-start items-center gap-x-2 w-full">
            <span class="text-lg">Add File</span>
            <button
              class="self-start cursor-pointer text-primary disabled:text-gray-400 disabled:cursor-not-allowed"
              @click="open"
              :disabled="chooseDisabled"
              type="button"
            >
              <Icon
                name="carbon:add-filled"
                class="text-2xl hover:scale-125 duration-200"
              />
            </button>
          </div>
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
              <div class="py-1 pr-3 text-red-600">
                <Icon name="ion:warning-outline" width="35" height="35" />
              </div>
              <div class="flex flex-col">
                <p class="font-bold break-words">
                  {{ msg?.split(",")[1].split("_").join(" ") }}
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
            <div
              class="overflow-hidden rounded-md"
              :class="[
                file.type === 'application/pdf' ? ' w-[60px]' : ' w-[150px]',
              ]"
            >
              <img
                v-if="file.type != 'application/pdf'"
                role="presentation"
                :alt="file.name"
                :src="file.objectURL"
                class="object-contain"
              />
              <Icon
                name="vscode-icons:file-type-pdf2"
                class="text-3xl"
                v-else
              />
            </div>
            <div class="w-full flex flex-col justify-start items-start">
              <span class="line-clamp-1 break-all">{{ file.name }} </span>
              <div class="flex gap-x-3">
                <span class="">{{ formatSize(file.size) }}</span>
              </div>
            </div>
            <button @click="remove(index)" type="button">
              <Icon name="carbon:close-outline" width="25" height="25" />
            </button>
          </div>
        </TransitionGroup>
        <div
          v-else
          class="flex flex-col w-full justify-center items-center cursor-pointer pb-10"
          @click="open"
        >
          <Icon name="ion:image-outline" class="text-5xl" />

          <p class="px-5 w-full lg:w-3/4 text-center text-new-tale pt-3">
            {{ props.description }}
          </p>
        </div>
      </div>
      <div class="mt-5 flex gap-x-5 w-full justify-end">
        <button
          class="px-5 py-1.5 border rounded-md shadow hover:shadow-md transition-all duration-300"
          @click="openModalVal = false"
          type="button"
        >
          Cancel
        </button>
        <button
          @click="upload"
          class="flex gap-x-2 disabled:cursor-not-allowed disabled:bg-gray-300 bg-primary/90 hover:bg-primary px-5 py-1.5 rounded-md text-white hover:shadow-md transition-all duration-300"
          :disabled="uploadDisabled"
          type="button"
          :title="uploadDisabled ? 'Select a file to upload' : ''"
        >
          <Icon
            name="line-md:uploading-loop"
            v-if="loading"
            class="text-2xl text-white"
          />
          {{ !!init?.length || modelValue?.length ? "Update" : "Upload" }}
        </button>
      </div>
      <p
        v-if="!props.hideDetail"
        :class="errorMessage ? 'h-5' : 'h-0'"
        class="mt-2 text-sm text-red-600 font-body"
        id="email-error"
      >
        {{ errorMessage }} &nbsp;
      </p>
    </template>
  </InputsModal>
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
