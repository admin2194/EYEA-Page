<script setup>
import { useField } from "vee-validate";
import "vue-advanced-cropper/dist/style.css";
const emit = defineEmits(["update:modelValue", "upload", "select"]);
const props = defineProps({
  modelValue: {
    type: [Array, Object, String],
  },
  uploaded: {
    type: [Array, Object, String],
  },
  way: {
    type: String,
    default: "",
  },
  cropperClass: {
    type: String,
    default: "",
  },
  cropMaxWidth: {
    type: Number,
    default: 600,
  },
  cropMaxHight: {
    type: Number,
    default: 600,
  },
  cropMinWidth: {
    type: Number,
    default: 100,
  },
  cropMinHight: {
    type: Number,
    default: 100,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  maxFileSize: {
    type: Number,
    required: false,
    default: 10485760, // In byte
  },
  inputClass: {
    type: String,
    default: "",
    required: false,
  },
  imageClass: {
    type: String,
    default: "",
  },
  stencilComponent: {
    type: String,
    default: "rectangle",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: undefined,
    required: true,
  },
  fileType: {
    type: String,
    default: "image",
    required: false,
  },
  fileTypesMessage: {
    type: String,
    default: "PNG, JPG, GIF, upto 10MB",
    required: false,
  },
  rules: {
    type: String,
    default: "",
    required: false,
  },

  text: { type: String },
  fileTypes: { type: String },
  wrapperClass: String,
});

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.uploaded,
});
const errorMessage2 = ref("");
const fileInput = ref(null);
const files = ref([]);
const type = ref("");
const base64Files = ref([]);
const base64String = ref("/*");
const fileInfo = ref({});
const open = () => {
  fileInput.value.click();
};
function getFileSize(bytes) {
  if (bytes === 0) {
    return "0 B";
  }

  let k = 1000,
    dm = 1,
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
const onFileSelect = async (event) => {
  errorMessage2.value = "";
  event.preventDefault();
  let _files = event.dataTransfer
    ? event.dataTransfer.files
    : event.target.files;

  for (let file of _files) {
    file.objectURL = window.URL.createObjectURL(file);
    fileInfo.value.name = file.name;
    fileInfo.value.size = getFileSize(file.size);
    fileInfo.value.type = file.type;
    // console.log(file.type);

    if (props.fileType == "pdf") {
      if (file.type != "application/pdf") {
        errorMessage2.value = "Please upload a pdf file";
        return;
      }
    } else {
      if (
        file.type != "image/jpeg" &&
        file.type != "image/png" &&
        file.type != "image/gif" &&
        file.type != "image/jpg" &&
        file.type != "image/svg+xml"
      ) {
        errorMessage2.value = "Please upload a image file";
        return;
      }
    }

    if (file.size > props.maxFileSize) {
      errorMessage2.value = "Please, upload a file less than 10 MB";
      return;
    }
    createImage(file);
    files.value[0] = file;
  }
  openModal.value = true;
};

function createImage(file) {
  var reader = new FileReader();
  reader.onload = (e) => {
    base64Files.value[0] = e.target.result;
    // props.modelValue = base64Files.value[0];
    // console.log("uploading", base64Files.value[0]);
    emit("upload", base64Files.value[0]);
  };
  reader.readAsDataURL(file);
}
const handleDragOver = (event) => {
  event.preventDefault();
};
const fileName = ref("");
watch(
  () => props.modelValue,
  (newVal) => {
    // inputValue.value = newVal;
  }
);
watch(
  () => props.uploaded,
  (newVal) => {
    fileName.value = fileInfo.value.name;
    console.log("filename", newVal);
    inputValue.value = newVal;
    openModal.value = false;
  }
);
const openModal = ref(false);
</script>
<template>
  <div
    class="relative flex flex-col w-auto border border-gray-400 rounded-md shadow"
    @dragover="handleDragOver"
    @drop="onFileSelect"
  >
    <div class="absolute left-[40%] top-[3px]" v-if="loading">
      <Icon
        name="line-md:loading-twotone-loop"
        class="text-4xl text-primary"
      ></Icon>
    </div>
    <div class="flex flex-wrap items-center gap-y-5 gap-x-10 rounded-t-md">
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        :class="[props.inputClass]"
        :accept="props.accept"
        @change="onFileSelect"
        :disabled="disabled"
      />
    </div>
    <div class="flex items-center justify-between w-full pl-4">
      <div class="flex flex-col items-center space-y-2">
        <Icon
          name="ant-design:scan-outlined"
          class="text-xl text-secondary-text dark:text-white"
        ></Icon>
      </div>
      <span class="dark:text-white line-clamp-1">
        {{
          fileName ||
          uploaded?.split("https://cdn.hahu.jobs/public/eyea/membership/")[1] ||
          ""
        }}</span
      >
      <button
        :disabled="loading"
        @click="open"
        type="button"
        class="cursor-pointer flex justify-center py-2 px-4 dark:bg-dark-secondary bg-gray-200 w-[30%] h-[95%] top-[1px] right-5 rounded-r-md text-primary-text-light dark:text-dark-text-secondary font-poppins"
      >
        <div>
          <Icon name="pajamas:upload" width="20" height="20"></Icon>
          <span class="text-primary-text dark:text-dark-text-secondary"
            >upload</span
          >
        </div>
      </button>
    </div>
  </div>

  <p
    class="col-span-5 mt-1 text-sm text-left text-red-600 transition-all duration-300 font-body"
    :class="errorMessage2 ? 'h-5' : 'h-0'"
    id="email-error"
    :visible="errorMessage2"
  >
    {{ errorMessage2 }} &nbsp;
  </p>
  <p
    class="col-span-5 mt-1 text-sm text-left text-red-600 transition-all duration-300 font-body"
    :class="errorMessage ? 'h-5' : 'h-0'"
    id="email-error"
    :visible="errorMessage"
  >
    {{ errorMessage }} &nbsp;
  </p>
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
.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}
</style>
