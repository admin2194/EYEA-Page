<script setup>
import { Form, useForm } from "vee-validate";
import mutator from "@/composable/mutator";
import sign_up_api from "@/API/mutation/sign_up.gql";
const { handleSubmit } = useForm({});
const router = useRouter();
const item = ref({ redirect_uri: "https://www.eyea.et/login"});
const genderList = ref([
  {
    id: "male",
    name: "Male",
  },
  {
    id: "female",
    name: "Female",
  },
]);
const clientId = ref("member_anonymous")
const { mutate, loading, onDone } = mutator(sign_up_api,{clientId:clientId});
onDone((data) => {
  router.push("/verification");
});
const submit = handleSubmit(async (values) => {
  console.log(item.value);
  mutate({
    data: { ...item.value, phone_number: `+251${item.value.phone_number}` },
  });
});
</script>

<template>
  <div class="h-screen grid grid-cols-5">
    <div
      class="bg-third-light2 dark:bg-dark-primary-light col-span-2 lg:flex hidden dark:text-white items-center"
    >
      <div class="space-y-10 border-l-4 px-20 border-[#40FF81]">
        <div>
          <!-- <Icon name=""></Icon> -->
          <img
            src="@/assets/images/logos/EYEA_Logo_Color_Final.png"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
    <div
      class="lg:col-span-3 col-span-5 px-4 flex items-center py-10 dark:bg-dark-secondary"
    >
      <form
        @submit.prevent="submit"
        class="2xl:w-[60%] md:w-[50% ] lg:w-[70%] mx-auto my-auto"
      >
        <div class="text-3xl flex py-4 dark:text-white">
          <p class="mx-auto">Signup</p>
        </div>
        <div class="xl:flex space-x-4">
          <InputsTextfield
            v-model="item.given_name"
            name="First Name"
            rules="required"
            type="text"
            class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
            placeholder="Full Name"
            placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
          >
            <template #leading>
              <div
                class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
              >
                <Icon
                  name="eva:person-done-outline"
                  width="25"
                  height="25"
                ></Icon>
              </div>
            </template>
            <template #label>
              <div
                class="top-3 left-6 text-secondary-text mb-3 dark:text-dark-text-secondary font-poppins"
              >
                First Name
              </div>
            </template>
          </InputsTextfield>
          <InputsTextfield
            v-model="item.middle_name"
            name="Last name"
            rules="required"
            type="text"
            class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
            placeholder="last name"
            placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
          >
            <template #leading>
              <div
                class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
              >
                <Icon
                  name="eva:person-done-outline"
                  width="25"
                  height="25"
                ></Icon>
              </div>
            </template>
            <template #label>
              <div
                class="top-3 left-6 text-secondary-text mb-3 dark:text-dark-text-secondary font-poppins"
              >
                Last Name
              </div>
            </template>
          </InputsTextfield>
        </div>

        <InputsListselect
          name="Gender"
          :items="genderList"
          v-model="item.gender"
          class="block w-full py-[12px] rounded-md dark:bg-dark-secondary"
          rules="required"
          placeholder="Gender"
        >
          <template v-slot:label>
            <div
              class="block text-base font-medium leading-6 text-gray-700 mb-4 dark:text-dark-text-secondary"
            >
              Gender
            </div>
          </template>
        </InputsListselect>
        <InputsTextfield
          v-model="item.phone_number"
          name="Phone"
          rules="required|ethio_phone"
          type="number"
          class="focus:border-primary px-16 py-[12px] mb-6 dark:bg-dark-secondary"
          placeholder="phone number"
          placeholder-style="text-primary-text-light dark:text-dark-text-secondary  "
        >
          <template #leading>
            <div
              class="absolute top-3 left-6 text-primary-text-light dark:text-dark-text-secondary font-poppins"
            >
              <Icon name="solar:phone-linear" width="25" height="25"></Icon>
            </div>
          </template>
          <template #label>
            <div
              class="top-3 left-6 text-secondary-text mb-3 dark:text-dark-text-secondary font-poppins"
            >
              Phone Number
            </div>
          </template>
        </InputsTextfield>
        <InputsTextfield
          v-model="item.email"
          name="Email"
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
              class="top-3 left-6 text-secondary-text mb-3 dark:text-dark-text-secondary font-poppins"
            >
              Email
            </div>
          </template>
        </InputsTextfield>
        <InputsTextfield
          v-model="item.password"
          type="password"
          rules="password"
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
              class="top-3 left-6 text-secondary-text mb-3 dark:text-dark-text-secondary font-poppins"
            >
              password
            </div>
          </template>
        </InputsTextfield>

        <InputsTextfield
          v-model="item.confirm_password"
          type="password"
          trailingIcon="mdi:eye-outline"
          name="confirm_password"
          rules="required"
          class="focus:border-primary px-16 pt-6 py-[12px] mb-6 dark:bg-dark-secondary"
          placeholder="confirm password"
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
              class="top-3 left-6 text-secondary-text mb-3 dark:text-dark-text-secondary font-poppins"
            >
              confirm password
            </div>
          </template>
        </InputsTextfield>
        <div>
          <button
            :disabled="loading"
            type="submit"
            class="px-4 w-full h-[40px] rounded-md bg-primary text-white mt-4"
          >
            <p v-if="!loading">Signup</p>
            <Icon
              v-else
              name="line-md:loading-twotone-loop"
              class="text-4xl text-white"
            ></Icon>
          </button>
        </div>
        <div
          class="w-full flex justify-center pt-2 text-primary-text-light hover:text-primary"
        >
          <NuxtLink to="/login" class="mx-auto"
            >I already have an account</NuxtLink
          >
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
