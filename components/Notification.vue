<script setup>
import useNotify from "@/use/notify";
const { dismis, notification } = useNotify();
</script>

<template>
  <div
    aria-live="assertive"
    class="z-[100] fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="notification.state"
          class="max-w-sm w-full pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
          :class="notification.cardClass || 'bg-white shadow-lg rounded-lg'"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0" v-if="notification.icon">
                <component
                  :is="notification.icon"
                  :class="notification.iconClass || 'h-6 w-6 text-gray-400'"
                ></component>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p
                  :class="
                    notification.titleClass || 'text-gray-900 text-sm font-medium'
                  "
                >
                  {{ notification.title }}
                </p>
                <p
                  class="mt-1"
                  :class="
                    notification.descriptionClass || 'text-gray-500 text-sm'
                  "
                >
                  {{ notification.description }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="dismis"
                  :class="
                    notification.closeButtonClass ||
                    'bg-white text-gray-400 hover:text-gray-500 rounded-md inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                  "
                >
                  <span class="sr-only">Close</span>
                  <Icon name="ic:round-close" class="text-xl"></Icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>