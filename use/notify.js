import { useTimeoutFn } from "@vueuse/core";
import { computed, ref } from "vue";

const store = ref({
  notification: {
    state: false,
    title: "",
    description: "",
    icon: undefined,
    iconClass: "",
    titleClass: "",
    closeButtonClass: "",
    descriptionClass: "",
    cardClass: "",
  },
});

export default function ({ timeout = 4000 } = {}) {
  const { start, stop } = useTimeoutFn(() => dismis(), timeout);

  const notify = ({
    title = "",
    description = "",
    icon = undefined,
    iconClass = "",
    titleClass = "",
    closeButtonClass = "",
    descriptionClass = "",
    cardClass = "",
  } = {}) => {
    console.log("Notification triggered:", title);

    store.value.notification = {
      state: true,
      title,
      description,
      icon,
      iconClass,
      titleClass,
      descriptionClass,
      closeButtonClass,
      cardClass,
    };

    start();
  };

  const dismis = () => {
    store.value.notification = {
      state: false,
      title: "",
      description: "",
      icon: undefined,
      iconClass: "",
      titleClass: "",
      closeButtonClass: "",
      descriptionClass: "",
      cardClass: "",
    };
    stop();
  };

  return {
    notify,
    dismis,
    notification: computed(() => store.value.notification),
  };
}