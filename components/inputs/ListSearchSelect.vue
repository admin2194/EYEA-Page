<script setup>
import { ref, computed, onBeforeMount, toRefs } from "vue";
import { useDebounceFn, onClickOutside } from "@vueuse/core";
import { useField } from "vee-validate";

const emit = defineEmits([
  "update:modelValue",
  "update:selected",
  "search",
  "onSelectionFound",
]);

const props = defineProps({
  id: String,
  label: String,
  name: { type: String, required: true },
  multiple: { type: Boolean, default: false },
  items: { type: Array, required: true, default: () => [] },
  text: { type: String, default: "name" },
  value: { type: String, default: "id" },
  search: String,
  modelValue: [String, Array, Object],
  selected: String,
  loading: { type: Boolean, default: false },
  errorMessages: String,
  placeHolder: String,
  class: { type: String, default: "" },
  clearable: Boolean,
  trailingIcon: String,
  rules: { type: String, default: "" },
  supporter: String,
  hideDetail: Boolean,
  searchPlaceholder: String,
  disabled: Boolean,
  placeholderStyle: String,
});

const { errorMessage, value: inputValue, meta } = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const vv = ref(props.selected);
const selected = ref({});
const _placeholder = ref(props.placeHolder || "Select");
const show = ref(false);
const input = ref(null);
const search = ref(undefined);
const { items, disabled } = toRefs(props);
const listSelectRef = ref(null);

onBeforeMount(() => {
  if (props.multiple && inputValue.value) {
    inputValue.value.forEach((v) => (selected.value[v] = true));
  }
});

const placeholder = computed(() => {
  if (!props.multiple && items.value.length) {
    const selectedItem = items.value.find((e) => e[props.value] === props.selected);
    if (selectedItem) {
      selected.value = selectedItem[props.value];
      _placeholder.value = selectedItem[props.text];
      inputValue.value = selectedItem[props.text];
      emit("onSelectionFound", selectedItem);
    }
  } else if (props.multiple && inputValue.value?.length > 0) {
    _placeholder.value = inputValue.value
      .map((itm) => items.value.find((it) => it[props.value] === itm)?.[props.text])
      .filter(Boolean)
      .join(", ") || "Select";
  }
  return _placeholder.value;
});

const select = (item) => {
  if (props.multiple) {
    selected.value[item[props.value]] = !selected.value[item[props.value]];
    const selectedItems = Object.keys(selected.value).filter((key) => selected.value[key]);
    vv.value = [...selectedItems];
    inputValue.value = [...selectedItems];
    emit("update:modelValue", selectedItems);
  } else {
    vv.value = item.id;
    inputValue.value = item[props.text];
    emit("update:selected", item[props.value]);
    emit("update:modelValue", item);
    selected.value = item[props.value];
    _placeholder.value = item[props.text];
    show.value = false;
  }
};

const outside = useDebounceFn(() => {
  show.value = false;
}, 300);

const open = () => {
  show.value = true;
  input.value?.focus();
};

const queryList = () => {
  emit("search", search.value);
};

const clear = () => {
  search.value = undefined;
  inputValue.value = "";
  selected.value = "";
  show.value = false;
  emit("update:modelValue", undefined);
  emit("update:selected", undefined);
  emit("onSelectionFound", undefined);
  emit("search", "");
};

onClickOutside(listSelectRef, () => (show.value = false));
</script>

<template>
  <div class="relative">
    <slot name="label"></slot>
    <div class="relative rounded-md shadow-sm font-body">
      <button
        type="button"
        :id="id"
        :disabled="disabled"
        @click="open"
        class="bg-white text-base relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 truncate"
        :class="[
          errorMessage ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-new-tale focus:border-new-tale border-gray-300',
          props.class,
          disabled ? 'bg-gray-100 cursor-not-allowed' : '',
          !inputValue ? 'text-gray-500' : '',
        ]"
      >
        {{ inputValue || placeholder }}
      </button>
      <div v-if="trailingIcon" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <Icon :name="trailingIcon" width="25" height="25" color="gray" />
      </div>
      <div v-if="clearable" @click="clear" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <Icon name="gg:close" width="25" height="25" color="gray" class="cursor-pointer" />
      </div>
    </div>
    
    <ul
      ref="listSelectRef"
      v-show="show"
      class="absolute z-50 w-full bg-white border rounded-b-xl shadow-lg max-h-56 overflow-auto"
    >
      <li>
        <input
          ref="input"
          @input="queryList"
          v-model="search"
          class="w-full border rounded-md p-2"
          :placeholder="props.searchPlaceholder || 'Search'"
        />
      </li>
      <li v-if="loading" class="text-center py-2">Loading...</li>
      <li
        v-for="item in items"
        :key="item.id"
        @click="select(item)"
        class="cursor-pointer px-2 py-3 hover:bg-gray-100"
      >
        <div class="flex justify-between">
          <span>{{ item.name }}</span>
          <span class="text-sm text-gray-400">{{ item.identifier || '' }}</span>
        </div>
      </li>
      <li v-if="!loading && items.length === 0" class="text-center py-2">No results found</li>
    </ul>

    <p v-if="!props.hideDetail && errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
  </div>
</template>
