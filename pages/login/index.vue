<script setup>
import { Form, useForm } from "vee-validate";
import { useUserStore } from "@/store/userStore";
import login_composable from "@/composable/mutator";
import custom_token_query from "@/API/mutation/customToken.gql";
import login_query from "@/API/mutation/login.gql";
import useNotify from "@/use/notify";
import memberships_query from "@/API/queries/membership/hasMembership.gql";
import lists_composable from "@/composable/query/lists";

const { notify } = useNotify();
const userStore = useUserStore();
const custom_cookie = useCookie("custom_token");
const access_cookie = useCookie("access_token");
const { handleSubmit } = useForm({});
const router = useRouter();
const clientId = ref("member_anonymous")
const clientIdUser = ref("member_user")
const time = new Date();

const link = ref(
  `https://auth.eyea.et/oauth_login/google?redirectURL=https://staging.eyea.et&state=${time.getTime()}`
);

/*-----------------------------login query--------------------------*/
const email = ref("");
const password = ref("");
const {
  mutate,
  loading,
  onDone,
  onError: onLoginError,
} = login_composable(login_query , {clientId: clientId});

onDone((result) => {
  access_cookie.value = "Bearer " + result.data.auth.login.access_token;
  tokenMutate({
    id_token: result.data.auth.login.id_token,
  });
});

onLoginError((error) => {
  notify({
    title: "Invalid password or email",
    description: "insert correct user password or email",
    cardClass: "bg-red-100",
  });
});

/*-----------------------------custom token  query--------------------------*/
const {
  mutate: tokenMutate,
  loading: tokenLoading,
  onDone: tokeDone,
  onError: onTokenError,
} = login_composable(custom_token_query , {clientId: clientId});

const submit = handleSubmit(async (values) => {
  mutate({
    data: {
      email: email.value,
      password: password.value,
    },
  });
});

tokeDone((result) => {
  custom_cookie.value =
    "Bearer " + result.data.custom_token.data.custom_token;
  const data = {};
  data.access_token = access_cookie.value;
  data.custom_token = custom_cookie.value;
  userStore.set(data);
  enabled.value = true;
});

/*-----------------------------membership query--------------------------*/
const enabled = ref(false);
const {
  onResult,
  onError,
  loading: fetchLoading,
  refetch,
} = lists_composable(memberships_query, { enabled: enabled  ,clientId: clientIdUser});

onResult(({ data }) => {
  if (data) {
    let membershipState = {
      individualMem: data.user_individual_membership?.length,
      organizationMem: data.user_organization_membership?.length,
    };

    if (userStore.users.metadata.roles.includes("super:admin")) {
      access_cookie.value = "";
      custom_cookie.value = "";
      userStore.unset();
      notify({
        title: "Invalid password or email",
        description: "insert correct user password or email",
        cardClass: "bg-red-100",
      });
      console.log("super admin");
      enabled.value = false;
      router.push("/login");
    } else {
      userStore.setMembershipStat(membershipState);

      router.push({ name: "app" });
    }
  }
});
</script>

<template>
  <div class="grid h-screen grid-cols-5 px-3 md:px-0">
    <div
      class="items-center hidden col-span-2 bg-third-light2 dark:bg-dark-primary-light lg:flex dark:text-white"
    >
      <div class="space-y-10 border-l-4 px-20 border-[#40FF81]">
        <div>
          <img
            src="@/assets/images/logos/EYEA_Logo_Color_Final.png"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
    <div
      class="flex items-center col-span-5 lg:col-span-3 px- dark:bg-dark-secondary"
    >
      <!--
      <form
        @submit.prevent="submit"
        class="2xl:w-[40%] md:w-[50%] lg:w-[60%] w-full mx-auto my-auto"
      >
        <div class="flex py-4 text-3xl dark:text-white">
          <p class="mx-auto">Login</p>
        </div> -->

      <form
        @submit.prevent="submit"
        class="2xl:w-[40%] md:w-[50%] lg:w-[60%] w-full mx-auto my-auto"
      >
        <div
          class="flex flex-col items-center justify-center w-full py-5 text-3xl gap-y-10 dark:text-white"
        >
          <div class="max-w-[10rem] md:hidden">
            <img src="/images/EYEA_cropped.png" alt="eyea logo" />
          </div>
          <p class="mx-auto">Login</p>
        </div>

        <InputsTextfield
          v-model="email"
          name="email"
          rules="required"
          type="email"
          class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
          placeholder="email"
          placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
        >
          <template #leading>
            <div
              class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
            >
              <Icon name="ic:outline-email" width="25" height="25"></Icon>
            </div>
          </template>
          <template #label>
            <div
              class="mb-3 top-3 left-6 text-secondary-text dark:text-dark-text-secondary font-poppins"
            >
              Email
            </div>
          </template>
        </InputsTextfield>
        <InputsTextfield
          v-model="password"
          type="password"
          rules="required"
          trailingIcon="mdi:eye-outline"
          name="password"
          class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
          placeholder="password"
          placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
        >
          <template #leading>
            <div
              class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
            >
              <Icon
                name="material-symbols:lock-outline"
                width="25"
                height="25"
              ></Icon>
            </div>
          </template>
          <template #label>
            <div
              class="mb-3 top-3 left-6 text-secondary-text dark:text-dark-text-secondary font-poppins"
            >
              password
            </div>
          </template>
        </InputsTextfield>

        <button
          type="submit"
          class="px-4 w-full h-[40px] rounded-md bg-primary text-white mt-4"
        >
          <p v-if="!loading || tokenLoading || fetchLoading">Login</p>
          <Icon
            v-else
            name="line-md:loading-twotone-loop"
            class="text-2xl text-white"
          ></Icon>
          <Icon
            v-else
            name="line-md:loading-twotone-loop"
            class="text-2xl text-white"
          ></Icon>
        </button>
        <div
          class="flex justify-between w-full pt-2 text-primary-text-light dark:text-white"
        >
          <NuxtLink class="hover:text-primary" to="/signup"
            >I don't have an account</NuxtLink
          >
          <p>forgot password</p>
        </div>
        <div class="mt-3">
          <p class="grid items-center grid-cols-3 text-center">
            <span class="w-full h-px bg-gray-200"></span>
            <span class="text-primary-text-light dark:text-white"
              >or login with</span
            ><span class="w-full h-px bg-gray-200"></span>
          </p>
          <div class="flex items-center justify-center mt-3 space-x-4 gap-x-3">
            <a
              :href="link"
              class="flex items-center p-2 border rounded hover:bg-primary-light hover:text-white"
              ><Icon name="logos:google-icon" class="text-2xl"></Icon
            ></a>
            <!-- <a
              class="flex items-center p-2 border rounded hover:bg-primary-light hover:text-white"
            >
              <Icon name="skill-icons:linkedin" class="text-2xl"></Icon>
            </a> -->
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.floutingButton {
  @apply absolute  md:w-[200px] w-[170px] rounded-full font-poppins justify-center items-center space-x-2 md:p-2 p-1 flex;
}
.floutingButtonSub {
  @apply flex items-center justify-center rounded-full md:w-10 md:h-10 h-8 w-8;
}

element.style {
}

.fullShadow {
  box-shadow: 0 0 5px 2px #fff;
}
.carousel__pagination-button::after {
  @apply bg-primary-light h-2 rounded-lg hover:bg-primary;
}
.carousel__pagination-button--active::after {
  @apply bg-primary w-8 rounded-lg;
}
</style>
