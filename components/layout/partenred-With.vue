<script setup>
    const props = defineProps({
        partners: {
            type: Array,
        },
    });
</script>

<template>
    <div class="flex space-x-4 lg:space-x-6 space-y-2 flex-wrap items-center w-fit mx-auto">
        <div
            v-for="i in 8"
            :key="i"
            class="lg:w-[70px] lg:h-[70px] w-[50px] flex justify-center items-center h-[50px]"
        >
            <NuxtLink
                v-if="partners[i]?.mou_content != ''"
                :to="`/partners/${partners[i]?.id}`"
            >
                <img
                    class="object-contain"
                    :src="partners[i]?.logo_url"
                />
            </NuxtLink>
            <img
                v-else
                class="object-contain"
                :src="partners[i]?.logo_url"
            />
        </div>
        <!-- <div class="lg:w-[70px] lg:h-[70px] w-[50px] h-[50px] lex justify-center items-center">
      <img  class="object-contain" src="@/assets/images/logos/INSA.png"/>
    </div>
    <div class="lg:w-[70px] lg:h-[70px] w-[60px] h-[60px] flex justify-center items-center">
      <img  class="object-contain" src="@/assets/images/logos/etc.png"/>
    </div> -->

        <NuxtLink :to="{path:'/partners',hash:'#partners'}" v-if="partners.length>8" class="text-primary font-poppins font-semibold">
            +{{ partners.length - 8 }} partners
        </NuxtLink>
    </div>
</template>
