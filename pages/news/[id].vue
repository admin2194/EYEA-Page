<script setup>
import { formatDistance, subDays, format, parseISO } from "date-fns";
import { staticNews } from "@/helpers/static-date";
import { useClipboard } from "@vueuse/core";
import query from "@/API/queries/publication/one.gql";
import one_handler from "@/composable/query/get_one";
import useNotify from "@/use/notify";

/*--------------------------global-------------------*/
const { notify } = useNotify();
const route = useRoute();
const { copy, copied } = useClipboard();

const id = ref("");
const pageUrl = ref("");
const item = ref({});
id.value = route.params.id;

const { onResult, loading, onError } = one_handler(query, id, "");
onResult((result) => {
  item.value = result.data.item;
});

const router = useRouter();
onError(() => {
  router.replace({
    path: "/error",
  });
  showError({
    statusCode: 404,
    message: "Page not found",
  });
});

watch(
  () => copied.value,
  (newValue, oldValue) => {
    if (newValue == true) {
      notify({
        title: "Copied Link!",
        description: `Link for ${item.value.title} has been copied to clipboard successfully.`,
      });
    }
  }
);

onMounted(() => {
  pageUrl.value = `${window.location.href}`;
});
</script>
<template>
  <div class="">
    <NavBar navClass="dark:bg-dark-primary"></NavBar>
    <div class="relative z-0 md:min-h-screen font-poppins dark:bg-dark-primary">
      <div v-if="!loading" class="z-40 flex justify-center">
        <div class="flex flex-col items-center pt-[4%] md:space-y-10 space-y-4">
          <div
            class="flex flex-col items-center md:w-[50%] md:space-y-6 space-y-2"
          >
            <!-- TODO: make this dynamic -->
            <p class="text-lg text-third-bold">
              {{ item.author.name }}>
              {{ format(parseISO(item?.publication_date), "MM-dd-yyyy") }}
            </p>
            <p
              class="font-bold leading-relaxed text-center md:text-4xl text-primary-text dark:text-white"
            >
              {{ item.title }}
            </p>

            <div
              class="flex items-center justify-center w-32 px-2 py-1 space-x-1 rounded-full bg-third-light text-third"
            >
              <div class="flex justify-start">
                <Icon name="tabler:news" width="15" height="25"></Icon>
              </div>
              <p class="text-sm capitalize">
                {{ item?.type }}
              </p>
            </div>
          </div>

          <div
            class="flex flex-col items-center md:max-w-[1200px] space-y-14 pb-14 md:text-lg px-4 text-justify md:text-left"
          >
            <div v-if="item?.featured_media_type == 'image'">
              <img
                :src="item?.featured_media"
                class="w-[100]"
                alt="news image"
              />
            </div>

            <div v-if="item?.featured_media_type == 'video'">
              <video autoplay muted loop>
                <source :src="item?.featured_media_type" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="md:w-[60%] md:space-y-14 space-y-6">
              <div v-html="item?.content" class="articleContent"></div>

              <div
                class="flex justify-center text-primary-text-light dark:text-dark-text-secondary"
              >
                <div class="flex items-center justify-center space-x-4">
                  <button
                    :title="`Copy ${pageUrl} to your clipboard`"
                    @click="copy(`${pageUrl}`)"
                    class="flex items-center justify-center p-2 space-x-2 border-2 rounded-md reactiveButton"
                  >
                    <Icon name="tabler:link" width="20" height="20"></Icon>
                    <p>
                      {{ copied ? "Link copied" : "Copy link" }}
                    </p>
                  </button>
                  <!-- TODO: D add links -->
                  <a
                    :href="`https://t.me/share/url?url=${pageUrl}`"
                    target="_blank"
                    class="socialLink reactiveButton"
                  >
                    <Icon name="uil:telegram-alt" width="20" height="20"></Icon>
                  </a>
                  <a
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`"
                    target="_blank"
                    class="socialLink reactiveButton"
                  >
                    <Icon name="uil:facebook-f" width="20" height="20"></Icon>
                  </a>
                  <a
                    :href="`https://twitter.com/intent/tweet?url=${pageUrl}`"
                    target="_blank"
                    class="socialLink reactiveButton"
                  >
                    <Icon
                      name="ri:twitter-x-fill"
                      width="20"
                      height="20"
                    ></Icon>
                  </a>
                  <a
                    :href="`https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`"
                    target="_blank"
                    class="socialLink reactiveButton"
                  >
                    <Icon name="uil:linkedin-alt" width="20" height="20"></Icon>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="min-h-[30vh] flex justify-center items-center">
        <Basic-PageLoading />
      </div>
    </div>
  </div>
  <LayoutFooter></LayoutFooter>
</template>
<style>
.scroll::-webkit-scrollbar {
  width: 1em;
  display: none;
}

.scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  display: none;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
  display: none;
}

.articleContent p {
  @apply text-justify mt-6 dark:text-white;
}

.articleContent img {
  @apply max-h-[400px] mx-auto my-10;
}

video {
  @apply sm:w-[600px]  md:w-[700px] xl:w-[1100px];
}

.socialLink {
  @apply border-2 h-12 flex items-center justify-center aspect-square rounded-md;
}
.reactiveButton {
  @apply cursor-pointer hover:shadow-lg;
}
</style>
