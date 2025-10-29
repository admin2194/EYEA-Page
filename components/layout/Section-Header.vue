<script setup>
    const props = defineProps({
        title: {
            type: String,
            // required: true,
        },
        subtitle: {
            type: String,
            // required: true,
        },
        iconName: {
            type: String,
            required: true,
        },
        titleClass: {
            type: String,
            default: "",
        },
        subtitleClass: {
            type: String,
            default: "",
        },
    });
</script>
<template>
    <div class="flex items-center justify-center gap-x-10">
        <div class="w-[40%] h-[1px] bg-[#D9D9D9] my-auto"></div>
        <div
            class="w-12 h-12 flex justify-center items-center rounded-full border-[1px] text-dark-primary dark:text-black   border-dark-primary dark:border-secondary"
        >
            <Icon
                :name="iconName"
                width="30"
                height="30"
            ></Icon>
        </div>
        <div class="w-[40%] h-[1px] bg-[#D9D9D9] my-auto"></div>
    </div>
    <div
        class="w-full flex flex-col relative items-center md:p-14 py-8 text-center space-y-4"
    >
        <p
            class="2xl:text-2xl xl:text-lg font-semibold dark:text-black"
            :class="titleClass"
        >
            {{ title }}
        </p>
        <p
            class="text-secondary-text dark:text-black  -text-secondary 2xl:text-base text-sm md:w-[50%]"
            :class="subtitleClass"
        >
            {{ subtitle }}
        </p>
    </div>
</template>