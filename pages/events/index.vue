<script setup>
import get_all from "@/composable/query/list";
import get_all_api from "@/API/queries/events/get_all_events.gql";

const events = ref({});
const { onResult, loading, refetch } = get_all(get_all_api, {
  limit: 12,
  offset: 0,
});
onResult((result) => {
  events.value = result.data.event_events;
});
</script>
<template>
  <div>
    <!----------------------- Nav Bar  ---------------------------->
    <NavBar navClass="bg-[#B5B5B53B] dark:bg-dark-primary backdrop-blur-lg"></NavBar>
    <!----------------------- Event Hero  ---------------------------->
    <EventHero></EventHero>

    <!----------------------- Event  card  ---------------------------->
    <!--<div
      id="EYEA-events"
      class="relative w-full px-4 pb-10 font-poppins md:px-20 dark:bg-dark-secondary"
    >
      <LayoutSectionHeader
        titleClass="text-primary-text text-4xl"
        subtitle-class="text-primary-text-light"
        iconName="ic:baseline-live-tv"
        title="EYEA events"
        subtitle="Register for upcoming events or explore previous ones"
      ></LayoutSectionHeader>
      <div class="flex justify-center pt-10" v-if="!loading">
        <div v-if="events.length">
          <div class="grid gap-10 lg:grid-cols-3">
            <CardEvent
              v-for="(event, i) in events"
              :key="i"
              :event="event"
            ></CardEvent>
          </div>
        </div>
        <div v-else class="h-[30vh] dark:text-white">No Events yet</div>
      </div>
      <Basic-PageLoading v-else />
    </div>-->
  </div>
  <LayoutFooter></LayoutFooter>
</template>
<style scoped>
::-webkit-scrollbar {
  width: 3px;
  height: 0px;
}

::-webkit-scrollbar-track {
  @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-primary rounded-full;
}
</style>
