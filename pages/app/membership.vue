<script setup>
definePageMeta({
  layout: "members",
  middleware: "members",
});
const route = useRoute();
const type = ref(route.hash.slice(1, route.hash.length));
if (!type.value) {
  type.value = "individual";
}
</script>

<template>
  <div class="mx-auto max-w-[1400px] min-h-screen">
    <JoinUs :type="type" />
  </div>
</template>
