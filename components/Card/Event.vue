<script setup>
import { format, parseISO } from "date-fns";

const props = defineProps({
  event: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <div
    class="space-y-8 overflow-hidden border-2 rounded-lg shadow-md dark:shadow-white dark:bg-dark-primary"
  >
    <NuxtLink :to="`/events/${event.id}`" class="space-y-6">
      <div class="text-primary w-full text-8xl h-[200px] overflow-hidden">
        <img :src="event.feature_image" alt="" />
      </div>
      <div class="px-6 text-xl dark:text-white line-clamp-1">
        {{ event.title }}
      </div>
      <div class="flex px-6 space-x-10">
        <div
          class="flex items-center space-x-2 text-secondary-text dark:text-dark-text-secondary"
        >
          <Icon name="uil:calender" width="25" height="25"></Icon>
          <span class="mt-1 text-lg whitespace-nowrap">
            {{ format(parseISO(event?.event_start_time), "dd-MM-yyyy") }}
          </span>
        </div>
        <div
          :title="event.location"
          class="flex items-center space-x-2 text-secondary-text dark:text-dark-text-secondary"
        >
          <Icon name="mdi:museum-outline" width="25" height="25"></Icon>
          <span class="mt-1 text-lg line-clamp-1">{{ event.location }}</span>
        </div>
      </div>

      <div class="px-6">
        <p
          class="leading-relaxed text-secondary-text dark:text-dark-text-secondary line-clamp-5"
        >
          {{ event.description }}
        </p>
      </div>
      <div class="px-6 space-y-2">
        <div>
          <p
            class="text-base text-secondary-text dark:text-dark-text-secondary"
          >
            Speakers
          </p>
        </div>
        <div class="flex items-center space-x-4 overflow-x-scroll scroll">
          <div v-for="(eventSpeaker, i) in event.speakers" :key="i">
            <div
              class="w-[200px] h-[50px] flex items-center border-2 px-1 rounded-lg"
            >
              <div class="flex items-center space-x-4">
                <div class="flex w-8 h-8 rounded-full aspect-square">
                  <img
                    :src="eventSpeaker.photo_url"
                    alt=""
                    class="rounded-full"
                  />
                </div>
                <div class="dark:text-white">
                  <p class="line-clamp-1">
                    {{ eventSpeaker.name }}
                  </p>
                  <p class="text-xs dark:text-dark-text-secondary line-clamp-1">
                    {{ eventSpeaker.title }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-2">
        <div>
          <p
            class="px-6 text-base text-secondary-text dark:text-dark-text-secondary"
          >
            Sponsored by:-
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-4 px-6">
          <div
            v-for="(event_partner, i) in event.event_partners"
            :key="i"
            class="w-[60px]"
          >
            <NuxtImg
              :src="event_partner.partner.logo_url"
              format="webp"
              loading="lazy"
            ></NuxtImg>
          </div>
        </div>
      </div>

      <div class="px-6 pb-6">
        <InputsButton
          class="flex items-center justify-center w-full p-2 py-4 space-x-4 text-xl border-2 rounded-lg border-primary text-primary font-poppins"
          :name="event.is_expired ? 'View Detail' : 'Book Now'"
        >
          <template #leadingIcon>
            <Icon
              name="lucide:ticket"
              width="25"
              height="25"
              v-if="!event.is_expired"
            ></Icon>
            <Icon name="bx:detail" width="25" height="25" v-else></Icon>
          </template>
        </InputsButton>
      </div>
    </NuxtLink>
  </div>
</template>
