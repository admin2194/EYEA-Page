<script setup>
import list from "@/composable/query/list.js";
import query from "@/API/queries/basic/cities.gql";

const props = defineProps({
  modelValue: {
    type: [Object, Function, String],
  },
  name: String,
  woreda_id: String,
  placeHolder: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  prefix: String,
  textClass: String,
  rules: String,
  showLabel: {
    type: Boolean,
    default: true,
  },
  hideDetail: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: "text-gray-800",
  },
  labelClass: {
    type: String,
  },
  disableClass: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["update:modelValue", "update:name"]);
const items = ref([]);
const helper = ref({});
const search = ref("");
const filter = computed(() => {
  let filter = {
    _and: [],
  };
  filter._and.push({ name: { _ilike: `%${search.value}%` } });
  if (props.woreda_id) {
    // filter._and.push({region_id : { _eq: props.woreda_id }});
  }
  return filter;
});

const { onResult, loading, onerror } = list(query, { filter }, "user");
onResult((result) => {
  if (result.data) {
    items.value = result.data.items;
  }
  if (props.modelValue) {
    helper.value.region_id = props.modelValue;
  }
});

const onSearch = (term) => {
  search.value = term;
};

const getValue = (value) => {
  if (!value) {
    //props.textClass to  used only  for report pages
    if (!props.textClass) return;
    emits("update:modelValue", undefined);
    emits("update:name", undefined);
  } else {
    emits("update:modelValue", value.id);
    emits("update:name", value.name);
  }
};
</script>

<template>
  <InputsListSearchSelect
    v-model="helper.region"
    v-model:selected="helper.region_id"
    @search="onSearch"
    :items="items"
    @onSelectionFound="getValue"
    :name="name || 'Sub sector'"
    :placeHolder="placeHolder || 'Select'"
    :trailingIcon="!helper.region_id ? 'tabler:chevron-down' : undefined"
    :class="['placeholder-gray-500 font-body text-base py-3', props.class]"
    :loading="loading"
    supporter="h-52"
    :hideDetail="hideDetail"
    :disabled="disabled"
    :disableClass="disableClass"
    :rules="rules"
    class="focus:ring-primary dark:bg-dark-secondary dark:text-white"
  >
    <template #label>
      <div class="pb-4 text-primary-text dark:text-white">
        <span> city </span>
        <span v-if="rules == 'required'" class="text-red-600">*</span>
      </div></template
    >
  </InputsListSearchSelect>
</template>
