<script setup>
import { useField } from "vee-validate";
// import upload_query from "@/queries/file_upload.gql";
// import upload_query from "@/queries/file_upload_new.gql";
import mutator from "@/composable/mutator";

const props = defineProps({
  modelValue: {
    type: [String, Array],
  },
  label: String,
  folder: String,
  fileName: String,
  name: String,
  accept: {
    type: String,
  },
  rules: {
    type: [String, Object],
    default: "",
  },
  disabled: Boolean,
});

const emits = defineEmits(["update:modelValue"]);
const fileName = ref("");
const fileType = ref("");
const image_file = ref("");
const isClose = ref(false);
const modelValType = ref("");
function getFileType(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const contentType = xhr.getResponseHeader("Content-Type");
          if (contentType) {
            resolve(contentType);
          } else {
            reject(t("could-not-determine-file-type"));
          }
        } else {
          reject(`Request failed with status ${xhr.status}`);
        }
      }
    };
    xhr.send();
  });
}

onMounted(() => {});

watchEffect(() => {
  getFileType(props.modelValue)
    .then((name, type) => {
      modelValType.value = type;
    })
    .catch((error) => {
      console.error(error);
    });
});
const secureUrl = ref({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    console.log("newval", newVal);
    emits("update:modelValue", newVal);
  },
});
const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const onFileSelect = (e) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  isClose.value = true;
  fileType.value = files[0].type;
  fileName.value = files[0].name;
  console.log(fileType);
  createImage(files[0]);
  function createImage(file) {
    var reader = new FileReader();
    reader.onload = (e) => {
      image_file.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const cancel = () => {
  image_file.value = "";
  isClose.value = false;
};

const { mutate, onError, onDone, loading } = mutator(upload_query);

const upload = (a) => {
  mutate({
    args: {
      files: a.split(";base64,")[1],
      folder: props.folder,
    },
  });
};

onDone(({ data }) => {
  if (data) {
    secureUrl.value = data.items.extension.secure_urls[0];
    isClose.value = false;
    emits("update:modelValue", secureUrl.value);
  }
});

function removeImage(e) {
  image.value = "";
}
</script>
<template>
  <div class="w-full">
    <modal
      :modelValue="!!image_file && isClose"
      :wrapperClass="
        fileType.includes('image')
          ? 'w-1/2 h-full space-y-10 px-2 py-3 bg-white shadow-xl overflow-visible mt-20 relative'
          : 'w-full h-full space-y-10 px-2 py-3 bg-white shadow-xl overflow-visible mt-20 relative'
      "
      class="flex items-center justify-center w-auto h-full bg-black/40"
      :initialFocus="false"
    >
      <div
        class="flex flex-col justify-between items-center gap-y-10"
        :class="fileType.includes('image') ? 'w-96' : 'w-[500px] h-[500px]'"
        v-if="image_file"
      >
        <iframe
          :src="image_file"
          width="500"
          height="500"
          frameborder="0"
          v-if="fileType == 'application/pdf'"
        />
        <img
          :src="image_file"
          class="object-contain"
          v-if="fileType.includes('image')"
        />
      </div>
      <div class="flex mx-auto gap-x-5 flex-wrap gap-y-5">
        <button
          v-if="image_file"
          class="bg-new-tale/20 px-5 py-1 rounded-md shadow-sm self-center flex flex-1 min-w-[60px] justify-center"
          type="button"
          @click="upload(image_file)"
        >
          {{ $t("upload") }}
        </button>
        <button
          v-if="image_file"
          class="bg-new-tale/20 px-5 py-1 rounded-md shadow-sm self-center flex flex-1 min-w-[60px] justify-center"
          type="button"
          @click="cancel"
        >
          {{ $t("cancel") }}
        </button>
      </div>
    </modal>
    <div class="w-full">
      <div
        class="text-sm font-medium leading-6 text-gray-700 mb-1 flex gap-x-2"
      >
        {{ label }}
        <span
          class="text-red-600"
          v-if="rules.includes('required') && !disabled"
          >*</span
        >
      </div>
      <div
        :disabled="disabled"
        class="w-full border h-10 flex rounded-lg justify-between items-center relative z-10"
        :class="[
          errorMessage ? 'border-red-600' : '',
          disabled ? 'bg-gray-100' : '',
        ]"
      >
        <div
          class="flex justify-center h-full rounded-l-md overflow-clip items-center w-12"
        >
          <Icon name="ion:attach-outline" width="30" height="30" color="gray" />
        </div>
        <div
          class="h-full flex items-end whitespace-nowrap overflow-clip gap-x-2"
          v-if="modelValType != 'application/pdf'"
        >
          <img
            class="object-contain h-full"
            onerror="src='/images/PDF_file.png'"
            :src="
              Object.keys(secureUrl).length > 2 ? secureUrl : props.modelValue
            "
            v-if="Object.keys(secureUrl).length > 2 || props.modelValue"
          />
          {{ fileName ? `${fileName.slice(0, 7)} . . .` : "" }}
        </div>
        <input
          type="file"
          :id="name"
          :name="name"
          class="invisible w-0"
          :disabled="disabled"
          :accept="accept"
          @change="onFileSelect($event)"
        />
        <label
          :for="name"
          class="cursor-pointer rounded-r-lg items-center flex relative h-full"
        >
          <div
            class="bg-gray-300 absolute right-0 flex gap-x-2 justify-center h-full rounded-r-md overflow-clip items-center right-left w-24 md:w-28 border focus:border-new-tale group-hover:border-new-tale"
          >
            <Icon name="lucide:upload" width="20" height="20" color="gray" />
            {{ $t("upload") }}
          </div>
          {{ $t("upload") }}</label
        >
      </div>
      <p class="text-sm text-gray-500 my-2">
        {{ $t("upload-an-image-png-jpg-or-pdf-file-up-to-10mb") }}
      </p>
    </div>
    <p
      class="col-span-5 mt-1 font-body text-sm text-red-600 duration-300 transition-all"
      :class="errorMessage ? 'h-5' : 'h-0'"
      id="email-error"
    >
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>
