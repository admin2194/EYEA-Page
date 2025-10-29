<script setup>
import news_query from "@/API/queries/publication/news.gql";
import list from "@/composable/query/list";
import { format, parseISO } from "date-fns";
import { useWindowSize } from "@vueuse/core";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const filter = ref({
  _and: [
    {
      type: {
        _eq: "news",
      },
    },
  ],
});

const items = ref([]);
const limit = ref(4);
const offset = ref(0);
const { width, height } = useWindowSize();
const router = useRouter();
const loading = ref(true);
const error = ref(null);

const { onResult, onError } = list(
  news_query,
  { limit, offset, filter },
  "",
  {
    next: (result) => {
      items.value = result.data?.items || [];
      loading.value = false;
    },
    error: (error) => {
      console.error("Query error:", error);
      error.value = error;
      loading.value = false;
    }
  }
);

const swap = (item) => {
  if (width.value >= 768) {
    const currentItems = items.value.slice();
    const index = currentItems.findIndex(i => i.id === item.id);
    
    if (index !== -1) {
      // Move clicked item to first position
      const movedItem = currentItems.splice(index, 1)[0];
      items.value = [movedItem, ...currentItems];
    }
  } else {
    router.push(`/news/${item.id}`);
  }
};
</script>

<template>
  <div id="news" class="md:min-h-screen font-poppins w-full bg-[#FFF9ED] dark:bg-dark-secondary relative">
    <LayoutSectionHeader 
      iconName="uil:newspaper"
      title="What is New with Us"
      subtitle="Lates from the association"
    />
    
    <div class="absolute top-0 hidden md:inline-block">
      <img src="@/assets/images/shapes/green_curv.svg" alt="">
    </div>

    <div class="absolute hidden md:inline-block bottom-0 right-0">
      <NuxtImg 
        src="https://res.cloudinary.com/blue-sky/image/upload/v1690920129/section2shape2_ckmqlq.svg"
        format="webp"
        loading="lazy"
      />
    </div>

    <div v-if="loading" class="py-20 text-center">
      <p>Loading latest news...</p>
    </div>

    <div v-else-if="error" class="py-20 text-center text-red-500">
      <p>Error fetching news</p>
    </div>

    <div v-else class="grid lg:grid-cols-9 h-auto w-full">
      <!-- Main Article -->
      <div v-if="items.length" class="lg:col-span-4 p-2">
        <NuxtLink :to="`/news/${items[0].id}`" 
          class="flex flex-col lg:items-end items-center">
          <div class="2xl:w-[65%] xl:w-[70%] md:w-[80%] pb-4 grow-0 md:inline-block 
            grid grid-rows-4 bg-white dark:bg-dark-primary rounded-2xl shadow-lg overflow-clip">
            <div class="2xl:h-[370px] h-[200px] xl:h-[350px]">
              <img 
                :src="items[0].featured_media_type === 'image' 
                  ? items[0].featured_media 
                  : items[0].thumbnail"
                class="object-cover w-full h-full"
              >
            </div>
            <div class="pl-4 space-y-4 px-4 row-span-3">
              <div class="w-auto pt-4">
                <p class="bg-third-light w-20 flex items-center justify-center 
                  text-third space-x-1 p-[2px] rounded-full">
                  <Icon name="uil:newspaper" />
                  <span class="text-sm">News</span>
                </p>
              </div>
              <div class="space-y-2">
                <p class="text-primary-text-light dark:text-dark-text-secondary">
                  {{ items[0].author?.name }} 
                  {{ format(parseISO(items[0].publication_date), "MM-dd-yyyy") }}
                </p>
                <h2 class="font-[500] text-2xl dark:text-white">
                  {{ items[0].title }}
                </h2>
                <div class="font-[400] text-[16px] text-justify text-secondary-text 
                  dark:text-dark-text-primary leading-relaxed lg:line-clamp-6">
                  <span v-html="items[0].content"></span>
                </div>
                <p class="dark:text-third font-[600] text-left mt-14 mb-4">
                  Read Post
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-4 px-2 py-7 space-y-6">
        <div v-for="i in [1, 2, 3]" :key="i">
          <button @click="swap(items[i])" 
            v-if="items[i]">
            <div class="bg-white dark:bg-dark-primary mx-auto lg:mx-0 shadow-md 
              2xl:w-[60%] md:w-[80%] flex flex-col lg:flex-row overflow-hidden 
              rounded-lg cursor-pointer hover:shadow-2xl">
              <div class="lg:w-[200px] lg:h-auto h-[200px]">
                <img 
                  :src="items[i].featured_media_type === 'image' 
                    ? items[i].featured_media 
                    : items[i].thumbnail"
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="p-6 space-y-2 md:w-[70%]">
                <h3 class="dark:text-white font-[400] text-[18px]">
                  {{ items[i].title }}
                </h3>
                <p class="text-secondary-text dark:text-dark-text-primary">
                  {{ items[i].publication_date }}
                </p>
                <div class="text-secondary-text leading-relaxed text-sm 
                  dark:text-dark-text-primary line-clamp-3">
                  <span v-html="items[i].content"></span>
                </div>
              </div>
            </div>
          </button>
        </div>

        <NuxtLink to="/news" class="2xl:w-[60%] md:w-[80%]">
          <InputsButton 
            name="View All ..." 
            class="border-2 border-primary mt-4 w-full dark:text-white 
              p-2 px-4 rounded-lg flex justify-between">
            <template #tralingIcon>
              <Icon name="bx:right-arrow-alt" width="24" height="24" />
            </template>
          </InputsButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>