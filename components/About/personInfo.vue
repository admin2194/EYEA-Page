<script setup>
    const props = defineProps({
        item: {
            type: Object,
            required: true,
        },
    });
</script>

<template>
    <div class="justify-center flex w-full">
        <div class="flex flex-col items-center space-y-4 w-full">
            <div
                class="w-[200px] h-[200px] rounded-full overflow-clip bg-dark-text-secondary"
            >
                <NuxtImg
                    format="webp"
                    loading="lazy"
                    class="w-fit object-contain"
                    :src="item.image_url"
                ></NuxtImg>
            </div>
            <div>
                <p
                    class="text-xl font-semibold text-primary-text dark:text-white"
                >
                    {{ item.name }}
                </p>
            </div>
            <div class="text-[#2F9D55] text-xl">{{ item.title }}</div>
            <div>
                <p
                    class="text-center text-primary-text-light dark:text-dark-text-secondary px-4"
                >
                    {{ item.summary }}
                </p>
            </div>
            <a
                :href="item.linkedin_link"
                target="_blank"
                class="z-10flex text-gray-400 items-center justify-center cursor-pointer"
            >
                <Icon
                    name="mdi:linkedin"
                    width="25"
                    height="25"
                ></Icon>
            </a>
        </div>
    </div>
</template>
