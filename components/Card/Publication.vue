<script setup>
import { format, parseISO } from "date-fns";

const props = defineProps({
  publication: {
    type: Object,
    default: {},
  },
});
</script>
<template>
  <div class="rounded-lg flex-col flex items-center">
    <NuxtLink
      class="lg:w-[80%] h-full rounded-lg border-2 overflow-hidden"
      :to="`/news/${publication.id}`"
    >
      <div class="space-y-4">
        <div class="h-[300px] overflow-hidden bg-black">
          <img
            :src="
              publication.featured_media_type == 'image'
                ? publication.featured_media
                : publication.thumbnail
            "
            alt=""
            class="w-full h-full object-cover"
          />
        </div>
        <div class="px-2">
          <div
            class="bg-third-light w-32 py-1 space-x-1 flex justify-center items-center text-third rounded-full"
          >
            <div class="flex justify-start">
              <Icon name="tabler:news" width="15" height="25"></Icon>
            </div>
            <p class="text-sm capitalize">
              {{ publication.type }}
            </p>
          </div>
        </div>
        <div class="px-2">
          <p class="text-primary-text-light dark:text-dark-text-secondary">
            {{ publication.author.name }}
            >
            {{ format(parseISO(publication.publication_date), "MM-dd-yyyy") }}
          </p>
        </div>
        <div class="px-2">
          <p class="text-2xl text-primary-text font-semibold dark:text-white">
            {{ publication.title }}
          </p>
        </div>
        <div
          class="px-2 w-32 py-1 space-x-1 flex justify-center items-center text-third rounded-full"
        >
          <div class="flex space-x-1">
            <p class="t font-semibold">Read post</p>
            <Icon name="uil:arrow-right" width="23" height="23"></Icon>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
