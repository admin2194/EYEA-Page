<script setup>
import get_one from "@/composable/query/get_one";
import get_one_api from "@/API/queries/partner/get_one_partner.gql";

const route = useRoute();
const id = ref("");
const item = ref({});
id.value = route.params.id;
const { onResult, loading, refetch, onError } = get_one(
  get_one_api,
  id,
  true,
  ""
);
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
</script>

<template>
  <div v-if="!loading">
    <NavBar navClass="dark:bg-dark-secondary"></NavBar>
    <div class="relative dark:bg-dark-secondary">
      <div class="flex items-center justify-center py-4 md:py-32 px-38">
        <div class="grid md:grid-cols-9 h place-content-center gap-x-10">
          <div class="justify-center hidden col-span-2 md:flex">
            <img
              src="@/assets/images/shapes/pages.svg"
              width="295"
              height="333"
            />
          </div>
          <div class="flex flex-col items-center col-span-7 space-y-10">
            <p class="text-3xl text-center uppercase md:text-6xl text-primary">
              memorandum of understanding
            </p>
            <p class="text-lg dark:text-white">between</p>
            <div class="flex items-center space-x-10">
              <img
                src="@/assets//images//logos/EYEA_Logo_Color_Final.png"
                alt=""
                sizes=""
                width="200"
                height="200"
                srcset=""
              />

              <Icon
                name="mingcute:and-fill"
                class="text-xl dark:text-gray-500"
              ></Icon>
              <div>
                <NuxtImg
                  format="webp"
                  loading="lazy"
                  class="w-[120px]"
                  :src="item.logo_url"
                ></NuxtImg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p
          class="flex-col flex-wrap px-10 pb-10 md:columns-2 dark:text-dark-text-secondary"
          v-html="item.mou_content"
        ></p>
      </div>
    </div>
  </div>
  <LayoutFooter></LayoutFooter>
</template>

<style>
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  @apply bg-primary;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #c3ddfd;
  border-radius: 3px;
  @apply bg-primary;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #c3ddfd;
}
</style>
